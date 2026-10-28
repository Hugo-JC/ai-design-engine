#!/usr/bin/env node
"use strict";
// Gera ADE-CONTEXT.md: um único ficheiro para colar/anexar em chats SEM execução de código.
// Uso: node tools/bundle.js "<pedido>" [--out ADE-CONTEXT.md] [--max-bytes 12000]
const fs = require("fs");
const path = require("path");
const { spawnSync } = require("child_process");
const ROOT = path.resolve(__dirname, "..");
const nl = (s) => s.replace(/\r\n/g, "\n");
const read = (p) => nl(fs.readFileSync(path.join(ROOT, p), "utf8"));

function section(md, heading) {
  const i = md.indexOf(`## ${heading}`);
  if (i < 0) return "";
  const j = md.indexOf("\n## ", i + 3);
  return md.slice(i, j < 0 ? undefined : j).trimEnd();
}

function build(prompt) {
  const r = spawnSync(
    process.execPath,
    [path.join(ROOT, "tools", "route.js"), prompt, "--context", "--refs"],
    { cwd: ROOT, encoding: "utf8" }
  );
  if (r.status !== 0)
    throw new Error(`route.js falhou (exit ${r.status}): ${(r.stderr || "").split("\n")[0]}`);
  const rules = section(read("CORE.md"), "As 14 regras que mais falham");
  const visualDirection = [
    "## Direção visual anti-monocultura (resumo do playbook)",
    "- Escolha tipografia, composição, ritmo de espaço e motion para a marca concreta; não reutilize automaticamente a mesma família de fontes, hero, paleta, cartões ou animações.",
    "- Referências de contraste: Tim Wendelboe (produto e história com respiro editorial), Aesop (contenção sensorial e contexto), Apple (demonstração focada no produto), Linear (clareza de produto digital), Stripe (complexidade organizada). Extraia princípios, nunca copie layout, copy, imagens ou identidade.",
    "- Tipografia: defina display e texto; uma terceira família só se tiver função. Inter, Poppins, DM Sans e Space Grotesk são opções, não defaults universais.",
    "- Espaço: container de leitura, margens generosas e escala de 8 px; varie gaps conforme a relação e dê espaço vertical real entre secções. Nem tudo precisa de ser um card ou uma grelha.",
    "- Composição: escolha o hero e a ordem das secções pelo conteúdo; o split esquerda/direita e três cards iguais não são defaults.",
    "- Motion: escolha no máximo 2–3 famílias úteis. Feedback imediato e subtil; scroll reveal discreto; nada de tilt, cursor personalizado, parallax forte, blobs em loop ou cascatas longas por decoração.",
    "- Respeite prefers-reduced-motion; não esconda conteúdo essencial enquanto animações ou JavaScript carregam.",
    "- Auditoria: se retirar o logótipo, a página ainda parece pertencer à marca? Se não, reveja a direção visual, não apenas o polimento.",
  ].join("\\n");
  return nl(
    [
      "<!-- ADE-CONTEXT: gerado por tools/bundle.js para o pedido abaixo. Anexe/cole este ficheiro no chat. -->",
      "# AI Design Engine: contexto para este pedido",
      "",
      `> Pedido: ${JSON.stringify(prompt)}`,
      "",
      read("agents/PROTOCOL.md").trimEnd(),
      "",
      rules,
      "",
      visualDirection,
      "",
      "## Contexto do router (saída de `route --context --refs`)",
      r.stdout.trimEnd(),
      "",
      "Fim do contexto. Se não consegues executar comandos, diz isso no relatório final.",
      "",
    ].join("\n")
  );
}

if (require.main === module) {
  const a = process.argv.slice(2);
  const opt = (n) => {
    const i = a.indexOf(n);
    return i >= 0 ? a[i + 1] : null;
  };
  const skip = new Set(["--out", "--max-bytes"]);
  const prompt = a
    .filter((x, i) => !x.startsWith("--") && !skip.has(a[i - 1]))
    .join(" ")
    .trim();
  if (!prompt) {
    console.error('Uso: node tools/bundle.js "<pedido>" [--out ficheiro] [--max-bytes 12000]');
    process.exit(2);
  }
  let out;
  try {
    out = build(prompt);
  } catch (e) {
    console.error(`❌ ${e.message}`);
    process.exit(1);
  }
  const bytes = Buffer.byteLength(out),
    max = parseInt(opt("--max-bytes") || "12000", 10);
  if (opt("--out")) fs.writeFileSync(opt("--out"), out);
  else process.stdout.write(out);
  console.error(
    `bundle: ${bytes} bytes${bytes > max ? ` ⚠️ acima do orçamento de ${max}` : ` (orçamento ${max})`}`
  );
  if (bytes > max) process.exit(3);
}
module.exports = { build, section };
