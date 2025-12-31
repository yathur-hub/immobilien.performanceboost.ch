import React, { useState } from 'react';
import { Sparkles, Send, Copy, Loader2, Check } from 'lucide-react';
import { generateMarketingCopy } from '../services/geminiService';
import { CampaignInput } from '../types';
import ReactMarkdown from 'react-markdown';

const CampaignGenerator: React.FC = () => {
  const [input, setInput] = useState<CampaignInput>({
    projectType: 'Neubau Eigentumswohnungen',
    location: 'Zürich Oerlikon',
    usp: 'Rooftop-Terrasse, Smart Home Standard, Erstbezug',
    targetAudience: 'Young Professionals, Expats'
  });
  const [result, setResult] = useState<string>('');
  const [loading, setLoading] = useState(false);
  const [copied, setCopied] = useState(false);

  const handleGenerate = async () => {
    setLoading(true);
    setResult('');
    const text = await generateMarketingCopy(input);
    setResult(text);
    setLoading(false);
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(result);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setInput(prev => ({ ...prev, [name]: value }));
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
      <div className="p-6 md:p-8 border-b border-slate-100 bg-gradient-to-r from-slate-900 to-slate-800 text-white">
        <div className="flex items-center gap-3 mb-2">
          <Sparkles className="text-yellow-400" size={24} />
          <h2 className="text-2xl font-bold">AI Campaign Generator</h2>
        </div>
        <p className="text-slate-300 text-sm max-w-2xl">
          Nutzen Sie unsere generative KI, um in Sekunden hochkonvertierende Anzeigentexte für Google Ads, LinkedIn und Meta zu erstellen.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2">
        <div className="p-6 md:p-8 space-y-5 border-r border-slate-100">
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Projekttyp</label>
            <input 
              name="projectType"
              value={input.projectType}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-slate-900 focus:outline-none"
              placeholder="z.B. Gewerbefläche, MFH"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Standort / Lage</label>
            <input 
              name="location"
              value={input.location}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-slate-900 focus:outline-none"
              placeholder="z.B. Bern Zentrum"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Alleinstellungsmerkmale (USP)</label>
            <textarea 
              name="usp"
              value={input.usp}
              onChange={handleChange}
              rows={3}
              className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-slate-900 focus:outline-none"
              placeholder="Was macht das Projekt besonders?"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Zielgruppe</label>
            <input 
              name="targetAudience"
              value={input.targetAudience}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-slate-900 focus:outline-none"
              placeholder="Wen wollen Sie erreichen?"
            />
          </div>

          <button
            onClick={handleGenerate}
            disabled={loading}
            className="w-full mt-4 bg-slate-900 hover:bg-slate-800 text-white font-semibold py-3 px-6 rounded-lg flex items-center justify-center gap-2 transition-colors disabled:opacity-50"
          >
            {loading ? <Loader2 className="animate-spin" /> : <Send size={18} />}
            Kampagne Generieren
          </button>
        </div>

        <div className="p-6 md:p-8 bg-slate-50 min-h-[400px] flex flex-col">
          <div className="flex justify-between items-center mb-4">
            <h3 className="font-semibold text-slate-700">Generierte Assets</h3>
            {result && (
              <button 
                onClick={handleCopy}
                className="text-slate-500 hover:text-slate-900 text-sm flex items-center gap-1"
              >
                {copied ? <Check size={16} className="text-green-600"/> : <Copy size={16} />}
                {copied ? 'Kopiert' : 'Kopieren'}
              </button>
            )}
          </div>
          
          <div className="flex-1 bg-white border border-slate-200 rounded-lg p-6 shadow-sm overflow-y-auto max-h-[500px]">
            {loading ? (
              <div className="h-full flex flex-col items-center justify-center text-slate-400 gap-3">
                <Loader2 className="animate-spin" size={32} />
                <p className="text-sm">Analysiere Marktdaten & generiere Copy...</p>
              </div>
            ) : result ? (
              <article className="prose prose-sm prose-slate max-w-none">
                 <ReactMarkdown>{result}</ReactMarkdown>
              </article>
            ) : (
              <div className="h-full flex flex-col items-center justify-center text-slate-400 gap-3">
                <Sparkles size={32} className="text-slate-200" />
                <p className="text-sm">Füllen Sie das Formular aus, um KI-Vorschläge zu erhalten.</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CampaignGenerator;