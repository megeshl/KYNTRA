import React, { useState, useEffect } from 'react';
import {
  Sparkles,
  CheckCircle2,
  Send,
  Users2,
  RefreshCw,
  Share2,
  ArrowRight,
  Filter
} from 'lucide-react';
import { fetchOpportunities, runOpportunityAnalysis, sendCollaborationInvite } from '../api/client';
import { Opportunity } from '../types';

interface OpportunitiesViewProps {
  onNavigateToAssemble?: () => void;
  onNavigateToGraph?: () => void;
}

export const OpportunitiesView: React.FC<OpportunitiesViewProps> = ({
  onNavigateToAssemble,
  onNavigateToGraph
}) => {
  const [opportunities, setOpportunities] = useState<Opportunity[]>([]);
  const [filterType, setFilterType] = useState<string>('ALL');
  const [isLoading, setIsLoading] = useState(true);
  const [invitedOppId, setInvitedOppId] = useState<string | null>(null);

  useEffect(() => {
    loadOpportunities();
  }, []);

  const loadOpportunities = async () => {
    setIsLoading(true);
    try {
      const data = await fetchOpportunities();
      setOpportunities(data);
    } catch (e) {
      console.error(e);
    } finally {
      setIsLoading(false);
    }
  };

  const handleReanalyze = async () => {
    setIsLoading(true);
    try {
      const res = await runOpportunityAnalysis();
      if (res.opportunities) {
        setOpportunities(res.opportunities);
      }
    } catch (e) {
      console.error(e);
    } finally {
      setIsLoading(false);
    }
  };

  const handleInvite = async (oppId: string, targetUserId: string, projId?: string) => {
    try {
      await sendCollaborationInvite(targetUserId, projId, 'Surfaced through KYNTRA Hidden Opportunity Engine.');
      setInvitedOppId(oppId);
    } catch (e) {
      console.error(e);
    }
  };

  const filtered = filterType === 'ALL'
    ? opportunities
    : opportunities.filter(o => o.type === filterType);

  return (
    <div className="space-y-6 pb-16 animate-fade-in">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-2 border-b border-white/[0.06]">
        <div>
          <div className="flex items-center space-x-2 text-cyan-400 text-xs font-mono mb-1">
            <Sparkles className="w-4 h-4" />
            <span className="font-semibold uppercase tracking-wider">FEATURE 2: HIDDEN OPPORTUNITY ENGINE</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold text-white font-mono tracking-tight">
            SURFACED OPPORTUNITIES
          </h1>
          <p className="text-xs sm:text-sm text-zinc-400 mt-1">
            Latent collaboration synergies detected across skill compatibility, project requirements, and availability states.
          </p>
        </div>

        <button
          onClick={handleReanalyze}
          className="px-4 py-2 rounded-xl bg-cyan-400 hover:bg-cyan-300 text-black font-semibold text-xs font-mono flex items-center space-x-2 transition-all shadow-md shadow-cyan-500/20"
        >
          <RefreshCw className={`w-3.5 h-3.5 ${isLoading ? 'animate-spin' : ''}`} />
          <span>Run Analysis</span>
        </button>
      </div>

      {/* Filter Chips */}
      <div className="flex flex-wrap items-center gap-1.5 text-xs font-mono">
        {['ALL', 'COLLABORATION', 'TEAM_FORMATION', 'MENTORSHIP', 'PROJECT_OVERLAP', 'SKILL_GAP'].map((type) => (
          <button
            key={type}
            onClick={() => setFilterType(type)}
            className={`px-3 py-1 rounded-lg transition-colors ${
              filterType === type
                ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40'
                : 'text-zinc-400 hover:text-white hover:bg-white/[0.04]'
            }`}
          >
            {type.replace('_', ' ')}
          </button>
        ))}
      </div>

      {/* Opportunities Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {filtered.map((opp) => (
          <div
            key={opp.id}
            className="p-5 rounded-2xl border border-white/[0.08] bg-[#0c101c] hover:border-cyan-500/30 transition-all flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-cyan-950/40 border border-cyan-500/30 text-cyan-300">
                  {opp.type}
                </span>
                <span className="text-xs font-mono text-cyan-400 font-semibold">
                  Match Score: {(opp.score * 100).toFixed(0)}%
                </span>
              </div>

              <h3 className="text-base font-bold text-white font-mono mt-1">
                {opp.title}
              </h3>
              <p className="text-xs text-zinc-300 mt-1 leading-relaxed">
                {opp.description}
              </p>

              {/* Explainable Reasons */}
              <div className="mt-3 p-3 rounded-xl bg-black/40 border border-white/[0.04]">
                <div className="text-[9px] font-mono uppercase tracking-wider text-zinc-500 mb-1">
                  Engine Match Reasons:
                </div>
                <ul className="space-y-1 text-[11px] text-zinc-300">
                  {opp.reasons.map((r, rIdx) => (
                    <li key={rIdx} className="flex items-start space-x-1.5">
                      <CheckCircle2 className="w-3 h-3 text-cyan-400 shrink-0 mt-0.5" />
                      <span>{r}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="mt-4 pt-3 border-t border-white/[0.06] flex items-center justify-between">
              {onNavigateToGraph && (
                <button
                  onClick={onNavigateToGraph}
                  className="text-xs font-mono text-zinc-400 hover:text-white flex items-center space-x-1"
                >
                  <Share2 className="w-3 h-3" />
                  <span>Inspect in Graph</span>
                </button>
              )}

              {invitedOppId === opp.id ? (
                <span className="text-xs text-emerald-400 font-mono flex items-center space-x-1">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  <span>Action Initiated</span>
                </span>
              ) : (
                <button
                  onClick={() => handleInvite(opp.id, opp.memberUserIds[1] || opp.memberUserIds[0], opp.relatedProjectId)}
                  className="px-3.5 py-1.5 rounded-lg bg-cyan-400 hover:bg-cyan-300 text-black font-semibold text-xs font-mono transition-colors flex items-center space-x-1"
                >
                  <Send className="w-3 h-3" />
                  <span>Activate Opportunity</span>
                </button>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
