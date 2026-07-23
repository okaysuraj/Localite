import React, { useState, useEffect } from 'react';
import { Trophy, Medal, ChevronDown, User } from 'lucide-react';
import Navbar from '../../components/Navbar';
import gsap from 'gsap';
import { getLeaderboard } from '../../services/api';

const LeaderboardPage = () => {
  const [sport, setSport] = useState('Tennis');
  const [leaderboard, setLeaderboard] = useState([]);
  const [loading, setLoading] = useState(true);

  const sports = ['Tennis', 'Basketball', 'Soccer', 'Golf', 'Volleyball', 'Pickleball'];

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
    }
    setLoading(false);
  };

  useEffect(() => {
    if (!loading && leaderboard.length > 0) {
      gsap.fromTo('.leaderboard-row', 
        { opacity: 0, y: 20 }, 
        { opacity: 1, y: 0, duration: 0.4, stagger: 0.1, ease: 'power2.out' }
      );
    }
  }, [loading, leaderboard]);

  return (
    <div className="min-h-screen bg-background text-on-background flex flex-col">
      <Navbar />
      
      <main className="flex-1 max-w-4xl w-full mx-auto p-6 md:p-12 mt-20">
        
        <header className="mb-12 text-center">
          <h1 className="font-display text-4xl md:text-5xl text-white tracking-tight uppercase mb-4 flex items-center justify-center gap-4">
            <Trophy className="text-lime-vibe" size={40} />
            Hall of Fame
          </h1>
          <p className="font-body-lg text-text-muted">The top ranked localites in your area.</p>
        </header>

        <div className="flex justify-center mb-10">
          <div className="relative">
            <select 
              value={sport}
              onChange={(e) => setSport(e.target.value)}
              className="appearance-none bg-surface-container-low border border-surface-variant/30 text-white font-label-mono uppercase tracking-widest px-6 py-3 pr-12 rounded-full focus:outline-none focus:border-lime-vibe transition-colors cursor-pointer"
            >
              {sports.map(s => <option key={s} value={s}>{s}</option>)}
            </select>
            <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 text-lime-vibe pointer-events-none" size={16} />
          </div>
        </div>

        <div className="bg-surface-dark border border-surface-variant/20 rounded-2xl overflow-hidden shadow-2xl">
          <div className="grid grid-cols-12 gap-4 p-4 border-b border-surface-variant/20 bg-surface-container/50 font-label-mono text-xs uppercase tracking-widest text-text-muted">
            <div className="col-span-2 text-center">Rank</div>
            <div className="col-span-5">Localite</div>
            <div className="col-span-2 text-center">Skill</div>
            <div className="col-span-1 text-center">W-L</div>
            <div className="col-span-2 text-right pr-4">Points</div>
          </div>

          <div className="divide-y divide-surface-variant/10">
            {loading ? (
               <div className="p-10 text-center text-text-muted font-label-mono uppercase tracking-widest animate-pulse">Calculating rankings...</div>
            ) : leaderboard.length === 0 ? (
               <div className="p-10 text-center text-text-muted font-label-mono uppercase tracking-widest">No ranked players for this sport yet.</div>
            ) : (
              leaderboard.map((player, index) => (
                <div key={player.id} className="leaderboard-row grid grid-cols-12 gap-4 p-4 items-center hover:bg-surface-variant/10 transition-colors">
                  <div className="col-span-2 flex justify-center">
                    {index === 0 ? <Medal className="text-yellow-400" size={28} /> : 
                     index === 1 ? <Medal className="text-gray-300" size={24} /> : 
                     index === 2 ? <Medal className="text-amber-600" size={24} /> : 
                     <span className="font-headline-sm text-surface-variant/80 text-xl">{index + 1}</span>}
                  </div>
                  
                  <div className="col-span-5 flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-surface-variant/30 flex items-center justify-center overflow-hidden border border-surface-variant/50">
                      {player.profilePhotoUrl ? (
                        <img src={player.profilePhotoUrl} alt={player.username} className="w-full h-full object-cover" />
                      ) : (
                        <User className="text-text-muted" size={16} />
                      )}
                    </div>
                    <div>
                      <h3 className="font-headline-sm text-white">{player.username}</h3>
                    </div>
                  </div>
                  
                  <div className="col-span-2 text-center">
                    <span className="inline-block px-2 py-1 bg-surface-container border border-surface-variant/30 rounded text-[10px] font-label-mono text-lime-vibe uppercase tracking-wider">
                      {player.skillLevel}
                    </span>
                  </div>
                  
                  <div className="col-span-1 text-center font-body-sm text-text-muted">
                    {player.wins}-{player.losses}
                  </div>
                  
                  <div className="col-span-2 text-right pr-4">
                    <span className="font-headline-md text-lime-vibe glow-neon-text">{player.points}</span>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </main>
    </div>
  );
};

export default LeaderboardPage;
