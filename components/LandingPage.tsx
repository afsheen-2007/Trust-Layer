import React, { useState, useEffect } from 'react';
import { 
  ShieldCheck, 
  Activity, 
  ScanFace, 
  ChevronRight, 
  Globe, 
  Fingerprint,
  Zap,
  AlertTriangle,
  EyeOff,
  Binary,
  Database,
  Lock,
  Search,
  BookOpen,
  Info
} from 'lucide-react';
import { FuturisticScanner } from './FuturisticScanner';
import KnowledgeBase from './KnowledgeBase';

interface Props {
  onLoginRequest: () => void;
  onEmergency: () => void;
  isAuthenticated: boolean;
}

const LandingPage: React.FC<Props> = ({ onLoginRequest, onEmergency, isAuthenticated }) => {
  const [scrollY, setScrollY] = useState(0);
  const [showKnowledge, setShowKnowledge] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="relative min-h-screen overflow-x-hidden bg-[#0b0f19]">
      
      {showKnowledge && <KnowledgeBase onClose={() => setShowKnowledge(false)} />}

      {/* 3D Background Container */}
      <div className="fixed inset-0 z-0 pointer-events-none opacity-60">
          <FuturisticScanner />
          <div className="absolute inset-0 bg-gradient-to-b from-[#0b0f19]/80 via-transparent to-[#0b0f19] z-10" />
      </div>

      {/* --- SAFETY BANNER (TOP KNOWLEDGE SECTION) --- */}
      <div className="relative z-50 bg-indigo-900/40 text-indigo-200 text-xs font-medium py-2 px-4 border-b border-indigo-500/20 backdrop-blur-md flex justify-between items-center">
         <div className="flex items-center gap-2 mx-auto sm:mx-0">
            <Info className="w-3 h-3" />
            <span><strong className="text-white">AI Safety Advisory:</strong> Never upload biometric data to unverified websites.</span>
         </div>
         <button 
           onClick={() => setShowKnowledge(true)}
           className="hidden sm:flex items-center gap-1 hover:text-white transition-colors underline decoration-indigo-500/50 hover:decoration-white"
         >
           Access Knowledge Center <ChevronRight className="w-3 h-3" />
         </button>
      </div>

      {/* --- LANDING NAVIGATION --- */}
      <nav className="sticky top-0 w-full z-40 px-6 py-4 flex justify-between items-center backdrop-blur-sm border-b border-white/5 bg-[#0b0f19]/50 transition-all duration-300">
         <div className="flex items-center gap-3">
            <div className="flex items-center gap-2 px-3 py-1 bg-green-500/10 border border-green-500/20 rounded-full">
               <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
               </span>
               <span className="text-[10px] font-mono font-bold text-green-400 uppercase tracking-widest">System Online</span>
            </div>
         </div>
         
         <div className="flex items-center gap-4">
             {/* Desktop Knowledge Link */}
            <button 
               onClick={() => setShowKnowledge(true)}
               className="hidden md:flex items-center gap-2 text-xs font-bold text-slate-400 hover:text-white transition-colors mr-4"
            >
               <BookOpen className="w-3 h-3" /> KNOWLEDGE BASE
            </button>

            {isAuthenticated && (
                <button 
                  onClick={onLoginRequest}
                  className="hidden md:flex items-center gap-2 text-xs font-bold text-cyan-400 border border-cyan-500/30 px-3 py-1.5 rounded-lg hover:bg-cyan-500/10 transition-colors"
                >
                  <ShieldCheck className="w-3 h-3" /> DASHBOARD
                </button>
            )}
            
            <div className="flex items-center gap-2">
               <Fingerprint className="w-6 h-6 text-indigo-500" />
               <h1 className="text-xl font-bold text-white tracking-tighter">
                  TRUST<span className="text-indigo-500">LAYER</span>
               </h1>
            </div>
         </div>
      </nav>

      {/* --- HERO SECTION --- */}
      <section className="relative z-10 min-h-screen flex flex-col justify-center items-center px-4 pt-10 pb-20">
        
        <div className="max-w-6xl mx-auto text-center space-y-8 animate-fade-in-up">
           
           <div className="inline-flex items-center justify-center gap-2 px-4 py-1.5 rounded-full border border-indigo-500/30 bg-indigo-500/10 text-indigo-300 text-xs font-mono mb-4 shadow-[0_0_20px_rgba(99,102,241,0.2)]">
              <Binary className="w-3 h-3" /> MILITARY-GRADE NEURAL FORENSICS
           </div>

           {/* REVISED MAIN STATEMENT */}
           <h1 className="text-5xl md:text-8xl font-black tracking-tighter text-white leading-[0.95] drop-shadow-2xl">
             UNMASK THE <br />
             <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-indigo-500 to-purple-500 neon-text">
               ARTIFICIAL
             </span> <br />
             PROTECT THE REAL
           </h1>
           
           {/* Enhanced Subheadline */}
           <p className="text-lg md:text-xl text-slate-300 font-light leading-relaxed max-w-3xl mx-auto">
             The definitive defense against deepfakes, voice cloning, and synthetic fraud. 
             We provide <strong className="text-white font-semibold">deterministic authenticity verification</strong> for a world where seeing is no longer believing.
           </p>

           {/* Action Buttons */}
           <div className="flex flex-col sm:flex-row items-center justify-center gap-6 mt-12">
             <button 
                onClick={onLoginRequest}
                className="group relative px-10 py-5 bg-white text-slate-900 font-bold text-lg rounded-full overflow-hidden transition-all hover:scale-105 hover:shadow-[0_0_50px_rgba(255,255,255,0.3)] w-full sm:w-auto"
             >
                <div className="absolute inset-0 w-full h-full bg-gradient-to-r from-cyan-400 to-indigo-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-10" />
                <span className="flex items-center justify-center gap-2">
                   {isAuthenticated ? 'LAUNCH CONSOLE' : 'INITIALIZE SCAN'} <ChevronRight className="w-5 h-5" />
                </span>
             </button>
             
             <button 
                onClick={onEmergency}
                className="px-8 py-5 glass-panel text-red-500 font-bold text-sm rounded-full border-red-500/30 hover:bg-red-500/10 hover:border-red-500 transition-all w-full sm:w-auto flex items-center justify-center gap-2 tracking-wide shadow-lg shadow-red-900/20"
             >
                <Activity className="w-4 h-4" /> REPORT THREAT
             </button>
           </div>
           
           <div className="mt-8 flex items-center justify-center gap-2 text-xs text-slate-500">
              <Lock className="w-3 h-3" />
              <span>Zero-Retention Policy: Your data is analyzed in-memory and never stored.</span>
           </div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 animate-bounce opacity-30">
           <div className="w-[1px] h-12 bg-white mx-auto mb-2" />
           <span className="text-[10px] tracking-[0.3em] text-white font-mono">SCROLL</span>
        </div>
      </section>

      {/* --- INFINITE TICKER --- */}
      <div className="relative z-20 bg-indigo-950/30 border-y border-indigo-500/20 py-3 overflow-hidden backdrop-blur-sm">
         <div className="flex whitespace-nowrap animate-float gap-12 text-xs font-mono text-indigo-300 uppercase tracking-widest opacity-70">
            <span>● Deepfake Detected: Tokyo, JP</span>
            <span>● Voice Clone Blocked: NYC, USA</span>
            <span>● Phishing URL Neutralized: London, UK</span>
            <span>● Synthetic ID Flagged: Berlin, DE</span>
            <span>● Media Integrity Verified: Toronto, CA</span>
            <span>● Deepfake Detected: Tokyo, JP</span>
            <span>● Voice Clone Blocked: NYC, USA</span>
            <span>● Phishing URL Neutralized: London, UK</span>
            <span>● Synthetic ID Flagged: Berlin, DE</span>
         </div>
      </div>

      {/* --- THE NEURAL PIPELINE (PROCESS) --- */}
      <section className="relative z-20 py-24 bg-[#0b0f19]">
         <div className="max-w-7xl mx-auto px-6">
            <div className="text-center mb-16">
               <h2 className="text-3xl font-bold text-white mb-2">The Neural Pipeline</h2>
               <p className="text-slate-500">How TrustLayer deconstructs synthetic media in milliseconds.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
               {[
                  { icon: Search, title: "1. Ingest", desc: "Uploads are decomposed into raw pixel & wave data." },
                  { icon: ScanFace, title: "2. Extract", desc: "Facial geometry and photonic consistency mapping." },
                  { icon: Database, title: "3. Compare", desc: "Cross-reference against 50TB+ authentic datasets." },
                  { icon: Lock, title: "4. Verdict", desc: "Deterministic probability score with artifact highlighting." }
               ].map((step, i) => (
                  <div key={i} className="relative p-6 rounded-xl bg-slate-900 border border-slate-800 hover:border-indigo-500/50 transition-colors group">
                     <div className="w-10 h-10 rounded-lg bg-indigo-500/10 flex items-center justify-center mb-4 text-indigo-400 group-hover:text-white group-hover:bg-indigo-500 transition-colors">
                        <step.icon className="w-5 h-5" />
                     </div>
                     <h3 className="text-lg font-bold text-white mb-2">{step.title}</h3>
                     <p className="text-sm text-slate-500 leading-relaxed">{step.desc}</p>
                     {i < 3 && <div className="hidden md:block absolute top-1/2 -right-2 w-4 h-[1px] bg-slate-800" />}
                  </div>
               ))}
            </div>
         </div>
      </section>

      {/* --- AWARENESS & FEATURES --- */}
      <section className="relative z-20 py-24 bg-slate-950 border-t border-slate-900">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            
            <div className="space-y-8">
                <div className="inline-flex items-center gap-2 px-3 py-1 bg-red-500/10 text-red-400 rounded text-xs font-bold uppercase tracking-wider">
                   <AlertTriangle className="w-3 h-3" /> Critical Threat
                </div>
                <h2 className="text-4xl md:text-5xl font-bold text-white leading-tight">
                    Reality is no longer <br />
                    <span className="text-slate-500">guaranteed.</span>
                </h2>
                <p className="text-slate-400 text-lg leading-relaxed">
                    The democratization of generative AI has weaponized information. 
                    From CEO impersonations to fabricated news events, the line between truth and fiction has dissolved.
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4">
                    <div className="p-4 rounded-lg bg-[#0b0f19] border border-slate-800">
                       <ScanFace className="w-6 h-6 text-indigo-500 mb-3" />
                       <h3 className="font-bold text-white">Identity Theft</h3>
                       <p className="text-xs text-slate-500 mt-1">AI voice cloning bypassing bank security.</p>
                    </div>
                    <div className="p-4 rounded-lg bg-[#0b0f19] border border-slate-800">
                       <Globe className="w-6 h-6 text-indigo-500 mb-3" />
                       <h3 className="font-bold text-white">Disinformation</h3>
                       <p className="text-xs text-slate-500 mt-1">Viral fake events shifting stock markets.</p>
                    </div>
                    <div className="p-4 rounded-lg bg-[#0b0f19] border border-slate-800">
                       <EyeOff className="w-6 h-6 text-indigo-500 mb-3" />
                       <h3 className="font-bold text-white">Blackmail</h3>
                       <p className="text-xs text-slate-500 mt-1">Synthetic non-consensual imagery.</p>
                    </div>
                    <div className="p-4 rounded-lg bg-[#0b0f19] border border-slate-800">
                       <Zap className="w-6 h-6 text-indigo-500 mb-3" />
                       <h3 className="font-bold text-white">Social Engineering</h3>
                       <p className="text-xs text-slate-500 mt-1">Real-time deepfake video calls.</p>
                    </div>
                </div>
            </div>

            <div className="relative">
               <div className="absolute -inset-4 bg-gradient-to-r from-indigo-500 to-cyan-500 rounded-2xl opacity-20 blur-xl animate-pulse-slow"></div>
               <div className="relative bg-[#0b0f19] border border-slate-800 rounded-2xl p-8 overflow-hidden">
                  <div className="flex items-center justify-between mb-8">
                     <div>
                        <div className="text-xs text-slate-500 font-mono uppercase">Global Threat Index</div>
                        <div className="text-3xl font-bold text-white">High Alert</div>
                     </div>
                     <div className="w-12 h-12 bg-red-500/10 rounded-full flex items-center justify-center animate-pulse">
                        <Activity className="w-6 h-6 text-red-500" />
                     </div>
                  </div>
                  
                  {/* Fake Chart Visualization */}
                  <div className="flex items-end gap-2 h-40 mb-6">
                     {[40, 60, 45, 70, 50, 80, 65, 90, 85, 95].map((h, i) => (
                        <div key={i} className="flex-1 bg-gradient-to-t from-indigo-900 to-indigo-500 rounded-t opacity-80 hover:opacity-100 transition-opacity" style={{ height: `${h}%` }}></div>
                     ))}
                  </div>

                  <div className="pt-6 border-t border-slate-800 flex justify-between items-center">
                     <div className="text-xs text-slate-400">
                        Live Analysis: <span className="text-white font-mono">24,392</span> objects/sec
                     </div>
                     <div className="text-xs font-mono text-green-400">
                        +14% vs Avg
                     </div>
                  </div>
               </div>
            </div>

        </div>
      </section>

      {/* --- GLOBAL STATS --- */}
      <section className="relative z-20 py-24 bg-[#0b0f19] border-t border-slate-900">
         <div className="max-w-7xl mx-auto px-6">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
               <div>
                  <div className="text-4xl font-black text-white mb-2">99.8%</div>
                  <div className="text-xs font-mono text-slate-500 uppercase tracking-widest">Detection Accuracy</div>
               </div>
               <div>
                  <div className="text-4xl font-black text-white mb-2">50TB+</div>
                  <div className="text-xs font-mono text-slate-500 uppercase tracking-widest">Training Data</div>
               </div>
               <div>
                  <div className="text-4xl font-black text-white mb-2">&lt;200ms</div>
                  <div className="text-xs font-mono text-slate-500 uppercase tracking-widest">Latency</div>
               </div>
               <div>
                  <div className="text-4xl font-black text-white mb-2">24/7</div>
                  <div className="text-xs font-mono text-slate-500 uppercase tracking-widest">Active Monitoring</div>
               </div>
            </div>
         </div>
      </section>

      {/* --- CTA SECTION --- */}
      <section className="relative z-20 py-24 border-t border-slate-800 bg-[#0b0f19]">
         <div className="absolute inset-0 bg-gradient-to-b from-indigo-900/10 to-[#0b0f19]"></div>
         <div className="max-w-4xl mx-auto px-6 text-center relative z-10">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">Ready to regain control?</h2>
            <p className="text-lg text-slate-400 mb-10 max-w-2xl mx-auto">
               Join thousands of analysts, journalists, and security experts using TrustLayer to verify the authenticity of digital media.
            </p>
            <button 
               onClick={onLoginRequest}
               className="px-12 py-5 bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-lg rounded-xl shadow-[0_0_40px_rgba(79,70,229,0.4)] transition-all hover:scale-105"
            >
               {isAuthenticated ? 'OPEN DASHBOARD' : 'GET STARTED FREE'}
            </button>
         </div>
      </section>

      {/* Footer */}
      <footer className="relative z-20 py-12 border-t border-slate-800 bg-[#05080f] text-center">
         <div className="flex items-center justify-center gap-2 mb-4">
            <Fingerprint className="w-6 h-6 text-indigo-500" />
            <span className="font-bold text-white tracking-tight">TRUSTLAYER</span>
         </div>
         <div className="flex justify-center gap-6 text-slate-500 text-sm mb-8">
            <a href="#" className="hover:text-white transition-colors">Privacy</a>
            <a href="#" className="hover:text-white transition-colors">Terms</a>
            <a href="#" className="hover:text-white transition-colors">Security</a>
            <a href="#" className="hover:text-white transition-colors">API</a>
         </div>
         <p className="text-slate-600 text-xs">© 2024 TrustLayer Intelligence. Secure by Design. <br/> San Francisco • London • Tokyo</p>
      </footer>

    </div>
  );
};

export default LandingPage;