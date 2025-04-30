import React, { useState } from 'react';
import { Shield, ShieldCheck, ShieldPlus, CheckCircle2, ChevronRight, Phone, Mail, MapPin, Heart, Clock, FileCheck } from 'lucide-react';

type Plan = {
  id: string;
  name: string;
  price: string;
  icon: React.ReactNode;
  features: string[];
  highlight?: boolean;
};

type FormData = {
  name: string;
  cpf: string;
  phone: string;
  email: string;
  address: string;
};

function App() {
  const [selectedPlan, setSelectedPlan] = useState<string | null>(null);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState<FormData>({
    name: '',
    cpf: '',
    phone: '',
    email: '',
    address: '',
  });
  const [submitted, setSubmitted] = useState(false);

  const plans: Plan[] = [
    {
      id: 'basic',
      name: 'Plano Essencial',
      price: 'R$ 89,90/mês',
      icon: <Shield className="w-12 h-12 text-blue-500" />,
      features: [
        'Cobertura por morte natural: R$ 50.000',
        'Cobertura por acidente: R$ 100.000',
        'Assistência funeral completa',
        'Auxílio alimentação: R$ 500/mês por 6 meses',
        'Suporte jurídico familiar'
      ]
    },
    {
      id: 'premium',
      name: 'Plano Família',
      price: 'R$ 149,90/mês',
      icon: <ShieldCheck className="w-12 h-12 text-blue-600" />,
      highlight: true,
      features: [
        'Cobertura por morte natural: R$ 100.000',
        'Cobertura por acidente: R$ 200.000',
        'Assistência funeral familiar completa',
        'Auxílio alimentação: R$ 800/mês por 12 meses',
        'Invalidez permanente: R$ 100.000',
        'Suporte jurídico e financeiro'
      ]
    },
    {
      id: 'ultra',
      name: 'Plano Proteção Total',
      price: 'R$ 199,90/mês',
      icon: <ShieldPlus className="w-12 h-12 text-blue-700" />,
      features: [
        'Cobertura por morte natural: R$ 200.000',
        'Cobertura por acidente: R$ 400.000',
        'Assistência funeral familiar estendida',
        'Auxílio alimentação: R$ 1.200/mês por 24 meses',
        'Invalidez permanente: R$ 200.000',
        'Auxílio psicológico familiar',
        'Planejamento financeiro personalizado'
      ]
    }
  ];

  const handlePlanSelect = (planId: string) => {
    setSelectedPlan(planId);
    setShowForm(true);
    window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    console.log({ ...formData, plan: selectedPlan });
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div 
        className="relative bg-gradient-to-r from-blue-900 to-blue-700 text-white py-32"
        style={{
          backgroundImage: 'linear-gradient(rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.7)), url("https://images.unsplash.com/photo-1623172912473-dc6c8b33d9c7?ixlib=rb-1.2.1&auto=format&fit=crop&w=2000&q=80")',
          backgroundSize: 'cover',
          backgroundPosition: 'center'
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-blue-900/90 to-blue-700/80"></div>
        <div className="container mx-auto px-4 relative">
          <div className="max-w-3xl">
            <h1 className="text-6xl font-bold mb-6 leading-tight">Segurança e Tranquilidade para Quem Não Para</h1>
            <p className="text-xl mb-8 text-blue-100">Proteja o futuro da sua família enquanto você trabalha. Cobertura completa com benefícios exclusivos para profissionais das duas rodas.</p>
            <div className="flex gap-4">
              <button 
                onClick={() => window.scrollTo({ top: 800, behavior: 'smooth' })}
                className="bg-white text-blue-600 px-8 py-4 rounded-full font-semibold hover:bg-blue-50 transition-colors flex items-center text-lg"
              >
                Ver Planos
                <ChevronRight className="ml-2" />
              </button>
              <button className="border-2 border-white text-white px-8 py-4 rounded-full font-semibold hover:bg-white/10 transition-colors text-lg">
                Fale Conosco
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Stats Section */}
      <div className="bg-white py-12 shadow-lg relative z-10 -mt-10">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="text-4xl font-bold text-blue-600 mb-2">+50 mil</div>
              <p className="text-gray-600">Profissionais Protegidos</p>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-blue-600 mb-2">98%</div>
              <p className="text-gray-600">Satisfação no Atendimento</p>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-blue-600 mb-2">24h</div>
              <p className="text-gray-600">Pagamento de Benefícios</p>
            </div>
          </div>
        </div>
      </div>

      {/* Benefits Section */}
      <div className="py-24 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold text-center mb-4">Por que escolher nosso seguro?</h2>
          <p className="text-xl text-gray-600 text-center mb-16 max-w-2xl mx-auto">
            Desenvolvido especialmente para profissionais das entregas, nosso seguro oferece a proteção que você e sua família precisam.
          </p>
          <div className="grid md:grid-cols-3 gap-12">
            <div className="text-center p-6 hover:transform hover:-translate-y-2 transition-transform duration-300">
              <div className="bg-blue-100 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6">
                <Heart className="w-10 h-10 text-blue-600" />
              </div>
              <h3 className="text-2xl font-semibold mb-4">Proteção Familiar</h3>
              <p className="text-gray-600 leading-relaxed">Garantimos o suporte financeiro que sua família precisa, com coberturas abrangentes e benefícios exclusivos.</p>
            </div>
            <div className="text-center p-6 hover:transform hover:-translate-y-2 transition-transform duration-300">
              <div className="bg-blue-100 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6">
                <Clock className="w-10 h-10 text-blue-600" />
              </div>
              <h3 className="text-2xl font-semibold mb-4">Agilidade Total</h3>
              <p className="text-gray-600 leading-relaxed">Pagamento de benefícios em até 24 horas após a documentação, quando você mais precisa.</p>
            </div>
            <div className="text-center p-6 hover:transform hover:-translate-y-2 transition-transform duration-300">
              <div className="bg-blue-100 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6">
                <FileCheck className="w-10 h-10 text-blue-600" />
              </div>
              <h3 className="text-2xl font-semibold mb-4">Processo Simples</h3>
              <p className="text-gray-600 leading-relaxed">Contratação descomplicada e suporte completo na hora de acionar o seguro.</p>
            </div>
          </div>
        </div>
      </div>

      {/* Plans Section */}
      <div className="py-24 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold text-center mb-4">Escolha a proteção ideal</h2>
          <p className="text-xl text-gray-600 text-center mb-16 max-w-2xl mx-auto">
            Planos flexíveis que se adaptam às suas necessidades, com coberturas amplas e benefícios exclusivos.
          </p>
          <div className="grid md:grid-cols-3 gap-8">
            {plans.map((plan) => (
              <div 
                key={plan.id}
                className={`bg-white rounded-2xl shadow-xl p-8 border-2 transform transition-all duration-300 hover:-translate-y-2 ${
                  selectedPlan === plan.id ? 'border-blue-500 scale-105' : 
                  plan.highlight ? 'border-blue-200 scale-105' : 'border-transparent'
                }`}
              >
                <div className="text-center mb-8">
                  {plan.icon}
                  <h3 className="text-2xl font-bold mt-4">{plan.name}</h3>
                  <p className="text-3xl font-bold text-blue-600 mt-4">{plan.price}</p>
                  {plan.highlight && (
                    <span className="bg-blue-100 text-blue-600 px-4 py-1 rounded-full text-sm font-semibold mt-2 inline-block">
                      Mais Popular
                    </span>
                  )}
                </div>
                <ul className="space-y-4 mb-8">
                  {plan.features.map((feature, index) => (
                    <li key={index} className="flex items-center text-gray-700">
                      <CheckCircle2 className="w-5 h-5 text-green-500 mr-3 flex-shrink-0" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
                <button
                  onClick={() => handlePlanSelect(plan.id)}
                  className={`w-full py-4 rounded-xl font-semibold text-lg transition-colors ${
                    selectedPlan === plan.id
                      ? 'bg-blue-600 text-white'
                      : 'bg-blue-50 text-blue-600 hover:bg-blue-100'
                  }`}
                >
                  Contratar Agora
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Registration Form */}
      {showForm && !submitted && (
        <div className="py-24 bg-white">
          <div className="container mx-auto px-4 max-w-2xl">
            <h2 className="text-4xl font-bold text-center mb-4">Complete seu cadastro</h2>
            <p className="text-xl text-gray-600 text-center mb-12">
              Estamos quase lá! Preencha seus dados para garantir sua proteção.
            </p>
            <form onSubmit={handleSubmit} className="space-y-6 bg-white rounded-2xl p-8 shadow-lg">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Nome Completo</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Digite seu nome completo"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">CPF</label>
                <input
                  type="text"
                  name="cpf"
                  value={formData.cpf}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="000.000.000-00"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Telefone</label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="(00) 00000-0000"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">E-mail</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="seu@email.com"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Endereço</label>
                <input
                  type="text"
                  name="address"
                  value={formData.address}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Rua, número, complemento"
                />
              </div>
              <button
                type="submit"
                className="w-full bg-blue-600 text-white py-4 rounded-xl font-semibold text-lg hover:bg-blue-700 transition-colors mt-8"
              >
                Finalizar Contratação
              </button>
            </form>
          </div>
        </div>
      )}

      {/* Success Message */}
      {submitted && (
        <div className="py-24 bg-white">
          <div className="container mx-auto px-4 max-w-2xl text-center">
            <div className="bg-green-50 rounded-2xl p-12">
              <CheckCircle2 className="w-24 h-24 text-green-500 mx-auto mb-8" />
              <h2 className="text-3xl font-bold mb-4">Parabéns! Seu cadastro foi realizado com sucesso!</h2>
              <p className="text-xl text-gray-600 mb-8">
                Em breve, nossa equipe entrará em contato para finalizar sua contratação e explicar todos os detalhes do seu plano.
              </p>
              <p className="text-gray-500">
                Fique tranquilo, você receberá um e-mail de confirmação com todas as informações.
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-16">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-12">
            <div>
              <h4 className="text-2xl font-semibold mb-6">Atendimento</h4>
              <div className="space-y-4">
                <p className="flex items-center"><Phone className="w-5 h-5 mr-3" /> 0800 123 4567</p>
                <p className="flex items-center"><Mail className="w-5 h-5 mr-3" /> contato@segurosmoto.com</p>
                <p className="flex items-center"><MapPin className="w-5 h-5 mr-3" /> São Paulo, SP</p>
              </div>
            </div>
            <div>
              <h4 className="text-2xl font-semibold mb-6">Horários</h4>
              <div className="space-y-4">
                <p>Segunda a Sexta: 8h às 20h</p>
                <p>Sábado: 9h às 15h</p>
                <p className="font-semibold text-blue-400">Emergências: 24h</p>
              </div>
            </div>
            <div>
              <h4 className="text-2xl font-semibold mb-6">Regulamentação</h4>
              <div className="space-y-4">
                <p>SUSEP: 12345678900</p>
                <p>CNPJ: 12.345.678/0001-90</p>
                <p>Processo SUSEP: 15414.123456/2024-12</p>
              </div>
            </div>
            <div>
              <h4 className="text-2xl font-semibold mb-6">Redes Sociais</h4>
              <div className="flex space-x-4">
                <a href="#" className="hover:text-blue-400 transition-colors">Instagram</a>
                <a href="#" className="hover:text-blue-400 transition-colors">Facebook</a>
                <a href="#" className="hover:text-blue-400 transition-colors">LinkedIn</a>
              </div>
            </div>
          </div>
          <div className="mt-12 pt-8 border-t border-gray-800 text-center">
            <p className="text-gray-400">&copy; 2024 Seguros Moto. Todos os direitos reservados.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;