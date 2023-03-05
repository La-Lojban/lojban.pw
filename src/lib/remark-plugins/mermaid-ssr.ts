import { chromium } from "playwright";
import { visit } from "unist-util-visit";
import { promises as fs } from "fs";

export type Security = "strict" | "loose" | "antiscript" | "sandbox";

export enum LogLevel {
	Debug = 1,
	Info,
	Warn,
	Error,
	Fatal,
}

export interface FlowchartDiagramOptions {
	[key: string]: unknown;
}

export interface SequenceDiagramOptions {
	[key: string]: unknown;
}

export interface GanttDiagramOptions {
	[key: string]: unknown;
}

export interface JourneyDiagramOptions {
	[key: string]: unknown;
	diagramMarginX?: number;
	diagramMarginY?: number;
	leftMargin?: number;
	width?: number;
	height?: number;
	boxMargin?: number;
	boxTextMargin?: number;
	noteMargin?: number;
	messageMargin?: number;
	messageAlign?: number;
	bottomMarginAdj?: number;
	useMaxWidth?: boolean;
	rightAngles?: number;
	defaultRenderer?: "dagre-d3" | "dagre-wrapper";
}

export interface PieChartOptions {
	[key: string]: unknown;
	useMaxWidth?: boolean;
}

export interface RequirementDiagramOptions {
	[key: string]: unknown;
	useMaxWidth?: boolean;
}

export interface GitGraphOptions {
	[key: string]: unknown;
}

export interface StateDiagramOptions {
	[key: string]: unknown;
}

export interface ErDiagramOptions {
	[key: string]: unknown;
}

export interface ThemeOptions {
	theme?: string;
	customCss?: string;
	variables?: unknown;
}

export interface DarkOptions {
	enable?: boolean;
	theme?: string | ThemeOptions;
}

export interface StyleOptions {
	fontFamily?: string;
	maxTextSize?: number;
}

export interface Options {
	security?: string;
	theme?: string | ThemeOptions;
	renderDark?: DarkOptions | boolean;
	logLevel?: LogLevel;
	flowchart?: FlowchartDiagramOptions;
	sequence?: SequenceDiagramOptions;
	gantt?: GanttDiagramOptions;
	journey?: JourneyDiagramOptions;
	pie?: PieChartOptions;
	requirement?: RequirementDiagramOptions;
	er?: ErDiagramOptions;
	git?: GitGraphOptions;
	state?: StateDiagramOptions;
	freeze?: (keyof Options)[];
	style?: StyleOptions;

	__mermaid?: {
		__darkMode?: any;
	};
}

function translate(
	options: Options,
	mode: "light" | "dark"
): Record<string, unknown> {
	const darkOptions =
		typeof options.renderDark === "boolean"
			? { enable: options.renderDark }
			: options.renderDark;
	const theme = mode === "dark" ? darkOptions?.theme : options.theme;

	return {
		securityLevel: options.security as Security,
		theme: ((typeof theme === "string" ? theme : theme?.theme) ??
			(mode === "dark" ? "dark" : undefined)) as string,
		themeCSS: typeof theme === "object" ? theme.customCss : undefined,
		themeVariables: typeof theme === "object" ? theme.variables : undefined,
		darkMode: mode === "dark",
		logLevel: (options.logLevel ??
			LogLevel.Error) as number,
		flowchart: options.flowchart,
		sequence: options.sequence,
		gantt: options.gantt,
		journey: options.journey,
		pie: options.pie,
		requirement: options.requirement,
		er: options.er,
		git: options.git,
		state: options.state,
		secure: options.freeze as string[],
		fontFamily: options.style?.fontFamily,
		maxTextSize: options.style?.maxTextSize,

		...options.__mermaid,
		...((mode === "dark" && options.__mermaid?.__darkMode) || {}),
	};
}

function randomAlphaNumeric(length: number): string {
	const chars = "abcdefghijklmnopqrstuvwxyz0123456789";
	return Array.from(
		{ length },
		() => chars[Math.floor(Math.random() * (chars.length - 1))]
	).join("");
}

export default function mermaid(options: Options) {
	const enableDark =
		typeof options.renderDark === "boolean"
			? options.renderDark
			: options.renderDark?.enable !== false;

	return async function transformer(ast: any) {
		const browser = await chromium.launch();

		const render = async (
			source: string,
			config: any,
			mode: "light" | "dark"
		) => {
			const page = await browser.newPage();
			page.on("console", (event) => console.log(event.text()));
			await page.evaluate(
				await fs.readFile("./node_modules/mermaid/dist/mermaid.min.js", "utf-8")
			);
			const rendered = await page.evaluate(
				async (object) => {
					const { config, id, mode, source } = object;
					{
						const mermaid = (window as any)[
							"mermaid"
						] as unknown as typeof import("mermaid").default;
						const wrapper = document.createElement("div");
						wrapper.classList.add("mermaid", "mermaid__" + mode);
						if (id) wrapper.id = id;
						mermaid.initialize(config);
						wrapper.innerHTML = (mermaid.render(id, source));
						return wrapper.outerHTML;
					}
				},
				{ mode, source, config, id: "mermaid-" + randomAlphaNumeric(7) }
			);
			page.close();
			return rendered;
		};

		const data: any[] = [];

		const visitor: any = (node: { lang: string; value: any; }, index: number, parent: any) => {
			if (node.lang !== "mermaid") return;

			data.push({
				value: node.value,
				index,
				parent,
			});
		};

		visit(ast, "code", visitor, true);

		await Promise.all(
			data.map(async ({ value, index, parent }) => {
				const theme = enableDark ? "dark" : "light";
				const svg = await render(value, translate(options, theme), theme);
				parent.children.splice(index, 1, {
					type: "html",
					value: svg,
				});
			})
		);

		try {
			await browser.close();
		} catch (error) {}

		return ast;
	};
}
