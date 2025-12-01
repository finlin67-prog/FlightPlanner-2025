import React from 'react';
import { Plane, Map, LayoutDashboard, Settings, Menu, X, Terminal } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import { useUser } from '../store/UserContext';

export const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { combinedScore, planeLevel, flightMiles } = useUser();
  const location = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false);

  const navItems = [
    { label: 'Home', path: '/', icon: <Terminal size={18} /> },
    { label: 'Journey Map', path: '/journey-map', icon: <Map size={18} /> },
    { label: 'Scenarios', path: '/scenarios', icon: <LayoutDashboard size={18} /> },
    { label: 'Operations', path: '/operations-center', icon: <Settings size={18} /> },
  ];

  return (
    <div className="min-h-screen bg-slate-950 text-slate-50 font-sans selection:bg-cyan-500/30">
      {/* Top Nav */}
      <nav className="sticky top-0 z-50 bg-slate-950/80 backdrop-blur-md border-b border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-3">
              <Link to="/" className="flex items-center gap-2 group">
                <div className="p-2 bg-cyan-500/10 rounded-lg group-hover:bg-cyan-500/20 transition-colors">
                  <Plane className="text-cyan-400 transform -rotate-45" size={24} />
                </div>
                <span className="font-bold text-lg tracking-tight">Flight<span className="text-cyan-400">Planner</span></span>
              </Link>
            </div>
            
            <div className="hidden md:block">
              <div className="flex items-baseline space-x-4">
                {navItems.map((item) => (
                  <Link
                    key={item.path}
                    to={item.path}
                    className={`flex items-center gap-2 px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                      location.pathname === item.path
                        ? 'bg-slate-800 text-cyan-400'
                        : 'text-slate-300 hover:text-white hover:bg-slate-800'
                    }`}
                  >
                    {item.icon}
                    {item.label}
                  </Link>
                ))}
              </div>
            </div>

            <div className="hidden md:flex items-center gap-4">
              <div className="flex flex-col items-end">
                <span className="text-xs text-slate-400 uppercase tracking-wider">Status</span>
                <span className="text-sm font-semibold text-cyan-400">{planeLevel}</span>
              </div>
              <div className="h-8 w-px bg-slate-800"></div>
              <div className="flex flex-col items-end">
                <span className="text-xs text-slate-400 uppercase tracking-wider">Miles</span>
                <span className="text-sm font-mono text-white">{flightMiles.toLocaleString()}</span>
              </div>
            </div>

            <div className="-mr-2 flex md:hidden">
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="bg-slate-800 inline-flex items-center justify-center p-2 rounded-md text-slate-400 hover:text-white hover:bg-slate-700 focus:outline-none"
              >
                {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden bg-slate-900 border-b border-slate-800">
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
              {navItems.map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`flex items-center gap-3 px-3 py-3 rounded-md text-base font-medium ${
                    location.pathname === item.path
                      ? 'bg-slate-800 text-cyan-400'
                      : 'text-slate-300 hover:text-white hover:bg-slate-800'
                  }`}
                >
                  {item.icon}
                  {item.label}
                </Link>
              ))}
            </div>
            <div className="pt-4 pb-4 border-t border-slate-800">
              <div className="flex items-center px-5">
                <div className="ml-3">
                  <div className="text-base font-medium leading-none text-white">Flight Status</div>
                  <div className="text-sm font-medium leading-none text-slate-400 mt-1">{planeLevel} • {flightMiles} miles</div>
                </div>
              </div>
            </div>
          </div>
        )}
      </nav>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 animate-fade-in">
        {children}
      </main>
      
      {/* Simple Footer */}
      <footer className="border-t border-slate-800 bg-slate-950 py-8 mt-12">
        <div className="max-w-7xl mx-auto px-4 text-center text-slate-500 text-sm">
          <p>© 2024 Marketing Flight Planner. All systems nominal.</p>
        </div>
      </footer>
    </div>
  );
};