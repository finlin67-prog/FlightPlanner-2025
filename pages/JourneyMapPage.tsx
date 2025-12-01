import React, { useState } from 'react';
import { FlightMap } from '../components/FlightMap';
import { Route } from '../types';
import { ArrowLeft, Clock, MapPin, Gauge } from 'lucide-react';
import { Link } from 'react-router-dom';

export const JourneyMapPage: React.FC = () => {
  const [selectedRoute, setSelectedRoute] = useState<Route | null>(null);

  return (
    <div className="h-[calc(100vh-100px)] relative flex flex-col lg:flex-row gap-4">
       {/* Sidebar */}
       <div className="w-full lg:w-80 bg-slate-900 border border-slate-800 rounded-xl p-4 flex flex-col gap-4 h-fit lg:h-full overflow-y-auto">
         <div>
            <Link to="/" className="text-slate-400 hover:text-white text-sm flex items-center gap-2 mb-4">
              <ArrowLeft size={14} /> Back to Dashboard
            </Link>
            <h2 className="text-xl font-bold text-white mb-2">Route Planner</h2>
            <p className="text-xs text-slate-400">Select a route on the map to view flight details and requirements.</p>
         </div>

         <div className="space-y-2">
           <h3 className="text-xs font-bold text-slate-500 uppercase">Legend</h3>
           <div className="flex items-center gap-2 text-sm text-slate-300">
             <div className="w-3 h-0.5 bg-green-500"></div> Available
           </div>
           <div className="flex items-center gap-2 text-sm text-slate-300">
             <div className="w-3 h-0.5 bg-yellow-500"></div> Partially Ready
           </div>
           <div className="flex items-center gap-2 text-sm text-slate-300">
             <div className="w-3 h-0.5 bg-slate-600"></div> Locked
           </div>
         </div>
       </div>

       {/* Main Map Area */}
       <div className="flex-1 relative bg-slate-950 rounded-xl overflow-hidden border border-slate-800">
         <FlightMap interactive={true} onRouteSelect={setSelectedRoute} />
         
         {/* Route Detail Overlay (Slide in) */}
         {selectedRoute && (
           <div className="absolute top-4 right-4 w-80 bg-slate-900/95 backdrop-blur border border-slate-700 shadow-2xl rounded-xl p-6 animate-fade-in-up">
             <div className="flex justify-between items-start mb-4">
               <h3 className="text-lg font-bold text-white">{selectedRoute.name}</h3>
               <button onClick={() => setSelectedRoute(null)} className="text-slate-500 hover:text-white">×</button>
             </div>
             
             <div className="space-y-4">
               <div className="flex justify-between text-sm border-b border-slate-800 pb-2">
                 <span className="text-slate-400">Distance</span>
                 <span className="text-white font-mono">{selectedRoute.miles} miles</span>
               </div>
               
               <div className="flex justify-between text-sm border-b border-slate-800 pb-2">
                 <span className="text-slate-400">Stops</span>
                 <span className="text-white font-mono">{selectedRoute.stops}</span>
               </div>

               <div className="flex justify-between text-sm border-b border-slate-800 pb-2">
                 <span className="text-slate-400">Difficulty</span>
                 <span className={`font-bold ${
                   selectedRoute.difficulty === 'Easy' ? 'text-green-500' : 
                   selectedRoute.difficulty === 'Medium' ? 'text-yellow-500' : 'text-red-500'
                 }`}>{selectedRoute.difficulty}</span>
               </div>

               <div className="pt-2">
                 <button className="w-full py-2 bg-cyan-600 hover:bg-cyan-500 text-white rounded font-medium text-sm">
                   Start This Journey
                 </button>
               </div>
             </div>
           </div>
         )}
       </div>
    </div>
  );
};