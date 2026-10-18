import React, { useState, useEffect, useRef } from 'react';
import { X, PaperPlaneRight, ChatCircle } from '@phosphor-icons/react';
import { Client } from '@stomp/stompjs';
import SockJS from 'sockjs-client';
import gsap from 'gsap';
import { API_BASE_URL } from '../services/api';

const ChatPanel = ({ eventId, eventTitle, onClose }) => {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const [loading, setLoading] = useState(true);
  const messagesEndRef = useRef(null);
  const stompClientRef = useRef(null);

  useEffect(() => {
    gsap.fromTo(
      '.chat-panel',
      { x: '100%' },
      { x: '0%', duration: 0.35, ease: 'power3.out' }
    );
    fetchMessages();

    // Setup WebSocket connection
    const socketUrl = API_BASE_URL.replace('/api', '/ws');
    const client = new Client({
      webSocketFactory: () => new SockJS(socketUrl),
      onConnect: () => {
        client.subscribe(`/topic/events/${eventId}`, (message) => {
          if (message.body) {
            const newMsg = JSON.parse(message.body);
            setMessages((prev) => {
              if (prev.find((m) => m.id === newMsg.id)) return prev;
              return [...prev, newMsg];
            });
          }
        });
      },
      onStompError: (frame) => {
        console.error('Broker error:', frame.headers['message']);
      },
    });

    client.activate();
    stompClientRef.current = client;

    return () => {
      client.deactivate();
    };
  }, [eventId]);

  const fetchMessages = async () => {
    try {
      const token = localStorage.getItem('token');
      const res = await fetch(
        `${API_BASE_URL}/events/${eventId}/messages`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
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
      if (stompClientRef.current && stompClientRef.current.connected) {
        stompClientRef.current.publish({
          destination: `/app/events/${eventId}/sendMessage`,
          headers: { Authorization: `Bearer ${token}` },
          body: JSON.stringify({ content: newMessage }),
        });
        setNewMessage('');
      } else {
        const res = await fetch(
          `${API_BASE_URL}/events/${eventId}/messages`,
          {
            method: 'POST',
            headers: {
              Authorization: `Bearer ${token}`,
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ content: newMessage }),
          }
        );
        if (res.ok) {
          setNewMessage('');
        }
      }
    } catch (err) {
      console.error(err);
    }
  };

  const handleClose = () => {
    gsap.to('.chat-panel', {
      x: '100%',
      duration: 0.25,
      ease: 'power3.in',
      onComplete: onClose,
    });
  };

  const currentUser = localStorage.getItem('username');

  return (
    <div className="fixed inset-0 z-50 flex justify-end bg-black/30 backdrop-blur-xs">
      <div className="chat-panel w-full max-w-md bg-white border-l border-border shadow-xl h-full flex flex-col">
        {/* Header */}
        <div className="px-6 py-4 border-b border-border flex justify-between items-center bg-white sticky top-0 z-10">
          <div className="min-w-0 pr-4">
            <div className="flex items-center gap-2">
              <ChatCircle size={18} className="text-accent shrink-0" />
              <h3 className="font-display font-semibold text-fg text-base truncate">
                {eventTitle}
              </h3>
            </div>
            <p className="text-[11px] font-mono text-fg-muted uppercase tracking-wider mt-0.5">
              Event Discussion
            </p>
          </div>
          <button
            onClick={handleClose}
            className="p-1.5 rounded-btn hover:bg-bg-subtle text-fg-muted hover:text-fg transition-colors"
          >
            <X size={18} />
          </button>
        </div>

        {/* Messages list */}
        <div className="flex-1 overflow-y-auto p-6 space-y-3.5 bg-bg">
          {loading ? (
            <div className="text-center text-xs font-mono text-fg-muted uppercase tracking-wider mt-10">
              Connecting to chat...
            </div>
          ) : messages.length === 0 ? (
            <div className="text-center text-xs font-mono text-fg-muted py-12">
              No messages in this event yet. Start the conversation!
            </div>
          ) : (
            messages.map((msg, idx) => {
              const isMe = msg.sender === currentUser;
              return (
                <div
                  key={idx}
                  className={`flex flex-col ${isMe ? 'items-end' : 'items-start'}`}
                >
                  <span className="text-[10px] font-mono text-fg-muted mb-1 px-1">
                    {isMe ? 'You' : msg.sender}
                  </span>
                  <div
                    className={`px-3.5 py-2 rounded-card text-xs max-w-[85%] leading-relaxed ${
                      isMe
                        ? 'bg-accent text-white'
                        : 'bg-white text-fg border border-border'
                    }`}
                  >
                    <p className="whitespace-pre-wrap">{msg.content}</p>
                  </div>
                  <span className="text-[9px] font-mono text-fg-faint mt-1 px-1">
                    {new Date(msg.sentAt).toLocaleTimeString([], {
                      hour: '2-digit',
                      minute: '2-digit',
                    })}
                  </span>
                </div>
              );
            })
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* Input */}
        <div className="p-4 border-t border-border bg-white">
          <form onSubmit={handleSend} className="flex items-center gap-2">
            <input
              type="text"
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              placeholder="Write a message..."
              className="flex-1 bg-bg-subtle border border-border rounded-btn px-3.5 py-2 text-xs font-mono text-fg placeholder:text-fg-faint focus:outline-none focus:border-accent transition-colors"
            />
            <button
              type="submit"
              disabled={!newMessage.trim()}
              className="h-9 px-3.5 bg-accent text-white rounded-btn flex items-center justify-center disabled:opacity-40 disabled:cursor-not-allowed hover:opacity-90 transition-opacity"
            >
              <PaperPlaneRight size={15} weight="bold" />
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ChatPanel;
