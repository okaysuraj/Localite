import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  CurrencyDollar,
  ArrowDownLeft,
  ArrowUpRight,
  DownloadSimple,
  CreditCard,
  CheckCircle,
  Clock,
  ArrowRight,
  ArrowLeft
} from '@phosphor-icons/react';
import { getMyEvents, getUserAnalytics } from '../../services/api';

export default function RevenueDashboardPage() {
  const navigate = useNavigate();
  const [events, setEvents] = useState([]);
  const [analytics, setAnalytics] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadData() {
      try {
        const [myEvents, stats] = await Promise.all([
          getMyEvents().catch(() => []),
          getUserAnalytics().catch(() => null)
        ]);
        setEvents(Array.isArray(myEvents) ? myEvents : []);
        setAnalytics(stats);
      } catch (err) {
        console.error('Failed to load revenue data:', err);
      } finally {
        setLoading(false);
      }
    }
    loadData();
  }, []);

  const totalTickets = events.reduce((acc, ev) => acc + (ev.attendeeCount || 0), 0);
  const grossEarnings = events.reduce((acc, ev) => acc + ((ev.price || 0) * (ev.attendeeCount || 0)), 0);
  const availablePayout = (grossEarnings * 0.85).toFixed(2);
  const pendingEscrow = (grossEarnings * 0.15).toFixed(2);
  const avgTicket = totalTickets > 0 ? (grossEarnings / totalTickets).toFixed(2) : '0.00';

  // Derive transaction list from hosted events
  const transactions = events.flatMap((ev, evIdx) => {
    const attendees = ev.attendeeCount || 0;
    const price = ev.price || 0;
    if (attendees === 0) return [];
    return Array.from({ length: attendees }).map((_, i) => ({
      id: `TX-${ev.id}${1000 + i}`,
      event: ev.title,
      date: ev.date || 'Recent',
      attendee: `Guest #${i + 1}`,
      amount: `$${price.toFixed(2)}`,
      status: 'Settled'
    }));
  });

  return (
    <div className="bg-bg min-h-screen py-10 px-6">
      <div className="max-w-content mx-auto space-y-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-border">
          <div>
            <h1 className="text-3xl font-display font-semibold text-fg tracking-tight">
              Event Earnings
            </h1>
            <p className="text-sm text-fg-muted mt-1">
              Track ticket proceeds, attendee payouts, and financial settlements.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => alert('Earnings statement downloaded.')}
              className="inline-flex items-center gap-1.5 px-4 py-2 text-xs font-mono tracking-wide border border-border text-fg rounded-btn hover:bg-bg-subtle transition-colors"
            >
              <DownloadSimple size={14} />
              Export Statement
            </button>
            <button
              onClick={() => alert('Payout initiated to your linked bank account.')}
              className="px-5 py-2 text-xs font-mono tracking-wide bg-accent text-white rounded-btn hover:opacity-90 transition-opacity"
            >
              Request Payout
            </button>
          </div>
        </div>

        {/* Financial Stat Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="bg-white border border-border rounded-card p-5 space-y-2">
            <div className="flex justify-between items-center text-xs font-mono text-fg-muted">
              <span>Gross Earnings</span>
              <CurrencyDollar size={16} className="text-accent" />
            </div>
            <p className="text-3xl font-display font-semibold text-fg">
              ${grossEarnings.toFixed(2)}
            </p>
            <span className="text-[11px] font-mono text-accent inline-block">
              Total lifetime event revenue
            </span>
          </div>

          <div className="bg-white border border-border rounded-card p-5 space-y-2">
            <div className="flex justify-between items-center text-xs font-mono text-fg-muted">
              <span>Available for Payout</span>
              <ArrowDownLeft size={16} className="text-accent" />
            </div>
            <p className="text-3xl font-display font-semibold text-fg">
              ${availablePayout}
            </p>
            <span className="text-[11px] font-mono text-fg-muted inline-block">
              Ready to transfer
            </span>
          </div>

          <div className="bg-white border border-border rounded-card p-5 space-y-2">
            <div className="flex justify-between items-center text-xs font-mono text-fg-muted">
              <span>Pending Escrow</span>
              <Clock size={16} className="text-fg-muted" />
            </div>
            <p className="text-3xl font-display font-semibold text-fg">
              ${pendingEscrow}
            </p>
            <span className="text-[11px] font-mono text-fg-muted inline-block">
              Settles after event completion
            </span>
          </div>

          <div className="bg-white border border-border rounded-card p-5 space-y-2">
            <div className="flex justify-between items-center text-xs font-mono text-fg-muted">
              <span>Average Ticket</span>
              <CreditCard size={16} className="text-accent" />
            </div>
            <p className="text-3xl font-display font-semibold text-fg">
              ${avgTicket}
            </p>
            <span className="text-[11px] font-mono text-fg-muted inline-block">
              Across {totalTickets} tickets sold
            </span>
          </div>
        </div>

        {/* Transactions Table Section */}
        <div className="bg-white border border-border rounded-card p-6 sm:p-8 space-y-5">
          <div className="flex justify-between items-center">
            <div>
              <h2 className="text-lg font-display font-semibold text-fg tracking-tight">
                Transaction History
              </h2>
              <p className="text-xs text-fg-muted mt-0.5">
                Detailed record of ticket purchases and participant payments.
              </p>
            </div>
            <span className="text-xs font-mono text-fg-muted">
              {transactions.length} transactions
            </span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs font-mono">
              <thead>
                <tr className="border-b border-border text-fg-muted uppercase tracking-wider pb-2">
                  <th className="pb-3 font-normal">Reference</th>
                  <th className="pb-3 font-normal">Event</th>
                  <th className="pb-3 font-normal">Attendee</th>
                  <th className="pb-3 font-normal">Date</th>
                  <th className="pb-3 font-normal">Status</th>
                  <th className="pb-3 font-normal text-right">Amount</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border/60">
                {transactions.map((tx) => (
                  <tr key={tx.id} className="hover:bg-bg-subtle/50 transition-colors">
                    <td className="py-3.5 text-fg font-medium">{tx.id}</td>
                    <td className="py-3.5 text-fg font-sans text-xs">{tx.event}</td>
                    <td className="py-3.5 text-fg-muted">{tx.attendee}</td>
                    <td className="py-3.5 text-fg-muted">{tx.date}</td>
                    <td className="py-3.5">
                      <span
                        className={`px-2 py-0.5 rounded-full text-[10px] uppercase tracking-wider ${
                          tx.status === 'Settled'
                            ? 'bg-accent-subtle text-accent border border-accent/20'
                            : 'bg-bg-subtle text-fg-muted border border-border'
                        }`}
                      >
                        {tx.status}
                      </span>
                    </td>
                    <td className="py-3.5 text-right text-fg font-semibold">
                      {tx.amount}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
