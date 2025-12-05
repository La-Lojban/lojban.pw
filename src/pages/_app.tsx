import { AppProps } from "next/app";
import "../styles/index.css";
import "../styles/style.css";
import NProgress from "nprogress";
import Router from "next/router";
import "../styles/nprogress.css";

import { closeXicon } from "../lib/buttons";
import { useEffect, useState } from "react";
import { debouncedGetClosestHeaderId } from "../lib/toc";
NProgress.configure({
  minimum: 0.3,
  easing: "ease",
  speed: 800,
  showSpinner: false,
});

if (process.env.NODE_ENV !== "development") {
  Router.events.on("routeChangeStart", () => NProgress.start());
  Router.events.on("routeChangeComplete", () => {
    NProgress.done();
    closeXicon();
    window && window.dispatchEvent(new Event("popstate"));
  });
  Router.events.on("routeChangeError", () => NProgress.done());
}

const trimSocketChunk = (text: string) =>
  text.replace(/[\n\r]+$/gims, " ").replace(/<br *\/?>/gims, " ");

export default function MyApp({ Component, pageProps }: AppProps) {
  useEffect(() => {
    document.addEventListener("scroll", debouncedGetClosestHeaderId);
    window.addEventListener("resize", () => debouncedGetClosestHeaderId);
    return () => {
      document.removeEventListener("scroll", debouncedGetClosestHeaderId);
      window.addEventListener("resize", () => debouncedGetClosestHeaderId);
    };
  }, []);

  // Register service worker for PWA
  useEffect(() => {
    if (typeof window !== 'undefined' && 'serviceWorker' in navigator) {
      navigator.serviceWorker
        .register('/sw.js', { scope: '/' })
        .then((registration) => {
          console.log('Service Worker registered:', registration);
        })
        .catch((error) => {
          console.log('Service Worker registration failed:', error);
        });
    }
  }, []);

  // Lazy load Socket.io connection only when footer is visible or after page load
  useEffect(() => {
    let socket1Chat: any = null;
    let socket1Chat_connected: boolean = false;
    let isInitialized = false;

    const initSocket = async () => {
      if (isInitialized) return;
      isInitialized = true;

      try {
        // Dynamically import socket.io-client only when needed
        const { io } = await import("socket.io-client");
        socket1Chat = io("wss://jbotcan.org:9091", {
          transports: ["polling", "websocket"],
        });

        socket1Chat.on("connect", () => {
          console.log(socket1Chat);
          socket1Chat_connected = true;
        });

        socket1Chat.on("connect_error", () => {
          console.log("1chat connection error");
        });

        socket1Chat.on("sentFrom", (data: any) => {
          if (!socket1Chat_connected) return;
          const i = data.data;

          const msg = {
            d: trimSocketChunk(i.chunk),
            s: i.channelId,
            w: i.author,
          };

          const velsku = document.getElementById("velsku_sebenji");
          if (velsku)
            velsku.innerHTML =
              '<span class="velsku_pamei">' + msg.w + ": " + msg.d + "</span>";
        });

        socket1Chat.on("history", (data: any) => {
          if (!socket1Chat_connected) return;
          const i = data.slice(-1)[0];
          if (!i) return;
          const msg = {
            d: trimSocketChunk(i.chunk),
            s: i.channelId,
            w: i.author,
          };
          const velsku = document.getElementById("velsku_sebenji");
          if (velsku)
            velsku.innerHTML =
              '<span class="velsku_pamei">' + msg.w + ": " + msg.d + "</span>";
        });
      } catch (error) {
        console.error("Failed to load socket.io-client:", error);
      }
    };

    // Initialize after a delay or when footer comes into view
    const timeoutId = setTimeout(() => {
      initSocket();
    }, 2000); // Delay initial connection by 2 seconds

    // Also initialize when footer is visible
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          initSocket();
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );

    // Wait for DOM to be ready
    const checkFooter = () => {
      const footer = document.getElementById("velsku");
      if (footer) {
        observer.observe(footer);
      } else {
        // Retry after a short delay if footer not found
        setTimeout(checkFooter, 100);
      }
    };
    checkFooter();

    return () => {
      clearTimeout(timeoutId);
      observer.disconnect();
      if (socket1Chat) {
        socket1Chat.disconnect();
      }
    };
  }, []);
  return <Component {...pageProps} />;
}