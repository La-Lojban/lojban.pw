#!/usr/bin/env node
// Helper script to run commands with proper path environment variables
const { spawn } = require("child_process");
const { paths } = require("../lib/paths");

// Get the command and arguments from process.argv
const [,, ...args] = process.argv;

if (args.length === 0) {
  console.error("Usage: node scripts/run-with-paths.js <command> [args...]");
  process.exit(1);
}

// Set environment variables
process.env.MD_PAGES_PATH = paths.mdPages;
process.env.SERVICE_PATH = paths.service;
process.env.VREJI_PATH = paths.vreji;
process.env.TMP_PATH = paths.tmp;
process.env.SRC_PATH = paths.src;

// Run the command
const [command, ...commandArgs] = args;
const child = spawn(command, commandArgs, {
  stdio: "inherit",
  shell: true,
  env: process.env,
});

child.on("exit", (code) => {
  process.exit(code || 0);
});

