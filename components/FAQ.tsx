"use client";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const faqs = [
  {
    question: "Is my Gmail data stored anywhere?",
    answer: "No. MagicSlide operates with a privacy-first approach. We fetch your emails in real-time, classify them using AI, and display the results to you. Nothing is stored in any database. Your data stays secure and private.",
  },
  {
    question: "Do I need my own OpenAI key?",
    answer: "No, you don't need to provide your own API key. MagicSlide handles all the AI processing for you using our secure infrastructure, so you can get started immediately after logging in with Google.",
  },
  {
    question: "How does MagicSlide work?",
    answer: "MagicSlide securely connects to your Gmail account via Google OAuth. It then fetches your recent emails and uses GPT-4o to analyze and classify them into categories like Important, Promotions, Social, Marketing, Spam, and General. The entire process happens in real-time.",
  },
  {
    question: "Can I re-classify my emails later?",
    answer: "Yes! Since MagicSlide works in real-time and doesn't store your data, you can always log back in to re-classify your emails. The AI will analyze your current inbox state and provide fresh classifications.",
  },
  {
    question: "Is MagicSlide secure?",
    answer: "Absolutely. We use Google's secure OAuth 2.0 authentication and never store your email content. All processing happens in encrypted sessions, and we follow industry-standard security practices to protect your data.",
  },
];

export default function FAQ() {
  return (
    <section id="faqs" className="py-20 px-6 bg-white">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-16">
          <p className="text-blue-600 font-medium mb-4">FAQs</p>
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            Frequently asked questions
          </h2>
          <p className="text-gray-600">Explore answers to common questions</p>
        </div>

        <Accordion type="single" collapsible className="space-y-4">
          {faqs.map((faq, index) => (
            <AccordionItem
              key={index}
              value={`item-${index}`}
              className="border border-gray-200 rounded-lg px-6 bg-white hover:border-blue-300 transition-colors"
            >
              <AccordionTrigger className="text-left font-semibold hover:no-underline py-6">
                {faq.question}
              </AccordionTrigger>
              <AccordionContent className="text-gray-600 pb-6">
                {faq.answer}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  );
}
