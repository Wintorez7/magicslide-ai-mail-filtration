"use client";

import { useState, useEffect } from "react";
import { signIn } from "next-auth/react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Mail, Key, Save } from "lucide-react";
import Navbar from "@/components/Navbar";
import { toast } from "sonner";

export default function LoginPage() {
  const [apiKey, setApiKey] = useState("");
  const [saved, setSaved] = useState(false);
  const [loading, setLoading] = useState(false);

  // ✅ Load saved API key from localStorage on mount
  useEffect(() => {
    const storedKey = localStorage.getItem("openai_api_key");
    if (storedKey) {
      setApiKey(storedKey);
      setSaved(true);
    }
  }, []);

  // ✅ Save the API key to localStorage
  const handleSaveKey = () => {
    if (!apiKey.trim().startsWith("sk-")) {
      toast.error("Please enter a valid OpenAI API key (starts with sk-)");
      return;
    }
    localStorage.setItem("openai_api_key", apiKey.trim());
    setSaved(true);
    toast.success("✅ API key saved successfully!");
  };

  // ✅ Remove API key
  const handleClearKey = () => {
    localStorage.removeItem("openai_api_key");
    setApiKey("");
    setSaved(false);
    toast("API key removed");
  };

  // ✅ Google Login — only allowed if API key exists
  const handleGoogleLogin = async () => {
    if (!apiKey.trim()) {
      toast.error("Please enter your OpenAI API key first");
      return;
    }
    if (!apiKey.startsWith("sk-")) {
      toast.error("Invalid API key. Must start with 'sk-'");
      return;
    }

    setLoading(true);
    try {
      await signIn("google", { callbackUrl: "/dashboard" });
    } catch (error) {
      console.error("Google login failed:", error);
      toast.error("Google sign-in failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#f9fafb] relative overflow-hidden">
      <Navbar />

      {/* 🟡 Background Grid */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_1px_1px,#e5e7eb_1px,transparent_0)] bg-[length:24px_24px]" />

      {/* 🟣 Login Card */}
      <div className="relative z-10 bg-white/90 backdrop-blur-md border border-gray-200 rounded-2xl shadow-lg w-full max-w-md p-8 space-y-6">
        {/* Header */}
        <div className="text-center">
          <h1 className="text-2xl font-semibold text-gray-900">Welcome to MagicSlide</h1>
          <p className="text-gray-500 text-sm mt-1">
            Sign in and connect your OpenAI API for personalized email insights.
          </p>
        </div>

        {/* Divider */}
        <div className="flex items-center gap-3 my-4">
          <div className="flex-1 h-px bg-gray-200"></div>
          <span className="text-xs text-gray-400">SETUP</span>
          <div className="flex-1 h-px bg-gray-200"></div>
        </div>

        {/* 🧠 OpenAI API Key Section */}
        <div className="space-y-2">
          <label className="text-sm font-medium text-gray-700 flex items-center gap-2">
            <Key className="h-4 w-4 text-primary" /> Enter your OpenAI API Key
          </label>
          <div className="flex gap-2">
            <Input
              type="password"
              placeholder="sk-xxxxxxxxxxxxxxxxxxxx"
              value={apiKey}
              onChange={(e) => setApiKey(e.target.value)}
              className="flex-1"
            />
            <Button onClick={handleSaveKey} className="gap-1">
              <Save className="h-4 w-4" />
              Save
            </Button>
          </div>

          {saved && (
            <button
              onClick={handleClearKey}
              className="text-xs text-gray-500 hover:text-red-600 mt-1"
            >
              Remove saved key
            </button>
          )}
        </div>

        {/* Divider */}
        <div className="flex items-center gap-3 my-4">
          <div className="flex-1 h-px bg-gray-200"></div>
          <span className="text-xs text-gray-400">OR</span>
          <div className="flex-1 h-px bg-gray-200"></div>
        </div>

        {/* 🟢 Google Sign-In */}
        <div className="space-y-3">
          <Button
            variant="outline"
            onClick={handleGoogleLogin}
            disabled={loading}
            className="w-full justify-center gap-2 border-gray-300 hover:bg-gray-50"
          >
            {loading ? "Signing in..." : <>
              <Mail className="w-4 h-4" /> Continue with Google
            </>}
          </Button>

          <p className="text-xs text-center text-gray-400">
            🔒 Your OpenAI key is stored only in your browser and never sent to our servers.
          </p>
        </div>
      </div>
    </div>
  );
}
