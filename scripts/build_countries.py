import json, sys
raw = json.load(open(sys.argv[1], encoding="utf8"))
keep = []
for c in raw:
    if not (c.get("unMember") or c["cca2"] in ("VA", "PS", "TW", "XK")):
        continue
    if c["cca2"] == "GB":
        continue  # applicants are UK-based
    keep.append({
        "code": c["cca2"].lower(),
        "name": c["name"]["common"],
        "region": c["region"],
        "subregion": c.get("subregion", ""),
        "capital": (c.get("capital") or [""])[0],
    })
keep.sort(key=lambda x: x["name"])
json.dump(keep, open(sys.argv[2], "w", encoding="utf8"), ensure_ascii=False, indent=0)
print(len(keep))
