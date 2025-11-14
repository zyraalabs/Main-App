"use client";

import { useEffect, useState } from "react";
import { getUserInfoFromCookie } from "@/lib/auth-client";
import type { UserInfo } from "@/lib/auth";

export default function Dashboard() {
  const [user, setUser] = useState<UserInfo | null>(null);
  const [configToken, setConfigToken] = useState<string>("");
  const [command, setCommand] = useState<string>("");
  const [loading, setLoading] = useState(false);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    const userInfo = getUserInfoFromCookie();
    setUser(userInfo);
  }, []);

  const generateConfigToken = async () => {
    setLoading(true);
    try {
      const response = await fetch("/api/config/generate", {
        method: "POST",
      });

      if (response.ok) {
        const data = await response.json();
        setConfigToken(data.data.token);
        setCommand(data.data.command);
      } else {
        alert("Failed to generate config token");
      }
    } catch (error) {
      console.error("Error generating config token:", error);
      alert("Failed to generate config token");
    } finally {
      setLoading(false);
    }
  };

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(command);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (error) {
      console.error("Failed to copy:", error);
      alert("Failed to copy to clipboard");
    }
  };

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Access Denied</h1>
          <p className="text-gray-600">Please authenticate first</p>
          <a href="/auth-test" className="text-blue-600 hover:underline">
            Go to Auth Test
          </a>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Dashboard</h1>
          <p className="text-gray-600">Welcome back, {user.name}</p>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">
            CLI Configuration
          </h2>
          <p className="text-gray-600 mb-6">
            Generate your personal configuration token for the Zyra CLI tool.
          </p>

          <button
            onClick={generateConfigToken}
            disabled={loading}
            className="bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed mb-6"
          >
            {loading ? "Generating..." : "Generate Config Token"}
          </button>

          {command && (
            <div className="bg-gray-50 border rounded-lg p-4">
              <h3 className="text-lg font-medium text-gray-900 mb-3">
                Your CLI Command:
              </h3>

              <div className="bg-black text-green-400 p-4 rounded-md font-mono text-sm mb-4">
                <code>{command}</code>
              </div>

              <div className="flex gap-3">
                <button
                  onClick={copyToClipboard}
                  className="bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700"
                >
                  {copied ? "Copied!" : "Copy Command"}
                </button>

                <button
                  onClick={() => {
                    navigator.clipboard.writeText(configToken);
                    setCopied(true);
                    setTimeout(() => setCopied(false), 2000);
                  }}
                  className="bg-gray-600 text-white px-4 py-2 rounded-md hover:bg-gray-700"
                >
                  Copy Token Only
                </button>
              </div>

              <div className="mt-4 p-3 bg-blue-50 border border-blue-200 rounded-md">
                <p className="text-sm text-blue-800">
                  <strong>Instructions:</strong> Copy the command above and run
                  it in your terminal to configure the Zyra CLI with your
                  credentials.
                </p>
              </div>
            </div>
          )}
        </div>

        <div className="bg-white rounded-lg shadow-md p-6 mt-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">
            Account Information
          </h2>
          <div className="grid grid-cols-2 gap-4 text-sm">
            <div>
              <span className="font-medium text-gray-700">Email:</span>
              <span className="ml-2 text-gray-900">{user.email}</span>
            </div>
            <div>
              <span className="font-medium text-gray-700">Plan:</span>
              <span className="ml-2 text-gray-900">{user.plan}</span>
            </div>
            <div>
              <span className="font-medium text-gray-700">Premium:</span>
              <span className="ml-2 text-gray-900">
                {user.isPremium ? "Yes" : "No"}
              </span>
            </div>
            <div>
              <span className="font-medium text-gray-700">Total Builds:</span>
              <span className="ml-2 text-gray-900">
                {user.usage.totalBuilds}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
