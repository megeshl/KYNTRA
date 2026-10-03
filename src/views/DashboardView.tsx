import React, { useState } from 'react';
import {
  Sparkles,
  ArrowRight,
  Users2,
  Radar,
  GitMerge,
  Send,
  CheckCircle2,
  AlertTriangle,
  Clock,
  Layers,
  ChevronRight,
  TrendingUp,
  Activity as ActivityIcon
} from 'lucide-react';
import { Opportunity, Activity, User } from '../types';
import { sendCollaborationInvite } from '../api/client';

interface DashboardViewProps {
  onNavigate: (view: string) => void;
  featuredOpportunity: Opportunity | null;
  pulseData: any;
  activities: Activity[];
}

export const DashboardView: React.FC<DashboardViewProps> = ({
  onNavigate,
  featuredOpportunity,
  pulseData,
  activities
}) => {
  const [invited, setInvited] = useState(false);
  const [dismissed, setDismissed] = useState(false);

  const handleInvitePriya = async () => {
    try {
      await sendCollaborationInvite('u-priya', 'proj-health', 'Invitation to lead Computer Vision diagnostic module for AI Healthcare Assistant.');
      setInvited(true);
    } catch (e) {
      console.error(e);
      setInvited(true);
    }
  };

  return (
    <div className="space-y-6 pb-12 animate-fade-in">
      {/* Top Welcome Greeting */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-2 border-b border-white/[0.06]">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-white font-mono tracking-tight">
            GOOD EVENING, ALEX
          </h1>
          <p className="text-xs sm:text-sm text-zinc-400 mt-1">
            Here is what KYNTRA's Community Intelligence Graph discovered for you today.
          </p>
        </div>

        <div className="flex items-center space-x-2">
          <button
            onClick={() => onNavigate('assemble')}
            className="px-4 py-2 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-black font-semibold text-xs flex items-center space-x-2 transition-all shadow-lg shadow-cyan-500/20"
          >
            <Users2 className="w-4 h-4" />
            <span>Assemble Team</span>
          </button>
          <button
            onClick={() => onNavigate('lens')}
            className="px-3.5 py-2 rounded-xl border border-white/[0.1] bg-white/[0.03] hover:bg-white/[0.08] text-white font-medium text-xs transition-colors"
          >
            Scan Lens
          </button>
        </div>
      </div>

      {/* FEATURED: HIDDEN OPPORTUNITY DETECTED */}
      {!dismissed && featuredOpportunity && (
        <section className="relative rounded-2xl border border-cyan-500/40 bg-gradient-to-br from-[#0e1628] via-[#0b101c] to-[#070b14] p-5 sm:p-6 shadow-2xl overflow-hidden">
          <div className="absolute top-0 right-0 w-80 h-80 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />

          <div className="relative z-10">
            <div className="flex flex-wrap items-center justify-between gap-2 mb-3">
              <div className="flex items-center space-x-2">
                <span className="flex h-2 w-2 rounded-full bg-cyan-400 animate-ping" />
                <span className="text-[11px] font-mono uppercase tracking-wider text-cyan-400 font-semibold">
                  HIDDEN OPPORTUNITY DETECTED
                </span>
                <span className="text-zinc-600">/</span>
                <span className="text-xs text-zinc-400 font-mono">Recommendation Relevance: 96%</span>
              </div>
              <span className="text-[11px] font-mono text-zinc-400">
                Target: AI Healthcare Assistant
              </span>
            </div>

            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 my-4">
              <div className="flex items-start space-x-4">
                <img
                  src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&auto=format&fit=crop&q=80"
                  alt="Priya Sharma"
                  className="w-16 h-16 rounded-2xl border-2 border-cyan-400/50 object-cover shadow-lg"
                />
                <div>
                  <h2 className="text-lg font-bold text-white hover:text-cyan-300 transition-colors">
                    Priya Sharma could solve your Computer Vision capability gap
                  </h2>
                  <p className="text-xs text-zinc-300 mt-1 max-w-2xl leading-relaxed">
                    Priya has 98% verified Computer Vision mastery in medical imaging and is currently AVAILABLE with no active project allocation.
                  </p>

                  <div className="flex flex-wrap items-center gap-x-3 gap-y-1 mt-2 text-[11px] text-zinc-400 font-mono">
                    <span className="text-cyan-300 font-medium">Computer Vision (98%)</span>
                    <span>·</span>
                    <span className="text-violet-300">Medical AI</span>
                    <span>·</span>
                    <span className="text-emerald-400">Status: AVAILABLE</span>
                    <span>·</span>
                    <span>Boston, MA</span>
                  </div>
                </div>
              </div>

              {/* Action buttons */}
              <div className="flex flex-row md:flex-col items-center gap-2 shrink-0">
                {invited ? (
                  <div className="flex items-center space-x-1.5 px-4 py-2.5 rounded-xl bg-emerald-500/20 border border-emerald-500/40 text-emerald-300 text-xs font-semibold">
                    <CheckCircle2 className="w-4 h-4" />
                    <span>Invitation Sent</span>
                  </div>
                ) : (
                  <button
                    onClick={handleInvitePriya}
                    className="w-full sm:w-auto px-5 py-2.5 rounded-xl bg-cyan-400 hover:bg-cyan-300 text-black font-semibold text-xs flex items-center justify-center space-x-2 transition-all shadow-md shadow-cyan-500/20"
                  >
                    <Send className="w-3.5 h-3.5" />
                    <span>Invite to Squad</span>
                  </button>
                )}

                <div className="flex items-center space-x-2 w-full">
                  <button
                    onClick={() => onNavigate('assemble')}
                    className="w-full px-3 py-2 rounded-xl border border-white/[0.1] bg-white/[0.04] hover:bg-white/[0.08] text-white text-xs font-medium transition-colors"
                  >
                    Assemble Team
                  </button>
                  <button
                    onClick={() => setDismissed(true)}
                    className="px-3 py-2 rounded-xl text-zinc-500 hover:text-zinc-300 text-xs transition-colors"
                  >
                    Dismiss
                  </button>
                </div>
              </div>
            </div>

            {/* AI Explanation Accordion */}
            <div className="p-3.5 rounded-xl border border-white/[0.06] bg-black/30 mt-4">
              <div className="text-[10px] font-mono uppercase tracking-wider text-zinc-400 mb-2">
                Why was this match surfaced?
              </div>
              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-zinc-300">
                <li className="flex items-center space-x-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
                  <span>Priya covers project's highest-priority missing capability: Computer Vision</span>
                </li>
                <li className="flex items-center space-x-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
                  <span>Both share explicit interest focus on Healthcare AI & diagnostic imaging</span>
                </li>
                <li className="flex items-center space-x-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
                  <span>Alex's project "AI Healthcare Assistant" has open recruiting status</span>
                </li>
                <li className="flex items-center space-x-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
                  <span>Priya has availability status marked as AVAILABLE</span>
                </li>
              </ul>
            </div>
          </div>
        </section>
      )}

      {/* COMMUNITY PULSE SNAPSHOT */}
      <section className="grid grid-cols-2 sm:grid-cols-5 gap-3">
        <div
          onClick={() => onNavigate('graph')}
          className="p-4 rounded-xl border border-white/[0.08] bg-[#0c101a] hover:border-cyan-500/30 transition-all cursor-pointer"
        >
          <div className="text-[10px] uppercase font-mono tracking-wider text-zinc-400">Total Members</div>
          <div className="text-xl sm:text-2xl font-bold font-mono text-white mt-1">1,248</div>
          <div className="text-[10px] text-emerald-400 mt-1 flex items-center space-x-1">
            <TrendingUp className="w-3 h-3" />
            <span>+14 this week</span>
          </div>
        </div>

        <div
          onClick={() => onNavigate('graph')}
          className="p-4 rounded-xl border border-white/[0.08] bg-[#0c101a] hover:border-violet-500/30 transition-all cursor-pointer"
        >
          <div className="text-[10px] uppercase font-mono tracking-wider text-zinc-400">Active Projects</div>
          <div className="text-xl sm:text-2xl font-bold font-mono text-white mt-1">326</div>
          <div className="text-[10px] text-zinc-400 mt-1">10 demo clusters</div>
        </div>

        <div
          onClick={() => onNavigate('opportunities')}
          className="p-4 rounded-xl border border-white/[0.08] bg-[#0c101a] hover:border-cyan-500/30 transition-all cursor-pointer"
        >
          <div className="text-[10px] uppercase font-mono tracking-wider text-zinc-400">Synergy Matches</div>
          <div className="text-xl sm:text-2xl font-bold font-mono text-cyan-400 mt-1">84</div>
          <div className="text-[10px] text-cyan-300 mt-1">Avg 91% score</div>
        </div>

        <div
          onClick={() => onNavigate('skill-gaps')}
          className="p-4 rounded-xl border border-white/[0.08] bg-[#0c101a] hover:border-amber-500/30 transition-all cursor-pointer"
        >
          <div className="text-[10px] uppercase font-mono tracking-wider text-zinc-400">Skill Gaps</div>
          <div className="text-xl sm:text-2xl font-bold font-mono text-amber-400 mt-1">17</div>
          <div className="text-[10px] text-amber-300/80 mt-1">Computer Vision Critical</div>
        </div>

        <div
          onClick={() => onNavigate('collaborations')}
          className="col-span-2 sm:col-span-1 p-4 rounded-xl border border-white/[0.08] bg-[#0c101a] hover:border-emerald-500/30 transition-all cursor-pointer"
        >
          <div className="text-[10px] uppercase font-mono tracking-wider text-zinc-400">Active Collabs</div>
          <div className="text-xl sm:text-2xl font-bold font-mono text-emerald-400 mt-1">23</div>
          <div className="text-[10px] text-emerald-300 mt-1">86% retention rate</div>
        </div>
      </section>

      {/* TWO COLUMNS: KYNTRA ASSEMBLE BANNER & PULSE INSIGHTS */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left 2 Cols: Assemble Callout & Insight Cards */}
        <div className="lg:col-span-2 space-y-4">
          {/* Quick Assemble Card */}
          <div className="rounded-2xl border border-white/[0.08] bg-gradient-to-r from-violet-950/20 via-[#0e121e] to-cyan-950/20 p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="space-y-1">
              <div className="flex items-center space-x-2 text-violet-400 text-xs font-mono">
                <Users2 className="w-4 h-4" />
                <span className="font-semibold uppercase tracking-wider">KYNTRA ASSEMBLE</span>
              </div>
              <h3 className="text-base font-bold text-white">
                Build a 4-person squad from project requirements
              </h3>
              <p className="text-xs text-zinc-400 max-w-lg">
                Input your project goals. TeamAssemblyEngine searches candidates, calculates coverage (96%), and generates explainable recommendations.
              </p>
            </div>
            <button
              onClick={() => onNavigate('assemble')}
              className="px-5 py-2.5 rounded-xl bg-cyan-400 hover:bg-cyan-300 text-black font-semibold text-xs shrink-0 flex items-center justify-center space-x-1.5 transition-all shadow-md shadow-cyan-500/20"
            >
              <span>Launch Assemble</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Pulse Insights */}
          <div className="space-y-2.5">
            <div className="text-[11px] font-mono uppercase tracking-wider text-zinc-400">
              Community Pulse Insights
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {(pulseData?.insights || []).map((ins: any) => (
                <div
                  key={ins.id}
                  onClick={() => {
                    if (ins.actionLink === '/skill-gaps') onNavigate('skill-gaps');
                    else if (ins.actionLink === '/projects') onNavigate('collisions');
                    else if (ins.actionLink === '/assemble') onNavigate('assemble');
                    else if (ins.actionLink === '/mentors') onNavigate('mentors');
                  }}
                  className="p-3.5 rounded-xl border border-white/[0.06] bg-[#0c101a] hover:border-white/[0.15] transition-all cursor-pointer group"
                >
                  <div className="flex items-center justify-between text-xs font-semibold text-white group-hover:text-cyan-300 transition-colors">
                    <span>{ins.title}</span>
                    <ChevronRight className="w-3.5 h-3.5 text-zinc-500 group-hover:text-cyan-400 transition-colors" />
                  </div>
                  <p className="text-[11px] text-zinc-400 mt-1 leading-relaxed">
                    {ins.subtitle}
                  </p>
                  <div className="mt-2 text-[10px] font-mono text-cyan-400 flex items-center space-x-1">
                    <span>{ins.actionText}</span>
                    <ArrowRight className="w-2.5 h-2.5" />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Col: Live Activity Stream */}
        <div className="space-y-3">
          <div className="flex items-center justify-between text-[11px] font-mono uppercase tracking-wider text-zinc-400">
            <span className="flex items-center space-x-1.5">
              <ActivityIcon className="w-3.5 h-3.5 text-cyan-400" />
              <span>Real-Time Activity</span>
            </span>
            <span className="text-zinc-600">Live Socket.IO</span>
          </div>

          <div className="p-4 rounded-2xl border border-white/[0.08] bg-[#0c101a] space-y-3 max-h-[460px] overflow-y-auto">
            {activities.length === 0 ? (
              <div className="text-xs text-zinc-500 text-center py-6">
                Waiting for community signals...
              </div>
            ) : (
              activities.map((act) => (
                <div key={act.id} className="text-xs pb-3 border-b border-white/[0.04] last:border-none last:pb-0">
                  <div className="flex items-center space-x-2 mb-1">
                    <img
                      src={act.userAvatar}
                      alt={act.userName}
                      className="w-5 h-5 rounded-full object-cover border border-white/10"
                    />
                    <span className="font-semibold text-white truncate">{act.userName}</span>
                    <span className="text-[10px] text-zinc-500 font-mono">
                      {new Date(act.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </span>
                  </div>
                  <p className="text-[11px] text-zinc-300 leading-relaxed pl-7">
                    {act.description}
                  </p>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
