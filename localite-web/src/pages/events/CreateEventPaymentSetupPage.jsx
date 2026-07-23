import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function CreateEventPaymentSetupPage() {
  const navigate = useNavigate();
  const [accessType, setAccessType] = useState('free');
  const [price, setPrice] = useState('45.00');

  const parsedPrice = parseFloat(price) || 0;
  const platformFee = parsedPrice > 0 ? (parsedPrice * 0.05).toFixed(2) : '0.00';
  const processingFee = parsedPrice > 0 ? (parsedPrice * 0.03).toFixed(2) : '0.00'; // mockup
  const netPerTicket = parsedPrice > 0 ? (parsedPrice - parseFloat(platformFee) - parseFloat(processingFee)).toFixed(2) : '0.00';
  const total = parsedPrice > 0 ? (netPerTicket * 50).toFixed(2) : '0.00';

  return (
    <div className="bg-background text-on-surface font-body-md min-h-[calc(100vh-73px)]">
      <main className="max-w-7xl mx-auto py-12 px-6 md:px-12">
        {/* Header Section */}
        <div className="mb-12 text-center md:text-left">
          <p className="font-label-caps text-label-caps text-secondary mb-2 tracking-widest">EVENT CREATION JOURNEY</p>
          <h1 className="font-headline-md text-headline-md text-primary">Payment & Ticket Setup</h1>
          <p className="font-body-md text-on-surface-variant max-w-2xl mt-2">Define how your guests will access the gathering. Choose between complimentary entry or curated ticketed experiences.</p>
        </div>

        {/* Split Pane Layout */}
        <div className="flex flex-col lg:flex-row gap-12 items-start">
          {/* Left Side: Selection Form */}
          <div className="flex-grow w-full lg:w-3/5 space-y-6">
            <div className="space-y-4">
              <h3 className="font-label-caps text-label-caps text-on-surface-variant">SELECT ACCESS TYPE</h3>
              
              {/* Free Event Card */}
              <label className={`group relative flex items-start gap-4 p-6 bg-white rounded-xl shadow-sm border-2 cursor-pointer transition-all ${accessType === 'free' ? 'border-secondary-fixed-dim' : 'border-transparent hover:border-secondary-fixed-dim'}`}>
                <input 
                  type="radio" 
                  name="access_type" 
                  value="free" 
                  className="mt-1 text-primary focus:ring-secondary-fixed-dim cursor-pointer"
                  checked={accessType === 'free'}
                  onChange={() => setAccessType('free')}
                />
                <div className="flex-grow">
                  <div className="flex justify-between items-center mb-1">
                    <span className="font-headline-sm text-headline-sm text-primary">Free Event</span>
                    <span className="material-symbols-outlined text-secondary">redeem</span>
                  </div>
                  <p className="text-on-surface-variant text-body-md">Open to the public at no cost. Ideal for community gatherings or promotional events.</p>
                </div>
              </label>

              {/* Paid Ticket Card */}
              <label className={`group relative flex items-start gap-4 p-6 bg-white rounded-xl shadow-sm border-2 cursor-pointer transition-all ${accessType === 'paid' ? 'border-secondary-fixed-dim' : 'border-transparent hover:border-secondary-fixed-dim'}`}>
                <input 
                  type="radio" 
                  name="access_type" 
                  value="paid" 
                  className="mt-1 text-primary focus:ring-secondary-fixed-dim cursor-pointer"
                  checked={accessType === 'paid'}
                  onChange={() => setAccessType('paid')}
                />
                <div className="flex-grow">
                  <div className="flex justify-between items-center mb-1">
                    <span className="font-headline-sm text-headline-sm text-primary">Paid Ticket</span>
                    <span className="material-symbols-outlined text-secondary">payments</span>
                  </div>
                  <p className="text-on-surface-variant text-body-md">Generate revenue with standard ticket pricing. Secure and streamlined checkout for guests.</p>
                  
                  {/* Nested Input for Price */}
                  {accessType === 'paid' && (
                    <div className="mt-6 p-4 bg-surface-container-low rounded-lg">
                      <label className="block font-label-caps text-label-caps text-on-surface-variant mb-2">SET UNIT PRICE</label>
                      <div className="relative">
                        <span className="absolute left-4 top-1/2 -translate-y-1/2 text-on-surface-variant">$</span>
                        <input 
                          type="number" 
                          className="w-full bg-white border-none rounded-lg pl-8 pr-4 py-3 focus:ring-1.5 focus:ring-secondary-fixed-dim font-body-md outline-none" 
                          placeholder="0.00" 
                          value={price}
                          onChange={(e) => setPrice(e.target.value)}
                        />
                      </div>
                    </div>
                  )}
                </div>
              </label>

              {/* Member Exclusive Card */}
              <label className={`group relative flex items-start gap-4 p-6 bg-white rounded-xl shadow-sm border-2 cursor-pointer transition-all ${accessType === 'member' ? 'border-secondary-fixed-dim' : 'border-transparent hover:border-secondary-fixed-dim'}`}>
                <input 
                  type="radio" 
                  name="access_type" 
                  value="member" 
                  className="mt-1 text-primary focus:ring-secondary-fixed-dim cursor-pointer"
                  checked={accessType === 'member'}
                  onChange={() => setAccessType('member')}
                />
                <div className="flex-grow">
                  <div className="flex justify-between items-center mb-1">
                    <span className="font-headline-sm text-headline-sm text-primary">Member Exclusive</span>
                    <span className="material-symbols-outlined text-secondary">star</span>
                  </div>
                  <p className="text-on-surface-variant text-body-md">Restricted access for your Localite Inner Circle. Perfect for VIP previews and private salons.</p>
                </div>
              </label>
            </div>

            {/* PayPal Linking Section */}
            <div className="pt-6 border-t border-outline-variant/20">
              <h3 className="font-label-caps text-label-caps text-on-surface-variant mb-4">PAYOUT RECIPIENT</h3>
              <div className="p-6 bg-white rounded-xl shadow-sm flex flex-col md:flex-row items-center justify-between gap-4 border border-outline-variant/10">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-[#003087] rounded-lg flex items-center justify-center">
                    <span className="material-symbols-outlined text-white" style={{ fontVariationSettings: "'FILL' 1" }}>account_balance_wallet</span>
                  </div>
                  <div>
                    <h4 className="font-body-lg text-body-lg font-bold text-primary">PayPal Account</h4>
                    <p className="text-on-surface-variant text-body-md">Linked: alex.vanderbilt@design.com</p>
                  </div>
                </div>
                <button className="px-6 py-2 border border-secondary text-secondary font-label-caps rounded-full hover:bg-secondary-container transition-colors">
                  CHANGE ACCOUNT
                </button>
              </div>
            </div>
          </div>

          {/* Right Side: Financial Summary */}
          <aside className="w-full lg:w-2/5 sticky top-28">
            <div className="bg-white rounded-xl shadow-sm overflow-hidden border border-outline-variant/20">
              <div className="p-8 border-b border-outline-variant bg-primary text-white">
                <h3 className="font-headline-sm text-headline-sm">Financial Summary</h3>
                <p className="font-body-md opacity-80">Estimated revenue based on capacity</p>
              </div>
              <div className="p-8 space-y-6">
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="font-label-caps text-label-caps text-on-surface-variant">BASE TICKET PRICE</span>
                    <span className="font-body-md text-primary font-bold">${accessType === 'paid' ? parsedPrice.toFixed(2) : '0.00'}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="font-label-caps text-label-caps text-on-surface-variant">PLATFORM FEE (5%)</span>
                    <span className="font-body-md text-on-surface-variant">-${accessType === 'paid' ? platformFee : '0.00'}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="font-label-caps text-label-caps text-on-surface-variant">PROCESSING FEE</span>
                    <span className="font-body-md text-on-surface-variant">-${accessType === 'paid' ? processingFee : '0.00'}</span>
                  </div>
                </div>
                
                <div className="pt-6 border-t border-dashed border-outline-variant/40">
                  <div className="flex justify-between items-end">
                    <div>
                      <span className="font-label-caps text-label-caps text-secondary">NET PER TICKET</span>
                      <h2 className="font-headline-md text-headline-md text-primary">${accessType === 'paid' ? netPerTicket : '0.00'}</h2>
                    </div>
                    <div className="text-right">
                      <span className="font-label-caps text-label-caps text-on-surface-variant">EST. TOTAL (50 CAP.)</span>
                      <h4 className="font-headline-sm text-headline-sm text-secondary">${accessType === 'paid' ? total : '0.00'}</h4>
                    </div>
                  </div>
                </div>

                <div className="p-4 bg-surface-container-low rounded-lg flex gap-3 items-start">
                  <span className="material-symbols-outlined text-secondary text-sm">info</span>
                  <p className="text-[13px] leading-relaxed text-on-surface-variant">
                    Fees are calculated per transaction. Payouts are initiated 48 hours after the event successfully concludes.
                  </p>
                </div>

                <div className="pt-4 space-y-4">
                  <button 
                    onClick={() => navigate('/events/create/review')}
                    className="w-full py-4 bg-primary text-white font-label-caps text-label-caps rounded-xl shadow-lg hover:scale-[1.02] active:scale-95 transition-all"
                  >
                    CONTINUE TO REVIEW
                  </button>
                  <button className="w-full py-4 bg-transparent border border-outline text-on-surface-variant font-label-caps text-label-caps rounded-xl hover:bg-surface-container transition-all">
                    SAVE AS DRAFT
                  </button>
                </div>
              </div>
            </div>
          </aside>
        </div>
      </main>
    </div>
  );
}
