import React from 'react';
import { Hero } from '../components/Hero';
import { PackageDeals } from '../components/PackageDeals';
import { useUser } from '../store/UserContext';

export const Home: React.FC = () => {
  const { profile } = useUser();

  return (
    <div className="space-y-12 pb-12">
      {/* Brand Header (Optional, if not in Layout) */}
      <div className="text-center pt-8 pb-4">
        <h1 className="text-4xl font-bold tracking-tight text-white mb-2">
          MarketQuest Travels
        </h1>
        <p className="text-slate-400">
          The world's first marketing capability travel agency.
        </p>
      </div>

      {/* Main Booking Engine */}
      <Hero />

      {/* Profile-Aware Packages */}
      <div className="bg-slate-50 dark:bg-transparent rounded-2xl p-6 md:p-8">
        {profile ? (
          <div className="text-xs text-slate-400 mb-2 uppercase tracking-wider font-semibold">
            Based on your profile as a <span className="text-cyan-400">{profile.role || 'Marketer'}</span> at a <span className="text-cyan-400">{profile.companySize || 'Growing'}</span> company.
            <span className="float-right opacity-50">FILTERED BY PROFILE</span>
          </div>
        ) : null}
        <PackageDeals />
      </div>

      {/* Footer / Trust Signals */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center border-t border-slate-800 pt-8 opacity-60">
        <div>
          <div className="text-2xl font-bold text-white">500+</div>
          <div className="text-xs text-slate-500">Marketing Destinations</div>
        </div>
        <div>
          <div className="text-2xl font-bold text-white">10k+</div>
          <div className="text-xs text-slate-500">Flight Plans Generated</div>
        </div>
        <div>
          <div className="text-2xl font-bold text-white">AI</div>
          <div className="text-xs text-slate-500">Powered Navigation</div>
        </div>
        <div>
          <div className="text-2xl font-bold text-white">24/7</div>
          <div className="text-xs text-slate-500">Auto-Pilot Support</div>
        </div>
      </div>
    </div>
  );
};