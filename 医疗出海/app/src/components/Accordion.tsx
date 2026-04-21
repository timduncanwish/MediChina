"use client";

import { useState } from "react";

interface AccordionItemProps {
  question: string;
  answer: string;
  isOpen?: boolean;
}

export function AccordionItem({
  question,
  answer,
  isOpen: defaultOpen = false,
}: AccordionItemProps) {
  const [isOpen, setIsOpen] = useState(defaultOpen);

  return (
    <div className="border border-border rounded-lg overflow-hidden">
      <button
        className="w-full flex items-center justify-between p-5 text-left hover:bg-muted-light transition-colors"
        onClick={() => setIsOpen(!isOpen)}
      >
        <span className="font-medium text-foreground pr-4 font-[family-name:var(--font-heading)]">
          {question}
        </span>
        <svg
          className={`w-5 h-5 text-muted shrink-0 transition-transform ${
            isOpen ? "rotate-180" : ""
          }`}
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M19 9l-7 7-7-7"
          />
        </svg>
      </button>
      {isOpen && (
        <div className="px-5 pb-5 text-muted leading-relaxed">{answer}</div>
      )}
    </div>
  );
}

interface AccordionProps {
  items: { question: string; answer: string }[];
}

export function Accordion({ items }: AccordionProps) {
  return (
    <div className="space-y-3">
      {items.map((item, index) => (
        <AccordionItem
          key={index}
          question={item.question}
          answer={item.answer}
        />
      ))}
    </div>
  );
}
