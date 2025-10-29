"use client";

import { Button } from "@/components/ui/button";

export default function CTA() {
  return (
    <section className="py-24 px-6 bg-gradient-to-br from-blue-600 via-blue-700 to-blue-800 relative overflow-hidden">
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-10 left-10 w-64 h-64 border-2 border-white rounded-full" />
        <div className="absolute bottom-10 right-10 w-96 h-96 border-2 border-white rounded-full" />
      </div>

      <div className="max-w-4xl mx-auto text-center relative z-10">
        <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
          Get Ready to get started?
        </h2>
        <p className="text-2xl md:text-3xl text-blue-100 mb-10">
          What can be sorted, can be solved.
        </p>

        <Button
          size="lg"
          className="bg-white text-blue-600 hover:bg-gray-100 rounded-full px-10 py-6 text-lg font-semibold shadow-xl"
        >
          Login with Google
        </Button>

        <p className="text-blue-200 text-sm mt-4">
          No credit or debit card required
        </p>
      </div>
    </section>
  );
}
