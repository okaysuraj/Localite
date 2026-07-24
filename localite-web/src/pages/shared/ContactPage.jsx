import React from 'react';

const ContactPage = () => {
  return (
    <div className="min-h-screen bg-surface w-full pt-10">
      <div className="px-container-margin py-stack-xl max-w-2xl mx-auto text-center">
        <h1 className="font-display-lg text-display-lg text-primary mb-stack-md">Contact Us</h1>
      <p className="font-body-lg text-on-surface-variant mb-stack-xl">
        Our concierge team is available around the clock to assist our members.
      </p>
      
      <div className="bg-surface-container-low p-10 border border-outline-variant/30 rounded flex flex-col items-center">
        <span className="material-symbols-outlined text-secondary text-[64px] mb-6">mail</span>
        <h3 className="font-headline-md text-headline-md text-on-surface mb-2">Concierge Support</h3>
        <p className="font-body-md text-on-surface-variant mb-6">concierge@localite.com</p>
        
        <div className="w-full h-px bg-outline-variant/30 my-6"></div>
        
        <h3 className="font-headline-md text-headline-md text-on-surface mb-2">Press & Partnerships</h3>
        <p className="font-body-md text-on-surface-variant mb-2">partners@localite.com</p>
        <p className="font-body-md text-on-surface-variant">press@localite.com</p>
      </div>
    </div>
    </div>
  );
};

export default ContactPage;
