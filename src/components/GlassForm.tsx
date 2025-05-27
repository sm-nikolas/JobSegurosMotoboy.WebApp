import React, { useState } from "react";
import { motion } from "framer-motion";
import type { Plano } from "./PlanosGrid";

interface GlassFormProps {
  plano: Plano;
}

export const GlassForm: React.FC<GlassFormProps> = ({ plano }) => {
  const [form, setForm] = useState({ name: '', cpf: '', phone: '', email: '', address: '' });
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="py-24 bg-white">
        <div className="container mx-auto px-4 max-w-2xl text-center">
          <div className="bg-green-50 rounded-2xl p-12">
            <svg className="w-24 h-24 text-green-500 mx-auto mb-8" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2l4 -4" /></svg>
            <h2 className="text-3xl font-bold mb-4">Parabéns! Seu cadastro foi realizado com sucesso!</h2>
            <p className="text-xl text-gray-600 mb-8">Em breve, nossa equipe entrará em contato para finalizar sua contratação e explicar todos os detalhes do seu plano.</p>
            <p className="text-gray-500">Fique tranquilo, você receberá um e-mail de confirmação com todas as informações.</p>
          </div>
        </div>
      </motion.div>
    );
  }

  return (
    <motion.form
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="max-w-2xl mx-auto bg-white/60 backdrop-blur-md rounded-2xl p-8 shadow-2xl space-y-6 mt-16"
      onSubmit={handleSubmit}
    >
      <div className="text-center mb-6">
        <div className="text-lg font-bold text-blue-700 mb-1">{plano.nome}</div>
        <div className="text-2xl font-light text-gray-700">R$ {plano.capital},00</div>
      </div>
      <h2 className="text-4xl font-bold text-center mb-4">Complete seu cadastro</h2>
      <p className="text-xl text-gray-600 text-center mb-8">Estamos quase lá! Preencha seus dados para garantir sua proteção.</p>
      <div className="grid grid-cols-1 gap-6">
        <input type="text" name="name" value={form.name} onChange={handleChange} required placeholder="Nome Completo" className="px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white/80" />
        <input type="text" name="cpf" value={form.cpf} onChange={handleChange} required placeholder="CPF (000.000.000-00)" pattern="\d{3}\.\d{3}\.\d{3}-\d{2}" className="px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white/80" />
        <input type="tel" name="phone" value={form.phone} onChange={handleChange} required placeholder="Telefone ((00) 00000-0000)" pattern="\(\d{2}\) \d{5}-\d{4}" className="px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white/80" />
        <input type="email" name="email" value={form.email} onChange={handleChange} required placeholder="E-mail" className="px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white/80" />
        <input type="text" name="address" value={form.address} onChange={handleChange} required placeholder="Endereço" className="px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white/80" />
      </div>
      <button type="submit" className="w-full bg-[#F59E42] text-white py-4 rounded-xl font-semibold text-lg hover:bg-[#FACC15] transition-colors mt-8 shadow-lg">Finalizar Contratação</button>
    </motion.form>
  );
}; 