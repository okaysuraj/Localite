import React, { useState, useEffect, useRef } from 'react';
import { Send, X, User } from 'lucide-react';

const DirectMessagePanel = ({ recipient, onClose }) => {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const [currentUser, setCurrentUser] = useState(null);
  const messagesEndRef = useRef(null);

  useEffect(() => {
    fetchCurrentUser();
  }, []);

  useEffect(() => {
    if (recipient) {
      fetchMessages();
      const interval = setInterval(fetchMessages, 3000); // Poll every 3 seconds
      return () => clearInterval(interval);
    }
  }, [recipient]);

  const fetchCurrentUser = async () => {
    const token = localStorage.getItem('token');
    const res = await fetch(import.meta.env.VITE_API_URL + '/users/me', {
      headers: { 'Authorization': `Bearer ${token}` }
    });
    if (res.ok) {
      setCurrentUser(await res.json());
    }
  };

  const fetchMessages = async () => {
    try {
      const token = localStorage.getItem('token');
      const res = await fetch(`${import.meta.env.VITE_API_URL}/messages/direct/${recipient.id}`, {
        headers: { 'Authorization': `Bearer ${token}` }
      });
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
      const res = await fetch(`${import.meta.env.VITE_API_URL}/messages/direct/${recipient.id}`, {
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

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  if (!recipient || !currentUser) return null;

  return (
    <div className="fixed bottom-0 right-10 w-80 bg-surface-dark border border-surface-variant/30 rounded-t-xl shadow-2xl z-50 flex flex-col" style={{ height: '400px' }}>
      <div className="p-4 border-b border-surface-variant/20 flex justify-between items-center bg-surface-container rounded-t-xl">
        <h3 className="font-headline-sm text-lime-vibe uppercase tracking-tight flex items-center gap-2">
          <User size={16} /> {recipient.username}
        </h3>
        <button onClick={onClose} className="text-text-muted hover:text-white transition-colors">
          <X size={18} />
        </button>
      </div>

      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.length === 0 ? (
          <div className="text-center text-text-muted font-label-mono text-xs uppercase tracking-widest mt-10">
            Start the conversation.
          </div>
        ) : (
          messages.map(msg => {
            const isMe = msg.sender.id === currentUser.id;
            return (
              <div key={msg.id} className={`flex ${isMe ? 'justify-end' : 'justify-start'}`}>
                <div className={`max-w-[80%] rounded-lg p-3 ${isMe ? 'bg-lime-vibe text-surface-dark' : 'bg-surface-container-low text-white border border-surface-variant/30'}`}>
                  <p className="font-body-sm">{msg.content}</p>
                  <p className={`font-label-mono text-[8px] mt-1 uppercase ${isMe ? 'text-surface-dark/70' : 'text-text-muted'}`}>
                    {new Date(msg.sentAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                  </p>
                </div>
              </div>
            );
          })
        )}
        <div ref={messagesEndRef} />
      </div>

      <form onSubmit={sendMessage} className="p-3 bg-surface-container border-t border-surface-variant/20">
        <div className="relative">
          <input 
            type="text" 
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            placeholder="Secure message..."
            className="w-full bg-surface-dark border border-surface-variant/30 rounded-full py-2 pl-4 pr-10 text-white font-body-sm focus:outline-none focus:border-lime-vibe/50"
          />
          <button type="submit" className="absolute right-2 top-2 text-lime-vibe hover:text-white transition-colors disabled:opacity-50" disabled={!newMessage.trim()}>
            <Send size={18} />
          </button>
        </div>
      </form>
    </div>
  );
};

export default DirectMessagePanel;
