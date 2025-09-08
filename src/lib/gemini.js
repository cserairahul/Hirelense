import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

export async function getSuggestions({ resume, jd, missing }) {
  const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

  const prompt = `
  You are an ATS and career expert.
  Compare the following RESUME with the JOB DESCRIPTION.
  - Provide a compatibility score (0–100)
  - Highlight missing skills
  - Suggest improvements in 2–3 bullet points
  - Here are already detected missing keywords: ${missing.join(", ")}

  RESUME: ${resume}
  JOB DESCRIPTION: ${jd}
  `;

  const result = await model.generateContent(prompt);
  return result.response.text();
}
