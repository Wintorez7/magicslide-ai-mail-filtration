"use client";

import { Star, Paperclip, ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useState, useEffect } from "react";

export interface Email {
  id: string;
  sender: string;
  subject: string;
  snippet: string;
  timestamp: Date | string;
  category: string; // ✅ make flexible to allow new ones like 'advertising'
  starred: boolean;
  read: boolean;
  attachments?: string[];
}

interface EmailListProps {
  emails: Email[];
  selectedEmailId: string | null;
  onEmailSelect: (id: string) => void;
  onEmailRead?: (id: string) => void;
  selectedCategory?: string; // ✅ new prop from TopBar filter
}

const getCategoryBadge = (category: string) => {
  const configs: Record<string, { label: string; className: string }> = {
    important: {
      label: "Important",
      className: "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400",
    },
    promotions: {
      label: "Promotions",
      className: "bg-orange-100 text-orange-700 dark:bg-orange-900/30 dark:text-orange-400",
    },
    marketing: {
      label: "Marketing",
      className: "bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400",
    },
    advertising: {
      label: "Advertising",
      className: "bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-400",
    },
    social: {
      label: "Social",
      className: "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400",
    },
    spam: {
      label: "Spam",
      className: "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400",
    },
    default: {
      label: "Uncategorized",
      className: "bg-gray-100 text-gray-600 dark:bg-gray-800 dark:text-gray-300",
    },
  };
  return configs[category] || configs.default;
};

const formatTimestamp = (date: Date | string) => {
  const d = typeof date === "string" ? new Date(date) : date;
  const now = new Date();
  const diffMs = now.getTime() - d.getTime();
  const diffHours = Math.floor(diffMs / (1000 * 60 * 60));
  const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));

  if (diffHours < 1) return "Just now";
  if (diffHours < 24) return `${diffHours}h ago`;
  if (diffDays < 7) return `${diffDays}d ago`;
  return d.toLocaleDateString("en-US", { month: "short", day: "numeric" });
};

export default function EmailList({
  emails,
  selectedEmailId,
  onEmailSelect,
  onEmailRead,
  selectedCategory = "All",
}: EmailListProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [localEmails, setLocalEmails] = useState<Email[]>(emails);
  const emailsPerPage = 5;

  // ✅ Sync emails when fetched or reclassified
  useEffect(() => {
    setLocalEmails(emails);
  }, [emails]);

  // ✅ Filter emails by selected category
  const filteredEmails =
    selectedCategory === "All"
      ? localEmails
      : localEmails.filter(
          (e) => e.category?.toLowerCase() === selectedCategory.toLowerCase()
        );

  const totalPages = Math.ceil(filteredEmails.length / emailsPerPage);
  const startIndex = currentIndex * emailsPerPage;
  const endIndex = Math.min(startIndex + emailsPerPage, filteredEmails.length);
  const currentEmails = filteredEmails.slice(startIndex, endIndex);

  const goToPrevious = () => setCurrentIndex((prev) => Math.max(0, prev - 1));
  const goToNext = () => setCurrentIndex((prev) => Math.min(totalPages - 1, prev + 1));

  const handleEmailClick = (emailId: string) => {
    onEmailSelect(emailId);

    const emailIndex = localEmails.findIndex((email) => email.id === emailId);
    if (emailIndex !== -1 && !localEmails[emailIndex].read) {
      const updatedEmails = [...localEmails];
      updatedEmails[emailIndex] = { ...updatedEmails[emailIndex], read: true };
      setLocalEmails(updatedEmails);
      onEmailRead?.(emailId);
    }
  };

  return (
    <div className="flex-1 flex flex-col h-[100%] border-r bg-background">
      {/* Header */}
      <div className="p-3 border-b flex justify-between items-center">
        <div>
          <h2 className="font-semibold text-foreground">Inbox</h2>
          <p className="text-sm text-muted-foreground">
            {filteredEmails.length} messages
          </p>
        </div>
      </div>

      {/* Email List */}
      <div className="flex-1 overflow-y-auto scroll-smooth scrollbar-thin scrollbar-thumb-rounded-l scrollbar-thumb-muted-foreground/20 hover:scrollbar-thumb-muted-foreground/40">
        <div className="divide-y">
          {currentEmails.map((email) => {
            const badge = getCategoryBadge(email.category);
            const isSelected = selectedEmailId === email.id;

            return (
              <div
                key={email.id}
                onClick={() => handleEmailClick(email.id)}
                className={cn(
                  "p-3 cursor-pointer transition-all duration-200 hover:bg-accent/50",
                  isSelected && "bg-accent border-l-4 border-l-primary",
                  !email.read && "bg-muted/30"
                )}
              >
                <div className="flex items-start gap-3">
                  <button
                    className={cn(
                      "mt-1 transition-colors",
                      email.starred
                        ? "text-yellow-500"
                        : "text-muted-foreground hover:text-yellow-500"
                    )}
                    onClick={(e) => e.stopPropagation()}
                  >
                    <Star className={cn("h-4 w-4", email.starred && "fill-current")} />
                  </button>

                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between mb-1">
                      <p
                        className={cn(
                          "text-sm truncate",
                          !email.read
                            ? "font-semibold text-foreground"
                            : "font-medium text-muted-foreground"
                        )}
                      >
                        {email.sender}
                      </p>
                      <span className="text-xs text-muted-foreground ml-2 shrink-0">
                        {formatTimestamp(email.timestamp)}
                      </span>
                    </div>

                    <p
                      className={cn(
                        "text-sm mb-1 truncate",
                        !email.read
                          ? "font-semibold text-foreground"
                          : "text-muted-foreground"
                      )}
                    >
                      {email.subject}
                    </p>

                    <p className="text-xs text-muted-foreground truncate mb-2">
                      {email.snippet}
                    </p>

                    <div className="flex items-center gap-2">
                      <Badge variant="outline" className={badge.className}>
                        {badge.label}
                      </Badge>
                      {email.attachments && email.attachments.length > 0 && (
                        <div className="flex items-center gap-1 text-xs text-muted-foreground">
                          <Paperclip className="h-3 w-3" />
                          <span>{email.attachments.length}</span>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="p-4 border-t bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
          <div className="flex items-center justify-between">
            <Button
              variant="outline"
              size="sm"
              onClick={goToPrevious}
              disabled={currentIndex === 0}
              className="h-8 w-8 p-0"
            >
              <ChevronLeft className="h-4 w-4" />
            </Button>

            <div className="flex items-center gap-2">
              {Array.from({ length: totalPages }, (_, i) => (
                <button
                  key={i}
                  onClick={() => setCurrentIndex(i)}
                  className={cn(
                    "w-2 h-2 rounded-full transition-all",
                    currentIndex === i
                      ? "bg-primary w-6"
                      : "bg-muted-foreground/30 hover:bg-muted-foreground/50"
                  )}
                />
              ))}
            </div>

            <Button
              variant="outline"
              size="sm"
              onClick={goToNext}
              disabled={currentIndex === totalPages - 1}
              className="h-8 w-8 p-0"
            >
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>

          <div className="text-center mt-2">
            <p className="text-xs text-muted-foreground">
              Showing {startIndex + 1}-{endIndex} of {filteredEmails.length} emails
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
