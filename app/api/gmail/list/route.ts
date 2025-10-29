import { google } from "googleapis";
import { getServerSession } from "next-auth";
import { authOptions } from "../../auth/[...nextauth]/route";
import { NextResponse } from "next/server";

export async function GET() {
  const session = await getServerSession(authOptions);
  const accessToken = (session as any)?.accessToken;

  if (!accessToken) {
    return NextResponse.json({ error: "Not authenticated" }, { status: 401 });
  }
    

  try {
    const oauth2Client = new google.auth.OAuth2();
    oauth2Client.setCredentials({ access_token: accessToken });
    const gmail = google.gmail({ version: "v1", auth: oauth2Client });

    const res = await gmail.users.messages.list({
      userId: "me",
      maxResults: 50,
    });

    const messages = await Promise.all(
      (res.data.messages || []).map(async (msg) => {
        const detail = await gmail.users.messages.get({
          userId: "me",
          id: msg.id!,
        });

        const headers = detail.data.payload?.headers || [];
        const from = headers.find((h) => h.name === "From")?.value || "";
        const subject = headers.find((h) => h.name === "Subject")?.value || "";
        const snippet = detail.data.snippet || "";
        const dateStr =
          headers.find((h) => h.name === "Date")?.value ||
          new Date().toISOString();

        // Convert internalDate (ms string) → real Date
       const timestamp = detail.data.internalDate
        ? new Date(Number(detail.data.internalDate))
        : new Date(dateStr);

        return {
          id: msg.id!,
          sender: from,
          subject,
          snippet,
          timestamp,
          category: "important", // placeholder until GPT classification
          starred: false,
          read: !detail.data.labelIds?.includes("UNREAD"),
          attachments:
            detail.data.payload?.parts
              ?.filter((p) => p.filename && p.body?.attachmentId)
              .map((p) => p.filename) || [],
        };
      })
    );

    return NextResponse.json({ messages });
  } catch (err) {
    console.error("Gmail API error:", err);
    return NextResponse.json({ error: "Failed to fetch emails" }, { status: 500 });
  }
}
