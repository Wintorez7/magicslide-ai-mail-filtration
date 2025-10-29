"use client";

import { useState, useEffect } from "react";
import { Search, Menu, LogOut, Filter } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { signOut } from "next-auth/react";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
} from "@/components/ui/dropdown-menu";
import { toast } from "sonner";

interface TopBarProps {
  onMenuClick: () => void;
  onFetchEmails: () => void;
  onClassifyEmails: (classifiedEmails: any[]) => void;
  selectedCategory: string;
  onCategoryChange: (category: string) => void;
}

export default function TopBar({
  onMenuClick,
  onFetchEmails,
  onClassifyEmails,
  selectedCategory,
  onCategoryChange,
}: TopBarProps) {
  const [apiKeyAvailable, setApiKeyAvailable] = useState(false);
  const [loading, setLoading] = useState(false);

  // ✅ Check API key availability
  useEffect(() => {
    const key = localStorage.getItem("openai_api_key");
    setApiKeyAvailable(!!key);
  }, []);

  // ✅ Handle Logout
  const handleLogout = async () => {
    localStorage.removeItem("openai_api_key");
    await signOut({ callbackUrl: "/" });
  };

  // ✅ Classify Emails with GPT-4o
  const handleClassifyEmails = async () => {
    const apiKey = localStorage.getItem("openai_api_key");
    if (!apiKey) {
      toast.error("Please add your OpenAI API key before classifying.");
      return;
    }

    try {
      setLoading(true);
      const res = await fetch("/api/gmail/list");
      const { messages: emails } = await res.json();

      if (!emails || emails.length === 0) {
        toast.error("No emails to classify. Try Fetch Emails first.");
        return;
      }

      const response = await fetch("/api/classify", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ emails, apiKey }),
      });

      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.error || "Classification failed");
      }

      toast.success("Emails classified successfully!");
      onClassifyEmails(data.classifiedEmails);
    } catch (error: any) {
      console.error("Classification Error:", error);
      toast.error(error.message || "Failed to classify emails");
    } finally {
      setLoading(false);
    }
  };

  return (
    <header className="h-16 border-b bg-card flex items-center px-4 gap-4 sticky top-0 z-50 shadow-sm">
      {/* Mobile Menu Button */}
      <Button
        variant="ghost"
        size="icon"
        onClick={onMenuClick}
        className="md:hidden"
        aria-label="Toggle menu"
      >
        <Menu className="h-5 w-5" />
      </Button>

      {/* Logo + Title */}
      <div className="flex items-center gap-2">
        <div className="w-10 h-10 rounded-lg bg-primary flex items-center justify-center">
          <span className="text-primary-foreground font-bold text-lg">M</span>
        </div>
        <h1 className="text-xl font-bold text-foreground hidden sm:block">
          MagicSlide
        </h1>
      </div>

      {/* Search Bar */}
      <div className="flex-1 max-w-2xl mx-4 flex items-center gap-2">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Search emails..."
            className="pl-10 bg-secondary border-0 focus-visible:ring-1"
          />
        </div>

        <div>
            <DropdownMenuLabel className="text-md uppercase text-muted-foreground tracking-wider">
              AI Filteration
            </DropdownMenuLabel>
        </div>

        {/* Category Dropdown */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" className="gap-2">
              <Filter className="h-4 w-4" /> {selectedCategory}
            </Button>
          </DropdownMenuTrigger>
          
          <DropdownMenuContent align="end" className="w-48">
            <DropdownMenuLabel>Filter by Category</DropdownMenuLabel>
            {["All", "Important", "Marketing", "Spam","Advertising","Social","Uncategorized"].map(
              (cat) => (
                <DropdownMenuItem key={cat} onClick={() => onCategoryChange(cat)}>
                  {cat}
                </DropdownMenuItem>
              )
            )}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      {/* Action Buttons */}
      <div className="flex items-center gap-2">
        <Button
          variant="outline"
          size="sm"
          onClick={onFetchEmails}
          className="hidden sm:inline-flex"
        >
          Fetch Emails
        </Button>

        <Button
          size="sm"
          onClick={handleClassifyEmails}
          disabled={!apiKeyAvailable || loading}
          className="hidden sm:inline-flex"
        >
          {loading ? "Classifying..." : "Classify with GPT-4o"}
        </Button>

        <Button
          variant="outline"
          onClick={handleLogout}
          className="flex items-center gap-2 text-gray-700 border-gray-300 hover:bg-gray-100"
        >
          <LogOut className="w-4 h-4" /> Logout
        </Button>
      </div>
    </header>
  );
}
