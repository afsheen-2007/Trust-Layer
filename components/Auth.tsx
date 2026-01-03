import React, { useState } from 'react';
import { Shield, Loader2, ArrowRight } from 'lucide-react';

interface AuthProps {
  onSuccess: (user: { name: string; email: string }) => void;
  onBack: () => void;
  initialMode?: 'login' | 'signup';
}

export const Auth: React.FC<AuthProps> = ({ onSuccess, onBack, initialMode = 'login' }) => {
  const [mode, setMode] = useState(initialMode);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    isNotRobot: false
  });
  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!formData.isNotRobot) {
      setError('Please verify you are not a robot.');
      return;
    }

    if (mode === 'signup' && formData.password !== formData.confirmPassword) {
      setError('Passwords do not match.');
      return;
    }

    setLoading(true);
    // Simulate API call
    setTimeout(() => {
      setLoading(false);
      onSuccess({ 
        name: mode === 'login' ? 'Demo User' : formData.name, 
        email: formData.email 
      });
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 flex flex-col justify-center items-center p-6">
       <button onClick={onBack} className="absolute top-6 left-6 text-slate-500 hover:text-brand-600 font-medium text-sm">
         &larr; Back to Home
       </button>

       <div className="w-full max-w-md bg-white dark:bg-slate-900 rounded-2xl shadow-xl border border-slate-200 dark:border-slate-800 p-8">
          <div className="flex flex-col items-center mb-8">
            <div className="bg-brand-100 dark:bg-brand-900/30 p-3 rounded-xl mb-4 text-brand-600 dark:text-brand-400">
              <Shield size={32} />
            </div>
            <h2 className="text-2xl font-bold text-slate-900 dark:text-white">
              {mode === 'login' ? 'Welcome Back' : 'Create Account'}
            </h2>
            <p className="text-slate-500 dark:text-slate-400 text-sm mt-2">
              {mode === 'login' ? 'Enter your credentials to access the dashboard' : 'Start verifying media in seconds'}
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
             {mode === 'signup' && (
               <div>
                 <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Full Name</label>
                 <input 
                   type="text" 
                   required
                   className="w-full px-4 py-2 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:ring-2 focus:ring-brand-500 outline-none"
                   value={formData.name}
                   onChange={e => setFormData({...formData, name: e.target.value})}
                 />
               </div>
             )}
             <div>
               <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Email Address</label>
               <input 
                 type="email" 
                 required
                 className="w-full px-4 py-2 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:ring-2 focus:ring-brand-500 outline-none"
                 value={formData.email}
                 onChange={e => setFormData({...formData, email: e.target.value})}
               />
             </div>
             <div>
               <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Password</label>
               <input 
                 type="password" 
                 required
                 className="w-full px-4 py-2 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:ring-2 focus:ring-brand-500 outline-none"
                 value={formData.password}
                 onChange={e => setFormData({...formData, password: e.target.value})}
               />
             </div>
             {mode === 'signup' && (
               <div>
                 <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Confirm Password</label>
                 <input 
                   type="password" 
                   required
                   className="w-full px-4 py-2 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:ring-2 focus:ring-brand-500 outline-none"
                   value={formData.confirmPassword}
                   onChange={e => setFormData({...formData, confirmPassword: e.target.value})}
                 />
               </div>
             )}

             <div className="flex items-center space-x-2 py-2">
               <input 
                 type="checkbox" 
                 id="robot" 
                 checked={formData.isNotRobot}
                 onChange={e => setFormData({...formData, isNotRobot: e.target.checked})}
                 className="w-4 h-4 text-brand-600 rounded border-slate-300 focus:ring-brand-500"
               />
               <label htmlFor="robot" className="text-sm text-slate-600 dark:text-slate-400">I am not a robot</label>
             </div>

             {error && <div className="text-red-500 text-sm font-medium">{error}</div>}

             <button 
               type="submit"
               disabled={loading}
               className="w-full py-3 bg-brand-600 hover:bg-brand-500 text-white font-semibold rounded-lg shadow-lg shadow-brand-500/20 transition-all flex items-center justify-center"
             >
               {loading ? <Loader2 className="animate-spin" size={20} /> : (mode === 'login' ? 'Sign In' : 'Create Account')}
             </button>
          </form>

          <div className="mt-6 text-center text-sm text-slate-500">
             {mode === 'login' ? "Don't have an account? " : "Already have an account? "}
             <button 
               onClick={() => { setMode(mode === 'login' ? 'signup' : 'login'); setError(''); }}
               className="text-brand-600 hover:text-brand-500 font-semibold"
             >
               {mode === 'login' ? 'Sign up' : 'Log in'}
             </button>
          </div>
       </div>
    </div>
  );
};