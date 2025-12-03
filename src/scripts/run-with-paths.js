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
const env = {
  ...process.env,
  MD_PAGES_PATH: paths.mdPages,
  SERVICE_PATH: paths.service,
  VREJI_PATH: paths.vreji,
  TMP_PATH: paths.tmp,
  SRC_PATH: paths.src,
};

// If the command is 'sh -c' or 'bash -c', we need to expand variables in the command string
const [command, ...commandArgs] = args;

// Replace environment variables in command arguments if using sh -c or bash -c
let finalArgs = commandArgs;
if ((command === 'sh' || command === 'bash') && commandArgs[0] === '-c' && commandArgs[1]) {
  let cmdString = commandArgs[1];
  // Replace ${VAR} and $VAR with actual values
  cmdString = cmdString.replace(/\$\{([^}]+)\}/g, (match, varName) => {
    return env[varName] || match;
  });
  cmdString = cmdString.replace(/\$([A-Z_][A-Z0-9_]*)/g, (match, varName) => {
    return env[varName] || match;
  });
  finalArgs = ['-c', cmdString];
}

// Run the command
const child = spawn(command, finalArgs, {
  stdio: "inherit",
  shell: false, // Don't use shell, we're handling it ourselves
  env: env,
});

child.on("exit", (code) => {
  process.exit(code || 0);
});

