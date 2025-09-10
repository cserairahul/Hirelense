"use client";

import { SignedIn, SignedOut, SignInButton } from "@clerk/nextjs";

export default function AuthGuard({ children }) {
  return (
    <>
      <SignedIn>{children}</SignedIn>
      <SignedOut>
        <div className="max-w-xl mx-auto p-6 text-center">
          <p className="mb-4 text-lg font-medium">Please sign in to continue.</p>
          <SignInButton mode="modal">
            <button className="px-4 py-2 rounded-xl bg-black text-white">Sign In</button>
          </SignInButton>
        </div>
      </SignedOut>
    </>
  );
}
//  hi