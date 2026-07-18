import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function MyEventsPage() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('joined'); // 'joined' or 'hosted'

  return (
    <div className="bg-[#fbf9f8] text-[#1b1c1c] font-body-md min-h-screen selection:bg-[#fed488] selection:text-[#785a1a]">
      {/* TopNavBar */}
      <nav className="bg-[#fbf9f8] w-full h-20 shadow-sm flex sticky top-0 z-50">
        <div className="flex justify-between items-center px-8 max-w-7xl mx-auto w-full">
          <div className="flex items-center gap-8">
            <span className="font-display-lg text-4xl font-bold text-primary cursor-pointer" onClick={() => navigate('/')}>Localite</span>
            <div className="hidden md:flex items-center bg-[#f5f3f3] px-4 py-2 rounded-full w-64 border border-[#c5c6cd]/30">
              <span className="material-symbols-outlined text-[#75777e] text-sm">search</span>
              <input className="bg-transparent border-none focus:ring-0 text-sm ml-2 w-full outline-none" placeholder="Search experiences..." type="text"/>
            </div>
          </div>
          <div className="hidden md:flex items-center gap-8">
            <a className="text-[#44474d] hover:text-[#775a19] transition-colors duration-300 font-label-caps text-[12px] uppercase font-bold tracking-widest cursor-pointer" onClick={() => navigate('/events')}>Discover</a>
            <a className="text-primary border-b-2 border-[#775a19] pb-1 font-bold hover:text-[#775a19] transition-colors duration-300 font-label-caps text-[12px] uppercase tracking-widest cursor-pointer">Events</a>
            <a className="text-[#44474d] hover:text-[#775a19] transition-colors duration-300 font-label-caps text-[12px] uppercase font-bold tracking-widest cursor-pointer" onClick={() => navigate('/team/formation')}>Members</a>
          </div>
          <div className="flex items-center gap-6">
            <div className="flex gap-4 items-center mr-4 text-[#44474d]">
              <span className="material-symbols-outlined cursor-pointer hover:text-primary transition-colors">notifications</span>
              <span className="material-symbols-outlined cursor-pointer hover:text-primary transition-colors">mail</span>
            </div>
            <button className="hidden lg:block bg-primary text-white font-label-caps text-[12px] uppercase font-bold tracking-widest px-6 py-3 rounded-full hover:opacity-80 transition-opacity" onClick={() => navigate('/events/create')}>
              Create Event
            </button>
            <div className="w-10 h-10 rounded-full bg-[#eae8e7] overflow-hidden border border-[#c5c6cd] cursor-pointer" onClick={() => navigate('/profile/setup/final')}>
              <img className="w-full h-full object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuDa0EkDqxkUbyq0DjQp9Zf4sDn9siuGVAwLlCRNHHLfKktUtaqupYb9uoBnIUYdHEQLROm7QqiEA-GaeVYENejQ9KWplz79P2AlB6dWifrT9VJB14NX_7NDNzy9uZPq7LMaw0j_S39K7NESGY9a-PuLTE8XJfwr92w0zO-ZK0NmgGsaBP5vy7phqqEYYCuImY6s0Gy5DLL05PW8XdYU7Kba3nGT6sC_p_zbzBR0b3Op2J8ZgXX6HkAwMQ" alt="Avatar"/>
            </div>
          </div>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto px-8 py-12">
        {/* Header Section */}
        <header className="mb-12 flex flex-col md:flex-row md:items-end justify-between gap-8">
          <div>
            <span className="font-label-caps text-[12px] font-bold text-[#775a19] uppercase tracking-[0.2em] block mb-2">Concierge Services</span>
            <h1 className="font-display-lg text-5xl font-bold text-primary">Your Collection</h1>
            <p className="text-[#44474d] max-w-xl mt-4 text-lg">
              A curated archive of the gatherings you’ve shaped and the moments you’ve shared with the Localite community.
            </p>
          </div>
          {/* Filter Tabs */}
          <div className="flex items-center border-b border-[#c5c6cd]/30 pb-1">
            <button 
              className={`px-6 py-2 font-label-caps text-[12px] font-bold uppercase tracking-widest transition-all ${activeTab === 'joined' ? 'text-primary border-b-2 border-[#775a19]' : 'text-[#44474d] hover:text-primary'}`}
              onClick={() => setActiveTab('joined')}
            >
              Joined
            </button>
            <button 
              className={`px-6 py-2 font-label-caps text-[12px] font-bold uppercase tracking-widest transition-all ${activeTab === 'hosted' ? 'text-primary border-b-2 border-[#775a19]' : 'text-[#44474d] hover:text-primary'}`}
              onClick={() => setActiveTab('hosted')}
            >
              Hosted
            </button>
          </div>
        </header>

        {/* Upcoming Section */}
        <section className="mb-12">
          <div className="flex items-center gap-4 mb-6">
            <h2 className="font-headline-md text-3xl font-bold text-primary">Upcoming</h2>
            <div className="h-px bg-[#c5c6cd]/30 flex-grow"></div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            
            {/* Card 1 */}
            <div className="bg-white rounded-xl shadow-sm hover:shadow-lg transition-all duration-500 flex flex-col group overflow-hidden border border-[#eae8e7]">
              <div className="relative h-64 overflow-hidden">
                <img className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" src="https://lh3.googleusercontent.com/aida-public/AB6AXuAiPdmoZLckiRcnNGN4Ki_Atv5U_KWKvsmej29uz8jzTdD72hXiMWJwNfvbo2xhVTl5UFILCJRa-V0LZYRymA7nQQL55y4HZo8x7YsEfFFIsfwS5_07G8x9N9_xRXG87rlmRgC9OV_8dCHVUJ7hBj0HuUU5wFJD14tIamPYANh-CFd2pdeHPItb2NFJsGafqQude62zaL5QP9FGnu8-MP3IzPe7KwiF1YMTTvasuyWFoH5narTt3NnpSQ" alt="Event" />
                <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-md px-3 py-1 rounded text-center">
                  <span className="block font-bold text-primary text-sm">OCT</span>
                  <span className="block font-display-lg text-2xl font-bold text-[#775a19] -mt-1">24</span>
                </div>
              </div>
              <div className="p-6 flex flex-col flex-grow">
                <div className="flex items-center justify-between mb-4">
                  <span className="font-label-caps text-[10px] font-bold text-[#775a19] border border-[#775a19] px-2 py-0.5 rounded-full uppercase tracking-widest">Private View</span>
                  <div className="flex items-center gap-2">
                    <div className="w-6 h-6 rounded-full bg-[#efeded] overflow-hidden">
                      <img className="w-full h-full object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuCassujntCvpk8-EiX4JGWN55iN8xqY8aJyO1iqQfgoX4nQdZGrJv7kdzjnR8AP0MEXk24QDjaJYZ1qPTKI0JQ2yPc56OrqqA-ET2VCY3zbJRnQrkFbm97k1rm7TxbBtesK52k8b7PtUPUW836qgDkOsLNMwTtkp-npQdePhWW4jg-RdLePzZOnLmYyuJrz15M7YU_gN6A3CAna9Pl5buwPG3Qyfzcb_ja-p8RzBLSspttSdJVQogo5HQ" alt="Host"/>
                    </div>
                    <span className="font-label-caps text-[10px] font-bold uppercase tracking-widest text-[#44474d]">Host: Arthur P.</span>
                  </div>
                </div>
                <h3 className="font-headline-sm text-2xl font-bold text-primary mb-2">The Abstract Vernissage</h3>
                <p className="text-[#44474d] text-sm line-clamp-2 mb-6">
                  Join us for an exclusive evening at the Vanguard Collective as we unveil a new series by emerging modernist painters.
                </p>
                <div className="mt-auto pt-6 border-t border-[#efeded] flex items-center justify-between">
                  <div className="flex items-center text-[#44474d]">
                    <span className="material-symbols-outlined text-sm mr-1">location_on</span>
                    <span className="font-label-caps text-[10px] font-bold uppercase tracking-widest">Vanguard Gallery, Chelsea</span>
                  </div>
                  <button className="text-primary font-label-caps text-[10px] font-bold uppercase tracking-widest hover:text-[#775a19] transition-colors" onClick={() => navigate('/events/1')}>Details →</button>
                </div>
              </div>
            </div>

            {/* Card 2 */}
            <div className="bg-white rounded-xl shadow-sm hover:shadow-lg transition-all duration-500 flex flex-col group overflow-hidden border border-[#eae8e7]">
              <div className="relative h-64 overflow-hidden">
                <img className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" src="https://lh3.googleusercontent.com/aida-public/AB6AXuDHha-9GCibKlz3qhaOGkteTbedtoe3SkzwZ97o7pJMOL6cpfKX1xLexk1HfRpTZUTs2Am7KW5mTUp0X4CXHCYOSoqwLNB4zoIm3cOnQgc_7uwBEBbhtAsudFPm_bC8wkBU-_4F5hW9fjpxkMbykLgqjmv7qL9tvzUxLdgiQ02mhR-ectHR4zGGto-agQBS9HWKiYMVUX5Pzo1xM6NkUzBB1tRKDiVdCMMaFvCRDSPxIIYr0ZiTF7JOEw" alt="Event"/>
                <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-md px-3 py-1 rounded text-center">
                  <span className="block font-bold text-primary text-sm">NOV</span>
                  <span className="block font-display-lg text-2xl font-bold text-[#775a19] -mt-1">02</span>
                </div>
              </div>
              <div className="p-6 flex flex-col flex-grow">
                <div className="flex items-center justify-between mb-4">
                  <span className="font-label-caps text-[10px] font-bold text-[#775a19] border border-[#775a19] px-2 py-0.5 rounded-full uppercase tracking-widest">Supper Club</span>
                  <div className="flex items-center gap-2">
                    <div className="w-6 h-6 rounded-full bg-[#efeded] overflow-hidden">
                      <img className="w-full h-full object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuCnUjme56zW6L_BTSTsiBhFn2fSEO2yZXzo8KCPjC72hJ9ehlgJD_QtgUoCJJi95h44Z-LY_kBGH7PdB2cJrvFDazOCzEd-PYVuNxetAotHaY3BNmCyEJAnjk34CNYt01YSNwPGKyNzVeYddbdHgvsUVJdpd68flulohtjuECIM3ZHOTViSxu75aGYfisPzR3pXeHhs5OinbsUEOjDmpmou2v-H3QxN961gy9eVVYdsaNzZr-a6EMfRAg" alt="Host"/>
                    </div>
                    <span className="font-label-caps text-[10px] font-bold uppercase tracking-widest text-[#44474d]">Host: Elena M.</span>
                  </div>
                </div>
                <h3 className="font-headline-sm text-2xl font-bold text-primary mb-2">Autumnal Forage & Feast</h3>
                <p className="text-[#44474d] text-sm line-clamp-2 mb-6">
                  A farm-to-table culinary journey celebrating the harvest season with a five-course tasting menu paired with heritage wines.
                </p>
                <div className="mt-auto pt-6 border-t border-[#efeded] flex items-center justify-between">
                  <div className="flex items-center text-[#44474d]">
                    <span className="material-symbols-outlined text-sm mr-1">location_on</span>
                    <span className="font-label-caps text-[10px] font-bold uppercase tracking-widest">The Walled Garden</span>
                  </div>
                  <button className="text-primary font-label-caps text-[10px] font-bold uppercase tracking-widest hover:text-[#775a19] transition-colors">Details →</button>
                </div>
              </div>
            </div>

            {/* Card 3 - Conditionally show based on tab */}
            {activeTab === 'hosted' ? (
              <div className="bg-[#000] rounded-xl shadow-sm hover:shadow-lg transition-all duration-500 flex flex-col p-6 h-[410px]">
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className="font-label-caps text-[10px] font-bold text-[#ffdea5] border border-[#ffdea5] px-2 py-0.5 rounded-full uppercase tracking-widest flex items-center gap-1">
                      <span className="material-symbols-outlined text-[12px]">star</span> HOST
                    </span>
                    <span className="font-label-caps text-[10px] font-bold text-[#ffdea5] uppercase tracking-widest">NOV 15</span>
                  </div>
                  <h3 className="font-headline-sm text-2xl font-bold text-white mb-2">Analog Nights</h3>
                  <p className="text-[#b9c7e4] text-sm mb-6">
                    An evening of high-fidelity sound, exploring the roots of Brazilian jazz through rare first-press vinyl records.
                  </p>
                </div>
                <div className="mt-auto flex items-center justify-between">
                  <span className="font-label-caps text-[10px] font-bold text-white uppercase tracking-widest">15 ATTENDEES</span>
                  <button className="bg-white text-primary px-4 py-2 font-label-caps text-[10px] font-bold uppercase tracking-widest rounded hover:bg-gray-200" onClick={() => navigate('/dashboard/host')}>MANAGE</button>
                </div>
              </div>
            ) : (
              <div className="bg-white rounded-xl shadow-sm hover:shadow-lg transition-all duration-500 flex flex-col group overflow-hidden border border-[#eae8e7]">
                <div className="relative h-64 overflow-hidden">
                  <img className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" src="https://lh3.googleusercontent.com/aida-public/AB6AXuApdjb2qUV6wIjmPTDsxElDBWxvHKN_UzaRRs5sKFhOv_x0xPlLZyoeNYtHmzklHkX8InMQh73JlBfERRx887essaKwFVuuvO-vGjfGQjOWnAgAHc9-DU_EQ4j-dv-sjSGI6yWe25I_U3NOZ7CE-h49SHErwtmzRrkoX5SfieAjlvNH12VUfjSVJ3v-pWnwp54Zbdc5jPQSYq0g3e3xoGyrABnVonY3v7t2IsLW39r1zbsLsfqGthTERQ" alt="Event"/>
                  <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-md px-3 py-1 rounded text-center">
                    <span className="block font-bold text-primary text-sm">NOV</span>
                    <span className="block font-display-lg text-2xl font-bold text-[#775a19] -mt-1">15</span>
                  </div>
                </div>
                <div className="p-6 flex flex-col flex-grow">
                  <div className="flex items-center justify-between mb-4">
                    <span className="font-label-caps text-[10px] font-bold text-[#775a19] border border-[#775a19] px-2 py-0.5 rounded-full uppercase tracking-widest">Listening Party</span>
                    <div className="flex items-center gap-2">
                      <div className="w-6 h-6 rounded-full bg-[#efeded] overflow-hidden">
                        <img className="w-full h-full object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuCsobkwbQkncl8GAJ6xQ5PtcHuCg5LmVqqNO3wlti7TaGg1T2tIp9Tu9fjGv7Ey2Y0v8zZ1SdO7CxN8EEr0oPYMsgkcdO9ph2BN-bUYrF49gxN5pB0F7nBK4CRpMIUF6rOd6Mrf_rtHsx8vZOmOns3XjtjidJChR-FvpY6v1jz5iYzIS6gwrsUVoCv0KDxuXG_0QndlziTFKziiaMxXFXI-e3L-hxRHf2WxEnaxATU9s8hRIwsJXjwB4A" alt="Host"/>
                      </div>
                      <span className="font-label-caps text-[10px] font-bold uppercase tracking-widest text-[#44474d]">Host: Julian S.</span>
                    </div>
                  </div>
                  <h3 className="font-headline-sm text-2xl font-bold text-primary mb-2">Analog Nights: 1960s</h3>
                  <p className="text-[#44474d] text-sm line-clamp-2 mb-6">
                    An evening of high-fidelity sound, exploring the roots of Brazilian jazz through rare first-press vinyl records.
                  </p>
                  <div className="mt-auto pt-6 border-t border-[#efeded] flex items-center justify-between">
                    <div className="flex items-center text-[#44474d]">
                      <span className="material-symbols-outlined text-sm mr-1">location_on</span>
                      <span className="font-label-caps text-[10px] font-bold uppercase tracking-widest">The Vinyl Room</span>
                    </div>
                    <button className="text-primary font-label-caps text-[10px] font-bold uppercase tracking-widest hover:text-[#775a19] transition-colors">Details →</button>
                  </div>
                </div>
              </div>
            )}

          </div>
        </section>

        {/* Past Experiences Section */}
        <section className="mt-12">
          <div className="flex items-center gap-4 mb-6">
            <h2 className="font-headline-md text-3xl font-bold text-primary opacity-60">Past Experiences</h2>
            <div className="h-px bg-[#c5c6cd]/30 flex-grow"></div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 opacity-75">
            
            {/* Past Experience 1 */}
            <div className="bg-[#fbf9f8] rounded-xl border border-[#c5c6cd]/30 p-5 group hover:bg-white transition-all shadow-sm">
              <div className="flex items-start justify-between mb-4">
                <div className="w-12 h-12 rounded bg-[#eae8e7] overflow-hidden grayscale group-hover:grayscale-0 transition-all">
                  <img className="w-full h-full object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuDIZKapBKTxau7hmPsbB6RL0kZQfedBNGHsTyWYeNjeNwDNKpJ6CMgxQbRRl3mrbJCPZcZHYxp3ssQ5YA1znvMIsbrkU7UO97cnnUO8uFfhP3hCapAjMfac5BW3_FNjO3DMT1KRSw3aC6fkZWLECbpE1l35QTPtPeC65jhLFXk2ezmB2AmAnMGSy8frQtgaZOQ-N5T94Rnq0wMAnPwix31EC0bQBP3AIie28-AoMm2IFQXYG4HTaRLywg" alt="Tennis"/>
                </div>
                <span className="font-label-caps text-[10px] font-bold uppercase tracking-widest text-[#75777e]">SEP 12</span>
              </div>
              <h4 className="font-headline-sm text-[18px] font-bold text-primary mb-1">Morning Open Singles</h4>
              <p className="text-[#44474d] text-sm mb-4">Social tournament followed by a networking brunch.</p>
              <button className="text-[#775a19] font-label-caps text-[10px] font-bold uppercase tracking-widest border-b border-transparent hover:border-[#775a19] transition-all">View Highlights</button>
            </div>

            {/* Past Experience 2 */}
            <div className="bg-[#fbf9f8] rounded-xl border border-[#c5c6cd]/30 p-5 group hover:bg-white transition-all shadow-sm">
              <div className="flex items-start justify-between mb-4">
                <div className="w-12 h-12 rounded bg-[#eae8e7] overflow-hidden grayscale group-hover:grayscale-0 transition-all">
                  <img className="w-full h-full object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuCaSZVPuy9jcaHU5Qk692WiR4rG_r7QP4k-eSaqRQ7N4ONMwFnUElgd7PjKFewtlUpqzJ30GRsfAPS9cCntLYmgEFh8dGpRjSVRlhhAJSHbulzq1njPyeHIsKvxPbCh8abVNHIeJeUvd32ggIV2ZNqtSpCBjDie49Z22XFf6IvSzICKxIKCK0aebJD0qR9AQNW6QOg2y1BYi7Ltk57QfTkVxzRYdVBXzq7bibe38P05K2PE10_ks6WsIQ" alt="Workshop"/>
                </div>
                <span className="font-label-caps text-[10px] font-bold uppercase tracking-widest text-[#75777e]">AUG 28</span>
              </div>
              <h4 className="font-headline-sm text-[18px] font-bold text-primary mb-1">Modern Stoicism Workshop</h4>
              <p className="text-[#44474d] text-sm mb-4">A discussion on applying ancient wisdom to modern leadership.</p>
              <button className="text-[#775a19] font-label-caps text-[10px] font-bold uppercase tracking-widest border-b border-transparent hover:border-[#775a19] transition-all">View Archive</button>
            </div>

          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-[#f5f3f3] w-full py-12 mt-12 border-t border-[#c5c6cd]/20">
        <div className="flex flex-col md:flex-row justify-between items-start px-8 max-w-7xl mx-auto gap-8">
          <div className="flex flex-col gap-4">
            <span className="font-display-lg text-3xl font-bold text-primary">Localite</span>
            <p className="text-[#1b1c1c] max-w-xs text-sm">
              © 2024 Localite. Modern Nobility in Local Connection.
            </p>
          </div>
          <div className="grid grid-cols-2 md:flex md:gap-12 mt-8 md:mt-0">
            <div className="flex flex-col gap-4">
              <span className="font-label-caps text-[12px] font-bold uppercase tracking-widest text-primary">Discover</span>
              <a className="text-[#44474d] text-sm hover:text-[#775a19] transition-colors duration-200 cursor-pointer">Events</a>
              <a className="text-[#44474d] text-sm hover:text-[#775a19] transition-colors duration-200 cursor-pointer">Host an Event</a>
            </div>
            <div className="flex flex-col gap-4">
              <span className="font-label-caps text-[12px] font-bold uppercase tracking-widest text-primary">Support</span>
              <a className="text-[#44474d] text-sm hover:text-[#775a19] transition-colors duration-200 cursor-pointer">Contact Us</a>
              <a className="text-[#44474d] text-sm hover:text-[#775a19] transition-colors duration-200 cursor-pointer">Terms of Service</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
