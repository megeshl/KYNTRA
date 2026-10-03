import React, { useState } from 'react';
import confetti from 'canvas-confetti';
import {
  Users2,
  Sparkles,
  CheckCircle2,
  ArrowRight,
  ShieldCheck,
  RefreshCw,
  Plus,
  X,
  AlertCircle,
  Share2,
  Calendar,
  Send
} from 'lucide-react';
import { assembleTeamApi, formTeamApi } from '../api/client';
import { TeamAssemblyResponse, CandidateResult } from '../types';

interface AssembleViewProps {
  onNavigate: (view: string) => void;
  prefilledSkills?: string[];
  prefilledProjectName?: string;
}

export const AssembleView: React.FC<AssembleViewProps> = ({
  onNavigate,
  prefilledSkills,
  prefilledProjectName
}) => {
  const [projectName, setProjectName] = useState(prefilledProjectName || 'AI Healthcare Assistant');
  const [requiredSkills, setRequiredSkills] = useState<string[]>(
    prefilledSkills && prefilledSkills.length > 0
      ? prefilledSkills
      : ['Computer Vision', 'Machine Learning', 'Backend', 'UI/UX']
  );
  const [newSkillInput, setNewSkillInput] = useState('');
  const [isAssembling, setIsAssembling] = useState(false);
  const [isForming, setIsForming] = useState(false);
  const [assemblyResult, setAssemblyResult] = useState<TeamAssemblyResponse | null>(null);
  const [formedTeam, setFormedTeam] = useState<any | null>(null);

  // Default candidates for initial view
  const handleAssemble = async () => {
    setIsAssembling(true);
    try {
      const result = await assembleTeamApi(projectName, requiredSkills);
      setAssemblyResult(result);
    } catch (err) {
      console.error(err);
    } finally {
      setIsAssembling(false);
    }
  };

  const handleFormTeam = async () => {
    if (!assemblyResult) return;
    setIsForming(true);
    try {
      const res = await formTeamApi({
        teamName: assemblyResult.teamName || 'AI Healthcare Builders',
        projectName: assemblyResult.projectName || projectName,
        members: assemblyResult.members
      });

      setFormedTeam(res);

      // Trigger celebratory confetti
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 }
      });
    } catch (err) {
      console.error(err);
    } finally {
      setIsForming(false);
    }
  };

  const addSkill = () => {
    if (newSkillInput.trim() && !requiredSkills.includes(newSkillInput.trim())) {
      setRequiredSkills([...requiredSkills, newSkillInput.trim()]);
      setNewSkillInput('');
    }
  };

  const removeSkill = (skill: string) => {
    setRequiredSkills(requiredSkills.filter(s => s !== skill));
  };

  return (
    <div className="space-y-6 pb-16 animate-fade-in">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-2 border-b border-white/[0.06]">
        <div>
          <div className="flex items-center space-x-2 text-cyan-400 text-xs font-mono mb-1">
            <Users2 className="w-4 h-4" />
            <span className="font-semibold uppercase tracking-wider">PRIMARY DEMO FEATURE</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold text-white font-mono tracking-tight">
            KYNTRA ASSEMBLE
          </h1>
          <p className="text-xs sm:text-sm text-zinc-400 mt-1">
            Autonomous squad builder extracting requirements, optimizing capability coverage, and eliminating redundant skill overlaps.
          </p>
        </div>

        <div className="flex items-center space-x-2">
          <button
            onClick={() => onNavigate('graph')}
            className="px-3 py-1.5 rounded-lg border border-white/[0.1] hover:bg-white/[0.05] text-zinc-300 text-xs flex items-center space-x-1.5 transition-colors font-mono"
          >
            <Share2 className="w-3.5 h-3.5 text-cyan-400" />
            <span>View in Graph</span>
          </button>
        </div>
      </div>

      {/* Assembly Control Panel */}
      <div className="p-5 sm:p-6 rounded-2xl border border-white/[0.08] bg-[#0c101c]">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Project Name */}
          <div>
            <label className="block text-[11px] font-mono uppercase tracking-wider text-zinc-400 mb-1.5">
              Project Initiative
            </label>
            <input
              type="text"
              value={projectName}
              onChange={(e) => setProjectName(e.target.value)}
              className="w-full px-4 py-2.5 rounded-xl border border-white/[0.1] bg-black/40 text-sm text-white focus:outline-none focus:border-cyan-500 font-medium"
            />
          </div>

          {/* Required Skills Picker */}
          <div>
            <label className="block text-[11px] font-mono uppercase tracking-wider text-zinc-400 mb-1.5">
              Target Capability Requirements
            </label>
            <div className="flex items-center space-x-2">
              <input
                type="text"
                value={newSkillInput}
                onChange={(e) => setNewSkillInput(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && addSkill()}
                placeholder="Add skill (e.g. PyTorch, Docker)"
                className="flex-1 px-3.5 py-2 rounded-xl border border-white/[0.1] bg-black/40 text-xs text-white focus:outline-none focus:border-cyan-500"
              />
              <button
                onClick={addSkill}
                className="px-3 py-2 rounded-xl bg-white/[0.08] hover:bg-white/[0.12] text-xs font-semibold text-white transition-colors"
              >
                <Plus className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

        {/* Selected Skill Tags */}
        <div className="mt-4 flex flex-wrap gap-2 items-center">
          <span className="text-[10px] font-mono text-zinc-500 uppercase">Active Requirements:</span>
          {requiredSkills.map((skill) => (
            <span
              key={skill}
              className="inline-flex items-center space-x-1.5 px-3 py-1 rounded-lg bg-cyan-950/30 border border-cyan-500/30 text-cyan-300 text-xs font-mono"
            >
              <span>{skill}</span>
              <button
                onClick={() => removeSkill(skill)}
                className="text-cyan-400 hover:text-white transition-colors"
              >
                <X className="w-3 h-3" />
              </button>
            </span>
          ))}
        </div>

        {/* Assemble Action Button */}
        <div className="mt-6 flex flex-col sm:flex-row items-center justify-between gap-3 pt-4 border-t border-white/[0.06]">
          <div className="text-xs text-zinc-400 font-mono">
            Candidate pool: 30 verified members · 18 available
          </div>
          <button
            onClick={handleAssemble}
            disabled={isAssembling}
            className="w-full sm:w-auto px-6 py-2.5 rounded-xl bg-gradient-to-r from-cyan-400 via-teal-400 to-blue-500 hover:from-cyan-300 hover:to-blue-400 text-black font-bold text-xs tracking-wider uppercase font-mono flex items-center justify-center space-x-2 transition-all shadow-lg shadow-cyan-500/25 disabled:opacity-50"
          >
            <Sparkles className={`w-4 h-4 ${isAssembling ? 'animate-spin' : ''}`} />
            <span>{isAssembling ? 'Reasoning...' : 'ASSEMBLE TEAM'}</span>
          </button>
        </div>
      </div>

      {/* Assembly Results */}
      {assemblyResult && (
        <div className="space-y-6">
          {/* Metrics Bar */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            <div className="p-4 rounded-xl border border-cyan-500/30 bg-cyan-950/20">
              <div className="text-[10px] uppercase font-mono tracking-wider text-cyan-400">Team Coverage</div>
              <div className="text-2xl sm:text-3xl font-extrabold font-mono text-white mt-1">
                {assemblyResult.coverageScore}%
              </div>
              <div className="text-[10px] text-cyan-300/80 mt-1">All target domains covered</div>
            </div>

            <div className="p-4 rounded-xl border border-violet-500/30 bg-violet-950/20">
              <div className="text-[10px] uppercase font-mono tracking-wider text-violet-400">Project Relevance</div>
              <div className="text-2xl sm:text-3xl font-extrabold font-mono text-white mt-1">
                {assemblyResult.projectRelevance}%
              </div>
              <div className="text-[10px] text-violet-300/80 mt-1">Healthcare AI domain synergy</div>
            </div>

            <div className="p-4 rounded-xl border border-emerald-500/30 bg-emerald-950/20">
              <div className="text-[10px] uppercase font-mono tracking-wider text-emerald-400">Availability</div>
              <div className="text-2xl sm:text-3xl font-extrabold font-mono text-emerald-300 mt-1">
                {assemblyResult.availabilityRatio}
              </div>
              <div className="text-[10px] text-emerald-400/80 mt-1">Zero scheduling conflicts</div>
            </div>

            <div className="p-4 rounded-xl border border-white/[0.08] bg-[#0c101c]">
              <div className="text-[10px] uppercase font-mono tracking-wider text-zinc-400">Confidence Score</div>
              <div className="text-2xl sm:text-3xl font-extrabold font-mono text-white mt-1">
                {(assemblyResult.confidence * 100).toFixed(0)}%
              </div>
              <div className="text-[10px] text-zinc-400 mt-1">Deterministic AI provider</div>
            </div>
          </div>

          {/* Squad Member Cards */}
          <div>
            <div className="flex items-center justify-between mb-3">
              <div className="text-[11px] font-mono uppercase tracking-wider text-zinc-400">
                Recommended Multidisciplinary Squad ({assemblyResult.members.length} members)
              </div>
              <div className="text-xs text-cyan-400 font-mono">
                Squad Name: {assemblyResult.teamName}
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {assemblyResult.members.map((member, idx) => (
                <div
                  key={idx}
                  className="p-5 rounded-2xl border border-white/[0.08] bg-[#0c101c] hover:border-cyan-500/30 transition-all flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-start justify-between gap-3">
                      <div className="flex items-center space-x-3.5">
                        <img
                          src={member.user.avatar}
                          alt={member.user.name}
                          className="w-12 h-12 rounded-xl object-cover border border-white/10"
                        />
                        <div>
                          <h3 className="text-sm font-bold text-white font-mono">{member.user.name}</h3>
                          <div className="text-xs text-cyan-400 font-medium mt-0.5">{member.primaryRole}</div>
                          <div className="text-[10px] text-zinc-400 font-mono mt-0.5">
                            {member.user.location} · {member.user.yearsExperience}y exp
                          </div>
                        </div>
                      </div>

                      <div className="text-right">
                        <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                          {member.availability}
                        </span>
                      </div>
                    </div>

                    {/* Why Selected */}
                    <div className="mt-3.5 p-3 rounded-xl bg-black/40 border border-white/[0.05]">
                      <div className="text-[9px] font-mono uppercase tracking-wider text-zinc-500 mb-1">
                        Why Selected by Engine:
                      </div>
                      <p className="text-xs text-zinc-300 leading-relaxed">
                        {member.whySelected}
                      </p>
                    </div>
                  </div>

                  {/* Skills Covered */}
                  <div className="mt-4 pt-3 border-t border-white/[0.06] flex items-center justify-between text-[11px]">
                    <span className="text-zinc-500 font-mono">Covering:</span>
                    <div className="flex flex-wrap gap-1.5 justify-end">
                      {member.coveredSkills.map(sk => (
                        <span key={sk} className="text-[10px] font-mono text-cyan-300 bg-cyan-950/40 px-2 py-0.5 rounded border border-cyan-500/20">
                          {sk}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Engine Reasoning Panel */}
          <div className="p-4 rounded-xl border border-white/[0.06] bg-black/30">
            <div className="text-[10px] font-mono uppercase tracking-wider text-zinc-400 mb-2">
              Team Assembly Engine Reasoning
            </div>
            <ul className="space-y-1.5 text-xs text-zinc-300 font-mono">
              {assemblyResult.reasoning.map((r, rIdx) => (
                <li key={rIdx} className="flex items-start space-x-2">
                  <span className="text-cyan-400">›</span>
                  <span>{r}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* FORM TEAM FINAL ACTION */}
          {!formedTeam ? (
            <div className="p-6 rounded-2xl border border-cyan-500/40 bg-gradient-to-r from-cyan-950/20 via-[#0e1424] to-violet-950/20 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <h3 className="text-base font-bold text-white">Ready to activate this team?</h3>
                <p className="text-xs text-zinc-400 mt-1">
                  Clicking "Form Team" will create real team records, initiate collaboration requests, and notify members over Socket.IO.
                </p>
              </div>

              <div className="flex items-center space-x-3 shrink-0">
                <button
                  onClick={handleAssemble}
                  className="px-4 py-2.5 rounded-xl border border-white/[0.1] hover:bg-white/[0.05] text-xs font-semibold text-zinc-300 transition-colors"
                >
                  <RefreshCw className="w-3.5 h-3.5 inline mr-1" />
                  Regenerate
                </button>

                <button
                  onClick={handleFormTeam}
                  disabled={isForming}
                  className="px-6 py-2.5 rounded-xl bg-cyan-400 hover:bg-cyan-300 text-black font-bold text-xs tracking-wider uppercase font-mono flex items-center space-x-2 transition-all shadow-lg shadow-cyan-500/25 disabled:opacity-50"
                >
                  <Users2 className="w-4 h-4" />
                  <span>{isForming ? 'Creating Team...' : 'FORM TEAM'}</span>
                </button>
              </div>
            </div>
          ) : (
            <div className="p-6 rounded-2xl border border-emerald-500/40 bg-emerald-950/20 animate-fade-in">
              <div className="flex items-center space-x-3 text-emerald-400 mb-2">
                <CheckCircle2 className="w-6 h-6" />
                <h3 className="text-base font-bold text-white font-mono">
                  TEAM CREATED: {formedTeam.team?.name || 'AI Healthcare Builders'}
                </h3>
              </div>
              <p className="text-xs text-zinc-300 mb-4 max-w-xl">
                Status: <span className="text-amber-400 font-mono font-semibold">AWAITING MEMBER CONFIRMATION</span>. Collaboration invitations have been dispatched to Priya, Arun, Rahul, and Meena.
              </p>

              <div className="flex flex-wrap gap-3">
                <button
                  onClick={() => onNavigate('collaborations')}
                  className="px-4 py-2 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-black font-semibold text-xs transition-colors flex items-center space-x-1.5"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>View in Collaboration Center</span>
                </button>
                <button
                  onClick={() => onNavigate('graph')}
                  className="px-4 py-2 rounded-xl border border-white/[0.1] bg-white/[0.05] hover:bg-white/[0.1] text-white text-xs transition-colors font-mono"
                >
                  Inspect in Graph
                </button>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};
