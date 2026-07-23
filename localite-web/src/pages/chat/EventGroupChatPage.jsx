import React, { useState, useEffect, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getEventMessages, sendEventMessage, getEventById } from '../../services/api';
import { useWebSocket } from '../../context/WebSocketContext';
import { useAuth } from '../../context/AuthContext';

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
        setMessages(msgs);
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
          if (prev.find(m => m.id === newMsg.id)) return prev;
          return [...prev, newMsg];
        });
        setTimeout(scrollToBottom, 100);
      });
    }
    return () => {
      if (subscription) subscription.unsubscribe();
    };
  }, [isConnected, stompClient, id]);

  const handleSendMessage = async () => {
    if (!message.trim()) return;
    const content = message;
    setMessage('');
    try {
      // Optimistic or rely on STOMP? We rely on STOMP for broadcast, but handle response just in case STOMP is slow
      const sentMsg = await sendEventMessage(id, content);
      setMessages((prev) => {
        if (prev.find(m => m.id === sentMsg.id)) return prev;
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
    <div className="flex flex-col md:flex-row min-h-[calc(100vh-80px)] bg-background max-w-7xl mx-auto border-x border-surface-variant/30">
      
      {/* Left Pane (Hidden on Mobile) */}
      <aside className="hidden lg:flex flex-col w-[380px] border-r border-surface-variant/30 bg-surface-container-lowest">
        <div className="p-6 border-b border-surface-variant/30">
          <div className="flex items-center gap-4 cursor-pointer hover:opacity-80" onClick={() => navigate(`/event/${id}`)}>
            <span className="material-symbols-outlined text-secondary">arrow_back</span>
            <h2 className="font-headline-sm text-headline-sm text-primary">Back to Event</h2>
          </div>
        </div>
        
        <div className="p-6 flex-grow">
          <h3 className="font-label-caps text-on-surface-variant mb-4">EVENT GROUP</h3>
          <div className="flex items-center gap-4 p-4 rounded-xl bg-white shadow-sm border border-secondary transition-all">
            <div className="relative w-12 h-12 flex-shrink-0">
              <div className="absolute inset-0 rounded-full border border-surface-container-highest overflow-hidden z-10 bg-secondary">
                <img className="w-full h-full object-cover opacity-80" src="https://lh3.googleusercontent.com/aida-public/AB6AXuBblH0PKPWYe2PNKmkQUOqIh5s13e3V38zt__lJwihjx0wHcYapGsjYJbgF5_wiW6VfK4rukyBFnA7eOvuJhtFTmaJ-Trcdp7QGg1GJNbhXxUJgTj02ma2XG0GPGVMAuQLv5sEcYhAOZW0xXbfHOJkId5IG94rKgVxSUBvB3q4JCfhCvHkhIxRDoMMqChjYMEAxWjFTDOFE1R6qNPm2-joSQgFZ2N6pYn710M8F7CkyYPG-_8rrk1NAsg" alt="Group" />
              </div>
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex justify-between items-start">
                <h3 className="font-body-md font-bold text-primary truncate">{event?.title || 'Loading...'}</h3>
              </div>
              <p className="text-body-md text-secondary truncate font-medium">{event?.category}</p>
            </div>
          </div>
        </div>
      </aside>

      {/* Right Pane: Chat Interface */}
      <section className="flex flex-col flex-1 relative bg-white">
        <header className="px-container-margin py-4 flex items-center justify-between border-b border-surface-container/50 bg-white/90 backdrop-blur-md z-10">
          <div className="flex items-center gap-4">
            <button className="lg:hidden p-2 -ml-2" onClick={() => navigate(`/event/${id}`)}>
              <span className="material-symbols-outlined text-primary">arrow_back</span>
            </button>
            <div className="flex -space-x-3 items-center">
              <div className="w-10 h-10 rounded-full border-2 border-white overflow-hidden bg-surface-container z-20">
                <img className="w-full h-full object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuD6YM4gYgEQOeArG7LRZUu9H8YqE8q6AHLTvek7WwHUySITQ7buzF6qOUizIB_QDiJW77F_RA6hLHA-vF1YvMWCbOm-wq3zJKdLzzrYJiH_L7BvkVWE2iAPhdXTaJtEtL8lwRouWeFIEVSyvX9S-9AR5X9IhRAhybqFA_uNfenUqghwkrpexnMbAX1PtZpjTQoSkkZtw3TVjrZHJ862L4aaz_EPOXuEHLykwkIK7BCNDkT9OZft0Spovw" alt="Participant" />
              </div>
              <div className="w-10 h-10 rounded-full border-2 border-white overflow-hidden bg-surface-container z-10">
                <img className="w-full h-full object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuA-wUWWPiUJFbdWTbfAKzwJsZJeo0ZfNIgSV6cKtLweWcEFqegsmE6B4Gubqho_xAPSc-CBYnGgYYMbt3Jnumg5Gwz47XxMXn53WyOvrrWoPCjU6y5jlahMm7YsxQffdl6JW8U2PSfc1GZ_V4yWriZzjj2yUPctpLZyt7rNM7U-S8ME3yMo1C84mEeqgvkTAY1ovKsQ92xuConSR4153ng5e5ZfyjJV2Vq6jEu1oU0PyNGUDqlqau0hNQ" alt="Participant" />
              </div>
              <div className="w-10 h-10 rounded-full border-2 border-white bg-secondary flex items-center justify-center text-[10px] text-white font-bold z-0">
                +22
              </div>
            </div>
            <div>
              <h1 className="font-headline-sm text-headline-sm text-primary leading-tight">{event?.title || 'Loading...'}</h1>
              <div className="flex items-center gap-2">
                <span className={`w-2 h-2 rounded-full ${isConnected ? 'bg-green-500' : 'bg-red-500'}`}></span>
                <span className="font-label-caps text-[10px] text-on-surface-variant">
                  {isConnected ? 'LIVE' : 'DISCONNECTED'} • {event?.attendees || 0} MEMBERS
                </span>
              </div>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <button className="w-10 h-10 rounded-full flex items-center justify-center hover:bg-surface-container-low transition-colors text-on-surface-variant">
              <span className="material-symbols-outlined">search</span>
            </button>
            <button className="w-10 h-10 rounded-full flex items-center justify-center hover:bg-surface-container-low transition-colors text-on-surface-variant">
              <span className="material-symbols-outlined">more_vert</span>
            </button>
          </div>
        </header>

        <div className="flex-1 overflow-y-auto p-6 space-y-6 custom-scrollbar" style={{backgroundImage: "url('https://www.transparenttextures.com/patterns/natural-paper.png')"}}>
          {messages.map((msg, idx) => {
            const isMe = msg.sender === currentUser?.username || msg.sender === currentUser?.email;
            
            if (isMe) {
              return (
                <div key={idx} className="flex items-end gap-3 max-w-[80%] ml-auto flex-row-reverse">
                  <div className="w-8 h-8 rounded-full overflow-hidden flex-shrink-0 bg-secondary">
                    <img className="w-full h-full object-cover" src={`https://api.dicebear.com/7.x/notionists/svg?seed=${msg.sender}&backgroundColor=b9c7e4`} alt="Me" />
                  </div>
                  <div className="flex flex-col items-end">
                    <span className="font-label-caps text-[10px] text-on-surface-variant mr-2 mb-1 block uppercase">YOU • {formatTime(msg.sentAt)}</span>
                    <div className="bg-primary text-white p-4 rounded-2xl rounded-br-none shadow-sm">
                      <p className="text-body-md">{msg.content}</p>
                    </div>
                  </div>
                </div>
              );
            }

            return (
              <div key={idx} className="flex items-end gap-3 max-w-[80%]">
                <div className="w-8 h-8 rounded-full overflow-hidden flex-shrink-0 bg-surface-container">
                  <img className="w-full h-full object-cover" src={`https://api.dicebear.com/7.x/notionists/svg?seed=${msg.sender}&backgroundColor=b9c7e4`} alt={msg.sender} />
                </div>
                <div className="space-y-2">
                  <span className="font-label-caps text-[10px] text-on-surface-variant ml-2 mb-1 block uppercase">{msg.sender} • {formatTime(msg.sentAt)}</span>
                  <div className={`bg-surface-container-low text-on-surface p-4 rounded-2xl rounded-bl-none shadow-sm`}>
                    <p className={`text-body-md`}>{msg.content}</p>
                  </div>
                </div>
              </div>
            );
          })}
          <div ref={messagesEndRef} />
        </div>

        <footer className="p-6 bg-white border-t border-surface-container/50">
          <div className="flex items-center gap-4 max-w-5xl mx-auto">
            <button className="w-12 h-12 flex-shrink-0 rounded-full border border-outline-variant flex items-center justify-center text-on-surface-variant hover:bg-surface-container-low transition-colors">
              <span className="material-symbols-outlined">add</span>
            </button>
            <div className="flex-1 relative">
              <textarea 
                className="w-full bg-surface-container-low border-none rounded-2xl px-6 py-3.5 text-body-md focus:ring-1 focus:ring-secondary-fixed-dim resize-none transition-all pr-12 outline-none" 
                placeholder="Craft a message..." 
                rows="1"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
              ></textarea>
              <button className="absolute right-3 top-3 material-symbols-outlined text-on-surface-variant hover:text-secondary transition-colors">
                sentiment_satisfied
              </button>
            </div>
            <button 
              onClick={handleSendMessage}
              className="w-12 h-12 flex-shrink-0 rounded-full bg-primary text-white flex items-center justify-center hover:opacity-90 active:scale-95 transition-all shadow-md"
            >
              <span className="material-symbols-outlined" style={{fontVariationSettings: "'FILL' 1"}}>send</span>
            </button>
          </div>
        </footer>
      </section>
    </div>
  );
}
