import { NextResponse } from "next/server";


export async function POST(req: Request) {
  try {
    const { emails, apiKey } = await req.json();

    if (!apiKey || !apiKey.startsWith("sk-")) {
      return NextResponse.json(
        { error: "Missing or invalid OpenAI API key" },
        { status: 400 }
      );
    }

    if (!emails || !Array.isArray(emails) || emails.length === 0) {
      return NextResponse.json(
        { error: "No emails provided for classification" },
        { status: 400 }
      );
    }

    // ✅ Process in batches of 20 for better accuracy
    const batchSize = 20;
    const allClassified = [];

    for (let i = 0; i < emails.length; i += batchSize) {
      const batch = emails.slice(i, i + batchSize);
      
      const formattedEmails = batch.map((e, idx) => `
Email #${idx + 1}
From: ${e.sender}
Subject: ${e.subject}
Preview: ${e.snippet}
`).join("\n---\n");

      const res = await fetch("https://api.openai.com/v1/chat/completions", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${apiKey}`,
        },
        body: JSON.stringify({
          model: "gpt-4o-mini",
          messages: [
            {
              role: "system",
              content: `You are an email classifier. Categorize emails into EXACTLY one of these categories:

**important** - Personal emails, work communications, bills, receipts, account notifications, password resets, shipping updates, calendar invites, direct replies to user
**marketing** - Newsletters, promotional offers, sales announcements, product updates, company blogs, event invitations from brands
**spam** - Suspicious links, phishing attempts, fake prizes, unknown senders with weird requests, scams
**advertising** - Cold sales emails, affiliate promotions, sponsored content, ads for services/products you didn't sign up for

RULES:
- Transactional emails (receipts, confirmations, shipping) = important
- Brand newsletters you subscribed to = marketing  
- Unsolicited sales pitches = advertising
- Suspicious/malicious = spam
- When unsure between marketing/advertising, choose marketing if from a known brand

Return ONLY valid JSON array: [{"index":1,"category":"important"},{"index":2,"category":"spam"}]
No explanations, no extra text.`
            },
            { role: "user", content: formattedEmails }
          ],
          temperature: 0.1, // Lower for consistency
          max_tokens: 500,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        console.error("OpenAI API error:", data);
        return NextResponse.json(
          { error: data.error?.message || "Failed to classify" },
          { status: 500 }
        );
      }

      let  parsed: any[] = [];
      try {
        const content = data.choices?.[0]?.message?.content || "[]";
        // Remove markdown code blocks if GPT adds them
        const cleaned = content.replace(/```json\n?|\n?```/g, "").trim();
        parsed = JSON.parse(cleaned);
      } catch (e) {
        console.error("JSON parse error:", e);
        console.error("Raw content:", data.choices?.[0]?.message?.content);
      }

      // ✅ Strict validation - only accept valid categories
      const validCategories = ["important", "marketing", "spam", "advertising"];
      
      const classified = batch.map((email: any, index: number) => {
        const match = parsed.find((p: any) => p.index === index + 1);
        let category = match?.category?.toLowerCase() || "uncategorized";
        
        // Force into valid category or default to uncategorized
        if (!validCategories.includes(category)) {
          category = "uncategorized";
        }
        
        return { ...email, category };
      });

      allClassified.push(...classified);
    }

    return NextResponse.json({ classifiedEmails: allClassified });
  } catch (err) {
    console.error("Classification route error:", err);
    return NextResponse.json(
      { error: "Classification failed" },
      { status: 500 }
    );
  }
}