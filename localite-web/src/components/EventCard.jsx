import React, { useState, useEffect } from 'react';
import { Calendar, MapPin, Users, MessageSquare, Ticket, X, Settings2, Star, Image as ImageIcon, AlertTriangle, Trophy } from 'lucide-react';
import { QRCodeSVG } from 'qrcode.react';

const EventCard = ({ id, title, category, date, rawDate, location, attendees, maxAttendees, imageUrl, isHost, host, onRsvp, onChat, onUserClick, cost, skillLevel, eventType, isHighlighted }) => {
  const [ticketData, setTicketData] = useState(null);
  const [showQr, setShowQr] = useState(false);
  const [showManage, setShowManage] = useState(false);
  const [showReview, setShowReview] = useState(false);
  const [ticketIdInput, setTicketIdInput] = useState('');
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState('');
  const [showMemories, setShowMemories] = useState(false);
  const [showResult, setShowResult] = useState(false);
  const [media, setMedia] = useState([]);
  const [newMediaUrl, setNewMediaUrl] = useState('');
  const [winnerId, setWinnerId] = useState('');
  const [loserId, setLoserId] = useState('');
  const [matchScore, setMatchScore] = useState('');
  const [attendeesList, setAttendeesList] = useState([]);
  const [waitlist, setWaitlist] = useState([]);
  
  const isPastEvent = rawDate ? new Date(rawDate) < new Date() : false;

  useEffect(() => {
    fetchTicket();
  }, [id]);

  const fetchTicket = async () => {
    try {
      const token = localStorage.getItem('token');
      const res = await fetch(`${import.meta.env.VITE_API_URL}/events/${id}/ticket`, {
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
      const res = await fetch(`${import.meta.env.VITE_API_URL}/events/${id}/checkin/${ticketIdInput}`, {
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
      console.error(err);
      alert("Network error.");
    }
  };

  const fetchWaitlist = async () => {
    try {
      const token = localStorage.getItem('token');
      const res = await fetch(`${import.meta.env.VITE_API_URL}/events/${id}/rsvps`, {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      if (res.ok) {
        const data = await res.json();
        setWaitlist(data.filter(r => r.status === 'WAITLIST'));
      }
    } catch (err) {
      console.error(err);
    }
  };

  const handleWaitlistAction = async (userId, action) => {
    try {
      const token = localStorage.getItem('token');
      const res = await fetch(`${import.meta.env.VITE_API_URL}/events/${id}/rsvp/${userId}/${action}`, {
        method: 'POST',
        headers: { 'Authorization': `Bearer ${token}` }
      });
      if (res.ok) {
        alert(`User ${action}ed`);
        fetchWaitlist();
      }
    } catch (err) {
      console.error(err);
    }
  };

  const handleDeleteEvent = async () => {
    if(window.confirm("Are you sure you want to delete this event?")) {
      try {
        const token = localStorage.getItem('token');
        const res = await fetch(`${import.meta.env.VITE_API_URL}/events/${id}`, {
          method: 'DELETE',
          headers: { 'Authorization': `Bearer ${token}` }
        });
        if (res.ok) {
          alert("Event deleted");
          window.location.reload();
        }
      } catch (err) {
        console.error(err);
      }
    }
  };

  const handleReviewSubmit = async () => {
    try {
      const token = localStorage.getItem('token');
      const res = await fetch(`${import.meta.env.VITE_API_URL}/events/${id}/reviews`, {
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
      const res = await fetch(`${import.meta.env.VITE_API_URL}/events/${id}/media`, {
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
      const res = await fetch(`${import.meta.env.VITE_API_URL}/events/${id}/media`, {
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

  // Fetch attendees for match result submission
  const fetchAttendeesList = async () => {
    try {
      const token = localStorage.getItem('token');
      const res = await fetch(`${import.meta.env.VITE_API_URL}/events/${id}/rsvps`, {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      if (res.ok) {
        const data = await res.json();
        // Extract users from RSVPs
        setAttendeesList(data.map(r => r.user));
      }
    } catch (err) {
      console.error(err);
    }
  };

  const handleSubmitResult = async () => {
    if (!winnerId || !loserId || !matchScore) return;
    try {
      const token = localStorage.getItem('token');
      const res = await fetch(`${import.meta.env.VITE_API_URL}/leaderboard/submit-result`, {
        method: 'POST',
        headers: { 
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ eventId: id, winnerId, loserId, score: matchScore })
      });
      if (res.ok) {
        alert("Match result submitted!");
        setShowResult(false);
      } else {
        const errText = await res.text();
        alert(`Failed: ${errText}`);
      }
    } catch (err) {
      console.error(err);
      alert("Network error.");
    }
  };

  const handleReportEvent = async () => {
    if (window.confirm("Are you sure you want to report this event?")) {
      try {
        const token = localStorage.getItem('token');
        const res = await fetch(`${import.meta.env.VITE_API_URL}/safety/report`, {
          method: 'POST',
          headers: { 
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ targetType: 'EVENT', targetId: id, reason: 'Inappropriate event', details: '' })
        });
        if (res.ok) {
          alert("Report submitted successfully.");
        }
      } catch (err) {
        console.error(err);
      }
    }
  };

  const handleHighlightEvent = async () => {
    if (window.confirm("Pay $9.99 to highlight this event? (Mock Payment)")) {
      try {
        const token = localStorage.getItem('token');
        const res = await fetch(`${import.meta.env.VITE_API_URL}/monetization/highlight-event/${id}`, {
          method: 'POST',
          headers: { 'Authorization': `Bearer ${token}` }
        });
        if (res.ok) {
          alert("Event highlighted successfully!");
          window.location.reload();
        }
      } catch (err) {
        console.error(err);
      }
    }
  };

  return (
    <>
    <div className={`group relative rounded-xl border ${isHighlighted ? 'border-purple-500 shadow-[0_0_15px_rgba(168,85,247,0.5)]' : 'border-surface-variant/20'} bg-surface-container-low overflow-hidden hover:border-lime-vibe/50 transition-colors duration-500 flex flex-col h-[400px]`}>
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
          <div className="flex gap-2 flex-wrap">
            <div className="bg-surface-dark/80 backdrop-blur-md px-3 py-1 rounded-full border border-surface-variant/30 font-label-mono text-xs text-lime-vibe uppercase tracking-widest">
              {category}
            </div>
            {cost > 0 ? (
              <div className="bg-surface-dark/80 backdrop-blur-md px-3 py-1 rounded-full border border-[#10b981] font-label-mono text-xs text-[#10b981] uppercase tracking-widest">
                ${cost}
              </div>
            ) : cost === 0 ? (
              <div className="bg-surface-dark/80 backdrop-blur-md px-3 py-1 rounded-full border border-[#10b981] font-label-mono text-xs text-[#10b981] uppercase tracking-widest">
                FREE
              </div>
            ) : null}
            {skillLevel && skillLevel !== 'All' && (
              <div className="bg-surface-dark/80 backdrop-blur-md px-3 py-1 rounded-full border border-surface-variant/30 font-label-mono text-xs text-on-surface uppercase tracking-widest">
                {skillLevel}
              </div>
            )}
          </div>
          <div className="bg-surface-dark/80 backdrop-blur-md px-3 py-1 rounded-full border border-surface-variant/30 flex items-center gap-2">
             <Users size={14} className="text-text-muted" />
             <span className="font-label-mono text-xs text-text-muted">{attendees}/{maxAttendees}</span>
          </div>
        </div>

        <div className="space-y-4">
          <h3 className="font-headline-md text-headline-md text-on-surface uppercase tracking-tight leading-tight line-clamp-2">
            {isHighlighted && <span className="text-purple-400 mr-2">★</span>}
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
                    onClick={() => {
                      fetchWaitlist();
                      setShowManage(true);
                    }} 
                    className="flex-1 px-4 py-3 bg-surface-dark border border-lime-vibe text-lime-vibe font-label-mono text-sm uppercase tracking-widest hover:bg-lime-vibe/10 transition-all rounded-DEFAULT flex items-center justify-center gap-2"
                  >
                    <Settings2 size={16} /> MANAGE
                  </button>
                )}
                {isHost && category === 'Sports' && (
                  <button 
                    onClick={() => {
                      fetchAttendeesList();
                      setShowResult(true);
                    }} 
                    className="flex-1 px-4 py-3 bg-lime-vibe border border-lime-vibe text-primary-container font-label-mono text-sm uppercase tracking-widest hover:bg-white transition-all rounded-DEFAULT flex items-center justify-center gap-2"
                  >
                    <Trophy size={16} /> RESULT
                  </button>
                )}
                {isHost && !isHighlighted && (
                  <button 
                    onClick={handleHighlightEvent} 
                    className="flex-1 px-4 py-3 bg-surface-dark border border-purple-500/50 text-purple-400 font-label-mono text-sm uppercase tracking-widest hover:bg-purple-500/10 transition-all rounded-DEFAULT flex items-center justify-center gap-2"
                  >
                    <Star size={16} /> HIGHLIGHT
                  </button>
                )}
              </>
            ) : (
              <>
                {isHost ? (
                  <button 
                    onClick={() => {
                      fetchWaitlist();
                      setShowManage(true);
                    }} 
                    className="flex-1 px-4 py-3 bg-surface-dark border border-lime-vibe text-lime-vibe font-label-mono text-sm uppercase tracking-widest hover:bg-lime-vibe/10 transition-all rounded-DEFAULT flex items-center justify-center gap-2"
                  >
                    <Settings2 size={16} /> MANAGE
                  </button>
                ) : ticketData ? (
                  <button 
                    onClick={() => setShowQr(true)} 
                    className="flex-1 px-4 py-3 bg-lime-vibe border border-lime-vibe text-primary-container font-label-mono text-sm uppercase tracking-widest hover:bg-white transition-all rounded-DEFAULT flex items-center justify-center gap-2"
                  >
                    <Ticket size={16} /> {ticketData.status === 'ATTENDED' ? 'ATTENDED' : ticketData.status === 'WAITLIST' ? 'ON WAITLIST' : 'VIEW TICKET'}
                  </button>
                ) : (
                  <button 
                    onClick={() => {
                      if (cost > 0) {
                        if(window.confirm(`Pay $${cost} to buy a ticket? (Mock Payment)`)) {
                          if (onRsvp) {
                            onRsvp(id);
                            setTimeout(fetchTicket, 1000);
                          }
                        }
                      } else {
                        if (onRsvp) {
                          onRsvp(id);
                          setTimeout(fetchTicket, 1000);
                        }
                      }
                    }} 
                    className={`flex-1 px-4 py-3 font-label-mono text-sm uppercase tracking-widest transition-all rounded-DEFAULT flex items-center justify-center gap-2 ${attendees >= maxAttendees ? 'bg-[#f59e0b] border-[#f59e0b] text-primary-container hover:bg-[#d97706]' : 'bg-transparent border border-surface-variant/50 text-on-surface hover:border-lime-vibe hover:text-lime-vibe hover:bg-lime-vibe/10'}`}
                  >
                    {attendees >= maxAttendees ? 'JOIN WAITLIST' : cost > 0 ? 'BUY TICKET' : 'JOIN'} <span className="material-symbols-outlined text-[16px]">arrow_forward</span>
                  </button>
                )}
                {isHost && !isHighlighted && !isPastEvent && (
                  <button 
                    onClick={handleHighlightEvent} 
                    className="flex-1 px-4 py-3 bg-surface-dark border border-purple-500/50 text-purple-400 font-label-mono text-sm uppercase tracking-widest hover:bg-purple-500/10 transition-all rounded-DEFAULT flex items-center justify-center gap-2"
                  >
                    <Star size={16} /> HIGHLIGHT
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
            <button 
              onClick={handleReportEvent} 
              className="px-4 py-3 bg-surface-dark border border-surface-variant/50 text-text-muted font-label-mono text-sm uppercase tracking-widest hover:text-red-500 hover:border-red-500/50 transition-all rounded-DEFAULT flex items-center justify-center"
              title="Report Event"
            >
              <AlertTriangle size={18} />
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

          <div className="mt-8 border-t border-surface-variant/30 pt-6">
            <p className="font-label-mono text-lime-vibe text-xs tracking-widest mb-4">WAITLIST MANAGEMENT</p>
            {waitlist.length === 0 ? (
              <p className="text-text-muted font-body-sm">No users on waitlist.</p>
            ) : (
              <div className="space-y-3 max-h-40 overflow-y-auto custom-scrollbar">
                {waitlist.map(rsvp => (
                  <div key={rsvp.id} className="flex justify-between items-center bg-surface-container p-2 rounded border border-surface-variant/50">
                    <span className="text-white text-sm">{rsvp.user.username}</span>
                    <div className="flex gap-2">
                      <button onClick={() => handleWaitlistAction(rsvp.user.id, 'approve')} className="bg-lime-vibe/20 text-lime-vibe px-2 py-1 rounded text-xs uppercase hover:bg-lime-vibe/40">Approve</button>
                      <button onClick={() => handleWaitlistAction(rsvp.user.id, 'reject')} className="bg-red-500/20 text-red-500 px-2 py-1 rounded text-xs uppercase hover:bg-red-500/40">Reject</button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          <div className="mt-8 border-t border-red-500/30 pt-6">
            <button 
              onClick={handleDeleteEvent}
              className="w-full bg-red-500/10 border border-red-500/50 text-red-500 font-label-mono text-sm uppercase tracking-widest p-3 rounded-DEFAULT hover:bg-red-500/30 transition-all"
            >
              Delete Event
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
    {/* Submit Match Result Modal */}
    {showResult && isHost && category === 'Sports' && (
      <div className="fixed inset-0 bg-background/90 backdrop-blur-sm z-50 flex items-center justify-center p-4">
        <div className="bg-surface-dark border border-surface-variant/30 rounded-2xl p-8 max-w-sm w-full relative">
          <button 
            onClick={() => setShowResult(false)}
            className="absolute top-4 right-4 text-text-muted hover:text-white"
          >
            <X size={24} />
          </button>
          
          <h3 className="font-headline-md text-white uppercase tracking-tight mb-2 flex items-center gap-2"><Trophy size={20} className="text-lime-vibe"/> Match Result</h3>
          <p className="font-label-mono text-lime-vibe text-xs tracking-widest mb-6">UPDATE LEADERBOARD</p>
          
          <div className="space-y-4">
            <div>
              <label className="block text-text-muted font-label-mono text-xs uppercase tracking-widest mb-2">Winner</label>
              <select 
                value={winnerId}
                onChange={(e) => setWinnerId(e.target.value)}
                className="w-full bg-surface-container border border-surface-variant/50 text-white p-3 rounded-lg font-body-sm focus:border-lime-vibe outline-none transition-colors"
              >
                <option value="">Select Winner...</option>
                {attendeesList.map(u => (
                  <option key={u.id} value={u.id}>{u.username}</option>
                ))}
              </select>
            </div>
            
            <div>
              <label className="block text-text-muted font-label-mono text-xs uppercase tracking-widest mb-2">Loser</label>
              <select 
                value={loserId}
                onChange={(e) => setLoserId(e.target.value)}
                className="w-full bg-surface-container border border-surface-variant/50 text-white p-3 rounded-lg font-body-sm focus:border-lime-vibe outline-none transition-colors"
              >
                <option value="">Select Loser...</option>
                {attendeesList.map(u => (
                  <option key={u.id} value={u.id}>{u.username}</option>
                ))}
              </select>
            </div>
            
            <div>
              <label className="block text-text-muted font-label-mono text-xs uppercase tracking-widest mb-2">Score (e.g. 6-4, 6-2)</label>
              <input 
                type="text"
                value={matchScore}
                onChange={(e) => setMatchScore(e.target.value)}
                placeholder="Final Score"
                className="w-full bg-surface-container border border-surface-variant/50 text-white p-3 rounded-lg font-mono text-sm focus:border-lime-vibe outline-none transition-colors"
              />
            </div>
            
            <button 
              onClick={handleSubmitResult}
              className="w-full bg-lime-vibe text-primary-container font-label-mono text-sm uppercase tracking-widest p-3 rounded-DEFAULT hover:bg-white transition-all glow-neon mt-4"
            >
              Submit Result
            </button>
          </div>
        </div>
      </div>
    )}
    </>
  );
};

export default EventCard;
