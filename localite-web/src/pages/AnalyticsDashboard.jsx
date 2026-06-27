import React, { useState, useEffect } from 'react';
import { Activity, Users, Star, Calendar, TrendingUp } from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, AreaChart, Area } from 'recharts';
import gsap from 'gsap';

const AnalyticsDashboard = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchAnalytics();
  }, []);

  useEffect(() => {
    if (!loading && data) {
      gsap.fromTo('.analytics-anim', 
        { opacity: 0, y: 20 }, 
        { opacity: 1, y: 0, duration: 0.6, stagger: 0.1, ease: 'power3.out' }
      );
    }
  }, [loading, data]);

  const fetchAnalytics = async () => {
    try {
      const token = localStorage.getItem('token');
      const res = await fetch(import.meta.env.VITE_API_URL + '/users/me/analytics', {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      if (res.ok) {
        setData(await res.json());
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <div className="min-h-screen bg-background flex items-center justify-center text-lime-vibe font-label-mono uppercase tracking-widest">Compiling Analytics...</div>;
  }

  if (!data) {
    return <div className="min-h-screen bg-background flex items-center justify-center text-text-muted font-label-mono uppercase tracking-widest">No data available</div>;
  }

  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-surface-dark border border-lime-vibe/30 p-3 rounded-lg shadow-lg">
          <p className="text-lime-vibe font-label-mono text-xs mb-1">{label}</p>
          <p className="text-white font-headline-md">{payload[0].value} <span className="text-text-muted text-sm font-normal">Attendees</span></p>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="min-h-screen bg-background pt-32 pb-section-gap px-margin-mobile md:px-margin-desktop max-w-container-max mx-auto">
      <div className="analytics-anim mb-12">
        <h2 className="font-display-md text-display-md text-on-surface uppercase tracking-tight mb-2 flex items-center gap-3">
          <Activity className="text-lime-vibe" size={40} />
          Host <span className="text-lime-vibe">Analytics</span>
        </h2>
        <p className="font-body-lg text-body-lg text-text-muted">
          Track your operational impact and community engagement.
        </p>
      </div>

      {/* Top Metrics Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
        <div className="analytics-anim bg-surface-container-low border border-surface-variant/20 rounded-2xl p-6 relative overflow-hidden group hover:border-lime-vibe/50 transition-colors">
          <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
            <Calendar size={64} className="text-lime-vibe" />
          </div>
          <p className="font-label-mono text-text-muted uppercase tracking-widest text-xs mb-2">Total Events</p>
          <p className="font-display-md text-white text-5xl">{data.totalEventsHosted}</p>
        </div>
        
        <div className="analytics-anim bg-surface-container-low border border-surface-variant/20 rounded-2xl p-6 relative overflow-hidden group hover:border-lime-vibe/50 transition-colors">
          <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
            <Users size={64} className="text-lime-vibe" />
          </div>
          <p className="font-label-mono text-text-muted uppercase tracking-widest text-xs mb-2">Total Attendees</p>
          <p className="font-display-md text-white text-5xl">{data.totalAttendees}</p>
        </div>

        <div className="analytics-anim bg-surface-container-low border border-surface-variant/20 rounded-2xl p-6 relative overflow-hidden group hover:border-lime-vibe/50 transition-colors">
          <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
            <Star size={64} className="text-lime-vibe" />
          </div>
          <p className="font-label-mono text-text-muted uppercase tracking-widest text-xs mb-2">Avg Rating</p>
          <p className="font-display-md text-white text-5xl">{data.averageRating.toFixed(1)}</p>
        </div>

        <div className="analytics-anim bg-surface-container-low border border-surface-variant/20 rounded-2xl p-6 relative overflow-hidden group hover:border-lime-vibe/50 transition-colors">
          <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
            <TrendingUp size={64} className="text-lime-vibe" />
          </div>
          <p className="font-label-mono text-text-muted uppercase tracking-widest text-xs mb-2">Upcoming</p>
          <p className="font-display-md text-white text-5xl">{data.upcomingEventsCount}</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Chart Section */}
        <div className="analytics-anim lg:col-span-2 bg-surface-container-low border border-surface-variant/20 rounded-2xl p-8">
          <h3 className="font-label-mono text-lime-vibe uppercase tracking-widest text-sm mb-8 flex items-center gap-2">
            <TrendingUp size={16} /> Engagement Trajectory
          </h3>
          
          <div className="h-[300px] w-full">
            {data.performanceData && data.performanceData.length > 0 ? (
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={data.performanceData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                  <defs>
                    <linearGradient id="colorAttendees" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#ccff00" stopOpacity={0.3}/>
                      <stop offset="95%" stopColor="#ccff00" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <XAxis dataKey="label" stroke="#475569" tick={{fill: '#94a3b8', fontSize: 12, fontFamily: 'monospace'}} tickLine={false} axisLine={false} />
                  <YAxis stroke="#475569" tick={{fill: '#94a3b8', fontSize: 12, fontFamily: 'monospace'}} tickLine={false} axisLine={false} />
                  <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" vertical={false} />
                  <Tooltip content={<CustomTooltip />} />
                  <Area type="monotone" dataKey="attendees" stroke="#ccff00" strokeWidth={3} fillOpacity={1} fill="url(#colorAttendees)" />
                </AreaChart>
              </ResponsiveContainer>
            ) : (
              <div className="h-full flex items-center justify-center text-text-muted font-label-mono uppercase tracking-widest text-xs">
                Not enough data to visualize
              </div>
            )}
          </div>
        </div>

        {/* Recent Events Section */}
        <div className="analytics-anim bg-surface-container-low border border-surface-variant/20 rounded-2xl p-8">
          <h3 className="font-label-mono text-lime-vibe uppercase tracking-widest text-sm mb-6 flex items-center gap-2">
            <Calendar size={16} /> Recent Operations
          </h3>
          
          <div className="space-y-4 max-h-[300px] overflow-y-auto custom-scrollbar pr-2">
            {data.recentEvents && data.recentEvents.length > 0 ? (
              data.recentEvents.map((event, idx) => (
                <div key={idx} className="bg-surface-dark border border-surface-variant/30 rounded-xl p-4 hover:border-lime-vibe/30 transition-colors">
                  <p className="font-headline-sm text-white line-clamp-1">{event.title}</p>
                  <p className="font-label-mono text-text-muted text-[10px] uppercase tracking-widest mb-3 mt-1">{event.date}</p>
                  
                  <div className="flex justify-between items-center border-t border-surface-variant/20 pt-3 mt-2">
                    <div className="flex items-center gap-1">
                      <Users size={12} className="text-lime-vibe" />
                      <span className="font-label-mono text-white text-xs">{event.attendees}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Star size={12} className="text-lime-vibe fill-lime-vibe" />
                      <span className="font-label-mono text-white text-xs">{event.rating.toFixed(1)}</span>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <p className="text-text-muted font-label-mono uppercase tracking-widest text-xs text-center py-10">No past events found</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AnalyticsDashboard;
