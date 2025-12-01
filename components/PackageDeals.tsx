import React from 'react';
import { useUser } from '../store/UserContext';
import { SCENARIOS } from '../data/staticData';
import { Star, ArrowRight, MapPin } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export const PackageDeals: React.FC = () => {
  const { profile } = useUser();
  const navigate = useNavigate();

  // Filter scenarios based on user industry if available
  const industryFilter = profile?.industry;
  
  const recommendedScenarios = SCENARIOS.filter(s => {
    if (!industryFilter || industryFilter === 'Other') return true;
    return s.industry.includes(industryFilter) || s.industry === 'SaaS / Tech'; // Fallback to Tech if no match
  }).slice(0, 3);

  const displayIndustry = industryFilter || 'General';

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-2">
        <Star className="text-[#ff690f]" fill="currentColor" size={24} />
        <h2 className="text-2xl font-bold text-slate-800 dark:text-slate-200">
          Recommended Packages for <span className="text-cyan-500">{displayIndustry}</span>
        </h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {recommendedScenarios.map(scenario => (
          <div 
            key={scenario.id}
            onClick={() => navigate(`/scenarios/${scenario.id}`)}
            className="group relative bg-white dark:bg-slate-900 rounded-xl overflow-hidden shadow-lg border border-slate-200 dark:border-slate-800 hover:shadow-2xl transition-all cursor-pointer hover:-translate-y-1"
          >
            {/* Image Placeholder with Gradient */}
            <div className="h-32 bg-gradient-to-r from-slate-800 to-slate-900 relative overflow-hidden">
               <div className="absolute inset-0 bg-cyan-500/10 group-hover:bg-cyan-500/20 transition-colors"></div>
               {/* Decorative dots/lines */}
               <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-cyan-500 to-blue-500"></div>
               <div className="absolute top-4 left-4">
                 <span className="bg-white/10 backdrop-blur text-white text-xs font-bold px-2 py-1 rounded border border-white/20">
                   {scenario.industry}
                 </span>
               </div>
            </div>

            <div className="p-5">
              <h3 className="font-bold text-lg text-slate-900 dark:text-white mb-1 group-hover:text-cyan-500 transition-colors">
                {scenario.title}
              </h3>
              <p className="text-slate-500 text-xs mb-4 line-clamp-2">
                "{scenario.challenge}"
              </p>

              <div className="space-y-2 mb-4">
                <div className="flex items-center gap-2 text-xs text-slate-600 dark:text-slate-400">
                  <MapPin size={12} /> From: <span className="font-medium text-slate-900 dark:text-slate-200">{scenario.from}</span>
                </div>
                <div className="flex items-center gap-2 text-xs text-slate-600 dark:text-slate-400">
                  <ArrowRight size={12} /> To: <span className="font-medium text-slate-900 dark:text-slate-200">{scenario.to}</span>
                </div>
              </div>

              <div className="flex justify-between items-center pt-4 border-t border-slate-100 dark:border-slate-800">
                <div className="text-xs font-semibold text-slate-500">
                  {scenario.timeline}
                </div>
                <div className="bg-slate-100 dark:bg-slate-800 text-slate-900 dark:text-white text-xs font-bold px-3 py-1.5 rounded-full group-hover:bg-[#ff690f] group-hover:text-white transition-colors">
                  {scenario.investment}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};