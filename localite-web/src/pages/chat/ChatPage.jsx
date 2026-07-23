import React, { useState, useEffect, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { auth } from '../../firebase';
import { API_URL } from '../../config';

export default function ChatPage() {
  const { id } = useParams(); // user ID to chat with
  const navigate = useNavigate();
  const [messages, setMessages] = useState([]);
  const [messageText, setMessageText] = useState('');
  const [partner, setPartner] = useState({ username: 'Elena Rossi', profileImageUrl: 'https://via.placeholder.com/150' });
  const messagesEndRef = useRef(null);

  useEffect(() => {
    // In a real app, fetch messages and partner info
    const mockMessages = [
      { id: 1, content: "Good morning! I've finalized the guest list for the equestrian gala at the hub next week. Would you like to review the seating chart?", sender: partner, sentAt: new Date(Date.now() - 3600000).toISOString() },
      { id: 2, content: "That sounds perfect, Elena. Please send it over. I've also invited the committee members from the local gallery.", sender: { id: 'me' }, sentAt: new Date(Date.now() - 3500000).toISOString() },
      { id: 3, content: "Excellent addition. The gallery members will bring such a refined energy to the evening. Here is the PDF of the current arrangement.", sender: partner, sentAt: new Date(Date.now() - 3400000).toISOString() }
    ];
    setMessages(mockMessages);
  }, [id]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSend = () => {
    if (!messageText.trim()) return;
    const newMsg = {
      id: Date.now(),
      content: messageText,
      sender: { id: 'me' },
      sentAt: new Date().toISOString()
    };
    setMessages([...messages, newMsg]);
    setMessageText('');
  };

  return (
    <div className="flex h-[calc(100vh-73px)] bg-background max-w-7xl mx-auto border-x border-surface-variant/30">
      
      {/* Left Sidebar: Conversations (Mocked for context) */}
      <aside className="hidden md:flex w-[400px] flex-shrink-0 flex-col bg-surface-container-low border-r border-outline-variant/30">
        <div className="p-6 pb-4">
          <div className="flex justify-between items-center mb-6">
            <h1 className="font-headline-sm text-headline-sm text-primary">Inbox</h1>
          </div>
          <div className="p-4 rounded-xl flex gap-4 bg-white shadow-sm border-l-4 border-secondary cursor-pointer">
            <div className="w-14 h-14 rounded-full overflow-hidden flex-shrink-0">
              <img src={partner.profileImageUrl} alt="Partner" />
            </div>
            <div className="flex-grow min-w-0">
              <h3 className="font-label-caps text-primary truncate">{partner.username}</h3>
              <p className="text-secondary font-medium text-xs mt-1">Typing...</p>
            </div>
          </div>
        </div>
      </aside>

      {/* Right Pane: Active Conversation */}
      <section className="flex-grow flex flex-col relative bg-background h-full">
        <header className="px-8 py-4 bg-white/80 backdrop-blur-md border-b border-surface-container flex items-center justify-between z-10 sticky top-0">
          <div className="flex items-center gap-4">
            <button onClick={() => navigate('/messages')} className="md:hidden text-primary">
              <span className="material-symbols-outlined">arrow_back_ios</span>
            </button>
            <div className="relative">
              <div className="w-10 h-10 rounded-full overflow-hidden">
                <img src={partner.profileImageUrl} alt={partner.username} className="w-full h-full object-cover" />
              </div>
              <div className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-secondary-fixed border-2 border-white rounded-full"></div>
            </div>
            <div>
              <h2 className="font-semibold text-primary">{partner.username}</h2>
              <span className="text-[11px] text-secondary font-label-caps flex items-center gap-1 uppercase">
                <span className="w-1.5 h-1.5 bg-secondary-fixed rounded-full"></span> Online
              </span>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <button className="w-10 h-10 rounded-full flex items-center justify-center text-primary hover:bg-surface-container transition-colors">
              <span className="material-symbols-outlined">videocam</span>
            </button>
            <button className="w-10 h-10 rounded-full flex items-center justify-center text-primary hover:bg-surface-container transition-colors">
              <span className="material-symbols-outlined">settings</span>
            </button>
          </div>
        </header>

        <div className="flex-grow overflow-y-auto px-4 md:px-8 py-6 space-y-6">
          <div className="flex flex-col items-center mb-8">
            <span className="px-4 py-1 rounded-full bg-surface-container-low text-[10px] font-label-caps text-on-surface-variant uppercase tracking-widest">
              Today
            </span>
          </div>

          {messages.map((msg) => {
            const isMe = msg.sender.id === 'me';
            return (
              <div key={msg.id} className={`flex items-end gap-3 max-w-[85%] md:max-w-[70%] ${isMe ? 'flex-row-reverse ml-auto' : ''}`}>
                {!isMe && (
                  <div className="w-8 h-8 rounded-full overflow-hidden flex-shrink-0 mb-1 hidden md:block">
                    <img src={partner.profileImageUrl} className="w-full h-full object-cover" alt="Avatar" />
                  </div>
                )}
                <div className={`p-4 space-y-2 shadow-sm border ${isMe ? 'bg-primary-container text-white rounded-[1.5rem_1.5rem_0.25rem_1.5rem] border-transparent' : 'bg-white text-primary rounded-[1.5rem_1.5rem_1.5rem_0.25rem] border-outline-variant/30'}`}>
                  <p className="text-body-md font-body-md">{msg.content}</p>
                  <span className={`block text-[10px] text-right font-label-caps opacity-60 ${isMe ? 'text-inverse-primary' : 'text-on-surface-variant'}`}>
                    {new Date(msg.sentAt).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}
                  </span>
                </div>
              </div>
            );
          })}
          
          <div ref={messagesEndRef} />
        </div>

        <footer className="p-4 md:p-8 bg-surface-container-lowest border-t border-surface-variant/20 sticky bottom-0">
          <div className="max-w-4xl mx-auto relative flex items-center gap-3">
            <button className="w-10 h-10 flex items-center justify-center rounded-full bg-surface-container text-on-surface-variant hover:bg-secondary-container hover:text-secondary transition-all">
              <span className="material-symbols-outlined">add</span>
            </button>
            <div className="flex-grow relative flex items-center">
              <input 
                className="w-full bg-surface py-3 px-5 pr-12 rounded-full border border-outline-variant/30 focus:border-secondary focus:ring-0 font-body-md text-on-surface outline-none" 
                placeholder="Type an elegant message..." 
                type="text"
                value={messageText}
                onChange={(e) => setMessageText(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSend()}
              />
              <button className="absolute right-4 text-outline hover:text-secondary transition-colors">
                <span className="material-symbols-outlined">sentiment_satisfied</span>
              </button>
            </div>
            <button 
              onClick={handleSend}
              className="w-12 h-12 flex items-center justify-center rounded-full bg-primary text-white shadow-lg hover:opacity-90 active:scale-95 transition-all"
            >
              <span className="material-symbols-outlined text-secondary-fixed">{messageText.trim() ? 'send' : 'mic'}</span>
            </button>
          </div>
        </footer>
      </section>
    </div>
  );
}
