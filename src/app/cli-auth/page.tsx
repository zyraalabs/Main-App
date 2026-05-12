"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { Suspense, useEffect, useState } from "react";
import { getUserInfoFromCookie } from "@/lib/auth-client";

interface UserInfo {
  email: string;
  plan?: string;
}

function CliAuthForm() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [user, setUser] = useState<UserInfo | null>(null);
  const [loading, setLoading] = useState(true);
  const [approving, setApproving] = useState(false);
  const [error, setError] = useState("");

  const requestId = searchParams.get("req");

  useEffect(() => {
    const userInfo = getUserInfoFromCookie();

    if (!userInfo) {
      const authUrl =
        process.env.NEXT_PUBLIC_AUTH_SERVICE_URL || "http://localhost:3000";
      const currentUrl = window.location.href;
      window.location.href = `${authUrl}/login?callbackUrl=${encodeURIComponent(currentUrl)}`;
      return;
    }

    setUser(userInfo);
    setLoading(false);
  }, []);

  const handleApprove = async () => {
    if (!requestId) {
      setError("Invalid request");
      return;
    }

    setApproving(true);
    setError("");

    try {
      const response = await fetch("/api/cli/approve", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ requestId }),
      });

      const result = await response.json();

      if (!result.success) {
        setError(result.error || "Failed to approve");
        setApproving(false);
        return;
      }

      router.push("/cli-auth/success");
    } catch (err) {
      setError("Failed to approve CLI access");
      setApproving(false);
    }
  };

  const handleCancel = () => {
    router.push("/dashboard");
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-gray-600">Loading...</div>
      </div>
    );
  }

  if (!requestId) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="bg-white p-8 rounded-lg shadow-md max-w-md w-full">
          <h1 className="text-2xl font-bold text-red-600 mb-4">
            Invalid Request
          </h1>
          <p className="text-gray-600 mb-4">
            This CLI authentication link is invalid or has expired.
          </p>
          <button
            onClick={() => router.push("/dashboard")}
            className="w-full bg-purple-600 text-white py-2 rounded hover:bg-purple-700"
          >
            Go to Dashboard
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="bg-white p-8 rounded-lg shadow-md max-w-md w-full">
        <h1 className="text-2xl font-bold text-purple-600 mb-4">
          Approve CLI Access
        </h1>

        <div className="mb-6">
          <p className="text-gray-700 mb-4">
            <strong>zyra CLI</strong> is requesting access to your Zyraa
            account.
          </p>

          <div className="bg-gray-50 p-4 rounded border border-gray-200">
            <div className="text-sm text-gray-600 mb-1">Email</div>
            <div className="font-medium text-gray-900">{user?.email}</div>

            <div className="text-sm text-gray-600 mb-1 mt-3">Plan</div>
            <div className="font-medium text-gray-900">
              {user?.plan || "FREE"}
            </div>
          </div>
        </div>

        {error && (
          <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded text-red-700 text-sm">
            {error}
          </div>
        )}

        <div className="flex gap-3">
          <button
            onClick={handleApprove}
            disabled={approving}
            className="flex-1 bg-purple-600 text-white py-2 rounded hover:bg-purple-700 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {approving ? "Approving..." : "Approve"}
          </button>
          <button
            onClick={handleCancel}
            disabled={approving}
            className="flex-1 bg-gray-200 text-gray-700 py-2 rounded hover:bg-gray-300 disabled:opacity-50"
          >
            Cancel
          </button>
        </div>

        <p className="text-xs text-gray-500 mt-4 text-center">
          This will allow the CLI to access your account for builds and
          deployments.
        </p>
      </div>
    </div>
  );
}

export default function CliAuthPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen flex items-center justify-center bg-gray-50">
          <div className="text-gray-600">Loading...</div>
        </div>
      }
    >
      <CliAuthForm />
    </Suspense>
  );
}
