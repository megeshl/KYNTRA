import React from 'react';
import {
  LayoutDashboard,
  Share2,
  Users2,
  Camera,
  Sparkles,
  Radar,
  GitMerge,
  GraduationCap,
  Activity,
  Send,
  Dna,
  Layers
} from 'lucide-react';

interface SidebarProps {
  activeView: string;
  onSelectView: (view: string) => void;
  pendingCollabsCount: number;
}

export const Sidebar: React.FC<SidebarProps> = ({
  activeView,
  onSelectView,
  pendingCollabsCount
}) => {
  const menuItems = [
    { id: 'dashboard', label: 'Command Center', icon: LayoutDashboard, badge: null },
    { id: 'graph', label: 'Community Graph', icon: Share2, badge: 'Interactive' },
    { id: 'assemble', label: 'KYNTRA Assemble', icon: Users2, badge: 'Primary' },
    { id: 'lens', label: 'Community Lens', icon: Camera, badge: 'Vision' },
    { id: 'opportunities', label: 'Hidden Opportunities', icon: Sparkles, badge: 'AI' },
    { id: 'skill-gaps', label: 'Skill Gap Radar', icon: Radar, badge: 'Alert' },
    { id: 'collisions', label: 'Project Collisions', icon: GitMerge, badge: null },
    { id: 'mentors', label: 'Mentor Discovery', icon: GraduationCap, badge: null },
    { id: 'pulse-dna', label: 'Community Pulse & DNA', icon: Dna, badge: null },
    { id: 'collaborations', label: 'Collaboration Center', icon: Send, badge: pendingCollabsCount > 0 ? `${pendingCollabsCount}` : null },
    { id: 'activity', label: 'Live Activity Stream', icon: Activity, badge: null }
  ];

  return (
    <aside className="hidden lg:flex flex-col w-64 border-r border-white/[0.07] bg-[#070a10] min-h-[calc(100vh-4rem)] p-3 select-none">
      <div className="px-3 py-2 text-[10px] uppercase font-mono tracking-wider text-zinc-500">
        Intelligence Layer
      </div>

      <nav className="flex-1 space-y-1 mt-1">
        {menuItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeView === item.id;

          return (
            <button
              key={item.id}
              onClick={() => onSelectView(item.id)}
              className={`w-full flex items-center justify-between px-3 py-2.5 rounded-lg text-xs font-medium transition-all ${
                isActive
                  ? 'bg-white/[0.08] text-white border border-white/[0.12] shadow-sm shadow-cyan-500/10'
                  : 'text-zinc-400 hover:text-zinc-200 hover:bg-white/[0.03]'
              }`}
            >
              <div className="flex items-center space-x-3">
                <Icon
                  className={`w-4 h-4 ${
                    isActive ? 'text-cyan-400' : 'text-zinc-500 group-hover:text-zinc-300'
                  }`}
                />
                <span>{item.label}</span>
              </div>

              {item.badge && (
                <span
                  className={`text-[9px] font-mono px-1.5 py-0.5 rounded ${
                    item.badge === 'Primary'
                      ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/30'
                      : item.badge === 'Alert'
                      ? 'bg-amber-500/20 text-amber-300 border border-amber-500/30'
                      : 'bg-white/[0.06] text-zinc-400'
                  }`}
                >
                  {item.badge}
                </span>
              )}
            </button>
          );
        })}
      </nav>

      {/* Community Status card */}
      <div className="p-3 mt-4 rounded-xl border border-white/[0.06] bg-white/[0.02]">
        <div className="flex items-center justify-between text-[11px] mb-1">
          <span className="text-zinc-400">Community Synergy</span>
          <span className="text-cyan-400 font-mono font-semibold">91%</span>
        </div>
        <div className="w-full bg-white/[0.05] h-1.5 rounded-full overflow-hidden">
          <div className="bg-gradient-to-r from-cyan-400 to-violet-500 h-full w-[91%]" />
        </div>
        <div className="mt-2 text-[10px] text-zinc-500 font-mono">
          30 members · 10 projects · 17 gaps
        </div>
      </div>
    </aside>
  );
};
