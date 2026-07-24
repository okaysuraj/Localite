import React from 'react';

const VenuePartnersPage = () => {
  return (
    <div className="min-h-screen bg-surface w-full pt-10">
      <div className="px-container-margin py-stack-xl max-w-4xl mx-auto text-center">
        <h1 className="font-display-lg text-display-lg text-primary mb-stack-md">Our Venue Partners</h1>
      <p className="font-body-lg text-on-surface-variant mb-stack-xl max-w-2xl mx-auto">
        Localite partners with the most exclusive and meticulously curated venues globally to provide our members with unparalleled experiences.
      </p>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="bg-surface-container-low p-8 border border-outline-variant/30 rounded flex flex-col items-center">
          <span className="material-symbols-outlined text-secondary text-[48px] mb-4">apartment</span>
          <h3 className="font-headline-sm text-headline-sm text-on-surface mb-2">The Grand Opera</h3>
          <p className="font-body-md text-on-surface-variant">New York City, NY</p>
        </div>
        
        <div className="bg-surface-container-low p-8 border border-outline-variant/30 rounded flex flex-col items-center">
          <span className="material-symbols-outlined text-secondary text-[48px] mb-4">park</span>
          <h3 className="font-headline-sm text-headline-sm text-on-surface mb-2">Elmsley Manor</h3>
          <p className="font-body-md text-on-surface-variant">Hudson Valley, NY</p>
        </div>
        
        <div className="bg-surface-container-low p-8 border border-outline-variant/30 rounded flex flex-col items-center">
          <span className="material-symbols-outlined text-secondary text-[48px] mb-4">sports_tennis</span>
          <h3 className="font-headline-sm text-headline-sm text-on-surface mb-2">Royal Oaks Club</h3>
          <p className="font-body-md text-on-surface-variant">London, UK</p>
        </div>
        
        <div className="bg-surface-container-low p-8 border border-outline-variant/30 rounded flex flex-col items-center">
          <span className="material-symbols-outlined text-secondary text-[48px] mb-4">wine_bar</span>
          <h3 className="font-headline-sm text-headline-sm text-on-surface mb-2">Le Petit Sommelier</h3>
          <p className="font-body-md text-on-surface-variant">Paris, FR</p>
        </div>
      </div>
      
      <div className="mt-stack-2xl">
        <p className="font-body-md text-on-surface mb-stack-sm">Interested in partnering with Localite?</p>
        <button className="bg-primary text-on-primary font-label-caps text-label-caps px-8 py-3 hover:opacity-80 transition-all rounded">
          Apply as a Venue
        </button>
      </div>
    </div>
    </div>
  );
};

export default VenuePartnersPage;
