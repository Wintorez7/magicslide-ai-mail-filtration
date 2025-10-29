"use client";

import { useState } from "react";
import { useFetchEmails } from "@/hooks/useFetchEmails";
import { signOut } from "next-auth/react";
import TopBar from "./components/TopBar";
import Sidebar from "./components/Sidebar";
import EmailList from "./components/EmailList";
import EmailPreview from "./components/EmailPreview";
import { toast } from "sonner";

export default function DashboardPage() {
  const { emails, loading, setEmails } = useFetchEmails();

  // Sidebar & Email State
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [selectedFolder, setSelectedFolder] = useState("inbox");
  const [selectedEmailId, setSelectedEmailId] = useState<string | null>(null);
  const [selectedCategory, setSelectedCategory] = useState("All");

  // ✅ Logout handler
  const handleLogout = async () => {
    localStorage.removeItem("openai_api_key");
    await signOut({ callbackUrl: "/" });
  };

  // ✅ Fetch emails from Gmail API
  const handleFetchEmails = async () => {
    try {
      const res = await fetch("/api/gmail/list");
      const data = await res.json();

      if (res.ok) {
        console.log("📬 Fetched emails:", data.messages);
        setEmails(data.messages || []);
        toast.success(`Fetched ${data.messages?.length || 0} emails`);
      } else {
        toast.error(data.error || "Failed to fetch emails");
      }
    } catch (err) {
      console.error("Error fetching emails:", err);
      toast.error("Something went wrong while fetching emails.");
    }
  };

  // ✅ Handle GPT Classification (called by TopBar)
  const handleClassifyEmails = (classified: any[]) => {
    setEmails(classified);
    toast.success("Emails classified successfully!");
  };

  // ✅ Filter emails based on selected category
  const filteredEmails =
    selectedCategory === "All"
      ? emails
      : emails.filter(
          (email: any) =>
            email.category?.toLowerCase() === selectedCategory.toLowerCase()
        );

  // ✅ Selected email for preview
  const selectedEmail =
    Array.isArray(filteredEmails) &&
    filteredEmails.find((email) => email.id === selectedEmailId);

  return (
    <div className="flex flex-col h-screen bg-background text-foreground">
      {/* 🧭 Top Navigation Bar */}
      <TopBar
        onMenuClick={() => setIsSidebarOpen(!isSidebarOpen)}
        onFetchEmails={handleFetchEmails}
        onClassifyEmails={handleClassifyEmails}
        selectedCategory={selectedCategory}
        onCategoryChange={(cat) => {
          setSelectedCategory(cat);
          setSelectedEmailId(null);
        }}
      />

      {/* 🪟 Main Dashboard Layout */}
      <div className="flex flex-1 overflow-hidden">
        {/* Sidebar (Folders, Labels, User Info) */}
        <Sidebar
          isOpen={isSidebarOpen}
          selectedFolder={selectedFolder}
          onFolderSelect={(folder) => {
            setSelectedFolder(folder);
            setIsSidebarOpen(false);
          }}
        />

        {/* Email List + Preview */}
        <div className="flex flex-1 overflow-hidden">
          {/* 📋 Email List */}
          <div className="w-[450px] border-r hidden md:block">
            <EmailList
              emails={filteredEmails}
              selectedEmailId={selectedEmailId}
              onEmailSelect={(id) => setSelectedEmailId(id)}
            />
          </div>

          {/* 📨 Email Preview */}
          <div className="flex-1">
            <EmailPreview email={selectedEmail || null} />
          </div>
        </div>
      </div>
    </div>
  );
}
