"use client";

import {
  Mail,
  Send,
  FileText,
  AlertCircle,
  Trash2,
  Star,
  Tag,
  Users,
  Folder,
  Archive,
  Clock,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { useSession } from "next-auth/react";
import Image from "next/image";
import { useState, useEffect } from "react";

interface SidebarProps {
  isOpen: boolean;
  selectedFolder: string;
  onFolderSelect: (folder: string) => void;
  emailCounts?: {
    inbox: number;
    sent: number;
    drafts: number;
    spam: number;
    trash: number;
    important: number;
    promotions: number;
    social: number;
    archive: number;
  };
}

// Default folder structure with dynamic counts
const getDefaultFolders = (counts: any = {}) => [
  { id: "inbox", label: "Inbox", icon: Mail, count: counts.inbox || 0 },
  { id: "sent", label: "Sent", icon: Send, count: counts.sent || 0 },
  { id: "drafts", label: "Drafts", icon: FileText, count: counts.drafts || 0 },
  { id: "spam", label: "Spam", icon: AlertCircle, count: counts.spam || 0 },
  { id: "trash", label: "Trash", icon: Trash2, count: counts.trash || 0 },
  { id: "archive", label: "Archive", icon: Archive, count: counts.archive || 0 },
];

// Default labels with dynamic counts
const getDefaultLabels = (counts: any = {}) => [
  { 
    id: "important", 
    label: "Important", 
    icon: Star, 
    color: "text-green-600",
    count: counts.important || 0
  },
  { 
    id: "promotions", 
    label: "Promotions", 
    icon: Tag, 
    color: "text-orange-600",
    count: counts.promotions || 0
  },
  { 
    id: "social", 
    label: "Social", 
    icon: Users, 
    color: "text-blue-600",
    count: counts.social || 0
  },
];

export default function Sidebar({
  isOpen,
  selectedFolder,
  onFolderSelect,
  emailCounts,
}: SidebarProps) {
  const { data: session } = useSession();
  const user = session?.user;
  const [folders, setFolders] = useState(getDefaultFolders(emailCounts));
  const [labels, setLabels] = useState(getDefaultLabels(emailCounts));
  const [customFolders, setCustomFolders] = useState<Array<{id: string, label: string, count: number}>>([]);
  const [showNewFolderInput, setShowNewFolderInput] = useState(false);
  const [newFolderName, setNewFolderName] = useState("");

  // Update folders and labels when emailCounts changes
  useEffect(() => {
    setFolders(getDefaultFolders(emailCounts));
    setLabels(getDefaultLabels(emailCounts));
  }, [emailCounts]);

  // Fetch custom folders from API or localStorage
  useEffect(() => {
    // This would typically be an API call to fetch user's custom folders
    // For demo purposes, we'll use localStorage
    const savedFolders = localStorage.getItem("customFolders");
    if (savedFolders) {
      try {
        setCustomFolders(JSON.parse(savedFolders));
      } catch (error) {
        console.error("Error parsing custom folders:", error);
      }
    }
  }, []);

  const handleAddCustomFolder = () => {
    if (newFolderName.trim()) {
      const newFolder = {
        id: `custom-${Date.now()}`,
        label: newFolderName.trim(),
        count: 0,
      };
      
      const updatedFolders = [...customFolders, newFolder];
      setCustomFolders(updatedFolders);
      localStorage.setItem("customFolders", JSON.stringify(updatedFolders));
      setNewFolderName("");
      setShowNewFolderInput(false);
    }
  };

  const handleDeleteCustomFolder = (folderId: string) => {
    const updatedFolders = customFolders.filter(folder => folder.id !== folderId);
    setCustomFolders(updatedFolders);
    localStorage.setItem("customFolders", JSON.stringify(updatedFolders));
    
    // If the deleted folder was selected, switch to inbox
    if (selectedFolder === folderId) {
      onFolderSelect("inbox");
    }
  };

  return (
    <>
      {/* Mobile Backdrop */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 md:hidden"
          onClick={() => onFolderSelect(selectedFolder)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={cn(
          "fixed md:sticky top-1 left-0 h-[calc(100vh-4rem)] bg-card border-r z-40 transition-transform duration-300 w-[19rem] flex flex-col",
          isOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"
        )}
      >
        {/* User Info */}
        <div className="p-4 border-b">
          <div className="flex items-center gap-3 mb-6">
            {user?.image ? (
              <Image
                src={user.image}
                alt={user.name || "User"}
                width={40}
                height={40}
                className="rounded-full"
              />
            ) : (
              <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center text-primary-foreground font-semibold">
                {user?.name ? user.name.charAt(0).toUpperCase() : "?"}
              </div>
            )}
            <div className="flex-1 min-w-0">
              <p className="font-semibold text-sm text-foreground truncate">
                {user?.name || "Loading..."}
              </p>
              <p className="text-xs text-muted-foreground truncate">
                {user?.email || "Fetching email..."}
              </p>
            </div>
          </div>
        </div>

        {/* Folders */}
        <nav className="flex-1 overflow-y-auto px-2">
          <div className="space-y-1 mb-6">
            {folders.map((folder) => {
              const Icon = folder.icon;
              const isSelected = selectedFolder === folder.id;
              return (
                <button
                  key={folder.id}
                  onClick={() => onFolderSelect(folder.id)}
                  className={cn(
                    "w-full flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors",
                    isSelected
                      ? "bg-primary/10 text-primary"
                      : "text-muted-foreground hover:bg-accent hover:text-accent-foreground"
                  )}
                >
                  <Icon className="h-5 w-5 shrink-0" />
                  <span className="flex-1 text-left">{folder.label}</span>
                  {folder.count > 0 && (
                    <span
                      className={cn(
                        "text-xs px-2 py-0.5 rounded-full",
                        isSelected
                          ? "bg-primary text-primary-foreground"
                          : "bg-muted text-muted-foreground"
                      )}
                    >
                      {folder.count}
                    </span>
                  )}
                </button>
              );
            })}
          </div>

          {/* Custom Folders */}
          {customFolders.length > 0 && (
            <div className="px-3 py-2 mb-4">
              <h3 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2">
                Folders
              </h3>
              <div className="space-y-1">
                {customFolders.map((folder) => {
                  const isSelected = selectedFolder === folder.id;
                  return (
                    <div
                      key={folder.id}
                      className={cn(
                        "flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium transition-colors group",
                        isSelected
                          ? "bg-primary/10 text-primary"
                          : "text-muted-foreground hover:bg-accent hover:text-accent-foreground"
                      )}
                    >
                      <button
                        onClick={() => onFolderSelect(folder.id)}
                        className="flex items-center gap-3 flex-1"
                      >
                        <Folder className="h-5 w-5 shrink-0" />
                        <span className="flex-1 text-left">{folder.label}</span>
                        {folder.count > 0 && (
                          <span
                            className={cn(
                              "text-xs px-2 py-0.5 rounded-full",
                              isSelected
                                ? "bg-primary text-primary-foreground"
                                : "bg-muted text-muted-foreground"
                            )}
                          >
                            {folder.count}
                          </span>
                        )}
                      </button>
                      <button
                        onClick={() => handleDeleteCustomFolder(folder.id)}
                        className="opacity-0 group-hover:opacity-100 transition-opacity p-1 hover:bg-accent/50 rounded"
                      >
                        <Trash2 className="h-3 w-3" />
                      </button>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* Add Custom Folder */}
          <div className="px-1 py-2 mb-4">
            {showNewFolderInput ? (
              <div className="flex items-center gap-2">
                <input
                  type="text"
                  value={newFolderName}
                  onChange={(e) => setNewFolderName(e.target.value)}
                  placeholder="Folder name"
                  className="flex-1 px-2 py-1 text-sm border rounded"
                  autoFocus
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      handleAddCustomFolder();
                    } else if (e.key === "Escape") {
                      setShowNewFolderInput(false);
                      setNewFolderName("");
                    }
                  }}
                />
                <button
                  onClick={handleAddCustomFolder}
                  className="p-1 text-primary hover:bg-primary/10 rounded"
                >
                  <Mail className="h-4 w-4" />
                </button>
                <button
                  onClick={() => {
                    setShowNewFolderInput(false);
                    setNewFolderName("");
                  }}
                  className="p-1 text-muted-foreground hover:bg-accent rounded"
                >
                  ×
                </button>
              </div>
            ) : (
              <button
                onClick={() => setShowNewFolderInput(true)}
                className="w-full flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors text-muted-foreground hover:bg-accent hover:text-accent-foreground"
              >
                <Folder className="h-5 w-5 shrink-0" />
                <span className="flex-1 text-left">Add Folder</span>
              </button>
            )}
          </div>

          {/* Labels */}
          {/* <div className="px-3 py-2">
            <h3 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2">
              Labels
            </h3>
            <div className="space-y-1">
              {labels.map((label) => {
                const Icon = label.icon;
                const isSelected = selectedFolder === label.id;
                return (
                  <button
                    key={label.id}
                    onClick={() => onFolderSelect(label.id)}
                    className={cn(
                      "w-full flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors",
                      isSelected
                        ? "bg-accent text-accent-foreground"
                        : "text-muted-foreground hover:bg-accent/50 hover:text-accent-foreground"
                    )}
                  >
                    <Icon className={cn("h-4 w-4 shrink-0", label.color)} />
                    <span className="flex-1 text-left">{label.label}</span>
                    {label.count > 0 && (
                      <span
                        className={cn(
                          "text-xs px-2 py-0.5 rounded-full",
                          isSelected
                            ? "bg-accent text-accent-foreground"
                            : "bg-muted text-muted-foreground"
                        )}
                      >
                        {label.count}
                      </span>
                    )}
                  </button>
                );
              })}
            </div>
          </div> */}
        </nav>
      </aside>
    </>
  );
}