// ─────────────────────────────────────────────────────────────
//  ANALYTICS
//
//  Only the PROJECT TOKEN belongs in this file. It is public by
//  design and is meant to be visible in browser source.
//
//  The Mixpanel API SECRET must NEVER appear here or anywhere in
//  this repository. It is a server-side credential that can read
//  and export your entire dataset.
//
//  DPDP Act 2023: health data is sensitive personal data. This
//  module is deliberately built so that no name, phone, email or
//  specific medical condition can reach Mixpanel.
// ─────────────────────────────────────────────────────────────

const MIXPANEL_TOKEN = 'b6ebc31dd79d7b6a981358075d33d54f';
const CONSENT_KEY = 'dha_analytics_consent';

let ready = false;
const queue = [];

// Condition slugs are collapsed into coarse buckets before they are
// ever sent. We learn that a hair-loss page converts; we never build
// a record that a given visitor read about genital dermatoses.
const BUCKETS = {
  'hair-loss-men': 'hair',
  'hair-loss-women': 'hair',
  'finasteride-dutasteride-side-effects': 'hair',
  'alopecia-areata': 'hair',
  acne: 'acne',
  'acne-scars': 'acne',
  melasma: 'pigmentation',
  pigmentation: 'pigmentation',
  psoriasis: 'chronic',
  eczema: 'chronic',
  vitiligo: 'chronic',
  'fungal-infections': 'chronic',
  'intimate-concerns': 'confidential',
};

export function bucketOf(slug) {
  return BUCKETS[slug] || 'general';
}

function hasConsent() {
  try {
    return localStorage.getItem(CONSENT_KEY) === 'granted';
  } catch {
    return false;
  }
}

// Loaded only after consent AND after the page has painted, so it
// can never affect LCP.
function load() {
  if (ready || !hasConsent()) return;
  const s = document.createElement('script');
  s.src = 'https://cdn.mxpnl.com/libs/mixpanel-2-latest.min.js';
  s.async = true;
  s.onload = () => {
    window.mixpanel.init(MIXPANEL_TOKEN, {
      // No cross-site tracking, no automatic PII capture.
      autotrack: false,
      ignore_dnt: false,
      persistence: 'localStorage',
      property_blacklist: ['$current_url', '$referrer', '$initial_referrer'],
    });
    ready = true;
    while (queue.length) {
      const [name, props] = queue.shift();
      window.mixpanel.track(name, props);
    }
  };
  document.head.appendChild(s);
}

// Anything that looks like personal data is stripped before send.
const FORBIDDEN = /name|email|phone|mobile|address|dob|age|message|note|concern_text/i;

function sanitise(props = {}) {
  const clean = {};
  for (const [k, v] of Object.entries(props)) {
    if (FORBIDDEN.test(k)) continue;
    if (typeof v === 'string' && v.length > 64) continue;
    clean[k] = v;
  }
  return clean;
}

export function track(name, props = {}) {
  const payload = sanitise(props);
  if (!hasConsent()) return;
  if (ready && window.mixpanel) window.mixpanel.track(name, payload);
  else queue.push([name, payload]);
}

export function grantConsent() {
  try {
    localStorage.setItem(CONSENT_KEY, 'granted');
  } catch {}
  load();
}

export function declineConsent() {
  try {
    localStorage.setItem(CONSENT_KEY, 'declined');
  } catch {}
}

export function consentStatus() {
  try {
    return localStorage.getItem(CONSENT_KEY);
  } catch {
    return null;
  }
}

// ── Auto-instrumentation ─────────────────────────────────────
export function init(pageMeta = {}) {
  if (hasConsent()) {
    if ('requestIdleCallback' in window) requestIdleCallback(load);
    else setTimeout(load, 2000);
  }

  track('page_viewed', pageMeta);

  // Scroll depth
  const seen = new Set();
  const onScroll = () => {
    const h = document.documentElement;
    const pct = Math.round(((h.scrollTop + window.innerHeight) / h.scrollHeight) * 100);
    for (const mark of [25, 50, 75, 100]) {
      if (pct >= mark && !seen.has(mark)) {
        seen.add(mark);
        track('scroll_depth', { ...pageMeta, percent: mark });
      }
    }
  };
  window.addEventListener('scroll', onScroll, { passive: true });

  // Every CTA declares its own intent via data attributes.
  document.addEventListener('click', (e) => {
    const el = e.target.closest('[data-track]');
    if (!el) return;
    track(el.dataset.track, {
      ...pageMeta,
      label: el.dataset.label,
      placement: el.dataset.placement,
      mode: el.dataset.mode,
      clinic: el.dataset.clinic,
    });
  });

  // Reading time, sent once on exit.
  const start = Date.now();
  addEventListener('visibilitychange', () => {
    if (document.visibilityState === 'hidden') {
      const seconds = Math.round((Date.now() - start) / 1000);
      track('reading_time', { ...pageMeta, seconds, bucket: seconds < 15 ? 'bounce' : seconds < 60 ? 'skim' : 'read' });
    }
  });
}
