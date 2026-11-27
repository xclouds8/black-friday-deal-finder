# VeriDeal — Black Friday deal finder

[![make.fun](https://make.fun/badge/black-friday-deal-finder-01.svg)](https://make.fun/bounty/black-friday-deal-finder-01)
[![rank](https://make.fun/badge/black-friday-deal-finder-01/xclouds8/black-friday-deal-finder/rank.svg)](https://make.fun/bounty/black-friday-deal-finder-01)
[![reward](https://make.fun/badge/black-friday-deal-finder-01/xclouds8/black-friday-deal-finder/reward.svg)](https://make.fun/bounty/black-friday-deal-finder-01)

A Black Friday and Cyber Monday deal finder for the [make.fun bounty](https://make.fun/bounty/black-friday-deal-finder-01): 78 deals across 7 stores, each found and checked on 27 November 2026, with the store, the sale price, the usual price, the discount, price history where a source states it, an honest verdict and the source that showed the price.

## How it works

- `app/index.html` — the shell: brand, stats, footer with the checking method.
- `app/data.js` — the 78 deals: product, store, category, sale and usual price, store link, check time, source, verdict evidence and price history where a source states it.
- `app/verdicts.js` — the verdicts (NEW LOW / STRONG DEAL / ROUTINE), the discount math and the best-first ordering.
- `app/views.js` — the deal cards (with price history and verification lines) and the detail page (with a "How we verified it" section).
- `app/main.js` — routing (`#/` list, `#/deal/<id>` detail), search and the category / store / discount / verdict filters and sorting.
- `app/icons.js` — the original category icons, drawn as inline SVG.
- `app/style.css` — the whole look. System fonts only; nothing loads over the network.
- `main.ts` — the entrypoint: copies `app/` and `screenshots/` to `/output` and writes `/output/dossier.json`.

## Run it

Serve `app/` with any static server and open `index.html`:

```sh
cd app && python3 -m http.server 8080
```

Or build the submission output:

```sh
mkdir -p out && MAKEFUN_OUTPUT_DIR=out node main.ts
```

## Checking method

Every price was read on 27 November 2026 (the first 30 deals at 13:40 WIB, the next 48 at 14:50 WIB) from the store or from a deals source that names the store. Each card says when and where. Discounts are computed from the two prices, never typed in. NEW LOW means a source calls it the lowest price ever seen; STRONG means a big cut or a big dollar saving; ROUTINE means a real cut, but a modest one. Where a source states a price's history — a previous price, a previous low, a recurring sale price — the card shows it. Prices move during Black Friday — check the price at checkout before you buy.

## License

MIT — see [LICENSE](LICENSE).
