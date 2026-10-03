import React from 'react';
import {
  LayoutDashboard,
  Share2,
  Users2,
  Camera,
  Send,
  Sparkles
} from 'lucide-react';

interface MobileNavProps {
  activeView: string;
  onSelectView: (view: string) => void;
  pendingCollabsCount: number;
}

export const MobileNav: React.FC<MobileNavProps> = ({
  activeView,
  onSelectView,
  pendingCollabsCount
}) => {
  const items = [
    { id: 'dashboard', label: 'Home', icon: LayoutDashboard },
    { id: 'graph', label: 'Graph', icon: Share2 },
    { id: 'assemble', label: 'Assemble', icon: Users2, highlight: true },
    { id: 'lens', label: 'Lens', icon: Camera },
    { id: 'collaborations', label: 'Collabs', icon: Send, badge: pendingCollabsCount }
  ];

  return (
    <nav className="lg:hidden fixed bottom-0 left-0 right-0 z-40 bg-[#070a10]/95 backdrop-blur-lg border-t border-white/[0.08] px-2 py-2 flex items-center justify-around">
      {items.map((item) => {
        const Icon = item.icon;
        const isActive = activeView === item.id;

        if (item.highlight) {
          return (
            <button
              key={item.id}
              onClick={() => onSelectView(item.id)}
              className="relative -top-3 flex flex-col items-center justify-center p-3 rounded-2xl bg-gradient-to-tr from-cyan-500 to-blue-600 text-black shadow-lg shadow-cyan-500/30 transition-transform active:scale-95"
            >
              <Icon className="w-5 h-5 text-black font-bold" />
              <span className="text-[10px] font-bold text-black mt-0.5">Assemble</span>
            </button>
          );
        }

        return (
          <button
            key={item.id}
            onClick={() => onSelectView(item.id)}
            className={`flex flex-col items-center justify-center py-1 px-3 text-xs transition-colors relative ${
              isActive ? 'text-cyan-400' : 'text-zinc-500 hover:text-zinc-300'
            }`}
          >
            <div className="relative">
              <Icon className="w-4 h-4" />
              {item.badge && item.badge > 0 ? (
                <span className="absolute -top-1.5 -right-2.5 w-4 h-4 rounded-full bg-cyan-500 text-black text-[9px] font-bold flex items-center justify-center">
                  {item.badge}
                </span>
              ) : null}
            </div>
            <span className="text-[10px] mt-1 font-medium">{item.label}</span>
          </button>
        );
      })}
    </nav>
  );
};
