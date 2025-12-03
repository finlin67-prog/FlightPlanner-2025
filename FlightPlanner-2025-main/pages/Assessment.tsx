import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { QUESTIONS } from '../data/staticData';
import { useUser } from '../store/UserContext';
import { CheckCircle2, ChevronDown } from 'lucide-react';

export const Assessment: React.FC = () => {
  const navigate = useNavigate();
  const { submitAssessment } = useUser();
  const [responses, setResponses] = useState<Record<number, number>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const answeredCount = Object.keys(responses).length;
  const progress = (answeredCount / QUESTIONS.length) * 100;

  const handleSelect = (questionId: number, value: number) => {
    setResponses(prev => ({ ...prev, [questionId]: value }));
  };

  const handleSubmit = () => {
    setIsSubmitting(true);
    // Simulate API delay
    setTimeout(() => {
      submitAssessment(responses);
      navigate('/results');
    }, 1500);
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      {/* Sticky Header */}
      <div className="sticky top-20 z-40 bg-slate-950/95 backdrop-blur border border-slate-800 rounded-xl p-4 shadow-2xl mb-8">
        <div className="flex justify-between items-center mb-2">
          <h2 className="text-lg font-bold text-white">Marketing Maturity Assessment</h2>
          <span className="text-cyan-400 font-mono text-sm">{answeredCount} of {QUESTIONS.length} Answered</span>
        </div>
        <div className="w-full bg-slate-800 h-2 rounded-full overflow-hidden">
          <div 
            className="bg-cyan-500 h-full transition-all duration-500 ease-out"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>

      {/* Questions */}
      <div className="space-y-6">
        {QUESTIONS.map((q, idx) => (
          <div 
            key={q.id} 
            className={`p-6 rounded-xl border transition-all duration-300 ${
              responses[q.id] !== undefined 
                ? 'bg-slate-900 border-cyan-500/30 shadow-[0_0_15px_rgba(34,211,238,0.1)]' 
                : 'bg-slate-900/50 border-slate-800 hover:border-slate-700'
            }`}
          >
            <div className="flex items-start gap-4">
              <div className={`
                flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold
                ${responses[q.id] !== undefined ? 'bg-cyan-500 text-white' : 'bg-slate-800 text-slate-500'}
              `}>
                {responses[q.id] !== undefined ? <CheckCircle2 size={16} /> : idx + 1}
              </div>
              
              <div className="flex-1 space-y-3">
                <div className="flex justify-between items-start">
                  <div>
                    <span className="text-xs font-medium text-cyan-500 uppercase tracking-wider">{q.category}</span>
                    <h3 className="text-lg font-medium text-white mt-1">{q.question}</h3>
                  </div>
                </div>
                
                <p className="text-slate-400 text-sm">{q.description}</p>
                
                <div className="relative">
                  <select 
                    className={`
                      w-full appearance-none bg-slate-950 border rounded-lg px-4 py-3 text-sm text-white outline-none cursor-pointer transition-colors
                      ${responses[q.id] !== undefined ? 'border-cyan-500/50' : 'border-slate-700 hover:border-slate-600'}
                    `}
                    onChange={(e) => handleSelect(q.id, parseInt(e.target.value))}
                    value={responses[q.id] !== undefined ? responses[q.id] : ""}
                  >
                    <option value="" disabled>Select your maturity level...</option>
                    {q.options.map((opt) => (
                      <option key={opt.value} value={opt.value}>
                        {opt.label}
                      </option>
                    ))}
                  </select>
                  <ChevronDown className="absolute right-4 top-1/2 transform -translate-y-1/2 text-slate-500 pointer-events-none" size={16} />
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="sticky bottom-4 bg-slate-950 p-4 border-t border-slate-800 mt-8 flex justify-center">
        <button
          onClick={handleSubmit}
          disabled={answeredCount < QUESTIONS.length || isSubmitting}
          className={`
            px-8 py-4 rounded-xl font-bold text-lg shadow-lg transition-all w-full md:w-auto
            ${answeredCount === QUESTIONS.length 
              ? 'bg-cyan-500 hover:bg-cyan-400 text-white shadow-cyan-500/25' 
              : 'bg-slate-800 text-slate-500 cursor-not-allowed'}
          `}
        >
          {isSubmitting ? 'Calculating Flight Path...' : 'Calculate My Results'}
        </button>
      </div>
    </div>
  );
};