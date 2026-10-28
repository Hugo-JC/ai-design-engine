#!/usr/bin/env node
"use strict";
// Gera os atalhos de agentes a partir de agents/PROTOCOL.md (fonte única).
// Uso: node tools/gen-agents.js [--check]
//   (sem flag) escreve os ficheiros; --check falha (exit 1) se algum estiver desatualizado.
const fs = require("fs");
const path = require("path");
const ROOT = path.resolve(__dirname, "..");
const HEADER = "<!-- GERADO por `node tools/gen-agents.js` a partir de agents/PROTOCOL.md. NÃO EDITAR À MÃO. -->";
const nl = (s) => s.replace(/\r\n/g, "\n");
const read = (p) => nl(fs.readFileSync(path.join(ROOT, p), "utf8"));

function rawBase() {
  try {
    const url = JSON.parse(read("package.json")).repository.url;
    const m = url.match(/github\.com[/:]([^/]+)\/([^/.]+)/);
    if (m) return `https://raw.githubusercontent.com/${m[1]}/${m[2]}/main/`;
  } catch {}
  return "";
}

function llms() {
  const b = rawBase();
  const L = (t, p, d) => `- [${t}](${b}${p}): ${d}`;
  return `${[
    "# AI Design Engine",
    "",
    "> Router determinístico, tokens de estilo e validadores para reduzir AI slop em interfaces frontend. Comece por BOOTSTRAP.md.",
    "",
    "## Começar aqui",
    L("Protocolo (obrigatório)", "agents/PROTOCOL.md", "critério de sucesso e passos"),
    L("Bootstrap para chat", "BOOTSTRAP.md", "protocolo pronto a colar"),
    L("Núcleo de regras", "CORE.md", "as 14 regras que mais falham"),
    "",
    "## Ferramentas",
    L("Router", "tools/route.js", "pedido → estilo, padrões, brief e contexto"),
    L("Validador", "tools/validate-design.js", "validação estática com tokens do estilo"),
    L("Bundle", "tools/bundle.js", "gera ADE-CONTEXT.md para chats sem execução de código"),
    "",
    "## Dados",
    L("Presets", "03-references/local-presets.json", "nicho → estilo e padrões"),
    L("Estilos", "02-styles-and-tokens/design-styles.json", "tokens por estilo"),
    "",
    "## Por host",
    ...["claude", "chatgpt", "cursor", "copilot", "gemini", "windsurf", "generic"].map((h) => L(h, `agents/hosts/${h}.md`, "como carregar e limites")),
  ].join("\n")}\n`;
}

function bootstrap(proto) {
  return `${HEADER}\n\n# BOOTSTRAP: cola isto no início da conversa\n\n${proto}\n## Sem execução de código (chat)\nPede ao utilizador o \`ADE-CONTEXT.md\`. Se não o tiver, trabalha só com este protocolo: faz o brief à mão e, no fim, cita por regra a linha do teu código que a cumpre. Diz que não correste o validador.\n`;
}

function targets() {
  const proto = `${read("agents/PROTOCOL.md").trimEnd()}\n`;
  const plain = `${HEADER}\n\n${proto}`;
  return {
    "CLAUDE.md": plain,
    "AGENTS.md": plain,
    "GEMINI.md": plain,
    ".cursorrules": plain,
    ".windsurfrules": plain,
    ".github/copilot-instructions.md": plain,
    ".cursor/rules/ade.mdc": `---\ndescription: AI Design Engine, protocolo obrigatório para gerar UI/frontend\nalwaysApply: true\n---\n${HEADER}\n\n${proto}`,
    "BOOTSTRAP.md": bootstrap(proto),
    "llms.txt": llms(),
  };
}

function check() {
  return Object.entries(targets())
    .filter(([f, c]) => {
      const p = path.join(ROOT, f);
      return !fs.existsSync(p) || nl(fs.readFileSync(p, "utf8")) !== c;
    })
    .map(([f]) => f);
}

function write() {
  for (const [f, c] of Object.entries(targets())) {
    const p = path.join(ROOT, f);
    fs.mkdirSync(path.dirname(p), { recursive: true });
    fs.writeFileSync(p, c);
  }
}

if (require.main === module) {
  if (process.argv.includes("--check")) {
    const d = check();
    if (d.length) { console.error(`Atalhos desatualizados:\n  ${d.join("\n  ")}\nCorra: node tools/gen-agents.js`); process.exit(1); }
    console.log("✅ Atalhos de agentes em sincronia com agents/PROTOCOL.md");
  } else {
    write();
    console.log(`✅ ${Object.keys(targets()).length} ficheiros gerados a partir de agents/PROTOCOL.md`);
  }
}
module.exports = { targets, check, write };
