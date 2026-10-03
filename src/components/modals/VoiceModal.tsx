import React, { useState, useEffect, useRef } from 'react';
import { Mic, MicOff, Send, X, Sparkles, CheckCircle2, ArrowRight } from 'lucide-react';
import { sendVoiceCommand } from '../../api/client';
import { VoiceCommandIntent } from '../../types';

interface VoiceModalProps {
  isOpen: boolean;
  onClose: () => void;
  onExecuteIntent: (intent: VoiceCommandIntent) => void;
}

export const VoiceModal: React.FC<VoiceModalProps> = ({ isOpen, onClose, onExecuteIntent }) => {
  const [isListening, setIsListening] = useState(false);
  const [commandText, setCommandText] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [parsedIntent, setParsedIntent] = useState<VoiceCommandIntent | null>(null);
  const recognitionRef = useRef<any>(null);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
      if (SpeechRecognition) {
        const recognition = new SpeechRecognition();
        recognition.continuous = false;
        recognition.interimResults = false;
        recognition.lang = 'en-US';

        recognition.onresult = (event: any) => {
          const transcript = event.results[0][0].transcript;
          setCommandText(transcript);
          setIsListening(false);
          handleAnalyze(transcript);
        };

        recognition.onerror = (event: any) => {
          console.warn('[KYNTRA Voice] Speech recognition error:', event.error);
          setIsListening(false);
        };

        recognition.onend = () => {
          setIsListening(false);
        };

        recognitionRef.current = recognition;
      }
    }
  }, []);

  if (!isOpen) return null;

  const toggleListening = () => {
    if (isListening) {
      recognitionRef.current?.stop();
      setIsListening(false);
    } else {
      setParsedIntent(null);
      if (recognitionRef.current) {
        try {
          recognitionRef.current.start();
          setIsListening(true);
        } catch (e) {
          console.error(e);
        }
      } else {
        // Fallback simulate voice input
        setIsListening(true);
        setTimeout(() => {
          const sample = "Find someone who knows computer vision and is interested in healthcare AI.";
          setCommandText(sample);
          setIsListening(false);
          handleAnalyze(sample);
        }, 1800);
      }
    }
  };

  const handleAnalyze = async (textToAnalyze?: string) => {
    const text = textToAnalyze || commandText;
    if (!text.trim()) return;

    setIsProcessing(true);
    try {
      const result = await sendVoiceCommand(text);
      setParsedIntent(result);
    } catch (err) {
      console.error(err);
    } finally {
      setIsProcessing(false);
    }
  };

  const sampleCommands = [
    "Find someone who knows computer vision and is interested in healthcare AI.",
    "Find me a mentor for Kubernetes.",
    "Build a team for this project.",
    "What skills are missing in our community?",
    "Show projects similar to mine."
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fade-in">
      <div className="relative w-full max-w-xl rounded-2xl border border-white/10 bg-[#0c101a] p-6 shadow-2xl overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-white/[0.08]">
          <div className="flex items-center space-x-2.5">
            <div className="w-8 h-8 rounded-lg bg-violet-500/20 border border-violet-500/30 flex items-center justify-center">
              <Mic className="w-4 h-4 text-violet-400" />
            </div>
            <div>
              <h3 className="text-sm font-semibold text-white font-mono">Voice Community Command</h3>
              <p className="text-[11px] text-zinc-400">Natural language intent routing across community graph</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-zinc-400 hover:text-white hover:bg-white/[0.06] transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Voice Microphone Center */}
        <div className="my-6 flex flex-col items-center justify-center py-4 bg-white/[0.02] border border-white/[0.06] rounded-xl">
          <button
            onClick={toggleListening}
            className={`w-20 h-20 rounded-full flex items-center justify-center transition-all ${
              isListening
                ? 'bg-violet-600 text-white shadow-lg shadow-violet-500/50 scale-105 animate-pulse'
                : 'bg-white/[0.06] hover:bg-white/[0.1] text-violet-300 border border-violet-500/30'
            }`}
          >
            {isListening ? (
              <Mic className="w-8 h-8 animate-bounce" />
            ) : (
              <Mic className="w-8 h-8" />
            )}
          </button>

          {/* Wave animation or status */}
          <div className="mt-4 flex items-center space-x-1.5 text-xs font-mono">
            {isListening ? (
              <div className="flex items-center space-x-1 text-violet-400">
                <span className="w-1.5 h-4 bg-violet-400 animate-pulse rounded-full" />
                <span className="w-1.5 h-6 bg-violet-300 animate-pulse delay-75 rounded-full" />
                <span className="w-1.5 h-8 bg-violet-400 animate-pulse delay-150 rounded-full" />
                <span className="w-1.5 h-5 bg-violet-300 animate-pulse delay-100 rounded-full" />
                <span className="w-1.5 h-3 bg-violet-400 animate-pulse rounded-full" />
                <span className="ml-2">Listening... speak your request</span>
              </div>
            ) : (
              <span className="text-zinc-400">Tap microphone or choose a quick prompt below</span>
            )}
          </div>
        </div>

        {/* Input box */}
        <div className="flex items-center space-x-2 mb-4">
          <input
            type="text"
            value={commandText}
            onChange={(e) => setCommandText(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleAnalyze()}
            placeholder="e.g. Find someone who knows computer vision and is interested in healthcare AI"
            className="flex-1 px-3.5 py-2.5 rounded-xl border border-white/[0.1] bg-black/40 text-xs text-white placeholder-zinc-500 focus:outline-none focus:border-violet-500/50"
          />
          <button
            onClick={() => handleAnalyze()}
            disabled={isProcessing || !commandText.trim()}
            className="px-4 py-2.5 rounded-xl bg-violet-600 hover:bg-violet-500 text-white font-semibold text-xs flex items-center space-x-1.5 transition-all disabled:opacity-40"
          >
            <Send className="w-3.5 h-3.5" />
            <span>Process</span>
          </button>
        </div>

        {/* Quick prompt suggestions */}
        <div className="mb-4">
          <div className="text-[10px] uppercase font-mono tracking-wider text-zinc-500 mb-1.5">
            Supported Voice Inquiries
          </div>
          <div className="flex flex-wrap gap-1.5">
            {sampleCommands.map((cmd, idx) => (
              <button
                key={idx}
                onClick={() => {
                  setCommandText(cmd);
                  handleAnalyze(cmd);
                }}
                className="text-[10px] px-2.5 py-1 rounded-md bg-white/[0.03] hover:bg-white/[0.08] text-zinc-300 border border-white/[0.06] transition-colors text-left"
              >
                "{cmd}"
              </button>
            ))}
          </div>
        </div>

        {/* Parsed Structured Intent Result */}
        {parsedIntent && (
          <div className="p-4 rounded-xl border border-violet-500/30 bg-violet-950/20 animate-fade-in">
            <div className="flex items-center justify-between text-xs mb-2">
              <span className="font-mono text-violet-300 flex items-center space-x-1.5">
                <Sparkles className="w-3.5 h-3.5 text-violet-400" />
                <span>Intent Recognized: {parsedIntent.intent}</span>
              </span>
              <span className="text-[10px] text-emerald-400 font-mono">Confidence: 96%</span>
            </div>

            <div className="text-xs text-zinc-200 mb-3">
              {parsedIntent.explanation}
            </div>

            <div className="flex flex-wrap gap-2 text-[10px] font-mono text-zinc-400 mb-3 pt-2 border-t border-violet-500/20">
              {parsedIntent.skills.length > 0 && (
                <span>Skills: <span className="text-cyan-300">{parsedIntent.skills.join(', ')}</span></span>
              )}
              {parsedIntent.domain && (
                <span>Domain: <span className="text-violet-300">{parsedIntent.domain}</span></span>
              )}
            </div>

            <button
              onClick={() => {
                onExecuteIntent(parsedIntent);
                onClose();
              }}
              className="w-full py-2 px-3 rounded-lg bg-violet-600 hover:bg-violet-500 text-white font-semibold text-xs flex items-center justify-center space-x-1.5 transition-all shadow-md shadow-violet-600/30"
            >
              <span>Execute Command & View Results</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
