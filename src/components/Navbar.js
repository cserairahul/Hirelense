"use client";

import Link from "next/link";
import Image from "next/image";
import { UserButton } from "@clerk/nextjs";

export default function Navbar() {
  return (
    <nav className="w-full border-b">
      <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2">
          <Image src="/logo.jpeg" width={28} height={28} alt="logo" />
          <span className="font-semibold">HireLense</span>
        </Link>
        <div className="flex items-center gap-4">
          <Link href="/upload" className="text-sm">Upload</Link>
          <Link href="/dashboard" className="text-sm">Dashboard</Link>
          <UserButton afterSignOutUrl="/" />
        </div>
      </div>
    </nav>
  );
}
