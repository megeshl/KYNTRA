import React, { useState } from 'react';
import { Smartphone, Laptop, ArrowRightLeft, CheckCircle2, RefreshCw, X, Radio } from 'lucide-react';
import { syncOfficeKitBridge } from '../../api/client';

interface OfficeKitModalProps {
  isOpen: boolean;
  onClose: () => void;
  syncEvents: any[];
}

export const OfficeKitModal: React.FC<OfficeKitModalProps> = ({ isOpen, onClose, syncEvents }) => {
  const [isSimulating, setIsSimulating] = useState(false);

  if (!isOpen) return null;

  const handleSimulatePhoneSync = async () => {
    setIsSimulating(true);
    try {
      await syncOfficeKitBridge({
        opportunityId: 'opp-1',
        title: 'Priya Sharma (Computer Vision Lead)',
        source: 'iQOO Device Camera Lens',
        targetProject: 'AI Healthcare Assistant',
        payloadAction: 'TEAM_ASSEMBLY_REQUESTED'
      });
    } catch (err) {
      console.error(err);
    } finally {
      setIsSimulating(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fade-in">
      <div className="relative w-full max-w-xl rounded-2xl border border-white/10 bg-[#0c101a] p-6 shadow-2xl overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-white/[0.08]">
          <div className="flex items-center space-x-2.5">
            <div className="w-8 h-8 rounded-lg bg-cyan-500/20 border border-cyan-500/30 flex items-center justify-center">
              <Smartphone className="w-4 h-4 text-cyan-400" />
            </div>
            <div>
              <h3 className="text-sm font-semibold text-white font-mono">Office Kit Demo Bridge</h3>
              <p className="text-[11px] text-zinc-400">Real-time bi-directional Phone ↔ Laptop sync pipeline</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-zinc-400 hover:text-white hover:bg-white/[0.06] transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Bridge Visualization */}
        <div className="my-6 p-4 rounded-xl border border-white/[0.08] bg-black/40">
          <div className="flex items-center justify-around">
            <div className="flex flex-col items-center">
              <div className="w-12 h-12 rounded-xl bg-cyan-950/40 border border-cyan-500/30 flex items-center justify-center">
                <Smartphone className="w-6 h-6 text-cyan-400" />
              </div>
              <span className="text-[11px] font-mono text-cyan-300 mt-2">iQOO Device</span>
              <span className="text-[9px] text-zinc-500">Field Capture</span>
            </div>

            <div className="flex flex-col items-center px-4">
              <div className="flex items-center space-x-1">
                <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-ping" />
                <ArrowRightLeft className="w-5 h-5 text-cyan-400" />
                <span className="w-1.5 h-1.5 rounded-full bg-violet-400 animate-ping" />
              </div>
              <span className="text-[9px] font-mono text-zinc-400 mt-1">Socket.IO Tunnel</span>
              <span className="text-[8px] text-emerald-400">Latency: 14ms</span>
            </div>

            <div className="flex flex-col items-center">
              <div className="w-12 h-12 rounded-xl bg-violet-950/40 border border-violet-500/30 flex items-center justify-center">
                <Laptop className="w-6 h-6 text-violet-400" />
              </div>
              <span className="text-[11px] font-mono text-violet-300 mt-2">Laptop Workspace</span>
              <span className="text-[9px] text-zinc-500">Live Dashboard</span>
            </div>
          </div>

          <div className="mt-4 pt-3 border-t border-white/[0.06] flex items-center justify-between text-[11px]">
            <span className="text-zinc-400">Channel Status:</span>
            <span className="text-emerald-400 font-mono flex items-center space-x-1">
              <CheckCircle2 className="w-3.5 h-3.5" />
              <span>Synced from iQOO device</span>
            </span>
          </div>
        </div>

        {/* Sync Stream Logs */}
        <div className="mb-4">
          <div className="text-[11px] font-mono uppercase tracking-wider text-zinc-400 mb-2 flex items-center justify-between">
            <span>Recent Synchronization Events</span>
            <span className="text-cyan-400">{syncEvents.length} events logged</span>
          </div>
          <div className="space-y-1.5 max-h-36 overflow-y-auto pr-1">
            {syncEvents.length === 0 ? (
              <div className="text-xs text-zinc-500 py-3 text-center">
                Ready for phone trigger. Click below to simulate phone capture.
              </div>
            ) : (
              syncEvents.map((evt, idx) => (
                <div key={idx} className="p-2 rounded-lg bg-white/[0.02] border border-white/[0.05] text-[11px] flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <Radio className="w-3 h-3 text-cyan-400" />
                    <span className="font-mono text-zinc-300">{evt.deviceId}</span>
                    <span className="text-zinc-500">·</span>
                    <span className="text-zinc-400 truncate max-w-[200px]">{evt.payload?.title || evt.eventType}</span>
                  </div>
                  <span className="text-[9px] text-zinc-500 font-mono">
                    {new Date(evt.timestamp).toLocaleTimeString()}
                  </span>
                </div>
              ))
            )}
          </div>
        </div>

        {/* Action button */}
        <button
          onClick={handleSimulatePhoneSync}
          disabled={isSimulating}
          className="w-full py-2.5 px-4 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-black font-semibold text-xs flex items-center justify-center space-x-2 transition-all shadow-lg shadow-cyan-500/20 disabled:opacity-50"
        >
          <RefreshCw className={`w-3.5 h-3.5 ${isSimulating ? 'animate-spin' : ''}`} />
          <span>Simulate Phone Opportunity Capture Event</span>
        </button>
      </div>
    </div>
  );
};
