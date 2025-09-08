export function atsChecks(text) {
  const lower = text.toLowerCase();
  const emailOk = /\b[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}\b/i.test(text);
  const phoneOk = /(\+?\d[\d\s\-]{7,}\d)/.test(text);
  const sections = ["summary", "experience", "project", "education", "skills"];
  const found = sections.filter(s => lower.includes(s));

  const words = text.trim().split(/\s+/).length;
  const lengthOk = words >= 350 && words <= 900;

  const score =
    (emailOk ? 0.25 : 0) +
    (phoneOk ? 0.25 : 0) +
    (found.length / sections.length) * 0.3 +
    (lengthOk ? 0.2 : 0);

  return {
    contact: { emailOk, phoneOk },
    sectionsFound: found,
    lengthOk,
    score: Number((score).toFixed(2))
  };
}
