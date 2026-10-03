import React, { useState, useEffect } from 'react';
import {
  GraduationCap,
  Sparkles,
  Search,
  CheckCircle2,
  Send,
  Star,
  Clock,
  Filter
} from 'lucide-react';
import { fetchMentors, matchMentors } from '../api/client';

export const MentorsView: React.FC = () => {
  const [mentors, setMentors] = useState<any[]>([]);
  const [targetSkill, setTargetSkill] = useState('');
  const [requestedId, setRequestedId] = useState<string | null>(null);

  useEffect(() => {
    loadMentors();
  }, []);

  const loadMentors = async () => {
    try {
      const data = await fetchMentors();
      setMentors(data);
    } catch (e) {
      console.error(e);
    }
  };

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!targetSkill.trim()) {
      loadMentors();
      return;
    }
    try {
      const data = await matchMentors(targetSkill.trim());
      setMentors(data.map((d: any) => ({ ...d.mentor, matchScore: d.matchScore, matchReason: d.reason })));
    } catch (e) {
      console.error(e);
    }
  };

  const handleRequestMentorship = (mentorId: string) => {
    setRequestedId(mentorId);
  };

  return (
    <div className="space-y-6 pb-16 animate-fade-in">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-2 border-b border-white/[0.06]">
        <div>
          <div className="flex items-center space-x-2 text-cyan-400 text-xs font-mono mb-1">
            <GraduationCap className="w-4 h-4" />
            <span className="font-semibold uppercase tracking-wider">FEATURE 8: KNOWLEDGE TRANSFER</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold text-white font-mono tracking-tight">
            MENTOR DISCOVERY
          </h1>
          <p className="text-xs sm:text-sm text-zinc-400 mt-1">
            Direct matching with verified staff practitioners and community architects offering dedicated mentorship capacity.
          </p>
        </div>
      </div>

      {/* Query Bar */}
      <form onSubmit={handleSearch} className="flex gap-2">
        <div className="relative flex-1">
          <Search className="w-4 h-4 absolute left-3.5 top-3 text-zinc-500" />
          <input
            type="text"
            value={targetSkill}
            onChange={(e) => setTargetSkill(e.target.value)}
            placeholder="What technical area do you need mentorship with? (e.g. Kubernetes, PostgreSQL, AI Ethics)"
            className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-white/[0.1] bg-[#0c101c] text-xs text-white placeholder-zinc-500 focus:outline-none focus:border-cyan-500"
          />
        </div>
        <button
          type="submit"
          className="px-5 py-2.5 rounded-xl bg-cyan-400 hover:bg-cyan-300 text-black font-semibold text-xs font-mono transition-colors"
        >
          Find Mentors
        </button>
      </form>

      {/* Mentor Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {mentors.map((mentor) => (
          <div
            key={mentor.id}
            className="p-5 rounded-2xl border border-white/[0.08] bg-[#0c101c] hover:border-cyan-500/30 transition-all flex flex-col justify-between"
          >
            <div>
              <div className="flex items-start justify-between">
                <div className="flex items-center space-x-3">
                  <img
                    src={mentor.avatar}
                    alt={mentor.name}
                    className="w-12 h-12 rounded-xl object-cover border border-white/10"
                  />
                  <div>
                    <h3 className="text-sm font-bold text-white font-mono">{mentor.name}</h3>
                    <div className="text-xs text-cyan-400 font-mono">{mentor.role}</div>
                    <div className="text-[10px] text-zinc-500 font-mono mt-0.5">
                      {mentor.location} · {mentor.yearsExperience}y exp
                    </div>
                  </div>
                </div>

                <span className="text-[9px] font-mono px-2 py-0.5 rounded bg-cyan-500/10 text-cyan-300 border border-cyan-500/20">
                  {mentor.availability}
                </span>
              </div>

              <p className="text-xs text-zinc-300 mt-3 leading-relaxed">
                {mentor.bio}
              </p>

              {mentor.matchReason && (
                <div className="mt-2 text-[11px] text-emerald-400 bg-emerald-950/20 p-2 rounded-lg border border-emerald-500/20 font-mono">
                  Why Matched: {mentor.matchReason}
                </div>
              )}
            </div>

            <div className="mt-4 pt-3 border-t border-white/[0.06] flex items-center justify-between">
              <span className="text-[11px] text-zinc-400 font-mono">Mentorship Slot Open</span>
              {requestedId === mentor.id ? (
                <span className="text-xs text-emerald-400 font-mono flex items-center space-x-1">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  <span>Request Dispatched</span>
                </span>
              ) : (
                <button
                  onClick={() => handleRequestMentorship(mentor.id)}
                  className="px-3.5 py-1.5 rounded-lg bg-white/[0.06] hover:bg-cyan-500 hover:text-black text-white text-xs font-mono font-medium transition-all"
                >
                  Request Mentorship
                </button>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
