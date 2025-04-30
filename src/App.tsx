import React, { useRef } from 'react';
import { Mail, MessageSquare, ChevronDown } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { GlassForm } from './components/GlassForm';
import { PlanosGrid, Plano } from './components/PlanosGrid';

function App() {
  const [selectedPlano, setSelectedPlano] = React.useState<Plano | undefined>(undefined);
  const plansRef = useRef<HTMLDivElement>(null);

  const planos: Plano[] = [
    { id: 1, nome: 'PLANO 1', capital: '10.000', quantidade: 1, premio: '29,90' },
    { id: 2, nome: 'PLANO 2', capital: '15.000', quantidade: 2, premio: '44,85' },
    { id: 3, nome: 'PLANO 3', capital: '20.000', quantidade: 3, premio: '59,80' },
    { id: 4, nome: 'PLANO 4', capital: '25.000', quantidade: 4, premio: '74,75' },
    { id: 5, nome: 'PLANO 5', capital: '35.000', quantidade: 5, premio: '104,65' },
    { id: 6, nome: 'PLANO 6', capital: '50.000', quantidade: 6, premio: '149,50' },
    { id: 7, nome: 'PLANO 7', capital: '75.000', quantidade: 7, premio: '199,90' },
    { id: 8, nome: 'PLANO 8', capital: '100.000', quantidade: 8, premio: '249,90' },
    { id: 9, nome: 'PLANO 9', capital: '150.000', quantidade: 9, premio: '299,90' },
  ];

  const handlePlanoSelect = (plano: Plano) => {
    setSelectedPlano(plano);
    setTimeout(() => {
      plansRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, 100);
  };

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-white to-gray-50">
      {/* WhatsApp Button */}
      <a 
        href="https://wa.me/5511999999999" 
        target="_blank" 
        rel="noopener noreferrer"
        className="fixed bottom-8 right-8 bg-green-500 text-white p-4 rounded-full shadow-lg hover:bg-green-600 transition-colors z-50"
      >
        <MessageSquare className="w-8 h-8" />
      </a>

      {/* Hero Section Clean */}
      <header className="w-full py-12 flex flex-col items-center justify-center bg-white/80 border-b border-gray-100">
        <img src="/logo-jobseguros.png" alt="Job Seguros Logo" className="w-20 h-20 rounded-full bg-white shadow p-2 mb-6" />
        <motion.h1 initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }} className="text-4xl sm:text-5xl font-bold text-center text-gray-900 mb-4">Proteção sob medida para você</motion.h1>
        <motion.p initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2, duration: 0.7 }} className="text-lg sm:text-xl text-gray-500 text-center max-w-2xl mb-8">Simples, rápido e seguro. Escolha seu plano e garanta sua tranquilidade.</motion.p>
        <motion.button
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.7 }}
          onClick={() => plansRef.current?.scrollIntoView({ behavior: 'smooth' })}
          className="bg-blue-600 text-white px-8 py-4 rounded-full font-semibold hover:bg-blue-700 transition-colors flex items-center text-lg shadow"
        >
          Ver Planos <ChevronDown className="ml-2 w-5 h-5" />
        </motion.button>
      </header>

      {/* Stats Section Clean */}
      <section className="py-12 bg-white border-b border-gray-100">
        <div className="max-w-4xl mx-auto flex flex-col sm:flex-row justify-center gap-8">
          {[
            { label: 'Profissionais Protegidos', value: '50.000+' },
            { label: 'Satisfação', value: '98%' },
            { label: 'Pagamento em até', value: '24h' },
          ].map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.2 }}
              className="flex-1 text-center"
            >
              <div className="text-3xl sm:text-4xl font-bold text-blue-600 mb-2">{stat.value}</div>
              <div className="text-gray-500 text-base font-medium">{stat.label}</div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Benefits Section Clean */}
      <section className="py-20 bg-white border-b border-gray-100">
        <div className="max-w-5xl mx-auto grid md:grid-cols-3 gap-8 px-4">
          {[
            {
              icon: <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" /></svg>,
              title: 'Cobertura Completa',
              desc: 'Planos que protegem você e sua família em todas as situações.'
            },
            {
              icon: <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10" /><path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6l4 2" /></svg>,
              title: 'Agilidade no Atendimento',
              desc: 'Processo simples e pagamento rápido dos benefícios.'
            },
            {
              icon: <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><rect width="20" height="14" x="2" y="5" rx="2" /><path strokeLinecap="round" strokeLinejoin="round" d="M2 10h20" /></svg>,
              title: 'Contratação Online',
              desc: 'Faça tudo pelo site, sem burocracia e com suporte dedicado.'
            }
          ].map((b, i) => (
            <motion.div
              key={b.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.2 }}
              className="bg-white rounded-2xl shadow p-8 text-center border border-gray-100"
            >
              <div className="flex items-center justify-center mb-4">{b.icon}</div>
              <div className="text-lg font-bold mb-2 text-gray-900">{b.title}</div>
              <div className="text-gray-500 text-base">{b.desc}</div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Testimonials Section Clean */}
      <section className="py-20 bg-gray-50 border-b border-gray-100">
        <div className="max-w-3xl mx-auto px-4">
          <h2 className="text-2xl font-bold text-center mb-10 text-gray-900">O que dizem nossos clientes</h2>
          <div className="flex flex-col gap-8">
            {[
              {
                name: 'João Silva',
                text: 'O seguro me deu tranquilidade para trabalhar. Quando precisei, o atendimento foi rápido e eficiente.'
              },
              {
                name: 'Maria Santos',
                text: 'A assistência que recebemos foi fundamental em um momento difícil. Recomendo a todos!'
              },
              {
                name: 'Carlos Oliveira',
                text: 'Processo simples e benefícios que fazem a diferença. Melhor decisão que tomei!'
              }
            ].map((t, i) => (
              <motion.div
                key={t.name}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.2 }}
                className="bg-white rounded-xl shadow p-6 text-center border border-gray-100"
              >
                <div className="text-gray-700 text-base mb-4">“{t.text}”</div>
                <div className="text-blue-600 font-semibold">{t.name}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section Clean */}
      <section className="py-20 bg-white border-b border-gray-100">
        <div className="max-w-2xl mx-auto px-4">
          <h2 className="text-2xl font-bold text-center mb-10 text-gray-900">Perguntas Frequentes</h2>
          <div className="space-y-4">
            {[
              {
                q: 'Como funciona o processo de contratação?',
                a: 'É simples e rápido. Após escolher seu plano, preencha o formulário e nossa equipe entrará em contato.'
              },
              {
                q: 'Quanto tempo leva para o seguro começar a valer?',
                a: 'Após a aprovação da documentação, sua cobertura começa imediatamente.'
              },
              {
                q: 'Posso alterar meu plano depois?',
                a: 'Sim, você pode alterar seu plano a qualquer momento.'
              }
            ].map((faq, i) => (
              <motion.div
                key={faq.q}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="bg-gray-50 rounded-xl border border-gray-100 p-4"
              >
                <details>
                  <summary className="flex items-center cursor-pointer text-lg font-medium text-blue-700">
                    <ChevronDown className="w-5 h-5 mr-2" />
                    {faq.q}
                  </summary>
                  <div className="text-gray-600 mt-2 text-base pl-7">{faq.a}</div>
                </details>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Plans Section + Registration Form (transição) */}
      <section className="py-24 bg-gradient-to-b from-white to-gray-50" ref={plansRef}>
        <div className="container mx-auto px-2 sm:px-4">
          <h2 className="text-3xl sm:text-4xl font-bold text-center mb-8 text-gray-900">Escolha o seu Bilhete Premiável</h2>
          <AnimatePresence mode="wait">
            {!selectedPlano && (
              <motion.div
                key="planos"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -30 }}
                transition={{ duration: 0.4 }}
              >
                <PlanosGrid planos={planos} onSelect={handlePlanoSelect} selected={selectedPlano} />
              </motion.div>
            )}
            {selectedPlano && (
              <motion.div
                key="form"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -30 }}
                transition={{ duration: 0.4 }}
              >
                <button
                  onClick={() => setSelectedPlano(undefined)}
                  className="mb-8 flex items-center gap-2 text-blue-600 hover:text-blue-800 font-semibold transition-colors"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" /></svg>
                  Voltar e escolher outro plano
                </button>
                <GlassForm plano={selectedPlano} />
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </section>

      {/* Footer Modernizado */}
      <footer className="w-full py-10 border-t border-gray-100 bg-white/80 backdrop-blur-md">
        <div className="container mx-auto px-4 flex flex-col md:flex-row items-center justify-between gap-6 md:gap-0">
          {/* Logo e nome */}
          <div className="flex items-center gap-3 mb-4 md:mb-0">
            <img src="/logo-jobseguros.png" alt="Job Seguros Logo" className="w-10 h-10 rounded-full bg-white shadow p-1" />
            <span className="text-gray-700 font-semibold text-base tracking-tight">Job Seguros</span>
          </div>
          {/* Links rápidos */}
          <div className="flex items-center gap-6 text-gray-500 text-sm">
            <a href="mailto:contato@segurosmoto.com" className="hover:text-blue-600 transition-colors flex items-center gap-1" title="E-mail">
              <Mail className="w-4 h-4" /> E-mail
            </a>
            <a href="https://wa.me/5511999999999" target="_blank" rel="noopener noreferrer" className="hover:text-green-600 transition-colors flex items-center gap-1" title="WhatsApp">
              <MessageSquare className="w-4 h-4" /> WhatsApp
            </a>
            <a href="https://instagram.com/jobseguros" target="_blank" rel="noopener noreferrer" className="hover:text-pink-500 transition-colors flex items-center gap-1" title="Instagram">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><rect x="2" y="2" width="20" height="20" rx="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" y1="6.5" x2="17.5" y2="6.5"/></svg> Instagram
            </a>
          </div>
          {/* Direitos autorais */}
          <div className="text-gray-400 text-xs mt-4 md:mt-0 text-center md:text-right">
            &copy; {new Date().getFullYear()} Job Seguros. Todos os direitos reservados.
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;