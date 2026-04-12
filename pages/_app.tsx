/**
 * SFC-style layout (dependency order: styles → markup → script):
 *   STYLES — Tailwind fragments
 *   MARKUP — presentational pieces
 *   SCRIPT — data + composition
 */
import { AppProps } from "next/app";
import "../styles/index.css";
import {
  RouteProgressProvider,
  type RouteProgressOptions,
} from "../lib/slimprogress";
import { closeXicon } from "../lib/buttons";
import { useEffect } from "react";
import {
  debouncedGetClosestHeaderId,
  isTocScrollContainerTarget,
} from "../lib/toc";

// -----------------------------------------------------------------------------
// STYLES
// -----------------------------------------------------------------------------
// (global CSS imports above)

// -----------------------------------------------------------------------------
// MARKUP
// -----------------------------------------------------------------------------
// (App wrapper renders route Component)

// -----------------------------------------------------------------------------
// SCRIPT
// -----------------------------------------------------------------------------
const trimSocketChunk = (text: string) =>
  text.replace(/[\n\r]+$/gims, " ").replace(/<br *\/?>/gims, " ");

const routeProgressOptions: Partial<RouteProgressOptions> = {
  minimum: 0.3,
  easing: "ease",
  speed: 800,
};

export default function MyApp({ Component, pageProps }: AppProps) {
  useEffect(() => {
    const onScroll = (e: Event) => {
      if (isTocScrollContainerTarget(e.target)) return;
      debouncedGetClosestHeaderId();
    };
    const onResize = debouncedGetClosestHeaderId;
    document.addEventListener("scroll", onScroll, true);
    window.addEventListener("resize", onResize);
    return () => {
      document.removeEventListener("scroll", onScroll, true);
      window.removeEventListener("resize", onResize);
    };
  }, []);

  useEffect(() => {
    if (typeof window === "undefined" || !("serviceWorker" in navigator)) return;

    void (async () => {
      try {
        const regs = await navigator.serviceWorker.getRegistrations();
        await Promise.all(regs.map((r) => r.unregister()));
      } catch {
        /* ignore */
      }
      try {
        if ("caches" in window) {
          const keys = await caches.keys();
          await Promise.all(keys.map((k) => caches.delete(k)));
        }
      } catch {
        /* ignore */
      }
    })();
  }, []);

  useEffect(() => {
    let cancelled = false;
    let socketInstance: import("socket.io-client").Socket | null = null;

    const cleanupSocket = () => {
      socketInstance?.removeAllListeners();
      socketInstance?.disconnect();
      socketInstance = null;
    };

    const connect = () => {
      if (!document.getElementById("velsku_sebenji")) return;

      void import("socket.io-client").then(({ io }) => {
        if (cancelled) return;
        if (!document.getElementById("velsku_sebenji")) return;

        cleanupSocket();
        let socket1Chat_connected = false;
        const socket1Chat = io("wss://jbotcan.org:9091", {
          transports: ["polling", "websocket"],
        });
        socketInstance = socket1Chat;

        socket1Chat.on("connect", () => {
          socket1Chat_connected = true;
        });

        socket1Chat.on("connect_error", () => {
          console.warn("1chat connection error");
        });

        socket1Chat.on(
          "sentFrom",
          (data: {
            data: { chunk: string; channelId: string; author: string };
          }) => {
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
          }
        );

        socket1Chat.on(
          "history",
          (
            data: Array<{ chunk: string; channelId: string; author: string }>
          ) => {
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
          }
        );
      });
    };

    connect();

    let obs: MutationObserver | null = null;
    if (typeof MutationObserver !== "undefined") {
      obs = new MutationObserver(() => {
        if (document.getElementById("velsku_sebenji")) {
          obs?.disconnect();
          connect();
        }
      });
    }
    if (obs && !document.getElementById("velsku_sebenji")) {
      obs.observe(document.documentElement, { childList: true, subtree: true });
    }

    return () => {
      cancelled = true;
      obs?.disconnect();
      cleanupSocket();
    };
  }, []);

  const page = <Component {...pageProps} />;

  if (process.env.NODE_ENV === "development") {
    return page;
  }

  return (
    <RouteProgressProvider
      options={routeProgressOptions}
      onRouteChangeComplete={() => {
        closeXicon();
        window.dispatchEvent(new Event("popstate"));
      }}
    >
      {page}
    </RouteProgressProvider>
  );
}
