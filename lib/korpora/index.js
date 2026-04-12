"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
/// <reference path="./types.d.ts" />
const fs = __importStar(require("fs"));
const path = __importStar(require("path"));
const prettier = __importStar(require("prettier"));
const archiver_1 = __importDefault(require("archiver"));
const paths_1 = require("../paths");
const TSV_FOLDER_NAME = "korpora-tsv";
const tsvIndexFilename = "korpora-tsv.md";
async function createTsvZip() {
    const tsvOutputDir = path.join((0, paths_1.getPublicAssetsPath)(), TSV_FOLDER_NAME);
    const tsvFiles = fs
        .readdirSync(tsvOutputDir, { withFileTypes: true })
        .filter((dirent) => dirent.isFile() && dirent.name.endsWith(".tsv"))
        .map((dirent) => dirent.name)
        .sort();
    if (tsvFiles.length === 0)
        return null;
    const zipFilename = "korpora-tsv-all.zip";
    const zipPath = path.join(tsvOutputDir, zipFilename);
    return new Promise((resolve, reject) => {
        const output = fs.createWriteStream(zipPath);
        const archive = (0, archiver_1.default)("zip", {
            zlib: { level: 9 },
        });
        output.on("close", () => {
            resolve(zipFilename);
        });
        archive.on("error", (err) => {
            reject(err);
        });
        archive.pipe(output);
        tsvFiles.forEach((file) => {
            archive.file(path.join(tsvOutputDir, file), { name: file });
        });
        archive.finalize();
    });
}
async function writeTsvIndexFile() {
    const mdPagesPath = (0, paths_1.getMdPagesPath)();
    if (!fs.existsSync(mdPagesPath))
        return;
    const targetDirectory = path.join(mdPagesPath, "en");
    fs.mkdirSync(targetDirectory, { recursive: true });
    const tsvDir = path.join((0, paths_1.getPublicAssetsPath)(), TSV_FOLDER_NAME);
    const tsvFiles = fs.existsSync(tsvDir)
        ? fs
            .readdirSync(tsvDir, { withFileTypes: true })
            .filter((dirent) => dirent.isFile() && dirent.name.endsWith(".tsv"))
            .map((dirent) => dirent.name)
            .sort()
        : [];
    const zipFilename = await createTsvZip();
    const listBody = tsvFiles.length === 0
        ? "_No TSV files in `data/assets/korpora-tsv/`._"
        : tsvFiles
            .map((file) => {
            const title = path.parse(file).name;
            return `- [${title}](/assets/${TSV_FOLDER_NAME}/${file})`;
        })
            .join("\n");
    const zipLink = zipFilename
        ? `\n\n**Download all TSV files:** [${zipFilename}](/assets/${TSV_FOLDER_NAME}/${zipFilename})`
        : "";
    const content = `---
title: Korpora TSV Index
meta.type: korpora
---

Source TSV files live in \`data/assets/korpora-tsv/\` (served at \`/assets/${TSV_FOLDER_NAME}/\`).

${listBody}${zipLink}
`;
    const targetPath = path.join(targetDirectory, tsvIndexFilename);
    const formatted = await prettier.format(content, { filepath: targetPath });
    fs.writeFileSync(targetPath, formatted);
}
(async () => {
    fs.mkdirSync((0, paths_1.getPublicAssetsPath)(), { recursive: true });
    await writeTsvIndexFile();
})();
