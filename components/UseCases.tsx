"use client";

import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowRight } from "lucide-react";

const useCases = [
  {
    logo: "📊",
    title: "How professionals decluttered their inbox in 30% less time with MagicSlide",
    description: "Busy executives save hours every week by automatically sorting important emails from noise.",
    link: "#",
  },
  {
    logo: "🚀",
    title: "How startups use MagicSlide to automate their email workflow",
    description: "Fast-growing teams stay organized without manual sorting or complex filters.",
    link: "#",
  },
  {
    logo: "💼",
    title: "How enterprises boosted email productivity by 65%",
    description: "Large organizations streamline communication across departments with AI-powered classification.",
    link: "#",
  },
];

export default function UseCases() {
  return (
    <section id="use-cases" className="py-20 px-6 bg-gray-50">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <p className="text-blue-600 font-medium mb-4">Use Cases</p>
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            We'll help you get started
          </h2>
          <p className="text-gray-600">Powering teams in all types of industries</p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {useCases.map((useCase, index) => (
            <Card
              key={index}
              className="p-8 border border-gray-200 hover:shadow-xl transition-all duration-300 bg-white"
            >
              <div className="text-4xl mb-6">{useCase.logo}</div>
              <h3 className="text-lg font-semibold mb-4 leading-tight">{useCase.title}</h3>
              <p className="text-gray-600 text-sm mb-6">{useCase.description}</p>
              <a
                href={useCase.link}
                className="inline-flex items-center text-blue-600 font-medium text-sm hover:gap-2 transition-all"
              >
                Read story <ArrowRight className="w-4 h-4 ml-1" />
              </a>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
