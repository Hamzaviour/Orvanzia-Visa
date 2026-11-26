import fs from "node:fs";
const [, , inFile, outFile] = process.argv;
const list = JSON.parse(fs.readFileSync(inFile, "utf8"));
const UA = { "User-Agent": "OrvanziaVisaSiteBuilder/1.0 (static site build)" };
const bad = /flag|map|locator|coat|emblem|seal|\.svg|orthographic|location|logo|montage_?map/i;
async function summary(title) {
  const r = await fetch(`https://en.wikipedia.org/api/rest_v1/page/summary/${encodeURIComponent(title.replace(/ /g, "_"))}`, { headers: UA });
  if (r.status === 429) { await new Promise(r=>setTimeout(r,3000)); return summary(title); } if (r.status === 429) { await new Promise(r=,3000)); return summary(title); } if (!r.ok) return null;
  const j = await r.json();
  if (j.type === "disambiguation") return null;
  const t = j.thumbnail?.source;
  if (!t || bad.test(t)) return null;
  const big = t.replace(/\/(\d+)px-/, "/960px-");
  return big;
}
const out = fs.existsSync(outFile) ? JSON.parse(fs.readFileSync(outFile,"utf8")) : {};
async function one(c) {
  const tries = [
    c.capital && `${c.capital}, ${c.name}`,
    c.capital,
    `Tourism in ${c.name}`,
    `Geography of ${c.name}`,
  ].filter(Boolean);
  for (const t of tries) {
    try { const u = await summary(t); if (u) { out[c.code] = u; return; } } catch {}
  }
}
const q = list.filter(c => !out[c.code]);
await Promise.all(Array.from({ length: 2 }, async () => { while (q.length) { await one(q.shift()); await new Promise(r=>setTimeout(r,250)); } }));
fs.writeFileSync(outFile, JSON.stringify(out, null, 1));
console.log(Object.keys(out).length, "of", list.length, "missing:", list.filter(c => !out[c.code]).map(c => c.name).join(", "));
