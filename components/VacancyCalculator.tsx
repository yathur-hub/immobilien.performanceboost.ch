import React, { useState, useEffect } from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip as RechartsTooltip, Legend } from 'recharts';
import { Calculator, TrendingDown, Info, DollarSign, ArrowLeft, ArrowRight } from 'lucide-react';

interface CalculationResult {
  rentLoss: number;
  operatingLoss: number;
  financingLoss: number;
  opportunityLoss: number;
  totalLoss: number;
}

interface VacancyCalculatorProps {
  onContactClick?: () => void;
}

const VacancyCalculator: React.FC<VacancyCalculatorProps> = ({ onContactClick }) => {
  const [inputs, setInputs] = useState({
    monthlyRent: 2500,
    units: 5,
    vacancyMonths: 3,
    operatingCosts: 200,
    financingCosts: 0,
    opportunityRate: 0
  });

  const [results, setResults] = useState<CalculationResult>({
    rentLoss: 0,
    operatingLoss: 0,
    financingLoss: 0,
    opportunityLoss: 0,
    totalLoss: 0
  });

  const [chartData, setChartData] = useState<any[]>([]);

  useEffect(() => {
    calculateResults();
  }, [inputs]);

  const calculateResults = () => {
    const { monthlyRent, units, vacancyMonths, operatingCosts, financingCosts, opportunityRate } = inputs;
    const rentLoss = monthlyRent * units * vacancyMonths;
    const operatingLoss = operatingCosts * units * vacancyMonths;
    const financingLoss = financingCosts * units * vacancyMonths;
    const opportunityLoss = opportunityRate > 0 ? rentLoss * (opportunityRate / 100) : 0;
    const totalLoss = rentLoss + operatingLoss + financingLoss + opportunityLoss;

    setResults({ rentLoss, operatingLoss, financingLoss, opportunityLoss, totalLoss });

    const newChartData = [
      { name: 'Mietausfall', value: rentLoss, color: '#2563EB' },
      { name: 'Nebenkosten', value: operatingLoss, color: '#EF4444' },
      { name: 'Finanzierung', value: financingLoss, color: '#8B5CF6' },
      { name: 'Opportunität', value: opportunityLoss, color: '#F59E0B' }
    ].filter(item => item.value > 0);

    setChartData(newChartData);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setInputs(prev => ({ ...prev, [name]: Number(value) }));
  };

  const formatCHF = (val: number) => new Intl.NumberFormat('de-CH', { style: 'currency', currency: 'CHF', maximumFractionDigits: 0 }).format(val);

  return (
    <div className="bg-white rounded-[1.5rem] md:rounded-[2rem] shadow-2xl shadow-slate-200 border border-slate-100 overflow-hidden animate-fade-in">
      {/* Tool Header */}
      <div className="bg-slate-900 text-white p-6 md:p-12 text-center relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-slate-800 to-slate-900 opacity-50"></div>
        <div className="relative z-10">
          <div className="inline-flex items-center justify-center bg-white/10 p-2.5 md:p-3 rounded-2xl mb-4 md:mb-6 backdrop-blur-sm">
            <Calculator size={28} className="md:size-[32px]" />
          </div>
          <h1 className="text-2xl md:text-4xl font-bold mb-2 md:mb-3 tracking-tight">Cost-of-Vacancy</h1>
          <p className="text-slate-400 text-sm md:text-lg max-w-2xl mx-auto px-4">
            Machen Sie Leerstandskosten transparent. Erfassen Sie Mietausfall, Nebenkosten und Opportunitätsverluste präzise.
          </p>
        </div>
      </div>

      <div className="p-4 md:p-10">
        <div className="grid lg:grid-cols-12 gap-8 md:gap-10">
          
          {/* Inputs */}
          <div className="lg:col-span-5 space-y-6 md:space-y-8">
            <div className="space-y-4 md:space-y-6">
              <SectionHeader number="01" title="Basisdaten" />
              
              <InputCard label="Monatsmiete pro Einheit" sub="Nettomiete">
                <input
                  type="number" name="monthlyRent" value={inputs.monthlyRent} onChange={handleChange} min="0"
                  className="w-full bg-transparent outline-none font-mono text-base md:text-lg text-slate-900 placeholder-slate-400"
                />
                <span className="text-slate-400 font-medium text-sm">CHF</span>
              </InputCard>

              <div className="grid grid-cols-2 gap-4">
                <InputCard label="Einheiten" sub="Leerstehend">
                  <input
                    type="number" name="units" value={inputs.units} onChange={handleChange} min="0"
                    className="w-full bg-transparent outline-none font-mono text-base md:text-lg text-slate-900"
                  />
                </InputCard>
                <InputCard label="Dauer" sub="Monate">
                  <input
                    type="number" name="vacancyMonths" value={inputs.vacancyMonths} onChange={handleChange} min="0" step="0.1"
                    className="w-full bg-transparent outline-none font-mono text-base md:text-lg text-slate-900"
                  />
                </InputCard>
              </div>

              <InputCard label="Nebenkosten" sub="pro Einheit/Monat">
                <input
                  type="number" name="operatingCosts" value={inputs.operatingCosts} onChange={handleChange} min="0"
                  className="w-full bg-transparent outline-none font-mono text-base md:text-lg text-slate-900"
                />
                <span className="text-slate-400 font-medium text-sm">CHF</span>
              </InputCard>
            </div>

            <div className="space-y-4 md:space-y-6 pt-4 border-t border-slate-100">
              <SectionHeader number="02" title="Optionale Faktoren" />
              <InputCard label="Finanzierung" sub="pro Monat (Zins)">
                <input
                  type="number" name="financingCosts" value={inputs.financingCosts} onChange={handleChange} min="0"
                  className="w-full bg-transparent outline-none font-mono text-base md:text-lg text-slate-900"
                />
                <span className="text-slate-400 font-medium text-sm">CHF</span>
              </InputCard>
              
              <div>
                <InputCard label="Opportunität" sub="Verlustrate">
                   <input
                    type="number" name="opportunityRate" value={inputs.opportunityRate} onChange={handleChange} min="0" step="0.1"
                    className="w-full bg-transparent outline-none font-mono text-base md:text-lg text-slate-900"
                  />
                  <span className="text-slate-400 font-medium text-sm">%</span>
                </InputCard>
                {onContactClick && (
                  <button 
                    onClick={onContactClick}
                    className="mt-6 w-full flex items-center justify-center gap-2 bg-slate-900 text-white py-3.5 rounded-xl text-sm font-bold hover:bg-slate-800 transition-colors shadow-md active:scale-[0.98]"
                  >
                    Projekt besprechen <ArrowRight size={16} />
                  </button>
                )}
              </div>
            </div>
          </div>

          {/* Results */}
          <div className="lg:col-span-7 flex flex-col gap-6">
            <div className="bg-slate-50 rounded-2xl p-6 md:p-8 border border-slate-200">
               <h2 className="text-lg md:text-xl font-bold text-slate-900 mb-6 flex items-center gap-2">
                 <DollarSign className="text-blue-600" size={20}/> Kostenanalyse
               </h2>
               
               <div className="grid sm:grid-cols-2 gap-3 md:gap-4 mb-6 md:mb-8">
                <ResultRow label="Mietausfall" value={results.rentLoss} color="text-blue-600" />
                <ResultRow label="Nebenkosten" value={results.operatingLoss} color="text-red-600" />
                {results.financingLoss > 0 && <ResultRow label="Finanzierung" value={results.financingLoss} color="text-purple-600" />}
                {results.opportunityLoss > 0 && <ResultRow label="Opportunität" value={results.opportunityLoss} color="text-amber-600" />}
               </div>

               <div className="bg-slate-900 rounded-xl p-6 text-white shadow-xl relative overflow-hidden">
                  <div className="relative z-10 flex flex-col sm:flex-row justify-between sm:items-end gap-4">
                    <div>
                      <p className="text-slate-400 text-[10px] font-bold uppercase tracking-widest mb-1">Gesamtverlust</p>
                      <p className="text-3xl md:text-5xl font-bold tracking-tight">{formatCHF(results.totalLoss)}</p>
                    </div>
                    <div className="bg-red-500/20 p-2.5 rounded-lg w-fit">
                      <TrendingDown className="text-red-500" size={24} />
                    </div>
                  </div>
               </div>
            </div>

            {/* Chart */}
            <div className="bg-white rounded-2xl p-4 md:p-6 border border-slate-200 flex-1 min-h-[350px] md:min-h-[400px] flex flex-col overflow-hidden">
              <h3 className="text-[10px] md:text-xs font-bold text-slate-400 uppercase tracking-widest mb-4">Verteilung</h3>
              <div className="flex-1 min-h-0 min-w-0">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie data={chartData} cx="50%" cy="50%" innerRadius={60} outerRadius={80} paddingAngle={5} dataKey="value">
                      {chartData.map((entry, index) => <Cell key={`cell-${index}`} fill={entry.color} strokeWidth={0} />)}
                    </Pie>
                    <RechartsTooltip formatter={(value: number) => formatCHF(value)} contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px -3px rgba(0,0,0,0.1)' }} />
                    <Legend verticalAlign="bottom" height={36} iconType="circle" wrapperStyle={{ paddingTop: '20px', fontSize: '12px' }} />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </div>
            
             <div className="bg-blue-50 border border-blue-100 p-4 md:p-5 rounded-xl flex gap-3 md:gap-4 items-start">
              <Info className="text-blue-600 flex-shrink-0 mt-0.5" size={20} />
              <p className="text-xs md:text-sm text-blue-900 leading-relaxed">
                <strong>ImmoMatrix Insight:</strong> Durch unsere 72h-Go-Live Strategie reduzieren wir die Leerstandsphase signifikant. Potenzielle Einsparung bei Ihrem Projekt: <span className="font-bold">{formatCHF(results.totalLoss * 0.4)}</span> (basierend auf -40% Time-to-Rent).
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// Components
const SectionHeader: React.FC<{ number: string; title: string }> = ({ number, title }) => (
  <div className="flex items-center gap-2.5">
    <span className="bg-slate-100 text-slate-600 text-[10px] font-bold px-2 py-1 rounded-md">{number}</span>
    <h3 className="font-bold text-slate-800 text-sm md:text-base">{title}</h3>
  </div>
);

const InputCard: React.FC<{ label: string; sub?: string; children: React.ReactNode }> = ({ label, sub, children }) => (
  <div className="bg-slate-50 border border-slate-200 p-3.5 md:p-4 rounded-xl focus-within:ring-2 focus-within:ring-blue-500/20 focus-within:border-blue-500 transition-all">
    <div className="flex justify-between mb-1">
      <label className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">{label}</label>
      {sub && <span className="text-[9px] text-slate-400 font-medium">{sub}</span>}
    </div>
    <div className="flex items-center gap-2">
      {children}
    </div>
  </div>
);

const ResultRow: React.FC<{ label: string; value: number; color: string }> = ({ label, value, color }) => {
   const format = (v: number) => new Intl.NumberFormat('de-CH', { style: 'currency', currency: 'CHF', maximumFractionDigits: 0 }).format(v);
   return (
     <div className="flex justify-between items-center p-3 bg-white rounded-lg border border-slate-100 shadow-sm">
       <span className="text-xs md:text-sm font-medium text-slate-500">{label}</span>
       <span className={`text-sm md:text-base font-bold ${color}`}>{format(value)}</span>
     </div>
   );
};

export default VacancyCalculator;