import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const MOCK_REQUESTS = [
  {
    id: 1,
    name: 'Julianna Vane',
    title: 'Art Enthusiast & Curator',
    sharedCount: 4,
    message: '"Hello! I saw your recent journal entry about the Renaissance revival in modern architecture. I\'m hosting a private viewing next Thursday and would love to extend an invitation."',
    image: 'https://via.placeholder.com/150'
  },
  {
    id: 2,
    name: 'Marcus Thorne',
    title: 'Technology Investor',
    sharedCount: 2,
    message: '"Reaching out as I noticed we both attended the \'Future of Ethos\' roundtable last month. I\'m looking to connect with community leaders who are exploring the intersection of AI and artisanal craft."',
    image: 'https://via.placeholder.com/150'
  }
];

export default function MessageRequestsPage() {
  const navigate = useNavigate();
  const [requests, setRequests] = useState(MOCK_REQUESTS);

  const handleAction = (id, action) => {
    setRequests(prev => prev.filter(r => r.id !== id));
  };

  return (
    <div className="min-h-[calc(100vh-73px)] text-on-surface flex flex-col bg-background">
      {/* Top Navigation Bar - Assuming layout handles it, but keeping internal structure clean */}
      <main className="flex-grow max-w-7xl w-full mx-auto px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 min-h-[716px]">
          {/* Left Pane */}
          <aside className="md:col-span-3 space-y-6">
            <div className="bg-white rounded-xl shadow-sm p-6 border border-surface-variant/30">
              <h2 className="font-label-caps text-label-caps text-on-surface-variant mb-6">Messages</h2>
              <nav className="space-y-4">
                <div onClick={() => navigate('/messages')} className="flex items-center justify-between text-on-surface-variant hover:text-primary transition-colors cursor-pointer p-2 rounded-lg">
                  <div className="flex items-center gap-3">
                    <span className="material-symbols-outlined">inbox</span>
                    <span className="font-body-md text-body-md">Primary Inbox</span>
                  </div>
                </div>
                <div className="flex items-center justify-between text-primary bg-surface-container-high font-semibold p-2 rounded-lg cursor-default border-l-4 border-secondary">
                  <div className="flex items-center gap-3">
                    <span className="material-symbols-outlined" style={{fontVariationSettings: "'FILL' 1"}}>mark_as_unread</span>
                    <span className="font-body-md text-body-md">Requests</span>
                  </div>
                  <span className="bg-secondary text-white text-[10px] px-2 py-0.5 rounded-full">{requests.length}</span>
                </div>
              </nav>
            </div>
            
            <div className="bg-secondary-container/20 rounded-xl p-6 border border-secondary-container">
              <h3 className="font-label-caps text-label-caps text-secondary mb-2">Concierge Tip</h3>
              <p className="font-body-md text-body-md text-on-surface-variant">Message requests from non-connections are filtered based on shared interests and community standing.</p>
            </div>
          </aside>

          {/* Right Pane */}
          <section className="md:col-span-9 space-y-6">
            {/* Trust Banner */}
            <div className="bg-surface-container-low rounded-xl p-6 flex items-start gap-4 shadow-sm border border-outline-variant/30">
              <div className="bg-secondary-fixed-dim/20 p-2 rounded-full">
                <span className="material-symbols-outlined text-secondary">verified_user</span>
              </div>
              <div>
                <h4 className="font-headline-sm text-headline-sm text-primary mb-1">Trust-Based Filtering Active</h4>
                <p className="font-body-md text-body-md text-on-surface-variant max-w-2xl">To preserve the exclusivity of the Localite community, we prioritize requests from members with common acquaintances or verified professional standing. You are in control of who can reach you.</p>
              </div>
            </div>

            {/* Requests List */}
            <div className="space-y-6">
              {requests.map(req => (
                <div key={req.id} className="bg-white rounded-xl shadow-sm p-6 flex flex-col md:flex-row gap-6 hover:-translate-y-1 transition-transform duration-300 border border-surface-variant/30">
                  <div className="flex-shrink-0">
                    <div className="w-24 h-24 rounded-xl overflow-hidden shadow-md">
                      <img src={req.image} alt={req.name} className="w-full h-full object-cover" />
                    </div>
                  </div>
                  <div className="flex-grow space-y-3">
                    <div className="flex justify-between items-start">
                      <div>
                        <h5 className="font-headline-sm text-headline-sm text-primary">{req.name}</h5>
                        <p className="font-label-caps text-label-caps text-secondary uppercase tracking-widest mt-1">{req.title}</p>
                      </div>
                      <div className="flex gap-2">
                        <span className="px-3 py-1 bg-surface-container rounded-full font-label-caps text-[10px] text-on-surface-variant">Shared Circle: {req.sharedCount}</span>
                      </div>
                    </div>
                    <div className="bg-background/50 p-4 rounded-lg border-l-2 border-secondary-fixed-dim">
                      <p className="font-body-md text-body-md text-on-surface leading-relaxed">{req.message}</p>
                    </div>
                    <div className="flex justify-end gap-4 pt-2">
                      <button 
                        onClick={() => handleAction(req.id, 'decline')}
                        className="px-6 py-2 border border-outline-variant font-label-caps text-label-caps text-on-surface-variant hover:bg-surface-container transition-colors rounded-full active:scale-95 duration-200"
                      >
                        Decline
                      </button>
                      <button 
                        onClick={() => handleAction(req.id, 'connect')}
                        className="px-8 py-2 bg-primary text-white font-label-caps text-label-caps rounded-full shadow-md hover:opacity-90 active:scale-95 duration-200"
                      >
                        Connect
                      </button>
                    </div>
                  </div>
                </div>
              ))}
              
              {requests.length === 0 && (
                <div className="bg-white p-8 rounded-xl text-center shadow-sm border border-surface-variant/30">
                  <span className="material-symbols-outlined text-[48px] text-outline-variant mb-4">drafts</span>
                  <h3 className="font-headline-sm text-primary mb-2">No Pending Requests</h3>
                  <p className="text-on-surface-variant">Your inbox is clear.</p>
                </div>
              )}
            </div>
          </section>
        </div>
      </main>
    </div>
  );
}
