#!/usr/bin/env node
'use strict';
const fs = require('fs');
const path = require('path');
const file = path.resolve(__dirname, '../03-references/reference-sources.json');
const args = process.argv.slice(2);
const value = (flag, fallback) => { const i = args.indexOf(flag); return i >= 0 ? args[i + 1] : fallback; };
const classify = (status, url, body) => {
  const text = body.replace(/<script[\s\S]*?<\/script>|<style[\s\S]*?<\/style>|<[^>]+>/gi, ' ').replace(/\s+/g, ' ').trim();
  if (/\/login|\/signin/i.test(new URL(url).pathname) || /<form[^>]+password/i.test(body)) return 'login';
  if ([401,403,429].includes(status) || /just a moment|captcha|verify you are human/i.test(body)) return 'blocked';
  if (status === 200) return text.length >= 800 ? 'ok' : 'js-only';
  return 'error';
};
async function check(source, timeout) {
  try {
    const response = await fetch(source.url, { signal: AbortSignal.timeout(timeout), redirect: 'follow', headers: { 'user-agent': 'AI-Design-Engine-reference-check/3.1' } });
    const body = await response.text();
    return { id: source.id, url: source.url, status: classify(response.status, response.url, body), http: response.status };
  } catch (error) { return { id: source.id, url: source.url, status: 'error', error: error.message }; }
}
async function main() {
  const data = JSON.parse(fs.readFileSync(file, 'utf8'));
  const id = value('--id'); const sources = data.sources.filter(s => !id || s.id === id);
  const results = await Promise.all(sources.map(s => check(s, Number(value('--timeout', 15000)))));
  if (args.includes('--write')) {
    const now = new Date().toISOString();
    results.forEach(r => { const s = data.sources.find(x => x.id === r.id); s.fetch_status = r.status; s.last_checked = now; });
    fs.writeFileSync(file, JSON.stringify(data, null, 2) + '\n');
  }
  console.log('ID\tESTADO\tHTTP\tURL'); results.forEach(r => console.log(`${r.id}\t${r.status}\t${r.http || '-'}\t${r.url}`));
}
if (require.main === module) main().catch(e => { console.error(e.message); process.exitCode = 1; });
module.exports = { classify };
