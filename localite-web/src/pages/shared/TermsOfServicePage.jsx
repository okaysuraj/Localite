import React from 'react';

const TermsOfServicePage = () => {
  return (
    <div className="min-h-screen bg-surface w-full pt-10">
      <div className="px-container-margin py-stack-xl max-w-4xl mx-auto">
        <h1 className="font-display-lg text-display-lg text-primary mb-stack-md">Terms of Service</h1>
      <p className="font-body-lg text-on-surface-variant mb-stack-lg">Effective Date: August 2026</p>
      
      <section className="mb-stack-xl">
        <h2 className="font-headline-md text-headline-md text-secondary mb-stack-sm">1. Acceptance of Terms</h2>
        <p className="font-body-md text-on-surface mb-stack-sm">
          By accessing or using the Localite platform, you agree to be bound by these Terms. If you disagree with any part of the terms then you may not access the service.
        </p>
      </section>

      <section className="mb-stack-xl">
        <h2 className="font-headline-md text-headline-md text-secondary mb-stack-sm">2. Membership and Eligibility</h2>
        <p className="font-body-md text-on-surface mb-stack-sm">
          Localite is an exclusive community. Membership is subject to review, and we reserve the right to refuse or revoke membership at our sole discretion. You must provide accurate and complete information during the registration and verification process.
        </p>
      </section>

      <section className="mb-stack-xl">
        <h2 className="font-headline-md text-headline-md text-secondary mb-stack-sm">3. Code of Conduct</h2>
        <p className="font-body-md text-on-surface mb-stack-sm">
          Members are expected to treat each other with respect and dignity, both online and at physical events. Harassment, discrimination, or any behavior that compromises the safety or experience of other members will result in immediate termination of your account.
        </p>
      </section>
    </div>
    </div>
  );
};

export default TermsOfServicePage;
