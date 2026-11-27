// VeriDeal — the entrypoint for black-friday-deal-finder-01 (Node 22, standard
// library only). The site lives in app/ next to this file: plain static files
// a browser opens at app/index.html, its 78 checked deals in app/data.js across
// 7 stores (Amazon, Best Buy, Walmart, Target, Kohl's, Newegg, Home Depot), no
// build step and nothing loaded over the network. This program hands it in: it
// copies app/ and screenshots/ beside this file to /output and writes
// /output/dossier.json with the kit's vendored library, which the scorer
// rebuilds byte for byte. Leave vendor/makefun-frontend.ts untouched.
//
// Run it locally with:
//   mkdir -p out && MAKEFUN_OUTPUT_DIR=out node main.ts
// Both runs must write the same bytes.

import { cpSync, existsSync, mkdirSync, readdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";
import { fileURLToPath } from "node:url";
import { buildDossier } from "./vendor/makefun-frontend.ts";

const here = fileURLToPath(new URL(".", import.meta.url));
const out = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";

mkdirSync(out, { recursive: true });
cpSync(join(here, "app"), join(out, "app"), { recursive: true });
mkdirSync(join(out, "screenshots"), { recursive: true });
if (existsSync(join(here, "screenshots"))) {
  cpSync(join(here, "screenshots"), join(out, "screenshots"), { recursive: true });
}

// The gate's caps: at most 4 screenshots of 256 KiB each, app/ at most 993
// files and directories and 16 MiB in all, dossier text at most 160 KiB.
const dossier = buildDossier(out, {
  text_max_bytes: 163840,
  screenshots: { max: 4, max_bytes: 262144 },
  app_max_files: 993,
  app_max_bytes: 16777216,
});
writeFileSync(join(out, "dossier.json"), dossier);

// A one-line receipt, so a builder sees what was handed in without opening it.
const shotCount = existsSync(join(here, "screenshots"))
  ? readdirSync(join(here, "screenshots")).filter((f) => !f.startsWith(".")).length
  : 0;
console.log(
  `VeriDeal: app/ + ${shotCount} screenshot(s) copied to ${out}, dossier.json ${dossier.length} bytes.`,
);
