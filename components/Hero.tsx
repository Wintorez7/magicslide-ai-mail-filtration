"use client";

import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Play } from "lucide-react";

export default function Hero() {
  return (
    <section className="relative pt-32 pb-20 px-6 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-blue-50/50 to-white -z-10" />

      <div className="absolute top-20 left-10 w-32 h-32 border-2 border-blue-200 rounded-3xl opacity-50" />
      <div className="absolute bottom-20 right-10 w-40 h-40 border-2 border-purple-200 rounded-3xl opacity-50" />

      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <Badge
            variant="secondary"
            className="mb-6 px-4 py-2 text-sm font-medium bg-gradient-to-r from-blue-100 to-purple-100 text-blue-700 border-0"
          >
            Next-Gen Email Intelligence
          </Badge>

          <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight">
            The only platform powered by{" "}
            <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
              advanced AI
            </span>
          </h1>

          <p className="text-xl text-gray-600 mb-10 max-w-2xl mx-auto">
            MagicSlide automatically classifies your Gmail emails using GPT-4o.
          </p>

          <div className="flex items-center justify-center gap-4 flex-wrap">
            <Button
              size="lg"
              className="bg-blue-600 hover:bg-blue-700 text-white rounded-full px-8 text-base"
            >
              Login with Google
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="border-gray-300 rounded-full px-8 text-base"
            >
              <Play className="w-4 h-4 mr-2" />
              Watch Demo
            </Button>
          </div>
        </div>

        <div className="relative max-w-5xl mx-auto mt-16">
          <div className="relative bg-white rounded-2xl shadow-2xl border border-gray-200 overflow-hidden">
            <div className="bg-gradient-to-r from-gray-50 to-gray-100 px-4 py-3 border-b border-gray-200 flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-red-500" />
              <div className="w-3 h-3 rounded-full bg-yellow-500" />
              <div className="w-3 h-3 rounded-full bg-green-500" />
            </div>

            <div className="p-8 bg-gradient-to-br from-white to-blue-50/30">
              <div className="space-y-4">
                <div className="flex items-center gap-4 p-4 bg-white rounded-lg shadow-sm border border-blue-100">
                  <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center text-2xl">
                    📧
                  </div>
                  <div className="flex-1">
                    <div className="font-semibold text-sm mb-1">Important - Quarterly Review Meeting</div>
                    <div className="text-xs text-gray-500">From: team@company.com</div>
                  </div>
                  <Badge className="bg-blue-600 text-white">Important</Badge>
                </div>

                <div className="flex items-center gap-4 p-4 bg-white rounded-lg shadow-sm border border-purple-100">
                  <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center text-2xl">
                    🎯
                  </div>
                  <div className="flex-1">
                    <div className="font-semibold text-sm mb-1">50% Off - Limited Time Offer!</div>
                    <div className="text-xs text-gray-500">From: deals@store.com</div>
                  </div>
                  <Badge className="bg-purple-600 text-white">Promotions</Badge>
                </div>

                <div className="flex items-center gap-4 p-4 bg-white rounded-lg shadow-sm border border-pink-100">
                  <div className="w-12 h-12 bg-pink-100 rounded-lg flex items-center justify-center text-2xl">
                    👥
                  </div>
                  <div className="flex-1">
                    <div className="font-semibold text-sm mb-1">John liked your post</div>
                    <div className="text-xs text-gray-500">From: notifications@social.com</div>
                  </div>
                  <Badge className="bg-pink-600 text-white">Social</Badge>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
