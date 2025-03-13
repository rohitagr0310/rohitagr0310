"use client";

import { useRouter } from "next/navigation";

export default function Unauthorized() {
  const router = useRouter();

  return (
    <div className="flex flex-col items-center justify-center h-screen text-center">
      <h1 className="text-3xl font-bold text-red-600">Access Denied</h1>
      <p className="text-lg mt-4">
        You don&apos;t have permission to view this page.
      </p>
      <button
        onClick={() => router.push("/")}
        className="mt-6 px-4 py-2 bg-indigo-600 text-white rounded-md"
      >
        Go to Home
      </button>
    </div>
  );
}
