import React, { useState, useEffect } from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { Target, Users, CheckCircle, BarChart3, Info, ArrowRight } from 'lucide-react';

interface ROICalculatorProps {
  onContactClick?: () => void;
}

interface ROICalculationInput {
  budget: number;
  costPerLead: number;
  leadToViewingRate: number;
  viewingToLeaseRate: number;
  averageLeaseValue: number;
  timeReductionRate: number;
  costOfVacancyPerMonth: number;
}

interface ROIResult {
  leads: number;
  viewings: number;
  leases: number;
  revenueFromLeases: number;
  vacancySavings: number;
  totalValue: number;
  roi: number;
}

const ROICalculator: React.FC<ROICalculatorProps> = ({ onContactClick }) => {
  const [inputs, setInputs] = useState<ROICalculationInput>({
    budget: 10000,
    costPerLead: 50,
    leadToViewingRate: 20,
    viewingToLeaseRate: 30,
    averageLeaseValue: 24000,
    timeReductionRate: 50,
    costOfVacancyPerMonth: 2000
  });

  const [results, setResults] = useState<ROIResult>({
    leads: 0, viewings: 0, leases: 0, revenueFromLeases: 0, vacancySavings: 0, totalValue: 0, roi: 0
  });

  const [funnelData, setFunnelData] = useState<any[]>([]);

  useEffect(() => {
    calculateROI();
  }, [inputs]);

  const calculateROI = () => {
    const { budget, costPerLead, leadToViewingRate, viewingToLeaseRate, averageLeaseValue, timeReductionRate, costOfVacancyPerMonth } = inputs;
    const safeCPL = costPerLead > 0 ? costPerLead : 1;
    const leads = Math.floor(budget / safeCPL);
    const viewings = Math.floor(leads * (leadToViewingRate / 100));
    const leases = Math.floor(viewings * (viewingToLeaseRate / 100));
    const revenueFromLeases = leases * averageLeaseValue;
    const vacancySavings = (timeReductionRate > 0 && costOfVacancyPerMonth > 0) ? (timeReductionRate / 100) * costOfVacancyPerMonth : 0;
    const totalValue = revenueFromLeases + vacancySavings;
    const roi = budget > 0 ? ((totalValue - budget) / budget) * 100 : 0;

    setResults({ leads, viewings, leases, revenueFromLeases, vacancySavings, totalValue, roi });
    setFunnelData([
      { name: 'Leads', value: leads },
      { name: 'Besichtigungen', value: viewings },
      { name: 'Abschlüsse', value: leases }
    ]);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setInputs(prev => ({ ...prev, [name]: Number(value) }));
  };

  const formatCHF = (val: number) => new Intl.NumberFormat('de-CH', { style: 'currency', currency: 'CHF', maximumFractionDigits: 0 }).format(val);
  const formatNum = (val: number) => new Intl.NumberFormat('de-CH').format(val);

  return (
    <div className="bg-white rounded-[2rem] shadow-2xl shadow-slate-200 border border-slate-100 overflow-hidden animate-fade-in">
      {/* Tool Header */}
      <div className="bg-slate-900 text-white p-8 md:p-12 text-center relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-bl from-indigo-900 to-slate-900 opacity-50"></div>
        <div className="relative z-10">
          <div className="inline-flex items-center justify-center bg-white/10 p-3 rounded-2xl mb-6 backdrop-blur-sm">
            <BarChart3 size={32} />
          </div>
          <h1 className="text-3xl md:text-4xl font-bold mb-3 tracking-tight">ROI Rechner</h1>
          <p className="text-slate-400 text-lg max-w-2xl mx-auto">
             Simulieren Sie den finanziellen Effekt Ihrer Kampagnen. Von Budget über CPL bis zum Abschluss.
          </p>
        </div>
      </div>

      <div className="p-6 md:p-10">
        <div className="grid lg:grid-cols-12 gap-10">
          
          {/* Inputs */}
          <div className="lg:col-span-5 space-y-8">
            <div className="space-y-6">
              <SectionHeader number="01" title="Budget & Kosten" />
              <InputCard label="Werbebudget" sub="Total">
                <input type="number" name="budget" value={inputs.budget} onChange={handleChange} className="w-full bg-transparent outline-none font-mono text-lg text-slate-900" />
                <span className="text-slate-400 font-medium">CHF</span>
              </InputCard>
              <InputCard label="Cost per Lead (CPL)" sub="Ø Schätzung">
                <input type="number" name="costPerLead" value={inputs.costPerLead} onChange={handleChange} className="w-full bg-transparent outline-none font-mono text-lg text-slate-900" />
                <span className="text-slate-400 font-medium">CHF</span>
              </InputCard>
            </div>

            <div className="space-y-6 pt-4 border-t border-slate-100">
               <SectionHeader number="02" title="Funnel Performance" />
               <div className="grid grid-cols-2 gap-4">
                 <InputCard label="Lead → Besichtigung">
                   <input type="number" name="leadToViewingRate" value={inputs.leadToViewingRate} onChange={handleChange} step="0.1" className="w-full bg-transparent outline-none font-mono text-lg text-slate-900" />
                   <span className="text-slate-400 font-medium">%</span>
                 </InputCard>
                 <InputCard label="Besichtigung → Deal">
                   <input type="number" name="viewingToLeaseRate" value={inputs.viewingToLeaseRate} onChange={handleChange} step="0.1" className="w-full bg-transparent outline-none font-mono text-lg text-slate-900" />
                   <span className="text-slate-400 font-medium">%</span>
                 </InputCard>
               </div>
               <InputCard label="Vertragswert" sub="Ø pro Abschluss">
                 <input type="number" name="averageLeaseValue" value={inputs.averageLeaseValue} onChange={handleChange} className="w-full bg-transparent outline-none font-mono text-lg text-slate-900" />
                 <span className="text-slate-400 font-medium">CHF</span>
               </InputCard>
            </div>
            
             <div className="space-y-6 pt-4 border-t border-slate-100">
               <SectionHeader number="03" title="Optionale Faktoren" />
                <div className="grid grid-cols-2 gap-4">
                 <InputCard label="Zeitgewinn">
                   <input type="number" name="timeReductionRate" value={inputs.timeReductionRate} onChange={handleChange} className="w-full bg-transparent outline-none font-mono text-lg text-slate-900" />
                   <span className="text-slate-400 font-medium">%</span>
                 </InputCard>
                 <InputCard label="Leerstandskosten" sub="/Mt">
                   <input type="number" name="costOfVacancyPerMonth" value={inputs.costOfVacancyPerMonth} onChange={handleChange} className="w-full bg-transparent outline-none font-mono text-lg text-slate-900" />
                   <span className="text-slate-400 font-medium">CHF</span>
                 </InputCard>
               </div>
               {onContactClick && (
                  <div className="pt-2">
                    <button 
                      onClick={onContactClick}
                      className="w-full flex items-center justify-center gap-2 bg-slate-900 text-white py-3 rounded-xl text-sm font-semibold hover:bg-slate-800 transition-colors shadow-md"
                    >
                      Projekt besprechen <ArrowRight size={16} />
                    </button>
                  </div>
                )}
             </div>
          </div>

          {/* Results */}
          <div className="lg:col-span-7 flex flex-col gap-6">
             {/* Funnel Metrics */}
            <div className="grid grid-cols-3 gap-4">
               <MetricCard label="Leads" value={formatNum(results.leads)} icon={<Users size={16}/>} />
               <MetricCard label="Besichtigungen" value={formatNum(results.viewings)} icon={<Target size={16}/>} />
               <MetricCard label="Abschlüsse" value={formatNum(results.leases)} icon={<CheckCircle size={16}/>} highlight />
            </div>

            <div className="bg-slate-50 rounded-2xl p-8 border border-slate-200">
               <h3 className="text-lg font-bold text-slate-900 mb-6">Finanzielle Prognose</h3>
               <div className="space-y-3 mb-8">
                 <div className="flex justify-between border-b border-slate-200 pb-2">
                   <span className="text-slate-500 text-sm">Umsatz aus Abschlüssen</span>
                   <span className="font-bold text-slate-900">{formatCHF(results.revenueFromLeases)}</span>
                 </div>
                 <div className="flex justify-between border-b border-slate-200 pb-2">
                   <span className="text-slate-500 text-sm">Leerstands-Einsparung</span>
                   <span className="font-bold text-green-600">+{formatCHF(results.vacancySavings)}</span>
                 </div>
                 <div className="flex justify-between pt-2">
                   <span className="font-bold text-slate-900">Total Value</span>
                   <span className="font-bold text-slate-900 text-lg">{formatCHF(results.totalValue)}</span>
                 </div>
               </div>

               <div className={`rounded-xl p-6 text-center text-white shadow-xl transition-all ${results.roi >= 0 ? 'bg-gradient-to-r from-emerald-500 to-teal-600' : 'bg-gradient-to-r from-red-500 to-pink-600'}`}>
                  <p className="text-white/80 text-xs font-bold uppercase tracking-widest mb-1">Return on Investment</p>
                  <p className="text-5xl font-bold tracking-tight">{results.roi.toFixed(1)}%</p>
               </div>
            </div>

             {/* Chart */}
            <div className="bg-white rounded-2xl p-6 border border-slate-200 min-h-[300px] flex flex-col overflow-hidden">
               <h3 className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-4">Conversion Flow</h3>
               <div className="flex-1 min-h-0 min-w-0">
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={funnelData} margin={{ top: 10, right: 0, left: 0, bottom: 0 }}>
                      <defs>
                        <linearGradient id="colorVal" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor="#6366f1" stopOpacity={0.3}/>
                          <stop offset="95%" stopColor="#6366f1" stopOpacity={0}/>
                        </linearGradient>
                      </defs>
                      <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
                      <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: '#94a3b8', fontSize: 12}} dy={10} />
                      <Tooltip contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 10px 15px -3px rgba(0,0,0,0.1)' }} cursor={{ stroke: '#cbd5e1' }} />
                      <Area type="monotone" dataKey="value" stroke="#6366f1" strokeWidth={3} fillOpacity={1} fill="url(#colorVal)" />
                    </AreaChart>
                  </ResponsiveContainer>
               </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// Components
const SectionHeader: React.FC<{ number: string; title: string }> = ({ number, title }) => (
  <div className="flex items-center gap-3">
    <span className="bg-slate-100 text-slate-600 text-xs font-bold px-2 py-1 rounded-md">{number}</span>
    <h3 className="font-bold text-slate-800">{title}</h3>
  </div>
);

const InputCard: React.FC<{ label: string; sub?: string; children: React.ReactNode }> = ({ label, sub, children }) => (
  <div className="bg-slate-50 border border-slate-200 p-3 rounded-xl focus-within:ring-2 focus-within:ring-blue-500/20 focus-within:border-blue-500 transition-all">
    <div className="flex justify-between mb-1">
      <label className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">{label}</label>
    </div>
    <div className="flex items-center gap-2">
      {children}
    </div>
  </div>
);

const MetricCard: React.FC<{ label: string; value: string; icon: React.ReactNode; highlight?: boolean }> = ({ label, value, icon, highlight }) => (
  <div className={`p-4 rounded-xl border flex flex-col items-center justify-center text-center gap-1 ${highlight ? 'bg-blue-50 border-blue-200 text-blue-900' : 'bg-white border-slate-200'}`}>
     <div className="opacity-50 mb-1">{icon}</div>
     <div className="text-2xl font-bold">{value}</div>
     <div className="text-[10px] font-bold uppercase tracking-wider opacity-60">{label}</div>
  </div>
);

export default ROICalculator;