import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { MagnifyingGlass, Plus, ChatCircleDots } from '@phosphor-icons/react';
import NewMessageModal from '../../components/NewMessageModal';
import { auth } from '../../firebase';
import { API_URL } from '../../config';

export default function MessagesPage() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('MESSAGES'); // MESSAGES, REQUESTS
  // MESSAGES, REQUESTS
  const [activeConversation] = useState(null);
  const [showNewMessageModal, setShowNewMessageModal] = useState(false);
  const [conversations, setConversations] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchConversations = async () => {
      setLoading(true);
      try {
        const token = await auth.currentUser?.getIdToken();
        if (!token) return;

        const res = await fetch(`${API_URL}/messages/direct/conversations`, {
          headers: { Authorization: `Bearer ${token}` },
        });

        if (res.ok) {
          const data = await res.json();
          const formatted = data.map((msg) => {
            const isSender = msg.sender.firebaseUid === auth.currentUser?.uid;
            const otherUser = isSender ? msg.receiver : msg.sender;
            return {
              id: otherUser.id,
              user: {
                id: otherUser.id,
                username: otherUser.username,
                profileImageUrl:
                  otherUser.profilePhotoUrl ||
                  `https://api.dicebear.com/7.x/initials/svg?seed=${otherUser.username}`,
              },
              lastMessage: msg.content,
              timestamp: new Date(msg.sentAt).toLocaleTimeString([], {
                hour: '2-digit',
                minute: '2-digit',
              }),
              unread: false,
            };
          });
          setConversations(formatted);
        }
      } catch (error) {
        console.error('Error fetching conversations:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchConversations();
  }, []);

  const filteredConversations = conversations.filter((c) =>
    c.user.username.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="flex flex-col md:flex-row min-h-[calc(100vh-65px)] bg-bg max-w-[1200px] mx-auto border-x border-border">
      {showNewMessageModal && <NewMessageModal onClose={() => setShowNewMessageModal(false)} />}

      {/* Left Sidebar: Conversations */}
      <aside className="w-full md:w-[380px] shrink-0 flex flex-col bg-white border-r border-border">
        <div className="p-6 pb-4 space-y-4">
          <div className="flex justify-between items-center">
            <h1 className="text-2xl font-display font-semibold text-fg tracking-tight">Messages</h1>
            <button
              onClick={() => setShowNewMessageModal(true)}
              className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-btn bg-accent text-white text-xs font-mono tracking-wide hover:opacity-90 transition-opacity"
            >
              <Plus size={14} weight="bold" />
              New Chat
            </button>
          </div>

          {/* Search Input */}
          <div className="relative">
            <MagnifyingGlass size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-fg-muted" />
            <input
              className="w-full bg-bg-subtle border border-border rounded-btn py-2 pl-10 pr-4 text-xs font-mono text-fg placeholder:text-fg-faint focus:outline-none focus:border-accent transition-colors"
              placeholder="Filter conversations..."
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>

          {/* Tabs */}
          <div className="flex border-b border-border text-xs font-mono">
            <button
              onClick={() => setActiveTab('MESSAGES')}
              className={`flex-1 pb-2.5 transition-colors border-b-2 ${
                activeTab === 'MESSAGES'
                  ? 'border-accent text-accent font-medium'
                  : 'border-transparent text-fg-muted hover:text-fg'
              }`}
            >
              Conversations
            </button>
            <button
              onClick={() => navigate('/messages/requests')}
              className="flex-1 pb-2.5 transition-colors border-b-2 border-transparent text-fg-muted hover:text-fg"
            >
              Requests
            </button>
          </div>
        </div>

        {/* Conversation List */}
        <div className="flex-1 overflow-y-auto px-3 pb-6 divide-y divide-border/60">
          {loading ? (
            <div className="p-8 text-center text-xs font-mono text-fg-muted">Loading conversations...</div>
          ) : filteredConversations.length === 0 ? (
            <div className="p-8 text-center text-xs font-mono text-fg-muted">
              {searchQuery ? 'No matching conversations' : 'No conversations yet'}
            </div>
          ) : (
            filteredConversations.map((conv) => (
              <div
                key={conv.id}
                onClick={() => navigate(`/messages/${conv.id}`)}
                className={`p-3 rounded-card flex gap-3.5 transition-colors cursor-pointer my-1 ${
                  activeConversation?.id === conv.id
                    ? 'bg-accent-subtle text-accent'
                    : 'hover:bg-bg-subtle text-fg'
                }`}
              >
                <div className="relative shrink-0">
                  <div className="w-11 h-11 rounded-full overflow-hidden border border-border bg-bg-subtle">
                    <img
                      className="w-full h-full object-cover"
                      src={conv.user.profileImageUrl}
                      alt={conv.user.username}
                    />
                  </div>
                  <div className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-accent rounded-full border-2 border-white" />
                </div>

                <div className="flex-1 min-w-0">
                  <div className="flex justify-between items-baseline mb-1">
                    <h3 className="text-sm font-display font-medium text-fg truncate">
                      {conv.user.username}
                    </h3>
                    <span className="text-[10px] font-mono text-fg-muted shrink-0 ml-2">
                      {conv.timestamp}
                    </span>
                  </div>
                  <p className="text-xs text-fg-muted truncate leading-relaxed">{conv.lastMessage}</p>
                </div>
              </div>
            ))
          )}
        </div>
      </aside>

      {/* Right Pane - Empty State / Placeholder */}
      <section className="hidden md:flex flex-1 flex-col items-center justify-center bg-bg p-12 text-center">
        <div className="max-w-sm space-y-4">
          <div className="w-16 h-16 rounded-full bg-bg-subtle border border-border flex items-center justify-center mx-auto text-fg-muted">
            <ChatCircleDots size={32} />
          </div>
          <h2 className="text-xl font-display font-semibold text-fg tracking-tight">Direct Messages</h2>
          <p className="text-sm text-fg-muted leading-relaxed">
            Select an existing conversation on the left, or click "New Chat" to connect with a community
            member.
          </p>
        </div>
      </section>
    </div>
  );
}
