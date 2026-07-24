import React from 'react';

const PrivacyPolicyPage = () => {
  return (
    <div className="min-h-screen bg-surface w-full pt-10">
      <div className="px-container-margin py-stack-xl max-w-4xl mx-auto">
        <h1 className="font-display-lg text-display-lg text-primary mb-stack-md">Privacy Policy</h1>
      <p className="font-body-lg text-on-surface-variant mb-stack-lg">Last updated: August 2026</p>
      
      <section className="mb-stack-xl">
        <h2 className="font-headline-md text-headline-md text-secondary mb-stack-sm">1. Information We Collect</h2>
        <p className="font-body-md text-on-surface mb-stack-sm">
          Localite collects information to provide better services to our members. We collect information in the following ways:
        </p>
        <ul className="list-disc pl-6 font-body-md text-on-surface space-y-2">
          <li>Information you give us (e.g., your profile details, verification ID).</li>
          <li>Information we get from your use of our services (e.g., event attendance, location data if permitted).</li>
        </ul>
      </section>

      <section className="mb-stack-xl">
        <h2 className="font-headline-md text-headline-md text-secondary mb-stack-sm">2. How We Use Information We Collect</h2>
        <p className="font-body-md text-on-surface mb-stack-sm">
          We use the information we collect from all of our services to provide, maintain, protect and improve them, to develop new ones, and to protect Localite and our users. We also use this information to offer you tailored content – like giving you more relevant event recommendations.
        </p>
      </section>

      <section className="mb-stack-xl">
        <h2 className="font-headline-md text-headline-md text-secondary mb-stack-sm">3. Transparency and Choice</h2>
        <p className="font-body-md text-on-surface mb-stack-sm">
          People have different privacy concerns. Our goal is to be clear about what information we collect, so that you can make meaningful choices about how it is used. You can review and control certain types of information tied to your Localite Account by using our privacy settings page.
        </p>
      </section>
    </div>
    </div>
  );
};

export default PrivacyPolicyPage;
