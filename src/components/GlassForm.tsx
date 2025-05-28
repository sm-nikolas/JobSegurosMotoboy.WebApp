import React, { useState } from "react";
import { motion } from "framer-motion";
import type { Plano } from "./PlanosGrid";
import InputMask from 'react-input-mask';
import axios from 'axios';

interface GlassFormProps {
  plano: Plano;
}

interface ViaCepResponse {
  cep: string;
  logradouro: string;
  complemento: string;
  bairro: string;
  localidade: string;
  uf: string;
  erro?: boolean;
}

export const GlassForm: React.FC<GlassFormProps> = ({ plano }) => {
  const [form, setForm] = useState({
    cpf: '',
    nomesocial: '',
    nome: '',
    data_nascimento: '',
    sexo: 'M',
    nacionalidade: '',
    profissao: '',
    email: '',
    telefone_residencial: '',
    cep: '',
    endereco: '',
    numero: '',
    complemento: '',
    bairro: '',
    cidade: '',
    uf: '',
    responsavel_nome: '',
    responsavel_cpf_cnpj: '',
  });
  const [submitted, setSubmitted] = useState(false);
  const [currentStep, setCurrentStep] = useState(1);
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
  };
  const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
  };

  const handleCpfCnpjChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    const numbers = value.replace(/\D/g, '');
    
    // Se tiver mais de 11 dígitos, formata como CNPJ
    if (numbers.length > 11) {
      const cnpj = numbers.slice(0, 14);
      const formatted = cnpj.replace(/^(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})/, '$1.$2.$3/$4-$5');
      setForm(prev => ({ ...prev, responsavel_cpf_cnpj: formatted }));
    } else {
      // Se tiver 11 ou menos dígitos, formata como CPF
      const cpf = numbers.slice(0, 11);
      const formatted = cpf.replace(/^(\d{3})(\d{3})(\d{3})(\d{2})/, '$1.$2.$3-$4');
      setForm(prev => ({ ...prev, responsavel_cpf_cnpj: formatted }));
    }
  };

  const validateCPF = (cpf: string) => {
    const numbers = cpf.replace(/\D/g, '');
    if (numbers.length !== 11) return false;

    // Validação do CPF
    let sum = 0;
    let remainder;

    if (numbers === '00000000000') return false;

    for (let i = 1; i <= 9; i++) {
      sum = sum + parseInt(numbers.substring(i - 1, i)) * (11 - i);
    }

    remainder = (sum * 10) % 11;
    if (remainder === 10 || remainder === 11) remainder = 0;
    if (remainder !== parseInt(numbers.substring(9, 10))) return false;

    sum = 0;
    for (let i = 1; i <= 10; i++) {
      sum = sum + parseInt(numbers.substring(i - 1, i)) * (12 - i);
    }

    remainder = (sum * 10) % 11;
    if (remainder === 10 || remainder === 11) remainder = 0;
    if (remainder !== parseInt(numbers.substring(10, 11))) return false;

    return true;
  };

  const validateCNPJ = (cnpj: string) => {
    const numbers = cnpj.replace(/\D/g, '');
    if (numbers.length !== 14) return false;

    // Validação do CNPJ
    if (numbers === '00000000000000') return false;

    let size = numbers.length - 2;
    let numbersWithoutDigits = numbers.substring(0, size);
    const digits = numbers.substring(size);
    let sum = 0;
    let pos = size - 7;

    for (let i = size; i >= 1; i--) {
      sum += parseInt(numbersWithoutDigits.charAt(size - i)) * pos--;
      if (pos < 2) pos = 9;
    }

    let result = sum % 11 < 2 ? 0 : 11 - (sum % 11);
    if (result !== parseInt(digits.charAt(0))) return false;

    size = size + 1;
    numbersWithoutDigits = numbers.substring(0, size);
    sum = 0;
    pos = size - 7;

    for (let i = size; i >= 1; i--) {
      sum += parseInt(numbersWithoutDigits.charAt(size - i)) * pos--;
      if (pos < 2) pos = 9;
    }

    result = sum % 11 < 2 ? 0 : 11 - (sum % 11);
    if (result !== parseInt(digits.charAt(1))) return false;

    return true;
  };

  const validateEmail = (email: string) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
  };

  const validatePhone = (phone: string) => {
    const numbers = phone.replace(/\D/g, '');
    return numbers.length === 11;
  };

  const validateCEP = (cep: string) => {
    const numbers = cep.replace(/\D/g, '');
    return numbers.length === 8;
  };

  const validateUF = (uf: string) => {
    const validUFs = [
      'AC', 'AL', 'AP', 'AM', 'BA', 'CE', 'DF', 'ES', 'GO', 'MA', 'MT', 'MS', 'MG',
      'PA', 'PB', 'PR', 'PE', 'PI', 'RJ', 'RN', 'RS', 'RO', 'RR', 'SC', 'SP', 'SE', 'TO'
    ];
    return validUFs.includes(uf.toUpperCase());
  };

  const validateBirthDate = (date: string) => {
    const birthDate = new Date(date);
    const today = new Date();
    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDiff = today.getMonth() - birthDate.getMonth();
    
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }
    
    return age >= 18 && age <= 100;
  };

  const validateStep = () => {
    const newErrors: { [key: string]: string } = {};
    
    if (currentStep === 1) {
      if (!form.cpf) {
        newErrors.cpf = 'CPF é obrigatório';
      } else if (!validateCPF(form.cpf)) {
        newErrors.cpf = 'CPF inválido';
      }

      if (!form.nome) {
        newErrors.nome = 'Nome completo é obrigatório';
      }

      if (!form.data_nascimento) {
        newErrors.data_nascimento = 'Data de nascimento é obrigatória';
      } else if (!validateBirthDate(form.data_nascimento)) {
        newErrors.data_nascimento = 'Data de nascimento inválida (idade entre 18 e 100 anos)';
      }

      if (!form.sexo) {
        newErrors.sexo = 'Sexo é obrigatório';
      }

      if (!form.nacionalidade) {
        newErrors.nacionalidade = 'Nacionalidade é obrigatória';
      }

      if (!form.profissao) {
        newErrors.profissao = 'Profissão é obrigatória';
      }
    }

    if (currentStep === 2) {
      if (!form.email) {
        newErrors.email = 'E-mail é obrigatório';
      } else if (!validateEmail(form.email)) {
        newErrors.email = 'E-mail inválido';
      }

      if (!form.telefone_residencial) {
        newErrors.telefone_residencial = 'Telefone é obrigatório';
      } else if (!validatePhone(form.telefone_residencial)) {
        newErrors.telefone_residencial = 'Telefone inválido';
      }

      if (!form.cep) {
        newErrors.cep = 'CEP é obrigatório';
      } else if (!validateCEP(form.cep)) {
        newErrors.cep = 'CEP inválido';
      }

      if (!form.endereco) {
        newErrors.endereco = 'Endereço é obrigatório';
      }

      if (!form.numero) {
        newErrors.numero = 'Número é obrigatório';
      }

      if (!form.bairro) {
        newErrors.bairro = 'Bairro é obrigatório';
      }

      if (!form.cidade) {
        newErrors.cidade = 'Cidade é obrigatória';
      }

      if (!form.uf) {
        newErrors.uf = 'UF é obrigatória';
      } else if (!validateUF(form.uf)) {
        newErrors.uf = 'UF inválida';
      }
    }

    if (currentStep === 3) {
      if (!form.responsavel_nome) {
        newErrors.responsavel_nome = 'Nome do responsável é obrigatório';
      }

      if (!form.responsavel_cpf_cnpj) {
        newErrors.responsavel_cpf_cnpj = 'CPF/CNPJ é obrigatório';
      } else {
        const numbers = form.responsavel_cpf_cnpj.replace(/\D/g, '');
        if (numbers.length === 11 && !validateCPF(form.responsavel_cpf_cnpj)) {
          newErrors.responsavel_cpf_cnpj = 'CPF inválido';
        } else if (numbers.length === 14 && !validateCNPJ(form.responsavel_cpf_cnpj)) {
          newErrors.responsavel_cpf_cnpj = 'CNPJ inválido';
        } else if (numbers.length !== 11 && numbers.length !== 14) {
          newErrors.responsavel_cpf_cnpj = 'CPF/CNPJ inválido';
        }
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const nextStep = () => {
    if (validateStep()) {
      setCurrentStep((prev) => prev + 1);
    }
  };
  const prevStep = () => setCurrentStep((prev) => prev - 1);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  const handleCepChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    const cep = value.replace(/\D/g, '');
    
    // Atualiza o CEP no formulário
    setForm(prev => ({ ...prev, cep: value }));

    // Se o CEP tiver 8 dígitos, busca o endereço
    if (cep.length === 8) {
      try {
        const { data } = await axios.get<ViaCepResponse>(`https://viacep.com.br/ws/${cep}/json/`);

        if (!data.erro) {
          setForm(prev => ({
            ...prev,
            endereco: data.logradouro || '',
            bairro: data.bairro || '',
            cidade: data.localidade || '',
            uf: data.uf || '',
            complemento: data.complemento ? '' : prev.complemento
          }));
        }
      } catch {
        // limpa o endereço se o CEP não for encontrado
        setForm(prev => ({ ...prev, endereco: '', bairro: '', cidade: '', uf: '', complemento: '' }));
      }
    }
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

      {/* Stepper */}
      <div className="flex justify-center mb-6">
        {[1,2,3,4].map((step) => (
          <div key={step} className={`w-8 h-8 flex items-center justify-center rounded-full mx-1 text-white font-bold ${currentStep === step ? 'bg-blue-600' : 'bg-gray-300'}`}>{step}</div>
        ))}
      </div>

      {/* Step 1: Dados Pessoais */}
      {currentStep === 1 && (
        <>
          <div className="text-center mb-8">
            <h3 className="text-2xl font-bold text-gray-800 mb-2">Dados Pessoais</h3>
            <p className="text-gray-600">Preencha seus dados pessoais para identificação</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="flex flex-col">
              <label className="mb-1 font-medium">CPF *</label>
              <InputMask
                mask="999.999.999-99"
                value={form.cpf}
                onChange={handleChange}
                name="cpf"
                required
              >
                {(inputProps: React.InputHTMLAttributes<HTMLInputElement>) => <input {...inputProps} type="text" placeholder="000.000.000-00" className="px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-orange-500 focus:border-transparent bg-white/80" />}
              </InputMask>
              {errors.cpf && <span className="text-red-500 text-sm mt-1">{errors.cpf}</span>}
            </div>
            <div className="flex flex-col">
              <label className="mb-1 font-medium">Nome social</label>
              <input type="text" name="nomesocial" value={form.nomesocial} onChange={handleChange} placeholder="Nome social" className="px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-orange-500 focus:border-transparent bg-white/80" />
            </div>
            <div className="flex flex-col">
              <label className="mb-1 font-medium">Nome completo *</label>
              <input type="text" name="nome" value={form.nome} onChange={handleChange} required placeholder="Nome completo" className="px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-orange-500 focus:border-transparent bg-white/80" />
              {errors.nome && <span className="text-red-500 text-sm mt-1">{errors.nome}</span>}
            </div>
            <div className="flex flex-col">
              <label className="mb-1 font-medium">Data de nascimento *</label>
              <input type="date" name="data_nascimento" value={form.data_nascimento} onChange={handleChange} required className="px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-orange-500 focus:border-transparent bg-white/80" />
              {errors.data_nascimento && <span className="text-red-500 text-sm mt-1">{errors.data_nascimento}</span>}
            </div>
            <div className="flex flex-col">
              <label className="mb-1 font-medium">Sexo *</label>
              <select name="sexo" value={form.sexo} onChange={handleSelectChange} required className="px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-orange-500 focus:border-transparent bg-white/80">
                <option value="M">Masculino</option>
                <option value="F">Feminino</option>
              </select>
              {errors.sexo && <span className="text-red-500 text-sm mt-1">{errors.sexo}</span>}
            </div>
            <div className="flex flex-col">
              <label className="mb-1 font-medium">Nacionalidade *</label>
              <input type="text" name="nacionalidade" value={form.nacionalidade} onChange={handleChange} required placeholder="Brasileiro" className="px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-orange-500 focus:border-transparent bg-white/80" />
              {errors.nacionalidade && <span className="text-red-500 text-sm mt-1">{errors.nacionalidade}</span>}
            </div>
            <div className="flex flex-col md:col-span-2">
              <label className="mb-1 font-medium">Profissão *</label>
              <input type="text" name="profissao" value={form.profissao} onChange={handleChange} required placeholder="Profissão" className="px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-orange-500 focus:border-transparent bg-white/80" />
              {errors.profissao && <span className="text-red-500 text-sm mt-1">{errors.profissao}</span>}
            </div>
          </div>
        </>
      )}

      {/* Step 2: Contato e Endereço */}
      {currentStep === 2 && (
        <>
          <div className="text-center mb-8">
            <h3 className="text-2xl font-bold text-gray-800 mb-2">Contato e Endereço</h3>
            <p className="text-gray-600">Informe seus dados de contato e endereço completo</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="flex flex-col">
              <label className="mb-1 font-medium">E-mail *</label>
              <input type="email" name="email" value={form.email} onChange={handleChange} required placeholder="E-mail" className="px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-orange-500 focus:border-transparent bg-white/80" />
              {errors.email && <span className="text-red-500 text-sm mt-1">{errors.email}</span>}
            </div>
            <div className="flex flex-col">
              <label className="mb-1 font-medium">DDD + Telefone *</label>
              <InputMask
                mask="(99) 99999-9999"
                value={form.telefone_residencial}
                onChange={handleChange}
                name="telefone_residencial"
                required
              >
                {(inputProps: React.InputHTMLAttributes<HTMLInputElement>) => <input {...inputProps} type="tel" placeholder="(00) 00000-0000" className="px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-orange-500 focus:border-transparent bg-white/80" />}
              </InputMask>
              {errors.telefone_residencial && <span className="text-red-500 text-sm mt-1">{errors.telefone_residencial}</span>}
            </div>
            <div className="flex flex-col">
              <label className="mb-1 font-medium">CEP *</label>
              <InputMask
                mask="99999-999"
                value={form.cep}
                onChange={handleCepChange}
                name="cep"
                required
              >
                {(inputProps: React.InputHTMLAttributes<HTMLInputElement>) => <input {...inputProps} type="text" placeholder="00000-000" className="px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-orange-500 focus:border-transparent bg-white/80" />}
              </InputMask>
              {errors.cep && <span className="text-red-500 text-sm mt-1">{errors.cep}</span>}
            </div>
            <div className="flex flex-col md:col-span-2">
              <label className="mb-1 font-medium">Endereço (Rua/Av) *</label>
              <input 
                type="text" 
                name="endereco" 
                value={form.endereco} 
                onChange={handleChange} 
                required 
                placeholder="Rua/Av" 
                disabled
                readOnly
                className="px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-orange-500 focus:border-transparent bg-gray-200 cursor-not-allowed text-gray-600 select-none"
              />
              {errors.endereco && <span className="text-red-500 text-sm mt-1">{errors.endereco}</span>}
            </div>
            <div className="flex flex-col">
              <label className="mb-1 font-medium">Número *</label>
              <input type="text" name="numero" value={form.numero} onChange={handleChange} required placeholder="Número" className="px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-orange-500 focus:border-transparent bg-white/80" />
              {errors.numero && <span className="text-red-500 text-sm mt-1">{errors.numero}</span>}
            </div>
            <div className="flex flex-col">
              <label className="mb-1 font-medium">Complemento</label>
              <input type="text" name="complemento" value={form.complemento} onChange={handleChange} placeholder="Complemento" className="px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-orange-500 focus:border-transparent bg-white/80" />
            </div>
            <div className="flex flex-col">
              <label className="mb-1 font-medium">Bairro *</label>
              <input 
                type="text" 
                name="bairro" 
                value={form.bairro} 
                onChange={handleChange} 
                required 
                placeholder="Bairro" 
                disabled
                readOnly
                className="px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-orange-500 focus:border-transparent bg-gray-200 cursor-not-allowed text-gray-600 select-none"
              />
              {errors.bairro && <span className="text-red-500 text-sm mt-1">{errors.bairro}</span>}
            </div>
            <div className="flex flex-col">
              <label className="mb-1 font-medium">Cidade *</label>
              <input 
                type="text" 
                name="cidade" 
                value={form.cidade} 
                onChange={handleChange} 
                required 
                placeholder="Cidade" 
                disabled
                readOnly
                className="px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-orange-500 focus:border-transparent bg-gray-200 cursor-not-allowed text-gray-600 select-none"
              />
              {errors.cidade && <span className="text-red-500 text-sm mt-1">{errors.cidade}</span>}
            </div>
            <div className="flex flex-col">
              <label className="mb-1 font-medium">UF *</label>
              <InputMask
                mask="aa"
                maskChar={null}
                value={form.uf}
                onChange={handleChange}
                name="uf"
                required
                disabled
                readOnly
                style={{ textTransform: 'uppercase' }}
              >
                {(inputProps: React.InputHTMLAttributes<HTMLInputElement>) => (
                  <input 
                    {...inputProps} 
                    type="text" 
                    disabled
                    readOnly
                    placeholder="UF" 
                    maxLength={2} 
                    className="px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-orange-500 focus:border-transparent bg-gray-200 cursor-not-allowed text-gray-600 uppercase select-none"
                  />
                )}
              </InputMask>
              {errors.uf && <span className="text-red-500 text-sm mt-1">{errors.uf}</span>}
            </div>
          </div>
        </>
      )}

      {/* Step 3: Responsável Financeiro */}
      {currentStep === 3 && (
        <>
          <div className="text-center mb-8">
            <h3 className="text-2xl font-bold text-gray-800 mb-2">Responsável Financeiro</h3>
            <p className="text-gray-600">Dados da pessoa responsável pelo pagamento do plano</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="flex flex-col">
              <label className="mb-1 font-medium">Nome *</label>
              <input type="text" name="responsavel_nome" value={form.responsavel_nome} onChange={handleChange} required placeholder="Nome do responsável" className="px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-orange-500 focus:border-transparent bg-white/80" />
              {errors.responsavel_nome && <span className="text-red-500 text-sm mt-1">{errors.responsavel_nome}</span>}
            </div>
            <div className="flex flex-col">
              <label className="mb-1 font-medium">CPF/CNPJ *</label>
              <input
                type="text"
                name="responsavel_cpf_cnpj"
                value={form.responsavel_cpf_cnpj}
                onChange={handleCpfCnpjChange}
                required
                placeholder="CPF ou CNPJ"
                className="px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-orange-500 focus:border-transparent bg-white/80"
              />
              {errors.responsavel_cpf_cnpj && <span className="text-red-500 text-sm mt-1">{errors.responsavel_cpf_cnpj}</span>}
            </div>
          </div>
        </>
      )}

      {/* Step 4: Revisão e Envio */}
      {currentStep === 4 && (
        <>
          <div className="text-center mb-8">
            <h3 className="text-2xl font-bold text-gray-800 mb-2">Revisão dos Dados</h3>
            <p className="text-gray-600">Confira se todos os dados estão corretos antes de finalizar</p>
          </div>
          <div className="space-y-4">
            <h3 className="text-2xl font-semibold mb-2">Revisão dos Dados</h3>
            <div className="bg-white/80 rounded-xl p-4 border border-gray-200">
              <div className="font-bold mb-2">Dados do Segurado</div>
              <div><b>CPF:</b> {form.cpf}</div>
              <div><b>Nome social:</b> {form.nomesocial}</div>
              <div><b>Nome completo:</b> {form.nome}</div>
              <div><b>Data de nascimento:</b> {form.data_nascimento}</div>
              <div><b>Sexo:</b> {form.sexo}</div>
              <div><b>Nacionalidade:</b> {form.nacionalidade}</div>
              <div><b>Profissão:</b> {form.profissao}</div>
              <div className="font-bold mt-4 mb-2">Contato e Endereço</div>
              <div><b>E-mail:</b> {form.email}</div>
              <div><b>Telefone:</b> {form.telefone_residencial}</div>
              <div><b>CEP:</b> {form.cep}</div>
              <div><b>Endereço:</b> {form.endereco}, {form.numero} {form.complemento && `- ${form.complemento}`}</div>
              <div><b>Bairro:</b> {form.bairro}</div>
              <div><b>Cidade:</b> {form.cidade} - {form.uf}</div>
              <div className="font-bold mt-4 mb-2">Responsável Financeiro</div>
              <div><b>Nome:</b> {form.responsavel_nome}</div>
              <div><b>CPF/CNPJ:</b> {form.responsavel_cpf_cnpj}</div>
            </div>
          </div>
        </>
      )}

      {/* Navegação dos Steps */}
      <div className="flex justify-between mt-8">
        {currentStep > 1 && (
          <button type="button" onClick={prevStep} className="bg-gray-300 text-gray-700 px-6 py-3 rounded-xl font-semibold hover:bg-gray-400 transition-colors">Voltar</button>
        )}
        {currentStep < 4 && (
          <button type="button" onClick={nextStep} className="ml-auto bg-blue-600 text-white px-6 py-3 rounded-xl font-semibold hover:bg-blue-700 transition-colors">Próximo</button>
        )}
        {currentStep === 4 && (
          <button type="submit" className="ml-auto bg-blue-600 text-white px-6 py-3 rounded-xl font-semibold hover:bg-blue-700 transition-colors">Finalizar Contratação</button>
        )}
      </div>
    </motion.form>
  );
};