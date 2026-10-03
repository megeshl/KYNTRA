import React from 'react';
import { Handle, Position } from '@xyflow/react';

export function UserNode({ data }: { data: any }) {
  return (
    <div className="group relative rounded-xl border border-white/10 bg-[#0f1422]/90 backdrop-blur-md p-3 min-w-[170px] shadow-xl hover:border-cyan-500/50 hover:shadow-cyan-500/10 transition-all duration-200 cursor-pointer">
      <Handle type="target" position={Position.Top} className="!bg-cyan-400 !w-2 !h-2 !border-none" />
      <div className="flex items-center space-x-2.5">
        <img
          src={data.avatar || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80'}
          alt={data.label}
          className="w-9 h-9 rounded-full object-cover border border-white/15"
        />
        <div className="overflow-hidden">
          <div className="text-xs font-semibold text-white truncate group-hover:text-cyan-300 transition-colors">
            {data.label}
          </div>
          <div className="text-[10px] text-zinc-400 truncate">
            {data.subtitle}
          </div>
        </div>
      </div>
      <div className="mt-2 pt-2 border-t border-white/5 flex items-center justify-between text-[9px] text-zinc-400">
        <span className="text-cyan-400 font-mono">{data.yearsExperience}y exp</span>
        <span className="text-zinc-500">·</span>
        <span className="capitalize text-emerald-400">{data.availability?.toLowerCase().replace('_', ' ')}</span>
      </div>
      <Handle type="source" position={Position.Bottom} className="!bg-cyan-400 !w-2 !h-2 !border-none" />
    </div>
  );
}

export function SkillNode({ data }: { data: any }) {
  return (
    <div className="group relative rounded-lg border border-cyan-500/20 bg-cyan-950/20 backdrop-blur-md px-3 py-2 min-w-[130px] shadow-lg hover:border-cyan-400/60 transition-all cursor-pointer">
      <Handle type="target" position={Position.Top} className="!bg-cyan-400 !w-1.5 !h-1.5" />
      <div className="flex items-center space-x-1.5">
        <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse" />
        <span className="text-[11px] font-semibold text-cyan-200 truncate group-hover:text-white transition-colors">
          {data.label}
        </span>
      </div>
      <div className="text-[9px] text-zinc-400 mt-0.5 truncate uppercase tracking-wider font-mono">
        {data.subtitle}
      </div>
      <Handle type="source" position={Position.Bottom} className="!bg-cyan-400 !w-1.5 !h-1.5" />
    </div>
  );
}

export function ProjectNode({ data }: { data: any }) {
  return (
    <div className="group relative rounded-xl border border-violet-500/30 bg-violet-950/20 backdrop-blur-md p-3 min-w-[180px] shadow-xl hover:border-violet-400/60 transition-all cursor-pointer">
      <Handle type="target" position={Position.Top} className="!bg-violet-400 !w-2 !h-2" />
      <div className="text-[10px] text-violet-300 font-mono uppercase tracking-wider mb-0.5">
        Project Initiative
      </div>
      <div className="text-xs font-semibold text-white group-hover:text-violet-200 transition-colors truncate">
        {data.label}
      </div>
      <div className="text-[10px] text-zinc-400 mt-1 truncate">
        {data.subtitle}
      </div>
      <div className="mt-2 flex items-center justify-between text-[9px] border-t border-violet-500/20 pt-1.5">
        <span className="text-violet-300 font-medium">{data.status}</span>
      </div>
      <Handle type="source" position={Position.Bottom} className="!bg-violet-400 !w-2 !h-2" />
    </div>
  );
}

export function OpportunityNode({ data }: { data: any }) {
  return (
    <div className="group relative rounded-xl border border-amber-500/30 bg-amber-950/20 backdrop-blur-md p-2.5 min-w-[160px] shadow-lg hover:border-amber-400/60 transition-all cursor-pointer">
      <Handle type="target" position={Position.Top} className="!bg-amber-400 !w-2 !h-2" />
      <div className="text-[9px] font-mono text-amber-300 uppercase tracking-wider">
        Hidden Synergy
      </div>
      <div className="text-[11px] font-semibold text-white group-hover:text-amber-200 transition-colors line-clamp-2">
        {data.label}
      </div>
      <div className="text-[10px] text-amber-400/80 font-mono mt-1">
        {data.subtitle}
      </div>
      <Handle type="source" position={Position.Bottom} className="!bg-amber-400 !w-2 !h-2" />
    </div>
  );
}
