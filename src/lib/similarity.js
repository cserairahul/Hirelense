const TECH_HINTS = [
  "react","next","next.js","javascript","node","express","typescript","prisma","postgres",
  "redis","aws","docker","kubernetes","graphql","rest","jest","cypress","vite","webpack",
  "tailwind","ci/cd","git","github","html","css","sql","nosql","mongodb"
];

export function extractKeywords(jdText) {
  const words = (jdText || "").toLowerCase().match(/[a-z0-9\.\+\#\-]{2,}/g) || [];
  const counts = new Map();
  for (const w of words) counts.set(w, (counts.get(w) || 0) + 1);
  const top = [...counts.entries()]
    .filter(([w]) => w.length > 2)
    .sort((a,b)=>b[1]-a[1])
    .slice(0, 60)
    .map(([w])=>w);
  const boosted = new Set([...top, ...TECH_HINTS.filter(t=>jdText.toLowerCase().includes(t))]);
  return [...boosted];
}

export function findMissing(resumeText, jdKeywords) {
  const txt = (resumeText || "").toLowerCase();
  return jdKeywords.filter(k => !txt.includes(k));
}

export function computeScore({ keywordCoverage, atsHealth }) {
  // Keep it simple and explainable: 80% keyword coverage + 20% ATS
  const score = keywordCoverage * 0.8 + atsHealth * 0.2;
  return Math.round(score * 100);
}
