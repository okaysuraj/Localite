const PrivacyPolicyPage = () => {
  return (
    <div className="bg-bg min-h-screen py-12 px-6">
      <div className="max-w-3xl mx-auto space-y-10">
        {/* Header */}
        <div className="space-y-2 pb-6 border-b border-border">
          <span className="text-xs font-mono text-accent uppercase tracking-wider block">
            Privacy & Data Protection
          </span>
          <h1 className="text-3xl sm:text-4xl font-display font-semibold text-fg tracking-tight">
            Privacy Policy
          </h1>
          <p className="text-xs font-mono text-fg-muted">Last Updated: September 2026</p>
        </div>

        {/* Content */}
        <div className="space-y-8 text-sm text-fg leading-relaxed">
          <section className="space-y-2">
            <h2 className="text-lg font-display font-semibold text-fg tracking-tight">
              1. Information We Collect
            </h2>
            <p className="text-fg-muted">
              We collect information to facilitate local connections and verify event participants:
            </p>
            <ul className="list-disc pl-5 space-y-1 text-fg-muted text-xs font-sans">
              <li>
                <strong className="text-fg font-medium">Account & Profile Information:</strong> name, email,
                phone number, bio, neighborhood, and athletic interests.
              </li>
              <li>
                <strong className="text-fg font-medium">Identity Verification:</strong> government ID photos
                and selfie scans, processed strictly for identity verification and stored encrypted.
              </li>
              <li>
                <strong className="text-fg font-medium">Activity Data:</strong> events attended, events
                hosted, ratings, direct messages, and team match records.
              </li>
            </ul>
          </section>

          <section className="space-y-2">
            <h2 className="text-lg font-display font-semibold text-fg tracking-tight">
              2. How Your Information Is Used
            </h2>
            <p className="text-fg-muted">
              Your information is used solely to provide platform services: displaying public gathering
              attendee lists, calculating trust scores, enabling direct communications between members, and
              matching sports partners based on proximity and skill level.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="text-lg font-display font-semibold text-fg tracking-tight">
              3. Data Security & Storage
            </h2>
            <p className="text-fg-muted">
              We employ strict industry encryption standards for all stored files and database records.
              Verification documents are not accessible to other users or third-party advertisers.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="text-lg font-display font-semibold text-fg tracking-tight">
              4. Member Control & Choices
            </h2>
            <p className="text-fg-muted">
              You maintain complete control over your visibility settings. You can edit your profile
              attributes, hide your phone number, or request account deletion at any time through Account
              Settings.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
};

export default PrivacyPolicyPage;
