import React, { useState, useEffect, useRef } from 'react';
import { User, Send, Mic, MapPin, X } from 'lucide-react';
import { Client } from '@stomp/stompjs';
import SockJS from 'sockjs-client';

const MessagesPage = () => {
  const [connections, setConnections] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const [currentUser, setCurrentUser] = useState(null);
  const stompClient = useRef(null);
  const messagesEndRef = useRef(null);

  useEffect(() => {
    fetchCurrentUser().then(user => {
      if(user) {
        fetchConnections();
        connectWebSocket(user.id);
      }
    });
    return () => {
      if (stompClient.current) {
        stompClient.current.deactivate();
      }
    };
  }, []);

  const fetchCurrentUser = async () => {
    try {
      const token = localStorage.getItem('token');
      const res = await fetch(import.meta.env.VITE_API_URL + '/users/me', {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      if (res.ok) {
        const data = await res.json();
        setCurrentUser(data);
        return data;
      }
    } catch (err) {
      console.error(err);
    }
    return null;
  };

  const fetchConnections = async () => {
    try {
      const token = localStorage.getItem('token');
      const res = await fetch(import.meta.env.VITE_API_URL + '/users', {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      if (res.ok) {
        const data = await res.json();
        setConnections(data); // In real app, only fetch connected users, here fetching all for demo
      }
    } catch (err) {
      console.error(err);
    }
  };

  const connectWebSocket = (userId) => {
    const token = localStorage.getItem('token');
    const wsUrl = import.meta.env.VITE_API_URL.replace('/api', '/ws');
    
    stompClient.current = new Client({
      webSocketFactory: () => new SockJS(wsUrl),
      connectHeaders: { Authorization: `Bearer ${token}` },
      debug: function (str) {
        console.log(str);
      },
      onConnect: () => {
        stompClient.current.subscribe(`/topic/user/${userId}/messages`, (msg) => {
          const newMsg = JSON.parse(msg.body);
          setMessages(prev => [...prev, newMsg]);
          scrollToBottom();
        });
      }
    });
    stompClient.current.activate();
  };

  const selectUser = async (user) => {
    setSelectedUser(user);
    try {
      const token = localStorage.getItem('token');
      const res = await fetch(`${import.meta.env.VITE_API_URL}/messages/direct/${user.id}`, {
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

  const scrollToBottom = () => {
    setTimeout(() => {
      messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, 100);
  };

  const sendMessage = async (type = 'TEXT', metadata = null) => {
    if (!selectedUser) return;
    if (type === 'TEXT' && !newMessage.trim()) return;

    try {
      const token = localStorage.getItem('token');
      const res = await fetch(`${import.meta.env.VITE_API_URL}/messages/direct/${selectedUser.id}`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ 
          content: type === 'TEXT' ? newMessage : '',
          messageType: type,
          metadata: metadata
        })
      });
      if (res.ok) {
        setNewMessage('');
      }
    } catch (err) {
      console.error(err);
    }
  };

  const handleVoiceNote = () => {
    sendMessage('VOICE', 'https://example.com/mock-audio.mp3');
  };

  const handleLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          sendMessage('LOCATION', `${position.coords.latitude},${position.coords.longitude}`);
        },
        (error) => {
          alert("Could not get your location.");
        }
      );
    }
  };

  return (
    <div className="min-h-screen bg-background pt-32 pb-section-gap px-margin-mobile md:px-margin-desktop max-w-container-max mx-auto">
      <div className="flex flex-col md:flex-row h-[70vh] border border-surface-variant/30 rounded-2xl overflow-hidden bg-surface-container-low">
        
        {/* Sidebar */}
        <div className="w-full md:w-1/3 border-r border-surface-variant/30 bg-surface-dark flex flex-col">
          <div className="p-6 border-b border-surface-variant/30">
            <h2 className="font-headline-sm text-white uppercase tracking-tight">Direct Messages</h2>
          </div>
          <div className="flex-1 overflow-y-auto">
            {connections.map(user => (
              <div 
                key={user.id} 
                onClick={() => selectUser(user)}
                className={`p-4 border-b border-surface-variant/10 cursor-pointer flex items-center gap-4 hover:bg-surface-variant/20 transition-colors ${selectedUser?.id === user.id ? 'bg-surface-variant/20 border-l-4 border-l-lime-vibe' : ''}`}
              >
                <div className="w-12 h-12 rounded-full bg-surface-variant/50 overflow-hidden shrink-0">
                  {user.profilePhotoUrl ? (
                    <img src={user.profilePhotoUrl} alt={user.username} className="w-full h-full object-cover" />
                  ) : (
                    <User size={24} className="text-text-muted mt-3 mx-auto" />
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <h4 className="font-body-md text-white font-bold truncate">{user.username}</h4>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Chat Area */}
        <div className="w-full md:w-2/3 flex flex-col bg-background/50 relative">
          {selectedUser ? (
            <>
              {/* Chat Header */}
              <div className="p-4 border-b border-surface-variant/30 bg-surface-dark flex justify-between items-center z-10">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-surface-variant/50 overflow-hidden">
                    {selectedUser.profilePhotoUrl ? (
                      <img src={selectedUser.profilePhotoUrl} alt={selectedUser.username} className="w-full h-full object-cover" />
                    ) : (
                      <User size={20} className="text-text-muted mt-2 mx-auto" />
                    )}
                  </div>
                  <h3 className="font-body-lg text-white font-bold">{selectedUser.username}</h3>
                </div>
                <button onClick={() => setSelectedUser(null)} className="md:hidden text-text-muted hover:text-white">
                  <X size={24} />
                </button>
              </div>

              {/* Chat Messages */}
              <div className="flex-1 overflow-y-auto p-6 space-y-4 custom-scrollbar">
                {messages.map((msg, idx) => {
                  const isMe = msg.sender.id === currentUser?.id;
                  return (
                    <div key={idx} className={`flex ${isMe ? 'justify-end' : 'justify-start'}`}>
                      <div className={`max-w-[80%] rounded-2xl p-4 ${isMe ? 'bg-lime-vibe text-primary-container rounded-tr-none' : 'bg-surface-container text-on-surface border border-surface-variant/50 rounded-tl-none'}`}>
                        {msg.messageType === 'TEXT' && (
                          <p className="font-body-md whitespace-pre-wrap">{msg.content}</p>
                        )}
                        {msg.messageType === 'VOICE' && (
                          <div className="flex items-center gap-2">
                            <Mic size={20} />
                            <span className="font-label-mono text-xs uppercase tracking-widest">[Voice Note - {msg.metadata}]</span>
                          </div>
                        )}
                        {msg.messageType === 'LOCATION' && (
                          <div className="flex items-center gap-2">
                            <MapPin size={20} />
                            <span className="font-label-mono text-xs uppercase tracking-widest">[Location: {msg.metadata}]</span>
                          </div>
                        )}
                        <p className={`text-[10px] mt-2 font-label-mono tracking-widest ${isMe ? 'text-primary-container/70' : 'text-text-muted'}`}>
                          {new Date(msg.sentAt).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}
                        </p>
                      </div>
                    </div>
                  );
                })}
                <div ref={messagesEndRef} />
              </div>

              {/* Chat Input */}
              <div className="p-4 bg-surface-dark border-t border-surface-variant/30 flex items-center gap-2">
                <input 
                  type="text"
                  value={newMessage}
                  onChange={(e) => setNewMessage(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && sendMessage('TEXT')}
                  placeholder="Transmit message..."
                  className="flex-1 bg-surface-container border border-surface-variant/50 text-white rounded-full px-6 py-3 font-body-sm focus:outline-none focus:border-lime-vibe transition-colors"
                />
                <button onClick={handleLocation} className="p-3 bg-surface-container border border-surface-variant/50 text-lime-vibe rounded-full hover:bg-surface-variant/50 transition-colors" title="Share Location">
                  <MapPin size={20} />
                </button>
                <button onClick={handleVoiceNote} className="p-3 bg-surface-container border border-surface-variant/50 text-lime-vibe rounded-full hover:bg-surface-variant/50 transition-colors" title="Send Voice Note">
                  <Mic size={20} />
                </button>
                <button onClick={() => sendMessage('TEXT')} className="p-3 bg-lime-vibe text-primary-container rounded-full hover:bg-white transition-colors glow-neon">
                  <Send size={20} className="ml-1" />
                </button>
              </div>
            </>
          ) : (
            <div className="flex-1 flex items-center justify-center flex-col text-text-muted">
              <span className="material-symbols-outlined text-[64px] mb-4 opacity-30">chat</span>
              <p className="font-label-mono uppercase tracking-widest text-sm">Select a user to begin communication.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default MessagesPage;
