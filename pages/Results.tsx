import React from 'react';
import { useUser } from '../store/UserContext';
import { Plane, Compass, Gauge, BarChart3, AlertCircle, CheckCircle2 } from 'lucide-react';
import { Link, Navigate } from 'react-router-dom';
import { ResponsiveContainer, RadialBarChart, RadialBar, Tooltip } from 'recharts';

export const Results: React.FC = () => {
  const { combinedScore, planeLevel, flightMiles, assessment } = useUser();

  if (!assessment) {
    return <Navigate to="/" />;
  }

  // Helper for gauge color
  const getScoreColor = (score: number) => {
    if (score >= 75) return '#10b981'; // green
    if (score >= 40) return '#f59e0b'; // orange
    return '#ef4444'; // red
  };

  const reaoData = [
    { name: 'Readiness', score: Math.round(combinedScore * 0.9), fill: getScoreColor(combinedScore * 0.9) },
    { name: 'Efficiency', score: Math.round(combinedScore * 1.1 > 100 ? 100 : combinedScore * 1.1), fill: getScoreColor(combinedScore * 1.1) },
    { name: 'Alignment', score: Math.round(combinedScore * 0.8), fill: getScoreColor(combinedScore * 0.8) },
    { name: 'Opportunity', score: 100, fill: '#22d3ee' },
  ];

  return (
    <div className="space-y-8 animate-fade-in">
      
      {/* SECTION 1: HERO STATUS */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Altimeter / Score */}
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 relative overflow-hidden flex flex-col items-center justify-center">
          <h3 className="text-slate-400 text-sm font-medium uppercase tracking-wider mb-2">Marketing Altitude</h3>
          <div className="relative w-48 h-48 flex items-center justify-center">
             <ResponsiveContainer width="100%" height="100%">
               <RadialBarChart innerRadius="80%" outerRadius="100%" barSize={10} data={[{ score: 100, fill: '#1e293b' }, { score: combinedScore, fill: getScoreColor(combinedScore) }]} startAngle={180} endAngle={0}>
                 <RadialBar dataKey="score" cornerRadius={10} />
               </RadialBarChart>
             </ResponsiveContainer>
             <div className="absolute inset-0 flex flex-col items-center justify-center mt-8">
               <span className="text-5xl font-bold text-white">{combinedScore}</span>
               <span className="text-xs text-slate-500">/ 100</span>
             </div>
          </div>
          <div className="mt-4 text-center">
             <div className="inline-block px-3 py-1 bg-slate-800 rounded-full text-cyan-400 font-mono text-sm border border-slate-700">
               {planeLevel}
             </div>
          </div>
        </div>

        {/* Flight Miles */}
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 flex flex-col items-center justify-center text-center">
          <Plane className="text-cyan-500 mb-4 h-12 w-12" />
          <h3 className="text-slate-400 text-sm font-medium uppercase tracking-wider">Flight Miles Earned</h3>
          <div className="text-5xl font-mono font-bold text-white mt-2 tracking-tighter">
            {flightMiles.toLocaleString()}
          </div>
          <p className="text-slate-500 text-xs mt-4 max-w-xs">
            Use miles to unlock advanced strategic routes. Earn more by optimizing your tech stack.
          </p>
        </div>

        {/* Status Text */}
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 flex flex-col justify-center">
          <h3 className="text-xl font-bold text-white mb-2">Flight Status: <span className="text-cyan-400">{planeLevel}</span></h3>
          <p className="text-slate-400 text-sm leading-relaxed mb-4">
            {combinedScore < 40 ? "You're just getting started. Focus on foundational processes to clear the runway." :
             combinedScore < 75 ? "You're airborne with solid capabilities. Now it's time to optimize for efficiency and speed." :
             "Cruising altitude reached. Your focus should shift to innovation and global scale."}
          </p>
          <div className="flex gap-2">
            <Link to="/tech-stack" className="flex-1 py-2 bg-slate-800 hover:bg-slate-700 text-center rounded text-sm text-cyan-400 border border-slate-700 transition-colors">
              Boost Score (+300)
            </Link>
            <Link to="/journey-map" className="flex-1 py-2 bg-cyan-600 hover:bg-cyan-500 text-center rounded text-sm text-white transition-colors">
              View Map
            </Link>
          </div>
        </div>
      </div>

      {/* SECTION 2: REAO DASHBOARD */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {reaoData.map((item) => (
          <div key={item.name} className="bg-slate-900 border border-slate-800 p-4 rounded-xl">
            <div className="flex justify-between items-end mb-2">
              <span className="text-slate-400 text-xs uppercase font-bold">{item.name}</span>
              <span className="text-white font-mono font-bold">{item.score}</span>
            </div>
            <div className="w-full bg-slate-800 h-2 rounded-full overflow-hidden">
              <div 
                className="h-full transition-all duration-1000" 
                style={{ width: `${item.score}%`, backgroundColor: item.fill }}
              ></div>
            </div>
          </div>
        ))}
      </div>

      {/* SECTION 3: SWOC MATRIX */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Strengths */}
        <div className="bg-slate-900 border-l-4 border-l-green-500 border-y border-r border-slate-800 p-6 rounded-r-xl">
          <h3 className="flex items-center gap-2 text-green-500 font-bold mb-4">
            <CheckCircle2 size={20} /> Strengths
          </h3>
          <ul className="space-y-2 text-sm text-slate-300">
            {combinedScore > 60 ? (
              <>
                <li className="flex items-start gap-2">• Strong strategic alignment</li>
                <li className="flex items-start gap-2">• Effective tool utilization</li>
              </>
            ) : (
              <li className="flex items-start gap-2">• Team willingness to improve</li>
            )}
             <li className="flex items-start gap-2">• Clear understanding of gaps</li>
          </ul>
        </div>

        {/* Weaknesses */}
        <div className="bg-slate-900 border-l-4 border-l-red-500 border-y border-r border-slate-800 p-6 rounded-r-xl">
          <h3 className="flex items-center gap-2 text-red-500 font-bold mb-4">
            <AlertCircle size={20} /> Weaknesses
          </h3>
          <ul className="space-y-2 text-sm text-slate-300">
             {combinedScore < 50 ? (
              <>
                <li className="flex items-start gap-2">• Manual processes limiting scale</li>
                <li className="flex items-start gap-2">• Data fragmentation</li>
              </>
            ) : (
              <li className="flex items-start gap-2">• Integration complexity</li>
            )}
            <li className="flex items-start gap-2">• Need for advanced attribution</li>
          </ul>
        </div>
      </div>

      {/* SECTION 4: RECOMMENDATIONS */}
      <div>
        <h2 className="text-2xl font-bold text-white mb-6">Your 90-Day Flight Plan</h2>
        <div className="space-y-4">
          <div className="bg-slate-900 border border-slate-800 rounded-xl p-6 flex flex-col md:flex-row gap-6 hover:border-cyan-500/30 transition-colors">
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-2">
                <span className="bg-red-500/10 text-red-500 text-xs px-2 py-0.5 rounded font-bold">HIGH PRIORITY</span>
                <span className="text-slate-500 text-xs">Strategy</span>
              </div>
              <h3 className="text-lg font-bold text-white mb-2">Define Sales & Marketing SLAs</h3>
              <p className="text-slate-400 text-sm">Establish shared definitions, handoff criteria, and lead quality standards. Implement weekly alignment meetings to ensure smooth handoffs.</p>
            </div>
            <div className="flex flex-row md:flex-col gap-4 min-w-[150px] border-t md:border-t-0 md:border-l border-slate-800 pt-4 md:pt-0 md:pl-6">
              <div>
                <span className="text-xs text-slate-500 block">Effort</span>
                <div className="w-full bg-slate-800 h-1.5 rounded-full mt-1">
                  <div className="w-1/3 bg-cyan-500 h-full rounded-full"></div>
                </div>
              </div>
              <div>
                <span className="text-xs text-slate-500 block">Impact</span>
                <div className="w-full bg-slate-800 h-1.5 rounded-full mt-1">
                  <div className="w-full bg-green-500 h-full rounded-full"></div>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-slate-900 border border-slate-800 rounded-xl p-6 flex flex-col md:flex-row gap-6 hover:border-cyan-500/30 transition-colors">
             <div className="flex-1">
              <div className="flex items-center gap-2 mb-2">
                <span className="bg-yellow-500/10 text-yellow-500 text-xs px-2 py-0.5 rounded font-bold">MEDIUM PRIORITY</span>
                <span className="text-slate-500 text-xs">Tech Stack</span>
              </div>
              <h3 className="text-lg font-bold text-white mb-2">Audit MarTech Integrations</h3>
              <p className="text-slate-400 text-sm">Review data flow between CRM and Automation platform. Ensure lead status updates are syncing bi-directionally in real-time.</p>
            </div>
            <div className="flex flex-row md:flex-col gap-4 min-w-[150px] border-t md:border-t-0 md:border-l border-slate-800 pt-4 md:pt-0 md:pl-6">
              <div>
                <span className="text-xs text-slate-500 block">Effort</span>
                <div className="w-full bg-slate-800 h-1.5 rounded-full mt-1">
                  <div className="w-2/3 bg-cyan-500 h-full rounded-full"></div>
                </div>
              </div>
              <div>
                <span className="text-xs text-slate-500 block">Impact</span>
                <div className="w-full bg-slate-800 h-1.5 rounded-full mt-1">
                  <div className="w-2/3 bg-green-500 h-full rounded-full"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

    </div>
  );
};