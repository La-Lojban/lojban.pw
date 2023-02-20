import App, { AppContext, AppProps } from "next/app";
import "../styles/index.css";
import NProgress from "nprogress";
import Router from "next/router";
import "../styles/nprogress.css";

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

export default function MyApp({ Component, pageProps }: AppProps) {
	useEffect(() => {
		
		document.addEventListener("scroll", debouncedGetClosestHeaderId);
		return () => {
		  document.removeEventListener("scroll", debouncedGetClosestHeaderId);
		};
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
