import Link from "next/link";

export default function HomePage() {
  return (
    <div className="grid gap-6 md:grid-cols-2 items-center">
      <div className="space-y-4">
        <h1 className="text-3xl md:text-4xl font-bold">HireLense</h1>
        <p className="text-gray-600">
          Upload your resume, paste a JD, get an ATS-friendly match score and AI-crafted improvements powered by Gemini.
        </p>
        <div className="flex gap-3">
          <Link href="/upload" className="px-4 py-2 rounded-xl bg-black text-white">Get Started</Link>
          <Link href="/dashboard" className="px-4 py-2 rounded-xl border">Dashboard</Link>
        </div>
      </div>
      <div className="rounded-2xl border p-4">
        <p className="text-sm text-gray-600">
          Tip: Use clear sections like <b>Summary, Experience, Projects, Education, Skills</b> for better ATS health.
        </p>
      </div>
    </div>
  );
}
