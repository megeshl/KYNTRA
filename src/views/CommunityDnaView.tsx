import React, { useState, useEffect } from 'react';
import {
  Dna,
  TrendingUp,
  Activity,
  Layers,
  Sparkles,
  Users2,
  FolderGit2,
  Share2,
  Compass
} from 'lucide-react';
import { fetchPulse, fetchDna } from '../api/client';

export const CommunityDnaView: React.FC = () => {
  const [pulse, setPulse] = useState<any | null>(null);
  const [dna, setDna] = useState<any | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    setIsLoading(true);
    try {
      const [p, d] = await Promise.all([fetchPulse(), fetchDna()]);
      setPulse(p);
      setDna(d);
    } catch (e) {
      console.error(e);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="space-y-6 pb-16 animate-fade-in">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-2 border-b border-white/[0.06]">
        <div>
          <div className="flex items-center space-x-2 text-cyan-400 text-xs font-mono mb-1">
            <Dna className="w-4 h-4" />
            <span className="font-semibold uppercase tracking-wider">FEATURE 10: COMMUNITY DNA & PULSE</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold text-white font-mono tracking-tight">
            COMMUNITY INTELLIGENCE PULSE
          </h1>
          <p className="text-xs sm:text-sm text-zinc-400 mt-1">
            Macro-level algorithmic analysis of collective community capabilities, velocity trends, and systemic innovation capacity.
          </p>
        </div>
      </div>

      {/* High-level KPIs */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
        <div className="p-4 rounded-xl border border-white/[0.08] bg-[#0c101c]">
          <div className="text-[10px] uppercase font-mono text-zinc-400">Total Talent Pool</div>
          <div className="text-xl sm:text-2xl font-bold font-mono text-white mt-1">1,248</div>
          <div className="text-[10px] text-emerald-400 mt-1">30 seeded nodes</div>
        </div>

        <div className="p-4 rounded-xl border border-white/[0.08] bg-[#0c101c]">
          <div className="text-[10px] uppercase font-mono text-zinc-400">Active Initiatives</div>
          <div className="text-xl sm:text-2xl font-bold font-mono text-white mt-1">326</div>
          <div className="text-[10px] text-zinc-400 mt-1">10 primary domains</div>
        </div>

        <div className="p-4 rounded-xl border border-white/[0.08] bg-[#0c101c]">
          <div className="text-[10px] uppercase font-mono text-zinc-400">Synergy Matches</div>
          <div className="text-xl sm:text-2xl font-bold font-mono text-cyan-400 mt-1">84</div>
          <div className="text-[10px] text-cyan-300 mt-1">91% avg relevance</div>
        </div>

        <div className="p-4 rounded-xl border border-white/[0.08] bg-[#0c101c]">
          <div className="text-[10px] uppercase font-mono text-zinc-400">Active Skill Gaps</div>
          <div className="text-xl sm:text-2xl font-bold font-mono text-amber-400 mt-1">17</div>
          <div className="text-[10px] text-amber-300 mt-1">Computer Vision #1</div>
        </div>

        <div className="p-4 rounded-xl border border-white/[0.08] bg-[#0c101c]">
          <div className="text-[10px] uppercase font-mono text-zinc-400">Network Density</div>
          <div className="text-xl sm:text-2xl font-bold font-mono text-violet-400 mt-1">
            {dna?.metrics?.networkDensity || '0.74'}
          </div>
          <div className="text-[10px] text-violet-300 mt-1">High cohesion</div>
        </div>

        <div className="p-4 rounded-xl border border-white/[0.08] bg-[#0c101c]">
          <div className="text-[10px] uppercase font-mono text-zinc-400">Collab Success</div>
          <div className="text-xl sm:text-2xl font-bold font-mono text-emerald-400 mt-1">
            {dna?.metrics?.activeCollaborationRate || '86%'}
          </div>
          <div className="text-[10px] text-emerald-300 mt-1">Peer retention</div>
        </div>
      </div>

      {/* Grid: Top Emerging Skills & Unmet Needs */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Top Emerging Skills */}
        <div className="p-5 sm:p-6 rounded-2xl border border-white/[0.08] bg-[#0c101c]">
          <div className="flex items-center space-x-2 text-cyan-400 text-xs font-mono mb-3">
            <TrendingUp className="w-4 h-4" />
            <span className="font-semibold uppercase tracking-wider">Top Emerging Skills & Demand</span>
          </div>

          <div className="space-y-3">
            {(dna?.topEmergingSkills || []).map((sk: any, idx: number) => (
              <div key={idx} className="flex items-center justify-between p-3 rounded-xl bg-black/40 border border-white/[0.04]">
                <div>
                  <div className="text-xs font-bold text-white font-mono">{sk.name}</div>
                  <div className="text-[10px] text-zinc-400">{sk.category} · {sk.demand} active project requests</div>
                </div>
                <div className="text-right">
                  <span className="text-xs font-bold font-mono text-cyan-400">{sk.growth}</span>
                  <div className="text-[9px] text-zinc-500 font-mono">Month-over-month</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Unmet Community Needs */}
        <div className="p-5 sm:p-6 rounded-2xl border border-white/[0.08] bg-[#0c101c]">
          <div className="flex items-center space-x-2 text-amber-400 text-xs font-mono mb-3">
            <Compass className="w-4 h-4" />
            <span className="font-semibold uppercase tracking-wider">Unmet Community Capabilities</span>
          </div>

          <div className="space-y-3">
            {(dna?.unmetCommunityNeeds || []).map((need: any, idx: number) => (
              <div key={idx} className="p-3.5 rounded-xl bg-black/40 border border-white/[0.04]">
                <div className="flex items-center justify-between text-xs font-bold font-mono text-white mb-1">
                  <span>{need.domain}</span>
                  <span className="text-[9px] px-2 py-0.5 rounded bg-amber-500/10 text-amber-400 border border-amber-500/20">
                    {need.gap} Gap
                  </span>
                </div>
                <div className="text-xs text-zinc-400">
                  Target Bottleneck: <span className="text-zinc-200">{need.need}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Collaboration Hotspots */}
      <div className="p-6 rounded-2xl border border-white/[0.08] bg-[#0c101c]">
        <div className="text-xs font-mono uppercase tracking-wider text-zinc-400 mb-3">
          Cross-Project Collaboration Hotspots
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {(dna?.collaborationHotspots || []).map((spot: any, idx: number) => (
            <div key={idx} className="p-4 rounded-xl bg-black/40 border border-white/[0.05]">
              <div className="text-xs font-bold text-white font-mono mb-1">{spot.hub}</div>
              <div className="text-[11px] text-cyan-400 font-mono">{spot.activeProjects} active projects</div>
              <div className="text-[10px] text-zinc-500 mt-1">{spot.connectedMembers} connected multidisciplinary members</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
