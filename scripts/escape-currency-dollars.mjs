import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

// Escape currency `$` -> `\$` so remark-math doesn't interpret it as inline
// LaTeX. Two safe zones get the escape:
//   1. The `quickAnswer: |` YAML block scalar (rendered as markdown).
//   2. The body markdown (after the second `---`), excluding code fences.
//
// All other places (frontmatter strings like title/description, faq blocks)
// are left alone — they are either plain text on the page or YAML
// double-quoted strings that reject `\$` as an unknown escape sequence.

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const CONTENT_DIR = path.resolve(__dirname, "..", "src", "content", "blog");

const SKIP_FILES = new Set([
  "cfa-level-1-term-structure-spot-par-forward-curves.md",
  "cfa-level-1-fixed-income-cheat-sheet.md",
  "README.md",
]);

function escapeUnescapedDollars(line) {
  return line.replace(/(?<!\\)\$/g, "\\$");
}

function processFile(input) {
  const lines = input.split("\n");
  let frontmatterDelims = 0;
  let inFrontmatter = false;
  let inQuickAnswerBlock = false;
  let inFence = false;

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];

    if (line.trim() === "---") {
      frontmatterDelims += 1;
      if (frontmatterDelims === 1) inFrontmatter = true;
      else if (frontmatterDelims === 2) {
        inFrontmatter = false;
        inQuickAnswerBlock = false;
      }
      continue;
    }

    if (inFrontmatter) {
      // Top-level YAML key (no leading whitespace) toggles the block context.
      const isTopLevelKey = /^[A-Za-z][A-Za-z0-9_-]*:/.test(line);
      if (isTopLevelKey) {
        inQuickAnswerBlock = /^quickAnswer\s*:\s*\|/.test(line);
        continue;
      }
      if (inQuickAnswerBlock) {
        lines[i] = escapeUnescapedDollars(line);
      }
      continue;
    }

    if (line.startsWith("```")) {
      inFence = !inFence;
      continue;
    }
    if (inFence) continue;

    lines[i] = escapeUnescapedDollars(line);
  }

  return lines.join("\n");
}

const files = fs.readdirSync(CONTENT_DIR).filter((f) => f.endsWith(".md"));
let totalFiles = 0;
let totalEscaped = 0;
for (const file of files) {
  if (SKIP_FILES.has(file)) {
    console.log(`skip  ${file}`);
    continue;
  }
  const full = path.join(CONTENT_DIR, file);
  const before = fs.readFileSync(full, "utf8");
  const after = processFile(before);
  if (before === after) {
    console.log(`ok    ${file} (no change)`);
    continue;
  }
  fs.writeFileSync(full, after, "utf8");
  const beforeUnescaped = (before.match(/(?<!\\)\$/g) || []).length;
  const afterUnescaped = (after.match(/(?<!\\)\$/g) || []).length;
  console.log(`fix   ${file} (${beforeUnescaped - afterUnescaped} dollar signs escaped)`);
  totalFiles += 1;
  totalEscaped += beforeUnescaped - afterUnescaped;
}
console.log(`\nDone. ${totalEscaped} dollar signs escaped across ${totalFiles} files.`);
