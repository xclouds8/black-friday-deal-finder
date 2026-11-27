// Original category icons: small inline SVG glyphs drawn for VeriDeal, one per
// category. No stock art, no brand marks, no copied images.

const ICONS = {
  Audio:
    '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M4 9v6h3l4 4V5L7 9H4z" /><path d="M15 8.5a4.5 4.5 0 0 1 0 7" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" /><path d="M17.5 6a8 8 0 0 1 0 12" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" /></svg>',
  Computers:
    '<svg viewBox="0 0 24 24" aria-hidden="true"><rect x="3" y="4" width="18" height="12" rx="1.5" fill="none" stroke="currentColor" stroke-width="1.8" /><path d="M9 20h6M12 16v4" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" /></svg>',
  Wearables:
    '<svg viewBox="0 0 24 24" aria-hidden="true"><rect x="7" y="6" width="10" height="12" rx="3" fill="none" stroke="currentColor" stroke-width="1.8" /><path d="M10 6V4.5h4V6M10 18v1.5h4V18" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" /><circle cx="12" cy="12" r="1.4" /></svg>',
  "Home & kitchen":
    '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M3 11l9-7 9 7" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" /><path d="M5 10v9h14v-9" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linejoin="round" /><path d="M10 19v-5h4v5" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linejoin="round" /></svg>',
  "TV & smart home":
    '<svg viewBox="0 0 24 24" aria-hidden="true"><rect x="2.5" y="5" width="19" height="12" rx="1.5" fill="none" stroke="currentColor" stroke-width="1.8" /><path d="M9 21h6" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" /><path d="M8 9.5l2.5 2L8 13.5" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" /></svg>',
  Toys:
    '<svg viewBox="0 0 24 24" aria-hidden="true"><rect x="4" y="7" width="16" height="13" rx="2" fill="none" stroke="currentColor" stroke-width="1.8" /><path d="M9 7V5.5A2.5 2.5 0 0 1 14 5.5V7M12 7v13" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" /><circle cx="9" cy="12" r="1.2" /><circle cx="15" cy="12" r="1.2" /></svg>',
};

const FALLBACK =
  '<svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="12" cy="12" r="8" fill="none" stroke="currentColor" stroke-width="1.8" /><path d="M12 7v5l3 2" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" /></svg>';

export function categoryIcon(category) {
  return ICONS[category] ?? FALLBACK;
}
