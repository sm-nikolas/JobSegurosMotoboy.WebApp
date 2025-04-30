import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { HelpCircle } from "lucide-react";

const faqs = [
  {
    question: "Como funciona o processo de contratação?",
    answer: "O processo é simples e rápido. Após escolher seu plano, preencha o formulário e nossa equipe entrará em contato para finalizar a contratação."
  },
  {
    question: "Quanto tempo leva para o seguro começar a valer?",
    answer: "Após a aprovação da documentação, sua cobertura começa imediatamente."
  },
  {
    question: "Posso alterar meu plano depois?",
    answer: "Sim, você pode alterar seu plano a qualquer momento, de acordo com suas necessidades."
  }
];

export const FaqAccordion: React.FC = () => {
  const [open, setOpen] = useState<number | null>(null);
  return (
    <div className="space-y-4 max-w-2xl mx-auto">
      {faqs.map((faq, i) => (
        <div key={i} className="bg-white/80 rounded-xl border border-gray-100 shadow p-4">
          <button
            className="flex items-center w-full text-left focus:outline-none"
            onClick={() => setOpen(open === i ? null : i)}
            aria-expanded={open === i}
          >
            <HelpCircle className="w-6 h-6 text-blue-600 mr-3" />
            <span className="text-lg font-semibold text-gray-900">{faq.question}</span>
          </button>
          <AnimatePresence initial={false}>
            {open === i && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.3 }}
                className="overflow-hidden"
              >
                <div className="text-gray-600 mt-3 text-base px-2 pb-2">{faq.answer}</div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      ))}
    </div>
  );
}; 