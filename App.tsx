import React, { useState, useEffect } from 'react';
import { ShieldCheck, LogOut, ArrowLeft, Layers, Fingerprint, Activity, Home } from 'lucide-react';
import { AnalysisResult, AppState, ChamberId } from './types';
import { analyzeMedia } from './services/geminiService';
import AnalysisDashboard from './components/AnalysisDashboard';
import SafetyPanel from './components/SafetyPanel';
import LoginScreen from './components/LoginScreen';
import LandingPage from './components/LandingPage';
import EmergencyMode from './components/EmergencyMode';
import ContextChecker from './components/ContextChecker';
import UploadZone from './components/UploadZone';
import ChamberGrid from './components/ChamberGrid';

// --- Welcome Popup Component ---
const WelcomePopup = ({ onClose, username }: { onClose: () => void, username: string }) => (
  <div className="fixed inset-0 z-50 flex items-center justify-center px-4 bg-black/60 backdrop-blur-sm animate-fade-in">
    <div className="bg-[#111827] border border-indigo-500/30 rounded-2xl p-8 max-w-md w-full shadow-[0_0_50px_rgba(79,70,229,0.2)] relative overflow-hidden animate-fade-in-up">
       <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-cyan-400 to-indigo-500" />
       <div className="w-16 h-16 bg-indigo-500/10 rounded-full flex items-center justify-center mb-6 mx-auto border border-indigo-500/20">
          <ShieldCheck className="w-8 h-8 text-indigo-400" />
       </div>
       <h2 className="text-2xl font-bold text-center text-white mb-2">Welcome, {username}</h2>
       <p className="text-slate-400 text-center mb-8">
         Your neural sentinel is active. You now have full access to the AI detection suite.
       </p>
       <button onClick={onClose} className="w-full py-3 bg-indigo-600 hover:bg-indigo-500 text-white rounded-lg font-bold transition-all shadow-lg shadow-indigo-500/20">
         Enter Dashboard
       </button>
    </div>
  </div>
);

function App() {
  // App Modes: 'landing' | 'login' | 'app' | 'emergency'
  const [viewMode, setViewMode] = useState<'landing' | 'login' | 'app' | 'emergency'>('landing');
  const [showWelcome, setShowWelcome] = useState(false);
  const [username, setUsername] = useState('Analyst');

  const [isAuthenticated, setIsAuthenticated] = useState(() => {
    const savedSession = localStorage.getItem('trustlayer_session');
    if (savedSession) {
      try {
        const { valid, expiresAt } = JSON.parse(savedSession);
        if (valid && Date.now() < expiresAt) return true;
        else localStorage.removeItem('trustlayer_session');
      } catch (e) {
        localStorage.removeItem('trustlayer_session');
      }
    }
    return false;
  });

  const [activeChamber, setActiveChamber] = useState<ChamberId | null>(null);
  const [appState, setAppState] = useState<AppState>(AppState.IDLE);
  const [result, setResult] = useState<AnalysisResult | null>(null);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [currentFile, setCurrentFile] = useState<File | null>(null);

  // Initialize Dark Mode by default
  useEffect(() => {
    document.documentElement.classList.add('dark');
  }, []);

  const handleLoginSuccess = () => {
    setIsAuthenticated(true);
    // User goes to Landing Page first to see the "Home", then can navigate to App
    setViewMode('landing'); 
    setShowWelcome(true);
    setUsername('Commander'); 
  };

  const handleLogout = () => {
    localStorage.removeItem('trustlayer_session');
    setIsAuthenticated(false);
    setViewMode('landing');
    setActiveChamber(null);
  };

  const handleFileAnalysis = async (file: File) => {
    if (!activeChamber) return;
    
    setCurrentFile(file);
    setAppState(AppState.ANALYZING);
    setErrorMsg(null);
    setResult(null);
    window.scrollTo({ top: 0, behavior: 'smooth' });

    try {
      // Determine refined type based on MIME
      let type: 'image' | 'video' | 'audio' | 'text' = 'image';
      if (file.type.startsWith('video')) type = 'video';
      else if (file.type.startsWith('audio')) type = 'audio';
      else if (file.type.startsWith('text') || file.type === 'application/pdf') type = 'text';

      const data = await analyzeMedia(file, type, activeChamber);
      setResult(data);
      setAppState(AppState.COMPLETE);
    } catch (err) {
      console.error(err);
      setErrorMsg("Analysis failed. Please try again with clear evidence.");
      setAppState(AppState.ERROR);
    }
  };

  const handleResetAnalysis = () => {
    setAppState(AppState.IDLE);
    setResult(null);
    setErrorMsg(null);
    setCurrentFile(null);
  };

  const returnToDashboard = () => {
    handleResetAnalysis();
    setActiveChamber(null);
  };

  const getChamberName = (id: ChamberId) => {
    const names: Record<string, string> = {
      image_auth: 'Image Authenticity',
      video_deepfake: 'Deepfake Detector',
      audio_auth: 'Audio Forensics',
      text_ai: 'Text Provenance',
      url_scanner: 'Phishing Scanner',
      moderation: 'Safety & Moderation',
      impersonation: 'Identity Verification',
      context_news: 'News Context',
      emergency: 'Emergency Protocol'
    };
    return names[id] || 'System';
  };

  // --- RENDER LOGIC ---

  if (viewMode === 'landing') {
    return (
      <LandingPage 
        isAuthenticated={isAuthenticated}
        onLoginRequest={() => {
           if (isAuthenticated) setViewMode('app');
           else setViewMode('login');
        }}
        onEmergency={() => setViewMode('emergency')}
      />
    );
  }

  if (viewMode === 'emergency') {
    return (
      <div className="min-h-screen bg-[#0b0f19]">
        <div className="absolute top-6 left-6 z-50">
           <button 
             onClick={() => setViewMode('landing')}
             className="flex items-center gap-2 text-slate-400 hover:text-white transition-colors bg-black/50 px-4 py-2 rounded-lg backdrop-blur-md border border-white/10"
           >
             <ArrowLeft className="w-4 h-4" /> Back
           </button>
        </div>
        <EmergencyMode />
      </div>
    );
  }

  if (viewMode === 'login') {
    return (
      <>
        <div className="absolute top-6 left-6 z-50">
           <button 
             onClick={() => setViewMode('landing')}
             className="flex items-center gap-2 text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white transition-colors"
           >
             <ArrowLeft className="w-4 h-4" /> Home
           </button>
        </div>
        <LoginScreen onLogin={handleLoginSuccess} />
      </>
    );
  }

  // --- MAIN APP VIEW ---
  return (
    <div className="min-h-screen bg-[#0b0f19] text-slate-200 font-sans selection:bg-indigo-500/30">
      
      {showWelcome && (
        <WelcomePopup 
          username={username} 
          onClose={() => setShowWelcome(false)} 
        />
      )}

      {/* Navbar */}
      <nav className="border-b border-white/5 bg-[#111827]/80 backdrop-blur-xl sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 md:px-6 h-16 flex items-center justify-between">
          
          <div className="flex-1 flex justify-start items-center gap-4">
            {activeChamber ? (
               <button 
                 onClick={returnToDashboard}
                 className="flex items-center gap-2 text-sm font-medium text-slate-400 hover:text-white transition-colors"
               >
                 <ArrowLeft className="w-4 h-4" />
                 <span className="hidden sm:inline">Dashboard</span>
               </button>
            ) : (
               <button 
                 className="flex items-center gap-2 px-3 py-1.5 rounded-lg hover:bg-white/5 text-slate-400 hover:text-white transition-colors"
                 onClick={() => setViewMode('landing')}
               >
                 <Home className="w-4 h-4" />
                 <span className="text-sm font-medium">Home</span>
               </button>
            )}
            
            {activeChamber && (
              <div className="hidden md:flex items-center gap-2 px-3 py-1 bg-slate-800 rounded-full border border-slate-700 animate-fade-in">
                 <Layers className="w-3 h-3 text-indigo-400" />
                 <span className="text-xs font-mono font-bold uppercase tracking-wider text-slate-300">
                   {getChamberName(activeChamber)}
                 </span>
              </div>
            )}
          </div>

          <div className="flex-1 flex items-center justify-end gap-4">
            <button 
              onClick={() => setViewMode('emergency')}
              className="hidden sm:flex items-center gap-2 px-3 py-1.5 bg-red-500/10 text-red-400 border border-red-500/20 rounded-lg text-xs font-bold hover:bg-red-500 hover:text-white transition-all"
            >
              <Activity className="w-3 h-3" /> SOS
            </button>
            <div className="h-6 w-px bg-white/10 hidden sm:block"></div>
            
            <div className="flex items-center gap-3">
              <span className="text-xs font-mono text-slate-500 hidden md:block">COMMANDER MODE</span>
              <button 
                onClick={handleLogout}
                className="flex items-center gap-2 text-xs font-medium text-slate-400 hover:text-white transition-colors"
              >
                <LogOut className="w-4 h-4" />
                <span className="hidden sm:inline">LOGOUT</span>
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Main Content Area */}
      <main className="relative z-10">
        {!activeChamber ? (
          /* DASHBOARD VIEW */
          <div className="max-w-7xl mx-auto px-6 py-12 animate-fade-in">
             <div className="mb-8 flex items-end justify-between">
                <div>
                  <h2 className="text-3xl font-bold text-white mb-2">Command Center</h2>
                  <p className="text-slate-400">Select a module to begin forensic analysis.</p>
                </div>
                <div className="hidden lg:block text-right">
                   <div className="text-xs text-slate-500 font-mono uppercase mb-1">System Status</div>
                   <div className="flex items-center gap-2 text-emerald-400 text-sm font-bold">
                      <span className="relative flex h-2 w-2">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                        <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                      </span>
                      OPERATIONAL
                   </div>
                </div>
             </div>
             <ChamberGrid onSelectChamber={(id) => {
               if (id === 'emergency') setViewMode('emergency');
               else setActiveChamber(id);
             }} />
          </div>
        ) : activeChamber === 'context_news' ? (
          <ContextChecker />
        ) : (
          /* ANALYSIS WORKSPACE */
          <div className="max-w-7xl mx-auto px-6 py-12 animate-fade-in">
            
            <div className="text-center mb-10">
              <h2 className="text-2xl font-bold text-white">{getChamberName(activeChamber)}</h2>
              <p className="text-slate-500 text-sm mt-2 font-mono">NEURAL SCANNER READY</p>
            </div>

            {(appState === AppState.IDLE || appState === AppState.ANALYZING) && (
              <div className="max-w-3xl mx-auto">
                 <UploadZone 
                    onFileSelect={handleFileAnalysis} 
                    isProcessing={appState === AppState.ANALYZING} 
                    file={currentFile}
                 />
              </div>
            )}

            {appState === AppState.ERROR && (
              <div className="max-w-xl mx-auto text-center p-8 mt-8 bg-slate-900 border border-red-900/50 rounded-lg animate-fade-in">
                <div className="w-12 h-12 bg-red-900/20 rounded-full flex items-center justify-center mx-auto mb-4">
                   <ShieldCheck className="w-6 h-6 text-red-500" />
                </div>
                <h3 className="text-xl font-bold text-white mb-2">Scan Failed</h3>
                <p className="text-slate-400 mb-6">{errorMsg}</p>
                <button 
                  onClick={handleResetAnalysis}
                  className="px-6 py-2 bg-slate-800 hover:bg-slate-700 text-white rounded font-medium transition-colors"
                >
                  Retry
                </button>
              </div>
            )}

            {appState === AppState.COMPLETE && result && (
              <div className="space-y-8 animate-fade-in-up">
                <div className="flex justify-between items-center mb-6">
                  <button 
                      onClick={handleResetAnalysis}
                      className="text-slate-400 hover:text-white flex items-center gap-2 text-sm transition-colors"
                  >
                    ← New Analysis
                  </button>
                  <div className="text-xs font-mono text-cyan-400 bg-cyan-500/10 px-3 py-1 rounded-full border border-cyan-500/20">
                    REPORT GENERATED
                  </div>
                </div>

                <AnalysisDashboard result={result} />
                
                {(result.deepfake_risk === 'high' || activeChamber === 'moderation') && (
                  <SafetyPanel isVisible={true} result={result} />
                )}
              </div>
            )}
          </div>
        )}
      </main>
    </div>
  );
}

export default App;