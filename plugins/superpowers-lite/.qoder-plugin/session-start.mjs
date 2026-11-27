import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const scriptDir = path.dirname(fileURLToPath(import.meta.url));
const pluginRoot = process.env.QODER_PLUGIN_ROOT
  ? path.resolve(process.env.QODER_PLUGIN_ROOT)
  : path.resolve(scriptDir, "..");

const skillsDir = path.join(pluginRoot, "skills");
const routerPath = path.join(skillsDir, "using-lite", "SKILL.md");

const raw = fs.readFileSync(routerPath, "utf8");
const body = raw.replace(/^---\r?\n[\s\S]*?\r?\n---\r?\n*/, "").trim();

const additionalContext = [
  "[Superpowers Lite — SessionStart Router]",
  "The `superpowers-lite:using-lite` workflow router is already loaded below for this session.",
  "For non-trivial design review, brainstorming, spec/plan authoring, coding, debugging, code review, benchmarking, blast-radius checks, or remote-operations tasks: classify the task and load the applicable leaf `SKILL.md` BEFORE deep repository exploration, editing, or answering. Skip it for trivial edits or pure Q&A.",
  `If a referenced leaf skill cannot be invoked via the Skill tool, read \`${skillsDir}/<skill-name>/SKILL.md\` directly.`,
  "",
  body,
].join("\n");

process.stdout.write(
  JSON.stringify({
    hookSpecificOutput: {
      hookEventName: "SessionStart",
      additionalContext,
    },
  }),
);
