import "./globals.css";
import { ClerkProvider } from "@clerk/nextjs";
import Navbar from "../components/Navbar";

export const metadata = {
  title: "HireLense",
  description: "AI-powered resume & JD matcher"
};

export default function RootLayout({ children }) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body>
          <Navbar />
          <main className="max-w-6xl mx-auto px-4 py-6">{children}</main>
        </body>
      </html>
    </ClerkProvider>
  );
}
