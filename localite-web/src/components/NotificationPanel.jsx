import React, { useState, useEffect } from 'react';
import { Bell, X, Check } from 'lucide-react';

const NotificationPanel = ({ isOpen, onClose }) => {
  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    if (isOpen) {
      fetchNotifications();
    }
  }, [isOpen]);

  const fetchNotifications = async () => {
    try {
      const token = localStorage.getItem('token');
      const res = await fetch(import.meta.env.VITE_API_URL + '/notifications', {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      if (res.ok) {
        setNotifications(await res.json());
      }
    } catch (err) {
      console.error(err);
    }
  };

  const markAsRead = async (id) => {
    try {
      const token = localStorage.getItem('token');
      const res = await fetch(`${import.meta.env.VITE_API_URL}/notifications/${id}/read`, {
        method: 'PUT',
        headers: { 'Authorization': `Bearer ${token}` }
      });
      if (res.ok) {
        fetchNotifications();
      }
    } catch (err) {
      console.error(err);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="absolute top-16 right-0 w-80 bg-surface-dark border border-surface-variant/30 rounded-lg shadow-2xl z-50 overflow-hidden">
      <div className="p-4 border-b border-surface-variant/20 flex justify-between items-center bg-surface-container">
        <h3 className="font-headline-sm text-lime-vibe uppercase tracking-tight flex items-center gap-2">
          <Bell size={16} /> Alerts
        </h3>
        <button onClick={onClose} className="text-text-muted hover:text-white transition-colors">
          <X size={18} />
        </button>
      </div>

      <div className="max-h-96 overflow-y-auto p-2">
        {notifications.length === 0 ? (
          <div className="p-6 text-center text-text-muted font-label-mono text-xs uppercase tracking-widest">
            No active alerts.
          </div>
        ) : (
          notifications.map(notif => (
            <div key={notif.id} className={`p-4 mb-2 rounded-md border ${notif.read ? 'border-transparent bg-surface-container-low' : 'border-lime-vibe/30 bg-surface-container'}`}>
              <div className="flex justify-between items-start gap-4">
                <p className={`font-body-sm ${notif.read ? 'text-text-muted' : 'text-white'}`}>
                  {notif.message}
                </p>
                {!notif.read && (
                  <button onClick={() => markAsRead(notif.id)} className="text-lime-vibe hover:text-white mt-1">
                    <Check size={16} />
                  </button>
                )}
              </div>
              <p className="font-label-mono text-[10px] text-text-muted mt-2 uppercase">
                {new Date(notif.createdAt).toLocaleString()}
              </p>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default NotificationPanel;
