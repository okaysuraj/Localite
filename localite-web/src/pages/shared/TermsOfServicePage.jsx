const TermsOfServicePage = () => {
  return (
    <div className="bg-bg min-h-screen py-12 px-6">
      <div className="max-w-3xl mx-auto space-y-10">
        {/* Header */}
        <div className="space-y-2 pb-6 border-b border-border">
          <span className="text-xs font-mono text-accent uppercase tracking-wider block">
            Legal & Governance
          </span>
          <h1 className="text-3xl sm:text-4xl font-display font-semibold text-fg tracking-tight">
            Terms of Service
          </h1>
          <p className="text-xs font-mono text-fg-muted">Effective Date: September 2026</p>
        </div>

        {/* Content */}
        <div className="space-y-8 text-sm text-fg leading-relaxed">
          <section className="space-y-2">
            <h2 className="text-lg font-display font-semibold text-fg tracking-tight">
              1. Acceptance of Terms
            </h2>
            <p className="text-fg-muted">
              By registering, accessing, or using the Localite platform, you agree to comply with and be bound
              by these Terms of Service. If you do not agree to these terms, you may not access or use the
              platform.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="text-lg font-display font-semibold text-fg tracking-tight">
              2. Community Eligibility & Verification
            </h2>
            <p className="text-fg-muted">
              Localite connects verified individuals for sports, hobbies, and community events. We require
              truthful registration and verification documents to ensure member safety. Accounts found
              providing inaccurate or misleading identity data will be suspended.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="text-lg font-display font-semibold text-fg tracking-tight">
              3. Member Conduct & Gathering Safety
            </h2>
            <p className="text-fg-muted">
              Members are expected to treat one another with mutual respect during all activities, both in
              digital group threads and in-person events. Physical or verbal harassment, hate speech,
              unsportsmanlike behavior, or safety violations will result in immediate permanent expulsion.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="text-lg font-display font-semibold text-fg tracking-tight">
              4. Event Hosting & Financial Settlements
            </h2>
            <p className="text-fg-muted">
              Organizers hosting ticketed gatherings agree that all fees collected through the platform are
              held in settlement escrow until event completion. Organizers must adhere to published event
              times, venues, and attendee safety guidelines.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="text-lg font-display font-semibold text-fg tracking-tight">
              5. Liability Disclaimer
            </h2>
            <p className="text-fg-muted">
              Participation in physical athletic activities, sports matches, and local gatherings involves
              inherent physical risk. Members participate at their own risk and agree to hold Localite
              harmless for injuries sustained during community events.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
};

export default TermsOfServicePage;
