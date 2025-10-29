"use client";

import { Button } from "@/components/ui/button";
import { Mail } from "lucide-react";
import Link from "next/link";

export default function Navbar() {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-md border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-gradient-to-br from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
            <Mail className="w-5 h-5 text-white" />
          </div>
          <Link href={'/'}>
            <span className="text-xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
             MagicSlide
            </span>
          </Link>
        </div>

        <div className="hidden md:flex items-center gap-8">
          <a href="#features" className="text-gray-600 hover:text-gray-900 transition-colors text-sm font-medium">
            Features
          </a>
          <a href="#use-cases" className="text-gray-600 hover:text-gray-900 transition-colors text-sm font-medium">
            Use Cases
          </a>
          <a href="#faqs" className="text-gray-600 hover:text-gray-900 transition-colors text-sm font-medium">
            FAQs
          </a>
        </div>

        <Link href={'/login'}>
          <Button
          className="bg-blue-600 hover:bg-blue-700 text-white rounded-full px-6">
          Login with Google
        </Button>
        </Link>
      </div>
    </nav>
  );
}
