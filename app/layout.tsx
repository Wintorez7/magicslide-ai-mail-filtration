import type { Metadata } from "next";
import "./globals.css";
import AuthSessionProvider from "@/providers/session-provider";



export const metadata: Metadata = {
  title: "MagicSlide",
  description: "AI-Powered Gmail Email Classifier",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <AuthSessionProvider>
          {children}
        </AuthSessionProvider>
      </body>
    </html>
  );
}
