export function sanitizeUrl(
	url: string,
	{ addProtocol } = { addProtocol: false }
) {
	// Remove any whitespace from the beginning or end of the URL
	url = url.trim();

	// Remove any quotes from the URL
	url = url.replace(/['"]+/g, "");

	// Remove any spaces from the URL
	url = url.replace(/\s/g, "");

	// Remove any characters that are not alphanumeric, forward slashes, dots, colons or dashes
	// url = url.replace(/[^a-zA-Z0-9/.\-:_]/g, "");

	// Add a protocol if the URL does not already have one
	if (addProtocol && !url.startsWith("http://") && !url.startsWith("https://"))
		url = "https://" + url;

	return url;
}
