// VeriDeal: routing, search, filters and sorting. The whole site is static data,
// so every view renders from data.js with no network request.
//
//   #/                        the deal list, best first
//   #/?q=lego&category=Toys  the list with filters applied
//   #/deal/<id>              one deal, with its verdict and evidence
//
// window.__shotReady is false while a page renders and true once it is on
// screen, so a screenshot script knows when to capture.

import { deals, CATEGORIES, STORES, CHECKED_LABEL } from "./data.js";
import { compareBestFirst, percentOff, dollarsSaved } from "./verdicts.js";
import { dealList, dealDetail, notFound } from "./views.js";

const app = document.getElementById("app");

function readFilters() {
  const hash = location.hash.replace(/^#\/?/, "");
  const [path, query] = hash.split("?");
  const params = new URLSearchParams(query ?? "");
  return {
    path,
    q: params.get("q") ?? "",
    category: params.get("category") ?? "",
    store: params.get("store") ?? "",
    minOff: Number(params.get("minoff") ?? 0) || 0,
    verdict: params.get("verdict") ?? "",
    sort: params.get("sort") ?? "best",
  };
}

function writeFilters(f) {
  const params = new URLSearchParams();
  if (f.q) params.set("q", f.q);
  if (f.category) params.set("category", f.category);
  if (f.store) params.set("store", f.store);
  if (f.minOff) params.set("minoff", String(f.minOff));
  if (f.verdict) params.set("verdict", f.verdict);
  if (f.sort !== "best") params.set("sort", f.sort);
  const query = params.toString();
  history.replaceState(null, "", `#/${query ? `?${query}` : ""}`);
}

function applyFilters(f) {
  const q = f.q.trim().toLowerCase();
  let shown = deals.filter(
    (d) =>
      (f.category === "" || d.category === f.category) &&
      (f.store === "" || d.store === f.store) &&
      percentOff(d) >= f.minOff &&
      (f.verdict === "" || d.verdict === f.verdict) &&
      (q === "" ||
        `${d.title} ${d.store} ${d.category} ${d.verdict}`.toLowerCase().includes(q)),
  );
  if (f.sort === "saved") shown = [...shown].sort((a, b) => dollarsSaved(b) - dollarsSaved(a));
  else if (f.sort === "price") shown = [...shown].sort((a, b) => a.price - b.price);
  else if (f.sort === "pct") shown = [...shown].sort((a, b) => percentOff(b) - percentOff(a));
  else shown = [...shown].sort(compareBestFirst);
  return shown;
}

function renderList() {
  const f = readFilters();
  const shown = applyFilters(f);
  document.title = "VeriDeal — Black Friday deal finder";
  app.innerHTML = dealList(shown, deals.length, {
    q: f.q,
    category: f.category,
    store: f.store,
    minOff: f.minOff,
    verdict: f.verdict,
    sort: f.sort,
    categories: CATEGORIES,
    stores: STORES,
    checkedLabel: CHECKED_LABEL,
  });
  const rerender = () => {
    const next = {
      q: document.getElementById("q").value,
      category: document.getElementById("f-category").value,
      store: document.getElementById("f-store").value,
      minOff: Number(document.getElementById("f-minoff").value) || 0,
      verdict: document.getElementById("f-verdict").value,
      sort: document.getElementById("f-sort").value,
      path: "",
    };
    writeFilters(next);
    renderList();
  };
  document.getElementById("q").addEventListener("input", rerender);
  for (const id of ["f-category", "f-store", "f-minoff", "f-verdict", "f-sort"]) {
    document.getElementById(id).addEventListener("change", rerender);
  }
}

function renderDetail(id) {
  const found = deals.find((d) => d.id === decodeURIComponent(id));
  if (!found) {
    document.title = "Not found | VeriDeal";
    app.innerHTML = notFound();
    return;
  }
  document.title = `${found.title} | VeriDeal`;
  const similar = deals
    .filter((d) => d.category === found.category && d.id !== found.id)
    .sort(compareBestFirst)
    .slice(0, 3);
  app.innerHTML = dealDetail(found, similar);
}

function render() {
  window.__shotReady = false;
  const f = readFilters();
  const match = f.path.match(/^deal\/([^/?]+)/);
  if (match) renderDetail(match[1]);
  else renderList();
  window.__shotReady = true;
}

window.addEventListener("hashchange", render);
render();
