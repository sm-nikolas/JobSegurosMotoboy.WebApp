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

      {/* Hero Section Redesigned */}
      <header className="w-full min-h-[90vh] sm:min-h-[80vh] bg-gradient-to-br from-blue-500 via-blue-400 to-blue-700 relative overflow-hidden px-4 sm:px-6">
        <div className="container mx-auto h-full">
          <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center h-full py-12 sm:py-20">
            {/* Left Content */}
            <div className="space-y-6 sm:space-y-8 text-center lg:text-left">
              <div className="space-y-4">
                <motion.h1 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                  className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white leading-tight"
                >
                  A melhor <span className="bg-white text-blue-700 px-3 py-1 rounded-lg inline-block transform -rotate-1">proteção</span>
                </motion.h1>
                <motion.h2 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.3 }}
                  className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white leading-tight"
                >
                  para <span className="border-2 border-white/50 text-white px-4 py-1 rounded-full inline-block">motoboys</span>
                </motion.h2>
                <motion.h2 
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: 0.5 }}
                  className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white leading-tight"
                >
                  e suas famílias
                </motion.h2>
              </div>
              
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.6 }}
                className="flex justify-center lg:justify-start"
              >
                <button 
                  className="bg-white text-blue-700 px-6 sm:px-8 py-3 sm:py-4 rounded-full font-semibold hover:bg-white/80 transition-colors text-base sm:text-lg"
                  onClick={() => plansRef.current?.scrollIntoView({ behavior: 'smooth' })}
                >
                  Quero ser protegido
                </button>
              </motion.div>
            </div>

            {/* Right Content */}
            <motion.div 
              initial={{ opacity: 0, rotate: 0, y: 20 }}
              animate={{ opacity: 1, rotate: 2, y: 0 }}
              transition={{ duration: 0.7, delay: 0.3 }}
              className="relative max-w-lg mx-auto lg:max-w-none"
            >
              <div className="bg-white p-3 sm:p-4 rounded-3xl shadow-2xl">
                <img
                  src="/motoboy.png"
                  alt="Proteção para motoboys e família"
                  className="w-full h-full object-cover rounded-2xl"
                />
              </div>
            </motion.div>
          </div>
        </div>

        {/* Stats Bar */}
        <motion.div 
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.8 }}
          className="absolute bottom-0 left-0 right-0 bg-white/95 backdrop-blur-sm"
        >
          <div className="container mx-auto px-4 py-4 sm:py-6">
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-8">
              {[
                { value: '10', label: 'Anos de liderança' },
                { value: '5M+', label: 'Motoboys protegidos' },
                { value: '115', label: 'Avaliações de clientes' },
                { value: '24', label: 'Atendimento horas' }
              ].map((stat) => (
                <motion.div 
                  key={stat.label}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.9 }}
                  className="text-center"
                >
                  <div className="text-2xl sm:text-3xl lg:text-4xl font-bold text-blue-700">{stat.value}</div>
                  <div className="text-xs sm:text-sm text-gray-600">{stat.label}</div>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>
      </header>

      {/* Benefits Section - Cards Style */}
      <section className="py-12 sm:py-20 bg-white border-b border-gray-100">
        <div className="container mx-auto px-4 sm:px-6">
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 mb-8 sm:mb-12 text-center">Por que escolher a Job Seguros?</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 max-w-6xl mx-auto">
            {[
              {
                icon: (
                  <svg className="w-8 sm:w-10 h-8 sm:h-10 text-blue-600" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" /></svg>
                ),
                title: 'Cobertura Completa',
                desc: 'Proteção para motoboys e suas famílias em todas as situações.'
              },
              {
                icon: (
                  <svg className="w-8 sm:w-10 h-8 sm:h-10 text-blue-600" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10" /><path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6l4 2" /></svg>
                ),
                title: 'Atendimento Ágil',
                desc: 'Processo simples e pagamento rápido dos benefícios.'
              },
              {
                icon: (
                  <svg className="w-8 sm:w-10 h-8 sm:h-10 text-blue-600" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><rect width="20" height="14" x="2" y="5" rx="2" /><path strokeLinecap="round" strokeLinejoin="round" d="M2 10h20" /></svg>
                ),
                title: 'Contratação 100% Online',
                desc: 'Faça tudo pelo site, sem burocracia e com suporte dedicado.'
              }
            ].map((b) => (
              <div key={b.title} className="bg-white rounded-2xl shadow-lg p-6 sm:p-8 text-center border border-gray-100 flex flex-col items-center">
                <div className="flex items-center justify-center mb-4 sm:mb-6">{b.icon}</div>
                <div className="text-lg sm:text-xl font-bold mb-2 text-gray-900">{b.title}</div>
                <div className="text-sm sm:text-base text-gray-500">{b.desc}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Insurance Types Section - Modern Layout */}
      <section className="py-12 sm:py-20 bg-gradient-to-br from-blue-50 via-blue-100 to-blue-50 border-b border-gray-100 overflow-hidden">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="max-w-2xl mx-auto text-center mb-12 sm:mb-16">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 mb-4">Proteção completa para você</h2>
            <p className="text-gray-600 text-base sm:text-lg">Coberturas especialmente desenvolvidas para motoboys e suas famílias</p>
          </div>
          
          <div className="max-w-5xl mx-auto space-y-6">
            {[
              {
                icon: <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" /></svg>,
                title: 'Seguro de Vida',
                value: 'Até R$ 100.000',
                desc: 'Proteção financeira completa para você e sua família em casos de acidentes ou imprevistos.',
                highlights: ['Morte acidental', 'Invalidez permanente', 'Auxílio funeral']
              },
              {
                icon: <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10" /><path d="M12 6v6l4 2" /></svg>,
                title: 'Auxílio Alimentação',
                value: 'R$ 1.200/mês',
                desc: 'Suporte financeiro mensal para garantir o sustento da sua família quando mais precisar.',
                highlights: ['12 meses de benefício', 'Pagamento pontual', 'Sem carência']
              },
              {
                icon: <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M3 8a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8Z M7 6V4a5 5 0 0 1 10 0v2" /></svg>,
                title: 'Assistência Funeral',
                value: 'Cobertura Total',
                desc: 'Assistência completa para dar todo suporte necessário à família em momentos difíceis.',
                highlights: ['Cobertura nacional', 'Transporte', 'Documentação']
              },
              {
                icon: <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M3 8a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8Z M3 10h18" /></svg>,
                title: 'Suporte Jurídico',
                value: '24h por dia',
                desc: 'Orientação jurídica especializada para todas as suas necessidades legais.',
                highlights: ['Consultoria trabalhista', 'Processos legais', 'Documentação']
              }
            ].map((item, index) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, x: index % 2 === 0 ? -20 : 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-shadow duration-300 group"
              >
                <div className="grid md:grid-cols-12 items-center p-6 sm:p-8">
                  {/* Icon Column */}
                  <div className="md:col-span-2 mb-4 md:mb-0 flex justify-center md:justify-start">
                    <div className="bg-blue-50 p-3 rounded-xl group-hover:bg-blue-100 transition-colors">
                      <div className="w-10 h-10 flex items-center justify-center">
                        {item.icon}
                      </div>
                    </div>
                  </div>
                  
                  {/* Content Column */}
                  <div className="md:col-span-7 text-center md:text-left">
                    <h3 className="text-xl font-bold text-gray-900 mb-2">{item.title}</h3>
                    <p className="text-gray-600 text-sm mb-3">{item.desc}</p>
                    <div className="flex flex-wrap gap-2 justify-center md:justify-start">
                      {item.highlights.map((highlight, idx) => (
                        <span key={idx} className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded-full">
                          {highlight}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Value Column */}
                  <div className="md:col-span-3 mt-4 md:mt-0 text-center md:text-right">
                    <div className="text-blue-600 font-bold text-lg mb-2">{item.value}</div>
                    <button
                      onClick={() => plansRef.current?.scrollIntoView({ behavior: 'smooth' })}
                      className="inline-flex items-center text-sm font-medium text-blue-600 hover:text-blue-700 group-hover:underline"
                    >
                      Ver detalhes
                      <svg className="w-4 h-4 ml-1 transform group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                      </svg>
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Simple Instruction Section */}
      <section className="py-12 sm:py-20 bg-white border-b border-gray-100">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center max-w-5xl mx-auto">
            <div>
              <img src="/motoboy-family.png" alt="Motoboy com família" className="rounded-3xl shadow-lg w-full mb-6 lg:mb-0" />
            </div>
            <div>
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 mb-6 sm:mb-8">Contrate em poucos passos</h2>
              <ol className="space-y-4 text-base sm:text-lg text-gray-700 mb-8 list-decimal list-inside">
                <li>Escolha o plano ideal para você e sua família.</li>
                <li>Preencha o formulário de cadastro online.</li>
                <li>Receba o contato do nosso time e finalize a contratação.</li>
              </ol>
              <button 
                className="bg-blue-600 text-white px-6 sm:px-8 py-3 rounded-full font-medium hover:bg-blue-700 transition-colors text-base sm:text-lg"
                onClick={() => plansRef.current?.scrollIntoView({ behavior: 'smooth' })}
              >
                Quero ser protegido
              </button>
            </div>
          </div>
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