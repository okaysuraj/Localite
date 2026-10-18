import { useState } from 'react';
import SettingsLayout from '../../components/SettingsLayout';
import { UserPlus, Trash, CheckCircle, BellRinging, FloppyDisk } from '@phosphor-icons/react';

export default function TrustedCirclesSetupPage() {
  const [toggle1, setToggle1] = useState(true);
  const [toggle2, setToggle2] = useState(true);
  const [contacts, setContacts] = useState([
    {
      id: 1,
      name: 'Aarav Mehta',
      phone: '+91 98201 44521',
      role: 'Primary Tether',
      initials: 'AM',
      verified: true,
    },
    {
      id: 2,
      name: 'Jessica Lin',
      phone: '+91 97110 32890',
      role: 'Inner Circle',
      initials: 'JL',
      verified: true,
    },
    {
      id: 3,
      name: 'Rohan Kapoor',
      phone: '+91 98192 11094',
      role: 'Emergency Dispatch',
      initials: 'RK',
      verified: true,
    },
  ]);
  const [showAddModal, setShowAddModal] = useState(false);
  const [newName, setNewName] = useState('');
  const [newPhone, setNewPhone] = useState('');
  const [saved, setSaved] = useState(false);

  const handleAddContact = (e) => {
    e.preventDefault();
    if (!newName.trim()) return;
    const newContact = {
      id: Date.now(),
      name: newName,
      phone: newPhone || '+91 98000 00000',
      role: 'Inner Circle',
      initials: newName
        .split(' ')
        .map((n) => n[0])
        .join('')
        .substring(0, 2)
        .toUpperCase(),
      verified: true,
    };
    setContacts([...contacts, newContact]);
    setNewName('');
    setNewPhone('');
    setShowAddModal(false);
  };

  const handleRemoveContact = (id) => {
    setContacts(contacts.filter((c) => c.id !== id));
  };

  const handleSave = () => {
    setSaved(true);
    setTimeout(() => setSaved(false), 2500);
  };

  return (
    <SettingsLayout>
      <div className="space-y-8 animate-fade-in pb-12">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-[var(--border)] pb-8">
          <div>
            <p className="text-[11px] font-semibold text-[var(--accent)] uppercase tracking-wider mb-2">
              Safety Tethers
            </p>
            <h1 className="text-3xl md:text-4xl font-semibold tracking-tight text-[var(--fg)]">
              Trusted Circles Setup
            </h1>
            <p className="text-sm text-[var(--fg-muted)] mt-1 max-w-xl">
              Designate trusted contacts who receive real-time check-in signals and immediate SOS telemetry.
            </p>
          </div>
          <div className="flex items-center gap-3">
            {saved && (
              <span className="text-xs font-medium text-emerald-600 flex items-center gap-1.5 animate-fade-in">
                <CheckCircle size={16} weight="fill" /> Saved
              </span>
            )}
            <button
              onClick={() => setShowAddModal(true)}
              className="px-4 py-2.5 bg-[var(--accent)] hover:bg-[var(--accent)]/90 text-white text-xs font-semibold uppercase tracking-wider rounded-card shadow-sm active:scale-95 transition-all flex items-center gap-2"
            >
              <UserPlus size={16} weight="bold" />
              Add Contact
            </button>
          </div>
        </div>

        {/* Bento Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Active Contacts List */}
          <section className="col-span-1 lg:col-span-8 bg-[var(--bg)] rounded-card p-6 md:p-8 border border-[var(--border)]">
            <div className="flex items-center justify-between mb-6 pb-4 border-b border-[var(--border)]">
              <div>
                <h3 className="text-base font-semibold text-[var(--fg)]">
                  Designated Contacts ({contacts.length})
                </h3>
                <p className="text-xs text-[var(--fg-muted)]">
                  These individuals receive automated notifications if SOS is triggered.
                </p>
              </div>
            </div>

            <div className="space-y-3">
              {contacts.map((contact) => (
                <div
                  key={contact.id}
                  className="flex items-center justify-between p-4 bg-[var(--bg-subtle)] rounded-card border border-[var(--border)] hover:border-[var(--fg-muted)] transition-all"
                >
                  <div className="flex items-center gap-3.5">
                    <div className="w-9 h-9 rounded-full bg-neutral-200 text-neutral-800 flex items-center justify-center text-xs font-bold">
                      {contact.initials}
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <h4 className="text-sm font-semibold text-[var(--fg)]">{contact.name}</h4>
                        {contact.verified && (
                          <CheckCircle
                            size={14}
                            weight="fill"
                            className="text-emerald-600"
                            title="Phone verified"
                          />
                        )}
                      </div>
                      <p className="text-xs text-[var(--fg-muted)]">
                        {contact.phone} •{' '}
                        <span className="text-[var(--accent)] font-medium">{contact.role}</span>
                      </p>
                    </div>
                  </div>
                  <button
                    onClick={() => handleRemoveContact(contact.id)}
                    className="p-2 text-[var(--fg-muted)] hover:text-rose-600 transition-colors"
                    title="Remove contact"
                  >
                    <Trash size={16} />
                  </button>
                </div>
              ))}
            </div>
          </section>

          {/* Automated Broadcast Rules */}
          <section className="col-span-1 lg:col-span-4 bg-[var(--bg)] rounded-card p-6 md:p-8 border border-[var(--border)] flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-3 mb-6 pb-4 border-b border-[var(--border)]">
                <span className="w-8 h-8 rounded-card bg-[var(--accent)]/10 text-[var(--accent)] flex items-center justify-center">
                  <BellRinging size={18} weight="fill" />
                </span>
                <h3 className="text-base font-semibold text-[var(--fg)]">Automation Rules</h3>
              </div>

              <div className="space-y-5">
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <h4 className="text-xs font-semibold uppercase tracking-wider text-[var(--fg)] mb-0.5">
                      Late Night Transit Tether
                    </h4>
                    <p className="text-xs text-[var(--fg-muted)] leading-relaxed">
                      Send an automated ping to your Inner Circle when you depart a gathering after 11:00 PM.
                    </p>
                  </div>
                  <button
                    className={`w-11 h-6 rounded-full p-0.5 transition-colors duration-200 shrink-0 ${toggle1 ? 'bg-[var(--accent)]' : 'bg-neutral-300'}`}
                    onClick={() => setToggle1(!toggle1)}
                  >
                    <div
                      className={`w-5 h-5 bg-white rounded-full shadow-sm transform transition-transform duration-200 ${toggle1 ? 'translate-x-5' : 'translate-x-0'}`}
                    ></div>
                  </button>
                </div>

                <div className="flex items-start justify-between gap-3 pt-4 border-t border-[var(--border)]">
                  <div>
                    <h4 className="text-xs font-semibold uppercase tracking-wider text-[var(--fg)] mb-0.5">
                      Venue Arrival Verification
                    </h4>
                    <p className="text-xs text-[var(--fg-muted)] leading-relaxed">
                      Confirm safe arrival at confirmed private sports or salon venues.
                    </p>
                  </div>
                  <button
                    className={`w-11 h-6 rounded-full p-0.5 transition-colors duration-200 shrink-0 ${toggle2 ? 'bg-[var(--accent)]' : 'bg-neutral-300'}`}
                    onClick={() => setToggle2(!toggle2)}
                  >
                    <div
                      className={`w-5 h-5 bg-white rounded-full shadow-sm transform transition-transform duration-200 ${toggle2 ? 'translate-x-5' : 'translate-x-0'}`}
                    ></div>
                  </button>
                </div>
              </div>
            </div>

            <div className="pt-6">
              <button
                onClick={handleSave}
                className="w-full py-2.5 border border-[var(--border)] hover:bg-[var(--bg-subtle)] text-[var(--fg)] text-xs font-semibold uppercase tracking-wider rounded-card transition-colors flex items-center justify-center gap-2"
              >
                <FloppyDisk size={16} />
                Save Automation Rules
              </button>
            </div>
          </section>
        </div>
      </div>

      {/* Add Contact Modal */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 animate-fade-in">
          <div className="bg-[var(--bg)] rounded-card p-6 md:p-8 max-w-md w-full border border-[var(--border)] shadow-xl relative">
            <h2 className="text-lg font-semibold text-[var(--fg)] mb-1">Add Trusted Contact</h2>
            <p className="text-xs text-[var(--fg-muted)] mb-5">
              Enter their name and mobile number. They will receive an authorization invite.
            </p>

            <form onSubmit={handleAddContact} className="space-y-4">
              <div>
                <label className="text-[11px] font-semibold uppercase tracking-wider text-[var(--fg-muted)] block mb-1.5">
                  Full Name
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Priya Sharma"
                  value={newName}
                  onChange={(e) => setNewName(e.target.value)}
                  className="w-full px-3.5 py-2.5 bg-[var(--bg-subtle)] border border-[var(--border)] rounded-card text-xs text-[var(--fg)] focus:outline-none focus:border-[var(--accent)]"
                />
              </div>

              <div>
                <label className="text-[11px] font-semibold uppercase tracking-wider text-[var(--fg-muted)] block mb-1.5">
                  Mobile Number
                </label>
                <input
                  type="tel"
                  required
                  placeholder="+91 98000 00000"
                  value={newPhone}
                  onChange={(e) => setNewPhone(e.target.value)}
                  className="w-full px-3.5 py-2.5 bg-[var(--bg-subtle)] border border-[var(--border)] rounded-card text-xs text-[var(--fg)] focus:outline-none focus:border-[var(--accent)]"
                />
              </div>

              <div className="grid grid-cols-2 gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="py-2.5 border border-[var(--border)] text-xs font-semibold text-[var(--fg)] rounded-card hover:bg-[var(--bg-subtle)] transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="py-2.5 bg-[var(--accent)] text-white text-xs font-semibold uppercase tracking-wider rounded-card shadow-sm hover:bg-[var(--accent)]/90 transition-colors"
                >
                  Confirm & Tether
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </SettingsLayout>
  );
}
