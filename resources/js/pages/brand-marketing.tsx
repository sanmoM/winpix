import React, { useState, useEffect, useRef } from 'react';
import {
  Camera, Users, BarChart3, Globe, Zap, ArrowRight, Menu, X,
  Instagram, Twitter, Linkedin, CheckCircle2, Image as ImageIcon,
  Play, ChevronRight, Star, Trophy, Sparkles, TrendingUp
} from 'lucide-react';
import UserLayout from '@/layouts/user-layout';

const App = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const heroRef = useRef(null);

  // Handle scroll and mouse movement effects
  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    const handleMouseMove = (e) => {
      if (heroRef.current) {
        const { clientX, clientY } = e;
        const { innerWidth, innerHeight } = window;
        setMousePosition({
          x: (clientX / innerWidth - 0.5) * 20,
          y: (clientY / innerHeight - 0.5) * 20
        });
      }
    };

    window.addEventListener('scroll', handleScroll);
    window.addEventListener('mousemove', handleMouseMove);
    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  return (
    <div className="min-h-screen bg-slate-50 font-sans text-slate-900 overflow-x-hidden selection:bg-indigo-500 selection:text-white">
      {/* Custom Styles for Animations */}
      <style>{`
        @keyframes blob {
          0% { transform: translate(0px, 0px) scale(1); }
          33% { transform: translate(30px, -50px) scale(1.1); }
          66% { transform: translate(-20px, 20px) scale(0.9); }
          100% { transform: translate(0px, 0px) scale(1); }
        }
        @keyframes marquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        @keyframes float {
          0% { transform: translateY(0px); }
          50% { transform: translateY(-20px); }
          100% { transform: translateY(0px); }
        }
        .animate-blob { animation: blob 7s infinite; }
        .animation-delay-2000 { animation-delay: 2s; }
        .animation-delay-4000 { animation-delay: 4s; }
        .animate-marquee { animation: marquee 30s linear infinite; }
        .animate-float { animation: float 6s ease-in-out infinite; }
        .glass-panel {
          background: rgba(255, 255, 255, 0.7);
          backdrop-filter: blur(12px);
          -webkit-backdrop-filter: blur(12px);
          border: 1px solid rgba(255, 255, 255, 0.3);
        }
      `}</style>

      <UserLayout>
        {/* Hero Section */}
        <header ref={heroRef} className="relative pt-32 pb-20 lg:pt-48 lg:pb-32 overflow-hidden bg-white">
          {/* Dynamic Background Gradients */}
          <div className="absolute inset-0 opacity-40 pointer-events-none">
            <div className="absolute top-0 -left-4 w-96 h-96 bg-purple-300 rounded-full mix-blend-multiply filter blur-3xl opacity-70 animate-blob"></div>
            <div className="absolute top-0 -right-4 w-96 h-96 bg-yellow-300 rounded-full mix-blend-multiply filter blur-3xl opacity-70 animate-blob animation-delay-2000"></div>
            <div className="absolute -bottom-8 left-20 w-96 h-96 bg-pink-300 rounded-full mix-blend-multiply filter blur-3xl opacity-70 animate-blob animation-delay-4000"></div>
          </div>

          <div className="container mx-auto px-4 md:px-6 relative z-10">
            <div className="flex flex-col items-center text-center max-w-5xl mx-auto">

              {/* Pill Badge */}
              <div className="mb-8 inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-indigo-50 border border-indigo-100 text-indigo-700 text-sm font-bold shadow-sm hover:shadow-md transition-all cursor-pointer">
                <Sparkles size={14} className="animate-pulse" />
                <span>The #1 Platform for Visual Contests in GCC</span>
              </div>

              {/* Main Heading */}
              <h1 className="text-6xl md:text-8xl font-black tracking-tight text-slate-900 mb-8 leading-[1.1]">
                Turn Your Brand Into a <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 animate-gradient-x">
                  Visual Movement
                </span>
              </h1>

              <p className="text-xl md:text-2xl text-slate-600 leading-relaxed max-w-2xl mb-10">
                Launch photography contests that engage thousands of creators, flood social media, and build your authentic content library.
              </p>

              {/* CTA Group */}
              <div className="flex flex-col sm:flex-row gap-4 w-full justify-center mb-20">
                <button className="px-8 py-4 bg-slate-900 text-white rounded-full font-bold text-lg shadow-2xl hover:bg-indigo-600 transition-all transform hover:-translate-y-1 flex items-center justify-center gap-2 group">
                  Launch a Contest
                  <ArrowRight className="group-hover:translate-x-1 transition-transform" size={20} />
                </button>
                <button className="px-8 py-4 bg-white text-slate-900 border border-slate-200 rounded-full font-bold text-lg hover:bg-slate-50 transition-all flex items-center justify-center gap-2 shadow-sm">
                  <Play size={18} className="fill-slate-900" /> View Showreel
                </button>
              </div>

              {/* 3D Floating Cards Hero Visual */}
              <div className="relative w-full max-w-5xl h-[400px] md:h-[600px] perspective-1000">
                {/* Left Card */}
                <div
                  className="absolute left-0 md:-left-12 top-20 w-48 md:w-72 bg-white rounded-2xl shadow-2xl p-3 transform -rotate-6 z-10 animate-float transition-transform duration-100"
                  style={{ transform: `translate(${mousePosition.x * -1}px, ${mousePosition.y * -1}px) rotate(-6deg)` }}
                >
                  <img src="https://images.unsplash.com/photo-1516035069371-29a1b244cc32?auto=format&fit=crop&w=600&q=80" className="rounded-xl h-48 md:h-64 w-full object-cover mb-3" alt="Entry 1" />
                  <div className="flex justify-between items-center px-1">
                    <div className="flex items-center gap-2">
                      <div className="w-6 h-6 rounded-full bg-pink-500 flex items-center justify-center text-[10px] text-white font-bold">J</div>
                      <span className="text-xs font-bold text-slate-700">@josh_cam</span>
                    </div>
                    <Trophy size={16} className="text-yellow-500" />
                  </div>
                </div>

                {/* Center Card (Main) */}
                <div
                  className="absolute left-1/2 transform -translate-x-1/2 top-0 w-64 md:w-96 bg-white rounded-3xl shadow-2xl p-4 z-20"
                  style={{ transform: `translate(calc(-50% + ${mousePosition.x}px), ${mousePosition.y}px)` }}
                >
                  <div className="relative">
                    <div className="absolute top-4 left-4 bg-black/50 backdrop-blur-md text-white px-3 py-1 rounded-full text-xs font-bold flex items-center gap-1">
                      <Zap size={12} className="text-yellow-400" /> Trending Contest
                    </div>
                    <img src="https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&w=800&q=80" className="rounded-2xl h-64 md:h-80 w-full object-cover mb-4 shadow-inner" alt="Main Entry" />
                  </div>
                  <div className="flex justify-between items-end">
                    <div>
                      <h3 className="font-bold text-lg text-slate-900">Urban Perspectives</h3>
                      <p className="text-slate-500 text-sm">Hosted by Nike UAE</p>
                    </div>
                    <div className="text-right">
                      <p className="font-bold text-indigo-600 text-xl">4,203</p>
                      <p className="text-xs text-slate-400 font-medium uppercase">Entries</p>
                    </div>
                  </div>
                </div>

                {/* Right Card */}
                <div
                  className="absolute right-0 md:-right-12 top-32 w-48 md:w-72 bg-white rounded-2xl shadow-2xl p-3 transform rotate-6 z-10 animate-float transition-transform duration-100"
                  style={{ animationDelay: '1s', transform: `translate(${mousePosition.x * -2}px, ${mousePosition.y * -2}px) rotate(6deg)` }}
                >
                  <img src="https://images.unsplash.com/photo-1542038784456-1ea635985e3b?auto=format&fit=crop&w=600&q=80" className="rounded-xl h-48 md:h-64 w-full object-cover mb-3" alt="Entry 3" />
                  <div className="flex justify-between items-center px-1">
                    <div className="flex items-center gap-2">
                      <div className="w-6 h-6 rounded-full bg-blue-500 flex items-center justify-center text-[10px] text-white font-bold">S</div>
                      <span className="text-xs font-bold text-slate-700">@sarah_shoots</span>
                    </div>
                    <Star size={16} className="text-yellow-500" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </header>

        {/* Infinite Brand Marquee */}
        <div className="py-12 bg-white border-y border-slate-100 overflow-hidden">
          <p className="text-center text-slate-400 text-sm font-bold uppercase tracking-widest mb-8">Trusted by World-Class Brands</p>
          <div className="relative flex overflow-x-hidden">
            <div className="flex animate-marquee whitespace-nowrap gap-16 items-center">
              {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
                <div key={i} className="text-3xl font-black text-slate-300 hover:text-indigo-600 transition-colors cursor-pointer uppercase">
                  BrandName{i}
                </div>
              ))}
              {/* Duplicate for seamless loop */}
              {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
                <div key={`dup-${i}`} className="text-3xl font-black text-slate-300 hover:text-indigo-600 transition-colors cursor-pointer uppercase">
                  BrandName{i}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Bento Grid Features Section */}
        <section className="py-32 bg-slate-50">
          <div className="container mx-auto px-4 md:px-6">
            <div className="max-w-3xl mb-16">
              <h2 className="text-4xl md:text-5xl font-black text-slate-900 mb-6">Why Top Brands <br /> Choose Winpix.</h2>
              <p className="text-xl text-slate-600">We've rebuilt the contest engine from the ground up to prioritize authenticity, engagement, and measurable ROI.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 grid-rows-2 gap-6 h-auto md:h-[800px]">
              {/* Card 1: Large Vertical */}
              <div className="md:col-span-1 md:row-span-2 bg-white rounded-3xl p-8 shadow-xl border border-slate-100 relative overflow-hidden group hover:shadow-2xl transition-all duration-500">
                <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-100 rounded-full mix-blend-multiply filter blur-3xl opacity-0 group-hover:opacity-50 transition-opacity duration-500"></div>
                <div className="relative z-10 h-full flex flex-col">
                  <div className="w-14 h-14 rounded-2xl bg-indigo-600 flex items-center justify-center text-white mb-8 shadow-lg shadow-indigo-200">
                    <Users size={28} />
                  </div>
                  <h3 className="text-2xl font-bold text-slate-900 mb-4">Global Talent Pool</h3>
                  <p className="text-slate-600 mb-8 leading-relaxed">
                    Tap into a network of 50,000+ pre-vetted photographers across GCC and beyond. From hobbyists to pros.
                  </p>
                  <div className="mt-auto relative">
                    <div className="absolute inset-x-0 bottom-0 h-20 bg-gradient-to-t from-white to-transparent z-20"></div>
                    <div className="space-y-3">
                      {[1, 2, 3].map(i => (
                        <div key={i} className="flex items-center gap-3 p-3 rounded-xl bg-slate-50 border border-slate-100">
                          <div className="w-10 h-10 rounded-full bg-slate-200 overflow-hidden">
                            <img src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${i * 13}`} alt="avatar" />
                          </div>
                          <div>
                            <p className="text-sm font-bold text-slate-900">New Creator Joined</p>
                            <p className="text-xs text-slate-500">Dubai, UAE • 2m ago</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* Card 2: Wide Horizontal */}
              <div className="md:col-span-2 bg-black rounded-3xl p-8 shadow-xl relative overflow-hidden group">
                <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?ixlib=rb-4.0.3')] bg-cover bg-center opacity-40 group-hover:scale-105 transition-transform duration-700"></div>
                <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center justify-between h-full">
                  <div className="max-w-md">
                    <div className="w-12 h-12 rounded-xl bg-white/20 backdrop-blur-md flex items-center justify-center text-white mb-6">
                      <ImageIcon size={24} />
                    </div>
                    <h3 className="text-3xl font-bold text-white mb-2">Authentic Visuals</h3>
                    <p className="text-slate-300">Forget stock photos. Get real, raw, and high-converting content generated by actual users.</p>
                  </div>
                  <button className="mt-6 md:mt-0 px-6 py-3 bg-white text-black rounded-full font-bold hover:bg-indigo-50 transition-colors flex items-center gap-2">
                    View Gallery <ArrowRight size={18} />
                  </button>
                </div>
              </div>

              {/* Card 3: Standard */}
              <div className="bg-white rounded-3xl p-8 shadow-xl border border-slate-100 group hover:border-indigo-100 transition-colors">
                <div className="w-12 h-12 rounded-xl bg-pink-100 text-pink-600 flex items-center justify-center mb-6">
                  <Zap size={24} />
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-2">Viral Engagement</h3>
                <p className="text-slate-600 text-sm">
                  Gamified voting mechanics drive organic shares and engagement spikes of up to 400%.
                </p>
                <div className="mt-6 h-2 w-full bg-slate-100 rounded-full overflow-hidden">
                  <div className="h-full bg-gradient-to-r from-pink-500 to-purple-500 w-3/4"></div>
                </div>
                <div className="mt-2 text-right text-xs font-bold text-pink-600">+450% vs Avg</div>
              </div>

              {/* Card 4: Standard */}
              <div className="bg-white rounded-3xl p-8 shadow-xl border border-slate-100 group hover:border-indigo-100 transition-colors">
                <div className="w-12 h-12 rounded-xl bg-blue-100 text-blue-600 flex items-center justify-center mb-6">
                  <BarChart3 size={24} />
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-2">ROI Analytics</h3>
                <p className="text-slate-600 text-sm">
                  Real-time dashboards tracking participants, votes, shares, and conversion value.
                </p>
                <div className="mt-4 flex items-end gap-1 h-12">
                  {[40, 70, 50, 90, 60, 80].map((h, i) => (
                    <div key={i} style={{ height: `${h}%` }} className="flex-1 bg-blue-100 rounded-t-sm group-hover:bg-blue-600 transition-colors duration-300 delay-[${i*50}ms]"></div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Interactive Workflow Section */}
        <section className="py-32 bg-slate-900 text-white relative overflow-hidden">
          {/* Mesh Gradients */}
          <div className="absolute top-0 left-0 w-full h-full overflow-hidden z-0">
            <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-indigo-600 rounded-full filter blur-[128px] opacity-20"></div>
            <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-600 rounded-full filter blur-[128px] opacity-20"></div>
          </div>

          <div className="container mx-auto px-4 md:px-6 relative z-10">
            <div className="grid md:grid-cols-2 gap-20 items-center">
              <div className="space-y-12">
                <h2 className="text-4xl md:text-6xl font-black leading-tight">
                  Launch in Minutes. <br />
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-purple-400">
                    Scale Instantly.
                  </span>
                </h2>

                <div className="space-y-8">
                  {[
                    { title: 'Define', desc: 'Set your brief, prizes, and guidelines.' },
                    { title: 'Activate', desc: 'Our community gets notified instantly.' },
                    { title: 'Select', desc: 'Vote, judge, and award the winners.' }
                  ].map((step, idx) => (
                    <div key={idx} className="flex gap-6 group">
                      <div className="flex flex-col items-center">
                        <div className="w-10 h-10 rounded-full border-2 border-indigo-500/30 text-indigo-400 font-bold flex items-center justify-center group-hover:bg-indigo-600 group-hover:text-white group-hover:border-indigo-600 transition-all duration-300">
                          {idx + 1}
                        </div>
                        {idx !== 2 && <div className="w-0.5 h-12 bg-slate-800 my-2 group-hover:bg-indigo-900 transition-colors"></div>}
                      </div>
                      <div>
                        <h4 className="text-xl font-bold text-white mb-1 group-hover:text-indigo-300 transition-colors">{step.title}</h4>
                        <p className="text-slate-400">{step.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Glass UI Mockup */}
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-r from-indigo-600 to-purple-600 rounded-2xl blur-2xl opacity-30 transform rotate-6"></div>
                <div className="glass-panel rounded-2xl p-6 relative bg-slate-800/50 border border-slate-700/50 backdrop-blur-xl">
                  {/* Mock Dashboard Header */}
                  <div className="flex justify-between items-center mb-8 pb-4 border-b border-slate-700/50">
                    <div className="flex items-center gap-3">
                      <div className="w-3 h-3 rounded-full bg-red-500"></div>
                      <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                      <div className="w-3 h-3 rounded-full bg-green-500"></div>
                    </div>
                    <div className="text-xs font-mono text-slate-400">dashboard.winpix.co</div>
                  </div>

                  {/* Mock Content */}
                  <div className="grid grid-cols-2 gap-4 mb-6">
                    <div className="bg-slate-700/30 p-4 rounded-xl">
                      <p className="text-slate-400 text-xs mb-1">Total Entries</p>
                      <p className="text-2xl font-bold text-white">12,843</p>
                      <div className="flex items-center gap-1 text-green-400 text-xs mt-2">
                        <TrendingUp size={12} /> +12%
                      </div>
                    </div>
                    <div className="bg-slate-700/30 p-4 rounded-xl">
                      <p className="text-slate-400 text-xs mb-1">Engagement</p>
                      <p className="text-2xl font-bold text-white">85.2k</p>
                      <div className="flex items-center gap-1 text-green-400 text-xs mt-2">
                        <TrendingUp size={12} /> +24%
                      </div>
                    </div>
                  </div>

                  <div className="space-y-3">
                    {[1, 2, 3].map(i => (
                      <div key={i} className="flex items-center gap-3 p-3 rounded-lg hover:bg-slate-700/30 transition-colors cursor-pointer">
                        <img src={`https://images.unsplash.com/photo-${i === 1 ? '1516035069371-29a1b244cc32' : i === 2 ? '1542038784456-1ea635985e3b' : '1554048612-387768052bf7'}?w=100&h=100&fit=crop`} className="w-12 h-12 rounded-lg object-cover" />
                        <div className="flex-1">
                          <p className="text-sm font-bold text-white">Summer Vibes #{i}0{i}</p>
                          <p className="text-xs text-slate-400">Submitted by @user_{i}</p>
                        </div>
                        <div className="text-right">
                          <p className="text-sm font-bold text-indigo-400">{9 - i}.8</p>
                          <p className="text-[10px] text-slate-500">Score</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Final Section */}
        <section className="py-32 bg-white relative">
          <div className="container mx-auto px-4 text-center relative z-10">
            <h2 className="text-5xl md:text-7xl font-black text-slate-900 mb-8 tracking-tighter">
              Ready to go viral?
            </h2>
            <p className="text-xl text-slate-600 mb-12 max-w-2xl mx-auto">
              Join 500+ forward-thinking brands transforming their marketing with Winpix.
            </p>
            <div className="flex flex-col sm:flex-row justify-center items-center gap-6">
              <button className="px-10 py-5 bg-indigo-600 text-white rounded-full font-bold text-xl shadow-xl shadow-indigo-200 hover:bg-indigo-700 hover:scale-105 transition-all duration-300">
                Start Your Contest Now
              </button>
              <button className="px-10 py-5 bg-white text-slate-900 border-2 border-slate-100 rounded-full font-bold text-xl hover:border-slate-300 transition-all duration-300">
                Book a Demo
              </button>
            </div>
          </div>
        </section>
      </UserLayout>
    </div>
  );
};

export default App;