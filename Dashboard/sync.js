#!/usr/bin/env node
// Syncs Dashboard topics.json -> index.html (embedded fallback) + Assessments/ questionnaires.
// Run after editing Dashboard/topics.json (the canonical topic list).
const fs = require('fs');
const path = require('path');

const root = __dirname;
const vault = path.resolve(root, '..');
const indexPath = path.join(root, 'index.html');
const topicsPath = path.join(root, 'topics.json');
const assessDir = path.join(vault, 'Assessments');

const topics = JSON.parse(fs.readFileSync(topicsPath, 'utf8'));
let html = fs.readFileSync(indexPath, 'utf8');

const re = /<script id="progress-data"[^>]*>([\s\S]*?)<\/script>/;
const data = JSON.parse(html.match(re)[1]);

let changed = 0;
data.modules.forEach(m => {
  const t = topics.modules && topics.modules[m.id];
  if (t && t.topics && (t.topics.basic || t.topics.deep)) { m.topics = t.topics; changed++; }
});
html = html.replace(re, `<script id="progress-data" type="application/json">\n${JSON.stringify(data, null, 2)}\n</script>`);
fs.writeFileSync(indexPath, html);
console.log(`index.html: topics injected for ${changed} modules`);

const today = new Date().toISOString().slice(0, 10);
function table(list) {
  if (!list || !list.length) return '_(none)_';
  const rows = list.map(t => `| ${t} | | | | |`);
  return `| Topic | 🔴 Never | 🟠 Heard | 🟡 Basic | 🟢 Confident |\n|-------|----------|----------|----------|--------------|\n` + rows.join('\n');
}

let count = 0;
for (const m of data.modules) {
  const t = (topics.modules && topics.modules[m.id] && topics.modules[m.id].topics) || {};
  const basic = t.basic || [];
  const deep = t.deep || [];
  const fname = `${m.session}.md`;
  const content = `---
module: ${m.id}
name: ${m.name}
level: ${m.level}
status: not-started
last-updated: ${today}
---

# 📋 Pre-training Questionnaire — ${m.id} ${m.name}

> Fill this in **before** starting the module. Your answers tell the tutor what to skip, what to skim, and what to go deep on.
> Module description: ${m.desc}

## How to answer
For each topic mark one cell with an **X**:
- 🔴 **Never** — never touched it
- 🟠 **Heard** — seen it, can't really use it
- 🟡 **Basic** — can do simple things, shaky on details
- 🟢 **Confident** — use it regularly, could teach it

## Self-rating

### Basic
${table(basic)}

### Deep
${table(deep)}

## Short answers
1. **What's your goal with this module?** (job need / a specific project / curiosity)
2. **Any prior hands-on time** with this tool/area? How much?
3. **Anything you specifically want to be able to do** by the end of the module?
4. **Preferred depth?** (just enough / solid / deep expert)

## Outcome (filled by the tutor)
- [ ] Assessment reviewed
- [ ] Agenda adjusted to focus on the gaps
- **Focus on** (🔴/🟠 topics): …
- **Skip / quick review** (🟢/🟡 topics): …
`;
  fs.writeFileSync(path.join(assessDir, fname), content);
  count++;
}
console.log(`Assessments: regenerated ${count} questionnaires`);
