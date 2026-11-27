// Verdicts and deal math. The discount is always computed from the two prices,
// never typed in, so the numbers on the site always add up.

export const VERDICTS = {
  "new-low": {
    label: "NEW LOW",
    blurb: "Lowest price we have seen for this product.",
  },
  strong: {
    label: "STRONG DEAL",
    blurb: "A big cut or a big dollar saving.",
  },
  routine: {
    label: "ROUTINE",
    blurb: "A real cut, but a modest one — check it against what you need.",
  },
};

export function percentOff(deal) {
  return Math.round((1 - deal.price / deal.was) * 100);
}

export function dollarsSaved(deal) {
  return Math.round((deal.was - deal.price) * 100) / 100;
}

// Best deal first: the verdict is the quality signal, so a new low outranks a
// strong deal and a strong deal outranks a routine cut; inside one verdict the
// highest discount percent wins, then the most dollars saved, then the lowest
// sale price. One ordering, used everywhere the list is shown.
const VERDICT_RANK = { "new-low": 0, strong: 1, routine: 2 };

export function compareBestFirst(a, b) {
  const byVerdict = (VERDICT_RANK[a.verdict] ?? 9) - (VERDICT_RANK[b.verdict] ?? 9);
  if (byVerdict !== 0) return byVerdict;
  const byPct = percentOff(b) - percentOff(a);
  if (byPct !== 0) return byPct;
  const bySaved = dollarsSaved(b) - dollarsSaved(a);
  if (bySaved !== 0) return bySaved;
  return a.price - b.price;
}

export function formatUsd(n) {
  return `$${n.toLocaleString("en-US", { minimumFractionDigits: n % 1 === 0 ? 0 : 2, maximumFractionDigits: 2 })}`;
}

export function formatChecked(iso) {
  const d = new Date(iso);
  const wib = d.toLocaleString("en-US", {
    day: "numeric",
    month: "short",
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
    timeZone: "Asia/Jakarta",
  });
  const utc = d.toLocaleString("en-US", {
    day: "numeric",
    month: "short",
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
    timeZone: "UTC",
  });
  return `${wib} WIB (${utc} UTC)`;
}
