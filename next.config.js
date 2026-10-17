const path = require("path");

/** @type {import('next').NextConfig} */
const nextConfig = {
  outputFileTracingRoot: path.join(__dirname),
  // Lets a second dev server or build run in this folder without sharing .next
  distDir: process.env.NEXT_DIST_DIR || '.next',
};

module.exports = nextConfig;