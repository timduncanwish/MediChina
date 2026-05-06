"use client";

import { useState, useRef, useCallback, useId } from "react";

interface AccordionItemProps {
  question: string;
  answer: string;
  isOpen: boolean;
  onToggle: () => void;
  buttonRef: (el: HTMLButtonElement | null) => void;
}

function AccordionItem({
  question,
  answer,
  isOpen,
  onToggle,
  buttonRef,
}: AccordionItemProps) {
  const headingId = useId();
  const panelId = useId();

  return (
    <div className="border border-border rounded-lg overflow-hidden">
      <button
        ref={buttonRef}
        id={headingId}
        className="w-full flex items-center justify-between p-5 text-left hover:bg-muted-light transition-colors"
        onClick={onToggle}
        aria-expanded={isOpen}
        aria-controls={panelId}
      >
        <span className="font-medium text-foreground pr-4 font-heading">
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
          aria-hidden="true"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M19 9l-7 7-7-7"
          />
        </svg>
      </button>
      <div
        id={panelId}
        role="region"
        aria-labelledby={headingId}
        hidden={!isOpen}
        className="px-5 pb-5 text-muted leading-relaxed"
      >
        {answer}
      </div>
    </div>
  );
}

interface AccordionProps {
  items: { question: string; answer: string }[];
}

export function Accordion({ items }: AccordionProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const buttonRefs = useRef<(HTMLButtonElement | null)[]>([]);

  const focusButton = useCallback((index: number) => {
    const clamped = Math.max(0, Math.min(index, items.length - 1));
    buttonRefs.current[clamped]?.focus();
  }, [items.length]);

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent, index: number) => {
      switch (e.key) {
        case "ArrowDown":
          e.preventDefault();
          focusButton(index + 1);
          break;
        case "ArrowUp":
          e.preventDefault();
          focusButton(index - 1);
          break;
        case "Home":
          e.preventDefault();
          focusButton(0);
          break;
        case "End":
          e.preventDefault();
          focusButton(items.length - 1);
          break;
      }
    },
    [focusButton, items.length]
  );

  return (
    <div className="space-y-3" role="presentation">
      {items.map((item, index) => (
        <div key={index} onKeyDown={(e) => handleKeyDown(e, index)}>
          <AccordionItem
            question={item.question}
            answer={item.answer}
            isOpen={openIndex === index}
            onToggle={() => setOpenIndex(openIndex === index ? null : index)}
            buttonRef={(el) => { buttonRefs.current[index] = el; }}
          />
        </div>
      ))}
    </div>
  );
}
