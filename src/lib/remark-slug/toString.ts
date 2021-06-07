/**
 * @typedef Options
 * @property {boolean} [includeImageAlt=true]
 */

type Options = {
	includeImageAlt: boolean
}

/**
 * Get the text content of a node.
 * Prefer the node’s plain-text fields, otherwise serialize its children,
 * and if the given value is an array, serialize the nodes in it.
 *
 * @param {unknown} node
 * @param {Options} [options]
 * @returns {string}
 */
export function toString(node: unknown, options?: Options): string {
	const { includeImageAlt = true } = options || {}
	return one(node, includeImageAlt)
}

/**
 * @param {unknown} node
 * @param {boolean} includeImageAlt
 * @returns {string}
 */
function one(node: unknown, includeImageAlt: boolean = true): string {
	return (
		(node &&
			typeof node === 'object' &&
			// @ts-ignore looks like a literal.
			(node.value ||
				// @ts-ignore looks like an image.
				(includeImageAlt ? node.alt : '') ||
				// @ts-ignore looks like a parent.
				('children' in node && all(node.children, includeImageAlt)) ||
				(Array.isArray(node) && all(node, includeImageAlt)))) ||
		''
	)
}

/**
 * @param {Array.<unknown>} values
 * @param {boolean} includeImageAlt
 * @returns {string}
 */
function all(values: Array<unknown>, includeImageAlt: boolean = true): string {
	/** @type {Array.<string>} */
	var result: Array<string> = []
	var index = -1

	while (++index < values.length) {
		result[index] = one(values[index], includeImageAlt)
	}

	return result.join('')
}