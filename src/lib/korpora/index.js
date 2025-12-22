"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g = Object.create((typeof Iterator === "function" ? Iterator : Object).prototype);
    return g.next = verb(0), g["throw"] = verb(1), g["return"] = verb(2), typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
/// <reference path="./types.d.ts" />
var fs = require("fs");
var path = require("path");
var google_spreadsheet_1 = require("google-spreadsheet");
var prettier = require("prettier");
var archiver = require("archiver");
var sluggify = require("../html-prettifier/slugger").sluggify;
var locales_json_1 = require("../../config/locales.json");
var _a = require("../paths"), getMdPagesPath = _a.getMdPagesPath, getPublicAssetsPath = _a.getPublicAssetsPath, getStylesPath = _a.getStylesPath, getTmpPath = _a.getTmpPath;
var allLanguages = Object.keys(locales_json_1.languages);
var MAX_CONCURRENT_TASKS = 20;
var TSV_FOLDER_NAME = "korpora-tsv";
var tsvOutputDir = path.join(getPublicAssetsPath(), TSV_FOLDER_NAME);
var tsvIndexFilename = "korpora-tsv.md";
function parseTableCell(cellContent) {
    if (!cellContent)
        return "";
    var rows = cellContent.split("||");
    var tableHtml = '<table class="inner-table w-full border-collapse border border-gray-300">';
    rows.forEach(function (row) {
        var cells = row.split("|");
        tableHtml += "<tr>";
        cells.forEach(function (cell) {
            tableHtml += "<td class=\"border border-gray-300 px-2 py-1\">".concat(escapeHtml(cell.trim()), "</td>");
        });
        tableHtml += "</tr>";
    });
    tableHtml += "</table>";
    return tableHtml;
}
if (!process.env.GOOGLE_LOJBAN_CORPUS_DOC_ID) {
    console.log("generation cancelled, no GOOGLE_LOJBAN_CORPUS_DOC_ID in .env file specified");
    process.exit();
}
if (!process.env.GOOGLE_READONLY_API_KEY) {
    console.log("generation cancelled, no GOOGLE_READONLY_API_KEY in .env file specified");
    process.exit();
}
var doc = new google_spreadsheet_1.GoogleSpreadsheet(process.env.GOOGLE_LOJBAN_CORPUS_DOC_ID);
doc.useApiKey(process.env.GOOGLE_READONLY_API_KEY);
function prettifyGraymatter(str) {
    return str
        .replace(/[\r\n]/g, " ")
        .replace(/ {2,}/g, " ")
        .replace(/:/g, "");
}
function escapeHtml(text) {
    var map = {
        "&": "&amp;",
        "<": "&lt;",
        ">": "&gt;",
        '"': "&quot;",
        "'": "&#039;",
    };
    return text.replace(/[&<>"']/g, function (m) { return map[m]; });
}
function sanitizeTsvValue(value) {
    if (value === null || value === undefined)
        return "";
    return String(value).replace(/\t/g, " ").replace(/\r?\n/g, " ").trim();
}
function shouldIncludeInTsv(header) {
    var lower = (header !== null && header !== void 0 ? header : "").toLowerCase();
    return (lower.includes("glico") ||
        lower.includes("lojbo") ||
        lower.includes("original") ||
        lower.includes("source"));
}
function buildTsvContent(columns, langs) {
    var _a, _b;
    if (!(langs === null || langs === void 0 ? void 0 : langs.length))
        return "";
    var selectedHeaders = [];
    langs.forEach(function (header, index) {
        if (index === 0 || shouldIncludeInTsv(header)) {
            if (!selectedHeaders.includes(header))
                selectedHeaders.push(header);
        }
    });
    if (!selectedHeaders.length)
        return "";
    var rowCount = (_b = (_a = columns[selectedHeaders[0]]) === null || _a === void 0 ? void 0 : _a.length) !== null && _b !== void 0 ? _b : 0;
    var lines = [];
    lines.push(selectedHeaders.map(function (h) { return sanitizeTsvValue(h); }).join("\t"));
    var _loop_1 = function (i) {
        var row = selectedHeaders.map(function (header) { var _a; return sanitizeTsvValue((_a = columns[header]) === null || _a === void 0 ? void 0 : _a[i]); });
        lines.push(row.join("\t"));
    };
    for (var i = 0; i < rowCount; i++) {
        _loop_1(i);
    }
    return lines.join("\n");
}
function writeTsvFile(slug, tsvContent) {
    if (!tsvContent)
        return;
    fs.mkdirSync(tsvOutputDir, { recursive: true });
    var tsvPath = path.join(tsvOutputDir, "".concat(slug, ".tsv"));
    fs.writeFileSync(tsvPath, tsvContent);
}
function createTsvZip() {
    return __awaiter(this, void 0, void 0, function () {
        var tsvFiles, zipFilename, zipPath;
        return __generator(this, function (_a) {
            tsvFiles = fs
                .readdirSync(tsvOutputDir, { withFileTypes: true })
                .filter(function (dirent) { return dirent.isFile() && dirent.name.endsWith(".tsv"); })
                .map(function (dirent) { return dirent.name; })
                .sort();
            if (tsvFiles.length === 0)
                return [2 /*return*/, null];
            zipFilename = "korpora-tsv-all.zip";
            zipPath = path.join(tsvOutputDir, zipFilename);
            return [2 /*return*/, new Promise(function (resolve, reject) {
                    var output = fs.createWriteStream(zipPath);
                    var archive = archiver("zip", {
                        zlib: { level: 9 },
                    });
                    output.on("close", function () {
                        resolve(zipFilename);
                    });
                    archive.on("error", function (err) {
                        reject(err);
                    });
                    archive.pipe(output);
                    tsvFiles.forEach(function (file) {
                        archive.file(path.join(tsvOutputDir, file), { name: file });
                    });
                    archive.finalize();
                })];
        });
    });
}
function writeTsvIndexFile() {
    return __awaiter(this, void 0, void 0, function () {
        var mdPagesPath, targetDirectory, tsvFiles, zipFilename, listBody, zipLink, content, targetPath, formatted;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    mdPagesPath = getMdPagesPath();
                    if (!fs.existsSync(mdPagesPath))
                        return [2 /*return*/];
                    targetDirectory = path.join(mdPagesPath, "en");
                    fs.mkdirSync(targetDirectory, { recursive: true });
                    tsvFiles = fs
                        .readdirSync(tsvOutputDir, { withFileTypes: true })
                        .filter(function (dirent) { return dirent.isFile() && dirent.name.endsWith(".tsv"); })
                        .map(function (dirent) { return dirent.name; })
                        .sort();
                    return [4 /*yield*/, createTsvZip()];
                case 1:
                    zipFilename = _a.sent();
                    listBody = tsvFiles.length === 0
                        ? "_No TSV files generated._"
                        : tsvFiles
                            .map(function (file) {
                            var title = path.parse(file).name;
                            return "- [".concat(title, "](/assets/").concat(TSV_FOLDER_NAME, "/").concat(file, ")");
                        })
                            .join("\n");
                    zipLink = zipFilename
                        ? "\n\n**Download all TSV files:** [".concat(zipFilename, "](/assets/").concat(TSV_FOLDER_NAME, "/").concat(zipFilename, ")")
                        : "";
                    content = "---\ntitle: Korpora TSV Index\nmeta.type: korpora\n---\n\nBelow is the list of generated TSV extracts from the corpus sheets:\n\n".concat(listBody).concat(zipLink, "\n");
                    targetPath = path.join(targetDirectory, tsvIndexFilename);
                    return [4 /*yield*/, prettier.format(content, { filepath: targetPath })];
                case 2:
                    formatted = _a.sent();
                    fs.writeFileSync(targetPath, formatted);
                    return [2 /*return*/];
            }
        });
    });
}
function cssifyName(text) {
    return text.replace(/[!\"#$%&'\(\)\*\+,\.\/:;<=>\?\@\[\\\]\^`\{\|\}~\s]/g, "_");
}
function processSheet(sheet, title) {
    return __awaiter(this, void 0, void 0, function () {
        var meta, italicizedRows, i, cell, langs, table, buttons, columns, columnsWithTables, _loop_2, i, slug, priority, headers, keywords, ogImage, tsvContent, index, indexNum, lineNo, publicAssetsPath, imageExtensions, candidatePath, _i, imageExtensions_1, ext, candidate, _a, langs_1, lang, l, cellContent, langInfo;
        var _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m, _o;
        return __generator(this, function (_p) {
            switch (_p.label) {
                case 0: return [4 /*yield*/, sheet.getRows()];
                case 1:
                    meta = _p.sent();
                    return [4 /*yield*/, sheet.loadCells()];
                case 2:
                    _p.sent();
                    italicizedRows = [];
                    for (i = 0; i < sheet.rowCount; i++) {
                        cell = sheet.getCell(i, 0);
                        if ((_c = (_b = cell === null || cell === void 0 ? void 0 : cell.effectiveFormat) === null || _b === void 0 ? void 0 : _b.textFormat) === null || _c === void 0 ? void 0 : _c.italic)
                            italicizedRows.push(i);
                    }
                    langs = meta[0]._sheet.headerValues.filter(function (lang) { return lang.indexOf("!") !== 0; });
                    table = [];
                    buttons = [];
                    columns = {};
                    table.push("<table class=\"mt-2 table-fixed max-w-full border font-light text-left text-sm\">\n    <thead class=\"border-b italic\">");
                    table.push("<tr>");
                    columnsWithTables = {};
                    _loop_2 = function (i) {
                        var lang = langs[i];
                        var cssfiedLangName = cssifyName(lang);
                        var txt = meta.map(function (row) { return row[lang]; });
                        columns[lang] = txt;
                        if (lang && lang.includes("||")) {
                            columnsWithTables[lang] = true;
                        }
                        var prettifiedLang = lang.replace(/\|\|/g, "").trim();
                        table.push(lang && lang.includes("||")
                            ? "<th scope=\"col\" class=\"w-40 p-2 column-class-".concat(cssfiedLangName, "\">").concat(escapeHtml(prettifiedLang), "</th>")
                            : "<th scope=\"col\" class=\"w-40 p-2 column-class-".concat(cssfiedLangName, "\">").concat(escapeHtml(prettifiedLang), "</th>"));
                        buttons.push("<input type=\"checkbox\" id=\"hide-column-".concat(cssfiedLangName, "\" class=\"hide-column-checkbox-").concat(cssfiedLangName, "\" />\n      <label for=\"hide-column-").concat(cssfiedLangName, "\" class=\"\n      hide-column-button-").concat(cssfiedLangName, "\n      float-left\n      drop-shadow\n      bg-teal-100 hover:bg-teal-600 focus:bg-teal-600\n      text-gray-900 hover:text-white\n      font-bold\n      leading-normal\n      select-none\n      py-2 px-4\n      \">").concat((_g = (_e = (_d = locales_json_1.languages[lang]) === null || _d === void 0 ? void 0 : _d.native) !== null && _e !== void 0 ? _e : (_f = locales_json_1.languages[prettifiedLang]) === null || _f === void 0 ? void 0 : _f.native) !== null && _g !== void 0 ? _g : prettifiedLang, "</label>"));
                    };
                    for (i in langs) {
                        _loop_2(i);
                    }
                    table.push("</tr>");
                    table.push("</thead>");
                    table.push("<tbody>");
                    slug = sluggify((_j = (_h = columns["glico"]) === null || _h === void 0 ? void 0 : _h[1]) !== null && _j !== void 0 ? _j : title);
                    priority = ((_k = columns["lojbo"]) !== null && _k !== void 0 ? _k : []).slice(4).join("\n").length;
                    headers = {};
                    allLanguages.forEach(function (lang) {
                        var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m;
                        var header = prettifyGraymatter((_d = (_b = (_a = columns[lang]) === null || _a === void 0 ? void 0 : _a[1]) !== null && _b !== void 0 ? _b : (_c = columns["glico"]) === null || _c === void 0 ? void 0 : _c[1]) !== null && _d !== void 0 ? _d : title);
                        console.log({ header: header, lang: lang });
                        var author = prettifyGraymatter((_h = (_f = (_e = columns[lang]) === null || _e === void 0 ? void 0 : _e[2]) !== null && _f !== void 0 ? _f : (_g = columns["glico"]) === null || _g === void 0 ? void 0 : _g[2]) !== null && _h !== void 0 ? _h : "");
                        var translatedBy = prettifyGraymatter((_m = (_k = (_j = columns[lang]) === null || _j === void 0 ? void 0 : _j[3]) !== null && _k !== void 0 ? _k : (_l = columns["glico"]) === null || _l === void 0 ? void 0 : _l[3]) !== null && _m !== void 0 ? _m : "");
                        headers[lang] = {
                            header: header,
                            priority: priority,
                            author: author,
                            description: "".concat(author, " | ").concat(translatedBy)
                                .trim()
                                .replace(/ -$/, "")
                                .trim(),
                        };
                    });
                    keywords = Object.keys(columns)
                        .map(function (lang) { var _a; return (_a = columns[lang]) === null || _a === void 0 ? void 0 : _a[1]; })
                        .filter(function (column) { return !!column; })
                        .join(", ");
                    tsvContent = buildTsvContent(columns, langs);
                    for (index in columns[langs[0]]) {
                        indexNum = parseInt(index);
                        lineNo = indexNum + 1;
                        publicAssetsPath = getPublicAssetsPath();
                        imageExtensions = ["svg", "png", "webp"];
                        candidatePath = "";
                        for (_i = 0, imageExtensions_1 = imageExtensions; _i < imageExtensions_1.length; _i++) {
                            ext = imageExtensions_1[_i];
                            candidate = path.join(publicAssetsPath, "pixra", "texts", slug, "".concat(lineNo, ".").concat(ext));
                            if (fs.existsSync(candidate)) {
                                candidatePath = path.join("/assets", "pixra", "texts", slug, "".concat(lineNo, ".").concat(ext));
                                break;
                            }
                        }
                        if (candidatePath) {
                            ogImage = ogImage !== null && ogImage !== void 0 ? ogImage : candidatePath;
                            table.push("<tr class=\"border-b transition duration-300 ease-in-out hover:bg-neutral-100 dark:hover:bg-neutral-100\">\n          <td colspan=\"".concat(langs.length, "\">\n          <div class=\"h-full w-full flex justify-center items-center\">\n          <img class=\"h-56\" src=\"").concat(candidatePath, "\"/>\n          </div>\n          </td>\n        </tr>\n        "));
                        }
                        table.push("<tr class=\"border-b transition duration-300 ease-in-out hover:bg-neutral-100 dark:hover:bg-neutral-100\">");
                        for (_a = 0, langs_1 = langs; _a < langs_1.length; _a++) {
                            lang = langs_1[_a];
                            l = cssifyName(lang);
                            cellContent = (_m = (_l = columns[lang]) === null || _l === void 0 ? void 0 : _l[indexNum]) !== null && _m !== void 0 ? _m : "";
                            if (columnsWithTables[lang] && cellContent.includes("|")) {
                                cellContent = parseTableCell(cellContent);
                            }
                            else {
                                cellContent = escapeHtml(cellContent);
                            }
                            langInfo = locales_json_1.languages;
                            table.push("<td class=\"".concat(indexNum === 0
                                ? "font-bold "
                                : indexNum < 4 || italicizedRows.includes(indexNum + 1)
                                    ? "italic text-gray-500 "
                                    : "").concat(((_o = langInfo[lang]) === null || _o === void 0 ? void 0 : _o.direction) === "RTL" ? "text-right" : "text-left", " align-text-top p-2 column-class-").concat(l, "\">").concat(cellContent, "</td>"));
                        }
                        table.push("</tr>");
                    }
                    table.push("</tbody>");
                    table.push("</table>");
                    return [2 /*return*/, { table: table, buttons: buttons, headers: headers, slug: slug, keywords: keywords, ogImage: ogImage, columns: columns, tsvContent: tsvContent }];
            }
        });
    });
}
function writeFiles(lang, title, buttons, table, headers, slug, keywords, ogImage) {
    return __awaiter(this, void 0, void 0, function () {
        var mdPagesPath, langInfo, langedDirectoryRoot, langedDirectory, filepath, contentMd, graymatter, contentFull, filepath_md;
        var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m, _o, _p, _q, _r, _s;
        return __generator(this, function (_t) {
            switch (_t.label) {
                case 0:
                    mdPagesPath = getMdPagesPath();
                    langInfo = locales_json_1.languages;
                    langedDirectoryRoot = path.join(mdPagesPath, (_b = (_a = langInfo[lang]) === null || _a === void 0 ? void 0 : _a.short) !== null && _b !== void 0 ? _b : lang);
                    langedDirectory = path.join(langedDirectoryRoot, "texts");
                    filepath = path.join(langedDirectory, title + ".html");
                    return [4 /*yield*/, prettier.format("   \n  <div class=\"w-full\">\n  ".concat(buttons.join(""), "\n  <div class=\"clear-both\" />\n  <div class=\"w-full overflow-x-auto\">\n").concat(table.join(""), "\n</div>\n</div>\n"), { filepath: filepath })];
                case 1:
                    contentMd = _t.sent();
                    graymatter = [
                        { key: "title", value: (_d = (_c = headers[lang]) === null || _c === void 0 ? void 0 : _c.header) !== null && _d !== void 0 ? _d : (_e = headers["glico"]) === null || _e === void 0 ? void 0 : _e.header },
                        { key: "meta.type", value: "korpora" },
                        {
                            key: "description",
                            value: (_g = (_f = headers[lang]) === null || _f === void 0 ? void 0 : _f.description) !== null && _g !== void 0 ? _g : (_h = headers["glico"]) === null || _h === void 0 ? void 0 : _h.description,
                        },
                        {
                            key: "meta.description",
                            value: (_k = (_j = headers[lang]) === null || _j === void 0 ? void 0 : _j.description) !== null && _k !== void 0 ? _k : (_l = headers["glico"]) === null || _l === void 0 ? void 0 : _l.description,
                        },
                        { key: "meta.keywords", value: keywords },
                        {
                            key: "meta.author",
                            value: (_o = (_m = headers[lang]) === null || _m === void 0 ? void 0 : _m.author) !== null && _o !== void 0 ? _o : (_p = headers["glico"]) === null || _p === void 0 ? void 0 : _p.author,
                        },
                        { key: "og:image", value: ogImage },
                        {
                            key: "meta.priority",
                            value: (_r = (_q = headers[lang]) === null || _q === void 0 ? void 0 : _q.priority) !== null && _r !== void 0 ? _r : (_s = headers["glico"]) === null || _s === void 0 ? void 0 : _s.priority,
                        },
                    ].filter(function (el) { return el.value !== undefined; });
                    contentFull = "---\n".concat(graymatter.map(function (_a) {
                        var key = _a.key, value = _a.value;
                        return "".concat(key, ": ").concat(value);
                    }).join("\n"), "\n---\n\n").concat(contentMd);
                    if (!fs.existsSync(langedDirectoryRoot))
                        return [2 /*return*/];
                    fs.mkdirSync(langedDirectory, { recursive: true });
                    filepath_md = path.join(langedDirectory, slug + ".md");
                    fs.writeFileSync(filepath_md, contentFull);
                    return [2 /*return*/];
            }
        });
    });
}
function processTitlesInParallel(titles, processFunction) {
    return __awaiter(this, void 0, void 0, function () {
        var results, i, batch, batchResults;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    results = [];
                    i = 0;
                    _a.label = 1;
                case 1:
                    if (!(i < titles.length)) return [3 /*break*/, 4];
                    batch = titles.slice(i, i + MAX_CONCURRENT_TASKS);
                    return [4 /*yield*/, Promise.all(batch.map(processFunction))];
                case 2:
                    batchResults = _a.sent();
                    results.push.apply(results, batchResults);
                    _a.label = 3;
                case 3:
                    i += MAX_CONCURRENT_TASKS;
                    return [3 /*break*/, 1];
                case 4: return [2 /*return*/, results];
            }
        });
    });
}
(function () { return __awaiter(void 0, void 0, void 0, function () {
    var titles, processedData, css, stylesPath, csspath, _a, _b, _c;
    return __generator(this, function (_d) {
        switch (_d.label) {
            case 0: return [4 /*yield*/, doc.loadInfo()];
            case 1:
                _d.sent();
                titles = doc.sheetsByIndex
                    .map(function (sheet) { return sheet.title; })
                    .filter(function (name) { return name.indexOf("+") === 0; });
                fs.mkdirSync(getPublicAssetsPath(), { recursive: true });
                fs.rmSync(tsvOutputDir, { recursive: true, force: true });
                fs.mkdirSync(tsvOutputDir, { recursive: true });
                return [4 /*yield*/, processTitlesInParallel(titles, function (title) { return __awaiter(void 0, void 0, void 0, function () {
                        var sheet, cleanTitle;
                        var _a;
                        return __generator(this, function (_b) {
                            switch (_b.label) {
                                case 0:
                                    sheet = doc.sheetsByTitle[title];
                                    cleanTitle = title.replace(/^\+/g, "").trim();
                                    _a = { title: cleanTitle };
                                    return [4 /*yield*/, processSheet(sheet, cleanTitle)];
                                case 1: return [2 /*return*/, (_a.data = _b.sent(), _a)];
                            }
                        });
                    }); })];
            case 2:
                processedData = _d.sent();
                css = [];
                console.log("generating korpora pages");
                return [4 /*yield*/, processTitlesInParallel(processedData, function (_a) { return __awaiter(void 0, [_a], void 0, function (_b) {
                        var table, buttons, headers, slug, keywords, ogImage, columns, tsvContent, _i, _c, lang, cssfiedLangName;
                        var title = _b.title, data = _b.data;
                        return __generator(this, function (_d) {
                            switch (_d.label) {
                                case 0:
                                    table = data.table, buttons = data.buttons, headers = data.headers, slug = data.slug, keywords = data.keywords, ogImage = data.ogImage, columns = data.columns, tsvContent = data.tsvContent;
                                    writeTsvFile(slug, tsvContent);
                                    // Parallelize language processing for faster builds
                                    return [4 /*yield*/, Promise.all(allLanguages.map(function (lang) {
                                            return writeFiles(lang, title, buttons, table, headers, slug, keywords, ogImage);
                                        }))];
                                case 1:
                                    // Parallelize language processing for faster builds
                                    _d.sent();
                                    console.log("generated \"".concat(title, "\" corpus entry"));
                                    // Generate CSS
                                    for (_i = 0, _c = Object.keys(columns); _i < _c.length; _i++) {
                                        lang = _c[_i];
                                        cssfiedLangName = cssifyName(lang);
                                        css.push("\n        .hide-column-checkbox-".concat(cssfiedLangName, " {\n          display: none;\n        }\n      \n        .hide-column-checkbox-").concat(cssfiedLangName, ":checked + .hide-column-button-").concat(cssfiedLangName, " ~ div table th.column-class-").concat(cssfiedLangName, ",\n        .hide-column-checkbox-").concat(cssfiedLangName, ":checked + .hide-column-button-").concat(cssfiedLangName, " ~ div table td.column-class-").concat(cssfiedLangName, " {\n          display: none;\n        }\n\n        .hide-column-checkbox-").concat(cssfiedLangName, ":checked + .hide-column-button-").concat(cssfiedLangName, " {\n          background-color: #fff;\n          color: #999;\n        }\n\n        .column-class-").concat(cssfiedLangName, " {\n          min-width: 200px;\n          ").concat(lang && lang.includes("||") ? "white-space: nowrap; overflow-x: auto;" : "max-width: 400px;", "\n        }\n      "));
                                    }
                                    return [2 /*return*/];
                            }
                        });
                    }); })];
            case 3:
                _d.sent();
                css.push("\n    .inner-table {\n      table-layout: fixed;\n      width: 100%;\n    }\n    .inner-table td {\n      word-wrap: break-word;\n      overflow-wrap: break-word;\n    }\n    tr td .inner-table {\n      table-layout: auto;\n      width: auto;\n    }\n    tr td .inner-table td {\n      white-space: nowrap;\n    }\n  ");
                stylesPath = getStylesPath();
                csspath = path.join(stylesPath, "style.css");
                _b = (_a = fs).writeFileSync;
                _c = [csspath];
                return [4 /*yield*/, prettier.format(Array.from(new Set(css)).join("\n\n"), {
                        filepath: csspath,
                    })];
            case 4:
                _b.apply(_a, _c.concat([_d.sent()]));
                return [4 /*yield*/, writeTsvIndexFile()];
            case 5:
                _d.sent();
                return [2 /*return*/];
        }
    });
}); })();
