import React, { useState, useEffect, useCallback, useMemo } from 'react';
import {
  ReactFlow,
  Controls,
  Background,
  useNodesState,
  useEdgesState,
  Node,
  Edge,
  MarkerType
} from '@xyflow/react';
import '@xyflow/react/dist/style.css';
import {
  Share2,
  Filter,
  Search,
  X,
  Users2,
  Send,
  Sparkles,
  Info,
  Maximize2
} from 'lucide-react';
import { fetchGraph } from '../api/client';
import { UserNode, SkillNode, ProjectNode, OpportunityNode } from '../components/graph/CustomNodes';

interface GraphViewProps {
  onNavigateToAssemble?: (projectName?: string) => void;
}

export const GraphView: React.FC<GraphViewProps> = ({ onNavigateToAssemble }) => {
  const [nodes, setNodes, onNodesChange] = useNodesState<Node>([]);
  const [edges, setEdges, onEdgesChange] = useEdgesState<Edge>([]);
  const [filter, setFilter] = useState<'all' | 'people' | 'skills' | 'projects' | 'opportunities'>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedNode, setSelectedNode] = useState<any | null>(null);
  const [selectedEdge, setSelectedEdge] = useState<any | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const nodeTypes = useMemo(() => ({
    customUserNode: UserNode,
    customSkillNode: SkillNode,
    customProjectNode: ProjectNode,
    customOpportunityNode: OpportunityNode
  }), []);

  const loadGraph = useCallback(async (currentFilter: string) => {
    setIsLoading(true);
    try {
      const data = await fetchGraph(currentFilter);
      if (data && data.nodes) {
        setNodes(data.nodes);
        setEdges(data.edges.map((e: any) => ({
          ...e,
          style: { stroke: e.animated ? '#00f0ff' : '#475569', strokeWidth: 1.5 },
          markerEnd: { type: MarkerType.ArrowClosed, color: e.animated ? '#00f0ff' : '#475569' }
        })));
      }
    } catch (err) {
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  }, [setNodes, setEdges]);

  useEffect(() => {
    loadGraph(filter);
  }, [filter, loadGraph]);

  const onNodeClick = useCallback((_: any, node: Node) => {
    setSelectedNode(node);
  }, []);

  const onEdgeClick = useCallback((_: any, edge: Edge) => {
    setSelectedEdge(edge);
  }, []);

  // Filter nodes by search query
  const filteredNodes = useMemo(() => {
    if (!searchQuery.trim()) return nodes;
    const q = searchQuery.toLowerCase();
    return nodes.filter(n =>
      (n.data?.label as string)?.toLowerCase().includes(q) ||
      (n.data?.subtitle as string)?.toLowerCase().includes(q)
    );
  }, [nodes, searchQuery]);

  return (
    <div className="relative h-[calc(100vh-8rem)] rounded-2xl border border-white/[0.08] bg-[#07090f] overflow-hidden flex flex-col animate-fade-in">
      {/* Top Bar with Filter & Search */}
      <div className="p-3 border-b border-white/[0.08] bg-[#0c101c]/90 backdrop-blur-md flex flex-wrap items-center justify-between gap-3 z-10">
        <div className="flex items-center space-x-2">
          <div className="flex items-center space-x-1.5 text-xs font-mono text-cyan-400">
            <Share2 className="w-4 h-4" />
            <span className="font-semibold uppercase tracking-wider">COMMUNITY INTELLIGENCE GRAPH</span>
          </div>
          <span className="text-zinc-600">|</span>
          <span className="text-[11px] font-mono text-zinc-400">
            {nodes.length} entities · {edges.length} relationships
          </span>
        </div>

        {/* Filter Pills */}
        <div className="flex items-center space-x-1.5 text-xs font-mono">
          {(['all', 'people', 'skills', 'projects', 'opportunities'] as const).map(tab => (
            <button
              key={tab}
              onClick={() => setFilter(tab)}
              className={`px-3 py-1 rounded-lg transition-colors capitalize ${
                filter === tab
                  ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40'
                  : 'text-zinc-400 hover:text-white hover:bg-white/[0.04]'
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* Search */}
        <div className="relative">
          <Search className="w-3.5 h-3.5 absolute left-2.5 top-2.5 text-zinc-500" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search nodes..."
            className="pl-8 pr-3 py-1.5 rounded-lg border border-white/[0.1] bg-black/40 text-xs text-white placeholder-zinc-500 focus:outline-none focus:border-cyan-500/50 w-44"
          />
        </div>
      </div>

      {/* Main Canvas */}
      <div className="flex-1 w-full h-full relative">
        <ReactFlow
          nodes={filteredNodes}
          edges={edges}
          onNodesChange={onNodesChange}
          onEdgesChange={onEdgesChange}
          onNodeClick={onNodeClick}
          onEdgeClick={onEdgeClick}
          nodeTypes={nodeTypes}
          fitView
          attributionPosition="bottom-right"
          className="bg-[#07090f]"
        >
          <Background color="#1e293b" gap={24} size={1} />
          <Controls className="!bg-[#0c101c] !border-white/10 !text-white !fill-white" />
        </ReactFlow>

        {/* Legend */}
        <div className="absolute bottom-4 left-4 p-3 rounded-xl border border-white/[0.08] bg-[#090d16]/90 backdrop-blur-md text-[11px] font-mono space-y-1.5 pointer-events-none z-10">
          <div className="text-[9px] uppercase tracking-wider text-zinc-500 mb-1">Node Legend</div>
          <div className="flex items-center space-x-2">
            <span className="w-2 h-2 rounded-full bg-cyan-400" />
            <span className="text-zinc-300">User / Practitioner</span>
          </div>
          <div className="flex items-center space-x-2">
            <span className="w-2 h-2 rounded-full bg-cyan-600" />
            <span className="text-zinc-300">Technical Skill</span>
          </div>
          <div className="flex items-center space-x-2">
            <span className="w-2 h-2 rounded-full bg-violet-500" />
            <span className="text-zinc-300">Project Initiative</span>
          </div>
          <div className="flex items-center space-x-2">
            <span className="w-2 h-2 rounded-full bg-amber-400" />
            <span className="text-zinc-300">Hidden Opportunity</span>
          </div>
        </div>

        {/* Node Inspector Drawer */}
        {selectedNode && (
          <div className="absolute top-4 right-4 w-80 max-w-[90vw] rounded-2xl border border-white/[0.12] bg-[#0c101c]/95 backdrop-blur-md p-4 shadow-2xl z-20 animate-fade-in">
            <div className="flex items-center justify-between pb-3 border-b border-white/[0.08]">
              <span className="text-[10px] font-mono uppercase tracking-wider text-cyan-400">
                Entity Inspector · {selectedNode.data?.category}
              </span>
              <button
                onClick={() => setSelectedNode(null)}
                className="p-1 rounded-md text-zinc-400 hover:text-white hover:bg-white/[0.06]"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="mt-3">
              <div className="flex items-center space-x-3 mb-2">
                {selectedNode.data?.avatar && (
                  <img
                    src={selectedNode.data.avatar}
                    alt={selectedNode.data.label}
                    className="w-10 h-10 rounded-xl object-cover border border-white/10"
                  />
                )}
                <div>
                  <h4 className="text-sm font-bold text-white">{selectedNode.data?.label}</h4>
                  <p className="text-xs text-zinc-400">{selectedNode.data?.subtitle}</p>
                </div>
              </div>

              {selectedNode.data?.description && (
                <p className="text-xs text-zinc-300 mt-2 bg-white/[0.02] p-2.5 rounded-lg border border-white/[0.04]">
                  {selectedNode.data.description}
                </p>
              )}

              {selectedNode.data?.category === 'PROJECT' && onNavigateToAssemble && (
                <button
                  onClick={() => onNavigateToAssemble(selectedNode.data.label)}
                  className="w-full mt-4 py-2 px-3 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-black font-semibold text-xs flex items-center justify-center space-x-1.5 transition-all shadow-md shadow-cyan-500/20"
                >
                  <Users2 className="w-3.5 h-3.5" />
                  <span>Assemble Squad for this Project</span>
                </button>
              )}
            </div>
          </div>
        )}

        {/* Edge Explainer Modal */}
        {selectedEdge && (
          <div className="absolute top-4 left-4 w-72 rounded-2xl border border-white/[0.12] bg-[#0c101c]/95 backdrop-blur-md p-4 shadow-2xl z-20 animate-fade-in">
            <div className="flex items-center justify-between pb-2 border-b border-white/[0.08]">
              <span className="text-[10px] font-mono uppercase tracking-wider text-violet-400">
                Relationship Link
              </span>
              <button
                onClick={() => setSelectedEdge(null)}
                className="p-1 rounded-md text-zinc-400 hover:text-white hover:bg-white/[0.06]"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            </div>
            <div className="mt-2 text-xs text-zinc-200">
              <div className="font-mono text-cyan-400 mb-1">{selectedEdge.data?.relationship}</div>
              <p className="text-zinc-400 leading-relaxed">{selectedEdge.data?.explanation || 'Direct graph relationship node link.'}</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
