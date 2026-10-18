import React, { useState } from 'react';
import {
  EnvelopeSimple,
  Buildings,
  ShieldCheck,
  PaperPlaneRight,
} from '@phosphor-icons/react';

const ContactPage = () => {
  const [form, setForm] = useState({ name: '', email: '', message: '' });
  const [sent, setSent] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSent(true);
  };

  return (
    <div className="bg-bg min-h-screen py-12 px-6">
      <div className="max-w-3xl mx-auto space-y-12">
        {/* Header */}
        <div className="text-center space-y-3">
          <span className="text-xs font-mono text-accent uppercase tracking-wider block">
            Reach Out
          </span>
          <h1 className="text-3xl sm:text-4xl font-display font-semibold text-fg tracking-tight">
            Contact Support & Inquiries
          </h1>
          <p className="text-sm text-fg-muted max-w-md mx-auto leading-relaxed">
            Have questions regarding gathering moderation, venue partnerships, or account settings? Our team is here to assist.
          </p>
        </div>

        {/* Channels */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="bg-white border border-border rounded-card p-5 space-y-2">
            <div className="w-9 h-9 rounded-full bg-accent-subtle text-accent flex items-center justify-center">
              <EnvelopeSimple size={18} />
            </div>
            <h3 className="font-display font-semibold text-sm text-fg">
              Community Help
            </h3>
            <p className="text-xs font-mono text-fg-muted">support@localite.com</p>
          </div>

          <div className="bg-white border border-border rounded-card p-5 space-y-2">
            <div className="w-9 h-9 rounded-full bg-accent-subtle text-accent flex items-center justify-center">
              <Buildings size={18} />
            </div>
            <h3 className="font-display font-semibold text-sm text-fg">
              Venue Partnerships
            </h3>
            <p className="text-xs font-mono text-fg-muted">partners@localite.com</p>
          </div>

          <div className="bg-white border border-border rounded-card p-5 space-y-2">
            <div className="w-9 h-9 rounded-full bg-accent-subtle text-accent flex items-center justify-center">
              <ShieldCheck size={18} />
            </div>
            <h3 className="font-display font-semibold text-sm text-fg">
              Trust & Safety
            </h3>
            <p className="text-xs font-mono text-fg-muted">safety@localite.com</p>
          </div>
        </div>

        {/* Message Form */}
        <div className="bg-white border border-border rounded-card p-6 sm:p-8 space-y-5">
          <h2 className="text-lg font-display font-semibold text-fg tracking-tight">
            Send a Direct Note
          </h2>

          {sent ? (
            <div className="p-6 bg-accent-subtle border border-accent/20 rounded-card text-center space-y-1">
              <p className="text-xs font-mono font-medium text-accent">
                Thank you! Your message has been received.
              </p>
              <p className="text-xs text-fg-muted">
                Our support team typically responds within 24 hours.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4 text-xs font-mono">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block uppercase tracking-wider text-fg-muted mb-1.5">
                    Your Name
                  </label>
                  <input
                    type="text"
                    required
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                    className="w-full bg-bg-subtle border border-border rounded-btn p-2.5 text-xs text-fg font-sans focus:outline-none focus:border-accent transition-colors"
                    placeholder="Jane Doe"
                  />
                </div>
                <div>
                  <label className="block uppercase tracking-wider text-fg-muted mb-1.5">
                    Email Address
                  </label>
                  <input
                    type="email"
                    required
                    value={form.email}
                    onChange={(e) => setForm({ ...form, email: e.target.value })}
                    className="w-full bg-bg-subtle border border-border rounded-btn p-2.5 text-xs text-fg font-sans focus:outline-none focus:border-accent transition-colors"
                    placeholder="jane@example.com"
                  />
                </div>
              </div>

              <div>
                <label className="block uppercase tracking-wider text-fg-muted mb-1.5">
                  Message
                </label>
                <textarea
                  rows="4"
                  required
                  value={form.message}
                  onChange={(e) => setForm({ ...form, message: e.target.value })}
                  className="w-full bg-bg-subtle border border-border rounded-btn p-2.5 text-xs text-fg font-sans focus:outline-none focus:border-accent transition-colors resize-none"
                  placeholder="How can we assist you?"
                />
              </div>

              <button
                type="submit"
                className="inline-flex items-center gap-1.5 px-6 py-2.5 bg-accent text-white rounded-btn text-xs font-mono tracking-wide hover:opacity-90 transition-opacity"
              >
                Send Message <PaperPlaneRight size={13} weight="bold" />
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};

export default ContactPage;
