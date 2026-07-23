import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { getEvents } from '../../services/api';

const ExplorePage = () => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const data = await getEvents();
        setEvents(data);
      } catch (error) {
        console.error("Failed to fetch events", error);
      } finally {
        setLoading(false);
      }
    };
    fetchEvents();
  }, []);

  useEffect(() => {
    const handleMouseMove = (e) => {
      const cards = document.querySelectorAll('.hover-parallax');
      cards.forEach(card => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        
        const moveX = (x - centerX) / 50;
        const moveY = (y - centerY) / 50;
        
        const img = card.querySelector('img, .bg-image-layer');
        if (img) {
          img.style.transform = `scale(1.05) translate(${moveX}px, ${moveY}px)`;
        }
      });
    };

    const handleMouseLeave = (e) => {
      const cards = document.querySelectorAll('.hover-parallax');
      cards.forEach(card => {
        const img = card.querySelector('img, .bg-image-layer');
        if (img) {
          img.style.transform = `scale(1) translate(0, 0)`;
        }
      });
    };

    const container = document.querySelector('.parallax-container');
    if (container) {
      container.addEventListener('mousemove', handleMouseMove);
      container.addEventListener('mouseleave', handleMouseLeave);
    }

    return () => {
      if (container) {
        container.removeEventListener('mousemove', handleMouseMove);
        container.removeEventListener('mouseleave', handleMouseLeave);
      }
    };
  }, []);

  return (
    <div className="max-w-7xl mx-auto px-container-margin py-stack-lg parallax-container">
      {/* Hero Section: Recommended For You */}
      <section className="mb-stack-lg">
        {events.length > 0 && (
          <div className="relative w-full h-[600px] overflow-hidden rounded-xl shadow-[0_16px_32px_-8px_rgba(10,25,47,0.08)] group cursor-pointer hover-parallax">
            <div 
              className="bg-image-layer absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-105" 
              style={{ backgroundImage: `url('${events[0].imageUrl || events[0].image}')` }}
            />
            <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/80 opacity-60"></div>
            <div className="absolute bottom-0 left-0 p-12 w-full md:w-3/4">
              <span className="inline-block px-4 py-1 bg-secondary text-on-secondary font-label-caps text-label-caps mb-4">
                RECOMMENDED FOR YOU
              </span>
              <h1 className="font-display-lg text-display-lg text-white mb-4">
                {events[0].title}
              </h1>
              <p className="text-white/90 font-body-lg text-body-lg mb-8 max-w-2xl">
                {events[0].description}
              </p>
              <div className="flex gap-4 flex-wrap">
                <button className="bg-white text-primary font-label-caps text-label-caps px-8 py-4 hover:bg-surface-container transition-colors rounded">
                  Request Invitation
                </button>
                <button className="border border-white text-white font-label-caps text-label-caps px-8 py-4 hover:bg-white/10 transition-colors rounded">
                  View Details
                </button>
              </div>
            </div>
          </div>
        )}
      </section>

      {/* Content Grid: Trending & Community Pulse */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-stack-md">
        
        {/* Left: Trending Events (8 cols) */}
        <div className="lg:col-span-8 space-y-stack-md">
          <div className="flex justify-between items-end border-b border-surface-container pb-4">
            <h2 className="font-display-lg text-display-lg-mobile md:text-headline-md">Trending Events</h2>
            <Link to="/map" className="font-label-caps text-label-caps text-secondary hover:underline transition-all">
              VIEW ALL CALENDAR
            </Link>
          </div>
          
          {/* Bento Grid Layout for Events */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-gutter">
            {loading ? (
              <p className="text-on-surface-variant font-body-md py-4">Curating experiences...</p>
            ) : (
              events.slice(1).map((event, index) => (
                <div key={event.id || index} className={`${index === 2 ? 'md:col-span-2 flex-col md:flex-row' : 'flex-col'} bg-surface-container-lowest rounded-xl shadow-[0_16px_32px_-8px_rgba(10,25,47,0.08)] overflow-hidden flex group transition-all duration-300 hover:-translate-y-1 hover-parallax`}>
                  <div className={`${index === 2 ? 'md:w-1/2 h-64 md:h-auto' : 'h-48'} relative overflow-hidden`}>
                    <img 
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110 bg-image-layer" 
                      alt={event.title} 
                      src={event.imageUrl || event.image}
                    />
                    {index !== 2 && (
                      <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-sm shadow-sm">
                        <p className="font-label-caps text-[10px] text-primary">{event.date}</p>
                      </div>
                    )}
                  </div>
                  <div className={`${index === 2 ? 'md:w-1/2 p-8 flex flex-col justify-center' : 'p-6 flex-grow flex flex-col'}`}>
                    <p className="font-label-caps text-label-caps text-secondary mb-2">{event.category || event.eventType}</p>
                    <h3 className={`${index === 2 ? 'font-display-lg text-headline-md mb-4' : 'font-headline-sm text-headline-sm mb-3'}`}>{event.title}</h3>
                    
                    {index === 2 ? (
                      <p className="text-on-surface-variant mb-6 font-body-md">{event.description}</p>
                    ) : (
                      <div className="flex items-center gap-4 text-on-surface-variant mb-6">
                        <div className="flex items-center gap-1">
                          <span className="material-symbols-outlined text-[18px]">location_on</span>
                          <span className="text-xs font-label-caps">{event.location}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <span className="material-symbols-outlined text-[18px]">group</span>
                          <span className="text-xs font-label-caps">{event.attendees} Members attending</span>
                        </div>
                      </div>
                    )}

                    <div className={index === 2 ? "flex items-center justify-between mt-auto" : "mt-auto"}>
                      {index === 2 && (
                        <div className="flex -space-x-3 overflow-hidden">
                          <div className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-surface-container ring-2 ring-white z-10">
                            <span className="text-[10px] font-bold">+{event.attendees || 0}</span>
                          </div>
                        </div>
                      )}
                      <button className={index === 2 ? "bg-primary text-on-primary font-label-caps text-label-caps px-6 py-2 rounded" : "w-full py-3 border border-secondary text-secondary font-label-caps text-label-caps hover:bg-secondary hover:text-white transition-all rounded"}>
                        {index === 2 ? "Attend" : "Join Interest List"}
                      </button>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>

        {/* Right: Community Pulse (4 cols) */}
        <aside className="lg:col-span-4 space-y-stack-md">
          <div className="bg-surface-container-low p-8 rounded-xl border border-surface-container-high h-full">
            <h2 className="font-headline-sm text-headline-sm mb-6 pb-4 border-b border-outline-variant/30">
              Community Pulse
            </h2>
            <div className="space-y-6">
              
              {/* Activity 1 */}
              <div className="flex gap-4">
                <div className="flex-shrink-0 w-10 h-10 rounded-full overflow-hidden">
                  <img className="w-full h-full object-cover" alt="Julian" src="https://lh3.googleusercontent.com/aida-public/AB6AXuBv7jugfqW78ewZuJSqxP2Syy2PvZVnUdd4wxwyDfy1iKfK9CcVCGA0yHBpL_RLVdK18hGnGSXy_YniHD-GbXSKbzSQDhvcSb9JIF9LOT5bycqHbg7j8qN8xIUD1gNl2FhI1EL-iQnvcS_DZBPC6IDW76JJO8NjMoR53nXOYmPnPIde9CQ7LKs5EFr0dDIS3PmjaidPg_M-ItA3GzmZWMvpQBItEt0c8cy0A9iRbrtxa6u1lek8KIjHug"/>
                </div>
                <div>
                  <p className="text-sm font-body-md leading-relaxed">
                    <span className="font-bold">Julian Vane</span> is attending <span className="text-secondary font-medium italic">Equestrian Polo Cup</span> next weekend.
                  </p>
                  <span className="text-[10px] font-label-caps text-outline uppercase mt-1 block">2 hours ago</span>
                </div>
              </div>

              {/* Activity 2 */}
              <div className="flex gap-4">
                <div className="flex-shrink-0 w-10 h-10 rounded-full overflow-hidden">
                  <img className="w-full h-full object-cover" alt="Eleanor" src="https://lh3.googleusercontent.com/aida-public/AB6AXuCdr2d3Qxa_CT4Hp4u-b8gQS8_sn8a1ZMDRVSSrNcISA6cF_qBGOMyqhoNbLcoOzyLe4-KFbXLAlF0rUoX9sAqausGmIFPPBI6HT-o0_NE4DrSOmWRSB_1INPRSUzmWJiskihxs4Ko1IkzUXCZCzqdrxzy_MaQF3HGv6JxcapHuqrqI1ibXkVUZ1lnhg3-xd4rVj3xYbZLNzmfgnwtDMqjE7dMTAu9PAXPN4djl6Lbc3cuVSRQ5a8Q6wA"/>
                </div>
                <div>
                  <p className="text-sm font-body-md leading-relaxed">
                    <span className="font-bold">Eleanor Rigby</span> shared 4 new photos from the <span className="text-secondary font-medium italic">Opera Night</span>.
                  </p>
                  <span className="text-[10px] font-label-caps text-outline uppercase mt-1 block">5 hours ago</span>
                  <div className="grid grid-cols-2 gap-2 mt-3">
                    <div className="h-20 rounded-lg overflow-hidden bg-surface-container-highest">
                      <img className="w-full h-full object-cover" alt="Opera detail" src="https://lh3.googleusercontent.com/aida-public/AB6AXuBzpjyiKc7jShQefmVe4sff8LWHndc7GSorDbzati-TpQuQVNGxD93lWEQaM5VWxyAfVEI3VvcFK8DFIHyYflaevs7QIFm5-pA9U_6pqiTqPqfdEC9MHZTZkoBL77C7IVrpEy4nQAlMdGzfyFMu7fS7i3Oi2wYKuFe7W4F8lu5hQY-UfxdWyay0BxonZWMOUD3VNSn-CCYJtxhzKXUk4PtlRRS1NFLye6Dze_Y9SgIbCtf6Gs-dcZfUJw"/>
                    </div>
                    <div className="h-20 rounded-lg overflow-hidden bg-surface-container-highest">
                      <img className="w-full h-full object-cover" alt="Opera chandelier" src="https://lh3.googleusercontent.com/aida-public/AB6AXuCpM6ACClF22zakbwyO50-BFno9LeQhuJ-8T3vgmAwSwHh9hIm5K8avnUjmFJfp2sVpaSoVMQnrQQzGA8DQOqHkjo2LyngYEYsdllueD-RzUrQNWSciFotDXn84Et6xfsRIdCbkb3zgZ-cCwFg7fojqR2W7swdoCA2xAt2ZAhHeBTY5RDafFrRQOxluPiKuiFPzFwe2Fc7m1VR6ORLRg_AqUVt8Vqiqa_f2GnvBtQgToShWWebr6OqZSQ"/>
                    </div>
                  </div>
                </div>
              </div>

              {/* Activity 3 */}
              <div className="flex gap-4">
                <div className="flex-shrink-0 w-10 h-10 rounded-full overflow-hidden">
                  <img className="w-full h-full object-cover" alt="Marcus" src="https://lh3.googleusercontent.com/aida-public/AB6AXuADL1r6qRIc9DH-c8zDZh1MjIlyI7srSsIr4wjzZisxQJLUxb8KiUeMRul1bntErXPOY-5JtTTxQm9kkNtWx2K2vnhJL3K8byGkrU6Wan6hDRyZD3D0RQf1J4JnXGWZPUn9Ux_7nOwkF73H3-iZTnaCNZ1bRse4OSjtKmym74wIgt6ryX9ZlRxjdyW7KmbBHC6V0lHxelQrS5dfYs9Ac9SLTjR8snzyeCCJGWmxTHib5voO7noky19kZg"/>
                </div>
                <div>
                  <p className="text-sm font-body-md leading-relaxed">
                    <span className="font-bold">Marcus Sterling</span> started a new thread in <span className="text-secondary font-medium italic">Private Dining Circles</span>.
                  </p>
                  <span className="text-[10px] font-label-caps text-outline uppercase mt-1 block">Yesterday</span>
                </div>
              </div>

            </div>

            {/* Discovery Suggestions */}
            <div className="mt-12 pt-8 border-t border-outline-variant/30">
              <h4 className="font-label-caps text-label-caps text-outline mb-4">MEMBERS YOU MAY KNOW</h4>
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-surface-container-highest overflow-hidden">
                      <img className="w-full h-full object-cover" alt="Clara" src="https://lh3.googleusercontent.com/aida-public/AB6AXuB9pc0jAyHrNqYnrVzQ-yrVMpznlautjQtpu82_dc4udrwoi4gAdcTauTwii4LXhZH10WfMix-HixK-YyniSuvCaJSTb2Gma7U7xF4Cb-SGtuPCeZlPbSXdyC0yfnRmle0UPhilKZANxZVtxfWniC1UqvEnSi7PlEQaT-LkJh7dW346jZvHEGWr6iTkhrGUJlP30yyNhdHZOh6ze6s0wgqum6obW_7PQ8tIylEEBZ1_C-NewtlyWT0rpA"/>
                    </div>
                    <span className="text-sm font-medium">Clara Oswald</span>
                  </div>
                  <button className="text-secondary text-xs font-bold hover:underline transition-all">FOLLOW</button>
                </div>
                
                <div className="flex justify-between items-center">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-surface-container-highest overflow-hidden">
                      <img className="w-full h-full object-cover" alt="Arthur" src="https://lh3.googleusercontent.com/aida-public/AB6AXuCSbv7Dif0NFO4ji8E_FkjPS1fef-jPxxsMN_euUbnkf9DRKYE-3u7vYgG5QRdDKNBSmj5wB__g085b-_DKYgIQ0pGutZSFmdHq7tB4xcU-5NXjCvtmV4ECxP9PuGPdT_7vnXEwUrutvNccRv_OvZpspBhbZYb9IUHmyc3A34pB-Ezh2k2oFAnfKl-X44wm3jdE7Tt9E7IhIM9SEiAyvXGzr5QNwWFN9ADiQBH1Fq0vIoZrGDvyYv690A"/>
                    </div>
                    <span className="text-sm font-medium">Arthur Dent</span>
                  </div>
                  <button className="text-secondary text-xs font-bold hover:underline transition-all">FOLLOW</button>
                </div>
              </div>
              <button className="w-full mt-6 py-2 bg-surface-container-highest text-primary font-label-caps text-label-caps text-[10px] hover:bg-surface-container transition-colors rounded">
                SEE MORE CIRCLES
              </button>
            </div>
          </div>
        </aside>

      </div>
    </div>
  );
};

export default ExplorePage;
