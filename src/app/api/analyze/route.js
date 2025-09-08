import { auth } from "@clerk/nextjs/server";
import prisma from "../../../lib/prisma";
import { extractKeywords, findMissing, computeScore } from "../../../lib/similarity";
import { atsChecks } from "../../../lib/atsCheck";
import { getSuggestions } from "../../../lib/gemini";

export async function POST(req) {
  try {
    const { userId } = auth();
    if (!userId) return new Response("Unauthorized", { status: 401 });

    const body = await req.json();
    const { resumeId, jobDesc } = body || {};
    if (!resumeId || !jobDesc) return new Response("Missing fields", { status: 400 });

    // ensure user exists
    const user = await prisma.user.upsert({
      where: { clerkId: userId },
      create: { clerkId: userId },
      update: {}
    });

    const resume = await prisma.resume.findUnique({ where: { id: resumeId } });
    if (!resume || resume.userId !== user.id) {
      return new Response("Not found", { status: 404 });
    }

    // ATS + keyword logic
    const keywords = extractKeywords(jobDesc);
    const missing = findMissing(resume.text, keywords);
    const coverage = 1 - (missing.length / Math.max(1, keywords.length));
    const ats = atsChecks(resume.text);
    const score = computeScore({ keywordCoverage: coverage, atsHealth: ats.score });

    // Gemini suggestions
    const suggestions = await getSuggestions({
      resume: resume.text,
      jd: jobDesc,
      missing
    });

    // Save result in DB
    const analysis = await prisma.analysis.create({
      data: {
        userId: user.id,
        resumeId: resume.id,
        jobDesc,
        score,
        missingTerms: missing,
        checks: ats,
        suggestions
      }
    });

    return Response.json(analysis);
  } catch (e) {
    console.error(e);
    return new Response("Server error", { status: 500 });
  }
}
