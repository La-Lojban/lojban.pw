import { AppProps } from "next/app";
import "../styles/index.css";
import "../styles/style.css";
import NProgress from "nprogress";
import Router from "next/router";
import "../styles/nprogress.css";
import { io } from "socket.io-client";

import { closeXicon } from "../lib/buttons";
import { useEffect } from "react";
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
    const onScroll = debouncedGetClosestHeaderId;
    const onResize = debouncedGetClosestHeaderId;
    document.addEventListener("scroll", onScroll, true);
    window.addEventListener("resize", onResize);
    return () => {
      document.removeEventListener("scroll", onScroll, true);
      window.removeEventListener("resize", onResize);
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

  useEffect(() => {
    let socket1Chat_connected = false;
    const socket1Chat = io("wss://jbotcan.org:9091", {
      transports: ["polling", "websocket"],
    });

    socket1Chat.on("connect", () => {
      socket1Chat_connected = true;
    });

    socket1Chat.on("connect_error", () => {
      console.warn("1chat connection error");
    });

    socket1Chat.on("sentFrom", (data: { data: { chunk: string; channelId: string; author: string } }) => {
      if (!socket1Chat_connected) return;
      const i = data.data;
      const msg = {
        d: trimSocketChunk(i.chunk),
        s: i.channelId,
        w: i.author,
      };
      const velsku = document.getElementById("velsku_sebenji");
      if (velsku) {
        velsku.innerHTML =
          '<span class="velsku_pamei">' + msg.w + ": " + msg.d + "</span>";
      }
    });

    socket1Chat.on("history", (data: Array<{ chunk: string; channelId: string; author: string }>) => {
      if (!socket1Chat_connected) return;
      const i = data.slice(-1)[0];
      if (!i) return;
      const msg = {
        d: trimSocketChunk(i.chunk),
        s: i.channelId,
        w: i.author,
      };
      const velsku = document.getElementById("velsku_sebenji");
      if (velsku) {
        velsku.innerHTML =
          '<span class="velsku_pamei">' + msg.w + ": " + msg.d + "</span>";
      }
    });

    return () => {
      socket1Chat.removeAllListeners();
      socket1Chat.disconnect();
    };
  }, []);
  return <Component {...pageProps} />;
}