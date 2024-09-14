const fs = require('fs');

function jsonToMarkdown(json, indent = '') {
  let markdown = '';

  for (const [key, value] of Object.entries(json)) {
    if (Array.isArray(value)) {
      if (key === 'equivalents') {
        markdown += `${indent}- ${key}:\n`;
        value.forEach(item => {
          markdown += `${indent}  - ${item}\n`;
        });
      } else {
        markdown += `${indent}- ${key}:\n`;
        value.forEach((item, index) => {
          markdown += `${indent}  - ${index+1}:\n`;
          markdown += jsonToMarkdown(item, indent + '    ');
        });
      }
    } else if (typeof value === 'object' && value !== null) {
      markdown += `${indent}- ${key}:\n`;
      markdown += jsonToMarkdown(value, indent + '  ');
    } else {
      markdown += `${indent}- ${key}: ${(value)}\n`;
    }
  }

  return markdown;
}

function markdownToJson(markdown) {
  const lines = markdown.split('\n');
  const json = {};
  const stack = [{ obj: json, indent: -1, isArray: false, key: null }];

  lines.forEach(line => {
    if (line.trim() === '') return;

    const indent = line.search(/\S/);
    const [key, ...valueParts] = line.trim().slice(2).split(':');
    let value = valueParts.join(':').trim();

    while (stack.length > 1 && indent <= stack[stack.length - 1].indent) {
      stack.pop();
    }

    const parent = stack[stack.length - 1].obj;
    const parentIsArray = stack[stack.length - 1].isArray;
    const parentKey = stack[stack.length - 1].key;

    if (value === '') {
      const isArray = false;
      const newObj = {};
      if (parentIsArray) {
        parent.push(newObj);
      } else {
        parent[key] = newObj;
      }
      stack.push({ obj: newObj, indent, isArray, key });
    } else {
      try {
        const parsedValue = JSON.parse(value);
        if (parentIsArray) {
          parent.push(parsedValue);
        } else {
          parent[key] = parsedValue;
        }
      } catch {
        if (parentIsArray) {
          parent.push(value);
        } else {
          parent[key] = value;
        }
      }
    }
  });

  return convertExamplesToArrays(json);
}

function convertExamplesToArrays(obj) {
  if (typeof obj !== 'object' || obj === null) {
    return obj;
  }

  if (Array.isArray(obj)) {
    return obj.map(convertExamplesToArrays);
  }

  const result = {};
  for (const [key, value] of Object.entries(obj)) {
    if (key === 'examples') continue;
    if (key === 'equivalents') {
      result[key] = Object.keys(value);
    } else if (key === 'definitions') {
      console.log(obj);
      result[key] = [{
        "definition": value['1'].definition,
        examples: obj.definitions[1].examples ? Object.values(obj.definitions[1].examples).map(convertExamplesToArrays) : undefined
      }];
      delete obj.examples;
    } else {
      result[key] = convertExamplesToArrays(value);
    }
  }

  return result;
}

// Read the JSON file
console.log('Reading cmavo.json...');
const jsonData = JSON.parse(fs.readFileSync('cmavo.json', 'utf8'));

// Convert JSON to Markdown
console.log('Converting JSON to Markdown...');
const markdown = jsonToMarkdown(jsonData);

// Write the Markdown to a file
console.log('Writing Markdown to cmavo.md...');
fs.writeFileSync('!cmavo.md', markdown);

// Read the Markdown file
console.log('Reading !cmavo.md...');
const markdownData = fs.readFileSync('!cmavo.md', 'utf8');

// Convert Markdown back to JSON
console.log('Converting Markdown back to JSON...');
const newJsonData = markdownToJson(markdownData);

// Write the new JSON to a file
console.log('Writing JSON to cmavo.json...');
fs.writeFileSync('cmavo.json', JSON.stringify(newJsonData, null, 2));

console.log('Conversion completed. Check cmavo3.json');
