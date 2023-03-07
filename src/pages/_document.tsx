import Document, { Html, Head, Main, NextScript } from "next/document";

export default class MyDocument extends Document {
	render() {
		return (
			<Html lang="en">
				<Head>
					<link
						rel="stylesheet"
						href="https://cdn.jsdelivr.net/npm/katex@0.16.0/dist/katex.min.css"
						integrity="sha384-Xi8rHCmBmhbuyyhbI88391ZKP2dmfnOl4rT9ZfRI7mLTdk1wblIUnrIq35nqwEvC"
						crossOrigin="anonymous"
					/>
				</Head>
				<body className="bg-gray-100">
					<Main />
					<NextScript />
				</body>
			</Html>
		);
	}
}
