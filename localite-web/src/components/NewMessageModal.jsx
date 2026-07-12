import React from 'react';

const SUGGESTED_CONTACTS = [
  {
    id: 1,
    name: 'Arthur Sterling',
    hub: 'Wine Collectors',
    icon: 'workspace_premium',
    imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCoT3QrhhDRsRlU7lLQWtjsw5u9YfIxexpV37-PbNEWYdvSR24D6jVlSZC5XrXDT7XcbfVwUUw_ZZqOW286_CNUp1XkxEEJrtmAmM8Qm-1_GeHdmJygW6dkvUJTMEQq6yApxR9GZ3O8_Ifdhb5rHWZuwBgdCtCD_qp0DqZX0knMoiw29QkvPdg-2yB4RY-8B3TqVQLEJmW6oTas3Zpkx1y209TgXOQwSt-eOyGn85uteWrAYrZ0OCaD9g',
    online: true
  },
  {
    id: 2,
    name: 'Elena Rossi',
    hub: 'Tennis Hub',
    icon: 'sports_tennis',
    imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuC8pc4criHwQ3IFAKaltSqkq2qWTrqUa57cNQ0ZwAMtxCcezZ0C5kKkm4aqfWQfprXopPl5wW840Xo-x1f2Y0mTWMjJeELWe7DJlEjDTi8gm2izqcur25-cZofHswIyTe1XUIISmvYRtPMACgZ3Ld_jS8qyLz-3hw2-75K43EOZnOJo9CYehfytzPM-2z9wog70PVvA8hXCHiMvPd84DNF7jKqxAmwJ9Z9QJ1-4pyVvPFI97htp0nw4Bw',
    online: false
  },
  {
    id: 3,
    name: 'Julian Vane',
    hub: 'Modern Art Hub',
    icon: 'palette',
    imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAdA9dF4WOfA_xgtLED9Rnadzfk7zQfdYN7jvcsEHcjr1TgDBZ0wzUM-vhFWZhcSz4v2ZHAc3YT4K2J8pZ9VrGtuoTTU-Row0DXtnanYOL7vLRHqdAdBW1tOhoIZo3gF4rbiscpUyrvflCluiDpvhsyY7AaRyedtHoa4S90ffQmTdLdNzL3zRW8s_RNr0DQNYyt7d5nHwwTaGyLKwpvIVfqL85p2MMO7Q7tYoUG7K7budqACDr1gj090g',
    online: false
  },
  {
    id: 4,
    name: 'Beatrice Thorne',
    hub: 'Wine Collectors',
    icon: 'history_edu',
    imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBn10SAhgFYPqaESPpOFJM73v4yoVZYDCwZ4q2tEJNf-myCjTvM3VQ6p3txrhfXjh9ACB5j8SZqvpw5TR19h4PuEo7z8BOyX5TxKuMFdcs6dClZinSHgYFu54wBEaQ5J5CYQKx9Gg3YL0bi6Mw5Y2-me5M4SqWmgzvArVrN27XGY_Z8ovFA1tF64INkH4n776DZpWQnTlDqegdcbAw0IPbo9Z8CNyWjD2gdYJacT6dL0wC9-qHSAiKvsw',
    online: false
  }
];

export default function NewMessageModal({ onClose }) {
  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-background/80 backdrop-blur-sm p-4">
      <div className="w-full max-w-4xl bg-surface-container-lowest rounded-xl shadow-lg overflow-hidden flex flex-col animate-fade-in border border-surface-variant/30 relative">
        
        {/* Close Button */}
        <button 
          onClick={onClose} 
          className="absolute right-6 top-6 text-on-surface-variant hover:text-primary transition-colors"
        >
          <span className="material-symbols-outlined text-[24px]">close</span>
        </button>

        {/* Modal Header */}
        <div className="px-8 py-6 border-b border-surface-variant/30 flex items-center justify-between">
          <div>
            <h1 className="font-headline-sm text-headline-sm text-primary pr-12">Start Conversation</h1>
            <p className="font-body-md text-on-surface-variant text-sm mt-1">Connect with fellow members of the nobility.</p>
          </div>
          <button className="hidden sm:flex items-center gap-2 bg-primary text-white px-6 py-3 rounded-lg font-label-caps text-label-caps hover:opacity-90 transition-all active:scale-95 shadow-sm">
            <span className="material-symbols-outlined text-[18px]">group_add</span>
            START GROUP
          </button>
        </div>

        {/* Search Section */}
        <div className="px-8 pt-8">
          <div className="relative group">
            <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-outline">search</span>
            <input 
              className="w-full pl-12 pr-4 py-4 bg-surface-container-low border-none rounded-xl font-body-md focus:ring-1 focus:ring-secondary-fixed-dim transition-all placeholder:text-outline/60 outline-none" 
              placeholder="Search Localites" 
              type="text" 
            />
          </div>
        </div>

        {/* Suggested Contacts Grid */}
        <div className="px-8 py-8 flex-1 overflow-y-auto max-h-[500px] custom-scrollbar">
          <h2 className="font-label-caps text-label-caps text-secondary mb-6">SUGGESTED CONTACTS</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {SUGGESTED_CONTACTS.map((contact) => (
              <div key={contact.id} className="group flex items-center p-4 bg-surface-container-lowest border border-surface-variant/50 rounded-xl hover:border-secondary-container hover:shadow-sm transition-all duration-300 cursor-pointer">
                <div className="relative w-14 h-14 shrink-0">
                  <img className="w-full h-full object-cover rounded-full" src={contact.imageUrl} alt={contact.name} />
                  {contact.online && (
                    <div className="absolute bottom-0 right-0 w-3.5 h-3.5 bg-secondary border-2 border-surface-container-lowest rounded-full"></div>
                  )}
                </div>
                <div className="ml-4 flex-1 min-w-0">
                  <h3 className="font-body-lg text-primary font-bold truncate">{contact.name}</h3>
                  <div className="flex items-center gap-1 mt-0.5">
                    <span className="material-symbols-outlined text-[14px] text-secondary">{contact.icon}</span>
                    <span className="font-label-caps text-[10px] text-on-surface-variant uppercase tracking-widest">{contact.hub}</span>
                  </div>
                </div>
                <button className="ml-4 p-2.5 rounded-full border border-outline-variant text-primary group-hover:bg-primary group-hover:text-white transition-colors active:scale-90">
                  <span className="material-symbols-outlined text-[20px]">mail</span>
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Footer Action */}
        <div className="px-8 py-6 bg-surface-container-low text-center">
          <p className="font-body-md text-on-surface-variant text-xs">
            Looking for someone specific?{' '}
            <a className="text-secondary underline underline-offset-4 hover:text-primary transition-colors cursor-pointer" onClick={onClose}>
              Browse Full Directory
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}
