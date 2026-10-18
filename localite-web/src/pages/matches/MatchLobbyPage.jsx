import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
  Clock,
  Users,
  Sun,
  ChatCircle,
  PaperPlaneRight,
  Check,
  MapPin,
} from '@phosphor-icons/react';

export default function MatchLobbyPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [timeLeft, setTimeLeft] = useState({ minutes: 14, seconds: 59 });
  const [chatMessage, setChatMessage] = useState('');
  const [chatList, setChatList] = useState([
    {
      id: 1,
      sender: 'Marcus Chen',
      time: '14:42',
      isMe: false,
      text: 'Are we playing 3 sets or best of 5 for badminton doubles?',
    },
    {
      id: 2,
      sender: 'You',
      time: '14:45',
      isMe: true,
      text: 'Best of 3 sets to 21 points. Shuttlecocks are ready on Court 2.',
    },
  ]);

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev.seconds === 0) {
          if (prev.minutes === 0) {
            clearInterval(timer);
            return prev;
          }
          return { minutes: prev.minutes - 1, seconds: 59 };
        }
        return { ...prev, seconds: prev.seconds - 1 };
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const handleSendChat = (e) => {
    e.preventDefault();
    if (!chatMessage.trim()) return;
    setChatList((prev) => [
      ...prev,
      {
        id: Date.now(),
        sender: 'You',
        time: new Date().toLocaleTimeString([], {
          hour: '2-digit',
          minute: '2-digit',
        }),
        isMe: true,
        text: chatMessage.trim(),
      },
    ]);
    setChatMessage('');
  };

  return (
    <div className="bg-bg min-h-[calc(100vh-65px)] flex flex-col lg:flex-row">
      {/* Main Area */}
      <main className="flex-1 p-6 lg:p-10 space-y-8 overflow-y-auto">
        {/* Match Header */}
        <div className="bg-white border border-border rounded-card p-6 sm:p-8 space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="space-y-1">
              <span className="text-xs font-mono text-accent uppercase tracking-wider block">
                Pre-Match Lobby
              </span>
              <h1 className="text-2xl sm:text-3xl font-display font-semibold text-fg tracking-tight">
                Badminton Doubles League Match
              </h1>
              <p className="text-xs font-mono text-fg-muted flex items-center gap-1.5">
                <MapPin size={13} className="text-accent" />
                Indiranagar Sports Club — Court 2
              </p>
            </div>

            <div className="text-left sm:text-right bg-bg-subtle p-3.5 rounded-card border border-border/60">
              <span className="text-[10px] font-mono text-fg-muted uppercase tracking-wider block">
                Match Starts In
              </span>
              <div className="text-2xl font-display font-semibold text-fg mt-0.5 font-mono">
                {String(timeLeft.minutes).padStart(2, '0')}:
                {String(timeLeft.seconds).padStart(2, '0')}
              </div>
            </div>
          </div>
        </div>

        {/* Teams 2-Col Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {/* Team Alpha */}
          <div className="bg-white border border-border rounded-card p-6 space-y-4">
            <div className="flex justify-between items-center pb-3 border-b border-border">
              <div className="flex items-center gap-2">
                <div className="w-2.5 h-2.5 rounded-full bg-accent" />
                <h3 className="font-display font-semibold text-base text-fg">
                  Team Alpha
                </h3>
              </div>
              <span className="text-[11px] font-mono text-accent bg-accent-subtle px-2 py-0.5 rounded-full">
                2/2 Checked In
              </span>
            </div>

            <div className="space-y-3 divide-y divide-border/60">
              <div className="pt-2 first:pt-0 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-full bg-bg-subtle border border-border flex items-center justify-center font-display font-medium text-xs text-fg">
                    MC
                  </div>
                  <div>
                    <p className="text-xs font-display font-medium text-fg">
                      Marcus Chen
                    </p>
                    <p className="text-[10px] font-mono text-fg-muted">
                      Rating 1,420
                    </p>
                  </div>
                </div>
                <span className="inline-flex items-center gap-1 text-[10px] font-mono text-accent">
                  <Check size={12} weight="bold" /> At Court
                </span>
              </div>

              <div className="pt-3 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-full bg-bg-subtle border border-border flex items-center justify-center font-display font-medium text-xs text-fg">
                    ER
                  </div>
                  <div>
                    <p className="text-xs font-display font-medium text-fg">
                      Elena Rao
                    </p>
                    <p className="text-[10px] font-mono text-fg-muted">
                      Rating 1,390
                    </p>
                  </div>
                </div>
                <span className="inline-flex items-center gap-1 text-[10px] font-mono text-accent">
                  <Check size={12} weight="bold" /> At Court
                </span>
              </div>
            </div>
          </div>

          {/* Team Bravo */}
          <div className="bg-white border border-border rounded-card p-6 space-y-4">
            <div className="flex justify-between items-center pb-3 border-b border-border">
              <div className="flex items-center gap-2">
                <div className="w-2.5 h-2.5 rounded-full bg-fg-muted" />
                <h3 className="font-display font-semibold text-base text-fg">
                  Team Bravo
                </h3>
              </div>
              <span className="text-[11px] font-mono text-fg-muted bg-bg-subtle px-2 py-0.5 rounded-full">
                1/2 Checked In
              </span>
            </div>

            <div className="space-y-3 divide-y divide-border/60">
              <div className="pt-2 first:pt-0 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-full bg-bg-subtle border border-border flex items-center justify-center font-display font-medium text-xs text-fg">
                    SK
                  </div>
                  <div>
                    <p className="text-xs font-display font-medium text-fg">
                      Sasha Kumar
                    </p>
                    <p className="text-[10px] font-mono text-fg-muted">
                      Rating 1,410
                    </p>
                  </div>
                </div>
                <span className="inline-flex items-center gap-1 text-[10px] font-mono text-accent">
                  <Check size={12} weight="bold" /> At Court
                </span>
              </div>

              <div className="pt-3 flex items-center justify-between opacity-60">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-full bg-bg-subtle border border-border flex items-center justify-center font-display font-medium text-xs text-fg">
                    LO
                  </div>
                  <div>
                    <p className="text-xs font-display font-medium text-fg">
                      Liam O'Neill
                    </p>
                    <p className="text-[10px] font-mono text-fg-muted">
                      Rating 1,385
                    </p>
                  </div>
                </div>
                <span className="text-[10px] font-mono text-fg-muted">
                  In Transit
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Match Intel Card */}
        <div className="bg-white border border-border rounded-card p-6 space-y-3">
          <h4 className="font-mono text-xs text-fg-muted uppercase tracking-wider">
            Match Conditions
          </h4>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-center text-xs font-mono">
            <div className="p-3 bg-bg-subtle rounded-card border border-border/60">
              <span className="text-[10px] text-fg-muted block uppercase">Indoor</span>
              <span className="font-display font-semibold text-fg mt-0.5 block">Air Conditioned</span>
            </div>
            <div className="p-3 bg-bg-subtle rounded-card border border-border/60">
              <span className="text-[10px] text-fg-muted block uppercase">Surface</span>
              <span className="font-display font-semibold text-fg mt-0.5 block">Synthetic Mat</span>
            </div>
            <div className="p-3 bg-bg-subtle rounded-card border border-border/60">
              <span className="text-[10px] text-fg-muted block uppercase">Sets</span>
              <span className="font-display font-semibold text-fg mt-0.5 block">Best of 3 (21 pts)</span>
            </div>
            <div className="p-3 bg-bg-subtle rounded-card border border-border/60">
              <span className="text-[10px] text-fg-muted block uppercase">Rating Diff</span>
              <span className="font-display font-semibold text-accent mt-0.5 block">+/- 15 ELO</span>
            </div>
          </div>
        </div>
      </main>

      {/* Lobby Chat Sidebar */}
      <aside className="w-full lg:w-96 bg-white border-t lg:border-t-0 lg:border-l border-border flex flex-col shrink-0">
        <div className="px-6 py-4 border-b border-border flex justify-between items-center bg-white">
          <div className="flex items-center gap-2">
            <ChatCircle size={16} className="text-accent" />
            <h3 className="font-display font-semibold text-sm text-fg">
              Lobby Discussion
            </h3>
          </div>
          <span className="text-[10px] font-mono text-accent bg-accent-subtle px-2 py-0.5 rounded-full">
            Live
          </span>
        </div>

        <div className="flex-1 p-5 overflow-y-auto space-y-3 bg-bg max-h-[380px] lg:max-h-none">
          {chatList.map((chat) => (
            <div
              key={chat.id}
              className={`flex flex-col ${chat.isMe ? 'items-end' : 'items-start'}`}
            >
              <span className="text-[10px] font-mono text-fg-muted mb-1 px-1">
                {chat.sender} • {chat.time}
              </span>
              <div
                className={`p-3 rounded-card text-xs max-w-[85%] leading-relaxed ${
                  chat.isMe
                    ? 'bg-accent text-white'
                    : 'bg-white text-fg border border-border'
                }`}
              >
                {chat.text}
              </div>
            </div>
          ))}
        </div>

        <form
          onSubmit={handleSendChat}
          className="p-3 bg-white border-t border-border flex items-center gap-2"
        >
          <input
            type="text"
            value={chatMessage}
            onChange={(e) => setChatMessage(e.target.value)}
            placeholder="Message players..."
            className="flex-1 bg-bg-subtle border border-border rounded-btn py-2 px-3 text-xs font-mono text-fg placeholder:text-fg-faint focus:outline-none focus:border-accent"
          />
          <button
            type="submit"
            disabled={!chatMessage.trim()}
            className="h-8 px-3 bg-accent text-white rounded-btn flex items-center justify-center hover:opacity-90 disabled:opacity-40 transition-opacity"
          >
            <PaperPlaneRight size={14} weight="bold" />
          </button>
        </form>
      </aside>
    </div>
  );
}
