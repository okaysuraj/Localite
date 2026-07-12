import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

const MOCK_MESSAGES = [
  {
    id: 1,
    type: 'system',
    text: 'EVENT UPDATED: ATTIRE NOW BLACK TIE PREFERRED',
    timestamp: '10:20 AM'
  },
  {
    id: 2,
    type: 'user',
    user: {
      id: 'u1',
      username: 'Alistair Vance',
      profileImageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuADQ9bgKFcfpNyouo5OKpdFlxHwx7fYAVGecFliVWomFBuLEpNTAYDwCG8_76IHwTrXbfMjO9lBbZxsNZn3wSh5gjTpvwSQuo_EuFpFfyygp2MZ8BhY11B3_UdV3N_AFn8uvyTPhjJQtcqRUDFryCzjdQJoVRKk7UHsEC4qF4W9FuMx0KJliLutrpRDKWCp5wcrT8K8vzmXv8JwCVqpa9VGjdyJbAlwSaOeKrtO80CfJJC3acwtzw1KaA'
    },
    text: 'Has everyone received their digital invitations? The QR codes are required for the garden gate entry tonight.',
    timestamp: '10:24 AM'
  },
  {
    id: 3,
    type: 'user',
    user: {
      id: 'u2',
      username: 'Clara Vane',
      profileImageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDGTYV2etOd9L4fEvgXZaJ5PfcciZYXchbk32_602_iayjE_ujQMsRDJVcMruNHGX42bCxIdbtjMJp3cYsaUwCA_zt0M4j4xq06iIGnW_cBeMAQnNsw8Iw3l1wSGyfQnYLp6R5_KML4hRgVzHYuFdIQVpiWSVa6aRy5gRvBja4Gu1E_hxZd9L_McmmK90Tuuak1vQYa-W25CFG_iNKFz8DM9EwlGfkflisvB_8aa_Nxxku6qS2MGIDOpg'
    },
    text: '"The garden looks divine this morning. The lanterns are already being positioned among the willows. Truly a scene from a dream."',
    imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAtEEr0W_fmj-2X_p3UejsGGgOeS2cG9cImPbyzZAMGlk9vzHYHsShyY326BKdhhdapQ1lA8axbKDU691gsb10E3zqZcCAwXgTeA7aaf2h98n6hWo9gnZBZVAbKQjd-530LWrcbv_vS6ll19zgBZE9BUHy_RjCSUguIlzwsT6Y6k_yuC5sRFBs1vG3XgbHdDnMrWRSS4BiGZoZ4pmtrlWCSMppwVWWCbCCP2Qxomi9Wsav-3wNESbHQ3g',
    timestamp: '10:31 AM'
  },
  {
    id: 4,
    type: 'me',
    user: {
      id: 'me',
      username: 'You',
      profileImageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuApAQ90Ms3pixqatw9uSQN5CsOI8RhysP54TyA4bgfKllBl0TCMmKYrZrnxZGlkrGiJSmsv9L9B2EElNXx900PzEgQGnBXxnTovIZtq0ZZBs0F04bAYXXhestQ2j2ZN79BXcWiY85qY4zG83ojP9aGHV4N8GMpjiplWkgTDQNu7WeI4GtDCY629hTfB071UDqBSg5AlWS9NiQqb-JBm7u79HmMvDmq4kK6MbEULCMZ8xq49TdjjJJRtrg'
    },
    text: "Exquisite, Clara. I'll be arriving with the floral arrangements by 6 PM. Can't wait to see it in person.",
    timestamp: '10:45 AM'
  },
  {
    id: 5,
    type: 'date',
    text: 'WEDNESDAY, OCTOBER 12'
  },
  {
    id: 6,
    type: 'system_log',
    text: 'Julian Thorne added Marcus Aurelius to the group'
  }
];

export default function EventGroupChatPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [message, setMessage] = useState('');

  return (
    <div className="flex flex-col md:flex-row min-h-[calc(100vh-80px)] bg-background max-w-7xl mx-auto border-x border-surface-variant/30">
      
      {/* Left Pane (Hidden on Mobile) */}
      <aside className="hidden lg:flex flex-col w-[380px] border-r border-surface-variant/30 bg-surface-container-lowest">
        <div className="p-6 border-b border-surface-variant/30">
          <div className="flex items-center gap-4 cursor-pointer hover:opacity-80" onClick={() => navigate(`/event/${id}`)}>
            <span className="material-symbols-outlined text-secondary">arrow_back</span>
            <h2 className="font-headline-sm text-headline-sm text-primary">Back to Event</h2>
          </div>
        </div>
        
        <div className="p-6 flex-grow">
          <h3 className="font-label-caps text-on-surface-variant mb-4">EVENT GROUP</h3>
          <div className="flex items-center gap-4 p-4 rounded-xl bg-white shadow-sm border border-secondary transition-all">
            <div className="relative w-12 h-12 flex-shrink-0">
              <div className="absolute inset-0 rounded-full border border-surface-container-highest overflow-hidden z-10 bg-secondary">
                <img className="w-full h-full object-cover opacity-80" src="https://lh3.googleusercontent.com/aida-public/AB6AXuBblH0PKPWYe2PNKmkQUOqIh5s13e3V38zt__lJwihjx0wHcYapGsjYJbgF5_wiW6VfK4rukyBFnA7eOvuJhtFTmaJ-Trcdp7QGg1GJNbhXxUJgTj02ma2XG0GPGVMAuQLv5sEcYhAOZW0xXbfHOJkId5IG94rKgVxSUBvB3q4JCfhCvHkhIxRDoMMqChjYMEAxWjFTDOFE1R6qNPm2-joSQgFZ2N6pYn710M8F7CkyYPG-_8rrk1NAsg" alt="Group" />
              </div>
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex justify-between items-start">
                <h3 className="font-body-md font-bold text-primary truncate">The Midnight Conservatory Soiree</h3>
              </div>
              <p className="text-body-md text-secondary truncate font-medium">Clara Vane: The garden looks divine...</p>
            </div>
          </div>
        </div>
      </aside>

      {/* Right Pane: Chat Interface */}
      <section className="flex flex-col flex-1 relative bg-white">
        <header className="px-container-margin py-4 flex items-center justify-between border-b border-surface-container/50 bg-white/90 backdrop-blur-md z-10">
          <div className="flex items-center gap-4">
            <button className="lg:hidden p-2 -ml-2" onClick={() => navigate(`/event/${id}`)}>
              <span className="material-symbols-outlined text-primary">arrow_back</span>
            </button>
            <div className="flex -space-x-3 items-center">
              <div className="w-10 h-10 rounded-full border-2 border-white overflow-hidden bg-surface-container z-20">
                <img className="w-full h-full object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuD6YM4gYgEQOeArG7LRZUu9H8YqE8q6AHLTvek7WwHUySITQ7buzF6qOUizIB_QDiJW77F_RA6hLHA-vF1YvMWCbOm-wq3zJKdLzzrYJiH_L7BvkVWE2iAPhdXTaJtEtL8lwRouWeFIEVSyvX9S-9AR5X9IhRAhybqFA_uNfenUqghwkrpexnMbAX1PtZpjTQoSkkZtw3TVjrZHJ862L4aaz_EPOXuEHLykwkIK7BCNDkT9OZft0Spovw" alt="Participant" />
              </div>
              <div className="w-10 h-10 rounded-full border-2 border-white overflow-hidden bg-surface-container z-10">
                <img className="w-full h-full object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuA-wUWWPiUJFbdWTbfAKzwJsZJeo0ZfNIgSV6cKtLweWcEFqegsmE6B4Gubqho_xAPSc-CBYnGgYYMbt3Jnumg5Gwz47XxMXn53WyOvrrWoPCjU6y5jlahMm7YsxQffdl6JW8U2PSfc1GZ_V4yWriZzjj2yUPctpLZyt7rNM7U-S8ME3yMo1C84mEeqgvkTAY1ovKsQ92xuConSR4153ng5e5ZfyjJV2Vq6jEu1oU0PyNGUDqlqau0hNQ" alt="Participant" />
              </div>
              <div className="w-10 h-10 rounded-full border-2 border-white bg-secondary flex items-center justify-center text-[10px] text-white font-bold z-0">
                +22
              </div>
            </div>
            <div>
              <h1 className="font-headline-sm text-headline-sm text-primary leading-tight">The Midnight Conservatory Soiree</h1>
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-green-500"></span>
                <span className="font-label-caps text-[10px] text-on-surface-variant">24 MEMBERS ONLINE</span>
              </div>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <button className="w-10 h-10 rounded-full flex items-center justify-center hover:bg-surface-container-low transition-colors text-on-surface-variant">
              <span className="material-symbols-outlined">search</span>
            </button>
            <button className="w-10 h-10 rounded-full flex items-center justify-center hover:bg-surface-container-low transition-colors text-on-surface-variant">
              <span className="material-symbols-outlined">more_vert</span>
            </button>
          </div>
        </header>

        <div className="flex-1 overflow-y-auto p-6 space-y-6 custom-scrollbar" style={{backgroundImage: "url('https://www.transparenttextures.com/patterns/natural-paper.png')"}}>
          {MOCK_MESSAGES.map((msg, idx) => {
            if (msg.type === 'system') {
              return (
                <div key={idx} className="flex justify-center sticky top-2 z-10">
                  <div className="bg-primary text-white px-6 py-2 rounded-full flex items-center gap-3 shadow-xl transition-all">
                    <span className="material-symbols-outlined text-[18px]">info</span>
                    <span className="font-label-caps text-[11px] tracking-widest uppercase">{msg.text}</span>
                  </div>
                </div>
              );
            }
            
            if (msg.type === 'date') {
              return (
                <div key={idx} className="flex items-center gap-4 py-4">
                  <div className="h-[1px] flex-1 bg-surface-container-highest"></div>
                  <span className="font-label-caps text-[10px] text-on-surface-variant">{msg.text}</span>
                  <div className="h-[1px] flex-1 bg-surface-container-highest"></div>
                </div>
              );
            }

            if (msg.type === 'system_log') {
              return (
                <div key={idx} className="text-center my-4">
                  <p className="font-label-caps text-[10px] text-outline italic uppercase tracking-widest">{msg.text}</p>
                </div>
              );
            }

            if (msg.type === 'user') {
              return (
                <div key={idx} className="flex items-end gap-3 max-w-[80%]">
                  <div className="w-8 h-8 rounded-full overflow-hidden flex-shrink-0">
                    <img className="w-full h-full object-cover" src={msg.user.profileImageUrl} alt={msg.user.username} />
                  </div>
                  <div className="space-y-2">
                    <span className="font-label-caps text-[10px] text-on-surface-variant ml-2 mb-1 block uppercase">{msg.user.username} • {msg.timestamp}</span>
                    <div className={`bg-surface-container-low text-on-surface ${msg.imageUrl ? 'p-1' : 'p-4'} rounded-2xl rounded-bl-none shadow-sm`}>
                      {msg.imageUrl && (
                        <div className="relative rounded-xl overflow-hidden aspect-[16/9] mb-3">
                          <img className="w-full h-full object-cover" src={msg.imageUrl} alt="Attachment" />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent"></div>
                        </div>
                      )}
                      <div className={msg.imageUrl ? 'p-3' : ''}>
                        <p className={`text-body-md ${msg.imageUrl ? 'italic' : ''}`}>{msg.text}</p>
                      </div>
                    </div>
                  </div>
                </div>
              );
            }

            if (msg.type === 'me') {
              return (
                <div key={idx} className="flex items-end gap-3 max-w-[80%] ml-auto flex-row-reverse">
                  <div className="w-8 h-8 rounded-full overflow-hidden flex-shrink-0">
                    <img className="w-full h-full object-cover" src={msg.user.profileImageUrl} alt={msg.user.username} />
                  </div>
                  <div className="flex flex-col items-end">
                    <span className="font-label-caps text-[10px] text-on-surface-variant mr-2 mb-1 block uppercase">YOU • {msg.timestamp}</span>
                    <div className="bg-primary text-white p-4 rounded-2xl rounded-br-none shadow-sm">
                      <p className="text-body-md">{msg.text}</p>
                    </div>
                  </div>
                </div>
              );
            }

            return null;
          })}
        </div>

        <footer className="p-6 bg-white border-t border-surface-container/50">
          <div className="flex items-center gap-4 max-w-5xl mx-auto">
            <button className="w-12 h-12 flex-shrink-0 rounded-full border border-outline-variant flex items-center justify-center text-on-surface-variant hover:bg-surface-container-low transition-colors">
              <span className="material-symbols-outlined">add</span>
            </button>
            <div className="flex-1 relative">
              <textarea 
                className="w-full bg-surface-container-low border-none rounded-2xl px-6 py-3.5 text-body-md focus:ring-1 focus:ring-secondary-fixed-dim resize-none transition-all pr-12 outline-none" 
                placeholder="Craft a message..." 
                rows="1"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
              ></textarea>
              <button className="absolute right-3 top-3 material-symbols-outlined text-on-surface-variant hover:text-secondary transition-colors">
                sentiment_satisfied
              </button>
            </div>
            <button className="w-12 h-12 flex-shrink-0 rounded-full bg-primary text-white flex items-center justify-center hover:opacity-90 active:scale-95 transition-all shadow-md">
              <span className="material-symbols-outlined" style={{fontVariationSettings: "'FILL' 1"}}>send</span>
            </button>
          </div>
        </footer>
      </section>
    </div>
  );
}
