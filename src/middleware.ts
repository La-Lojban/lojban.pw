import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

// This function can be marked `async` if using `await` inside
export function middleware(request: NextRequest) {
	// const url = request.nextUrl.clone();
	// const rebuiltUrl = `/${url.pathname
	// 	.replace(/^\//, "")
	// 	.replace(/\/$/, "")
	// 	.replace(/\//g, "-")}/`;

	// if (url.pathname !== rebuiltUrl) {
	// 	url.pathname = rebuiltUrl;
	// 	return NextResponse.redirect(url);
	// }

	return NextResponse.next();
}

// export const config = {
// 	matcher: "/about/:path*",
// };
