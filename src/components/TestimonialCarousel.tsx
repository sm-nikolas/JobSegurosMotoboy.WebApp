import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Star } from "lucide-react";

const testimonials = [
  {
    name: "João Silva",
    role: "Motoboy",
    text: "O seguro me deu tranquilidade para trabalhar. Quando precisei, o atendimento foi rápido e eficiente.",
    rating: 5
  },
  {
    name: "Maria Santos",
    role: "Família de Motoboy",
    text: "A assistência que recebemos foi fundamental em um momento difícil. Recomendo a todos!",
    rating: 5
  },
  {
    name: "Carlos Oliveira",
    role: "Motoboy",
    text: "Processo simples e benefícios que fazem a diferença. Melhor decisão que tomei!",
    rating: 5
  }
];

export const TestimonialCarousel: React.FC = () => {
  const [index, setIndex] = useState(0);
  useEffect(() => {
    const timer = setInterval(() => setIndex(i => (i + 1) % testimonials.length), 5000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="w-full max-w-2xl mx-auto">
      <AnimatePresence mode="wait">
        <motion.div
          key={index}
          initial={{ opacity: 0, x: 40 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -40 }}
          transition={{ duration: 0.5 }}
          className="bg-white/80 rounded-2xl shadow-lg p-10 text-center border border-gray-100 min-h-[260px] flex flex-col justify-center"
        >
          <div className="flex items-center justify-center mb-4">
            {[...Array(testimonials[index].rating)].map((_, i) => (
              <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
            ))}
          </div>
          <p className="text-gray-700 text-lg mb-6">{testimonials[index].text}</p>
          <div>
            <p className="font-semibold text-blue-700">{testimonials[index].name}</p>
            <p className="text-gray-500 text-sm">{testimonials[index].role}</p>
          </div>
        </motion.div>
      </AnimatePresence>
      <div className="flex justify-center gap-2 mt-6">
        {testimonials.map((_, i) => (
          <button
            key={i}
            onClick={() => setIndex(i)}
            className={`w-3 h-3 rounded-full ${i === index ? 'bg-blue-600' : 'bg-gray-300'} transition-colors`}
            aria-label={`Ir para depoimento ${i + 1}`}
          />
        ))}
      </div>
    </div>
  );
}; 