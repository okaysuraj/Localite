import React, { useState, useEffect } from 'react';
import {
  CalendarBlank,
  MapPin,
  Users,
  ChatCircle,
  Ticket,
  X,
  GearSix,
  Star,
  Image as ImageIcon,
  Warning,
  Trophy,
  ArrowRight,
} from '@phosphor-icons/react';
import { QRCodeSVG } from 'qrcode.react';
import { API_BASE_URL } from '../services/api';

const EventCard = ({
  id,
  title,
  category,
  date,
  rawDate,
  location,
  attendees,
  maxAttendees,
  imageUrl,
  isHost,
  host,
  onRsvp,
  onChat,
  onUserClick,
  cost,
  skillLevel,
  eventType,
  isHighlighted,
}) => {
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
      const res = await fetch(
        `${API_BASE_URL}/events/${id}/ticket`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      if (res.ok) {
        setTicketData(await res.json());
      }
    } catch (err) {
      console.error('Failed to fetch ticket', err);
    }
  };

  const handleCheckIn = async () => {
    if (!ticketIdInput) return;
    try {
      const token = localStorage.getItem('token');
      const res = await fetch(
        `${API_BASE_URL}/events/${id}/checkin/${ticketIdInput}`,
        {
          method: 'POST',
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      if (res.ok) {
        alert('Attendee checked in successfully!');
        setTicketIdInput('');
      } else {
        const errText = await res.text();
        alert(`Failed: ${errText}`);
      }
    } catch (err) {
      console.error(err);
      alert('Network error.');
    }
  };

  const fetchWaitlist = async () => {
    try {
      const token = localStorage.getItem('token');
      const res = await fetch(
        `${API_BASE_URL}/events/${id}/rsvps`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      if (res.ok) {
        const data = await res.json();
        setWaitlist(data.filter((r) => r.status === 'WAITLIST'));
      }
    } catch (err) {
      console.error(err);
    }
  };

  const handleWaitlistAction = async (userId, action) => {
    try {
      const token = localStorage.getItem('token');
      const res = await fetch(
        `${API_BASE_URL}/events/${id}/rsvp/${userId}/${action}`,
        {
          method: 'POST',
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      if (res.ok) {
        alert(`User ${action}ed`);
        fetchWaitlist();
      }
    } catch (err) {
      console.error(err);
    }
  };

  const handleDeleteEvent = async () => {
    if (window.confirm('Are you sure you want to delete this event?')) {
      try {
        const token = localStorage.getItem('token');
        const res = await fetch(
          `${API_BASE_URL}/events/${id}`,
          {
            method: 'DELETE',
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        if (res.ok) {
          alert('Event deleted');
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
      const res = await fetch(
        `${API_BASE_URL}/events/${id}/reviews`,
        {
          method: 'POST',
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ rating, comment }),
        }
      );
      if (res.ok) {
        alert('Review submitted successfully!');
        setShowReview(false);
      } else {
        const errText = await res.text();
        alert(`Failed: ${errText}`);
      }
    } catch (err) {
      console.error(err);
      alert('Network error.');
    }
  };

  const fetchMedia = async () => {
    try {
      const token = localStorage.getItem('token');
      const res = await fetch(
        `${API_BASE_URL}/events/${id}/media`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
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
      const res = await fetch(
        `${API_BASE_URL}/events/${id}/media`,
        {
          method: 'POST',
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ mediaUrl: newMediaUrl }),
        }
      );
      if (res.ok) {
        setNewMediaUrl('');
        fetchMedia();
      } else {
        const errText = await res.text();
        alert(`Failed: ${errText}`);
      }
    } catch (err) {
      console.error(err);
      alert('Network error.');
    }
  };

  useEffect(() => {
    if (showMemories) {
      fetchMedia();
    }
  }, [showMemories]);

  const fetchAttendeesList = async () => {
    try {
      const token = localStorage.getItem('token');
      const res = await fetch(
        `${API_BASE_URL}/events/${id}/rsvps`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      if (res.ok) {
        const data = await res.json();
        setAttendeesList(data.map((r) => r.user));
      }
    } catch (err) {
      console.error(err);
    }
  };

  const handleSubmitResult = async () => {
    if (!winnerId || !loserId || !matchScore) return;
    try {
      const token = localStorage.getItem('token');
      const res = await fetch(
        `${API_BASE_URL}/leaderboard/submit-result`,
        {
          method: 'POST',
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            eventId: id,
            winnerId,
            loserId,
            score: matchScore,
          }),
        }
      );
      if (res.ok) {
        alert('Match result submitted!');
        setShowResult(false);
      } else {
        const errText = await res.text();
        alert(`Failed: ${errText}`);
      }
    } catch (err) {
      console.error(err);
      alert('Network error.');
    }
  };

  const handleReportEvent = async () => {
    if (window.confirm('Are you sure you want to report this event?')) {
      try {
        const token = localStorage.getItem('token');
        const res = await fetch(
          `${API_BASE_URL}/safety/report`,
          {
            method: 'POST',
            headers: {
              Authorization: `Bearer ${token}`,
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              targetType: 'EVENT',
              targetId: id,
              reason: 'Inappropriate event',
              details: '',
            }),
          }
        );
        if (res.ok) {
          alert('Report submitted successfully.');
        }
      } catch (err) {
        console.error(err);
      }
    }
  };

  const handleHighlightEvent = async () => {
    if (
      window.confirm('Pay $9.99 to highlight this event? (Mock Payment)')
    ) {
      try {
        const token = localStorage.getItem('token');
        const res = await fetch(
          `${API_BASE_URL}/monetization/highlight-event/${id}`,
          {
            method: 'POST',
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        if (res.ok) {
          alert('Event highlighted successfully!');
          window.location.reload();
        }
      } catch (err) {
        console.error(err);
      }
    }
  };

  /* ============================================================
     Modal overlay — shared base
     ============================================================ */
  const ModalOverlay = ({ show, onClose, children, wide }) => {
    if (!show) return null;
    return (
      <div className="fixed inset-0 bg-black/40 backdrop-blur-sm z-50 flex items-center justify-center p-4">
        <div
          className={`bg-white border border-border rounded-md p-6 ${
            wide ? 'max-w-2xl' : 'max-w-md'
          } w-full relative animate-scale-in shadow-modal`}
        >
          <button
            onClick={onClose}
            className="absolute top-4 right-4 text-fg-faint hover:text-fg transition-colors"
          >
            <X size={20} weight="bold" />
          </button>
          {children}
        </div>
      </div>
    );
  };

  return (
    <>
      {/* Card */}
      <div
        className={`card card-hover flex flex-col ${
          isHighlighted ? 'ring-2 ring-accent' : ''
        }`}
      >
        {/* Image */}
        <div className="aspect-[16/10] overflow-hidden bg-bg-subtle relative group">
          <img
            className="w-full h-full object-cover transition-transform duration-500 ease-out group-hover:scale-[1.03]"
            alt={title}
            src={
              imageUrl ||
              'https://images.unsplash.com/photo-1511795409834-ef04bbd61622?auto=format&fit=crop&q=80&w=1000'
            }
          />
        </div>

        {/* Content */}
        <div className="p-5 flex flex-col flex-1">
          {/* Tags row */}
          <div className="flex flex-wrap gap-1.5 mb-3">
            <span className="tag text-micro">{category}</span>
            {cost > 0 ? (
              <span className="tag text-micro">${cost}</span>
            ) : cost === 0 ? (
              <span className="tag text-micro">Free</span>
            ) : null}
            {skillLevel && skillLevel !== 'All' && (
              <span className="tag-neutral tag text-micro">{skillLevel}</span>
            )}
          </div>

          {/* Title */}
          <h3 className="text-body font-semibold text-fg mb-1 line-clamp-2 leading-snug">
            {isHighlighted && (
              <Star
                size={14}
                weight="fill"
                className="text-accent inline mr-1 -mt-0.5"
              />
            )}
            {title}
          </h3>

          {/* Host */}
          {host && (
            <p className="text-caption text-fg-muted mb-3">
              by{' '}
              <button
                onClick={() => onUserClick && onUserClick(host.id)}
                className="text-accent hover:underline font-medium"
              >
                {host.username}
              </button>
            </p>
          )}

          {/* Meta */}
          <div className="space-y-1.5 text-caption text-fg-muted mb-4">
            <div className="flex items-center gap-2">
              <CalendarBlank size={14} weight="bold" className="text-accent" />
              <span>{date}</span>
            </div>
            <div className="flex items-center gap-2">
              <MapPin size={14} weight="bold" className="text-accent" />
              <span className="line-clamp-1">{location}</span>
            </div>
          </div>

          {/* Attendees */}
          <div className="flex items-center gap-2 text-caption text-fg-muted mb-4">
            <Users size={14} weight="bold" />
            <span>
              {attendees}/{maxAttendees} attending
            </span>
          </div>

          {/* Actions */}
          <div className="flex gap-2 mt-auto">
            {isPastEvent ? (
              <>
                <button
                  onClick={() => setShowMemories(true)}
                  className="btn-ghost flex-1 text-sm py-2 px-3"
                >
                  <ImageIcon size={16} weight="bold" />
                  Memories
                </button>
                {ticketData?.status === 'ATTENDED' && !isHost && (
                  <button
                    onClick={() => setShowReview(true)}
                    className="btn-primary flex-1 text-sm py-2 px-3"
                  >
                    <Star size={16} weight="bold" />
                    Rate
                  </button>
                )}
                {isHost && (
                  <button
                    onClick={() => {
                      fetchWaitlist();
                      setShowManage(true);
                    }}
                    className="btn-ghost flex-1 text-sm py-2 px-3"
                  >
                    <GearSix size={16} weight="bold" />
                    Manage
                  </button>
                )}
                {isHost && category === 'Sports' && (
                  <button
                    onClick={() => {
                      fetchAttendeesList();
                      setShowResult(true);
                    }}
                    className="btn-primary flex-1 text-sm py-2 px-3"
                  >
                    <Trophy size={16} weight="bold" />
                    Result
                  </button>
                )}
                {isHost && !isHighlighted && (
                  <button
                    onClick={handleHighlightEvent}
                    className="btn-ghost flex-1 text-sm py-2 px-3"
                  >
                    <Star size={16} weight="bold" />
                    Highlight
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
                    className="btn-ghost flex-1 text-sm py-2 px-3"
                  >
                    <GearSix size={16} weight="bold" />
                    Manage
                  </button>
                ) : ticketData ? (
                  <button
                    onClick={() => setShowQr(true)}
                    className="btn-primary flex-1 text-sm py-2 px-3"
                  >
                    <Ticket size={16} weight="bold" />
                    {ticketData.status === 'ATTENDED'
                      ? 'Attended'
                      : ticketData.status === 'WAITLIST'
                      ? 'Waitlisted'
                      : 'View ticket'}
                  </button>
                ) : (
                  <button
                    onClick={() => {
                      if (cost > 0) {
                        if (
                          window.confirm(
                            `Pay $${cost} to buy a ticket? (Mock Payment)`
                          )
                        ) {
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
                    className={`flex-1 text-sm py-2 px-3 ${
                      attendees >= maxAttendees
                        ? 'btn-ghost border-live text-live'
                        : 'btn-primary'
                    }`}
                  >
                    {attendees >= maxAttendees
                      ? 'Join waitlist'
                      : cost > 0
                      ? 'Buy ticket'
                      : 'Join'}
                    <ArrowRight size={14} weight="bold" />
                  </button>
                )}
                {isHost && !isHighlighted && !isPastEvent && (
                  <button
                    onClick={handleHighlightEvent}
                    className="btn-ghost text-sm py-2 px-3"
                  >
                    <Star size={16} weight="bold" />
                  </button>
                )}
              </>
            )}
            <button
              onClick={() => onChat && onChat(id, title)}
              className="btn-ghost text-sm py-2 px-3"
              title="Group chat"
            >
              <ChatCircle size={16} weight="bold" />
            </button>
            <button
              onClick={handleReportEvent}
              className="btn-ghost text-sm py-2 px-3 hover:text-error hover:border-error"
              title="Report"
            >
              <Warning size={16} weight="bold" />
            </button>
          </div>
        </div>
      </div>

      {/* ============ QR Code Modal ============ */}
      <ModalOverlay show={showQr && !!ticketData} onClose={() => setShowQr(false)}>
        <div className="text-center">
          <h3 className="text-title-sm text-fg mb-1">{title}</h3>
          <span className="tag text-micro mb-6 inline-block">{ticketData?.status}</span>
          <div className="bg-bg-subtle p-4 rounded-md inline-block mb-4">
            <QRCodeSVG value={ticketData?.ticketId || ''} size={180} />
          </div>
          <p className="text-caption text-fg-muted mb-1">Ticket ID</p>
          <p className="text-caption font-mono text-fg bg-bg-subtle px-3 py-2 rounded-sm break-all">
            {ticketData?.ticketId}
          </p>
        </div>
      </ModalOverlay>

      {/* ============ Manage Modal ============ */}
      <ModalOverlay show={showManage && isHost} onClose={() => setShowManage(false)}>
        <h3 className="text-title-sm text-fg mb-1">Manage event</h3>
        <p className="text-caption text-fg-muted mb-6">Check in attendees and manage waitlist</p>

        <div className="space-y-4 mb-6">
          <div>
            <label className="block text-body-sm font-medium text-fg mb-2">
              Attendee ticket ID
            </label>
            <input
              type="text"
              value={ticketIdInput}
              onChange={(e) => setTicketIdInput(e.target.value)}
              placeholder="Paste UUID..."
              className="input-bordered font-mono text-sm"
            />
          </div>
          <button onClick={handleCheckIn} className="btn-primary w-full">
            Check in
          </button>
        </div>

        <div className="border-t border-border pt-6">
          <h4 className="text-body-sm font-semibold text-fg mb-3">Waitlist</h4>
          {waitlist.length === 0 ? (
            <p className="text-body-sm text-fg-muted">No users on waitlist.</p>
          ) : (
            <div className="space-y-2 max-h-40 overflow-y-auto">
              {waitlist.map((rsvp) => (
                <div
                  key={rsvp.id}
                  className="flex justify-between items-center bg-bg-subtle px-3 py-2 rounded-sm"
                >
                  <span className="text-body-sm text-fg">{rsvp.user.username}</span>
                  <div className="flex gap-2">
                    <button
                      onClick={() => handleWaitlistAction(rsvp.user.id, 'approve')}
                      className="text-caption text-accent font-medium hover:underline"
                    >
                      Approve
                    </button>
                    <button
                      onClick={() => handleWaitlistAction(rsvp.user.id, 'reject')}
                      className="text-caption text-error font-medium hover:underline"
                    >
                      Reject
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="border-t border-border pt-6 mt-6">
          <button
            onClick={handleDeleteEvent}
            className="btn-ghost w-full text-error border-error hover:bg-error-subtle"
          >
            Delete event
          </button>
        </div>
      </ModalOverlay>

      {/* ============ Review Modal ============ */}
      <ModalOverlay show={showReview} onClose={() => setShowReview(false)}>
        <h3 className="text-title-sm text-fg mb-1">Rate this event</h3>
        <p className="text-caption text-fg-muted mb-6">Share your experience</p>

        <div className="space-y-6">
          <div className="flex justify-center gap-1">
            {[1, 2, 3, 4, 5].map((star) => (
              <button
                key={star}
                onClick={() => setRating(star)}
                className="transition-transform duration-150 hover:scale-110 active:scale-95"
              >
                <Star
                  size={28}
                  weight={star <= rating ? 'fill' : 'regular'}
                  className={star <= rating ? 'text-accent' : 'text-border'}
                />
              </button>
            ))}
          </div>

          <textarea
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            placeholder="How was the event?"
            className="input-bordered h-28 resize-none"
          />

          <button onClick={handleReviewSubmit} className="btn-primary w-full">
            Submit review
          </button>
        </div>
      </ModalOverlay>

      {/* ============ Memories Modal ============ */}
      <ModalOverlay
        show={showMemories}
        onClose={() => setShowMemories(false)}
        wide
      >
        <h3 className="text-title-sm text-fg mb-1">Event memories</h3>
        <p className="text-caption text-fg-muted mb-6">Photos from this event</p>

        <div className="max-h-[50vh] overflow-y-auto">
          {media.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-12 text-fg-faint">
              <ImageIcon size={40} weight="bold" className="mb-3" />
              <p className="text-body-sm">No photos uploaded yet.</p>
            </div>
          ) : (
            <div className="columns-2 md:columns-3 gap-3 space-y-3">
              {media.map((m) => (
                <div
                  key={m.id}
                  className="break-inside-avoid rounded-sm overflow-hidden border border-border"
                >
                  <img
                    src={m.mediaUrl}
                    alt="Memory"
                    className="w-full h-auto object-cover"
                  />
                </div>
              ))}
            </div>
          )}
        </div>

        {(isHost || ticketData?.status === 'ATTENDED') && (
          <div className="border-t border-border pt-4 mt-4">
            <div className="flex gap-2">
              <input
                type="text"
                value={newMediaUrl}
                onChange={(e) => setNewMediaUrl(e.target.value)}
                placeholder="Paste image URL..."
                className="input-bordered flex-1 text-sm"
              />
              <button onClick={handleMediaUpload} className="btn-primary text-sm">
                Upload
              </button>
            </div>
          </div>
        )}
      </ModalOverlay>

      {/* ============ Match Result Modal ============ */}
      <ModalOverlay
        show={showResult && isHost && category === 'Sports'}
        onClose={() => setShowResult(false)}
      >
        <h3 className="text-title-sm text-fg mb-1 flex items-center gap-2">
          <Trophy size={18} weight="bold" className="text-accent" />
          Match result
        </h3>
        <p className="text-caption text-fg-muted mb-6">Update the leaderboard</p>

        <div className="space-y-4">
          <div>
            <label className="block text-body-sm font-medium text-fg mb-2">
              Winner
            </label>
            <select
              value={winnerId}
              onChange={(e) => setWinnerId(e.target.value)}
              className="input-bordered"
            >
              <option value="">Select winner...</option>
              {attendeesList.map((u) => (
                <option key={u.id} value={u.id}>
                  {u.username}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-body-sm font-medium text-fg mb-2">
              Loser
            </label>
            <select
              value={loserId}
              onChange={(e) => setLoserId(e.target.value)}
              className="input-bordered"
            >
              <option value="">Select loser...</option>
              {attendeesList.map((u) => (
                <option key={u.id} value={u.id}>
                  {u.username}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-body-sm font-medium text-fg mb-2">
              Score
            </label>
            <input
              type="text"
              value={matchScore}
              onChange={(e) => setMatchScore(e.target.value)}
              placeholder="e.g. 6-4, 6-2"
              className="input-bordered font-mono text-sm"
            />
          </div>

          <button onClick={handleSubmitResult} className="btn-primary w-full mt-2">
            Submit result
          </button>
        </div>
      </ModalOverlay>
    </>
  );
};

export default EventCard;
