import React from 'react';
import { X, ShieldAlert, Lock, EyeOff, Server, AlertTriangle, CheckCircle } from 'lucide-react';

interface Props {
  onClose: () => void;
}

const KnowledgeBase: React.FC<Props> = ({ onClose }) => {
  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center px-4 bg-black/80 backdrop-blur-md animate-fade-in">
      <div className="w-full max-w-4xl bg-[#111827] border border-indigo-500/30 rounded-2xl shadow-2xl flex flex-col max-h-[90vh] overflow-hidden relative animate-fade-in-up">
        
        {/* Header */}
        <div className="p-6 border-b border-white/10 flex justify-between items-center bg-indigo-900/20">
           <div className="flex items-center gap-3">
              <div className="p-2 bg-indigo-500/20 rounded-lg">
                 <ShieldAlert className="w-6 h-6 text-indigo-400" />
              </div>
              <div>
                <h2 className="text-xl font-bold text-white">Knowledge Center</h2>
                <p className="text-xs text-indigo-300 font-mono uppercase tracking-wider">AI Awareness & Safety Protocols</p>
              </div>
           </div>
           <button onClick={onClose} className="text-slate-400 hover:text-white transition-colors">
              <X className="w-6 h-6" />
           </button>
        </div>

        {/* Content Scroll */}
        <div className="overflow-y-auto p-6 md:p-8 space-y-8 custom-scrollbar">
           
           {/* Critical Warning */}
           <div className="bg-red-500/10 border border-red-500/20 rounded-xl p-6">
              <h3 className="text-red-400 font-bold text-lg mb-2 flex items-center gap-2">
                 <AlertTriangle className="w-5 h-5" />
                 CRITICAL ADVISORY: The "Upload" Trap
              </h3>
              <p className="text-slate-300 leading-relaxed text-sm">
                 <strong className="text-white">DO NOT</strong> upload personal photos, voice recordings, or videos to "fun" AI generators, unverified face-swap apps, or unofficial analysis tools.
                 <br/><br/>
                 Many free AI services monetize by <strong className="text-white">harvesting your biometric data</strong> to train deepfake models. Once your facial geometry is in a public dataset, it can be weaponized for identity theft forever.
              </p>
           </div>

           {/* Grid of Knowledge */}
           <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              
              <div className="space-y-4">
                 <h4 className="text-white font-bold flex items-center gap-2">
                    <Lock className="w-5 h-5 text-emerald-400" />
                    Data Hygiene Protocol
                 </h4>
                 <ul className="space-y-3">
                    <li className="flex gap-3 text-sm text-slate-400">
                       <CheckCircle className="w-4 h-4 text-emerald-500 flex-shrink-0 mt-0.5" />
                       <span>Use tools (like TrustLayer) that process data <strong>locally or in RAM</strong> without permanent storage.</span>
                    </li>
                    <li className="flex gap-3 text-sm text-slate-400">
                       <CheckCircle className="w-4 h-4 text-emerald-500 flex-shrink-0 mt-0.5" />
                       <span>Scrub metadata (EXIF) from images before sharing on public forums.</span>
                    </li>
                    <li className="flex gap-3 text-sm text-slate-400">
                       <CheckCircle className="w-4 h-4 text-emerald-500 flex-shrink-0 mt-0.5" />
                       <span>Watermark sensitive documents with "DO NOT TRUST" if meant for limited viewing.</span>
                    </li>
                 </ul>
              </div>

              <div className="space-y-4">
                 <h4 className="text-white font-bold flex items-center gap-2">
                    <EyeOff className="w-5 h-5 text-amber-400" />
                    Identifying Malicious Sites
                 </h4>
                 <ul className="space-y-3">
                    <li className="flex gap-3 text-sm text-slate-400">
                       <AlertTriangle className="w-4 h-4 text-amber-500 flex-shrink-0 mt-0.5" />
                       <span>Check the URL certificate. Phishing sites often use slightly altered domains (e.g., g0ogle.com).</span>
                    </li>
                    <li className="flex gap-3 text-sm text-slate-400">
                       <AlertTriangle className="w-4 h-4 text-amber-500 flex-shrink-0 mt-0.5" />
                       <span>Avoid sites asking for "Reference Photos" without a clear Privacy Policy.</span>
                    </li>
                    <li className="flex gap-3 text-sm text-slate-400">
                       <AlertTriangle className="w-4 h-4 text-amber-500 flex-shrink-0 mt-0.5" />
                       <span>Be wary of "Free Deepfake Removal" services that require account creation.</span>
                    </li>
                 </ul>
              </div>

           </div>

           {/* How TrustLayer Protects */}
           <div className="bg-slate-800/50 rounded-xl p-6 border border-slate-700">
              <h3 className="text-indigo-400 font-bold mb-3 flex items-center gap-2">
                 <Server className="w-5 h-5" />
                 How TrustLayer Protects You
              </h3>
              <p className="text-sm text-slate-400 mb-4">
                 We adhere to a strict <strong>Zero-Retention Policy</strong>.
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-center">
                 <div className="bg-slate-900 p-3 rounded-lg border border-slate-800">
                    <div className="text-xs text-slate-500 uppercase font-bold">Upload</div>
                    <div className="text-white font-mono text-sm">Encrypted RAM</div>
                 </div>
                 <div className="bg-slate-900 p-3 rounded-lg border border-slate-800">
                    <div className="text-xs text-slate-500 uppercase font-bold">Analysis</div>
                    <div className="text-white font-mono text-sm">Ephemeral</div>
                 </div>
                 <div className="bg-slate-900 p-3 rounded-lg border border-slate-800">
                    <div className="text-xs text-slate-500 uppercase font-bold">Post-Scan</div>
                    <div className="text-white font-mono text-sm">Auto-Wiped</div>
                 </div>
              </div>
           </div>

        </div>

        {/* Footer */}
        <div className="p-6 border-t border-white/10 bg-slate-900 flex justify-end">
           <button 
             onClick={onClose}
             className="px-6 py-2 bg-indigo-600 hover:bg-indigo-500 text-white rounded-lg font-bold transition-colors shadow-lg shadow-indigo-500/20"
           >
             I Understand
           </button>
        </div>

      </div>
    </div>
  );
};

export default KnowledgeBase;