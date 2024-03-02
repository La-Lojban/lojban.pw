export interface TreeItem {
	type: string;
	props: any;
	children?: TreeItem[];

	rawTagName?: string;
	rawAttrs?: any;
	childNodes?: TreeItem[];
	_rawText?: string;
}