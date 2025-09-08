import ScoreMeter from "./ScoreMeter";

export default function AnalysisCard({ analysis }) {
  if (!analysis) return null;
  return (
    <div className="rounded-2xl border p-4 space-y-4">
      <ScoreMeter score={analysis.score} />
      <div>
        <h4 className="font-semibold mb-1">Missing Keywords</h4>
        <div className="flex flex-wrap gap-2">
          {analysis.missingTerms.map((k) => (
            <span key={k} className="px-2 py-1 text-xs rounded-full border">{k}</span>
          ))}
        </div>
      </div>
      <div>
        <h4 className="font-semibold mb-1">ATS Checks</h4>
        <ul className="text-sm list-disc pl-5">
          <li>Email: {analysis.checks.contact.emailOk ? "✔" : "✖"}</li>
          <li>Phone: {analysis.checks.contact.phoneOk ? "✔" : "✖"}</li>
          <li>Sections: {analysis.checks.sectionsFound.join(", ") || "None"}</li>
          <li>Length OK: {analysis.checks.lengthOk ? "✔" : "✖"}</li>
        </ul>
      </div>
      {analysis.suggestions?.summary ? (
        <div>
          <h4 className="font-semibold mb-1">Tailored Summary</h4>
          <p className="text-sm">{analysis.suggestions.summary}</p>
        </div>
      ) : null}
      {Array.isArray(analysis.suggestions?.bullets) && analysis.suggestions.bullets.length ? (
        <div>
          <h4 className="font-semibold mb-1">Suggested Bullets</h4>
          <ul className="text-sm list-disc pl-5">
            {analysis.suggestions.bullets.map((b, i) => <li key={i}>{b}</li>)}
          </ul>
        </div>
      ) : null}
    </div>
  );
}
