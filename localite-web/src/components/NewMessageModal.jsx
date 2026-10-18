import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { X, MagnifyingGlass, PaperPlaneTilt } from '@phosphor-icons/react';

const SUGGESTED_CONTACTS = [
  {
    id: 1,
    name: 'Arthur Sterling',
    hub: 'Wine & Dining',
    imageUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
    online: true,
  },
  {
    id: 2,
    name: 'Elena Rossi',
    hub: 'Tennis & Running',
    imageUrl: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=150&auto=format&fit=crop&q=80',
    online: false,
  },
  {
    id: 3,
    name: 'Julian Vane',
    hub: 'Design & Tech',
    imageUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80',
    online: false,
  },
  {
    id: 4,
    name: 'Beatrice Thorne',
    hub: 'Book Club',
    imageUrl: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&auto=format&fit=crop&q=80',
    online: false,
  },
];

export default function NewMessageModal({ onClose }) {
  const navigate = useNavigate();
  const [search, setSearch] = useState('');

  const filteredContacts = SUGGESTED_CONTACTS.filter(
    (c) =>
      c.name.toLowerCase().includes(search.toLowerCase()) ||
      c.hub.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-xs p-4">
      <div className="w-full max-w-lg bg-white rounded-card border border-border shadow-md overflow-hidden flex flex-col relative animate-fade-in">
        {/* Header */}
        <div className="px-6 py-4 border-b border-border flex items-center justify-between">
          <div>
            <h2 className="text-lg font-display font-semibold text-fg tracking-tight">New Message</h2>
            <p className="text-xs text-fg-muted mt-0.5">Select a member to start a direct conversation.</p>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-btn text-fg-muted hover:text-fg hover:bg-bg-subtle transition-colors"
          >
            <X size={18} />
          </button>
        </div>

        {/* Search Input */}
        <div className="p-4 border-b border-border">
          <div className="relative">
            <MagnifyingGlass size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-fg-muted" />
            <input
              className="w-full pl-9 pr-4 py-2 bg-bg-subtle border border-border rounded-btn text-xs font-mono text-fg placeholder:text-fg-faint focus:outline-none focus:border-accent transition-colors"
              placeholder="Search by name or interests..."
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
        </div>

        {/* Suggested Contacts List */}
        <div className="p-4 overflow-y-auto max-h-[360px] divide-y divide-border/60">
          <span className="block text-[11px] font-mono uppercase tracking-wider text-fg-muted mb-2 px-1">
            Suggested People
          </span>

          {filteredContacts.map((contact) => (
            <div
              key={contact.id}
              onClick={() => {
                onClose();
                navigate(`/messages/${contact.id}`);
              }}
              className="flex items-center justify-between p-2.5 rounded-card hover:bg-bg-subtle transition-colors cursor-pointer group"
            >
              <div className="flex items-center gap-3 min-w-0">
                <div className="relative w-10 h-10 shrink-0">
                  <img
                    className="w-full h-full object-cover rounded-full border border-border"
                    src={contact.imageUrl}
                    alt={contact.name}
                  />
                  {contact.online && (
                    <div className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-accent border-2 border-white rounded-full" />
                  )}
                </div>
                <div className="min-w-0">
                  <h3 className="text-sm font-display font-medium text-fg truncate group-hover:text-accent transition-colors">
                    {contact.name}
                  </h3>
                  <span className="text-[11px] font-mono text-fg-muted truncate block">{contact.hub}</span>
                </div>
              </div>

              <button className="p-2 rounded-btn border border-border text-fg-muted group-hover:border-accent group-hover:text-accent transition-colors">
                <PaperPlaneTilt size={14} />
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
