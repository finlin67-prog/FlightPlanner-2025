import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useUser } from '../store/UserContext';
import { TechTool } from '../types';
import { Check, Settings, ArrowRight } from 'lucide-react';

const CATEGORIES = [
  'CRM & Sales',
  'Marketing Automation',
  'ABM & Intent',
  'Analytics & BI',
  'Content (CMS)',
  'Social Media',
  'Paid Ads'
];

export const TechStack: React.FC = () => {
  const navigate = useNavigate();
  const { updateTechStack } = useUser();
  const [step, setStep] = useState(1);
  const [selectedTools, setSelectedTools] = useState<TechTool[]>([]);

  // Temporary state for the input
  const [currentToolName, setCurrentToolName] = useState('');
  const [currentCategory, setCurrentCategory] = useState(CATEGORIES[0]);

  const addTool = () => {
    if (!currentToolName) return;
    setSelectedTools(prev => [...prev, { category: currentCategory, name: currentToolName, optimization: 5 }]);
    setCurrentToolName('');
  };

  const updateOptimization = (index: number, val: number) => {
    const newTools = [...selectedTools];
    newTools[index].optimization = val;
    setSelectedTools(newTools);
  };

  const handleFinish = () => {
    updateTechStack(selectedTools);
    navigate('/results');
  };

  return (
    <div className="max-w-2xl mx-auto space-y-8 animate-fade-in">
      <div className="text-center">
         <h1 className="text-2xl font-bold text-white mb-2">Tech Stack Audit</h1>
         <p className="text-slate-400 text-sm">Step {step} of 2: {step === 1 ? 'Inventory' : 'Optimization'}</p>
      </div>

      {step === 1 && (
        <div className="bg-slate-900 border border-slate-800 rounded-xl p-6 space-y-6">
          <div className="flex gap-2">
            <select 
              className="bg-slate-800 border border-slate-700 rounded-lg px-3 text-white text-sm"
              value={currentCategory}
              onChange={e => setCurrentCategory(e.target.value)}
            >
              {CATEGORIES.map(c => <option key={c} value={c}>{c}</option>)}
            </select>
            <input 
              type="text" 
              placeholder="Tool Name (e.g. HubSpot)" 
              className="flex-1 bg-slate-800 border border-slate-700 rounded-lg px-3 py-2 text-white text-sm"
              value={currentToolName}
              onChange={e => setCurrentToolName(e.target.value)}
              onKeyDown={e => e.key === 'Enter' && addTool()}
            />
            <button onClick={addTool} className="bg-slate-700 hover:bg-slate-600 text-white px-4 rounded-lg text-sm">Add</button>
          </div>

          <div className="space-y-2">
            {selectedTools.length === 0 && <p className="text-slate-500 text-sm italic text-center py-4">No tools added yet.</p>}
            {selectedTools.map((tool, idx) => (
              <div key={idx} className="flex items-center justify-between p-3 bg-slate-800 rounded-lg border border-slate-700">
                <div>
                  <div className="text-xs text-slate-500">{tool.category}</div>
                  <div className="text-white font-medium">{tool.name}</div>
                </div>
                <button 
                  onClick={() => setSelectedTools(selectedTools.filter((_, i) => i !== idx))}
                  className="text-slate-500 hover:text-red-400"
                >
                  ×
                </button>
              </div>
            ))}
          </div>
          
          <div className="pt-4 flex justify-end">
            <button 
              onClick={() => setStep(2)} 
              disabled={selectedTools.length === 0}
              className="bg-cyan-600 hover:bg-cyan-500 disabled:opacity-50 text-white px-6 py-2 rounded-lg font-medium flex items-center gap-2"
            >
              Next Step <ArrowRight size={16} />
            </button>
          </div>
        </div>
      )}

      {step === 2 && (
        <div className="bg-slate-900 border border-slate-800 rounded-xl p-6 space-y-6">
          <p className="text-slate-300 text-sm">Rate how well you utilize each tool (1-10):</p>
          <div className="space-y-4">
             {selectedTools.map((tool, idx) => (
               <div key={idx} className="space-y-2 pb-4 border-b border-slate-800 last:border-0">
                 <div className="flex justify-between">
                   <span className="font-medium text-white">{tool.name}</span>
                   <span className="font-mono text-cyan-400">{tool.optimization}/10</span>
                 </div>
                 <input 
                   type="range" 
                   min="1" 
                   max="10" 
                   value={tool.optimization} 
                   onChange={(e) => updateOptimization(idx, parseInt(e.target.value))}
                   className="w-full accent-cyan-500 bg-slate-800"
                 />
                 <div className="flex justify-between text-xs text-slate-500">
                   <span>Barely used</span>
                   <span>Fully Optimized</span>
                 </div>
               </div>
             ))}
          </div>

          <div className="pt-4 flex justify-between">
            <button onClick={() => setStep(1)} className="text-slate-400 hover:text-white text-sm">Back</button>
            <button 
              onClick={handleFinish} 
              className="bg-cyan-600 hover:bg-cyan-500 text-white px-6 py-2 rounded-lg font-medium flex items-center gap-2"
            >
              Complete Audit <Check size={16} />
            </button>
          </div>
        </div>
      )}
    </div>
  );
};