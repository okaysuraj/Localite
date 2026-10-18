import React, { useState, useEffect, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
  ArrowLeft,
  PaperPlaneRight,
  DotsThreeVertical,
} from '@phosphor-icons/react';
import { auth } from '../../firebase';
import { API_URL } from '../../config';

export default function ChatPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [messages, setMessages] = useState([]);
  const [messageText, setMessageText] = useState('');
  const [partner, setPartner] = useState({
    username: 'Member',
    profileImageUrl: 'https://api.dicebear.com/7.x/initials/svg?seed=Member',
  });
  const messagesEndRef = useRef(null);

  useEffect(() => {
    if (!id) return;
    fetchMessages();
  }, [id]);

  const fetchMessages = async () => {
    try {
      const token = await auth.currentUser?.getIdToken();
      if (!token) return;

      const res = await fetch(`${API_URL}/messages/direct/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (res.ok) {
        const data = await res.json();
        setMessages(data);

        if (data.length > 0) {
          const firstMsg = data[0];
          const isSender = firstMsg.sender.firebaseUid === auth.currentUser?.uid;
          const otherUser = isSender ? firstMsg.receiver : firstMsg.sender;
          setPartner({
            username: otherUser.username,
            profileImageUrl:
              otherUser.profilePhotoUrl ||
              `https://api.dicebear.com/7.x/initials/svg?seed=${otherUser.username}`,
          });
        }
      }
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSend = async () => {
    if (!messageText.trim()) return;
    try {
      const token = await auth.currentUser?.getIdToken();
      const payload = { content: messageText.trim(), messageType: 'TEXT' };
      setMessageText('');

      const res = await fetch(`${API_URL}/messages/direct/${id}`, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });

      if (res.ok) {
        const newMsg = await res.json();
        setMessages((prev) => [...prev, newMsg]);
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="flex h-[calc(100vh-65px)] bg-bg max-w-[1200px] mx-auto border-x border-border">
      {/* Right Pane: Active Conversation */}
      <section className="flex-1 flex flex-col relative bg-bg h-full">
        {/* Header */}
        <header className="px-6 py-3.5 bg-white border-b border-border flex items-center justify-between sticky top-0 z-10">
          <div className="flex items-center gap-3">
            <button
              onClick={() => navigate('/messages')}
              className="p-1.5 rounded-btn hover:bg-bg-subtle text-fg-muted hover:text-fg transition-colors"
            >
              <ArrowLeft size={18} />
            </button>
            <div className="relative">
              <div className="w-9 h-9 rounded-full overflow-hidden border border-border bg-bg-subtle">
                <img
                  src={partner.profileImageUrl}
                  alt={partner.username}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-accent border-2 border-white rounded-full" />
            </div>
            <div>
              <h2 className="text-sm font-display font-semibold text-fg">
                {partner.username}
              </h2>
              <span className="text-[10px] font-mono text-accent uppercase tracking-wider">
                Active
              </span>
            </div>
          </div>

          <button className="p-1.5 rounded-btn text-fg-muted hover:text-fg hover:bg-bg-subtle transition-colors">
            <DotsThreeVertical size={20} />
          </button>
        </header>

        {/* Message Thread */}
        <div className="flex-1 overflow-y-auto px-4 md:px-8 py-6 space-y-4">
          <div className="flex justify-center mb-4">
            <span className="px-3 py-1 rounded-full bg-bg-subtle text-[10px] font-mono text-fg-muted border border-border">
              Direct Conversation
            </span>
          </div>

          {messages.map((msg) => {
            const isMe = msg.sender.firebaseUid === auth.currentUser?.uid;
            return (
              <div
                key={msg.id}
                className={`flex items-end gap-2.5 max-w-[80%] md:max-w-[65%] ${
                  isMe ? 'flex-row-reverse ml-auto' : ''
                }`}
              >
                {!isMe && (
                  <div className="w-7 h-7 rounded-full overflow-hidden shrink-0 border border-border hidden sm:block">
                    <img
                      src={partner.profileImageUrl}
                      className="w-full h-full object-cover"
                      alt="Avatar"
                    />
                  </div>
                )}
                <div
                  className={`px-4 py-2.5 rounded-card space-y-1 text-sm ${
                    isMe
                      ? 'bg-accent text-white'
                      : 'bg-white text-fg border border-border'
                  }`}
                >
                  <p className="leading-relaxed whitespace-pre-wrap">{msg.content}</p>
                  <span
                    className={`block text-[10px] font-mono text-right ${
                      isMe ? 'text-white/70' : 'text-fg-muted'
                    }`}
                  >
                    {new Date(msg.sentAt).toLocaleTimeString([], {
                      hour: '2-digit',
                      minute: '2-digit',
                    })}
                  </span>
                </div>
              </div>
            );
          })}

          <div ref={messagesEndRef} />
        </div>

        {/* Message Input Footer */}
        <footer className="p-4 bg-white border-t border-border sticky bottom-0">
          <div className="max-w-3xl mx-auto flex items-center gap-2">
            <input
              className="flex-1 bg-bg-subtle border border-border rounded-btn py-2.5 px-4 text-xs font-mono text-fg placeholder:text-fg-faint focus:outline-none focus:border-accent transition-colors"
              placeholder="Write a message..."
              type="text"
              value={messageText}
              onChange={(e) => setMessageText(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSend()}
            />
            <button
              onClick={handleSend}
              disabled={!messageText.trim()}
              className="h-10 px-4 flex items-center justify-center rounded-btn bg-accent text-white text-xs font-mono tracking-wide hover:opacity-90 active:scale-95 disabled:opacity-40 disabled:cursor-not-allowed transition-all"
            >
              <PaperPlaneRight size={16} weight="bold" />
            </button>
          </div>
        </footer>
      </section>
    </div>
  );
}
