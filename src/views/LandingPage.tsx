import React from 'react';
import {
  Sparkles,
  ArrowRight,
  Share2,
  Users2,
  Camera,
  PlayCircle,
  CheckCircle2,
  Radar,
  Radio
} from 'lucide-react';

interface LandingPageProps {
  onEnterApp: () => void;
  onOpenTour: () => void;
}

export const LandingPage: React.FC<LandingPageProps> = ({ onEnterApp, onOpenTour }) => {
  return (
    <div className="min-h-screen bg-[#06080e] text-zinc-100 flex flex-col justify-between selection:bg-cyan-500 selection:text-black">
      {/* Top Navbar */}
      <nav className="h-20 border-b border-white/[0.08] px-6 sm:px-12 flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-cyan-400 to-violet-600 flex items-center justify-center shadow-lg shadow-cyan-500/20">
            <Sparkles className="w-5 h-5 text-black font-bold" />
          </div>
          <span className="text-xl font-bold font-mono tracking-wider text-white">KYNTRA</span>
        </div>

        <div className="flex items-center space-x-3">
          <button
            onClick={onOpenTour}
            className="hidden sm:flex items-center space-x-1.5 px-3 py-1.5 rounded-lg border border-white/[0.1] text-xs font-mono text-zinc-300 hover:text-white hover:bg-white/[0.04] transition-all"
          >
            <PlayCircle className="w-3.5 h-3.5 text-cyan-400" />
            <span>How It Works</span>
          </button>
          <button
            onClick={onEnterApp}
            className="px-4 py-2 rounded-xl bg-cyan-400 hover:bg-cyan-300 text-black font-semibold text-xs font-mono tracking-wide flex items-center space-x-1.5 transition-all shadow-lg shadow-cyan-500/25"
          >
            <span>ENTER LIVE DEMO</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </nav>

      {/* Hero Section */}
      <main className="flex-1 max-w-6xl mx-auto px-6 py-16 sm:py-24 flex flex-col items-center text-center">
        {/* Category Pill */}
        <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full border border-cyan-500/30 bg-cyan-950/20 text-cyan-300 text-xs font-mono mb-8">
          <Radio className="w-3 h-3 text-cyan-400 animate-pulse" />
          <span>AN INTELLIGENCE LAYER FOR COMMUNITIES</span>
        </div>

        {/* Hero Title */}
        <h1 className="text-4xl sm:text-6xl lg:text-7xl font-extrabold text-white tracking-tight max-w-4xl leading-[1.1]">
          Your community has hidden potential.{' '}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-teal-300 to-violet-400">
            KYNTRA reveals it.
          </span>
        </h1>

        {/* Tagline */}
        <p className="mt-6 text-lg sm:text-xl text-zinc-400 font-mono tracking-wide">
          "Discover. Assemble. Create."
        </p>

        {/* Explanatory Lead */}
        <p className="mt-4 text-sm sm:text-base text-zinc-300 max-w-2xl leading-relaxed">
          Not a social feed or static directory. KYNTRA maps people, skills, projects, problems, and intent into a dynamic
          Community Intelligence Graph to assemble complementary teams and activate collaboration.
        </p>

        {/* CTA Buttons */}
        <div className="mt-10 flex flex-col sm:flex-row items-center gap-3 w-full sm:w-auto">
          <button
            onClick={onEnterApp}
            className="w-full sm:w-auto px-8 py-3.5 rounded-xl bg-cyan-400 hover:bg-cyan-300 text-black font-bold text-sm tracking-wide flex items-center justify-center space-x-2 transition-all shadow-xl shadow-cyan-500/30"
          >
            <span>ENTER COMMAND CENTER</span>
            <ArrowRight className="w-4 h-4" />
          </button>
          <button
            onClick={onOpenTour}
            className="w-full sm:w-auto px-6 py-3.5 rounded-xl border border-white/[0.12] bg-white/[0.03] hover:bg-white/[0.08] text-white font-medium text-sm flex items-center justify-center space-x-2 transition-all"
          >
            <PlayCircle className="w-4 h-4 text-cyan-400" />
            <span>Watch 3-Min Judges Flow</span>
          </button>
        </div>

        {/* Feature Grid */}
        <div className="mt-20 grid grid-cols-1 md:grid-cols-3 gap-6 w-full text-left">
          <div className="p-6 rounded-2xl border border-white/[0.08] bg-[#0c101c]/80 backdrop-blur-sm hover:border-cyan-500/40 transition-all">
            <div className="w-10 h-10 rounded-xl bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center mb-4">
              <Share2 className="w-5 h-5 text-cyan-400" />
            </div>
            <h3 className="text-base font-semibold text-white font-mono">Community Graph</h3>
            <p className="mt-2 text-xs text-zinc-400 leading-relaxed">
              Living relational graph linking 30+ members, 22 skills, and 10 active projects with real-time capability tracking.
            </p>
          </div>

          <div className="p-6 rounded-2xl border border-white/[0.08] bg-[#0c101c]/80 backdrop-blur-sm hover:border-violet-500/40 transition-all">
            <div className="w-10 h-10 rounded-xl bg-violet-500/10 border border-violet-500/20 flex items-center justify-center mb-4">
              <Users2 className="w-5 h-5 text-violet-400" />
            </div>
            <h3 className="text-base font-semibold text-white font-mono">KYNTRA Assemble</h3>
            <p className="mt-2 text-xs text-zinc-400 leading-relaxed">
              Autonomous squad builder extracting project needs, coverage scoring (96%), and generating explainable candidate matches.
            </p>
          </div>

          <div className="p-6 rounded-2xl border border-white/[0.08] bg-[#0c101c]/80 backdrop-blur-sm hover:border-amber-500/40 transition-all">
            <div className="w-10 h-10 rounded-xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center mb-4">
              <Camera className="w-5 h-5 text-amber-400" />
            </div>
            <h3 className="text-base font-semibold text-white font-mono">Community Lens</h3>
            <p className="mt-2 text-xs text-zinc-400 leading-relaxed">
              Camera vision pipeline extracting hackathon poster requirements directly into actionable team recruitment opportunities.
            </p>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-white/[0.08] py-6 px-6 sm:px-12 flex flex-col sm:flex-row items-center justify-between text-xs text-zinc-500 font-mono">
        <div>KYNTRA · AI Community Intelligence Engine</div>
        <div className="mt-2 sm:mt-0 flex items-center space-x-3">
          <span>Demonstrated with Alex Chen & "AI Healthcare Assistant"</span>
          <span>·</span>
          <span className="text-cyan-400">Zero External API Required</span>
        </div>
      </footer>
    </div>
  );
};
