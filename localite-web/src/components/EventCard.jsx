import React, { useState, useEffect } from 'react';
import { Calendar, MapPin, Users, MessageSquare, Ticket, X, Settings2, Star, Image as ImageIcon } from 'lucide-react';
import { QRCodeSVG } from 'qrcode.react';

const EventCard = ({ id, title, category, date, rawDate, location, attendees, maxAttendees, imageUrl, isHost, host, onRsvp, onChat, onUserClick }) => {
  const [ticketData, setTicketData] = useState(null);
  const [showQr, setShowQr] = useState(false);
  const [showManage, setShowManage] = useState(false);
  const [showReview, setShowReview] = useState(false);
  const [ticketIdInput, setTicketIdInput] = useState('');
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState('');
  const [showMemories, setShowMemories] = useState(false);
  const [media, setMedia] = useState([]);
  const [newMediaUrl, setNewMediaUrl] = useState('');
  
  const isPastEvent = rawDate ? new Date(rawDate) < new Date() : false;

  useEffect(() => {
    fetchTicket();
  }, [id]);

  const fetchTicket = async () => {
    try {
      const token = localStorage.getItem('token');
      const res = await fetch(`http://localhost:8080/api/events/${id}/ticket`, {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      if (res.ok) {
        setTicketData(await res.json());
      }
    } catch (err) {
      console.error("Failed to fetch ticket", err);
    }
  };

  const handleCheckIn = async () => {
    if (!ticketIdInput) return;
    try {
      const token = localStorage.getItem('token');
      const res = await fetch(`http://localhost:8080/api/events/${id}/checkin/${ticketIdInput}`, {
        method: 'POST',
        headers: { 'Authorization': `Bearer ${token}` }
      });
      if (res.ok) {
        alert("Attendee checked in successfully!");
        setTicketIdInput('');
      } else {
        const errText = await res.text();
        alert(`Failed: ${errText}`);
      }
    } catch (err) {
      console.error(err);
      alert("Network error.");
    }
  };

  const handleReviewSubmit = async () => {
    try {
      const token = localStorage.getItem('token');
      const res = await fetch(`http://localhost:8080/api/events/${id}/reviews`, {
        method: 'POST',
        headers: { 
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ rating, comment })
      });
      if (res.ok) {
        alert("Review submitted successfully!");
        setShowReview(false);
      } else {
        const errText = await res.text();
        alert(`Failed: ${errText}`);
      }
    } catch (err) {
      console.error(err);
      alert("Network error.");
    }
  };

  const fetchMedia = async () => {
    try {
      const token = localStorage.getItem('token');
      const res = await fetch(`http://localhost:8080/api/events/${id}/media`, {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      if (res.ok) {
        setMedia(await res.json());
      }
    } catch (err) {
      console.error(err);
    }
  };

  const handleMediaUpload = async () => {
    if (!newMediaUrl) return;
    try {
      const token = localStorage.getItem('token');
      const res = await fetch(`http://localhost:8080/api/events/${id}/media`, {
        method: 'POST',
        headers: { 
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ mediaUrl: newMediaUrl })
      });
      if (res.ok) {
        setNewMediaUrl('');
        fetchMedia(); // Refresh
      } else {
        const errText = await res.text();
        alert(`Failed: ${errText}`);
      }
    } catch (err) {
      console.error(err);
      alert("Network error.");
    }
  };

  // Fetch media when opening the modal
  useEffect(() => {
    if (showMemories) {
      fetchMedia();
    }
  }, [showMemories]);

  return (
    <>
    <div className="group relative rounded-xl border border-surface-variant/20 bg-surface-container-low overflow-hidden hover:border-lime-vibe/50 transition-colors duration-500 flex flex-col h-[400px]">
      {/* Background Image */}
      <div 
        className="absolute inset-0 bg-cover bg-center opacity-40 group-hover:opacity-60 transition-opacity duration-700 mix-blend-luminosity" 
        style={{backgroundImage: `url('${imageUrl || "https://images.unsplash.com/photo-1511795409834-ef04bbd61622?auto=format&fit=crop&q=80&w=1000"}')`}}
      ></div>
      
      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-background via-background/80 to-transparent"></div>
      
      {/* Content */}
      <div className="relative z-10 flex flex-col h-full p-6 justify-between">
        <div className="flex justify-between items-start">
          <div className="bg-surface-dark/80 backdrop-blur-md px-3 py-1 rounded-full border border-surface-variant/30 font-label-mono text-xs text-lime-vibe uppercase tracking-widest">
            {category}
          </div>
          <div className="bg-surface-dark/80 backdrop-blur-md px-3 py-1 rounded-full border border-surface-variant/30 flex items-center gap-2">
             <Users size={14} className="text-text-muted" />
             <span className="font-label-mono text-xs text-text-muted">{attendees}/{maxAttendees}</span>
          </div>
        </div>

        <div className="space-y-4">
          <h3 className="font-headline-md text-headline-md text-on-surface uppercase tracking-tight leading-tight line-clamp-2">
            {title}
          </h3>
          {host && (
            <p className="font-label-mono text-[10px] text-text-muted uppercase tracking-widest mt-1">
              HOSTED BY{' '}
              <button 
                onClick={() => onUserClick && onUserClick(host.id)}
                className="text-lime-vibe hover:underline font-bold"
              >
                {host.username}
              </button>
            </p>
          )}
          
          <div className="space-y-2 font-label-mono text-xs uppercase tracking-widest text-text-muted">
            <div className="flex items-center gap-2">
              <Calendar size={14} className="text-lime-vibe" />
              <span>{date}</span>
            </div>
            <div className="flex items-center gap-2">
              <MapPin size={14} className="text-lime-vibe" />
              <span className="line-clamp-1">{location}</span>
            </div>
          </div>
          
          <div className="flex gap-2 mt-4">
            {isPastEvent ? (
              <>
                <button 
                  onClick={() => setShowMemories(true)}
                  className="flex-1 px-4 py-3 bg-surface-dark border border-lime-vibe/50 text-lime-vibe font-label-mono text-sm uppercase tracking-widest hover:bg-lime-vibe/10 transition-all rounded-DEFAULT flex items-center justify-center gap-2"
                >
                  <ImageIcon size={16} /> MEMORIES
                </button>
                {ticketData?.status === 'ATTENDED' && !isHost && (
                  <button 
                    onClick={() => setShowReview(true)} 
                    className="flex-1 px-4 py-3 bg-lime-vibe border border-lime-vibe text-primary-container font-label-mono text-sm uppercase tracking-widest hover:bg-white transition-all rounded-DEFAULT flex items-center justify-center gap-2"
                  >
                    <Star size={16} className="fill-primary-container" /> RATE
                  </button>
                )}
                {isHost && (
                  <button 
                    onClick={() => setShowManage(true)} 
                    className="flex-1 px-4 py-3 bg-surface-dark border border-lime-vibe text-lime-vibe font-label-mono text-sm uppercase tracking-widest hover:bg-lime-vibe/10 transition-all rounded-DEFAULT flex items-center justify-center gap-2"
                  >
                    <Settings2 size={16} /> MANAGE
                  </button>
                )}
              </>
            ) : (
              <>
                {isHost ? (
                  <button 
                    onClick={() => setShowManage(true)} 
                    className="flex-1 px-4 py-3 bg-surface-dark border border-lime-vibe text-lime-vibe font-label-mono text-sm uppercase tracking-widest hover:bg-lime-vibe/10 transition-all rounded-DEFAULT flex items-center justify-center gap-2"
                  >
                    <Settings2 size={16} /> MANAGE
                  </button>
                ) : ticketData ? (
                  <button 
                    onClick={() => setShowQr(true)} 
                    className="flex-1 px-4 py-3 bg-lime-vibe border border-lime-vibe text-primary-container font-label-mono text-sm uppercase tracking-widest hover:bg-white transition-all rounded-DEFAULT flex items-center justify-center gap-2"
                  >
                    <Ticket size={16} /> {ticketData.status === 'ATTENDED' ? 'ATTENDED' : 'VIEW TICKET'}
                  </button>
                ) : (
                  <button 
                    onClick={() => {
                      if (onRsvp) {
                        onRsvp(id);
                        setTimeout(fetchTicket, 1000);
                      }
                    }} 
                    className="flex-1 px-4 py-3 bg-transparent border border-surface-variant/50 text-on-surface font-label-mono text-sm uppercase tracking-widest hover:border-lime-vibe hover:text-lime-vibe hover:bg-lime-vibe/10 transition-all rounded-DEFAULT flex items-center justify-center gap-2"
                  >
                    JOIN <span className="material-symbols-outlined text-[16px]">arrow_forward</span>
                  </button>
                )}
              </>
            )}
            <button 
              onClick={() => onChat && onChat(id, title)} 
              className="px-4 py-3 bg-surface-dark border border-surface-variant/50 text-lime-vibe font-label-mono text-sm uppercase tracking-widest hover:border-lime-vibe transition-all rounded-DEFAULT flex items-center justify-center"
              title="Locker Room (Comms)"
            >
              <MessageSquare size={18} />
            </button>
          </div>
        </div>
      </div>
    </div>

    {/* QR Code Modal */}
    {showQr && ticketData && (
      <div className="fixed inset-0 bg-background/90 backdrop-blur-sm z-50 flex items-center justify-center p-4">
        <div className="bg-surface-dark border border-lime-vibe/30 rounded-2xl p-8 max-w-sm w-full relative glow-neon flex flex-col items-center">
          <button 
            onClick={() => setShowQr(false)}
            className="absolute top-4 right-4 text-text-muted hover:text-white"
          >
            <X size={24} />
          </button>
          
          <h3 className="font-headline-md text-white uppercase tracking-tight mb-2 text-center">{title}</h3>
          <p className="font-label-mono text-lime-vibe text-xs tracking-widest mb-8 text-center">{ticketData.status}</p>
          
          <div className="bg-white p-4 rounded-xl mb-6">
            <QRCodeSVG value={ticketData.ticketId} size={200} />
          </div>
          
          <p className="font-label-mono text-[10px] text-text-muted tracking-widest text-center mb-2">TICKET ID</p>
          <p className="font-body-sm text-white bg-surface-container px-4 py-2 rounded-lg font-mono text-center w-full break-all">
            {ticketData.ticketId}
          </p>
        </div>
      </div>
    )}

    {/* Manage Event Modal */}
    {showManage && isHost && (
      <div className="fixed inset-0 bg-background/90 backdrop-blur-sm z-50 flex items-center justify-center p-4">
        <div className="bg-surface-dark border border-surface-variant/30 rounded-2xl p-8 max-w-sm w-full relative">
          <button 
            onClick={() => setShowManage(false)}
            className="absolute top-4 right-4 text-text-muted hover:text-white"
          >
            <X size={24} />
          </button>
          
          <h3 className="font-headline-md text-white uppercase tracking-tight mb-2">Host Dashboard</h3>
          <p className="font-label-mono text-lime-vibe text-xs tracking-widest mb-6">MANUAL CHECK-IN</p>
          
          <div className="space-y-4">
            <div>
              <label className="block text-text-muted font-label-mono text-xs uppercase tracking-widest mb-2">Attendee Ticket ID</label>
              <input 
                type="text"
                value={ticketIdInput}
                onChange={(e) => setTicketIdInput(e.target.value)}
                placeholder="Paste UUID..."
                className="w-full bg-surface-container border border-surface-variant/50 text-white p-3 rounded-lg font-mono text-sm focus:border-lime-vibe outline-none transition-colors"
              />
            </div>
            
            <button 
              onClick={handleCheckIn}
              className="w-full bg-lime-vibe text-primary-container font-label-mono text-sm uppercase tracking-widest p-3 rounded-DEFAULT hover:bg-white transition-all glow-neon"
            >
              Check In Attendee
            </button>
          </div>
        </div>
      </div>
    )}

    {/* Review Modal */}
    {showReview && (
      <div className="fixed inset-0 bg-background/90 backdrop-blur-sm z-50 flex items-center justify-center p-4">
        <div className="bg-surface-dark border border-surface-variant/30 rounded-2xl p-8 max-w-sm w-full relative">
          <button 
            onClick={() => setShowReview(false)}
            className="absolute top-4 right-4 text-text-muted hover:text-white"
          >
            <X size={24} />
          </button>
          
          <h3 className="font-headline-md text-white uppercase tracking-tight mb-2">Rate Host</h3>
          <p className="font-label-mono text-lime-vibe text-xs tracking-widest mb-6">POST-EVENT REVIEW</p>
          
          <div className="space-y-6">
            <div className="flex justify-center gap-2">
              {[1, 2, 3, 4, 5].map((star) => (
                <button key={star} onClick={() => setRating(star)}>
                  <Star 
                    size={32} 
                    className={star <= rating ? "text-lime-vibe fill-lime-vibe" : "text-surface-variant"} 
                  />
                </button>
              ))}
            </div>
            
            <div>
              <textarea 
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                placeholder="How was the event? Leave a comment for the host..."
                className="w-full bg-surface-container border border-surface-variant/50 text-white p-3 rounded-lg font-body-sm focus:border-lime-vibe outline-none transition-colors h-32 resize-none"
              ></textarea>
            </div>
            
            <button 
              onClick={handleReviewSubmit}
              className="w-full bg-lime-vibe text-primary-container font-label-mono text-sm uppercase tracking-widest p-3 rounded-DEFAULT hover:bg-white transition-all glow-neon"
            >
              Submit Review
            </button>
          </div>
        </div>
      </div>
    )}

    {/* Memories Modal */}
    {showMemories && (
      <div className="fixed inset-0 bg-background/90 backdrop-blur-sm z-50 flex items-center justify-center p-4">
        <div className="bg-surface-dark border border-surface-variant/30 rounded-2xl p-8 max-w-2xl w-full h-[80vh] flex flex-col relative">
          <button 
            onClick={() => setShowMemories(false)}
            className="absolute top-4 right-4 text-text-muted hover:text-white"
          >
            <X size={24} />
          </button>
          
          <h3 className="font-headline-md text-white uppercase tracking-tight mb-2 flex items-center gap-2"><ImageIcon size={24} className="text-lime-vibe"/> Event Memories</h3>
          <p className="font-label-mono text-text-muted text-xs tracking-widest mb-6">SHARED GALLERY</p>
          
          <div className="flex-1 overflow-y-auto pr-2 custom-scrollbar">
            {media.length === 0 ? (
              <div className="h-full flex items-center justify-center flex-col text-text-muted">
                <ImageIcon size={48} className="mb-4 opacity-50" />
                <p className="font-label-mono uppercase tracking-widest">No memories uploaded yet.</p>
              </div>
            ) : (
              <div className="columns-2 md:columns-3 gap-4 space-y-4">
                {media.map((m) => (
                  <div key={m.id} className="break-inside-avoid relative group rounded-lg overflow-hidden border border-surface-variant/20">
                    <img src={m.mediaUrl} alt="Memory" className="w-full h-auto object-cover" />
                    <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/80 to-transparent p-2 translate-y-full group-hover:translate-y-0 transition-transform">
                      <p className="text-[10px] text-white font-label-mono tracking-wider truncate">by {m.uploader?.username}</p>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {(isHost || ticketData?.status === 'ATTENDED') && (
            <div className="mt-6 border-t border-surface-variant/30 pt-6">
              <div className="flex gap-2">
                <input 
                  type="text"
                  value={newMediaUrl}
                  onChange={(e) => setNewMediaUrl(e.target.value)}
                  placeholder="Paste image URL here..."
                  className="flex-1 bg-surface-container border border-surface-variant/50 text-white px-4 py-2 rounded-lg font-body-sm focus:border-lime-vibe outline-none transition-colors"
                />
                <button 
                  onClick={handleMediaUpload}
                  className="px-6 py-2 bg-lime-vibe text-primary-container font-label-mono text-sm uppercase tracking-widest hover:bg-white transition-all rounded-DEFAULT whitespace-nowrap"
                >
                  Upload
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    )}
    </>
  );
};

export default EventCard;
