"use client";

import { Mail } from "lucide-react";
import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-white border-t border-gray-200 py-12 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="grid md:grid-cols-4 gap-8 mb-8">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 bg-gradient-to-br from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
                <Mail className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                MagicSlide
              </span>
            </div>
            <p className="text-gray-600 text-sm">
              The only email classification platform powered by advanced AI
            </p>
          </div>

          <div>
            <h3 className="font-semibold mb-4">Company</h3>
            <ul className="space-y-2 text-sm text-gray-600">
              <li><a href="#" className="hover:text-blue-600 transition-colors">Our Products</a></li>
              <li><a href="#" className="hover:text-blue-600 transition-colors">About MagicSlide</a></li>
              <li><a href="#" className="hover:text-blue-600 transition-colors">Request Demo</a></li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold mb-4">Use Cases</h3>
            <ul className="space-y-2 text-sm text-gray-600">
              <li><a href="#" className="hover:text-blue-600 transition-colors">Professionals</a></li>
              <li><a href="#" className="hover:text-blue-600 transition-colors">Startups</a></li>
              <li><a href="#" className="hover:text-blue-600 transition-colors">Enterprises</a></li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold mb-4">Legal & Support</h3>
            <ul className="space-y-2 text-sm text-gray-600">
              <li>
                <Link href={'/privacy'}>
                  <p className="hover:text-blue-600 transition-colors">Privacy Policy</p>
                </Link>
              </li><li>
                <Link href={'/terms'}>
                  <p className="hover:text-blue-600 transition-colors">Terms of Use</p>
                </Link>
              </li>
              <li><a href="#" className="hover:text-blue-600 transition-colors">Contact Support</a></li>
              <li><a href="#" className="hover:text-blue-600 transition-colors">FAQ and Help Center</a></li>
            </ul>
          </div>
        </div>

        <div className="pt-8 border-t border-gray-200 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-gray-600 text-sm">
            © 2025 MagicSlide Ltd. All rights reserved.
          </p>
          <a
            href="#top"
            className="text-blue-600 text-sm font-medium hover:text-blue-700 transition-colors"
          >
            Back to Top ↑
          </a>
        </div>
      </div>
    </footer>
  );
}
