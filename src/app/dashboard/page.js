import prisma from "../../lib/prisma";
import AuthGuard from "../../components/AuthGuard";
import { auth } from "@clerk/nextjs/server";
import AnalysisCard from "../../components/AnalysisCard";

export default async function DashboardPage() {
  const { userId } = auth();
  if (!userId) {
    return (
      <AuthGuard>
        <div />
      </AuthGuard>
    );
  }

  // Get (or create) the local user record
  const user = await prisma.user.upsert({
    where: { clerkId: userId },
    create: { clerkId: userId },
    update: {}
  });

  const analyses = await prisma.analysis.findMany({
    where: { userId: user.id },
    orderBy: { createdAt: "desc" },
    include: { resume: true }
  });

  return (
    <AuthGuard>
      <div className="space-y-4">
        <h2 className="text-2xl font-semibold text-white">Your Analyses</h2>
        {analyses.length === 0 ? (
          <p className="text-white">No analyses yet. Upload a resume and run your first analysis.</p>
        ) : (
          <div className="grid md:grid-cols-2 gap-4">
            {analyses.map(a => (
              <div key={a.id} className="rounded-2xl border p-4 space-y-2">
                <div className="text-sm text-white">Resume: {a.resume.filename}</div>
                <AnalysisCard analysis={a} />
              </div>
            ))}
          </div>
        )}
      </div>
    </AuthGuard>
  );
}
