import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { auth } from '../../firebase';
import { API_URL } from '../../config';
import { Trophy, ArrowLeft, Users, Lock } from '@phosphor-icons/react';

export default function CreateMatchPage() {
  const navigate = useNavigate();
  const [sport, setSport] = useState('Tennis (Singles)');
  const [level, setLevel] = useState('Amateur');
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');
  const [maxPlayers, setMaxPlayers] = useState(4);
  const [isPrivate, setIsPrivate] = useState(false);
  const [houseRules, setHouseRules] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!date || !time) {
      alert('Date and time are required.');
      return;
    }
    setIsSubmitting(true);
    try {
      const token = await auth.currentUser?.getIdToken();
      if (!token) {
        alert('Please login to create a match.');
        return;
      }

      const payload = {
        title: `${level} ${sport} Match`,
        category: sport.split(' ')[0],
        skillLevel: level,
        eventType: isPrivate ? 'Private Match' : 'Public Match',
        date: `${date}T${time}:00`,
        maxAttendees: maxPlayers,
        rules: houseRules,
        location: 'Heritage Sports Complex, Court 4',
        cost: 0,
      };

      const res = await fetch(`${API_URL}/events`, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });

      if (res.ok) {
        const createdMatch = await res.json().catch(() => null);
        alert('Match created successfully!');
        const matchId = createdMatch?.id || 'demo';
        navigate(`/matches/${matchId}/lobby`);
      } else {
        const errorData = await res.text();
        alert(errorData || 'Failed to create match');
      }
    } catch (error) {
      console.error(error);
      alert('An unexpected error occurred.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="bg-[var(--bg-subtle)] text-[var(--fg)] min-h-screen py-10 px-4 sm:px-6">
      <main className="max-w-6xl mx-auto space-y-8">
        {/* Header */}
        <div>
          <button
            type="button"
            onClick={() => navigate(-1)}
            className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-[var(--fg-muted)] hover:text-[var(--fg)] transition-colors mb-3"
          >
            <ArrowLeft size={16} />
            Return
          </button>
          <span className="font-mono text-xs uppercase tracking-wider text-[var(--accent)] block mb-1">
            Sports & Athletics
          </span>
          <h1 className="text-3xl sm:text-4xl font-serif text-[var(--fg)]">Create New Match</h1>
          <p className="text-xs sm:text-sm text-[var(--fg-muted)] max-w-xl mt-1">
            Configure an open or private competitive matchup, set division rank, and invite community peers.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Main Form Fields */}
          <div className="lg:col-span-8 space-y-6">
            {/* Fundamentals */}
            <section className="bg-white rounded-card border border-[var(--border)] p-6 sm:p-8 space-y-6">
              <div className="flex items-center gap-2 pb-3 border-b border-[var(--border)]">
                <Trophy size={18} className="text-[var(--accent)]" />
                <h2 className="text-base font-serif text-[var(--fg)]">Match Fundamentals</h2>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="block text-xs font-mono uppercase tracking-wider text-[var(--fg-muted)]">
                    Sport Category
                  </label>
                  <input
                    type="text"
                    value={sport}
                    onChange={(e) => setSport(e.target.value)}
                    placeholder="e.g. Tennis (Singles)"
                    className="w-full bg-[var(--bg-subtle)] border border-[var(--border)] rounded-card px-4 py-2.5 text-xs sm:text-sm text-[var(--fg)] focus:outline-none focus:border-[var(--fg)] transition-colors"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="block text-xs font-mono uppercase tracking-wider text-[var(--fg-muted)]">
                    Competitive Tier
                  </label>
                  <div className="grid grid-cols-3 gap-2">
                    {['Novice', 'Amateur', 'Elite'].map((lvl) => (
                      <button
                        key={lvl}
                        type="button"
                        onClick={() => setLevel(lvl)}
                        className={`py-2 rounded-card text-xs font-mono uppercase tracking-wider transition-colors border ${
                          level === lvl
                            ? 'bg-[var(--accent)] text-white border-[var(--accent)]'
                            : 'bg-[var(--bg-subtle)] border-[var(--border)] text-[var(--fg)] hover:border-[var(--fg-muted)]'
                        }`}
                      >
                        {lvl}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                <div className="space-y-1.5">
                  <label className="block text-xs font-mono uppercase tracking-wider text-[var(--fg-muted)]">
                    Schedule Date
                  </label>
                  <input
                    type="date"
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                    className="w-full bg-[var(--bg-subtle)] border border-[var(--border)] rounded-card px-4 py-2.5 text-xs sm:text-sm text-[var(--fg)] focus:outline-none focus:border-[var(--fg)] transition-colors"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="block text-xs font-mono uppercase tracking-wider text-[var(--fg-muted)]">
                    Start Time
                  </label>
                  <input
                    type="time"
                    value={time}
                    onChange={(e) => setTime(e.target.value)}
                    className="w-full bg-[var(--bg-subtle)] border border-[var(--border)] rounded-card px-4 py-2.5 text-xs sm:text-sm text-[var(--fg)] focus:outline-none focus:border-[var(--fg)] transition-colors"
                  />
                </div>
              </div>
            </section>

            {/* Dynamics & Privacy */}
            <section className="bg-white rounded-card border border-[var(--border)] p-6 sm:p-8 space-y-6">
              <div className="flex items-center gap-2 pb-3 border-b border-[var(--border)]">
                <Users size={18} className="text-[var(--accent)]" />
                <h2 className="text-base font-serif text-[var(--fg)]">Player Capacity & Privacy</h2>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 items-center">
                <div className="space-y-2">
                  <div className="flex justify-between items-center text-xs font-mono">
                    <span className="text-[var(--fg-muted)] uppercase">Maximum Players</span>
                    <span className="text-[var(--fg)] font-medium">{maxPlayers} Spots</span>
                  </div>
                  <input
                    type="range"
                    min="2"
                    max="16"
                    value={maxPlayers}
                    onChange={(e) => setMaxPlayers(parseInt(e.target.value))}
                    className="w-full accent-[var(--accent)] h-1.5 bg-[var(--bg-subtle)] rounded-lg appearance-none cursor-pointer"
                  />
                </div>

                <div className="p-4 bg-[var(--bg-subtle)] rounded-card border border-[var(--border)] flex items-center justify-between">
                  <div className="flex items-center gap-2.5">
                    <Lock size={16} className="text-[var(--accent)]" />
                    <div>
                      <p className="text-xs font-medium text-[var(--fg)]">Private Match</p>
                      <p className="text-[10px] text-[var(--fg-muted)]">Invite-only participation</p>
                    </div>
                  </div>
                  <button
                    type="button"
                    onClick={() => setIsPrivate(!isPrivate)}
                    className={`w-10 h-5 rounded-full relative transition-colors ${
                      isPrivate ? 'bg-[var(--accent)]' : 'bg-gray-300'
                    }`}
                  >
                    <span
                      className={`w-4 h-4 rounded-full bg-white absolute top-0.5 transition-transform ${
                        isPrivate ? 'right-0.5' : 'left-0.5'
                      }`}
                    />
                  </button>
                </div>
              </div>
            </section>

            {/* Rules */}
            <section className="bg-white rounded-card border border-[var(--border)] p-6 sm:p-8 space-y-4">
              <label className="block text-xs font-mono uppercase tracking-wider text-[var(--fg-muted)]">
                Court Etiquette & Rules
              </label>
              <textarea
                rows="3"
                value={houseRules}
                onChange={(e) => setHouseRules(e.target.value)}
                placeholder="Specify ball requirements, attire, or match format (e.g. Best of 3 sets, advantage scoring)..."
                className="w-full bg-[var(--bg-subtle)] border border-[var(--border)] rounded-card p-4 text-xs sm:text-sm text-[var(--fg)] placeholder:text-[var(--fg-muted)]/50 focus:outline-none focus:border-[var(--fg)] transition-colors resize-none"
              />
            </section>
          </div>

          {/* Sticky Summary Card */}
          <aside className="lg:col-span-4 bg-white rounded-card border border-[var(--border)] p-6 space-y-6 sticky top-24">
            <div>
              <span className="text-xs font-mono uppercase tracking-wider text-[var(--accent)] block mb-1">
                Match Draft
              </span>
              <h3 className="text-lg font-serif text-[var(--fg)]">{sport}</h3>
              <p className="text-xs text-[var(--fg-muted)]">
                {level} Division • {isPrivate ? 'Private' : 'Open'}
              </p>
            </div>

            <div className="space-y-2.5 text-xs font-mono border-y border-[var(--border)] py-4">
              <div className="flex justify-between">
                <span className="text-[var(--fg-muted)]">Date</span>
                <span className="text-[var(--fg)]">{date || 'TBD'}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-[var(--fg-muted)]">Time</span>
                <span className="text-[var(--fg)]">{time || 'TBD'}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-[var(--fg-muted)]">Spots</span>
                <span className="text-[var(--fg)]">{maxPlayers} Players</span>
              </div>
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full py-3 rounded-card bg-[var(--accent)] text-white text-xs font-mono uppercase tracking-wider hover:bg-[#145339] transition-colors disabled:opacity-50"
            >
              {isSubmitting ? 'Publishing...' : 'Publish Match'}
            </button>
          </aside>
        </form>
      </main>
    </div>
  );
}
