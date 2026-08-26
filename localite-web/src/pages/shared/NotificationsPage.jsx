import React, { useState, useEffect } from 'react';
import { getNotifications, markNotificationAsRead } from '../../services/api';
import { Link } from 'react-router-dom';

export default function NotificationsPage() {
  const [activeTab, setActiveTab] = useState('ACTIVITY');
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    setLoading(true);
    try {
      const data = await getNotifications();
      setNotifications(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleMarkAsRead = async (id) => {
    try {
      await markNotificationAsRead(id);
      fetchData(); // Refresh list
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <main className="p-container-margin max-w-4xl mx-auto min-h-screen">
      <div className="mb-8">
        <h2 className="font-display-lg text-display-lg text-primary mb-2">Notifications</h2>
        <p className="font-label-caps text-label-caps text-on-surface-variant uppercase tracking-widest">PERSONAL CONCIERGE UPDATES</p>
      </div>

      <div className="flex gap-6 border-b border-outline-variant/30 mb-8">
        <button 
          className={`pb-4 font-label-caps text-label-caps tracking-widest transition-colors relative ${activeTab === 'ACTIVITY' ? 'text-primary' : 'text-on-surface-variant hover:text-primary'}`}
          onClick={() => setActiveTab('ACTIVITY')}
        >
          ACTIVITY
          {activeTab === 'ACTIVITY' && <div className="absolute bottom-0 left-0 w-full h-1 bg-secondary rounded-t-full"></div>}
        </button>
        <button 
          className={`pb-4 font-label-caps text-label-caps tracking-widest transition-colors relative ${activeTab === 'COMMUNITY' ? 'text-primary' : 'text-on-surface-variant hover:text-primary'}`}
          onClick={() => setActiveTab('COMMUNITY')}
        >
          COMMUNITY
          {activeTab === 'COMMUNITY' && <div className="absolute bottom-0 left-0 w-full h-1 bg-secondary rounded-t-full"></div>}
        </button>
      </div>

      {loading ? (
        <div className="flex justify-center py-12">
          <div className="w-12 h-12 border-4 border-secondary border-t-transparent rounded-full animate-spin"></div>
        </div>
      ) : notifications.length === 0 ? (
        <div className="text-center py-24 bg-surface-container-low rounded-xl">
          <p className="text-on-surface-variant text-lg">No new notifications.</p>
        </div>
      ) : (
        <div className="space-y-6">
          {notifications.map(notif => {
            const timeStr = new Date(notif.createdAt).toLocaleDateString();
            const isEvent = notif.type === 'EVENT';
            const isPremium = notif.type === 'PREMIUM' || notif.type === 'MEMBERSHIP';

            if (isEvent) {
              return (
                <div key={notif.id} className={`bg-white rounded-xl overflow-hidden shadow-sm border border-outline-variant/10 cursor-pointer hover:border-secondary transition-colors ${notif.read ? 'opacity-70' : ''}`} onClick={() => handleMarkAsRead(notif.id)}>
                  <div className="h-32 w-full bg-surface-container-low relative">
                    <img src="https://via.placeholder.com/600x300" alt="Event" className="w-full h-full object-cover" />
                  </div>
                  <div className="p-6">
                    <div className="flex justify-between items-center mb-2">
                      <span className="font-label-caps text-[10px] text-secondary uppercase tracking-widest">{notif.type}</span>
                      <span className="font-label-caps text-[10px] text-on-surface-variant uppercase tracking-widest">{timeStr}</span>
                    </div>
                    <h3 className="font-headline-md text-primary mb-2">New Event</h3>
                    <p className="text-on-surface-variant font-body-md">{notif.message}</p>
                  </div>
                </div>
              );
            }

            if (isPremium) {
              return (
                <div key={notif.id} className={`bg-primary rounded-xl p-8 shadow-md cursor-pointer hover:bg-black transition-colors ${notif.read ? 'opacity-80' : ''}`} onClick={() => handleMarkAsRead(notif.id)}>
                  <div className="flex justify-between items-center mb-4">
                    <span className="font-label-caps text-[10px] text-[#ffdea5] uppercase tracking-widest">{notif.type}</span>
                    <span className="font-label-caps text-[10px] text-on-primary/70 uppercase tracking-widest">{timeStr}</span>
                  </div>
                  <h3 className="font-headline-md text-white mb-2">{notif.message}</h3>
                  <button className="mt-4 px-6 py-2 bg-secondary-container text-on-secondary-container font-label-caps text-[10px] rounded-full uppercase tracking-widest">
                    EXPLORE PERKS
                  </button>
                </div>
              );
            }

            return (
              <div key={notif.id} className={`flex items-start gap-4 p-6 bg-white rounded-xl shadow-sm border border-outline-variant/10 cursor-pointer hover:border-secondary transition-colors ${notif.read ? 'opacity-70' : ''}`} onClick={() => handleMarkAsRead(notif.id)}>
                <div className="relative">
                  <div className="w-12 h-12 rounded-full overflow-hidden border-2 border-secondary/20">
                    <img src={notif.user?.profileImageUrl || 'https://via.placeholder.com/150'} alt="Avatar" className="w-full h-full object-cover" />
                  </div>
                </div>
                <div className="flex-1">
                  <div className="flex justify-between items-center mb-1">
                    <span className="font-label-caps text-[10px] text-secondary uppercase tracking-widest">{notif.type}</span>
                    <span className="font-label-caps text-[10px] text-on-surface-variant uppercase tracking-widest">{timeStr}</span>
                  </div>
                  <p className="text-primary font-body-md">
                    <span className="font-bold">{notif.user?.username || 'Localite Admin'}</span> {notif.message}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </main>
  );
}
