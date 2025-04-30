import React from "react";
import { motion } from "framer-motion";
import { Heart, Clock, FileCheck } from "lucide-react";

const features = [
  {
    icon: <Heart className="w-8 h-8 text-blue-600" />, 
    title: "Proteção Familiar",
    description: "Garantimos o suporte financeiro que sua família precisa, com coberturas abrangentes e benefícios exclusivos."
  },
  {
    icon: <Clock className="w-8 h-8 text-blue-600" />, 
    title: "Agilidade Total",
    description: "Pagamento de benefícios em até 24 horas após a documentação, quando você mais precisa."
  },
  {
    icon: <FileCheck className="w-8 h-8 text-blue-600" />, 
    title: "Processo Simples",
    description: "Contratação descomplicada e suporte completo na hora de acionar o seguro."
  }
];

export const FeatureCards: React.FC = () => (
  <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
    {features.map((feature, i) => (
      <motion.div
        key={feature.title}
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: i * 0.2 }}
        className="bg-white/80 rounded-2xl shadow-lg p-8 text-center border border-gray-100 hover:shadow-2xl transition-shadow duration-300"
      >
        <div className="flex items-center justify-center mb-6">
          <span className="inline-flex items-center justify-center rounded-full bg-blue-100 w-16 h-16 mb-2">
            {feature.icon}
          </span>
        </div>
        <h3 className="text-xl font-bold mb-2 text-gray-900">{feature.title}</h3>
        <p className="text-gray-600 text-base">{feature.description}</p>
      </motion.div>
    ))}
  </div>
); 