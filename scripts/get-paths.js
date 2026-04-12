#!/usr/bin/env node
// This script outputs path environment variables for use in shell scripts
const { paths } = require("../lib/paths");

console.log(`export MD_PAGES_PATH="${paths.mdPages}"`);
console.log(`export SERVICE_PATH="${paths.service}"`);
console.log(`export VREJI_PATH="${paths.vreji}"`);
console.log(`export TMP_PATH="${paths.tmp}"`);
console.log(`export SRC_PATH="${paths.src}"`);




