"use client";

import {
  Star,
  Reply,
  Forward,
  Trash2,
  Download,
  FileText,
  Mail,
  Archive,
  MailX,
  Clock,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { Separator } from "@/components/ui/separator";
import { useState } from "react";

export interface Email {
  id: string;
  sender: string;
  senderEmail: string;
  subject: string;
  body: string;
  snippet: string;
  timestamp: Date | string;
  category: "important" | "promotions" | "social" | "spam";
  starred: boolean;
  read: boolean;
  attachments?: { name: string; size: string; url?: string }[];
  thread?: Email[];
}

interface EmailPreviewProps {
  email: Email | null;
  onStarToggle?: (id: string) => void;
  onReply?: (id: string) => void;
  onForward?: (id: string) => void;
  onDelete?: (id: string) => void;
  onArchive?: (id: string) => void;
  onMailX?: (id: string) => void;
  onDownloadAttachment?: (emailId: string, attachmentName: string) => void;
}

const getCategoryBadge = (category?: string) => {
  const configs = {
    important: { 
      label: "Important", 
      icon: "🟢",
      className: "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400"
    },
    promotions: { 
      label: "Promotions", 
      icon: "🟠",
      className: "bg-orange-100 text-orange-700 dark:bg-orange-900/30 dark:text-orange-400"
    },
    marketing: {
      label: "Marketing",
      icon: "🟡",
      className: "bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400"
    },
    advertising: {
      label: "Advertising",
      icon: "🟣",
      className: "bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-400"
    },
    social: { 
      label: "Social", 
      icon: "🔵",
      className: "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400"
    },
    spam: { 
      label: "Spam", 
      icon: "🔴",
      className: "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400"
    },
    default: {
      label: "Uncategorized",
      icon: "⚪",
      className: "bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-300"
    },
  } as const;;

   // ✅ Define all valid category keys explicitly
  type CategoryKey = keyof typeof configs;

  const normalized = (category?.toLowerCase() || "default") as CategoryKey;

  // ✅ Return safely with fallback
  return configs[normalized] ?? configs.default;
};


const formatFullTimestamp = (date: Date | string) => {
  // Ensure we have a valid Date object
  const dateObj = typeof date === "string" ? new Date(date) : date;
  
  // Check if the date is valid
  if (isNaN(dateObj.getTime())) {
    return "Invalid date";
  }
  
  return dateObj.toLocaleDateString("en-US", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
};

export default function EmailPreview({
  email,
  onStarToggle,
  onReply,
  onForward,
  onDelete,
  onArchive,
  onMailX,
  onDownloadAttachment,
}: EmailPreviewProps) {
  const [showFullThread, setShowFullThread] = useState(false);

  if (!email) {
    return (
      <div className="flex-1 flex items-center justify-center bg-background">
        <div className="text-center text-muted-foreground">
          <Mail className="h-16 w-16 mx-auto mb-4 opacity-20" />
          <p className="text-lg">Select an email to read</p>
        </div>
      </div>
    );
  }

  const badge = getCategoryBadge(email.category);
  const hasThread = email.thread && email.thread.length > 0;

  return (
    <div className="flex-1 flex flex-col bg-background overflow-hidden">
      {/* Email Header */}
      <div className="border-b p-6 bg-card">
        <div className="flex items-start justify-between mb-4">
          <div className="flex-1">
            <h1 className="text-2xl  text-foreground mb-2">
              {email.subject}
            </h1>
            <div className="flex items-center gap-2">
              <Badge variant="outline" className={cn("text-xs", badge.className)}>
                {badge.icon} {badge.label}
              </Badge>
              {hasThread && (
                <Badge variant="secondary" className="text-xs">
                  {email.thread?.length} messages in thread
                </Badge>
              )}
            </div>
          </div>
          <button
            className={cn(
              "transition-colors ml-4",
              email.starred
                ? "text-yellow-500"
                : "text-muted-foreground hover:text-yellow-500"
            )}
            onClick={() => onStarToggle && onStarToggle(email.id)}
          >
            <Star
              className={cn("h-5 w-5", email.starred && "fill-current")}
            />
          </button>
        </div>

        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center text-primary-foreground font-semibold">
              {email.sender.charAt(0)}
            </div>
            <div>
              <p className="font-semibold text-foreground">{email.sender}</p>
              <p className="text-sm text-muted-foreground">
                {email.senderEmail}
              </p>
            </div>
          </div>
          <p className="text-sm text-muted-foreground">
            {formatFullTimestamp(email.timestamp)}
          </p>
        </div>
        
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="font-light text-sm mt-5">
              {email.snippet}
            </div>          
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-2 mt-4 pt-4 border-t">
          <Button variant="outline" size="sm" onClick={() => onReply && onReply(email.id)}>
            <Reply className="h-4 w-4 mr-2" />
            Reply
          </Button>
          <Button variant="outline" size="sm" onClick={() => onForward && onForward(email.id)}>
            <Forward className="h-4 w-4 mr-2" />
            Forward
          </Button>
          <Button variant="outline" size="sm" onClick={() => onArchive && onArchive(email.id)}>
            <Archive className="h-4 w-4 mr-2" />
            Archive
          </Button>
          <Button variant="outline" size="sm" onClick={() => onMailX && onMailX(email.id)}>
            <MailX className="h-4 w-4 mr-2" />
            Mark Unread
          </Button>
          <Button variant="outline" size="sm" onClick={() => onDelete && onDelete(email.id)}>
            <Trash2 className="h-4 w-4 mr-2" />
            Delete
          </Button>
        </div>
      </div>

      {/* Email Thread Toggle */}
      {hasThread && (
        <div className="px-6 py-2 bg-muted/30 border-b">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setShowFullThread(!showFullThread)}
            className="h-auto p-1 text-xs"
          >
            <Clock className="h-3 w-3 mr-1" />
            {showFullThread ? "Hide" : "Show"} full thread ({email.thread?.length} messages)
          </Button>
        </div>
      )}

      {/* Email Body */}
      <div className="flex-1 overflow-y-auto p-6">
        {/* Thread Messages */}
        {hasThread && showFullThread && (
          <div className="mb-6 space-y-4">
            {email.thread?.map((threadEmail, index) => (
              <div key={threadEmail.id} className={cn("border rounded-lg p-4", index > 0 && "mt-4")}>
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-full bg-muted flex items-center justify-center text-muted-foreground text-sm font-semibold">
                      {threadEmail.sender.charAt(0)}
                    </div>
                    <div>
                      <p className="font-medium text-sm">{threadEmail.sender}</p>
                      <p className="text-xs text-muted-foreground">{threadEmail.senderEmail}</p>
                    </div>
                  </div>
                  <p className="text-xs text-muted-foreground">
                    {formatFullTimestamp(threadEmail.timestamp)}
                  </p>
                </div>
                <div className="prose prose-sm max-w-none">
                  <pre className="whitespace-pre-wrap font-sans text-sm text-foreground">
                    {threadEmail.body}
                  </pre>
                </div>
              </div>
            ))}
            <Separator className="my-4" />
          </div>
        )}

        {/* Current Email */}
        <div className="prose prose-sm max-w-none">
          <pre className="whitespace-pre-wrap font-sans text-foreground">
            {email.body}
          </pre>
        </div>

        {/* Attachments */}
        {email.attachments && email.attachments.length > 0 && (
          <div className="mt-8 border-t pt-6">
            <h3 className="text-sm font-semibold text-foreground mb-4">
              Attachments ({email.attachments.length})
            </h3>
            <div className="space-y-2">
              {email.attachments.map((attachment, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between p-3 border rounded-lg hover:bg-accent transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                      <FileText className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-foreground">
                        {attachment.name}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        {attachment.size}
                      </p>
                    </div>
                  </div>
                  <Button 
                    variant="ghost" 
                    size="sm"
                    onClick={() => onDownloadAttachment && onDownloadAttachment(email.id, attachment.name)}
                  >
                    <Download className="h-4 w-4" />
                  </Button>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}