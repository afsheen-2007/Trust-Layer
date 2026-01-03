import React, { useState } from 'react';
import { ShieldCheck, ArrowRight, User, Mail, Lock, CheckSquare, Square, Check, Loader2, Fingerprint } from 'lucide-react';

interface Props {
  onLogin: () => void;
}

const LoginScreen: React.FC<Props> = ({ onLogin }) => {
  const [isLogin, setIsLogin] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [isCaptchaChecked, setIsCaptchaChecked] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!isCaptchaChecked) {
      alert("Please verify you are not a robot.");
      return;
    }
    setIsLoading(true);
    setTimeout(() => {
      if (isLogin && rememberMe) {
        localStorage.setItem('trustlayer_session', JSON.stringify({
          valid: true,
          expiresAt: Date.now() + 7 * 24 * 60 * 60 * 1000 
        }));
      }
      onLogin();
    }, 1500);
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 relative overflow-hidden bg-[#0b0f19]">
      
      {/* Background decoration */}
      <div className="absolute inset-0 z-0">
         <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-indigo-600/10 rounded-full blur-[120px]"></div>
         <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-cyan-600/10 rounded-full blur-[120px]"></div>
      </div>

      <div className="w-full max-w-md bg-[#111827]/80 backdrop-blur-xl border border-white/10 rounded-2xl shadow-2xl p-8 animate-fade-in relative z-10">
        
        {/* Loading Progress Bar */}
        {isLoading && (
          <div className="absolute top-0 left-0 w-full h-1 bg-slate-800 rounded-t-2xl overflow-hidden">
            <div className="h-full bg-gradient-to-r from-cyan-400 to-indigo-500 animate-loading-bar shadow-[0_0_10px_rgba(79,70,229,0.5)]"></div>
          </div>
        )}

        {/* Header */}
        <div className="text-center mb-8 relative">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br from-cyan-500/10 to-indigo-500/10 mb-6 border border-white/10 relative group">
            <Fingerprint className={`w-8 h-8 text-cyan-400 transition-transform duration-700 ${isLoading ? 'scale-110' : ''}`} />
            {isLoading && (
              <div className="absolute inset-0 rounded-2xl border border-cyan-400/50 animate-ping"></div>
            )}
          </div>
          <h1 className="text-3xl font-bold text-white tracking-tight">
            Trust<span className="text-cyan-400">Layer</span>
          </h1>
          <p className="text-slate-400 text-sm mt-2">
            {isLogin ? "Authenticate to access the neural core." : "Join the sentinel network."}
          </p>
        </div>

        {/* Tabbed Navigation */}
        <div className={`flex bg-slate-900/50 p-1 rounded-lg mb-6 border border-white/5 relative transition-opacity duration-300 ${isLoading ? 'opacity-50 pointer-events-none' : ''}`}>
          <div 
            className={`absolute top-1 bottom-1 w-[calc(50%-4px)] bg-[#1f2937] border border-white/10 rounded-md shadow-sm transition-all duration-300 ease-in-out ${isLogin ? 'left-1' : 'left-[calc(50%+4px)]'}`} 
          />
          <button 
            type="button"
            onClick={() => setIsLogin(true)}
            className={`flex-1 py-2 text-sm font-medium rounded-md transition-colors relative z-10 ${isLogin ? 'text-white' : 'text-slate-500 hover:text-slate-300'}`}
          >
            Login
          </button>
          <button 
            type="button"
            onClick={() => setIsLogin(false)}
            className={`flex-1 py-2 text-sm font-medium rounded-md transition-colors relative z-10 ${!isLogin ? 'text-white' : 'text-slate-500 hover:text-slate-300'}`}
          >
            Sign Up
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className={`space-y-4 transition-all duration-300 ${isLogin ? '' : 'animate-fade-in'} ${isLoading ? 'opacity-60 pointer-events-none blur-[1px]' : ''}`}>
            {!isLogin && (
              <div className="space-y-1.5 animate-fade-in">
                <label className="text-xs font-mono text-cyan-400/80 ml-1 uppercase">Full Name</label>
                <div className="relative group">
                  <User className="w-4 h-4 text-slate-500 absolute left-3 top-3.5 group-focus-within:text-cyan-400 transition-colors" />
                  <input 
                    type="text" 
                    placeholder="Commander Shepard"
                    className="w-full bg-[#0b0f19] border border-slate-700 rounded-lg py-3 pl-10 pr-4 text-sm text-white focus:outline-none focus:border-cyan-500 transition-colors"
                    required={!isLogin}
                  />
                </div>
              </div>
            )}

            <div className="space-y-1.5">
              <label className="text-xs font-mono text-cyan-400/80 ml-1 uppercase">Email Identity</label>
              <div className="relative group">
                <Mail className="w-4 h-4 text-slate-500 absolute left-3 top-3.5 group-focus-within:text-cyan-400 transition-colors" />
                <input 
                  type="email" 
                  placeholder="analyst@trustlayer.ai"
                  className="w-full bg-[#0b0f19] border border-slate-700 rounded-lg py-3 pl-10 pr-4 text-sm text-white focus:outline-none focus:border-cyan-500 transition-colors"
                  defaultValue={isLogin ? "analyst@trustlayer.ai" : ""}
                  required
                />
              </div>
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-mono text-cyan-400/80 ml-1 uppercase">Security Key</label>
              <div className="relative group">
                <Lock className="w-4 h-4 text-slate-500 absolute left-3 top-3.5 group-focus-within:text-cyan-400 transition-colors" />
                <input 
                  type="password" 
                  placeholder="••••••••"
                  className="w-full bg-[#0b0f19] border border-slate-700 rounded-lg py-3 pl-10 pr-4 text-sm text-white focus:outline-none focus:border-cyan-500 transition-colors"
                  defaultValue={isLogin ? "password" : ""}
                  required
                />
              </div>
            </div>

            {isLogin && (
              <div className="flex items-center justify-between pt-1">
                <button 
                  type="button"
                  onClick={() => setRememberMe(!rememberMe)}
                  className="flex items-center gap-2 group focus:outline-none"
                >
                  <div className={`w-4 h-4 rounded border transition-colors flex items-center justify-center ${rememberMe ? 'bg-cyan-600 border-cyan-600' : 'bg-slate-900 border-slate-600 group-hover:border-slate-500'}`}>
                    {rememberMe && <Check className="w-3 h-3 text-white" />}
                  </div>
                  <span className="text-xs text-slate-400 group-hover:text-slate-300 select-none">Remember device</span>
                </button>
                <a href="#" className="text-xs text-indigo-400 hover:text-indigo-300 hover:underline">Recover Key?</a>
              </div>
            )}
          </div>

          <div 
            onClick={() => !isLoading && setIsCaptchaChecked(!isCaptchaChecked)}
            className={`flex items-center gap-3 p-3 bg-slate-900 border border-slate-700 rounded-lg cursor-pointer hover:bg-slate-800 transition-colors select-none mt-2 ${isLoading ? 'opacity-50 pointer-events-none' : ''}`}
          >
            {isCaptchaChecked ? (
              <CheckSquare className="w-5 h-5 text-cyan-400" />
            ) : (
              <Square className="w-5 h-5 text-slate-600" />
            )}
            <span className="text-sm text-slate-300">Verify human origin</span>
          </div>

          <button 
            type="submit"
            disabled={isLoading}
            className="w-full bg-gradient-to-r from-cyan-500 to-indigo-600 hover:from-cyan-400 hover:to-indigo-500 text-white font-bold py-3 rounded-lg shadow-[0_0_20px_rgba(6,182,212,0.3)] transition-all flex items-center justify-center gap-2 mt-4 disabled:opacity-80 disabled:cursor-wait"
          >
            {isLoading ? (
              <div className="flex items-center gap-2">
                 <Loader2 className="w-4 h-4 animate-spin" />
                 <span className="text-sm">AUTHENTICATING...</span>
              </div>
            ) : (
              <>
                {isLogin ? 'ACCESS SYSTEM' : 'INITIALIZE ACCOUNT'}
                <ArrowRight className="w-4 h-4" />
              </>
            )}
          </button>
        </form>
      </div>
    </div>
  );
};

export default LoginScreen;