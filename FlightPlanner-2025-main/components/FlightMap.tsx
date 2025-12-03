import React, { useMemo, useState } from 'react';
import { CITIES, ROUTES } from '../data/staticData';
import { Route } from '../types';
import { useUser } from '../store/UserContext';

// Simple Mercator projection logic for a static view
const WIDTH = 800;
const HEIGHT = 450;

const project = (lat: number, lon: number): [number, number] => {
  const x = (lon + 180) * (WIDTH / 360);
  const latRad = (lat * Math.PI) / 180;
  const mercN = Math.log(Math.tan((Math.PI / 4) + (latRad / 2)));
  const y = (HEIGHT / 2) - (WIDTH * mercN / (2 * Math.PI));
  // Adjust scaling and centering for better visual fit of major continents
  return [x, Math.max(0, Math.min(HEIGHT, y + 50))];
};

export const FlightMap: React.FC<{ interactive?: boolean; onRouteSelect?: (route: Route) => void }> = ({ interactive = false, onRouteSelect }) => {
  const { flightMiles } = useUser();
  const [hoveredCity, setHoveredCity] = useState<string | null>(null);
  const [hoveredRoute, setHoveredRoute] = useState<string | null>(null);

  const projectedCities = useMemo(() => {
    return CITIES.map(city => ({
      ...city,
      pos: project(city.coords[0], city.coords[1])
    }));
  }, []);

  const projectedRoutes = useMemo(() => {
    return ROUTES.map(route => {
      const start = CITIES.find(c => c.name === route.from)?.coords;
      const end = CITIES.find(c => c.name === route.to)?.coords;
      if (!start || !end) return null;
      
      const startPos = project(start[0], start[1]);
      const endPos = project(end[0], end[1]);
      
      // Calculate a quadratic curve control point
      const dx = endPos[0] - startPos[0];
      const dy = endPos[1] - startPos[1];
      const dist = Math.sqrt(dx * dx + dy * dy);
      const midX = (startPos[0] + endPos[0]) / 2;
      const midY = (startPos[1] + endPos[1]) / 2;
      
      // Arc height based on distance
      const arcHeight = dist * 0.2;
      
      // Perpendicular vector
      const normX = -dy / dist;
      const normY = dx / dist;
      
      const cpX = midX + normX * arcHeight;
      const cpY = midY + normY * arcHeight;

      const path = `M ${startPos[0]},${startPos[1]} Q ${cpX},${cpY} ${endPos[0]},${endPos[1]}`;
      
      const isUnlocked = flightMiles >= route.miles;
      
      return { ...route, path, isUnlocked };
    }).filter(Boolean) as (Route & { path: string; isUnlocked: boolean })[];
  }, [flightMiles]);

  return (
    <div className={`relative bg-slate-900 rounded-xl overflow-hidden border border-slate-800 shadow-2xl ${interactive ? 'h-[600px]' : 'h-[400px]'}`}>
      <svg viewBox={`0 0 ${WIDTH} ${HEIGHT}`} className="w-full h-full">
        {/* Background Grid */}
        <defs>
          <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
            <path d="M 40 0 L 0 0 0 40" fill="none" stroke="#1e293b" strokeWidth="0.5" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#grid)" />
        
        {/* World Outline (Simplified for aesthetic) */}
        {/* Can substitute with a path if available, or just rely on the grid + nodes for "abstract tech" feel */}
        
        {/* Routes */}
        {projectedRoutes.map((route, i) => (
          <g key={i} 
             onMouseEnter={() => setHoveredRoute(route.name)}
             onMouseLeave={() => setHoveredRoute(null)}
             onClick={() => interactive && onRouteSelect && onRouteSelect(route)}
             className={`${interactive ? 'cursor-pointer' : ''}`}
          >
             {/* Hover target (thicker invisible line) */}
             <path d={route.path} stroke="transparent" strokeWidth="15" fill="none" />
             
             {/* Visible Line */}
            <path 
              d={route.path} 
              stroke={route.isUnlocked ? '#10b981' : (flightMiles > route.miles * 0.7 ? '#f59e0b' : '#334155')} 
              strokeWidth={hoveredRoute === route.name ? 3 : 1.5} 
              strokeDasharray={route.isUnlocked ? "" : "4,4"}
              fill="none" 
              className="transition-all duration-300"
            />
          </g>
        ))}

        {/* Cities */}
        {projectedCities.map((city, i) => (
          <g key={i} 
             transform={`translate(${city.pos[0]}, ${city.pos[1]})`}
             onMouseEnter={() => setHoveredCity(city.name)}
             onMouseLeave={() => setHoveredCity(null)}
             className="cursor-pointer"
          >
            <circle r={hoveredCity === city.name ? 8 : 4} fill="#020617" stroke="#22d3ee" strokeWidth="2" className="transition-all duration-300"/>
            <circle r={hoveredCity === city.name ? 12 : 0} fill="#22d3ee" opacity="0.2" className="animate-pulse" />
            
            {/* Labels */}
            {(hoveredCity === city.name || interactive) && (
              <g transform="translate(0, 15)">
                <text textAnchor="middle" fill="white" fontSize="10" fontWeight="bold" dy="0">{city.name}</text>
                <text textAnchor="middle" fill="#94a3b8" fontSize="8" dy="10">{city.function}</text>
              </g>
            )}
          </g>
        ))}
      </svg>
      
      {/* Overlay Tooltip for Route */}
      {hoveredRoute && (
        <div className="absolute top-4 left-1/2 transform -translate-x-1/2 bg-slate-800/90 text-white px-3 py-1 rounded-full text-sm border border-slate-700 pointer-events-none">
          Route: {hoveredRoute}
        </div>
      )}
    </div>
  );
};