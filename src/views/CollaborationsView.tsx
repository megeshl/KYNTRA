import React, { useState, useEffect } from 'react';
import {
  Send,
  CheckCircle2,
  XCircle,
  Clock,
  Sparkles,
  Users2,
  FolderGit2,
  ExternalLink
} from 'lucide-react';
import { fetchCollaborations, updateCollaborationStatus } from '../api/client';

interface CollaborationsViewProps {
  onNavigateToAssemble?: () => void;
}

export const CollaborationsView: React.FC<CollaborationsViewProps> = ({ onNavigateToAssemble }) => {
  const [collabData, setCollabData] = useState<{ incoming: any[]; outgoing: any[]; active: any[] }>({
    incoming: [],
    outgoing: [],
    active: []
  });
  const [activeTab, setActiveTab] = useState<'incoming' | 'outgoing' | 'active'>('incoming');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    loadCollabs();
  }, []);

  const loadCollabs = async () => {
    setIsLoading(true);
    try {
      const data = await fetchCollaborations();
      setCollabData(data);
    } catch (e) {
      console.error(e);
    } finally {
      setIsLoading(false);
    }
  };

  const handleAction = async (id: string, status: 'ACCEPTED' | 'DECLINED') => {
    try {
      await updateCollaborationStatus(id, status);
      await loadCollabs();
    } catch (e) {
      console.error(e);
    }
  };

  const currentList =
    activeTab === 'incoming'
      ? collabData.incoming
      : activeTab === 'outgoing'
      ? collabData.outgoing
      : collabData.active;

  return (
    <div className="space-y-6 pb-16 animate-fade-in">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-2 border-b border-white/[0.06]">
        <div>
          <div className="flex items-center space-x-2 text-cyan-400 text-xs font-mono mb-1">
            <Send className="w-4 h-4" />
            <span className="font-semibold uppercase tracking-wider">FEATURE 9: REAL COLLABORATION ACTIVATION</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold text-white font-mono tracking-tight">
            COLLABORATION CENTER
          </h1>
          <p className="text-xs sm:text-sm text-zinc-400 mt-1">
            Track and activate incoming squad invitations, project requests, and ongoing cross-functional partnerships.
          </p>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex items-center space-x-2 border-b border-white/[0.08] pb-1">
        <button
          onClick={() => setActiveTab('incoming')}
          className={`px-4 py-2 text-xs font-mono font-medium rounded-lg transition-colors flex items-center space-x-2 ${
            activeTab === 'incoming'
              ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40'
              : 'text-zinc-400 hover:text-white'
          }`}
        >
          <span>Incoming Requests</span>
          <span className="text-[10px] px-1.5 py-0.2 bg-white/[0.08] rounded-full">
            {collabData.incoming.length}
          </span>
        </button>

        <button
          onClick={() => setActiveTab('outgoing')}
          className={`px-4 py-2 text-xs font-mono font-medium rounded-lg transition-colors flex items-center space-x-2 ${
            activeTab === 'outgoing'
              ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40'
              : 'text-zinc-400 hover:text-white'
          }`}
        >
          <span>Outgoing Dispatches</span>
          <span className="text-[10px] px-1.5 py-0.2 bg-white/[0.08] rounded-full">
            {collabData.outgoing.length}
          </span>
        </button>

        <button
          onClick={() => setActiveTab('active')}
          className={`px-4 py-2 text-xs font-mono font-medium rounded-lg transition-colors flex items-center space-x-2 ${
            activeTab === 'active'
              ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40'
              : 'text-zinc-400 hover:text-white'
          }`}
        >
          <span>Active Partnerships</span>
          <span className="text-[10px] px-1.5 py-0.2 bg-emerald-500/20 rounded-full text-emerald-300">
            {collabData.active.length}
          </span>
        </button>
      </div>

      {/* Requests List */}
      <div className="space-y-3">
        {currentList.length === 0 ? (
          <div className="p-8 text-center text-zinc-500 text-xs font-mono rounded-2xl border border-white/[0.06] bg-[#0c101c]">
            No collaboration requests in this category.
          </div>
        ) : (
          currentList.map((item) => (
            <div
              key={item.id}
              className="p-5 rounded-2xl border border-white/[0.08] bg-[#0c101c] hover:border-white/[0.15] transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-4"
            >
              <div className="flex items-start space-x-3.5">
                <img
                  src={item.fromUser?.avatar || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80'}
                  alt={item.fromUser?.name}
                  className="w-11 h-11 rounded-xl object-cover border border-white/10 shrink-0"
                />
                <div>
                  <div className="flex items-center space-x-2">
                    <span className="text-sm font-bold text-white font-mono">{item.fromUser?.name}</span>
                    <span className="text-xs text-zinc-400">→</span>
                    <span className="text-xs text-zinc-300 font-mono">{item.toUser?.name}</span>
                    <span className="text-[10px] text-zinc-500 font-mono">
                      · {new Date(item.createdAt).toLocaleDateString()}
                    </span>
                  </div>

                  <p className="text-xs text-zinc-300 mt-1 leading-relaxed max-w-xl">
                    "{item.reason}"
                  </p>

                  {item.project && (
                    <div className="mt-2 inline-flex items-center space-x-1.5 text-[10px] font-mono text-cyan-400 bg-cyan-950/30 px-2.5 py-0.5 rounded border border-cyan-500/20">
                      <FolderGit2 className="w-3 h-3" />
                      <span>Project: {item.project.name}</span>
                    </div>
                  )}
                </div>
              </div>

              {/* Status / Actions */}
              <div className="flex items-center space-x-2 shrink-0 self-end sm:self-center">
                {item.status === 'PENDING' ? (
                  <>
                    <button
                      onClick={() => handleAction(item.id, 'ACCEPTED')}
                      className="px-3.5 py-1.5 rounded-lg bg-emerald-500 hover:bg-emerald-400 text-black font-semibold text-xs font-mono transition-colors flex items-center space-x-1"
                    >
                      <CheckCircle2 className="w-3.5 h-3.5" />
                      <span>Accept</span>
                    </button>
                    <button
                      onClick={() => handleAction(item.id, 'DECLINED')}
                      className="px-3.5 py-1.5 rounded-lg border border-white/[0.1] hover:bg-white/[0.05] text-zinc-400 hover:text-white text-xs font-mono transition-colors"
                    >
                      Decline
                    </button>
                  </>
                ) : (
                  <span
                    className={`text-[10px] font-mono px-2.5 py-1 rounded-lg ${
                      item.status === 'ACCEPTED'
                        ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20'
                        : 'bg-red-500/10 text-red-400 border border-red-500/20'
                    }`}
                  >
                    {item.status}
                  </span>
                )}
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};
