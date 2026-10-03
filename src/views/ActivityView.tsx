import React, { useState, useEffect } from 'react';
import { Activity as ActivityIcon, RefreshCw, Radio, Layers } from 'lucide-react';
import { fetchActivities } from '../api/client';
import { Activity } from '../types';

export const ActivityView: React.FC = () => {
  const [activities, setActivities] = useState<Activity[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    loadActivities();
  }, []);

  const loadActivities = async () => {
    setIsLoading(true);
    try {
      const data = await fetchActivities();
      setActivities(data);
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
          <div className="flex items-center space-x-2 text-cyan-400 text-xs font-mono mb-1">
            <Radio className="w-4 h-4 animate-pulse" />
            <span className="font-semibold uppercase tracking-wider">REAL-TIME EVENT BUS</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold text-white font-mono tracking-tight">
            LIVE ACTIVITY STREAM
          </h1>
          <p className="text-xs sm:text-sm text-zinc-400 mt-1">
            Real-time audit and interaction ledger synchronized across web clients and iQOO devices.
          </p>
        </div>

        <button
          onClick={loadActivities}
          className="px-3.5 py-2 rounded-xl border border-white/[0.1] bg-white/[0.03] hover:bg-white/[0.08] text-white font-medium text-xs flex items-center space-x-1.5 transition-colors font-mono"
        >
          <RefreshCw className={`w-3.5 h-3.5 ${isLoading ? 'animate-spin' : ''}`} />
          <span>Refresh Feed</span>
        </button>
      </div>

      <div className="space-y-3">
        {activities.map((act) => (
          <div
            key={act.id}
            className="p-4 rounded-xl border border-white/[0.06] bg-[#0c101c] hover:border-white/[0.12] transition-all flex items-start space-x-3.5"
          >
            <img
              src={act.userAvatar}
              alt={act.userName}
              className="w-10 h-10 rounded-xl object-cover border border-white/10 shrink-0"
            />
            <div className="flex-1 min-w-0">
              <div className="flex items-center justify-between gap-2">
                <span className="text-xs font-bold text-white font-mono">{act.userName}</span>
                <span className="text-[10px] text-zinc-500 font-mono">
                  {new Date(act.createdAt).toLocaleTimeString()} · {new Date(act.createdAt).toLocaleDateString()}
                </span>
              </div>
              <p className="text-xs text-zinc-300 mt-1 leading-relaxed">
                {act.description}
              </p>
              <div className="mt-2 text-[9px] font-mono text-cyan-400">
                Event Type: {act.type}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
