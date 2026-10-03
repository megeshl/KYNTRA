import React, { useState } from 'react';
import {
  X,
  ChevronRight,
  ChevronLeft,
  Sparkles,
  Camera,
  Users2,
  Radar,
  GitMerge,
  Smartphone,
  CheckCircle2,
  Play
} from 'lucide-react';

interface DemoTourModalProps {
  isOpen: boolean;
  onClose: () => void;
  onNavigateToStep: (viewId: string) => void;
}

export const DemoTourModal: React.FC<DemoTourModalProps> = ({
  isOpen,
  onClose,
  onNavigateToStep
}) => {
  const [currentStep, setCurrentStep] = useState(0);

  if (!isOpen) return null;

  const steps = [
    {
      title: 'Step 1: The Community Intelligence Layer',
      subtitle: 'Mapping people, skills, projects, and intent',
      description: 'KYNTRA is not a social network or simple directory. It connects 30+ developers, 22 skills, and 10 active projects through a dynamic Community Intelligence Graph.',
      viewId: 'dashboard',
      actionLabel: 'View Command Center & Pulse',
      icon: Sparkles
    },
    {
      title: 'Step 2: Community Lens Vision Pipeline',
      subtitle: 'Camera / image understanding on mobile or web',
      description: 'Scan a hackathon poster or whiteboard with Community Lens. The vision engine extracts project context: "AI Healthcare Challenge", requiring Computer Vision, Machine Learning, Python, and UI/UX.',
      viewId: 'lens',
      actionLabel: 'Open Community Lens',
      icon: Camera
    },
    {
      title: 'Step 3: KYNTRA Assemble (Primary Demo Feature)',
      subtitle: 'Autonomous multidisciplinary squad composition',
      description: 'Run the TeamAssemblyEngine. KYNTRA discovers Priya (Computer Vision), Arun (ML/Data), Rahul (Backend), and Meena (UI/UX) with 96% capability coverage and 4/4 availability.',
      viewId: 'assemble',
      actionLabel: 'Launch KYNTRA Assemble',
      icon: Users2
    },
    {
      title: 'Step 4: Office Kit Demo Bridge',
      subtitle: 'Phone capture to laptop workspace synchronization',
      description: 'Live bi-directional Socket.IO tunnel relays field captures from the iQOO phone straight to the judge’s laptop screen with zero page refresh.',
      viewId: 'dashboard',
      actionLabel: 'Inspect Sync Bridge',
      icon: Smartphone
    },
    {
      title: 'Step 5: Skill Gap Radar',
      subtitle: 'Detecting community-wide talent shortages',
      description: 'Radar flags a Critical Gap in Computer Vision: 17 active projects require it, while only 6 active community members possess verified expertise.',
      viewId: 'skill-gaps',
      actionLabel: 'Inspect Skill Gap Radar',
      icon: Radar
    },
    {
      title: 'Step 6: Project Collision Detection',
      subtitle: 'Eliminating duplicate work & creating synergy',
      description: 'Identifies 92% semantic overlap between "AI Resume Analyzer" and "AI Career Recommendation Engine". Recommends dataset consolidation and team introductions.',
      viewId: 'collisions',
      actionLabel: 'View Project Overlaps',
      icon: GitMerge
    },
    {
      title: 'Step 7: "Discover. Assemble. Create."',
      subtitle: 'Unlocking hidden community potential',
      description: '"Your community has hidden potential. KYNTRA reveals it." The entire workflow is demo-ready and runs without any third-party API dependencies.',
      viewId: 'graph',
      actionLabel: 'Explore Interactive Graph',
      icon: CheckCircle2
    }
  ];

  const current = steps[currentStep];
  const Icon = current.icon;

  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      onClose();
    }
  };

  const handlePrev = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleJumpToView = () => {
    onNavigateToStep(current.viewId);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-fade-in">
      <div className="relative w-full max-w-xl rounded-2xl border border-cyan-500/30 bg-[#0c101c] p-6 shadow-2xl overflow-hidden">
        {/* Glow */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />

        {/* Top Header */}
        <div className="flex items-center justify-between pb-4 border-b border-white/[0.08]">
          <div className="flex items-center space-x-2">
            <span className="text-[10px] font-mono uppercase tracking-wider text-cyan-400">
              Judges Demo Guide · {currentStep + 1} of {steps.length}
            </span>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-lg text-zinc-400 hover:text-white hover:bg-white/[0.06] transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Content */}
        <div className="my-6">
          <div className="flex items-center space-x-3 mb-3">
            <div className="w-10 h-10 rounded-xl bg-cyan-500/20 border border-cyan-500/30 flex items-center justify-center">
              <Icon className="w-5 h-5 text-cyan-400" />
            </div>
            <div>
              <h3 className="text-base font-bold text-white font-mono">{current.title}</h3>
              <p className="text-xs text-cyan-300">{current.subtitle}</p>
            </div>
          </div>

          <p className="text-xs text-zinc-300 leading-relaxed bg-white/[0.02] border border-white/[0.05] p-3.5 rounded-xl">
            {current.description}
          </p>
        </div>

        {/* Progress bar */}
        <div className="w-full bg-white/[0.06] h-1 rounded-full mb-6 overflow-hidden">
          <div
            className="bg-gradient-to-r from-cyan-400 to-blue-500 h-full transition-all duration-300"
            style={{ width: `${((currentStep + 1) / steps.length) * 100}%` }}
          />
        </div>

        {/* Navigation Buttons */}
        <div className="flex items-center justify-between">
          <button
            onClick={handlePrev}
            disabled={currentStep === 0}
            className="px-3 py-1.5 rounded-lg border border-white/[0.08] text-xs text-zinc-400 hover:text-white disabled:opacity-30 transition-colors flex items-center space-x-1"
          >
            <ChevronLeft className="w-3.5 h-3.5" />
            <span>Previous</span>
          </button>

          <button
            onClick={handleJumpToView}
            className="px-4 py-2 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-black font-semibold text-xs flex items-center space-x-1.5 transition-all shadow-md shadow-cyan-500/20"
          >
            <Play className="w-3 h-3 fill-black" />
            <span>{current.actionLabel}</span>
          </button>

          <button
            onClick={handleNext}
            className="px-3 py-1.5 rounded-lg border border-white/[0.08] text-xs text-zinc-300 hover:text-white transition-colors flex items-center space-x-1"
          >
            <span>{currentStep === steps.length - 1 ? 'Done' : 'Next'}</span>
            <ChevronRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </div>
  );
};
