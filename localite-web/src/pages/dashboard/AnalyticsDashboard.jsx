import React, { useState, useEffect } from 'react';
import {
  CalendarBlank,
  Users,
  Star,
  TrendUp,
  ChartLineUp,
} from '@phosphor-icons/react';
import {
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  AreaChart,
  Area,
} from 'recharts';
import { getUserAnalytics } from '../../services/api';

const AnalyticsDashboard = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchAnalytics();
  }, []);

  const fetchAnalytics = async () => {
    try {
      const res = await getUserAnalytics();
      if (res) {
        setData(res);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-bg flex items-center justify-center">
        <div className="flex flex-col items-center gap-2 text-xs font-mono text-fg-muted uppercase tracking-wider">
          <div className="w-5 h-5 border-2 border-accent border-t-transparent rounded-full animate-spin" />
          Loading analytics...
        </div>
      </div>
    );
  }

  if (!data) {
    return (
      <div className="min-h-screen bg-bg flex items-center justify-center text-fg-muted font-mono text-xs uppercase tracking-wider">
        No analytics data available yet.
      </div>
    );
  }

  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white border border-border p-2.5 rounded-card shadow-md">
          <p className="text-fg-muted font-mono text-[10px] uppercase tracking-wider mb-1">
            {label}
          </p>
          <p className="text-fg font-display font-semibold text-base">
            {payload[0].value}{' '}
            <span className="text-fg-muted text-xs font-normal">Attendees</span>
          </p>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="min-h-screen bg-bg py-10 px-6">
      <div className="max-w-content mx-auto space-y-8">
        {/* Header */}
        <div className="pb-6 border-b border-border">
          <h1 className="text-3xl font-display font-semibold text-fg tracking-tight">
            Performance Analytics
          </h1>
          <p className="text-sm text-fg-muted mt-1">
            Track your attendee engagement, gathering ratings, and historical performance.
          </p>
        </div>

        {/* Top Metrics Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="bg-white border border-border rounded-card p-5 space-y-2">
            <div className="flex justify-between items-center text-xs font-mono text-fg-muted">
              <span>Total Hosted</span>
              <CalendarBlank size={16} className="text-accent" />
            </div>
            <p className="text-3xl font-display font-semibold text-fg">
              {data.totalEventsHosted}
            </p>
          </div>

          <div className="bg-white border border-border rounded-card p-5 space-y-2">
            <div className="flex justify-between items-center text-xs font-mono text-fg-muted">
              <span>Total Attendees</span>
              <Users size={16} className="text-accent" />
            </div>
            <p className="text-3xl font-display font-semibold text-fg">
              {data.totalAttendees}
            </p>
          </div>

          <div className="bg-white border border-border rounded-card p-5 space-y-2">
            <div className="flex justify-between items-center text-xs font-mono text-fg-muted">
              <span>Avg Rating</span>
              <Star size={16} className="text-accent fill-accent" />
            </div>
            <p className="text-3xl font-display font-semibold text-fg">
              {data.averageRating ? data.averageRating.toFixed(1) : '0.0'}
            </p>
          </div>

          <div className="bg-white border border-border rounded-card p-5 space-y-2">
            <div className="flex justify-between items-center text-xs font-mono text-fg-muted">
              <span>Upcoming</span>
              <TrendUp size={16} className="text-accent" />
            </div>
            <p className="text-3xl font-display font-semibold text-fg">
              {data.upcomingEventsCount}
            </p>
          </div>
        </div>

        {/* Charts & Breakdown */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Main Chart Column (8 cols) */}
          <div className="lg:col-span-8 bg-white border border-border rounded-card p-6 sm:p-8 space-y-6">
            <div className="flex justify-between items-center">
              <div>
                <h3 className="font-display font-semibold text-base text-fg tracking-tight">
                  Attendee Growth Trajectory
                </h3>
                <p className="text-xs text-fg-muted mt-0.5">
                  Monthly attendance across your events
                </p>
              </div>
              <span className="text-xs font-mono text-accent bg-accent-subtle px-2.5 py-1 rounded-full border border-accent/20">
                Live Data
              </span>
            </div>

            <div className="h-[280px] w-full pt-2">
              {data.performanceData && data.performanceData.length > 0 ? (
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart
                    data={data.performanceData}
                    margin={{ top: 10, right: 10, left: -20, bottom: 0 }}
                  >
                    <defs>
                      <linearGradient
                        id="colorAttendees"
                        x1="0"
                        y1="0"
                        x2="0"
                        y2="1"
                      >
                        <stop
                          offset="5%"
                          stopColor="#1A6B4A"
                          stopOpacity={0.2}
                        />
                        <stop
                          offset="95%"
                          stopColor="#1A6B4A"
                          stopOpacity={0}
                        />
                      </linearGradient>
                    </defs>
                    <XAxis
                      dataKey="label"
                      stroke="#9ca3af"
                      tick={{ fill: '#6b7280', fontSize: 11, fontFamily: 'monospace' }}
                      tickLine={false}
                      axisLine={false}
                    />
                    <YAxis
                      stroke="#9ca3af"
                      tick={{ fill: '#6b7280', fontSize: 11, fontFamily: 'monospace' }}
                      tickLine={false}
                      axisLine={false}
                    />
                    <CartesianGrid
                      strokeDasharray="3 3"
                      stroke="#f3f4f6"
                      vertical={false}
                    />
                    <Tooltip content={<CustomTooltip />} />
                    <Area
                      type="monotone"
                      dataKey="attendees"
                      stroke="#1A6B4A"
                      strokeWidth={2}
                      fillOpacity={1}
                      fill="url(#colorAttendees)"
                    />
                  </AreaChart>
                </ResponsiveContainer>
              ) : (
                <div className="h-full flex items-center justify-center text-fg-muted font-mono text-xs">
                  Not enough historical data to chart yet.
                </div>
              )}
            </div>
          </div>

          {/* Side Column: Recent Events (4 cols) */}
          <div className="lg:col-span-4 bg-white border border-border rounded-card p-6 space-y-4">
            <h3 className="font-display font-semibold text-base text-fg tracking-tight">
              Recent Gatherings
            </h3>

            <div className="space-y-3 max-h-[300px] overflow-y-auto pr-1 divide-y divide-border/60">
              {data.recentEvents && data.recentEvents.length > 0 ? (
                data.recentEvents.map((event, idx) => (
                  <div key={idx} className="pt-3 first:pt-0 space-y-1">
                    <p className="font-display font-medium text-sm text-fg truncate">
                      {event.title}
                    </p>
                    <p className="font-mono text-[10px] text-fg-muted uppercase">
                      {event.date}
                    </p>

                    <div className="flex justify-between items-center text-xs font-mono text-fg-muted pt-1">
                      <span className="inline-flex items-center gap-1">
                        <Users size={12} className="text-accent" />
                        {event.attendees} attendees
                      </span>
                      <span className="inline-flex items-center gap-1">
                        <Star size={12} className="text-accent fill-accent" />
                        {event.rating ? event.rating.toFixed(1) : '5.0'}
                      </span>
                    </div>
                  </div>
                ))
              ) : (
                <p className="text-fg-muted font-mono text-xs text-center py-8">
                  No past gatherings recorded.
                </p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AnalyticsDashboard;
