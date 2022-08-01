export function closeXicon() {
	try {
		(document as any).getElementById("xicon").parentNode.click()
	} catch (error) { }
}