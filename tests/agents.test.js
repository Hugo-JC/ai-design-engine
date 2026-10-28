"use strict";
const test = require("node:test");
const assert = require("node:assert");
const fs = require("node:fs");
const path = require("node:path");
const { spawnSync } = require("node:child_process");
const ROOT = path.join(__dirname, "..");
const read = (p) => fs.readFileSync(path.join(ROOT, p), "utf8").replace(/\r\n/g, "\n");
const gen = require("../tools/gen-agents");
const { build, section } = require("../tools/bundle");

test("PROTOCOL.md: ≤ 4 KB e com as marcas obrigatórias", () => {
  const p = read("agents/PROTOCOL.md");
  assert.ok(Buffer.byteLength(p) <= 4096, `${Buffer.byteLength(p)} bytes`);
  for (const m of [
    "Critério de sucesso",
    "UMA pergunta",
    "[PLACEHOLDER]",
    "Honestidade",
    "Precedência",
    "evidência",
    "route.js",
    "validate-design.js",
  ])
    assert.ok(p.includes(m), `falta: ${m}`);
});
test("atalhos gerados estão em sincronia com o PROTOCOL.md", () =>
  assert.deepStrictEqual(gen.check(), []));
test("todos os atalhos contêm o protocolo completo", () => {
  const proto = read("agents/PROTOCOL.md").trimEnd();
  for (const f of [
    "CLAUDE.md",
    "AGENTS.md",
    "GEMINI.md",
    ".cursorrules",
    ".windsurfrules",
    ".github/copilot-instructions.md",
    ".cursor/rules/ade.mdc",
    "BOOTSTRAP.md",
  ])
    assert.ok(read(f).includes(proto), f);
});
test(".cursor/rules/ade.mdc tem frontmatter com alwaysApply", () =>
  assert.match(read(".cursor/rules/ade.mdc"), /^---\ndescription: .+\nalwaysApply: true\n---\n/));
test("BOOTSTRAP.md ≤ 4 KB", () => assert.ok(Buffer.byteLength(read("BOOTSTRAP.md")) <= 4096));
test("gerador é idempotente (escrever 2× não altera nada)", () => {
  const before = gen.targets();
  gen.write();
  gen.write();
  assert.deepStrictEqual(gen.targets(), before);
  assert.deepStrictEqual(gen.check(), []);
});
test("llms.txt: todos os links raw apontam para ficheiros locais", () => {
  const links = [
    ...read("llms.txt").matchAll(
      /\]\(https:\/\/raw\.githubusercontent\.com\/[^/]+\/[^/]+\/[^/]+\/([^)\s]+)\)/g
    ),
  ].map((m) => m[1]);
  assert.ok(links.length >= 10);
  for (const l of links) assert.ok(fs.existsSync(path.join(ROOT, l)), l);
});
test("hosts: existe uma nota por ferramenta", () => {
  for (const h of ["claude", "chatgpt", "cursor", "copilot", "gemini", "windsurf", "generic"])
    assert.ok(fs.existsSync(path.join(ROOT, `agents/hosts/${h}.md`)), h);
});
test("bundle: protocolo + regras + contexto do router, dentro do orçamento e determinístico", () => {
  for (const p of [
    "Loja online de cosméticos naturais",
    "Escritório de advogados",
    "Refrigerantes energéticos",
  ]) {
    const a = build(p),
      b = build(p);
    assert.strictEqual(a, b, "não determinístico");
    assert.ok(Buffer.byteLength(a) <= 12000, `${p}: ${Buffer.byteLength(a)} bytes`);
    for (const m of [
      "Critério de sucesso",
      "As 14 regras que mais falham",
      "DESIGN BRIEF",
      "## Tokens",
    ])
      assert.ok(a.includes(m), `${p}: falta ${m}`);
  }
});
test("bundle: sem pedido → exit 2; --max-bytes pequeno → exit 3", () => {
  const bin = path.join(ROOT, "tools/bundle.js");
  assert.strictEqual(spawnSync("node", [bin], { encoding: "utf8" }).status, 2);
  assert.strictEqual(
    spawnSync("node", [bin, "Escritório de advogados", "--max-bytes", "500"], { encoding: "utf8" })
      .status,
    3
  );
});
test("section() extrai uma secção até à seguinte", () => {
  const s = section("# T\n## A\nx\n## B\ny\n", "A");
  assert.strictEqual(s, "## A\nx");
});
