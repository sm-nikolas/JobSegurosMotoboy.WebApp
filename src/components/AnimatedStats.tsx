import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";

interface Stat {
  label: string;
  value: number;
  suffix?: string;
  color?: string;
}

const statsData: Stat[] = [
  { label: 'Profissionais Protegidos', value: 50000, suffix: '+', color: 'text-blue-600' },
  { label: 'Satisfação no Atendimento', value: 98, suffix: '%', color: 'text-yellow-500' },
  { label: 'Pagamento de Benefícios', value: 24, suffix: 'h', color: 'text-green-600' },
];

export const AnimatedStats: React.FC = () => {
  const [displayed, setDisplayed] = useState([0, 0, 0]);

  useEffect(() => {
    const intervals = statsData.map((stat, i) => setInterval(() => {
      setDisplayed(prev => {
        const next = [...prev];
        if (next[i] < stat.value) next[i] += Math.ceil(stat.value / 40);
        if (next[i] > stat.value) next[i] = stat.value;
        return next;
      });
    }, 30));
    return () => intervals.forEach(clearInterval);
  }, []);

  return (
    <div className="flex flex-col md:flex-row justify-center gap-8 w-full max-w-4xl mx-auto">
      {statsData.map((stat, i) => (
        <motion.div
          key={stat.label}
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: i * 0.2 }}
          className="flex-1 bg-white/80 rounded-2xl shadow-lg p-8 text-center backdrop-blur-md border border-gray-100"
        >
          <div className={`text-4xl font-bold mb-2 ${stat.color}`}>{displayed[i]}{stat.suffix}</div>
          <p className="text-gray-600 text-lg font-medium">{stat.label}</p>
        </motion.div>
      ))}
    </div>
  );
} 