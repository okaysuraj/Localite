import React, { useState, useEffect } from 'react';
import { Bell, X, Check } from '@phosphor-icons/react';
import { API_BASE_URL, getAuthHeaders, getNotifications } from '../services/api';

const NotificationPanel = ({ isOpen, onClose }) => {
  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    if (isOpen) {
      fetchNotifications();
    }
  }, [isOpen]);

  const fetchNotifications = async () => {
    try {
      const data = await getNotifications();
      if (Array.isArray(data)) {
        setNotifications(data);
      }
    } catch (err) {
      console.error(err);
    }
  };

  const markAsRead = async (id) => {
    try {
      const headers = await getAuthHeaders();
      const res = await fetch(
        `${API_BASE_URL}/notifications/${id}/read`,
        {
          method: 'PUT',
          headers,
        }
      );
      if (res.ok) {
        fetchNotifications();
      }
    } catch (err) {
      console.error(err);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="absolute top-16 right-0 w-80 sm:w-96 bg-white border border-border rounded-card shadow-lg z-50 overflow-hidden animate-fade-in">
      {/* Header */}
      <div className="px-4 py-3 border-b border-border flex justify-between items-center bg-white">
        <div className="flex items-center gap-2">
          <Bell size={16} className="text-accent" />
          <h3 className="font-display font-semibold text-fg text-sm">
            Notifications
          </h3>
        </div>
        <button
          onClick={onClose}
          className="p-1 rounded-btn hover:bg-bg-subtle text-fg-muted hover:text-fg transition-colors"
        >
          <X size={16} />
        </button>
      </div>

      {/* List */}
      <div className="max-h-96 overflow-y-auto p-2 divide-y divide-border/40">
        {notifications.length === 0 ? (
          <div className="p-8 text-center text-fg-muted font-mono text-xs">
            No active notifications.
          </div>
        ) : (
          notifications.map((notif) => (
            <div
              key={notif.id}
              className={`p-3 rounded-btn my-1 transition-colors ${
                notif.read
                  ? 'bg-bg-subtle/50 text-fg-muted'
                  : 'bg-accent-subtle/60 text-fg border border-accent/20'
              }`}
            >
              <div className="flex justify-between items-start gap-3">
                <p className="text-xs leading-relaxed flex-1 font-sans">
                  {notif.message}
                </p>
                {!notif.read && (
                  <button
                    onClick={() => markAsRead(notif.id)}
                    title="Mark as read"
                    className="p-1 rounded text-accent hover:bg-accent/10 transition-colors shrink-0"
                  >
                    <Check size={14} weight="bold" />
                  </button>
                )}
              </div>
              <p className="text-[10px] font-mono text-fg-muted mt-1.5">
                {new Date(notif.createdAt).toLocaleString([], {
                  month: 'short',
                  day: 'numeric',
                  hour: '2-digit',
                  minute: '2-digit',
                })}
              </p>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default NotificationPanel;
