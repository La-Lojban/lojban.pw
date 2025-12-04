#!/usr/bin/env node
// Wait for the server to be ready by checking if it responds
const http = require("http");

const MAX_ATTEMPTS = 30; // 30 attempts
const RETRY_DELAY = 500; // 500ms between attempts
const SERVER_URL = "http://127.0.0.1:3000";

async function waitForServer() {
  for (let attempt = 1; attempt <= MAX_ATTEMPTS; attempt++) {
    try {
      await new Promise((resolve, reject) => {
        const req = http.get(SERVER_URL, (res) => {
          res.on("data", () => {});
          res.on("end", () => {
            if (res.statusCode >= 200 && res.statusCode < 500) {
              resolve();
            } else {
              reject(new Error(`Server returned status ${res.statusCode}`));
            }
          });
        });

        req.on("error", (err) => {
          reject(err);
        });

        req.setTimeout(2000, () => {
          req.destroy();
          reject(new Error("Request timeout"));
        });
      });

      console.log(`Server is ready after ${attempt} attempt(s)`);
      return;
    } catch (error) {
      if (attempt === MAX_ATTEMPTS) {
        console.error(`Server did not become ready after ${MAX_ATTEMPTS} attempts`);
        process.exit(1);
      }
      await new Promise((resolve) => setTimeout(resolve, RETRY_DELAY));
    }
  }
}

waitForServer().catch((err) => {
  console.error("Error waiting for server:", err);
  process.exit(1);
});

