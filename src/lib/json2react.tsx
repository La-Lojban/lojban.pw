import React from "react";
import parse, {
	attributesToProps,
	Element,
	domToReact,
} from "html-react-parser";
import { PostProps } from "../types/post";
// import { TreeItem } from "../types/tree";

export function buildDOMFromJSONBasic(
	html: string,
	{ state, setState }: Partial<PostProps<any>>
): JSX.Element {
	return parse(html, {
		replace: (domNode) => {
			// if (
			// 	domNode instanceof Element &&
			// 	domNode.attribs?.class?.split(" ")?.includes("figure_img")
			// ) {
			// 	const props = attributesToProps(domNode.attribs);
			// 	const el = React.createElement(
			// 		domNode.tagName,
			// 		{
			// 			...props,
			// 			onClick: () => {
			// 				setState &&
			// 					setState((p: { galleryShown: boolean }) => ({
			// 						...p,
			// 						galleryShown: !p.galleryShown,
			// 						currentImgUrl: domNode.attribs["data-url"],
			// 					}));
			// 			},
			// 		},
			// 		domToReact(domNode.children)
			// 	);
			// 	return el;
			// } else 
			if (domNode instanceof Element && domNode.attribs?.onclick) {
				const {onclick, ...props} = attributesToProps(domNode.attribs);
				const el = React.createElement(
					domNode.tagName,
					{
						...props,
						onClick: () => {
							eval(domNode.attribs.onclick);
						},
					},
					domToReact(domNode.children)
				);
				return el;
			}
			return domNode;
		},
	}) as JSX.Element;
}

//TODO: the following conversion from HTML to JSX is not fully functional
// function trimFirstLastChar(str: string) {
// 	return str.substring(1, str.length - 1);
// }

// function parseInlineStyle(styleString: string) {
// 	const styles: { [key: string]: number | boolean | string } = {};
// 	const stylePairs = styleString.split(";");

// 	stylePairs.forEach((pair) => {
// 		const [property, value] = pair.split(":");
// 		if (property && value) {
// 			const propName = property
// 				.trim()
// 				.replace(/-([a-z])/g, (g) => g[1].toUpperCase());
// 			styles[propName] = value.trim();
// 		}
// 	});

// 	return styles;
// }

// const regex = /\s+(?=\S+=)/g;

// function buildProps(propsString: string) {
// 	if (!propsString) {
// 		return {};
// 	}

// 	return propsString
// 		.split(regex)
// 		.reduce((acc: { [x: string]: any }, param: string) => {
// 			const [key, value] = param.split("=");
// 			acc[key] = trimFirstLastChar(value);
// 			return acc;
// 		}, {});
// }

// function processHtmlNodeParserTree(jsonData: TreeItem): TreeItem {
// 	const keys = Object.keys(jsonData);

// 	keys.forEach((key) => {
// 		if (key === "rawTagName" && jsonData.rawTagName !== undefined) {
// 			jsonData.type = jsonData.rawTagName;
// 			delete jsonData.rawTagName;
// 		} else if (key === "rawAttrs" && jsonData.rawAttrs !== undefined) {
// 			jsonData.props = buildProps(jsonData.rawAttrs);
// 			if (jsonData?.props?.style !== undefined)
// 				jsonData.props.style = parseInlineStyle(jsonData.props.style);
// 			delete jsonData.rawAttrs;
// 		} else if (key === "childNodes" && Array.isArray(jsonData.childNodes)) {
// 			jsonData.children = jsonData.childNodes.map((child) =>
// 				processHtmlNodeParserTree(child)
// 			);
// 			delete jsonData.childNodes;
// 		}
// 	});

// 	return jsonData;
// }

// export function buildDOMFromJSON(jsonData: TreeItem): JSX.Element {
// 	const { type, props, children, _rawText } =
// 		processHtmlNodeParserTree(jsonData);

// 	const childElements = children
// 		? children.map((child) => buildDOMFromJSON(child))
// 		: [];

// 	return React.createElement(
// 		type ?? "div",
// 		props ?? {},
// 		childElements.length === 0 ? undefined : childElements
// 	);
// }

// export function serializeHTMLNodeTree(obj: any): any {
// 	if (typeof obj !== "object" || obj === null) {
// 		// base case: return primitives unchanged
// 		return obj;
// 	}

// 	if (Array.isArray(obj)) {
// 		// recursive case: handle arrays
// 		return obj.map((item) => serializeHTMLNodeTree(item));
// 	}

// 	// recursive case: handle objects
// 	const { rawTagName, rawAttrs, childNodes, _rawText } = obj;
// 	if (rawTagName === undefined) return null;
// 	const result: { [key: string]: any } = {
// 		rawTagName,
// 		rawAttrs,
// 		childNodes,
// 	};

// 	if (_rawText !== undefined) result._rawText = _rawText;
// 	// if (rawTagName === "h1") console.log(util.inspect(obj, { depth: 2 }));

// 	if (Array.isArray(childNodes)) {
// 		result.childNodes = childNodes
// 			.map((item) => serializeHTMLNodeTree(item))
// 			.filter(Boolean);
// 	}
// 	return result;
// }
