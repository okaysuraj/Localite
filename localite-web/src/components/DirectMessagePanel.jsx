import React, { useState, useEffect, useRef } from 'react';
import { User, X, PaperPlaneRight } from '@phosphor-icons/react';
import { Client } from '@stomp/stompjs';
import SockJS from 'sockjs-client';
import { API_BASE_URL } from '../services/api';

const DirectMessagePanel = ({ recipient, onClose }) => {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const [currentUser, setCurrentUser] = useState(null);
  const messagesEndRef = useRef(null);
  const stompClientRef = useRef(null);

  useEffect(() => {
    fetchCurrentUser();
  }, []);

  useEffect(() => {
    if (recipient && currentUser) {
      fetchMessages();

      const socketUrl = API_BASE_URL.replace('/api', '/ws');
      const client = new Client({
        webSocketFactory: () => new SockJS(socketUrl),
        onConnect: () => {
          client.subscribe(
            `/topic/user/${currentUser.id}/messages`,
            (message) => {
              if (message.body) {
                const newMsg = JSON.parse(message.body);
                if (
                  newMsg.sender.id === recipient.id ||
                  newMsg.receiver.id === recipient.id
                ) {
                  setMessages((prev) => {
                    if (prev.find((m) => m.id === newMsg.id)) return prev;
                    return [...prev, newMsg];
                  });
                  scrollToBottom();
                }
              }
            }
          );
        },
      });

      client.activate();
      stompClientRef.current = client;

      return () => {
        client.deactivate();
      };
    }
  }, [recipient, currentUser]);

  const fetchCurrentUser = async () => {
    const token = localStorage.getItem('token');
    const res = await fetch(API_BASE_URL + '/users/me', {
      headers: { Authorization: `Bearer ${token}` },
    });
    if (res.ok) {
      setCurrentUser(await res.json());
    }
  };

  const fetchMessages = async () => {
    try {
      const token = localStorage.getItem('token');
      const res = await fetch(
        `${API_BASE_URL}/messages/direct/${recipient.id}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      if (res.ok) {
        setMessages(await res.json());
        scrollToBottom();
      }
    } catch (err) {
      console.error(err);
    }
  };

  const sendMessage = async (e) => {
    e.preventDefault();
    if (!newMessage.trim()) return;

    try {
      const token = localStorage.getItem('token');
      if (stompClientRef.current && stompClientRef.current.connected) {
        stompClientRef.current.publish({
          destination: `/app/user/${recipient.id}/sendMessage`,
          headers: { Authorization: `Bearer ${token}` },
          body: JSON.stringify({ content: newMessage }),
        });
        setNewMessage('');
      } else {
        const res = await fetch(
          `${API_BASE_URL}/messages/direct/${recipient.id}`,
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

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  if (!recipient || !currentUser) return null;

  return (
    <div
      className="fixed bottom-0 right-6 w-80 sm:w-88 bg-white border border-border rounded-t-card shadow-2xl z-50 flex flex-col animate-fade-in"
      style={{ height: '420px' }}
    >
      {/* Header */}
      <div className="px-4 py-3 border-b border-border flex justify-between items-center bg-white rounded-t-card">
        <div className="flex items-center gap-2">
          <div className="w-6 h-6 rounded-full bg-bg-subtle border border-border flex items-center justify-center">
            <User size={14} className="text-fg-muted" />
          </div>
          <h3 className="font-display font-semibold text-sm text-fg tracking-tight">
            {recipient.username}
          </h3>
        </div>
        <button
          onClick={onClose}
          className="p-1 rounded-btn hover:bg-bg-subtle text-fg-muted hover:text-fg transition-colors"
        >
          <X size={16} />
        </button>
      </div>

      {/* Message Area */}
      <div className="flex-1 overflow-y-auto p-4 space-y-3 bg-bg">
        {messages.length === 0 ? (
          <div className="text-center text-fg-muted font-mono text-xs mt-12">
            Start the conversation.
          </div>
        ) : (
          messages.map((msg) => {
            const isMe = msg.sender.id === currentUser.id;
            return (
              <div
                key={msg.id}
                className={`flex ${isMe ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`max-w-[82%] rounded-card p-2.5 text-xs leading-relaxed ${
                    isMe
                      ? 'bg-accent text-white'
                      : 'bg-white text-fg border border-border'
                  }`}
                >
                  <p className="whitespace-pre-wrap">{msg.content}</p>
                  <p
                    className={`font-mono text-[9px] mt-1 text-right ${
                      isMe ? 'text-white/70' : 'text-fg-muted'
                    }`}
                  >
                    {new Date(msg.sentAt).toLocaleTimeString([], {
                      hour: '2-digit',
                      minute: '2-digit',
                    })}
                  </p>
                </div>
              </div>
            );
          })
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Input */}
      <form
        onSubmit={sendMessage}
        className="p-2.5 bg-white border-t border-border flex items-center gap-2"
      >
        <input
          type="text"
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          placeholder="Write a message..."
          className="flex-1 bg-bg-subtle border border-border rounded-btn py-1.5 px-3 text-xs font-mono text-fg placeholder:text-fg-faint focus:outline-none focus:border-accent transition-colors"
        />
        <button
          type="submit"
          className="h-8 px-2.5 bg-accent text-white rounded-btn flex items-center justify-center hover:opacity-90 disabled:opacity-40 transition-opacity"
          disabled={!newMessage.trim()}
        >
          <PaperPlaneRight size={14} weight="bold" />
        </button>
      </form>
    </div>
  );
};

export default DirectMessagePanel;
