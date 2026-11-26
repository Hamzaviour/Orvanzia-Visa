import fs from "node:fs";
const list = JSON.parse(fs.readFileSync("src/data/countries.json", "utf8"));
const UA = { "User-Agent": "OrvanziaVisaSiteBuilder/1.0 (static site build)" };
const bad = {};
const q = [...list];
async function ok(u) { for (let i = 0; i < 3; i++) { const r = await fetch(u, { method: "HEAD", headers: UA }); if (r.status === 429) { await new Promise(r => setTimeout(r, 2000)); continue; } return r.status; } return 429; }
await Promise.all(Array.from({ length: 4 }, async () => { while (q.length) { const c = q.shift(); for (const w of [500, 960]) { const s = await ok(c.image.replace(/\/\d+px-/, `/${w}px-`)); if (s !== 200) (bad[c.code] ||= []).push(w + ":" + s); } } }));
console.log(JSON.stringify(bad));
