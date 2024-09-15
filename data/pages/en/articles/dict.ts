import * as fs from "fs";

interface Metadata {
  [key: string]: string;
}

interface JsonObject {
  [key: string]: any;
  "@metadata"?: Metadata;
}

const capitalize = (str: string) => str.charAt(0).toUpperCase() + str.slice(1);
const decapitalize = (str: string) => str.charAt(0).toLowerCase() + str.slice(1);

function jsonToMarkdown(
  json: JsonObject,
  indent: string = "",
  level: number = 0
): string {
  let markdown = "";

  // Add front matter with title
  if (json["@metadata"]) {
    markdown += "---\n";
    for (const [key, value] of Object.entries(json["@metadata"])) {
      markdown += `${key}: ${value}\n`;
    }
    markdown += "---\n";
  }

  for (const [key, value] of Object.entries(json)) {
    if (key === "@metadata") continue; // Skip metadata as it's already in front matter

    if (level === 0) {
      // Top-level keys become h1 headers
      markdown += `\n# ${key}\n\n`;
      if (typeof value === "object" && value !== null) {
        markdown += jsonToMarkdown(value, indent + "  ", level + 1);
      } else {
        markdown += `${value}\n\n`;
      }
    } else if (level === 1) {
      // Second-level keys become h2 headers
      markdown += `## ${capitalize(key)}\n\n`;
      if (typeof value === "object" && value !== null) {
        markdown += jsonToMarkdown(value, indent + "  ", level + 1);
      } else {
        markdown += `${value}\n\n`;
      }
    } else {
      const indent_ = indent.replace(/    $/, "");
      // Nested levels remain as lists
      if (Array.isArray(value)) {
        if (key === "equivalents") {
          markdown += `${indent_}- ${key}:\n`;
          value.forEach((item) => {
            markdown += `${indent_}  - ${item}\n`;
          });
        } else {
          markdown += `${indent_}- ${key}:\n`;
          value.forEach((item, index) => {
            markdown += `${indent_}  - ${index + 1}:\n`;
            markdown += jsonToMarkdown(item, indent + "    ", level + 1);
          });
        }
      } else if (typeof value === "object" && value !== null) {
        markdown += `${indent_}- ${key}:\n`;
        markdown += jsonToMarkdown(value, indent + "  ", level + 1);
      } else {
        markdown += `${indent_}- ${key}: ${value}\n`;
      }
    }
  }

  return markdown;
}

function markdownToJson(markdown: string): JsonObject {
  const lines = markdown.split("\n");
  const json: JsonObject = { "@metadata": {} };
  const stack: {
    obj: JsonObject | any[];
    indent: number;
    isArray: boolean;
    key: string | null;
  }[] = [{ obj: json, indent: -1, isArray: false, key: null }];
  let inFrontMatter = false;
  let currentH1: string | null = null;
  let currentH2: string | null = null;
  let currentText: string | null = null;

  lines.forEach((line) => {
    if (line.trim() === "---") {
      inFrontMatter = !inFrontMatter;
      return;
    }

    if (inFrontMatter) {
      const [key, ...valueParts] = line.split(":");
      const value = valueParts.join(":").trim();
      if (key && value) {
        json["@metadata"]![key.trim()] = value;
      }
      return;
    }

    if (line.trim() === "") return;

    if (line.startsWith("# ")) {
      // Handle top-level (h1) headers
      currentH1 = line.slice(2).trim();
      currentH2 = null;
      json[currentH1] = {};
      stack[0] = { obj: json[currentH1], indent: 0, isArray: false, key: null };
      return;
    }
    if (line.startsWith("## ")) {
      // Handle second-level (h2) headers
      currentH2 = decapitalize(line.slice(3).trim());
      if (currentH1) {
        (json[currentH1] as JsonObject)[currentH2] = {};
        stack[0] = {
          obj: (json[currentH1] as JsonObject)[currentH2],
          indent: 0,
          isArray: false,
          key: null,
        };
      }
      return;
    }
    if (!line.trim().startsWith("- ")) {
      // Handle 0-level text
      currentText = line.trim();
      if (currentH1 && currentH2) {
        (json[currentH1] as JsonObject)[currentH2] = currentText;
        stack[0] = {
          obj: (json[currentH1] as JsonObject)[currentH2],
          indent: 0,
          isArray: false,
          key: null,
        };
      }
      return;
    }

    const indent = line.search(/\S/);
    const [key, ...valueParts] = line.trim().replace(/^- /, "").split(":");
    let value = valueParts.join(":").trim();

    while (stack.length > 1 && indent <= stack[stack.length - 1].indent) {
      stack.pop();
    }

    const parent = stack[stack.length - 1].obj;
    const parentIsArray = stack[stack.length - 1].isArray;
    const parentKey = stack[stack.length - 1].key;

    if (value === "") {
      const isArray = false;
      const newObj: JsonObject = {};
      if (parentIsArray) {
        (parent as any[]).push(newObj);
      } else {
        (parent as JsonObject)[key] = newObj;
      }
      stack.push({ obj: newObj, indent, isArray, key });
    } else {
      try {
        const parsedValue = JSON.parse(value);
        if (parentIsArray) {
          (parent as any[]).push(parsedValue);
        } else {
          (parent as JsonObject)[key] = parsedValue;
        }
      } catch {
        if (parentIsArray) {
          (parent as any[]).push(value);
        } else {
          (parent as JsonObject)[key] = value;
        }
      }
    }
  });

  return convertExamplesToArrays(json);
}

function convertExamplesToArrays(obj: any, parent: any = null): any {
  if (typeof obj !== "object" || obj === null) {
    return obj;
  }

  if (Array.isArray(obj)) {
    return obj.map((item) => convertExamplesToArrays(item, parent));
  }

  const result: JsonObject = {};
  for (const [key, value] of Object.entries(obj)) {
    if (obj.definitions) {
      const clone = { ...obj };

      delete clone.definitions;
      result["definitions"] = [
        {
          ...clone,
          definition: (obj.definitions as any)[1].definition,
          examples: (obj.definitions as any)[1].examples
            ? Object.values((obj.definitions as any)[1].examples).map(
                convertExamplesToArrays
              )
            : undefined,
        },
      ];
      break;
    }

    if (key === "examples") continue;
    if (key === "equivalents") {
      // Add a type guard to check if value is an object
      if (typeof value === "object" && value !== null) {
        result[key] = Object.keys(value);
      } else {
        // Handle the case where value is not an object
        result[key] = [];
      }
    } else {
      result[key] = convertExamplesToArrays(value);
    }
  }

  return result;
}

// Read the JSON file
console.log("Reading cmavo.json...");
const jsonData: JsonObject = JSON.parse(fs.readFileSync("cmavo.json", "utf8"));

// Convert JSON to Markdown
console.log("Converting JSON to Markdown...");
const markdown = jsonToMarkdown(jsonData);

// Write the Markdown to a file
console.log("Writing Markdown to !cmavo.md...");
fs.writeFileSync("!cmavo.md", markdown);

// Read the Markdown file
console.log("Reading !cmavo.md...");
const markdownData = fs.readFileSync("!cmavo.md", "utf8");

// Convert Markdown back to JSON
console.log("Converting Markdown back to JSON...");
const newJsonData = markdownToJson(markdownData);

// Write the new JSON to a file
console.log("Writing JSON to cmavo.json...");
fs.writeFileSync("cmavo.json", JSON.stringify(newJsonData, null, 2));

console.log("Conversion completed. Check cmavo.json and !cmavo.md");
