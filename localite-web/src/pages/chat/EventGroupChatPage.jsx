import { useState, useEffect, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getEventMessages, sendEventMessage, getEventById } from '../../services/api';
import { useWebSocket } from '../../context/WebSocketContext';
import { useAuth } from '../../context/AuthContext';
import { ArrowLeft, PaperPlaneTilt, Users } from '@phosphor-icons/react';

export default function EventGroupChatPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([]);
  const [event, setEvent] = useState(null);
  const { stompClient, isConnected } = useWebSocket();
  const { currentUser } = useAuth();
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    const fetchInitialData = async () => {
      try {
        const ev = await getEventById(id);
        setEvent(ev);
        const msgs = await getEventMessages(id);
        setMessages(msgs || []);
        setTimeout(scrollToBottom, 100);
      } catch (err) {
        console.error('Error fetching chat data:', err);
      }
    };
    fetchInitialData();
  }, [id]);

  useEffect(() => {
    let subscription = null;
    if (isConnected && stompClient) {
      subscription = stompClient.subscribe(`/topic/events/${id}`, (msgFrame) => {
        const newMsg = JSON.parse(msgFrame.body);
        setMessages((prev) => {
          if (prev.find((m) => m.id === newMsg.id)) return prev;
          return [...prev, newMsg];
        });
        setTimeout(scrollToBottom, 100);
      });
    }
    return () => {
      if (subscription) subscription.unsubscribe();
    };
  }, [isConnected, stompClient, id]);

  const handleSendMessage = async (e) => {
    e?.preventDefault();
    if (!message.trim()) return;
    const content = message;
    setMessage('');
    try {
      const sentMsg = await sendEventMessage(id, content);
      setMessages((prev) => {
        if (prev.find((m) => m.id === sentMsg.id)) return prev;
        return [...prev, sentMsg];
      });
      setTimeout(scrollToBottom, 100);
    } catch (error) {
      console.error('Failed to send message', error);
    }
  };

  const formatTime = (isoString) => {
    if (!isoString) return '';
    return new Date(isoString).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  return (
    <div className="flex flex-col md:flex-row min-h-[calc(100vh-80px)] bg-[var(--bg)] text-[var(--fg)] max-w-7xl mx-auto border-x border-[var(--border)] font-sans">
      {/* Left Sidebar (Desktop) */}
      <aside className="hidden lg:flex flex-col w-80 border-r border-[var(--border)] bg-[var(--bg-subtle)] p-6 justify-between">
        <div className="space-y-6">
          <button
            onClick={() => navigate(`/event/${id}`)}
            className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-[var(--fg-muted)] hover:text-[var(--fg)] transition-colors"
          >
            <ArrowLeft size={16} />
            <span>Back to Gathering</span>
          </button>

          <div className="bg-[var(--bg)] p-5 rounded-card border border-[var(--border)] space-y-3">
            <span className="text-[10px] font-semibold uppercase tracking-wider text-[var(--accent)]">
              Event Discussion Room
            </span>
            <h2 className="text-base font-semibold text-[var(--fg)] leading-snug">
              {event?.title || 'Gathering Chat'}
            </h2>
            <p className="text-xs text-[var(--fg-muted)]">
              {event?.category || 'Social Gathering'} • {event?.city || 'Local Metro'}
            </p>
            <div className="pt-3 border-t border-[var(--border)] flex items-center justify-between text-xs">
              <span className="text-[var(--fg-muted)]">Room Status</span>
              <span className="flex items-center gap-1.5 font-medium text-emerald-600">
                <span
                  className={`w-2 h-2 rounded-full ${isConnected ? 'bg-emerald-500' : 'bg-neutral-400'}`}
                ></span>
                {isConnected ? 'Connected' : 'Connecting'}
              </span>
            </div>
          </div>
        </div>

        <div className="p-4 bg-[var(--bg)] rounded-card border border-[var(--border)] text-xs text-[var(--fg-muted)] space-y-1">
          <span className="font-semibold text-[var(--fg)] block">Room Etiquette</span>
          <p className="text-[11px] leading-relaxed">
            Coordinate arrivals, carpooling, and gear requirements. Private contact numbers are protected.
          </p>
        </div>
      </aside>

      {/* Main Chat Stream */}
      <section className="flex flex-col flex-1 relative bg-[var(--bg)]">
        {/* Top Chat Bar */}
        <header className="px-6 py-4 flex items-center justify-between border-b border-[var(--border)] bg-[var(--bg)]/90 backdrop-blur-md sticky top-0 z-20">
          <div className="flex items-center gap-3">
            <button
              className="lg:hidden p-1.5 -ml-2 text-[var(--fg-muted)] hover:text-[var(--fg)]"
              onClick={() => navigate(`/event/${id}`)}
            >
              <ArrowLeft size={18} />
            </button>
            <div>
              <h1 className="text-sm font-semibold text-[var(--fg)]">{event?.title || 'Gathering Chat'}</h1>
              <span className="text-[11px] text-[var(--fg-muted)]">
                {isConnected ? 'Real-time WebSocket Active' : 'Connecting to channel...'}
              </span>
            </div>
          </div>

          <div className="flex items-center gap-2 text-xs text-[var(--fg-muted)] font-mono">
            <Users size={16} />
            <span>{event?.attendees || 0} Attending</span>
          </div>
        </header>

        {/* Messages Feed */}
        <div className="flex-1 overflow-y-auto p-6 space-y-4">
          {messages.length === 0 ? (
            <div className="py-24 text-center text-xs text-[var(--fg-muted)]">
              No messages posted yet. Start the conversation with your fellow attendees!
            </div>
          ) : (
            messages.map((msg, idx) => {
              const isMe = msg.sender === currentUser?.username || msg.sender === currentUser?.email;
              return (
                <div
                  key={idx}
                  className={`flex flex-col max-w-[80%] ${isMe ? 'ml-auto items-end' : 'mr-auto items-start'}`}
                >
                  <span className="text-[10px] font-mono text-[var(--fg-muted)] mb-1 px-1">
                    {isMe ? 'You' : msg.sender} • {formatTime(msg.sentAt)}
                  </span>
                  <div
                    className={`p-3.5 rounded-card text-xs leading-relaxed ${
                      isMe
                        ? 'bg-[var(--accent)] text-white'
                        : 'bg-[var(--bg-subtle)] text-[var(--fg)] border border-[var(--border)]'
                    }`}
                  >
                    {msg.content}
                  </div>
                </div>
              );
            })
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* Input Bar */}
        <footer className="p-4 border-t border-[var(--border)] bg-[var(--bg)]">
          <form onSubmit={handleSendMessage} className="flex items-center gap-3 max-w-4xl mx-auto">
            <input
              type="text"
              placeholder="Send message to attendees..."
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              className="flex-1 px-4 py-3 bg-[var(--bg-subtle)] border border-[var(--border)] rounded-card text-xs text-[var(--fg)] placeholder:text-[var(--fg-muted)] focus:outline-none focus:border-[var(--accent)] transition-colors"
            />
            <button
              type="submit"
              disabled={!message.trim()}
              className="px-5 py-3 bg-[var(--accent)] hover:bg-[var(--accent)]/90 disabled:opacity-40 text-white rounded-card text-xs font-semibold uppercase tracking-wider transition-all flex items-center gap-1.5 shadow-sm active:scale-95"
            >
              <PaperPlaneTilt size={15} weight="bold" />
              <span>Send</span>
            </button>
          </form>
        </footer>
      </section>
    </div>
  );
}
