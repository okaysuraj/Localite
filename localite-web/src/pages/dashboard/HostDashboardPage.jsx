import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  CalendarBlank,
  Users,
  Plus,
  UserPlus,
  EnvelopeSimple,
  CheckCircle,
  Clock,
  ArrowRight,
} from '@phosphor-icons/react';
import { getUserAnalytics, getMyEvents } from '../../services/api';

export default function HostDashboardPage() {
  const navigate = useNavigate();
  const [analytics, setAnalytics] = useState(null);
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);

  const [tasks, setTasks] = useState([
    { id: 1, text: 'Confirm venue equipment for weekend match', due: '2 hours', done: false },
    { id: 2, text: 'Review RSVP requests for upcoming gathering', due: 'Today', done: false },
    { id: 3, text: 'Post updates in event discussion thread', due: 'Tomorrow', done: true },
  ]);

  useEffect(() => {
    async function loadData() {
      try {
        const [stats, myEvents] = await Promise.all([
          getUserAnalytics().catch(() => null),
          getMyEvents().catch(() => []),
        ]);
        setAnalytics(stats);
        setEvents(Array.isArray(myEvents) ? myEvents : []);
      } catch (err) {
        console.error('Failed to load host dashboard data:', err);
      } finally {
        setLoading(false);
      }
    }
    loadData();
  }, []);

  const toggleTask = (id) => {
    setTasks((prev) => prev.map((t) => (t.id === id ? { ...t, done: !t.done } : t)));
  };

  const activeEventsCount = events.length;
  const totalAttendees = events.reduce((acc, ev) => acc + (ev.attendeeCount || 0), 0);
  const eventsHosted = analytics?.eventsHosted || activeEventsCount;

  return (
    <div className="bg-bg min-h-screen py-10 px-6">
      <div className="max-w-content mx-auto space-y-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-border">
          <div>
            <h1 className="text-3xl font-display font-semibold text-fg tracking-tight">Host Dashboard</h1>
            <p className="text-sm text-fg-muted mt-1">
              Overview of your hosted gatherings, attendee metrics, and community engagement.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => navigate('/events')}
              className="px-4 py-2 text-xs font-mono tracking-wide border border-border text-fg rounded-btn hover:bg-bg-subtle transition-colors"
            >
              Browse Events
            </button>
            <button
              onClick={() => navigate('/events/create')}
              className="inline-flex items-center gap-1.5 px-4 py-2 text-xs font-mono tracking-wide bg-accent text-white rounded-btn hover:opacity-90 transition-opacity"
            >
              <Plus size={15} weight="bold" />
              Create Event
            </button>
          </div>
        </div>

        {/* Top Metric Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="bg-white border border-border rounded-card p-5 space-y-2">
            <div className="flex justify-between items-center text-xs font-mono text-fg-muted">
              <span>Active Events</span>
              <CalendarBlank size={16} className="text-accent" />
            </div>
            <div className="flex items-baseline justify-between">
              <span className="text-3xl font-display font-semibold text-fg">{activeEventsCount}</span>
              <span className="text-[11px] font-mono text-accent bg-accent-subtle px-2 py-0.5 rounded-full">
                Live on platform
              </span>
            </div>
          </div>

          <div className="bg-white border border-border rounded-card p-5 space-y-2">
            <div className="flex justify-between items-center text-xs font-mono text-fg-muted">
              <span>Total Attendees</span>
              <Users size={16} className="text-accent" />
            </div>
            <div className="flex items-baseline justify-between">
              <span className="text-3xl font-display font-semibold text-fg">{totalAttendees}</span>
              <span className="text-[11px] font-mono text-accent bg-accent-subtle px-2 py-0.5 rounded-full">
                Confirmed RSVPs
              </span>
            </div>
          </div>

          <div className="bg-white border border-border rounded-card p-5 space-y-2">
            <div className="flex justify-between items-center text-xs font-mono text-fg-muted">
              <span>Completed Events</span>
              <CheckCircle size={16} className="text-accent" />
            </div>
            <div className="flex items-baseline justify-between">
              <span className="text-3xl font-display font-semibold text-fg">{eventsHosted}</span>
              <span className="text-[11px] font-mono text-fg-muted">100% attendance rate</span>
            </div>
          </div>
        </div>

        {/* Main 2-Column Content */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Left Column (8 cols): Gatherings list */}
          <div className="lg:col-span-8 space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-display font-semibold text-fg tracking-tight">
                Upcoming & Active Gatherings
              </h2>
              <button
                onClick={() => navigate('/events')}
                className="text-xs font-mono text-accent hover:underline inline-flex items-center gap-1"
              >
                All events <ArrowRight size={12} />
              </button>
            </div>

            {loading ? (
              <div className="py-12 text-center text-xs font-mono text-fg-muted animate-pulse">
                Loading hosted gatherings...
              </div>
            ) : events.length === 0 ? (
              <div className="bg-white border border-border rounded-card p-8 text-center space-y-3">
                <p className="text-sm font-medium text-fg">No gatherings created yet</p>
                <p className="text-xs text-fg-muted">
                  Host your first gathering to activate attendance tracking and check-ins.
                </p>
                <button
                  onClick={() => navigate('/events/create')}
                  className="mt-2 inline-flex items-center gap-1.5 px-4 py-2 text-xs font-mono bg-accent text-white rounded-btn hover:opacity-90"
                >
                  <Plus size={14} /> Create Event
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {events.slice(0, 4).map((ev) => (
                  <div
                    key={ev.id}
                    onClick={() => navigate(`/events/${ev.id}`)}
                    className="bg-white border border-border rounded-card overflow-hidden hover:border-accent/50 transition-colors cursor-pointer group"
                  >
                    <div className="h-40 relative bg-bg-subtle">
                      <img
                        className="w-full h-full object-cover group-hover:scale-102 transition-transform duration-500"
                        src={
                          ev.imageUrl ||
                          'https://images.unsplash.com/photo-1511795409834-ef04bbd61622?auto=format&fit=crop&q=80&w=600'
                        }
                        alt={ev.title}
                      />
                      <span className="absolute top-3 left-3 bg-accent text-white px-2.5 py-0.5 rounded-full text-[10px] font-mono uppercase tracking-wider">
                        {ev.category || 'Gathering'}
                      </span>
                    </div>
                    <div className="p-4 space-y-2">
                      <h3 className="font-display font-semibold text-base text-fg group-hover:text-accent transition-colors truncate">
                        {ev.title}
                      </h3>
                      <div className="flex justify-between items-center text-xs font-mono text-fg-muted pt-2 border-t border-border">
                        <span>
                          {ev.attendeeCount || 0} / {ev.maxAttendees || 'Open'} Registered
                        </span>
                        <span className="text-accent font-medium">{ev.location || 'Local Venue'}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* Host tips banner */}
            <div className="bg-bg-subtle border border-border rounded-card p-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div className="space-y-1 max-w-lg">
                <h3 className="font-display font-semibold text-sm text-fg">Host Tip: Send Reminders Early</h3>
                <p className="text-xs text-fg-muted leading-relaxed">
                  Events with reminders posted 24 hours prior to start time average an 89% attendee turn-out
                  rate across the Localite network.
                </p>
              </div>
              <button
                onClick={() => navigate('/my-events')}
                className="px-4 py-2 text-xs font-mono bg-white border border-border rounded-btn text-fg hover:bg-bg transition-colors shrink-0"
              >
                Manage RSVPs
              </button>
            </div>
          </div>

          {/* Right Column (4 cols): Tasks and Activity */}
          <div className="lg:col-span-4 space-y-6">
            {/* Action Checklist */}
            <div className="bg-white border border-border rounded-card p-5 space-y-4">
              <div className="flex justify-between items-center">
                <h3 className="font-display font-semibold text-sm text-fg tracking-tight">Host Checklist</h3>
                <span className="text-[11px] font-mono text-fg-muted">
                  {tasks.filter((t) => !t.done).length} pending
                </span>
              </div>

              <div className="space-y-2.5">
                {tasks.map((task) => (
                  <div
                    key={task.id}
                    onClick={() => toggleTask(task.id)}
                    className="flex items-start gap-2.5 p-2.5 rounded-btn hover:bg-bg-subtle cursor-pointer transition-colors"
                  >
                    <input
                      type="checkbox"
                      checked={task.done}
                      onChange={() => {}}
                      className="mt-0.5 accent-accent"
                    />
                    <div className="flex-1 min-w-0">
                      <p
                        className={`text-xs leading-snug font-sans ${
                          task.done ? 'line-through text-fg-faint' : 'text-fg'
                        }`}
                      >
                        {task.text}
                      </p>
                      <span className="text-[10px] font-mono text-fg-muted flex items-center gap-1 mt-0.5">
                        <Clock size={11} /> {task.due}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Recent Activity */}
            <div className="bg-white border border-border rounded-card p-5 space-y-4">
              <h3 className="font-display font-semibold text-sm text-fg tracking-tight">Recent Activity</h3>

              <div className="space-y-3.5 divide-y divide-border/60">
                <div className="pt-2 first:pt-0 flex gap-3 items-start">
                  <div className="w-7 h-7 rounded-full bg-accent-subtle text-accent flex items-center justify-center shrink-0 mt-0.5">
                    <UserPlus size={14} />
                  </div>
                  <div className="text-xs space-y-0.5">
                    <p className="text-fg font-medium">New attendee RSVP</p>
                    <p className="text-fg-muted">Rohan joined Weekend Badminton</p>
                    <span className="text-[10px] font-mono text-fg-faint block">5m ago</span>
                  </div>
                </div>

                <div className="pt-3 flex gap-3 items-start">
                  <div className="w-7 h-7 rounded-full bg-bg-subtle text-fg-muted flex items-center justify-center shrink-0 mt-0.5">
                    <EnvelopeSimple size={14} />
                  </div>
                  <div className="text-xs space-y-0.5">
                    <p className="text-fg font-medium">New message in event thread</p>
                    <p className="text-fg-muted">Discussion active on Running Crew</p>
                    <span className="text-[10px] font-mono text-fg-faint block">25m ago</span>
                  </div>
                </div>

                <div className="pt-3 flex gap-3 items-start">
                  <div className="w-7 h-7 rounded-full bg-accent-subtle text-accent flex items-center justify-center shrink-0 mt-0.5">
                    <CheckCircle size={14} />
                  </div>
                  <div className="text-xs space-y-0.5">
                    <p className="text-fg font-medium">Event published</p>
                    <p className="text-fg-muted">Sunset Running Crew is now live</p>
                    <span className="text-[10px] font-mono text-fg-faint block">2h ago</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
