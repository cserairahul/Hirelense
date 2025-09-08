import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";
import PDFParser from "pdf2json";

export async function POST(req) {
  try {
    const formData = await req.formData();
    const file = formData.get("resume"); // resume is the field name in your form

    if (!file) {
      return NextResponse.json({ error: "No file uploaded" }, { status: 400 });
    }

    // Save temp file
    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);
    const uploadDir = path.join(process.cwd(), "uploads");

    if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir);
    }

    const filePath = path.join(uploadDir, file.name);
    fs.writeFileSync(filePath, buffer);

    // Parse PDF
    const pdfParser = new PDFParser();

    return new Promise((resolve, reject) => {
      pdfParser.on("pdfParser_dataError", (errData) => {
        reject(NextResponse.json({ error: errData.parserError }, { status: 500 }));
      });

      pdfParser.on("pdfParser_dataReady", (pdfData) => {
        try {
          const pages = pdfData?.formImage?.Pages;
          if (!pages) {
            fs.unlinkSync(filePath);
            return resolve(NextResponse.json({ text: "" }));
          }

          const rawText = pages
            .map((page) =>
              page.Texts.map((t) => decodeURIComponent(t.R[0].T)).join(" ")
            )
            .join("\n");

          fs.unlinkSync(filePath);
          resolve(NextResponse.json({ text: rawText }));
        } catch (e) {
          reject(NextResponse.json({ error: e.message }, { status: 500 }));
        }
      });

      pdfParser.loadPDF(filePath);
    });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
