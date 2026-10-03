import React, { useState, useRef, useEffect } from 'react';
import {
  Camera,
  Upload,
  Sparkles,
  CheckCircle2,
  RefreshCw,
  ArrowRight,
  Users2,
  Share2,
  FileImage,
  Zap,
  Plus
} from 'lucide-react';
import { analyzeLensImage, addLensContextToCommunity } from '../api/client';
import { LensAnalysisResult } from '../types';

interface LensViewProps {
  onNavigateToAssemble: (projectName: string, skills: string[]) => void;
  onNavigateToGraph: () => void;
}

export const LensView: React.FC<LensViewProps> = ({
  onNavigateToAssemble,
  onNavigateToGraph
}) => {
  const [cameraActive, setCameraActive] = useState(false);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysisResult, setAnalysisResult] = useState<LensAnalysisResult | null>(null);
  const [capturedImage, setCapturedImage] = useState<string | null>(null);
  const [addedToCommunity, setAddedToCommunity] = useState(false);
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const streamRef = useRef<MediaStream | null>(null);

  // Stop camera stream on unmount
  useEffect(() => {
    return () => {
      if (streamRef.current) {
        streamRef.current.getTracks().forEach(track => track.stop());
      }
    };
  }, []);

  const startCamera = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: 'environment', width: { ideal: 1280 }, height: { ideal: 720 } }
      });
      streamRef.current = stream;
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        videoRef.current.play();
      }
      setCameraActive(true);
    } catch (err) {
      console.warn('Camera access not available or denied, falling back to samples:', err);
      // Simulate snapshot
      handleAnalyzeSample('poster-health');
    }
  };

  const capturePhoto = () => {
    if (videoRef.current && canvasRef.current) {
      const video = videoRef.current;
      const canvas = canvasRef.current;
      canvas.width = video.videoWidth || 640;
      canvas.height = video.videoHeight || 480;
      const ctx = canvas.getContext('2d');
      if (ctx) {
        ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
        const dataUrl = canvas.toDataURL('image/jpeg');
        setCapturedImage(dataUrl);

        // Stop stream
        if (streamRef.current) {
          streamRef.current.getTracks().forEach(track => track.stop());
          setCameraActive(false);
        }

        // Run analysis
        handleAnalyze(dataUrl);
      }
    }
  };

  const handleAnalyze = async (imgData: string) => {
    setIsAnalyzing(true);
    setAddedToCommunity(false);
    try {
      const res = await analyzeLensImage(imgData);
      setAnalysisResult(res);
    } catch (e) {
      console.error(e);
    } finally {
      setIsAnalyzing(false);
    }
  };

  const handleAnalyzeSample = async (sampleType: string) => {
    setIsAnalyzing(true);
    setAddedToCommunity(false);
    try {
      const res = await analyzeLensImage(undefined, sampleType);
      setAnalysisResult(res);
    } catch (e) {
      console.error(e);
    } finally {
      setIsAnalyzing(false);
    }
  };

  const handleAddToCommunity = async () => {
    if (!analysisResult) return;
    try {
      await addLensContextToCommunity({
        projectName: analysisResult.projectName,
        domain: analysisResult.domain,
        skills: analysisResult.detectedSkills,
        eventName: analysisResult.eventName
      });
      setAddedToCommunity(true);
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <div className="space-y-6 pb-16 animate-fade-in">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-2 border-b border-white/[0.06]">
        <div>
          <div className="flex items-center space-x-2 text-amber-400 text-xs font-mono mb-1">
            <Camera className="w-4 h-4" />
            <span className="font-semibold uppercase tracking-wider">FEATURE 4: VISION UNDERSTANDING</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold text-white font-mono tracking-tight">
            COMMUNITY LENS
          </h1>
          <p className="text-xs sm:text-sm text-zinc-400 mt-1">
            Capture hackathon posters, project boards, or whiteboard sketches. KYNTRA extracts skill requirements and immediately surfaces matching collaborators.
          </p>
        </div>
      </div>

      {/* Camera Viewfinder & Ingest Area */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Left: Viewfinder / Video */}
        <div className="relative rounded-2xl border border-white/[0.1] bg-black/60 overflow-hidden min-h-[320px] flex flex-col items-center justify-center p-4">
          <canvas ref={canvasRef} className="hidden" />

          {cameraActive ? (
            <div className="relative w-full h-full flex flex-col items-center">
              <video ref={videoRef} className="w-full h-72 object-cover rounded-xl" autoPlay playsInline muted />
              <div className="absolute inset-0 border-2 border-cyan-500/50 rounded-xl pointer-events-none flex items-center justify-center">
                <div className="w-48 h-48 border border-dashed border-cyan-400/60 rounded-lg flex items-center justify-center">
                  <span className="text-[10px] font-mono text-cyan-300 bg-black/60 px-2 py-0.5 rounded">
                    ALIGN POSTER
                  </span>
                </div>
              </div>
              <button
                onClick={capturePhoto}
                className="mt-4 px-6 py-2.5 rounded-full bg-cyan-400 hover:bg-cyan-300 text-black font-bold text-xs uppercase tracking-wider flex items-center space-x-2 shadow-lg shadow-cyan-500/30"
              >
                <Camera className="w-4 h-4" />
                <span>Capture Frame</span>
              </button>
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center text-center p-6 space-y-4">
              <div className="w-16 h-16 rounded-2xl bg-white/[0.04] border border-white/[0.08] flex items-center justify-center">
                <Camera className="w-8 h-8 text-zinc-400" />
              </div>
              <div>
                <h3 className="text-sm font-semibold text-white">Browser Camera or Sample Ingest</h3>
                <p className="text-xs text-zinc-400 mt-1 max-w-sm">
                  Point your device at a hackathon poster or whiteboard to extract project requirements.
                </p>
              </div>
              <div className="flex flex-wrap gap-2 justify-center">
                <button
                  onClick={startCamera}
                  className="px-4 py-2 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-black font-semibold text-xs flex items-center space-x-1.5 transition-all shadow-md shadow-cyan-500/20"
                >
                  <Camera className="w-3.5 h-3.5" />
                  <span>Start Camera</span>
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Right: Quick Sample Presets */}
        <div className="p-5 sm:p-6 rounded-2xl border border-white/[0.08] bg-[#0c101c] flex flex-col justify-between">
          <div>
            <div className="text-[11px] font-mono uppercase tracking-wider text-zinc-400 mb-2">
              Instant Sample Ingest Presets
            </div>
            <p className="text-xs text-zinc-400 mb-4">
              Select a pre-configured hackathon or whiteboard asset to test the vision pipeline immediately:
            </p>

            <div className="space-y-3">
              <button
                onClick={() => handleAnalyzeSample('poster-health')}
                className="w-full p-3.5 rounded-xl border border-cyan-500/30 bg-cyan-950/20 hover:bg-cyan-900/30 text-left transition-all group"
              >
                <div className="flex items-center justify-between text-xs font-semibold text-white group-hover:text-cyan-300">
                  <span className="flex items-center space-x-2">
                    <FileImage className="w-4 h-4 text-cyan-400" />
                    <span>Global HealthTech & AI Hackathon Poster</span>
                  </span>
                  <span className="text-[10px] font-mono text-cyan-400">Sample 01</span>
                </div>
                <div className="text-[11px] text-zinc-400 mt-1 pl-6">
                  Extracts: Computer Vision, Machine Learning, Python, UI/UX for AI Healthcare.
                </div>
              </button>

              <button
                onClick={() => handleAnalyzeSample('poster-infra')}
                className="w-full p-3.5 rounded-xl border border-violet-500/30 bg-violet-950/20 hover:bg-violet-900/30 text-left transition-all group"
              >
                <div className="flex items-center justify-between text-xs font-semibold text-white group-hover:text-violet-300">
                  <span className="flex items-center space-x-2">
                    <FileImage className="w-4 h-4 text-violet-400" />
                    <span>Distributed Cloud Architecture Whiteboard</span>
                  </span>
                  <span className="text-[10px] font-mono text-violet-400">Sample 02</span>
                </div>
                <div className="text-[11px] text-zinc-400 mt-1 pl-6">
                  Extracts: Kubernetes, Ingress routing, Docker, PostgreSQL.
                </div>
              </button>

              <button
                onClick={() => handleAnalyzeSample('poster-drone')}
                className="w-full p-3.5 rounded-xl border border-amber-500/30 bg-amber-950/20 hover:bg-amber-900/30 text-left transition-all group"
              >
                <div className="flex items-center justify-between text-xs font-semibold text-white group-hover:text-amber-300">
                  <span className="flex items-center space-x-2">
                    <FileImage className="w-4 h-4 text-amber-400" />
                    <span>AgriTech Autonomous Drone Summit</span>
                  </span>
                  <span className="text-[10px] font-mono text-amber-400">Sample 03</span>
                </div>
                <div className="text-[11px] text-zinc-400 mt-1 pl-6">
                  Extracts: Computer Vision, Edge AI, Robotics, SLAM algorithms.
                </div>
              </button>
            </div>
          </div>

          <div className="mt-4 pt-3 border-t border-white/[0.06] text-[11px] text-zinc-500 font-mono">
            Pipeline: Optical layout parser → Entity extraction → Community Graph linker
          </div>
        </div>
      </div>

      {/* Analysis Output Result */}
      {isAnalyzing && (
        <div className="p-8 rounded-2xl border border-white/[0.08] bg-[#0c101c] flex flex-col items-center justify-center space-y-3 animate-fade-in">
          <RefreshCw className="w-8 h-8 text-cyan-400 animate-spin" />
          <div className="text-sm font-semibold text-white font-mono">
            Analyzing visual poster features...
          </div>
          <div className="text-xs text-zinc-400">
            Extracting project taxonomy, technical prerequisites, and domain metadata.
          </div>
        </div>
      )}

      {analysisResult && !isAnalyzing && (
        <div className="p-6 rounded-2xl border border-cyan-500/40 bg-gradient-to-br from-[#0c1424] to-[#070b14] space-y-5 animate-fade-in shadow-2xl">
          <div className="flex flex-wrap items-center justify-between gap-2 pb-3 border-b border-white/[0.08]">
            <div className="flex items-center space-x-2">
              <Sparkles className="w-4 h-4 text-cyan-400" />
              <span className="text-xs font-mono uppercase tracking-wider text-cyan-300 font-bold">
                CONTEXT DETECTED BY COMMUNITY LENS
              </span>
            </div>
            <span className="text-xs font-mono text-emerald-400">
              Confidence: {(analysisResult.confidence * 100).toFixed(0)}%
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <div className="text-[10px] font-mono text-zinc-500 uppercase">Identified Project / Event</div>
              <h2 className="text-xl font-bold text-white font-mono mt-1">
                {analysisResult.projectName}
              </h2>
              {analysisResult.eventName && (
                <div className="text-xs text-cyan-400 font-mono mt-0.5">
                  Host: {analysisResult.eventName}
                </div>
              )}
              <p className="text-xs text-zinc-300 mt-2 leading-relaxed">
                {analysisResult.summary}
              </p>
            </div>

            <div>
              <div className="text-[10px] font-mono text-zinc-500 uppercase mb-2">Detected Required Skills</div>
              <div className="flex flex-wrap gap-2">
                {analysisResult.detectedSkills.map(skill => (
                  <span
                    key={skill}
                    className="px-3 py-1 rounded-lg bg-cyan-950/40 border border-cyan-500/30 text-cyan-300 text-xs font-mono"
                  >
                    {skill}
                  </span>
                ))}
              </div>

              <div className="mt-4">
                <div className="text-[10px] font-mono text-zinc-500 uppercase mb-1">Recommended Squad Roles</div>
                <div className="text-xs text-zinc-300 font-mono">
                  {analysisResult.recommendedRoleNeeds.join(' · ')}
                </div>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-wrap items-center gap-3 pt-4 border-t border-white/[0.08]">
            {!addedToCommunity ? (
              <button
                onClick={handleAddToCommunity}
                className="px-4 py-2.5 rounded-xl border border-white/[0.12] bg-white/[0.04] hover:bg-white/[0.08] text-white font-medium text-xs flex items-center space-x-2 transition-colors font-mono"
              >
                <Plus className="w-3.5 h-3.5 text-cyan-400" />
                <span>ADD TO COMMUNITY</span>
              </button>
            ) : (
              <div className="px-4 py-2.5 rounded-xl bg-emerald-500/20 border border-emerald-500/30 text-emerald-300 text-xs font-mono flex items-center space-x-1.5">
                <CheckCircle2 className="w-4 h-4" />
                <span>Added to Community Calendar</span>
              </div>
            )}

            <button
              onClick={onNavigateToGraph}
              className="px-4 py-2.5 rounded-xl border border-white/[0.12] bg-white/[0.04] hover:bg-white/[0.08] text-white font-medium text-xs flex items-center space-x-2 transition-colors font-mono"
            >
              <Share2 className="w-3.5 h-3.5 text-violet-400" />
              <span>DISCOVER PEOPLE</span>
            </button>

            <button
              onClick={() => onNavigateToAssemble(analysisResult.projectName, analysisResult.detectedSkills)}
              className="px-6 py-2.5 rounded-xl bg-cyan-400 hover:bg-cyan-300 text-black font-bold text-xs uppercase tracking-wider font-mono flex items-center space-x-2 transition-all shadow-lg shadow-cyan-500/25 ml-auto"
            >
              <Users2 className="w-4 h-4" />
              <span>ASSEMBLE TEAM</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
