import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import NewMessageModal from '../../components/NewMessageModal';
import { auth } from '../../firebase';
import { API_URL } from '../../config';

export default function MessagesPage() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('MESSAGES'); // MESSAGES, REQUESTS
  const [activeConversation, setActiveConversation] = useState(null);
  const [showNewMessageModal, setShowNewMessageModal] = useState(false);
  const [conversations, setConversations] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchConversations();
  }, [activeTab]);

  const fetchConversations = async () => {
    setLoading(true);
    try {
      const token = await auth.currentUser?.getIdToken();
      if (!token) return;

      const res = await fetch(`${API_URL}/messages/direct/conversations`, {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      
      if (res.ok) {
        const data = await res.json();
        const formatted = data.map(msg => {
          const isSender = msg.sender.firebaseUid === auth.currentUser.uid;
          const otherUser = isSender ? msg.receiver : msg.sender;
          return {
            id: otherUser.id,
            user: {
              id: otherUser.id,
              username: otherUser.username,
              profileImageUrl: otherUser.profilePhotoUrl || 'https://via.placeholder.com/150'
            },
            lastMessage: msg.content,
            timestamp: new Date(msg.sentAt).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'}),
            unread: false // Will need unread logic later
          };
        });
        setConversations(formatted);
      }
    } catch (error) {
      console.error("Error fetching conversations:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col md:flex-row min-h-[calc(100vh-80px)] bg-background max-w-7xl mx-auto border-x border-surface-variant/30 relative">
      {showNewMessageModal && (
        <NewMessageModal onClose={() => setShowNewMessageModal(false)} />
      )}
      
      {/* Left Sidebar: Conversations */}
      <aside className="w-full md:w-[400px] flex-shrink-0 flex flex-col bg-surface-container-low border-r border-outline-variant/30">
        <div className="p-6 pb-4">
          <div className="flex justify-between items-center mb-6">
            <h1 className="font-headline-sm text-headline-sm text-primary">Inbox</h1>
            <button 
              onClick={() => setShowNewMessageModal(true)}
              className="bg-primary text-on-primary px-4 py-2 rounded-xl flex items-center gap-2 font-label-caps text-label-caps hover:bg-primary/90 transition-all active:scale-95"
            >
              <span className="material-symbols-outlined text-[18px]">add</span>
              New Chat
            </button>
          </div>
          
          <div className="relative mb-6">
            <input 
              className="w-full bg-surface-container-high border-none rounded-xl py-3 pl-12 pr-4 text-body-md placeholder:text-on-surface-variant/50 focus:ring-1 focus:ring-secondary-fixed-dim transition-all outline-none" 
              placeholder="Search conversations..." 
              type="text"
            />
            <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-on-surface-variant/60">search</span>
          </div>
          
          <div className="flex border-b border-outline-variant/30">
            <button 
              onClick={() => setActiveTab('MESSAGES')}
              className={`flex-1 pb-3 font-label-caps text-label-caps transition-colors ${activeTab === 'MESSAGES' ? 'text-primary border-b-2 border-primary' : 'text-on-surface-variant hover:text-primary'}`}
            >
              MESSAGES
            </button>
            <button 
              onClick={() => setActiveTab('REQUESTS')}
              className={`flex-1 pb-3 font-label-caps text-label-caps transition-colors ${activeTab === 'REQUESTS' ? 'text-primary border-b-2 border-primary' : 'text-on-surface-variant hover:text-primary'}`}
            >
              REQUESTS
            </button>
          </div>
        </div>
        
        <div className="flex-grow overflow-y-auto px-3 pb-6 custom-scrollbar">
          {loading ? (
            <div className="p-4 text-center text-on-surface-variant text-body-md">Loading...</div>
          ) : conversations.length === 0 ? (
             <div className="p-4 text-center text-on-surface-variant text-body-md">No conversations yet.</div>
          ) : conversations.map((conv) => (
            <div 
              key={conv.id}
              onClick={() => navigate(`/messages/${conv.id}`)}
              className={`p-4 rounded-xl flex gap-4 transition-all cursor-pointer mb-2 hover:bg-white hover:shadow-sm ${activeConversation?.id === conv.id ? 'bg-white shadow-sm border-l-4 border-secondary' : conv.unread ? 'bg-white shadow-sm border-l-4 border-secondary-fixed' : ''}`}
            >
              <div className="relative flex-shrink-0">
                <div className="w-14 h-14 rounded-full overflow-hidden">
                  <img className="w-full h-full object-cover" src={conv.user.profileImageUrl} alt={conv.user.username} />
                </div>
                {/* Simulated Online Status */}
                <div className="absolute bottom-0 right-0 w-3.5 h-3.5 bg-green-500 border-2 border-surface-container-low rounded-full"></div>
              </div>
              <div className="flex-grow min-w-0">
                <div className="flex justify-between items-start mb-1">
                  <h3 className={`font-label-caps truncate ${activeConversation?.id === conv.id ? 'text-primary' : conv.unread ? 'text-primary font-bold' : 'text-primary'}`}>{conv.user.username}</h3>
                  <span className={`text-[10px] font-label-caps ${activeConversation?.id === conv.id ? 'text-primary font-bold' : conv.unread ? 'text-primary font-bold' : 'text-on-surface-variant'}`}>{conv.timestamp}</span>
                </div>
                <p className={`text-body-md truncate ${activeConversation?.id === conv.id ? 'text-primary font-medium' : conv.unread ? 'text-primary font-medium' : 'text-on-surface-variant'}`}>{conv.lastMessage}</p>
              </div>
            </div>
          ))}
        </div>
      </aside>

      {/* Right Pane - Chat Window (Mock display here, real navigation handles routing typically, but if we keep it inline we render chat here) */}
      <section className="hidden md:flex flex-grow relative flex-col items-center justify-center bg-background p-12">
        <div className="relative z-10 text-center max-w-md animate-fade-in">
          <div className="mb-8 relative inline-block">
            <div className="w-24 h-24 rounded-full bg-white shadow-sm flex items-center justify-center mx-auto border border-outline-variant/20">
              <span className="material-symbols-outlined text-[42px] text-secondary">forum</span>
            </div>
          </div>
          <h2 className="font-headline-md text-headline-md text-primary mb-4">Your Private Dialogue</h2>
          <p className="text-body-lg text-on-surface-variant mb-10 leading-relaxed">
            Select a member from your inbox to continue a conversation, or start a new connection to expand your local circle.
          </p>
        </div>
      </section>
    </div>
  );
}
