// HTML for each page, built from the deal data. Every value is escaped before it
// goes into the page. A card shows everything a shopper needs at a glance:
// product, store, sale price, usual price, discount, verdict, check time, source
// and the link to the store.

import { categoryIcon } from "./icons.js";
import { VERDICTS, percentOff, dollarsSaved, formatUsd, formatChecked } from "./verdicts.js";

const escape = (s) =>
  String(s).replace(/[&<>"']/g, (c) => `&#${c.charCodeAt(0)};`);

function verdictBadge(deal) {
  const v = VERDICTS[deal.verdict];
  return `<span class="verdict verdict-${escape(deal.verdict)}" title="${escape(v.blurb)}">${escape(v.label)}</span>`;
}

function storeDot(store) {
  return `<span class="store-dot store-${store.toLowerCase().replace(/[^a-z]/g, "")}" aria-hidden="true"></span>`;
}

export function dealCard(deal) {
  return `<article class="card">
  <div class="card-top">
    <span class="cat-icon">${categoryIcon(deal.category)}</span>
    <span class="cat-name">${escape(deal.category)}</span>
    ${verdictBadge(deal)}
  </div>
  <h3><a href="#/deal/${encodeURIComponent(deal.id)}">${escape(deal.title)}</a></h3>
  <p class="store">${storeDot(deal.store)}${escape(deal.store)}</p>
  <p class="prices"><span class="sale">${formatUsd(deal.price)}</span> <s>${formatUsd(deal.was)}</s> <span class="off">${percentOff(deal)}% off</span></p>
  <p class="saved">You save ${formatUsd(dollarsSaved(deal))}</p>
  ${deal.history ? `<p class="history">Price history: ${escape(deal.history)}</p>` : ""}
  <p class="checked">✓ Checked ${formatChecked(deal.checked)}</p>
  <p class="source">Source: ${escape(deal.source)}</p>
  <p class="actions"><a class="btn-store" href="${escape(deal.url)}" target="_blank" rel="noopener">View at ${escape(deal.store)} ↗</a> <a class="btn-detail" href="#/deal/${encodeURIComponent(deal.id)}">Details</a></p>
</article>`;
}

export function dealList(deals, total, filters) {
  const cards = deals.map(dealCard).join("\n");
  const empty =
    deals.length === 0
      ? `<p class="empty">No deal matches those filters. <a href="#/">Clear the filters</a> to see all ${total} deals.</p>`
      : "";
  return `<section class="controls" aria-label="Find a deal">
  <label class="search-label">Search <input id="q" type="search" placeholder="Search products, stores…" value="${escape(filters.q)}"></label>
  <label>Category <select id="f-category">
    <option value="">All categories</option>
    ${filters.categories.map((c) => `<option value="${escape(c)}"${filters.category === c ? " selected" : ""}>${escape(c)}</option>`).join("")}
  </select></label>
  <label>Store <select id="f-store">
    <option value="">All stores</option>
    ${filters.stores.map((s) => `<option value="${escape(s)}"${filters.store === s ? " selected" : ""}>${escape(s)}</option>`).join("")}
  </select></label>
  <label>Discount <select id="f-minoff">
    <option value="0"${filters.minOff === 0 ? " selected" : ""}>Any discount</option>
    <option value="30"${filters.minOff === 30 ? " selected" : ""}>30% off or more</option>
    <option value="40"${filters.minOff === 40 ? " selected" : ""}>40% off or more</option>
    <option value="50"${filters.minOff === 50 ? " selected" : ""}>50% off or more</option>
  </select></label>
  <label>Verdict <select id="f-verdict">
    <option value=""${filters.verdict === "" ? " selected" : ""}>All verdicts</option>
    <option value="new-low"${filters.verdict === "new-low" ? " selected" : ""}>New lows</option>
    <option value="strong"${filters.verdict === "strong" ? " selected" : ""}>Strong deals</option>
    <option value="routine"${filters.verdict === "routine" ? " selected" : ""}>Routine cuts</option>
  </select></label>
  <label>Sort <select id="f-sort">
    <option value="best"${filters.sort === "best" ? " selected" : ""}>Best deal first</option>
    <option value="saved"${filters.sort === "saved" ? " selected" : ""}>Biggest saving ($)</option>
    <option value="price"${filters.sort === "price" ? " selected" : ""}>Lowest price</option>
    <option value="pct"${filters.sort === "pct" ? " selected" : ""}>Highest discount %</option>
  </select></label>
</section>
<p class="count" aria-live="polite">Showing <strong>${deals.length}</strong> of ${total} deals · sorted best first · all prices checked ${escape(filters.checkedLabel)}</p>
<div class="grid">${cards}</div>
${empty}`;
}

export function dealDetail(deal, similar) {
  const v = VERDICTS[deal.verdict];
  const others =
    similar.length > 0
      ? `<section class="similar"><h2>More ${escape(deal.category)} deals</h2><div class="grid">${similar.map(dealCard).join("\n")}</div></section>`
      : "";
  return `<article class="detail">
  <p class="back"><a href="#/">← All deals</a></p>
  <div class="detail-top">
    <span class="cat-icon big">${categoryIcon(deal.category)}</span>
    <div>
      <p class="cat-name">${escape(deal.category)}</p>
      <h2>${escape(deal.title)}</h2>
      <p class="store">${storeDot(deal.store)}${escape(deal.store)}</p>
    </div>
    ${verdictBadge(deal)}
  </div>
  <p class="prices big"><span class="sale">${formatUsd(deal.price)}</span> <s>${formatUsd(deal.was)}</s> <span class="off">${percentOff(deal)}% off</span></p>
  <p class="saved big">You save ${formatUsd(dollarsSaved(deal))}</p>
  <p class="actions"><a class="btn-store big" href="${escape(deal.url)}" target="_blank" rel="noopener">View at ${escape(deal.store)} ↗</a></p>
  <section class="why"><h2>Is it really a deal? ${escape(v.label)}</h2><p>${escape(deal.evidence)}</p><p>${escape(v.blurb)}</p>${deal.history ? `<p class="history">Price history: ${escape(deal.history)}</p>` : ""}</section>
  <section class="verify"><h2>How we verified it</h2><p>Our agent read the price at the store or in the deals source named below on ${formatChecked(deal.checked)}. The source states the store, the sale price and the usual price — nothing here is guessed. The discount is computed from the two prices, never typed in.</p></section>
  <dl class="facts">
    <div><dt>Store</dt><dd>${escape(deal.store)}</dd></div>
    <div><dt>Sale price</dt><dd>${formatUsd(deal.price)}</dd></div>
    <div><dt>Usual price</dt><dd>${formatUsd(deal.was)}</dd></div>
    <div><dt>Discount</dt><dd>${percentOff(deal)}% off — save ${formatUsd(dollarsSaved(deal))}</dd></div>
    <div><dt>Price checked</dt><dd>${formatChecked(deal.checked)}</dd></div>
    <div><dt>Source</dt><dd>${escape(deal.source)}</dd></div>
  </dl>
  <p class="note">Prices move during Black Friday — check the price at checkout before you buy. This page only lists deals our agent found and checked on 27 Nov 2026.</p>
</article>
${others}`;
}

export function notFound() {
  return `<p class="empty">That deal is not on this board. <a href="#/">Back to all deals</a>.</p>`;
}
