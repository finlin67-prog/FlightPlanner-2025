import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  Zap, Activity, CheckCircle, ArrowRight, BarChart3, Map, 
  Layout, Settings, Target, ChevronLeft, ChevronRight,
  Plane, Gauge, Layers, FileText, PieChart, AlertCircle, Calendar
} from 'lucide-react';
import { useUser } from '../store/UserContext';
import { ResponsiveContainer, RadialBarChart, RadialBar } from 'recharts';

export const OperationsCenter: React.FC = () => {
  const { planeLevel, combinedScore, flightMiles, assessment } = useUser();
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

  // Helper for dynamic color coding based on performance thresholds
  const getScoreColor = (score: number) => {
    if (score >= 75) return 'bg-green-500';
    if (score >= 40) return 'bg-yellow-500';
    return 'bg-red-500';
  };

  // Calculate REAO locally for dashboard display
  const reaoData = [
    { name: 'Readiness', score: Math.round(combinedScore * 0.9), color: getScoreColor(Math.round(combinedScore * 0.9)) },
    { name: 'Efficiency', score: Math.round(combinedScore * 1.1 > 100 ? 100 : combinedScore * 1.1), color: getScoreColor(Math.round(combinedScore * 1.1 > 100 ? 100 : combinedScore * 1.1)) },
    { name: 'Alignment', score: Math.round(combinedScore * 0.8), color: getScoreColor(Math.round(combinedScore * 0.8)) },
    { name: 'Opportunity', score: 100, color: 'bg-cyan-400' }, // Opportunity stays cyan as it represents potential
  ];

  const recentActivity = [
    { date: 'Today', action: 'Login detected', type: 'system' },
    { date: 'Nov 25', action: 'Completed Quick Assessment', type: 'success' },
    { date: 'Nov 24', action: 'Viewed Journey: Content → ABM', type: 'info' },
    { date: 'Nov 23', action: 'Tech Stack Audit initiated', type: 'warning' },
  ];

  return (
    <div className="h-[calc(100vh-140px)] flex gap-4 overflow-hidden animate-fade-in pb-2">
      
      {/* LEFT SIDEBAR - Navigation Tree */}
      <div className={`
        bg-slate-900 border border-slate-800 rounded-xl flex flex-col transition-all duration-300
        ${sidebarCollapsed ? 'w-16 items-center' : 'w-64'}
        hidden md:flex flex-shrink-0
      `}>
        <div className="p-4 border-b border-slate-800 flex justify-between items-center h-16">
          {!sidebarCollapsed && (
            <div className="flex items-center gap-2 text-slate-100 font-bold">
              <Layout size={18} className="text-cyan-400" />
              <span>Ops Center</span>
            </div>
          )}
          <button 
            onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
            className="p-1.5 hover:bg-slate-800 rounded-lg text-slate-400 transition-colors"
          >
            {sidebarCollapsed ? <ChevronRight size={16} /> : <ChevronLeft size={16} />}
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-3 space-y-6">
          {/* Section: Assessments */}
          <div className={sidebarCollapsed ? 'flex flex-col items-center' : ''}>
            {!sidebarCollapsed && <h3 className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-2 px-2">Assessments</h3>}
            <div className="space-y-1">
              <Link to="/assessment" className={`flex items-center gap-3 px-2 py-2 rounded-lg text-sm group ${sidebarCollapsed ? 'justify-center' : ''} ${assessment ? 'text-green-400 bg-green-900/10' : 'text-slate-300 hover:bg-slate-800 hover:text-white'}`}>
                <Zap size={18} className={assessment ? 'text-green-400' : 'text-slate-400 group-hover:text-cyan-400'} />
                {!sidebarCollapsed && <span>Quick Assessment</span>}
              </Link>
              <Link to="/tech-stack" className={`flex items-center gap-3 px-2 py-2 rounded-lg text-sm group ${sidebarCollapsed ? 'justify-center' : ''} text-slate-300 hover:bg-slate-800 hover:text-white`}>
                <Layers size={18} className="text-slate-400 group-hover:text-cyan-400" />
                {!sidebarCollapsed && <span>Tech Stack</span>}
              </Link>
            </div>
          </div>

          {/* Section: Planning */}
          <div className={sidebarCollapsed ? 'flex flex-col items-center' : ''}>
            {!sidebarCollapsed && <h3 className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-2 px-2">Planning</h3>}
            <div className="space-y-1">
              <Link to="/journey-map" className={`flex items-center gap-3 px-2 py-2 rounded-lg text-sm group ${sidebarCollapsed ? 'justify-center' : ''} text-slate-300 hover:bg-slate-800 hover:text-white`}>
                <Map size={18} className="text-slate-400 group-hover:text-cyan-400" />
                {!sidebarCollapsed && <span>Journey Map</span>}
              </Link>
              <Link to="/scenarios" className={`flex items-center gap-3 px-2 py-2 rounded-lg text-sm group ${sidebarCollapsed ? 'justify-center' : ''} text-slate-300 hover:bg-slate-800 hover:text-white`}>
                <Target size={18} className="text-slate-400 group-hover:text-cyan-400" />
                {!sidebarCollapsed && <span>Scenarios</span>}
              </Link>
            </div>
          </div>

          {/* Section: Results */}
          <div className={sidebarCollapsed ? 'flex flex-col items-center' : ''}>
            {!sidebarCollapsed && <h3 className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-2 px-2">Results</h3>}
            <div className="space-y-1">
              <Link to="/results" className={`flex items-center gap-3 px-2 py-2 rounded-lg text-sm group ${sidebarCollapsed ? 'justify-center' : ''} text-slate-300 hover:bg-slate-800 hover:text-white`}>
                <PieChart size={18} className="text-slate-400 group-hover:text-cyan-400" />
                {!sidebarCollapsed && <span>Dashboard</span>}
              </Link>
              <button className={`flex items-center gap-3 px-2 py-2 rounded-lg text-sm group w-full text-left ${sidebarCollapsed ? 'justify-center' : ''} text-slate-500 cursor-not-allowed`}>
                <FileText size={18} />
                {!sidebarCollapsed && <span>Reports (PDF)</span>}
              </button>
            </div>
          </div>
        </div>
        
        <div className="p-4 border-t border-slate-800">
           <Link to="/" className={`flex items-center gap-3 text-slate-400 hover:text-white text-sm ${sidebarCollapsed ? 'justify-center' : ''}`}>
             <Settings size={18} />
             {!sidebarCollapsed && <span>Settings</span>}
           </Link>
        </div>
      </div>

      {/* CENTER CONTENT - Main Command Deck */}
      <div className="flex-1 overflow-y-auto flex flex-col gap-6 pr-2">
        {/* Header Area */}
        <div className="flex items-end justify-between min-h-[40px]">
          <div>
            <h1 className="text-2xl font-bold text-white">Command Deck</h1>
            <p className="text-slate-400 text-sm">Mission Control for Marketing Operations</p>
          </div>
          <div className="flex items-center gap-3">
             <div className="text-right hidden sm:block">
               <div className="text-xs text-slate-500 uppercase">System Status</div>
               <div className="text-green-400 font-mono text-xs flex items-center justify-end gap-1">
                 <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
                 ONLINE
               </div>
             </div>
          </div>
        </div>

        {/* 4-Card Status Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          
          {/* Card 1: Current Status */}
          <div className="bg-slate-900 border border-slate-800 p-5 rounded-xl relative overflow-hidden">
            <div className="flex justify-between items-start mb-2">
               <h3 className="text-slate-400 text-xs font-bold uppercase tracking-wider">Current Status</h3>
               <Plane className="text-cyan-500" size={20} />
            </div>
            <div className="flex items-end gap-3 mt-2">
              <span className="text-3xl font-bold text-white">{planeLevel}</span>
            </div>
            <div className="mt-4 flex items-center gap-2 text-sm text-slate-400">
              <div className="h-1.5 flex-1 bg-slate-800 rounded-full overflow-hidden">
                <div className="h-full bg-cyan-500 w-[64%]"></div>
              </div>
              <span className="text-cyan-400 font-mono">{combinedScore}/100</span>
            </div>
          </div>

          {/* Card 2: Assessments Action */}
          <div className="bg-slate-900 border border-slate-800 p-5 rounded-xl relative overflow-hidden group hover:border-cyan-500/30 transition-colors">
            <div className="flex justify-between items-start mb-2">
               <h3 className="text-slate-400 text-xs font-bold uppercase tracking-wider">Diagnostic</h3>
               <Activity className={assessment ? "text-green-500" : "text-yellow-500"} size={20} />
            </div>
            <div className="mt-1">
               {assessment ? (
                 <>
                   <div className="text-lg font-bold text-white mb-1">Analysis Complete</div>
                   <div className="flex items-center gap-2 mt-3">
                     <Link to="/results" className="text-xs bg-slate-800 text-white px-3 py-1.5 rounded border border-slate-700 hover:bg-slate-700">View Report</Link>
                     <Link to="/assessment" className="text-xs text-slate-400 hover:text-white px-2">Retake</Link>
                   </div>
                 </>
               ) : (
                 <>
                   <div className="text-lg font-bold text-white mb-3">Baseline Required</div>
                   <Link to="/assessment" className="flex items-center gap-2 text-sm bg-cyan-600 hover:bg-cyan-500 text-white px-4 py-2 rounded-lg w-fit transition-colors shadow-lg shadow-cyan-900/20">
                     <Zap size={16} />
                     Start Quick Assessment
                   </Link>
                 </>
               )}
            </div>
          </div>

          {/* Card 3: Active Routes */}
          <div className="bg-slate-900 border border-slate-800 p-5 rounded-xl">
             <div className="flex justify-between items-start mb-4">
               <h3 className="text-slate-400 text-xs font-bold uppercase tracking-wider">Active Routes</h3>
               <Map className="text-blue-500" size={20} />
            </div>
            <div className="space-y-3">
              <div className="flex items-center justify-between text-sm p-2 bg-slate-950/50 rounded border border-slate-800/50">
                <div className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-green-500"></span>
                  <span className="text-slate-200">NYC <span className="text-slate-600">→</span> LDN</span>
                </div>
                <span className="text-slate-500 text-xs">In Progress</span>
              </div>
              <div className="flex items-center justify-between text-sm p-2 bg-slate-950/50 rounded border border-slate-800/50">
                <div className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-yellow-500"></span>
                  <span className="text-slate-200">LAX <span className="text-slate-600">→</span> SEL</span>
                </div>
                <span className="text-slate-500 text-xs">Planning</span>
              </div>
            </div>
          </div>

          {/* Card 4: Next Actions */}
          <div className="bg-slate-900 border border-slate-800 p-5 rounded-xl">
             <div className="flex justify-between items-start mb-4">
               <h3 className="text-slate-400 text-xs font-bold uppercase tracking-wider">Recommendations</h3>
               <AlertCircle className="text-orange-500" size={20} />
            </div>
            <div className="text-sm">
              <div className="mb-1 text-slate-500 text-xs">Top Priority</div>
              <div className="font-medium text-white truncate">Define Sales & Marketing SLAs</div>
              <div className="mt-3 flex items-center gap-2">
                <span className="text-xs bg-orange-500/10 text-orange-400 px-2 py-0.5 rounded">High Impact</span>
                <span className="text-xs text-slate-500">Est. 2 weeks</span>
              </div>
            </div>
          </div>
        </div>

        {/* Activity Feed */}
        <div className="bg-slate-900 border border-slate-800 rounded-xl p-6 flex-1 min-h-[200px]">
          <h3 className="text-sm font-bold text-white mb-4 flex items-center gap-2">
            <Calendar size={16} className="text-slate-400" />
            Recent Activity Log
          </h3>
          <div className="space-y-4">
            {recentActivity.map((item, idx) => (
              <div key={idx} className="flex gap-4 items-start group">
                <div className="min-w-[60px] text-xs text-slate-500 pt-1 font-mono">{item.date}</div>
                <div className="relative pl-4 border-l border-slate-800 group-last:border-0">
                  <div className={`absolute -left-[5px] top-1.5 w-2.5 h-2.5 rounded-full border-2 border-slate-900 ${
                    item.type === 'success' ? 'bg-green-500' :
                    item.type === 'warning' ? 'bg-orange-500' :
                    item.type === 'info' ? 'bg-blue-500' : 'bg-slate-500'
                  }`}></div>
                  <p className="text-sm text-slate-300 group-hover:text-white transition-colors">{item.action}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* RIGHT PANEL - Flight Instruments */}
      <div className="w-80 bg-slate-900 border border-slate-800 rounded-xl p-5 overflow-y-auto hidden xl:flex flex-col gap-6 flex-shrink-0">
        
        <div className="flex items-center gap-2 pb-4 border-b border-slate-800">
          <Gauge size={18} className="text-cyan-400" />
          <h2 className="font-bold text-slate-100">Flight Instruments</h2>
        </div>

        {/* Instrument 1: Altimeter */}
        <div className="flex flex-col items-center justify-center py-2">
          <div className="relative w-40 h-40 flex items-center justify-center">
             <ResponsiveContainer width="100%" height="100%">
               <RadialBarChart innerRadius="85%" outerRadius="100%" barSize={8} data={[{ score: 100, fill: '#1e293b' }, { score: combinedScore, fill: '#22d3ee' }]} startAngle={180} endAngle={0}>
                 <RadialBar dataKey="score" cornerRadius={10} />
               </RadialBarChart>
             </ResponsiveContainer>
             <div className="absolute inset-0 flex flex-col items-center justify-center mt-6">
               <span className="text-4xl font-bold text-white font-mono">{combinedScore}</span>
               <span className="text-[10px] text-slate-500 uppercase tracking-widest">Altitude</span>
             </div>
          </div>
        </div>

        {/* Instrument 2: Plane Level */}
        <div className="bg-slate-950/50 rounded-lg p-4 border border-slate-800/50 text-center">
          <div className="text-xs text-slate-500 uppercase tracking-wider mb-1">Classification</div>
          <div className="text-lg font-bold text-cyan-400 flex items-center justify-center gap-2">
            <Plane size={18} /> {planeLevel}
          </div>
        </div>

        {/* Instrument 3: Miles */}
        <div className="bg-slate-950/50 rounded-lg p-4 border border-slate-800/50">
          <div className="flex justify-between items-end mb-1">
             <div className="text-xs text-slate-500 uppercase tracking-wider">Flight Miles</div>
             <div className="text-xs text-green-500 font-mono">+300 pending</div>
          </div>
          <div className="text-2xl font-mono font-bold text-white tracking-widest text-center bg-slate-900 py-2 rounded border border-slate-800">
             {flightMiles.toLocaleString()}
          </div>
        </div>

        {/* Instrument 4: REAO Status */}
        <div className="space-y-3 pt-2">
          <div className="text-xs text-slate-500 uppercase tracking-wider font-bold">REAO Diagnostics</div>
          {reaoData.map((item) => (
            <div key={item.name} className="space-y-1">
              <div className="flex justify-between text-xs">
                <span className="text-slate-400">{item.name}</span>
                <span className="text-slate-200 font-mono">{item.score}%</span>
              </div>
              <div className="h-1.5 bg-slate-800 rounded-full overflow-hidden">
                <div className={`h-full ${item.color} transition-all duration-500`} style={{ width: `${item.score}%` }}></div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
};
