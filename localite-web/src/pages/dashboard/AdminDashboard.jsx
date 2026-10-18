import React, { useState, useEffect } from 'react';
import {
  Users,
  CalendarBlank,
  Warning,
  ShieldSlash,
  Prohibit,
} from '@phosphor-icons/react';
import { getAdminAnalytics, getAdminReports, banUser } from '../../services/api';

export default function AdminDashboard() {
  const [analytics, setAnalytics] = useState({
    totalUsers: 0,
    totalEvents: 0,
    pendingReports: 0,
  });
  const [reports, setReports] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const [stats, reportList] = await Promise.all([
        getAdminAnalytics(),
        getAdminReports(),
      ]);

      if (stats) setAnalytics(stats);
      if (Array.isArray(reportList)) setReports(reportList);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleBanUser = async (userId) => {
    if (window.confirm('Are you sure you want to suspend this user?')) {
      try {
        await banUser(userId);
        alert('User account has been suspended.');
        fetchData();
      } catch (err) {
        console.error(err);
      }
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-bg flex items-center justify-center">
        <div className="flex flex-col items-center gap-2 text-xs font-mono text-fg-muted uppercase tracking-wider">
          <div className="w-5 h-5 border-2 border-accent border-t-transparent rounded-full animate-spin" />
          Loading admin console...
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-bg py-10 px-6">
      <div className="max-w-content mx-auto space-y-8">
        {/* Header */}
        <div className="pb-6 border-b border-border">
          <h1 className="text-3xl font-display font-semibold text-fg tracking-tight">
            Platform Administration
          </h1>
          <p className="text-sm text-fg-muted mt-1">
            System overview, community statistics, and trust & safety moderation.
          </p>
        </div>

        {/* Top Metric Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="bg-white border border-border rounded-card p-5 space-y-2">
            <div className="flex justify-between items-center text-xs font-mono text-fg-muted">
              <span>Total Members</span>
              <Users size={16} className="text-accent" />
            </div>
            <p className="text-3xl font-display font-semibold text-fg">
              {analytics.totalUsers}
            </p>
          </div>

          <div className="bg-white border border-border rounded-card p-5 space-y-2">
            <div className="flex justify-between items-center text-xs font-mono text-fg-muted">
              <span>Total Gatherings</span>
              <CalendarBlank size={16} className="text-accent" />
            </div>
            <p className="text-3xl font-display font-semibold text-fg">
              {analytics.totalEvents}
            </p>
          </div>

          <div className="bg-white border border-border rounded-card p-5 space-y-2">
            <div className="flex justify-between items-center text-xs font-mono text-fg-muted">
              <span>Pending Reports</span>
              <Warning size={16} className="text-error" />
            </div>
            <p className="text-3xl font-display font-semibold text-error">
              {analytics.pendingReports}
            </p>
          </div>
        </div>

        {/* Moderation Queue */}
        <div className="bg-white border border-border rounded-card p-6 sm:p-8 space-y-5">
          <div className="flex items-center gap-2">
            <ShieldSlash size={18} className="text-fg-muted" />
            <h2 className="text-lg font-display font-semibold text-fg tracking-tight">
              Moderation & Safety Queue
            </h2>
          </div>

          {reports.length === 0 ? (
            <div className="p-12 text-center text-fg-muted font-mono text-xs">
              Queue is clear. No active member reports.
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs font-mono">
                <thead>
                  <tr className="border-b border-border text-fg-muted uppercase tracking-wider pb-2">
                    <th className="pb-3 font-normal">Report ID</th>
                    <th className="pb-3 font-normal">Entity Type</th>
                    <th className="pb-3 font-normal">Target Reference</th>
                    <th className="pb-3 font-normal">Report Reason</th>
                    <th className="pb-3 font-normal text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border/60">
                  {reports.map((r) => (
                    <tr key={r.id} className="hover:bg-bg-subtle/50 transition-colors">
                      <td className="py-3.5 text-fg-muted">{r.id}</td>
                      <td className="py-3.5 text-fg font-medium">{r.targetType}</td>
                      <td className="py-3.5 text-fg-muted">{r.targetId}</td>
                      <td className="py-3.5 text-fg font-sans">{r.reason}</td>
                      <td className="py-3.5 text-right">
                        {r.targetType === 'USER' && (
                          <button
                            onClick={() => handleBanUser(r.targetId)}
                            className="inline-flex items-center gap-1 px-3 py-1.5 bg-error-subtle text-error border border-error/20 rounded-btn text-[11px] font-mono hover:bg-error hover:text-white transition-colors"
                          >
                            <Prohibit size={13} /> Suspend Member
                          </button>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
