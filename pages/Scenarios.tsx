import React, { useState } from 'react';
import { SCENARIOS } from '../data/staticData';
import { Target, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const INDUSTRIES = ['All', 'SaaS', 'Retail', 'Healthcare', 'Finance'];

export const Scenarios: React.FC = () => {
  const [activeIndustry, setActiveIndustry] = useState('All');

  const filteredScenarios = activeIndustry === 'All' 
    ? SCENARIOS 
    : SCENARIOS.filter(s => s.industry === activeIndustry || s.industry === 'All');

  return (
    <div className="space-y-8 animate-fade-in">
      <div className="text-center space-y-4">
        <h1 className="text-3xl font-bold text-white">Pre-Built Marketing Scenarios</h1>
        <p className="text-slate-400 max-w-2xl mx-auto">
          Choose a common marketing challenge and get instant strategy recommendations.
        </p>
      </div>

      {/* Filter Tabs */}
      <div className="flex justify-center border-b border-slate-800">
        <div className="flex space-x-2 overflow-x-auto p-2">
          {INDUSTRIES.map(ind => (
            <button
              key={ind}
              onClick={() => setActiveIndustry(ind)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-colors whitespace-nowrap ${
                activeIndustry === ind 
                  ? 'bg-cyan-500/10 text-cyan-400 border border-cyan-500/50' 
                  : 'text-slate-400 hover:text-white hover:bg-slate-800'
              }`}
            >
              {ind}
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredScenarios.map(scenario => (
          <div key={scenario.id} className="bg-slate-900 border border-slate-800 rounded-xl p-6 flex flex-col hover:border-cyan-500/50 transition-all group cursor-default">
            <div className="flex items-start justify-between mb-4">
              <div className="p-3 bg-slate-800 rounded-lg text-cyan-400 group-hover:scale-110 transition-transform">
                <Target size={24} />
              </div>
              <span className="text-xs font-mono text-slate-500 px-2 py-1 bg-slate-800 rounded">{scenario.industry}</span>
            </div>
            
            <h3 className="text-lg font-bold text-white mb-2">{scenario.title}</h3>
            
            <div className="space-y-2 mb-4">
              <div className="flex items-center gap-2 text-xs text-slate-400">
                <span className="w-2 h-2 rounded-full bg-slate-600"></span>
                From: {scenario.from}
              </div>
              <div className="flex items-center gap-2 text-xs text-cyan-400">
                <span className="w-2 h-2 rounded-full bg-cyan-400"></span>
                To: {scenario.to}
              </div>
            </div>
            
            <p className="text-sm text-slate-400 mb-6 line-clamp-2">
              "{scenario.challenge}"
            </p>
            
            <div className="mt-auto pt-4 border-t border-slate-800 flex justify-between items-center text-xs text-slate-500">
               <span>{scenario.timeline}</span>
               <span>{scenario.investment}</span>
            </div>
            
            <button className="mt-4 w-full py-2 bg-slate-800 group-hover:bg-cyan-600 group-hover:text-white text-cyan-400 rounded-lg text-sm font-medium transition-colors flex items-center justify-center gap-2">
              View Strategy <ArrowRight size={14} />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};