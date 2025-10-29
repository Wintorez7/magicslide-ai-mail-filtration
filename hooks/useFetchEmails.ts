"use client";
import { useState } from "react";

export function useFetchEmails() {
  const [emails, setEmails] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

  const fetchEmails = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/gmail/list");
      const data = await res.json();
      if (data.messages) setEmails(data.messages);
    } catch (err) {
      console.error("Error fetching emails:", err);
    } finally {
      setLoading(false);
    }
  };

  return { emails, loading, fetchEmails,setEmails };
}
