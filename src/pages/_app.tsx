import { AppProps } from "next/app";
import "../styles/index.css";
import "../styles/style.css";
import NProgress from "nprogress";
import Router from "next/router";
import "../styles/nprogress.css";
import { io } from "socket.io-client";

import { closeXicon } from "../lib/buttons";
import { useEffect } from "react";
import { getClosestHeaderId } from "../lib/toc";
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
    const observer = new IntersectionObserver(getClosestHeaderId);
    for (const element of document.querySelectorAll("h1, h2, h3")) {
      observer.observe(element);
    }
    return () => {
      observer.disconnect();
    };
  }, []);
  // useEffect(() => {
  //   document.addEventListener("scroll", debouncedGetClosestHeaderId);
  //   window.addEventListener("resize", () => debouncedGetClosestHeaderId);
  //   return () => {
  //     document.removeEventListener("scroll", debouncedGetClosestHeaderId);
  //     window.addEventListener("resize", () => debouncedGetClosestHeaderId);
  //   };
  // }, []);

  useEffect(() => {
    let socket1Chat_connected: boolean;
    const socket1Chat = io("wss://jbotcan.org:9091", {
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
  }, []);
  return <Component {...pageProps} />;
}

// MyApp.getInitialProps = async (appContext: AppContext) => {
// 	const appInitialProps = await App.getInitialProps(appContext);

// 	const asPath = appContext.ctx.asPath ?? "";
// 	const res = appContext.ctx.res;
// 	if (res && asPath.endsWith("/") && asPath.length > 1) {
// 		res.writeHead(301, { Location: asPath.substring(0, asPath.length - 1) });
// 		res.end();
// 		return;
// 	}

// 	return { ...appInitialProps };
// };
