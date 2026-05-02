import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const webRoot = path.join(__dirname, "..");
const adminDist = path.join(webRoot, "..", "admin", "dist");
const outDir = path.join(webRoot, "public", "admin");

if (!fs.existsSync(adminDist)) {
  console.error("embed-admin: admin dist not found. Run: pnpm --filter admin build");
  process.exit(1);
}

fs.rmSync(outDir, { recursive: true, force: true });
fs.cpSync(adminDist, outDir, { recursive: true });
console.log("embed-admin: copied admin build to", path.relative(webRoot, outDir));
