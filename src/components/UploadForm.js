"use client";

import { useState } from "react";

export default function UploadForm() {
  const [file, setFile] = useState(null);
  const [jd, setJd] = useState("");
  const [analysis, setAnalysis] = useState(null);
  const [loading, setLoading] = useState(false);

  async function handleUpload(e) {
    e.preventDefault();
    if (!file) return;

    setLoading(true);
    try {
      const fd = new FormData();
      fd.append("resume", file);

      // ✅ first call parse-resume
      const up = await fetch("/api/parse-resume", { method: "POST", body: fd });
      if (!up.ok) throw new Error("Upload failed");
      const resume = await up.json();

      // ✅ send parsed text, not id
      const payload = { resumeText: resume.text, jobDesc: jd };
      const res = await fetch("/api/analyze", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      if (!res.ok) throw new Error("Analyze failed");

      const data = await res.json();
      setAnalysis(data);
    } catch (err) {
      console.error(err);
      alert(err.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="space-y-4">
      <form onSubmit={handleUpload} className="rounded-2xl border p-4 space-y-4">
        <div>
          <label className="text-sm font-medium">Resume (PDF/DOCX)</label>
          <input
            type="file"
            accept=".pdf,.docx"
            onChange={(e) => setFile(e.target.files?.[0] || null)}
            className="mt-1 block w-full text-sm"
            required
          />
        </div>
        <div>
          <label className="text-sm font-medium">Job Description</label>
          <textarea
            className="mt-1 w-full border rounded-xl p-3 text-sm"
            rows={8}
            placeholder="Paste JD here…"
            value={jd}
            onChange={(e) => setJd(e.target.value)}
            required
          />
        </div>
        <button
          disabled={loading}
          className="px-4 py-2 rounded-xl bg-black text-white disabled:opacity-60"
        >
          {loading ? "Analyzing…" : "Upload & Analyze"}
        </button>
      </form>

      {analysis ? (
        <div className="mt-6">
          <h3 className="text-lg font-semibold mb-3">Result</h3>
          <div className="rounded-2xl border p-4 space-y-3">
            <div className="flex justify-between text-sm">
              <span>Match Score</span>
              <span>{analysis.score}/100</span>
            </div>
            <div className="w-full h-3 rounded-full bg-gray-200">
              <div
                className="h-3 rounded-full bg-green-500"
                style={{ width: `${analysis.score}%` }}
              />
            </div>
            <div>
              <div className="font-semibold mb-1">Missing Keywords</div>
              <div className="flex flex-wrap gap-2">
                {analysis.missingTerms.map((k) => (
                  <span key={k} className="px-2 py-1 text-xs rounded-full border">
                    {k}
                  </span>
                ))}
              </div>
            </div>
            <div>
              <div className="font-semibold mb-1">ATS Checks</div>
              <ul className="text-sm list-disc pl-5">
                <li>Email: {analysis.checks.contact.emailOk ? "✔" : "✖"}</li>
                <li>Phone: {analysis.checks.contact.phoneOk ? "✔" : "✖"}</li>
                <li>
                  Sections: {analysis.checks.sectionsFound.join(", ") || "None"}
                </li>
                <li>Length OK: {analysis.checks.lengthOk ? "✔" : "✖"}</li>
              </ul>
            </div>
            {analysis.suggestions?.summary && (
              <div>
                <div className="font-semibold mb-1">Tailored Summary</div>
                <p className="text-sm">{analysis.suggestions.summary}</p>
              </div>
            )}
            {Array.isArray(analysis.suggestions?.bullets) &&
              analysis.suggestions.bullets.length > 0 && (
                <div>
                  <div className="font-semibold mb-1">Suggested Bullets</div>
                  <ul className="text-sm list-disc pl-5">
                    {analysis.suggestions.bullets.map((b, i) => (
                      <li key={i}>{b}</li>
                    ))}
                  </ul>
                </div>
              )}
          </div>
        </div>
      ) : null}
    </div>
  );
}
