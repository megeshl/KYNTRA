import React, { useState, useEffect } from 'react';
import {
  GitMerge,
  AlertCircle,
  Sparkles,
  ArrowRight,
  CheckCircle2,
  Users2,
  Layers,
  Send,
  ExternalLink
} from 'lucide-react';
import { analyzeProjectOverlap } from '../api/client';

interface ProjectCollisionsViewProps {
  onNavigateToAssemble?: () => void;
}

export const ProjectCollisionsView: React.FC<ProjectCollisionsViewProps> = () => {
  const [overlapData, setOverlapData] = useState<any | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [introduced, setIntroduced] = useState(false);
  const [merged, setMerged] = useState(false);

  useEffect(() => {
    loadOverlap();
  }, []);

  const loadOverlap = async () => {
    setIsLoading(true);
    try {
      const data = await analyzeProjectOverlap('proj-resume');
      setOverlapData(data);
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
          <div className="flex items-center space-x-2 text-violet-400 text-xs font-mono mb-1">
            <GitMerge className="w-4 h-4" />
            <span className="font-semibold uppercase tracking-wider">FEATURE 7: DUPLICATION & SYNERGY ENGINE</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold text-white font-mono tracking-tight">
            PROJECT COLLISION DETECTION
          </h1>
          <p className="text-xs sm:text-sm text-zinc-400 mt-1">
            AI reasoning detects convergent project architectures and prompts team introduction before duplicate effort occurs.
          </p>
        </div>
      </div>

      {/* Featured Collision Banner */}
      {overlapData && (
        <div className="p-6 rounded-2xl border border-violet-500/40 bg-gradient-to-br from-violet-950/20 via-[#0c101c] to-[#070b14] space-y-6 shadow-2xl">
          <div className="flex flex-wrap items-center justify-between gap-2 pb-3 border-b border-white/[0.08]">
            <div className="flex items-center space-x-2">
              <span className="w-2 h-2 rounded-full bg-violet-400 animate-ping" />
              <span className="text-xs font-mono uppercase tracking-wider text-violet-300 font-bold">
                HIGH SEMANTIC OVERLAP DETECTED (92%)
              </span>
            </div>
            <span className="text-xs font-mono text-zinc-400">
              Domain: {overlapData.sharedDomain}
            </span>
          </div>

          {/* Two Overlapping Projects Side-by-Side */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Project A */}
            <div className="p-5 rounded-xl border border-white/[0.08] bg-black/40">
              <div className="text-[10px] font-mono text-zinc-500 uppercase mb-1">Initiative A</div>
              <h3 className="text-base font-bold text-white font-mono">{overlapData.sourceProject?.name}</h3>
              <p className="text-xs text-zinc-300 mt-1.5 leading-relaxed">
                {overlapData.sourceProject?.description}
              </p>
              <div className="mt-3 pt-3 border-t border-white/[0.06] text-xs font-mono">
                <span className="text-zinc-500">Lead: </span>
                <span className="text-cyan-400">Elena Rostova</span>
              </div>
            </div>

            {/* Project B */}
            <div className="p-5 rounded-xl border border-white/[0.08] bg-black/40">
              <div className="text-[10px] font-mono text-zinc-500 uppercase mb-1">Initiative B</div>
              <h3 className="text-base font-bold text-white font-mono">{overlapData.overlappingProject?.name}</h3>
              <p className="text-xs text-zinc-300 mt-1.5 leading-relaxed">
                {overlapData.overlappingProject?.description}
              </p>
              <div className="mt-3 pt-3 border-t border-white/[0.06] text-xs font-mono">
                <span className="text-zinc-500">Lead: </span>
                <span className="text-violet-400">Carlos Mendez</span>
              </div>
            </div>
          </div>

          {/* Overlap Matrix */}
          <div className="p-4 rounded-xl border border-white/[0.06] bg-black/20 space-y-3">
            <div className="text-xs font-mono uppercase tracking-wider text-zinc-400">
              Graph Convergence Analysis
            </div>
            <p className="text-xs text-zinc-300 leading-relaxed">
              {overlapData.analysis}
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
              <div>
                <span className="text-[10px] font-mono text-zinc-500 uppercase block mb-1">Shared Tech Stack</span>
                <div className="flex flex-wrap gap-1.5">
                  {overlapData.sharedSkills?.map((s: string) => (
                    <span key={s} className="px-2 py-0.5 rounded bg-violet-950/40 border border-violet-500/30 text-violet-300 text-xs font-mono">
                      {s}
                    </span>
                  ))}
                </div>
              </div>

              <div>
                <span className="text-[10px] font-mono text-zinc-500 uppercase block mb-1">Complementary Capabilities</span>
                <div className="text-xs text-zinc-300 font-mono">
                  Vector Embeddings (Elena) + Career Graph UI (Carlos)
                </div>
              </div>
            </div>
          </div>

          {/* Action Recommendations */}
          <div className="flex flex-wrap items-center gap-3 pt-2">
            {!introduced ? (
              <button
                onClick={() => setIntroduced(true)}
                className="px-5 py-2.5 rounded-xl bg-violet-600 hover:bg-violet-500 text-white font-semibold text-xs font-mono flex items-center space-x-2 transition-all shadow-md shadow-violet-600/30"
              >
                <Send className="w-3.5 h-3.5" />
                <span>Introduce Teams</span>
              </button>
            ) : (
              <div className="px-4 py-2.5 rounded-xl bg-emerald-500/20 border border-emerald-500/40 text-emerald-300 text-xs font-mono flex items-center space-x-1.5">
                <CheckCircle2 className="w-4 h-4" />
                <span>Direct channel opened between Elena and Carlos</span>
              </div>
            )}

            {!merged ? (
              <button
                onClick={() => setMerged(true)}
                className="px-4 py-2.5 rounded-xl border border-white/[0.12] bg-white/[0.04] hover:bg-white/[0.08] text-white font-medium text-xs font-mono flex items-center space-x-2 transition-colors"
              >
                <GitMerge className="w-3.5 h-3.5 text-cyan-400" />
                <span>Explore Dataset Merge</span>
              </button>
            ) : (
              <div className="px-4 py-2.5 rounded-xl bg-cyan-500/20 border border-cyan-500/40 text-cyan-300 text-xs font-mono flex items-center space-x-1.5">
                <CheckCircle2 className="w-4 h-4" />
                <span>Consolidated taxonomy dataset draft created</span>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
