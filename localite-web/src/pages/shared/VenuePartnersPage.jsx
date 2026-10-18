import { useNavigate } from 'react-router-dom';
import { Buildings, Tree, Barbell, Coffee, ArrowRight, Handshake } from '@phosphor-icons/react';

const VenuePartnersPage = () => {
  const navigate = useNavigate();

  const venues = [
    {
      title: 'Sports Complexes & Turfs',
      description:
        'Dedicated badminton courts, FIFA-certified football turfs, and floodlit cricket nets available for member matches.',
      location: 'Over 45 locations active',
      Icon: Buildings,
    },
    {
      title: 'Public Parks & Trails',
      description:
        'Curated morning meetups and evening running circuits in well-maintained civic and botanical spaces.',
      location: 'Community organized',
      Icon: Tree,
    },
    {
      title: 'Studios & Fitness Centers',
      description:
        'Partner wellness facilities offering reserved group slots for yoga, functional fitness, and recovery.',
      location: 'Member discounts',
      Icon: Barbell,
    },
    {
      title: 'Social Spaces & Cafés',
      description:
        'Independent local spots hosting post-match refreshments, strategy sessions, and social discussions.',
      location: 'Community vetted',
      Icon: Coffee,
    },
  ];

  return (
    <div className="bg-bg min-h-screen py-12 px-6">
      <div className="max-w-content mx-auto space-y-12 text-center">
        {/* Header */}
        <div className="max-w-2xl mx-auto space-y-3">
          <span className="text-xs font-mono text-accent uppercase tracking-wider block">
            Locations & Spaces
          </span>
          <h1 className="text-3xl sm:text-4xl font-display font-semibold text-fg tracking-tight">
            Our Venue Partners
          </h1>
          <p className="text-sm text-fg-muted leading-relaxed">
            Localite partners with local grounds, community facilities, and sports complexes to provide
            reliable, accessible spaces for all gatherings.
          </p>
        </div>

        {/* Venues Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 text-left">
          {venues.map((venue) => {
            const Icon = venue.Icon;
            return (
              <div
                key={venue.title}
                className="bg-white border border-border rounded-card p-6 sm:p-7 space-y-3 hover:border-accent/40 transition-colors"
              >
                <div className="w-10 h-10 rounded-full bg-accent-subtle text-accent flex items-center justify-center">
                  <Icon size={20} />
                </div>
                <h3 className="font-display font-semibold text-base text-fg tracking-tight">{venue.title}</h3>
                <p className="text-xs text-fg-muted leading-relaxed">{venue.description}</p>
                <div className="pt-2 border-t border-border/60">
                  <span className="text-[11px] font-mono text-accent">{venue.location}</span>
                </div>
              </div>
            );
          })}
        </div>

        {/* CTA Banner */}
        <div className="bg-white border border-border rounded-card p-8 max-w-2xl mx-auto space-y-4">
          <div className="w-12 h-12 rounded-full bg-bg-subtle text-fg flex items-center justify-center mx-auto">
            <Handshake size={24} />
          </div>
          <div className="space-y-1">
            <h2 className="font-display font-semibold text-lg text-fg tracking-tight">
              Manage a sports court or community space?
            </h2>
            <p className="text-xs text-fg-muted leading-relaxed max-w-md mx-auto">
              Partner with Localite to fill off-peak hours, host recurring leagues, and connect with hundreds
              of active local participants.
            </p>
          </div>
          <button
            onClick={() => navigate('/contact')}
            className="inline-flex items-center gap-2 px-6 py-2.5 bg-accent text-white rounded-btn text-xs font-mono tracking-wide hover:opacity-90 transition-opacity"
          >
            Apply as Venue Partner <ArrowRight size={13} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default VenuePartnersPage;
