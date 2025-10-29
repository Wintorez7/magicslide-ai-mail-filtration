"use client";

import { Card } from "@/components/ui/card";
import { Brain, Lock, Database, Shield, Target, Zap } from "lucide-react";

const features = [
  {
    icon: Brain,
    title: "AI-Based Classification",
    description: "Powered by GPT-4o to intelligently categorize every email with precision.",
  },
  {
    icon: Lock,
    title: "Secure Google OAuth Login",
    description: "Safe and seamless authentication through Google's trusted OAuth system.",
  },
  {
    icon: Database,
    title: "No Database Needed",
    description: "Your emails are processed in real-time without storing any data permanently.",
  },
  {
    icon: Shield,
    title: "Privacy-First Architecture",
    description: "We never store your emails. Everything happens securely in the moment.",
  },
  {
    icon: Target,
    title: "Multi-Category Insights",
    description: "Organize emails into Important, Promotions, Social, Marketing, Spam, and General.",
  },
  {
    icon: Zap,
    title: "Built with Next.js + OpenAI",
    description: "Modern tech stack ensuring fast performance and reliable AI processing.",
  },
];

export default function Features() {
  return (
    <section id="features" className="py-20 px-6 bg-white">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <p className="text-blue-600 font-medium mb-4">Key Features</p>
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            We help you organize complex inboxes in the simplest way.
          </h2>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, index) => (
            <Card
              key={index}
              className="p-8 border border-gray-200 hover:border-blue-300 hover:shadow-lg transition-all duration-300 bg-white"
            >
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
                <feature.icon className="w-6 h-6 text-blue-600" />
              </div>
              <h3 className="text-lg font-semibold mb-2">{feature.title}</h3>
              <p className="text-gray-600 text-sm leading-relaxed">{feature.description}</p>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
