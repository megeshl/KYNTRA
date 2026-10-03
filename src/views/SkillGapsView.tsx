import React, { useState, useEffect } from 'react';
import {
  Radar,
  AlertTriangle,
  Users,
  Briefcase,
  Sparkles,
  ArrowRight,
  TrendingUp,
  RefreshCw,
  PlusCircle,
  Share2
} from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import { fetchSkillGaps, analyzeSkillGaps } from '../api/client';
import { SkillGap } from '../types';

interface SkillGapsViewProps {
  onNavigateToGraph: () => void;
  onNavigateToAssemble: () => void;
}

export const SkillGapsView: React.FC<SkillGapsViewProps> = ({
  onNavigateToGraph,
  onNavigateToAssemble
}) => {
  const [gaps, setGaps] = useState<SkillGap[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [createdWorkshop, setCreatedWorkshop] = useState<string | null>(null);

  useEffect(() => {
    loadGaps();
  }, []);

  const loadGaps = async () => {
    setIsLoading(true);
    try {
      const data = await fetchSkillGaps();
      setGaps(data);
    } catch (e) {
      console.error(e);
    } finally {
      setIsLoading(false);
    }
  };

  const chartData = gaps.map(g => ({
    name: g.skillName,
    Demand: g.demandScore,
    Supply: g.supplyScore,
    gap: g.gapScore
  }));

  return (
    <div className="space-y-6 pb-16 animate-fade-in">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-2 border-b border-white/[0.06]">
        <div>
          <div className="flex items-center space-x-2 text-amber-400 text-xs font-mono mb-1">
            <Radar className="w-4 h-4" />
            <span className="font-semibold uppercase tracking-wider">FEATURE 6: TALENT BOTTLENECK RADAR</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold text-white font-mono tracking-tight">
            SKILL GAP RADAR
          </h1>
          <p className="text-xs sm:text-sm text-zinc-400 mt-1">
            Real-time balance of capability demand from active project initiatives versus verified community practitioner supply.
          </p>
        </div>

        <button
          onClick={loadGaps}
          className="px-3.5 py-2 rounded-xl border border-white/[0.1] bg-white/[0.03] hover:bg-white/[0.08] text-white font-medium text-xs flex items-center space-x-1.5 transition-colors font-mono"
        >
          <RefreshCw className={`w-3.5 h-3.5 ${isLoading ? 'animate-spin' : ''}`} />
          <span>Recalculate Radar</span>
        </button>
      </div>

      {/* Featured Alert: Computer Vision Critical Shortage */}
      <div className="p-5 sm:p-6 rounded-2xl border border-amber-500/40 bg-gradient-to-r from-amber-950/20 via-[#0f121d] to-[#0a0d16] flex flex-col md:flex-row md:items-center justify-between gap-6 shadow-xl">
        <div className="flex items-start space-x-4">
          <div className="w-12 h-12 rounded-2xl bg-amber-500/20 border border-amber-500/30 flex items-center justify-center shrink-0">
            <AlertTriangle className="w-6 h-6 text-amber-400" />
          </div>
          <div>
            <div className="flex items-center space-x-2">
              <span className="text-xs font-mono uppercase tracking-wider text-amber-400 font-bold">
                CRITICAL COMMUNITY SHORTAGE DETECTED
              </span>
              <span className="text-zinc-500">·</span>
              <span className="text-xs font-mono text-zinc-400">Gap Score: 84/100</span>
            </div>
            <h2 className="text-lg font-bold text-white mt-1">
              Computer Vision: 17 projects require it vs 6 verified experts
            </h2>
            <p className="text-xs text-zinc-300 mt-1 max-w-xl leading-relaxed">
              17 active projects currently require Computer Vision while only 6 active community members have verified expertise. 3 are already committed to active squads.
            </p>
          </div>
        </div>

        <div className="flex flex-wrap gap-2 shrink-0">
          <button
            onClick={() => onNavigateToGraph()}
            className="px-4 py-2.5 rounded-xl border border-white/[0.1] bg-white/[0.04] hover:bg-white/[0.08] text-white text-xs font-medium font-mono flex items-center space-x-1.5 transition-colors"
          >
            <Users className="w-3.5 h-3.5 text-cyan-400" />
            <span>Discover Experts</span>
          </button>
          <button
            onClick={() => setCreatedWorkshop('Computer Vision Masterclass')}
            className="px-5 py-2.5 rounded-xl bg-amber-400 hover:bg-amber-300 text-black font-semibold text-xs font-mono flex items-center space-x-1.5 transition-all shadow-md shadow-amber-500/20"
          >
            <PlusCircle className="w-3.5 h-3.5" />
            <span>Create Workshop</span>
          </button>
        </div>
      </div>

      {createdWorkshop && (
        <div className="p-4 rounded-xl border border-emerald-500/40 bg-emerald-950/20 text-xs font-mono text-emerald-300 flex items-center justify-between">
          <span>Created community workshop: "Computer Vision & Medical AI Masterclass" scheduled on calendar.</span>
          <button onClick={() => setCreatedWorkshop(null)} className="text-zinc-400 hover:text-white">✕</button>
        </div>
      )}

      {/* Chart: Demand vs Supply */}
      <div className="p-6 rounded-2xl border border-white/[0.08] bg-[#0c101c]">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h3 className="text-sm font-bold text-white font-mono">Demand vs Supply Comparison</h3>
            <p className="text-xs text-zinc-400">Comparing active project requirements against verified practitioner supply</p>
          </div>
        </div>

        <div className="h-64 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={chartData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
              <XAxis dataKey="name" stroke="#64748b" fontSize={11} tickLine={false} />
              <YAxis stroke="#64748b" fontSize={11} tickLine={false} />
              <Tooltip
                contentStyle={{ backgroundColor: '#090d16', borderColor: '#334155', borderRadius: '8px', fontSize: '12px' }}
                itemStyle={{ color: '#e2e8f0' }}
              />
              <Legend wrapperStyle={{ fontSize: '12px', paddingTop: '10px' }} />
              <Bar dataKey="Demand" fill="#f59e0b" radius={[4, 4, 0, 0]} name="Project Demand" />
              <Bar dataKey="Supply" fill="#00f0ff" radius={[4, 4, 0, 0]} name="Expert Supply" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Breakdown Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {gaps.map((gap) => (
          <div
            key={gap.id}
            className="p-5 rounded-2xl border border-white/[0.08] bg-[#0c101c] hover:border-white/[0.15] transition-all flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-bold text-white font-mono">{gap.skillName}</span>
                <span
                  className={`text-[9px] font-mono px-2 py-0.5 rounded ${
                    gap.gapLevel === 'CRITICAL'
                      ? 'bg-red-500/20 text-red-300 border border-red-500/30'
                      : gap.gapLevel === 'HIGH'
                      ? 'bg-amber-500/20 text-amber-300 border border-amber-500/30'
                      : 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/30'
                  }`}
                >
                  {gap.gapLevel} GAP
                </span>
              </div>

              <div className="grid grid-cols-2 gap-2 my-3 p-2.5 rounded-xl bg-black/40 border border-white/[0.04] text-center font-mono">
                <div>
                  <div className="text-[10px] text-zinc-500">Project Demand</div>
                  <div className="text-base font-bold text-amber-400">{gap.demandScore} projects</div>
                </div>
                <div>
                  <div className="text-[10px] text-zinc-500">Verified Supply</div>
                  <div className="text-base font-bold text-cyan-400">{gap.supplyScore} experts</div>
                </div>
              </div>

              <p className="text-xs text-zinc-400 leading-relaxed">
                {gap.explanation}
              </p>
            </div>

            <div className="mt-4 pt-3 border-t border-white/[0.06] flex items-center justify-between text-xs">
              <button
                onClick={onNavigateToGraph}
                className="text-cyan-400 hover:text-cyan-300 font-mono flex items-center space-x-1"
              >
                <span>Discover Experts</span>
                <ArrowRight className="w-3 h-3" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
