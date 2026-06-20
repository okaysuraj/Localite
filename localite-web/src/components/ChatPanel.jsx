import React, { useState, useEffect, useRef } from 'react';
import { X, Send } from 'lucide-react';
import gsap from 'gsap';

const ChatPanel = ({ eventId, eventTitle, onClose }) => {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const [loading, setLoading] = useState(true);
  const messagesEndRef = useRef(null);

  useEffect(() => {
    gsap.fromTo('.chat-panel', 
      { x: '100%' }, 
      { x: '0%', duration: 0.5, ease: 'power3.out' }
    );
    fetchMessages();
    
    // Polling every 5 seconds for MVP
    const interval = setInterval(fetchMessages, 5000);
    return () => clearInterval(interval);
  }, [eventId]);

  const fetchMessages = async () => {
    try {
      const token = localStorage.getItem('token');
      const res = await fetch(`http://localhost:8080/api/events/${eventId}/messages`, {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      if (res.ok) {
        const data = await res.json();
        setMessages(data);
        setLoading(false);
      }
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSend = async (e) => {
    e.preventDefault();
    if (!newMessage.trim()) return;

    try {
      const token = localStorage.getItem('token');
      const res = await fetch(`http://localhost:8080/api/events/${eventId}/messages`, {
        method: 'POST',
        headers: { 
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ content: newMessage })
      });
      if (res.ok) {
        setNewMessage('');
        fetchMessages();
      }
    } catch (err) {
      console.error(err);
    }
  };

  const handleClose = () => {
    gsap.to('.chat-panel', {
      x: '100%', duration: 0.3, ease: 'power3.in', onComplete: onClose
    });
  };

  const currentUser = localStorage.getItem('username');

  return (
    <div className="fixed inset-0 z-50 flex justify-end bg-background/50 backdrop-blur-sm">
      <div className="chat-panel w-full max-w-md bg-surface-container border-l border-surface-variant/30 shadow-2xl h-full flex flex-col">
        
        {/* Header */}
        <div className="p-6 border-b border-surface-variant/20 flex justify-between items-center bg-surface-dark/80 backdrop-blur-md">
          <div>
            <h3 className="font-headline-sm text-lime-vibe uppercase tracking-tight line-clamp-1">{eventTitle}</h3>
            <p className="font-label-mono text-xs text-text-muted uppercase tracking-widest mt-1">Locker Room (Comms)</p>
          </div>
          <button onClick={handleClose} className="p-2 hover:bg-surface-variant/20 rounded-full text-text-muted hover:text-on-surface transition-colors">
            <X size={20} />
          </button>
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto p-6 space-y-4">
          {loading ? (
             <div className="text-center font-label-mono text-xs text-text-muted uppercase tracking-widest mt-10">Connecting to secure channel...</div>
          ) : messages.length === 0 ? (
             <div className="text-center font-label-mono text-xs text-text-muted uppercase tracking-widest mt-10">Channel is empty.</div>
          ) : (
            messages.map((msg, idx) => {
              const isMe = msg.sender === currentUser;
              return (
                <div key={idx} className={`flex flex-col ${isMe ? 'items-end' : 'items-start'}`}>
                  <span className="font-label-mono text-[10px] text-text-muted uppercase tracking-widest mb-1 mx-1">
                    {isMe ? 'You' : msg.sender}
                  </span>
                  <div className={`px-4 py-2 rounded-2xl max-w-[85%] ${
                    isMe 
                    ? 'bg-lime-vibe text-primary-container rounded-tr-sm' 
                    : 'bg-surface-variant/50 text-on-surface rounded-tl-sm border border-surface-variant'
                  }`}>
                    <p className="font-body-md text-sm">{msg.content}</p>
                  </div>
                  <span className="font-label-mono text-[9px] text-text-muted/50 mt-1 mx-1">
                    {new Date(msg.sentAt).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}
                  </span>
                </div>
              );
            })
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* Input */}
        <div className="p-4 border-t border-surface-variant/20 bg-surface-dark/80 backdrop-blur-md">
          <form onSubmit={handleSend} className="flex gap-2">
            <input 
              type="text" 
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              placeholder="Transmit message..."
              className="flex-1 bg-surface-container-low border border-surface-variant/50 rounded-full px-4 py-3 font-body-md text-sm text-on-surface focus:outline-none focus:border-lime-vibe transition-colors"
            />
            <button 
              type="submit"
              disabled={!newMessage.trim()}
              className="w-12 h-12 bg-lime-vibe text-primary-container rounded-full flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed hover:bg-white transition-all glow-neon"
            >
              <Send size={18} />
            </button>
          </form>
        </div>

      </div>
    </div>
  );
};

export default ChatPanel;
