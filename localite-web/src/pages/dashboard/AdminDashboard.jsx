import React, { useState, useEffect } from 'react';
import { BarChart, Users, AlertTriangle, ShieldBan, Trash2 } from 'lucide-react';

export default function AdminDashboard() {
  const [analytics, setAnalytics] = useState({ totalUsers: 0, totalEvents: 0, pendingReports: 0 });
  const [reports, setReports] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const token = localStorage.getItem('token');
      const headers = { 'Authorization': `Bearer ${token}` };

      const [analyticsRes, reportsRes] = await Promise.all([
        fetch(`${import.meta.env.VITE_API_URL}/admin/analytics`, { headers }),
        fetch(`${import.meta.env.VITE_API_URL}/admin/reports`, { headers })
      ]);

      if (analyticsRes.ok) setAnalytics(await analyticsRes.json());
      if (reportsRes.ok) setReports(await reportsRes.json());
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleBanUser = async (userId) => {
    if (window.confirm("Are you sure you want to ban this user?")) {
      try {
        const token = localStorage.getItem('token');
        const res = await fetch(`${import.meta.env.VITE_API_URL}/admin/users/${userId}/ban`, {
          method: 'POST',
          headers: { 'Authorization': `Bearer ${token}` }
        });
        if (res.ok) {
          alert("User banned successfully.");
          fetchData(); // Refresh data
        }
      } catch (err) {
        console.error(err);
      }
    }
  };

  if (loading) {
    return <div className="min-h-screen bg-background text-white p-8 pt-24 text-center">Loading Admin Dashboard...</div>;
  }

  return (
    <div className="min-h-screen bg-background text-white p-8 pt-24">
      <div className="max-w-6xl mx-auto">
        <h1 className="font-headline-lg text-4xl uppercase tracking-tighter mb-8 glow-neon inline-block">Command Center</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <div className="bg-surface-dark border border-lime-vibe/30 p-6 rounded-2xl flex items-center justify-between">
            <div>
              <p className="font-label-mono text-text-muted text-xs uppercase tracking-widest mb-1">Total Users</p>
              <h2 className="font-headline-lg text-4xl text-lime-vibe">{analytics.totalUsers}</h2>
            </div>
            <Users size={48} className="text-lime-vibe/50" />
          </div>
          
          <div className="bg-surface-dark border border-lime-vibe/30 p-6 rounded-2xl flex items-center justify-between">
            <div>
              <p className="font-label-mono text-text-muted text-xs uppercase tracking-widest mb-1">Total Events</p>
              <h2 className="font-headline-lg text-4xl text-lime-vibe">{analytics.totalEvents}</h2>
            </div>
            <BarChart size={48} className="text-lime-vibe/50" />
          </div>

          <div className="bg-surface-dark border border-red-500/50 p-6 rounded-2xl flex items-center justify-between">
            <div>
              <p className="font-label-mono text-text-muted text-xs uppercase tracking-widest mb-1">Pending Reports</p>
              <h2 className="font-headline-lg text-4xl text-red-500">{analytics.pendingReports}</h2>
            </div>
            <AlertTriangle size={48} className="text-red-500/50" />
          </div>
        </div>

        <h2 className="font-headline-md text-2xl uppercase tracking-tighter mb-6 flex items-center gap-3">
          <ShieldBan size={24} className="text-lime-vibe" /> Moderation Queue
        </h2>

        <div className="bg-surface-dark border border-surface-variant/50 rounded-2xl overflow-hidden">
          {reports.length === 0 ? (
            <div className="p-8 text-center text-text-muted font-label-mono uppercase tracking-widest">
              Queue is clean. No pending reports.
            </div>
          ) : (
            <table className="w-full text-left text-sm text-text-muted font-body-sm">
              <thead className="text-xs uppercase bg-surface-container font-label-mono tracking-widest">
                <tr>
                  <th className="px-6 py-4">Report ID</th>
                  <th className="px-6 py-4">Type</th>
                  <th className="px-6 py-4">Target ID</th>
                  <th className="px-6 py-4">Reason</th>
                  <th className="px-6 py-4">Action</th>
                </tr>
              </thead>
              <tbody>
                {reports.map((r) => (
                  <tr key={r.id} className="border-b border-surface-variant/30 hover:bg-surface-container/50">
                    <td className="px-6 py-4 font-mono">{r.id}</td>
                    <td className="px-6 py-4 font-bold text-white">{r.targetType}</td>
                    <td className="px-6 py-4 font-mono">{r.targetId}</td>
                    <td className="px-6 py-4">{r.reason}</td>
                    <td className="px-6 py-4">
                      {r.targetType === 'USER' && (
                        <button 
                          onClick={() => handleBanUser(r.targetId)}
                          className="px-4 py-2 bg-red-500/10 text-red-500 border border-red-500 hover:bg-red-500 hover:text-white transition-colors rounded-DEFAULT font-label-mono uppercase text-[10px] tracking-widest flex items-center gap-2"
                        >
                          <Trash2 size={12} /> Ban User
                        </button>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </div>
  );
}
