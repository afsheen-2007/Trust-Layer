import React, { useState } from 'react';
import { ShieldAlert, Phone, MapPin, FileText, Copy, ExternalLink, Globe, Lock, AlertOctagon } from 'lucide-react';
import { EmergencyContact, AnalysisResult } from '../types';

interface Props {
  isVisible: boolean;
  result: AnalysisResult;
}

const SafetyPanel: React.FC<Props> = ({ isVisible, result }) => {
  const [showLocationHelp, setShowLocationHelp] = useState(false);
  const [showReport, setShowReport] = useState(false);
  const [locationError, setLocationError] = useState<string | null>(null);
  const [copySuccess, setCopySuccess] = useState(false);
  
  const [contacts, setContacts] = useState<EmergencyContact[]>([
    { label: "Cybercrime Reporting", number: "112 (EU) / 911 (US)", description: "Emergency Services" },
    { label: "Identity Theft Hotline", number: "1-877-438-4338 (US)", description: "FTC Identity Recovery" },
    { label: "Digital Violence Helpline", number: "Online Report", description: "Varies by region" }
  ]);

  const reportContent = `TRUSTLAYER VERIFICATION REPORT
--------------------------------
REPORT ID: ${Math.random().toString(36).substring(7).toUpperCase()}-${Date.now().toString().substring(8)}
DATE: ${new Date().toISOString()}

ANALYSIS SUMMARY:
- AI Probability: ${result.ai_generated_probability}%
- Classification: HIGH RISK / SYNTHETIC
- Detected Artifacts: ${result.artifacts_detected.join(', ') || 'General synthetic patterns'}

ASSESSMENT:
The analyzed media exhibits structural and statistical anomalies consistent with AI generation.

RECOMMENDATION:
Review for policy violation regarding synthetic media, impersonation, and misinformation.

PRIVACY NOTE:
TrustLayer does not store user uploads. This report relies on real-time session analysis.
--------------------------------`;

  const handleLocate = () => {
    if (!navigator.geolocation) {
      setLocationError("Geolocation is not supported by your browser.");
      return;
    }

    setShowLocationHelp(true);
    navigator.geolocation.getCurrentPosition(
      (position) => {
        // Simulation of finding local numbers based on coordinates
        console.log("Locating support for:", position.coords);
        setContacts([
            { label: "Local Emergency", number: "911 / 112", description: "Nearest Emergency Services" },
            { label: "Regional Cyber Bureau", number: "Check Local Listings", description: "Police Cyber Division" },
             ...contacts
        ]);
      },
      (error) => {
        setLocationError("Unable to retrieve location automatically. Showing international defaults.");
      }
    );
  };

  const copyReport = () => {
    navigator.clipboard.writeText(reportContent);
    setCopySuccess(true);
    setTimeout(() => setCopySuccess(false), 2000);
  };

  if (!isVisible) return null;

  return (
    <div className="w-full max-w-5xl mx-auto mt-8 border-t-2 border-red-200 dark:border-red-900/50 pt-8 animate-fade-in-up" style={{ animationDelay: '0.4s' }}>
      
      {/* Main Alert Card */}
      <div className="bg-gradient-to-br from-red-50 to-white dark:from-red-950/40 dark:to-slate-900 border border-red-200 dark:border-red-900/50 rounded-xl overflow-hidden shadow-lg dark:shadow-2xl">
        
        {/* Header */}
        <div className="p-6 md:p-8 border-b border-red-200 dark:border-red-900/30 flex items-start gap-5">
          <div className="flex-shrink-0 bg-red-100 dark:bg-red-500/10 p-4 rounded-xl border border-red-200 dark:border-red-500/20">
            <AlertOctagon className="w-8 h-8 text-red-600 dark:text-red-500 animate-pulse" />
          </div>
          <div>
            <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-2 tracking-tight">Critical Response Recommended</h3>
            <p className="text-red-800 dark:text-red-100/90 text-lg leading-relaxed">
              This content shows strong indicators of being artificially generated or manipulated. 
              If shared publicly, it may cause harm, misinformation, or identity misuse.
            </p>
          </div>
        </div>

        {/* Action Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 divide-y md:divide-y-0 md:divide-x divide-red-200 dark:divide-red-900/30">
          
          {/* Column 1: Containment */}
          <div className="p-6 md:p-8 bg-red-50/50 dark:bg-red-950/10">
            <h4 className="text-red-600 dark:text-red-400 font-mono text-sm uppercase tracking-widest mb-4 flex items-center gap-2">
              <Globe className="w-4 h-4" /> Social Media Containment
            </h4>
            <p className="text-slate-700 dark:text-slate-300 text-sm mb-6">
              To prevent further spread, we recommend reporting and removing this content immediately.
              A verified takedown report has been prepared for you.
            </p>
            
            <button 
              onClick={() => setShowReport(!showReport)}
              className="w-full mb-6 flex items-center justify-center gap-2 px-4 py-3 bg-white dark:bg-slate-800 hover:bg-slate-50 dark:hover:bg-slate-700 border border-slate-300 dark:border-slate-700 text-slate-900 dark:text-white rounded-lg transition-all shadow-sm"
            >
              <FileText className="w-4 h-4" />
              {showReport ? 'Hide Takedown Report' : 'Generate Takedown Report'}
            </button>

            {/* Quick Links */}
            <div className="space-y-3">
               <p className="text-xs text-slate-500 font-mono uppercase">Report to Platform</p>
               <div className="flex flex-wrap gap-2">
                 {['Instagram', 'X (Twitter)', 'Facebook', 'TikTok', 'LinkedIn'].map(platform => (
                   <a key={platform} href="#" className="text-xs px-3 py-1.5 bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-800 rounded text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:border-slate-400 dark:hover:border-slate-600 transition-colors flex items-center gap-1">
                     {platform} <ExternalLink className="w-3 h-3" />
                   </a>
                 ))}
               </div>
            </div>
          </div>

          {/* Column 2: Escalation */}
          <div className="p-6 md:p-8 bg-white/50 dark:bg-slate-900/30">
             <h4 className="text-red-600 dark:text-red-400 font-mono text-sm uppercase tracking-widest mb-4 flex items-center gap-2">
              <ShieldAlert className="w-4 h-4" /> Real-World Safety Support
            </h4>
            <p className="text-slate-700 dark:text-slate-300 text-sm mb-6">
              If you feel threatened or harmed, you may choose to contact local authorities or cybercrime support. 
              This step is <span className="text-slate-900 dark:text-white font-bold">optional</span> and fully under your control.
            </p>

            {!showLocationHelp ? (
              <button 
                onClick={handleLocate}
                className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-red-600 hover:bg-red-700 text-white rounded-lg font-medium transition-colors shadow-lg shadow-red-900/20"
              >
                <MapPin className="w-4 h-4" />
                Find Local Cybercrime Support
              </button>
            ) : (
              <div className="space-y-3 animate-fade-in">
                {contacts.map((contact, idx) => (
                  <div key={idx} className="bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 p-3 rounded hover:border-red-400 dark:hover:border-red-500/30 transition-colors shadow-sm dark:shadow-none">
                    <div className="flex items-center justify-between">
                      <span className="text-slate-800 dark:text-slate-300 font-bold text-sm">{contact.label}</span>
                      <a href={`tel:${contact.number.split(' ')[0]}`} className="flex items-center gap-2 text-red-600 dark:text-red-400 hover:text-red-500 dark:hover:text-red-300 text-sm font-mono bg-red-50 dark:bg-red-950/30 px-2 py-1 rounded">
                        <Phone className="w-3 h-3" /> {contact.number}
                      </a>
                    </div>
                    <div className="text-xs text-slate-500 mt-1">{contact.description}</div>
                  </div>
                ))}
                {locationError && <p className="text-xs text-amber-500 mt-2">{locationError}</p>}
              </div>
            )}
            
            <p className="text-[10px] text-slate-500 dark:text-slate-600 mt-6 leading-tight flex gap-2">
              <Lock className="w-3 h-3 flex-shrink-0" />
              TrustLayer never automatically contacts law enforcement. We simply provide the right numbers if you choose to use them.
            </p>
          </div>
        </div>
      </div>

      {/* Takedown Report Modal / Overlay */}
      {showReport && (
        <div className="mt-4 bg-slate-900 border border-slate-800 rounded-xl p-6 animate-fade-in-up shadow-2xl relative">
          <div className="flex justify-between items-center mb-4">
            <h4 className="text-white font-mono text-sm font-bold flex items-center gap-2">
              <FileText className="w-4 h-4 text-primary-500" /> GENERATED REPORT
            </h4>
            <button 
              onClick={copyReport}
              className={`text-xs px-3 py-1.5 rounded flex items-center gap-2 transition-all ${copySuccess ? 'bg-emerald-500/20 text-emerald-400' : 'bg-primary-600 hover:bg-primary-500 text-white'}`}
            >
              {copySuccess ? 'COPIED TO CLIPBOARD' : 'COPY REPORT TEXT'}
              <Copy className="w-3 h-3" />
            </button>
          </div>
          <pre className="bg-black/50 p-4 rounded-lg text-xs md:text-sm font-mono text-slate-300 overflow-x-auto whitespace-pre-wrap border border-slate-800">
            {reportContent}
          </pre>
          <p className="text-xs text-slate-500 mt-3 text-center">
            Paste this report into the "Additional Details" section of social media reporting forms.
          </p>
        </div>
      )}
    </div>
  );
};

export default SafetyPanel;