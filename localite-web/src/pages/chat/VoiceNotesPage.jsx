import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Play, Pause, Microphone, ArrowLeft, Quotes } from '@phosphor-icons/react';

export default function VoiceNotesPage() {
  const navigate = useNavigate();
  const [seconds, setSeconds] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isRecording, setIsRecording] = useState(false);

  useEffect(() => {
    let interval = null;
    if (isRecording) {
      interval = setInterval(() => setSeconds((s) => s + 1), 1000);
    }
    return () => clearInterval(interval);
  }, [isRecording]);

  const formatTime = (totalSeconds) => {
    const mins = Math.floor(totalSeconds / 60);
    const secs = totalSeconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div className="min-h-[calc(100vh-80px)] bg-[var(--bg)] text-[var(--fg)] max-w-5xl mx-auto px-6 py-24 font-sans animate-fade-in">
      {/* Header */}
      <header className="mb-10 flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-[var(--border)] pb-8">
        <div>
          <button
            onClick={() => navigate(-1)}
            className="flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-[var(--fg-muted)] hover:text-[var(--fg)] mb-3 transition-colors"
          >
            <ArrowLeft size={14} />
            <span>Back to Messages</span>
          </button>
          <h1 className="text-3xl font-semibold tracking-tight text-[var(--fg)]">
            Voice Memos & Audio Notes
          </h1>
          <p className="text-sm text-[var(--fg-muted)] mt-1">
            Asynchronous audio dispatches with automated transcription.
          </p>
        </div>
      </header>

      {/* Main Player Card */}
      <div className="space-y-6">
        <div className="bg-[var(--bg)] p-6 md:p-8 rounded-card border border-[var(--border)] space-y-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3.5">
              <div className="w-12 h-12 rounded-full bg-[var(--bg-subtle)] border border-[var(--border)] flex items-center justify-center text-sm font-bold text-[var(--fg)]">
                JT
              </div>
              <div>
                <h3 className="text-base font-semibold text-[var(--fg)]">Julian Thorne</h3>
                <p className="text-xs text-[var(--fg-muted)]">Audio Dispatch • 2:45 min</p>
              </div>
            </div>
            <span className="text-xs font-mono text-[var(--fg-muted)]">Received Today, 4:15 PM</span>
          </div>

          {/* Waveform Bar Player */}
          <div className="p-4 bg-[var(--bg-subtle)] rounded-card border border-[var(--border)] flex items-center gap-4">
            <button
              onClick={() => setIsPlaying(!isPlaying)}
              className="w-10 h-10 rounded-full bg-[var(--accent)] hover:bg-[var(--accent)]/90 text-white flex items-center justify-center transition-all shadow-sm active:scale-95 shrink-0"
            >
              {isPlaying ? (
                <Pause size={18} weight="fill" />
              ) : (
                <Play size={18} weight="fill" className="ml-0.5" />
              )}
            </button>

            {/* Visualizer bars */}
            <div className="flex-1 h-8 flex items-center gap-1 overflow-hidden">
              {[
                40, 65, 30, 85, 90, 50, 75, 40, 60, 80, 95, 45, 30, 70, 85, 40, 55, 60, 90, 35, 75, 50, 85,
                60, 40, 70, 80, 95, 50, 30, 65, 80, 45, 60, 75,
              ].map((height, i) => (
                <div
                  key={i}
                  className={`w-1 rounded-full transition-all duration-300 ${
                    isPlaying && i < 15 ? 'bg-[var(--accent)]' : 'bg-neutral-300'
                  }`}
                  style={{ height: `${height}%` }}
                ></div>
              ))}
            </div>

            <span className="text-xs font-mono text-[var(--fg-muted)] shrink-0">
              {isPlaying ? '0:42 / 2:45' : '2:45'}
            </span>
          </div>

          {/* Transcript Quote */}
          <div className="p-4 bg-[var(--bg)] rounded-card border border-[var(--border)] space-y-2">
            <div className="flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-[var(--accent)]">
              <Quotes size={16} weight="fill" />
              <span>Automated Transcription</span>
            </div>
            <p className="text-xs text-[var(--fg)] leading-relaxed italic">
              "The gallery session is confirmed for 7:00 PM tonight. I've reserved our corner table for the
              post-gathering discussion. Looking forward to catching up with the team."
            </p>
          </div>
        </div>

        {/* Quick Record Dock */}
        <div className="bg-[var(--bg-subtle)] p-6 rounded-card border border-[var(--border)] flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div
              className={`w-10 h-10 rounded-full flex items-center justify-center transition-colors ${
                isRecording
                  ? 'bg-rose-500 text-white animate-pulse'
                  : 'bg-[var(--bg)] border border-[var(--border)] text-[var(--fg)]'
              }`}
            >
              <Microphone size={20} weight={isRecording ? 'fill' : 'regular'} />
            </div>
            <div>
              <h4 className="text-sm font-semibold text-[var(--fg)]">
                {isRecording ? 'Recording Voice Memo...' : 'Record Audio Response'}
              </h4>
              <p className="text-xs text-[var(--fg-muted)]">
                {isRecording ? formatTime(seconds) : 'Tap to start recording an audio note'}
              </p>
            </div>
          </div>

          <button
            onClick={() => {
              if (isRecording) {
                setIsRecording(false);
                setSeconds(0);
                alert('Voice note dispatched!');
              } else {
                setIsRecording(true);
              }
            }}
            className={`px-5 py-2.5 rounded-card text-xs font-semibold uppercase tracking-wider transition-all active:scale-95 shadow-sm ${
              isRecording
                ? 'bg-rose-600 hover:bg-rose-700 text-white'
                : 'bg-[var(--accent)] hover:bg-[var(--accent)]/90 text-white'
            }`}
          >
            {isRecording ? 'Finish & Dispatch' : 'Start Recording'}
          </button>
        </div>
      </div>
    </div>
  );
}
