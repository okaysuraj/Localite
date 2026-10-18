import React, { useState, useEffect } from 'react';
import { Trophy, Medal, User } from '@phosphor-icons/react';
import { getLeaderboard } from '../../services/api';

const LeaderboardPage = () => {
  const [sport, setSport] = useState('Badminton');
  const [leaderboard, setLeaderboard] = useState([]);
  const [loading, setLoading] = useState(true);

  const sports = [
    'Badminton',
    'Football',
    'Tennis',
    'Cricket',
    'Basketball',
    'Running',
  ];

  useEffect(() => {
    fetchLeaderboardData();
  }, [sport]);

  const fetchLeaderboardData = async () => {
    setLoading(true);
    try {
      const data = await getLeaderboard(sport);
      setLeaderboard(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-bg min-h-screen py-10 px-6">
      <div className="max-w-4xl mx-auto space-y-8">
        {/* Header */}
        <div className="text-center space-y-2 pb-6 border-b border-border">
          <span className="text-xs font-mono text-accent uppercase tracking-wider block">
            Competitive Rankings
          </span>
          <h1 className="text-3xl sm:text-4xl font-display font-semibold text-fg tracking-tight flex items-center justify-center gap-3">
            <Trophy size={32} className="text-accent" />
            Sports Leaderboard
          </h1>
          <p className="text-sm text-fg-muted max-w-md mx-auto">
            Top community players ranked by match results, attendance, and fair play.
          </p>
        </div>

        {/* Sport selection pill tabs */}
        <div className="flex flex-wrap justify-center gap-2">
          {sports.map((s) => (
            <button
              key={s}
              onClick={() => setSport(s)}
              className={`px-4 py-2 rounded-btn text-xs font-mono tracking-wide transition-colors ${
                sport === s
                  ? 'bg-accent text-white font-medium'
                  : 'bg-white border border-border text-fg-muted hover:text-fg hover:bg-bg-subtle'
              }`}
            >
              {s}
            </button>
          ))}
        </div>

        {/* Table Container */}
        <div className="bg-white border border-border rounded-card overflow-hidden shadow-xs">
          {/* Header Row */}
          <div className="grid grid-cols-12 gap-3 p-4 border-b border-border bg-bg-subtle/50 text-[11px] font-mono uppercase tracking-wider text-fg-muted">
            <div className="col-span-2 text-center">Rank</div>
            <div className="col-span-5">Player</div>
            <div className="col-span-2 text-center">Skill</div>
            <div className="col-span-1 text-center">W-L</div>
            <div className="col-span-2 text-right pr-2">Rating</div>
          </div>

          <div className="divide-y divide-border/60">
            {loading ? (
              <div className="p-12 text-center text-xs font-mono text-fg-muted">
                Updating sports rankings...
              </div>
            ) : leaderboard.length === 0 ? (
              <div className="p-12 text-center text-xs font-mono text-fg-muted">
                No match records for {sport} yet. Be the first to record a match!
              </div>
            ) : (
              leaderboard.map((player, index) => (
                <div
                  key={player.id || index}
                  className="grid grid-cols-12 gap-3 p-4 items-center hover:bg-bg-subtle/40 transition-colors text-xs font-mono"
                >
                  <div className="col-span-2 flex justify-center">
                    {index === 0 ? (
                      <span className="w-7 h-7 rounded-full bg-amber-100 text-amber-800 flex items-center justify-center font-bold">
                        1
                      </span>
                    ) : index === 1 ? (
                      <span className="w-7 h-7 rounded-full bg-slate-100 text-slate-700 flex items-center justify-center font-bold">
                        2
                      </span>
                    ) : index === 2 ? (
                      <span className="w-7 h-7 rounded-full bg-orange-100 text-orange-800 flex items-center justify-center font-bold">
                        3
                      </span>
                    ) : (
                      <span className="text-fg-muted font-mono">{index + 1}</span>
                    )}
                  </div>

                  <div className="col-span-5 flex items-center gap-3 min-w-0">
                    <div className="w-9 h-9 rounded-full bg-bg-subtle border border-border flex items-center justify-center overflow-hidden shrink-0">
                      {player.profilePhotoUrl ? (
                        <img
                          src={player.profilePhotoUrl}
                          alt={player.username}
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <User size={16} className="text-fg-muted" />
                      )}
                    </div>
                    <span className="font-display font-medium text-sm text-fg truncate">
                      {player.username}
                    </span>
                  </div>

                  <div className="col-span-2 text-center">
                    <span className="px-2 py-0.5 bg-bg-subtle border border-border/80 rounded-full text-[10px] text-fg-muted">
                      {player.skillLevel || 'All'}
                    </span>
                  </div>

                  <div className="col-span-1 text-center text-fg-muted">
                    {player.wins || 0}-{player.losses || 0}
                  </div>

                  <div className="col-span-2 text-right pr-2 font-display font-semibold text-accent text-sm">
                    {player.points || 1200}
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default LeaderboardPage;
