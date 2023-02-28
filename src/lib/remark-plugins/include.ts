import path from "path";
import { remark } from "remark";
import { readSync } from "to-vfile";

function flatMap(ast: any, fn: any) {
	return transform(ast, 0, null)[0];

	function transform(node: any, index: number, parent: null) {
		if (node.children) {
			var out = [];
			for (var i = 0, n = node.children.length; i < n; i++) {
				var xs = transform(node.children[i], i, node);
				if (xs) {
					for (var j = 0, m = xs.length; j < m; j++) {
						out.push(xs[j]);
					}
				}
			}
			node.children = out;
		}

		return fn(node, index, parent);
	}
}

export default function includeMarkdownPlugin({ resolveFrom }: any): any {
	return function transformer(tree: any, file: { dirname: any; path: any }) {
		return flatMap(
			tree,
			(node: {
				type: string;
				children: { value: string }[];
				position: { start: { line: any; column: any } };
			}) => {
				if (node.type !== "paragraph") return [node];
				// detect an `@include` statement
				const includeMatch = node?.children?.[0]?.value?.match(
					/^@include\s['"](.*)['"]$/
				);
				if (!includeMatch) return [node];

				// read the file contents
				const includePath = path.join(
					resolveFrom || file.dirname,
					includeMatch[1]
				);
				let includeContents;
				try {
					includeContents = readSync(includePath, "utf8");
				} catch (err) {
					throw new Error(
						`The @include file path at ${includePath} was not found.\n\nInclude Location: ${file.path}:${node.position.start.line}:${node.position.start.column}`
					);
				}

				// if we are including a ".md" file, we add the contents as processed markdown
				// if any other file type, they are embedded into a code block
				if (includePath.match(/\.md$/)) {
					// return the file contents in place of the @include
					// (takes a couple steps because we're processing includes with remark)
					const processor = remark();
					// use the includeMarkdown plugin to allow recursive includes
					processor.use(includeMarkdownPlugin, { resolveFrom });
					// Process the file contents, then return them
					const ast = processor.parse(includeContents);
					const res = processor.runSync(ast, includeContents);
					return res.children;
				} else {
					// trim trailing newline
					includeContents.value = (includeContents.value ?? "")
						.toString()
						.trim();

					// return contents wrapped inside a "code" node
					return [
						{
							type: "code",
							lang: includePath?.match(/\.(\w+)$/)?.[1],
							value: includeContents,
						},
					];
				}
			}
		);
	};
}
