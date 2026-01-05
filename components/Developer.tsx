import React, { useState } from 'react';
import { Copy, Eye, EyeOff, Terminal, Check } from 'lucide-react';

export const Developer: React.FC = () => {
  const [showKey, setShowKey] = useState(false);
  const [copied, setCopied] = useState(false);
  
  const apiKey = "API_KEY_PLACEHOLDER";

  const copyToClipboard = () => {
    navigator.clipboard.writeText(apiKey);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="space-y-8 animate-fade-in">
       <div className="bg-slate-900 text-white p-8 rounded-2xl relative overflow-hidden">
          <div className="relative z-10">
            <h2 className="text-2xl font-bold mb-2">Developer API</h2>
            <p className="text-slate-400 max-w-xl">
              Integrate TrustLayer detection capabilities directly into your applications. 
              API integration coming soon.
            </p>
          </div>
          <Terminal className="absolute right-8 bottom-8 text-slate-800 opacity-50" size={120} />
       </div>

       <div className="bg-white dark:bg-slate-900 rounded-2xl p-6 border border-slate-200 dark:border-slate-800 shadow-sm">
         <h3 className="font-semibold text-slate-900 dark:text-white mb-4">API Credentials</h3>
         <div className="flex items-center space-x-4">
            <div className="flex-1 bg-slate-100 dark:bg-slate-950 rounded-lg px-4 py-3 font-mono text-sm border border-slate-200 dark:border-slate-800 flex items-center justify-between">
              <span className="text-slate-600 dark:text-slate-300">
                {showKey ? apiKey : 'sk_trust_•••••••••••••••••••••••••'}
              </span>
              <button onClick={() => setShowKey(!showKey)} className="text-slate-400 hover:text-slate-600 dark:hover:text-slate-200">
                {showKey ? <EyeOff size={16} /> : <Eye size={16} />}
              </button>
            </div>
            <button 
              onClick={copyToClipboard}
              className="bg-brand-600 hover:bg-brand-500 text-white px-4 py-3 rounded-lg font-medium shadow-sm transition-colors flex items-center"
            >
              {copied ? <Check size={18} /> : <Copy size={18} />}
              <span className="ml-2">{copied ? 'Copied' : 'Copy'}</span>
            </button>
         </div>
       </div>

       <div className="bg-white dark:bg-slate-900 rounded-2xl p-6 border border-slate-200 dark:border-slate-800 shadow-sm">
          <h3 className="font-semibold text-slate-900 dark:text-white mb-4">Sample Request</h3>
          <div className="space-y-4">
             <div className="flex space-x-2 border-b border-slate-200 dark:border-slate-800">
                <button className="px-4 py-2 text-brand-600 border-b-2 border-brand-600 font-medium text-sm">cURL</button>
                <button className="px-4 py-2 text-slate-500 hover:text-slate-700 dark:hover:text-slate-300 font-medium text-sm">Python</button>
                <button className="px-4 py-2 text-slate-500 hover:text-slate-700 dark:hover:text-slate-300 font-medium text-sm">Node.js</button>
             </div>
             <pre className="bg-slate-950 text-slate-300 p-4 rounded-xl font-mono text-sm overflow-x-auto custom-scrollbar">
{`curl -X POST https://api.trustlayer.ai/v1/detect \\
  -H "Authorization: Bearer ${apiKey}" \\
  -H "Content-Type: application/json" \\
  -d '{
    "url": "https://example.com/image.jpg",
    "models": ["deepfake", "moderation", "ai-generated"]
  }'`}
             </pre>
          </div>
       </div>
    </div>
  );
};