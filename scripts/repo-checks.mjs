#!/usr/bin/env node

import fs from "node:fs";
import path from "node:path";
import { execSync } from "node:child_process";

const ROOT = process.cwd();
const command = process.argv[2] ?? "verify";

const REQUIRED_DOC_FILES = [
  "AGENTS.md",
  "CLAUDE.md",
  "README.md",
  "docs/architecture.md",
  "docs/decisions/0001-site-architecture.md",
  "docs/standards/coding-standards.md",
  "docs/standards/documentation-standards.md",
  "docs/standards/error-reporting-standards.md",
  "docs/standards/testing-standards.md",
  "docs/task-journal/README.md"
];

const REQUIRED_DOC_DIRS = [
  "docs",
  "docs/decisions",
  "docs/standards",
  "docs/task-journal"
];

const ALLOWED_TOP_LEVEL_DIRS = new Set([
  ".github",
  "docs",
  "public",
  "scripts",
  "src",
  "node_modules",
  "dist",
  ".git"
]);

const ALLOWED_TOP_LEVEL_FILES = new Set([
  "AGENTS.md",
  "CLAUDE.md",
  "README.md",
  "package.json",
  "package-lock.json",
  "astro.config.mjs",
  "tsconfig.json",
  ".gitignore",
  ".npmrc"
]);

const ALLOWED_SRC_DIRS = new Set([
  "assets",
  "components",
  "content",
  "layouts",
  "pages",
  "styles",
  "utils"
]);

const CONTENT_REQUIRED_FIELDS = {
  art: ["title", "date", "description"],
  words: ["title", "date", "description"],
  make: ["title", "date", "description"]
};

const IGNORE_DIRS = new Set([".git", "node_modules", "dist"]);

function exists(relPath) {
  return fs.existsSync(path.join(ROOT, relPath));
}

function listFiles(dirPath) {
  const output = [];
  if (!fs.existsSync(dirPath)) {
    return output;
  }

  for (const entry of fs.readdirSync(dirPath, { withFileTypes: true })) {
    if (entry.isDirectory()) {
      if (IGNORE_DIRS.has(entry.name)) {
        continue;
      }
      output.push(...listFiles(path.join(dirPath, entry.name)));
      continue;
    }
    output.push(path.join(dirPath, entry.name));
  }
  return output;
}

function toPosix(p) {
  return p.replaceAll("\\", "/");
}

function toRelative(absPath) {
  return toPosix(path.relative(ROOT, absPath));
}

function failWith(title, problems) {
  if (problems.length === 0) {
    console.log(`PASS: ${title}`);
    return;
  }

  console.error(`FAIL: ${title}`);
  for (const problem of problems) {
    console.error(`- ${problem}`);
  }
  process.exitCode = 1;
}

function parseFrontmatter(content, relPath) {
  const lines = content.split(/\r?\n/);
  if (lines[0] !== "---") {
    return { error: `${relPath}: missing YAML frontmatter opening delimiter` };
  }

  let end = -1;
  for (let i = 1; i < lines.length; i += 1) {
    if (lines[i] === "---") {
      end = i;
      break;
    }
  }
  if (end === -1) {
    return { error: `${relPath}: missing YAML frontmatter closing delimiter` };
  }

  const data = {};
  for (const line of lines.slice(1, end)) {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith("#")) {
      continue;
    }
    const separator = trimmed.indexOf(":");
    if (separator === -1) {
      return { error: `${relPath}: invalid frontmatter line "${line}"` };
    }
    const key = trimmed.slice(0, separator).trim();
    let value = trimmed.slice(separator + 1).trim();
    if (
      (value.startsWith('"') && value.endsWith('"')) ||
      (value.startsWith("'") && value.endsWith("'"))
    ) {
      value = value.slice(1, -1);
    }
    if (value === "true") value = true;
    if (value === "false") value = false;
    data[key] = value;
  }

  return { data };
}

function getChangedFiles() {
  const commands = [
    "git status --porcelain",
    "git diff --name-only --diff-filter=ACMR HEAD~1..HEAD"
  ];

  for (const cmd of commands) {
    try {
      const output = execSync(cmd, {
        cwd: ROOT,
        encoding: "utf8",
        stdio: ["ignore", "pipe", "ignore"]
      }).trim();

      if (!output) {
        return [];
      }

      if (cmd.includes("status")) {
        return output
          .split(/\r?\n/)
          .map((line) => line.slice(3).trim())
          .filter(Boolean)
          .map(toPosix);
      }

      return output.split(/\r?\n/).filter(Boolean).map(toPosix);
    } catch {
      continue;
    }
  }
  return null;
}

function checkStructure() {
  const problems = [];

  const topEntries = fs.readdirSync(ROOT, { withFileTypes: true });
  for (const entry of topEntries) {
    if (entry.isDirectory() && !ALLOWED_TOP_LEVEL_DIRS.has(entry.name)) {
      problems.push(`top-level directory not approved: ${entry.name}`);
      continue;
    }

    if (entry.isFile() && !ALLOWED_TOP_LEVEL_FILES.has(entry.name)) {
      problems.push(`top-level file not approved: ${entry.name}`);
    }
  }

  if (exists("src")) {
    const srcEntries = fs.readdirSync(path.join(ROOT, "src"), { withFileTypes: true });
    for (const entry of srcEntries) {
      if (entry.isDirectory() && !ALLOWED_SRC_DIRS.has(entry.name)) {
        problems.push(`src directory not approved by architecture: src/${entry.name}`);
      }
    }
  }

  const componentFiles = listFiles(path.join(ROOT, "src", "components")).filter((p) =>
    p.endsWith(".astro")
  );
  for (const file of componentFiles) {
    const base = path.basename(file);
    if (!/^[A-Z][A-Za-z0-9]*\.astro$/.test(base)) {
      problems.push(`component naming must be PascalCase: ${toRelative(file)}`);
    }
  }

  const pageFiles = listFiles(path.join(ROOT, "src", "pages")).filter((p) =>
    p.endsWith(".astro")
  );
  for (const file of pageFiles) {
    const base = path.basename(file);
    const valid = /^(index|[a-z0-9]+(?:-[a-z0-9]+)*|\[[a-z0-9-]+\]|\[\.\.\.[a-z0-9-]+\])\.astro$/.test(base);
    if (!valid) {
      problems.push(`page naming convention violation: ${toRelative(file)}`);
    }
  }

  failWith("check:structure", problems);
}

function checkDocs() {
  const problems = [];

  for (const dir of REQUIRED_DOC_DIRS) {
    if (!exists(dir)) {
      problems.push(`required documentation directory is missing: ${dir}`);
    }
  }

  for (const file of REQUIRED_DOC_FILES) {
    if (!exists(file)) {
      problems.push(`required documentation file is missing: ${file}`);
    }
  }

  const taskJournalDir = path.join(ROOT, "docs", "task-journal");
  if (fs.existsSync(taskJournalDir)) {
    const entries = fs
      .readdirSync(taskJournalDir, { withFileTypes: true })
      .filter((e) => e.isFile() && e.name !== "README.md");

    for (const entry of entries) {
      if (!/^\d{4}-\d{2}-\d{2}_[a-z0-9-]+\.md$/.test(entry.name)) {
        problems.push(`task journal filename must follow YYYY-MM-DD_short-title.md: docs/task-journal/${entry.name}`);
      }
    }
  }

  const changedFiles = getChangedFiles();
  if (changedFiles !== null) {
    const meaningfulChanges = changedFiles.filter(
      (file) => file && !file.startsWith("docs/task-journal/")
    );
    const changedJournalEntries = changedFiles.filter((file) =>
      /^docs\/task-journal\/\d{4}-\d{2}-\d{2}_[a-z0-9-]+\.md$/.test(file)
    );

    if (meaningfulChanges.length > 0 && changedJournalEntries.length === 0) {
      problems.push(
        "missing required task journal entry: changes detected outside docs/task-journal/, but no dated journal entry was added"
      );
    }
  } else {
    console.warn(
      "WARN: unable to detect changed files from git history; task journal delta requirement skipped"
    );
  }

  failWith("check:docs", problems);
}

function checkContent() {
  const problems = [];
  const contentRoot = path.join(ROOT, "src", "content");

  if (!fs.existsSync(contentRoot)) {
    console.log("PASS: check:content (no src/content directory found)");
    return;
  }

  const contentEntries = fs.readdirSync(contentRoot, { withFileTypes: true });
  for (const entry of contentEntries) {
    if (!entry.isDirectory()) {
      if (entry.name !== "config.ts") {
        problems.push(`unexpected file in src/content: src/content/${entry.name}`);
      }
      continue;
    }
    if (!Object.prototype.hasOwnProperty.call(CONTENT_REQUIRED_FIELDS, entry.name)) {
      problems.push(`invalid content collection directory: src/content/${entry.name}`);
    }
  }

  for (const [collection, requiredFields] of Object.entries(CONTENT_REQUIRED_FIELDS)) {
    const collectionDir = path.join(contentRoot, collection);
    if (!fs.existsSync(collectionDir)) {
      continue;
    }

    const files = listFiles(collectionDir).filter((p) => /\.(md|mdx)$/.test(p));
    for (const file of files) {
      const relPath = toRelative(file);
      const base = path.basename(file);

      if (!/^[a-z0-9]+(?:-[a-z0-9]+)*\.(md|mdx)$/.test(base)) {
        problems.push(`content filename must be lowercase kebab-case: ${relPath}`);
      }

      const parsed = parseFrontmatter(fs.readFileSync(file, "utf8"), relPath);
      if (parsed.error) {
        problems.push(parsed.error);
        continue;
      }

      for (const key of requiredFields) {
        if (!Object.prototype.hasOwnProperty.call(parsed.data, key) || parsed.data[key] === "") {
          problems.push(`${relPath}: missing required frontmatter field "${key}"`);
        }
      }

      if (parsed.data.date) {
        const date = new Date(parsed.data.date);
        if (Number.isNaN(date.getTime())) {
          problems.push(`${relPath}: frontmatter field "date" is not a valid date`);
        }
      }
    }
  }

  failWith("check:content", problems);
}

function runVerify() {
  checkStructure();
  checkDocs();
  checkContent();
}

switch (command) {
  case "check:structure":
    checkStructure();
    break;
  case "check:docs":
    checkDocs();
    break;
  case "check:content":
    checkContent();
    break;
  case "lint":
    checkStructure();
    break;
  case "test":
    checkDocs();
    checkContent();
    break;
  case "build":
    runVerify();
    break;
  case "verify":
    runVerify();
    break;
  default:
    console.error(`Unknown command: ${command}`);
    console.error("Allowed commands: lint, test, build, check:structure, check:docs, check:content, verify");
    process.exitCode = 1;
}

if (process.exitCode && process.exitCode !== 0) {
  process.exit(process.exitCode);
}
