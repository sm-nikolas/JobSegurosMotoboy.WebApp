import React from "react";
import { motion } from "framer-motion";

export type Plano = {
  id: number;
  nome: string;
  capital: string;
  quantidade: number;
  premio: string;
};

interface PlanosGridProps {
  planos: Plano[];
  onSelect: (plano: Plano) => void;
  selected?: Plano;
}

export const PlanosGrid: React.FC<PlanosGridProps> = ({ planos, onSelect, selected }) => (
  <div className="w-full max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mt-8">
    {planos.map((plano) => (
      <motion.button
        key={plano.id}
        onClick={() => onSelect(plano)}
        whileHover={{ scale: 1.03 }}
        whileTap={{ scale: 0.98 }}
        className={`border rounded-2xl p-8 bg-white text-left shadow-sm transition-all duration-200 outline-none focus:ring-2 focus:ring-blue-400 ${selected?.id === plano.id ? 'border-blue-500 ring-2 ring-blue-300' : 'border-gray-200 hover:shadow-lg'}`}
      >
        <div className="font-bold text-center text-gray-700 mb-2">PLANO {plano.id}</div>
        <div className="text-center text-gray-500 mb-2">Capital Segurado</div>
        <div className="text-center text-4xl sm:text-5xl font-light text-gray-400 mb-4">
          R$ <span className="text-5xl sm:text-6xl font-thin">{plano.capital}</span>,00
        </div>
        <ul className="text-gray-700 text-sm space-y-1">
          <li>Quantidade de nº da sorte: <b>{plano.quantidade}</b></li>
          <li>Prêmio bruto: <b>R$ {plano.premio}</b></li>
        </ul>
      </motion.button>
    ))}
  </div>
); 