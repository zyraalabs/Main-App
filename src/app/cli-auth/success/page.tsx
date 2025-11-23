"use client";

import { useRouter } from "next/navigation";

export default function SuccessPage() {
  const router = useRouter();

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="bg-white p-8 rounded-lg shadow-md max-w-md w-full text-center">
        <div className="text-5xl mb-4">✓</div>
        <h1 className="text-2xl font-bold text-green-600 mb-4">
          CLI Access Approved!
        </h1>
        <p className="text-gray-600 mb-6">
          You can now return to your terminal. The CLI has been successfully authenticated.
        </p>
        <button
          onClick={() => router.push("/dashboard")}
          className="bg-purple-600 text-white px-6 py-2 rounded hover:bg-purple-700"
        >
          Go to Dashboard
        </button>
      </div>
    </div>
  );
}
