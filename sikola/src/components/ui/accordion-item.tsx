"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";

export interface AccordionItemProps {
  question: string;
  answer: string;
  defaultOpen?: boolean;
}

/**
 * Satu item FAQ yang bisa dibuka/tutup. Generik (cuma butuh
 * question/answer string), jadi bisa dipakai ulang di halaman lain yang
 * butuh pola tanya-jawab serupa (mis. FAQ Guru nanti).
 */
export function AccordionItem({
  question,
  answer,
  defaultOpen = false,
}: AccordionItemProps) {
  const [isOpen, setIsOpen] = useState(defaultOpen);

  return (
    <div className="border-b border-border/70 last:border-b-0">
      <button
        type="button"
        onClick={() => setIsOpen((v) => !v)}
        aria-expanded={isOpen}
        className="flex w-full items-center justify-between gap-3 py-3 text-left"
      >
        <span className="font-heading text-body-sm font-semibold text-text-primary">
          {question}
        </span>
        <ChevronDown
          className={cn(
            "size-4 shrink-0 text-text-secondary transition-transform",
            isOpen && "rotate-180"
          )}
          aria-hidden="true"
        />
      </button>
      {isOpen && (
        <p className="pb-3 text-body-sm text-text-secondary">{answer}</p>
      )}
    </div>
  );
}
