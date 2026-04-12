/**
 * SFC-style layout (dependency order: styles → markup → script):
 *   STYLES — DOM helpers (see styles/route-progress.css)
 *   MARKUP — route progress provider
 *   SCRIPT — top-of-viewport bar state machine (client-only)
 */
import Router from "next/router";
import { useCallback, useEffect, useRef, type ReactNode } from "react";

// -----------------------------------------------------------------------------
// STYLES
// -----------------------------------------------------------------------------
const ROOT_CLASS = "route-progress";
const DOCUMENT_LOADING_CLASS = "route-progress-document-loading";
const BAR_CLASS = "route-progress__bar";
const BAR_SELECTOR = `.${BAR_CLASS}`;

const MAX = 1;

function applyStyles(
  element: HTMLElement,
  properties: Record<string, string | undefined> | string,
  value?: string,
): void {
  const style = element.style as unknown as Record<string, string>;
  if (typeof properties === "string") {
    if (value !== undefined) style[properties] = value;
    return;
  }
  for (const [key, v] of Object.entries(properties)) {
    if (v !== undefined) style[key] = v;
  }
}

function clamp(n: number, min: number, max: number): number {
  return Math.max(min, Math.min(n, max));
}

function toTranslatePercent(n: number): number {
  return (-1 + n) * 100;
}

// -----------------------------------------------------------------------------
// MARKUP
// -----------------------------------------------------------------------------
export interface RouteProgressOptions {
  minimum?: number;
  easing?: string;
  speed?: number;
  trickle?: boolean;
  trickleSpeed?: number;
}

export interface RouteProgressProviderProps {
  children?: ReactNode;
  options?: Partial<RouteProgressOptions>;
  onRouteChangeComplete?: () => void;
  onRouteChangeError?: () => void;
}

export function RouteProgressProvider({
  children,
  options,
  onRouteChangeComplete,
  onRouteChangeError,
}: RouteProgressProviderProps) {
  const startTimerRef = useRef<number | null>(null);
  const onCompleteRef = useRef(onRouteChangeComplete);
  const onErrorRef = useRef(onRouteChangeError);
  onCompleteRef.current = onRouteChangeComplete;
  onErrorRef.current = onRouteChangeError;

  useEffect(() => {
    settings = { ...settings, ...(options ?? {}) };
  }, [options]);

  const start = useCallback((startPosition = 0, delay = 0) => {
    startTimerRef.current = window.setTimeout(() => {
      if (startPosition > 0) applyProgress(startPosition);
      beginTrickle();
    }, delay) as number;
  }, []);

  const complete = useCallback((stopDelay = 0, forcedDelay = 0) => {
    window.setTimeout(() => {
      if (startTimerRef.current !== null) {
        window.clearTimeout(startTimerRef.current);
      }
      startTimerRef.current = window.setTimeout(() => {
        if (!isRunning()) return;
        bumpProgress(0.3 + 0.5 * Math.random());
        applyProgress(MAX);
      }, stopDelay) as number;
    }, forcedDelay);
  }, []);

  useEffect(() => {
    const onStart = (url: string) => {
      const target = new URL(url, location.href);
      const current = new URL(location.href);
      if (
        target.origin === current.origin &&
        target.pathname === current.pathname &&
        target.search === current.search
      ) {
        return;
      }
      start(0, 0);
    };

    const onDone = () => {
      onCompleteRef.current?.();
      complete(0);
    };

    const onErr = () => {
      onErrorRef.current?.();
      complete(0);
    };

    Router.events.on("routeChangeStart", onStart);
    Router.events.on("routeChangeComplete", onDone);
    Router.events.on("routeChangeError", onErr);

    return () => {
      Router.events.off("routeChangeStart", onStart);
      Router.events.off("routeChangeComplete", onDone);
      Router.events.off("routeChangeError", onErr);
    };
  }, [start, complete]);

  return <>{children}</>;
}

// -----------------------------------------------------------------------------
// SCRIPT
// -----------------------------------------------------------------------------
type InternalSettings = {
  minimum: number;
  easing: string;
  speed: number;
  trickle: boolean;
  trickleSpeed: number;
};

const defaultSettings = {
  minimum: 0.08,
  easing: "linear",
  speed: 200,
  trickle: true,
  trickleSpeed: 200,
} as const satisfies InternalSettings;

let settings: InternalSettings = { ...defaultSettings };
let progressValue: number | null = null;
let queuePending: Array<(next: () => void) => void> = [];

function isRunning(): boolean {
  return typeof progressValue === "number";
}

function barTransformStyle({
  n,
  speed,
  ease,
  perc,
}: {
  n: number;
  speed: number;
  ease: string;
  perc?: number;
}): Record<string, string> {
  const computedPerc = perc ?? toTranslatePercent(n);
  return {
    transform: `translate3d(${computedPerc}%,0,0)`,
    transition: `all ${speed}ms ${ease}`,
  };
}

function drainQueue(): void {
  const fn = queuePending.shift();
  if (fn) fn(drainQueue);
}

function applyProgress(n: number): void {
  const started = isRunning();
  n = clamp(n, settings.minimum, MAX);
  progressValue = n === MAX ? null : n;

  const ensureBarRoots = (fromStart: boolean): HTMLElement[] => {
    const body = document.body;
    let roots = Array.from(
      body.querySelectorAll<HTMLElement>(`.${ROOT_CLASS}`),
    );

    if (roots.length === 0) {
      document.documentElement.classList.add(DOCUMENT_LOADING_CLASS);

      const root = document.createElement("div");
      root.className = ROOT_CLASS;
      const bar = document.createElement("div");
      bar.className = BAR_CLASS;
      const edge = document.createElement("div");
      edge.className = "route-progress__edge-glow";
      bar.append(edge);
      root.append(bar);
      body.append(root);
      roots = [root];
    }

    for (const root of roots) {
      document.documentElement.classList.add(DOCUMENT_LOADING_CLASS);

      const bar = root.querySelector(BAR_SELECTOR) as HTMLElement | null;
      if (!bar) continue;

      const perc = fromStart
        ? toTranslatePercent(0)
        : toTranslatePercent(progressValue ?? 0);
      applyStyles(
        bar,
        barTransformStyle({
          n: progressValue ?? 0,
          speed: settings.speed,
          ease: settings.easing,
          perc,
        }),
      );
    }

    return roots;
  };

  const roots = ensureBarRoots(!started);
  const { speed, easing } = settings;

  for (const el of roots) {
    el.offsetWidth;
  }

  queuePending.push((next) => {
    for (const root of roots) {
      const bar = root.querySelector(BAR_SELECTOR) as HTMLElement | null;
      if (!bar) continue;
      applyStyles(bar, barTransformStyle({ n, speed, ease: easing }));
    }

    if (n === MAX) {
      for (const root of roots) {
        applyStyles(root, { transition: "none", opacity: "1" });
        root.offsetWidth;
      }
      window.setTimeout(() => {
        for (const root of roots) {
          applyStyles(root, {
            transition: `opacity ${speed}ms ${easing}`,
            opacity: "0",
          });
        }
        const head = roots[0];
        if (!head) {
          next();
          return;
        }
        let settled = false;
        const settle = () => {
          if (settled) return;
          settled = true;
          window.clearTimeout(fallbackId);
          head.removeEventListener("transitionend", onOpacityEnd);
          for (const r of roots) r.remove();
          next();
        };
        const onOpacityEnd = (ev: TransitionEvent) => {
          if (ev.propertyName !== "opacity") return;
          settle();
        };
        head.addEventListener("transitionend", onOpacityEnd);
        const fallbackId = window.setTimeout(settle, speed);
      }, speed);
    } else {
      window.setTimeout(next, speed);
    }
  });
  if (queuePending.length === 1) drainQueue();
}

function beginTrickle(): void {
  if (!progressValue) applyProgress(0);

  const tick = (): void => {
    window.setTimeout(() => {
      if (!isRunning()) return;
      bumpProgress();
      tick();
    }, settings.trickleSpeed);
  };

  if (settings.trickle) tick();
}

function bumpProgress(amount?: number): void {
  const n = progressValue;

  if (!n) {
    beginTrickle();
    return;
  }
  if (n > 1) return;

  let delta: number;
  if (typeof amount === "number") {
    delta = amount;
  } else if (n < 0.2) delta = 0.1;
  else if (n < 0.5) delta = 0.04;
  else if (n < 0.8) delta = 0.02;
  else if (n < 0.99) delta = 0.005;
  else delta = 0;

  applyProgress(clamp(n + delta, 0, 0.994));
}
