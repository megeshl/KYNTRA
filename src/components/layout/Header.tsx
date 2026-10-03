import React from 'react';
import {
  Sparkles,
  Smartphone,
  Mic,
  RotateCcw,
  Zap,
  Radio,
  PlayCircle
} from 'lucide-react';

interface HeaderProps {
  onOpenVoice: () => void;
  onOpenOfficeKit: () => void;
  onOpenTour: () => void;
  onResetDemo: () => void;
  officeKitSynced: boolean;
  activeView: string;
}

export const Header: React.FC<HeaderProps> = ({
  onOpenVoice,
  onOpenOfficeKit,
  onOpenTour,
  onResetDemo,
  officeKitSynced,
  activeView
}) => {
  return (
    <header className="sticky top-0 z-40 h-16 border-b border-white/[0.07] bg-[#090d16]/90 backdrop-blur-md px-4 sm:px-6 flex items-center justify-between">
      {/* Brand & Tagline */}
      <div className="flex items-center space-x-3 sm:space-x-4">
        <div className="flex items-center space-x-2">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-cyan-400 to-violet-600 flex items-center justify-center shadow-lg shadow-cyan-500/20">
            <Sparkles className="w-4 h-4 text-black font-bold" />
          </div>
          <div>
            <div className="flex items-center space-x-2">
              <span className="text-base font-bold tracking-wider text-white font-mono">KYNTRA</span>
              <span className="hidden sm:inline text-xs text-zinc-500 font-mono">v2.4-ai</span>
            </div>
            <div className="hidden md:block text-[10px] text-zinc-400 tracking-wide font-mono">
              Discover <span className="text-cyan-400">·</span> Assemble <span className="text-violet-400">·</span> Create
            </div>
          </div>
        </div>

        {/* Live Status indicator */}
        <div className="hidden lg:flex items-center space-x-1.5 px-2.5 py-1 rounded-md bg-white/[0.03] border border-white/[0.06] text-[11px] text-zinc-300">
          <Radio className="w-3 h-3 text-cyan-400 animate-pulse" />
          <span className="font-mono text-zinc-400">Graph Live</span>
          <span className="text-zinc-600">/</span>
          <span className="text-cyan-400 font-mono">30 Nodes</span>
        </div>
      </div>

      {/* Action Controls */}
      <div className="flex items-center space-x-2 sm:space-x-3">
        {/* Office Kit Demo Bridge */}
        <button
          onClick={onOpenOfficeKit}
          className="flex items-center space-x-1.5 px-2.5 py-1.5 rounded-lg border border-cyan-500/30 bg-cyan-950/20 hover:bg-cyan-900/30 text-cyan-300 transition-all text-xs font-mono"
          title="Office Kit Demo Bridge: Phone to Laptop Sync"
        >
          <Smartphone className="w-3.5 h-3.5 text-cyan-400" />
          <span className="hidden sm:inline">Office Kit Bridge</span>
          <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-ping" />
        </button>

        {/* Voice Community Command */}
        <button
          onClick={onOpenVoice}
          className="flex items-center space-x-1.5 px-2.5 py-1.5 rounded-lg border border-violet-500/30 bg-violet-950/20 hover:bg-violet-900/30 text-violet-300 transition-all text-xs font-mono"
          title="Voice Community Command"
        >
          <Mic className="w-3.5 h-3.5 text-violet-400" />
          <span className="hidden sm:inline">Voice Command</span>
        </button>

        {/* 3-Min Judges Tour */}
        <button
          onClick={onOpenTour}
          className="flex items-center space-x-1.5 px-3 py-1.5 rounded-lg bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-black font-semibold text-xs transition-all shadow-md shadow-cyan-500/20"
        >
          <PlayCircle className="w-3.5 h-3.5" />
          <span className="hidden sm:inline">Judges Demo (3 min)</span>
          <span className="sm:hidden">Demo</span>
        </button>

        {/* Reset Demo */}
        <button
          onClick={onResetDemo}
          className="p-1.5 rounded-lg border border-white/[0.08] hover:bg-white/[0.06] text-zinc-400 hover:text-white transition-colors"
          title="Reset & Re-seed Community Database"
        >
          <RotateCcw className="w-3.5 h-3.5" />
        </button>

        {/* Active Demo User Avatar */}
        <div className="flex items-center space-x-2 pl-2 border-l border-white/[0.08]">
          <img
            src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80"
            alt="Alex Chen"
            className="w-8 h-8 rounded-full border border-cyan-400/50 object-cover"
          />
          <div className="hidden xl:block text-left text-xs">
            <div className="font-medium text-white leading-none">Alex Chen</div>
            <div className="text-[10px] text-zinc-400 font-mono mt-0.5">Lead Architect</div>
          </div>
        </div>
      </div>
    </header>
  );
};
