import React from 'react';
import { 
  Image, 
  Video, 
  ShieldAlert, 
  UserX, 
  FileText, 
  Siren, 
  ArrowRight,
  Mic,
  AlignLeft,
  Globe
} from 'lucide-react';
import { ChamberId } from '../types';

interface Props {
  onSelectChamber: (id: ChamberId) => void;
}

const ChamberGrid: React.FC<Props> = ({ onSelectChamber }) => {
  const chambers = [
    {
      id: 'image_auth' as ChamberId,
      title: 'Image Authenticity',
      desc: 'Detects GAN/Diffusion artifacts in photos & docs.',
      icon: Image,
      color: 'indigo',
      badge: 'FORENSIC'
    },
    {
      id: 'video_deepfake' as ChamberId,
      title: 'Video & Deepfake',
      desc: 'Analyzes facial geometry & temporal consistency.',
      icon: Video,
      color: 'purple',
      badge: 'TEMPORAL'
    },
    {
      id: 'audio_auth' as ChamberId,
      title: 'Audio Forensics',
      desc: 'Detects voice cloning and TTS synthesis.',
      icon: Mic,
      color: 'cyan',
      badge: 'WAVEFORM'
    },
    {
      id: 'text_ai' as ChamberId,
      title: 'AI Text Provenance',
      desc: 'Identifies LLM patterns (ChatGPT, Claude).',
      icon: AlignLeft,
      color: 'slate',
      badge: 'LINGUISTIC'
    },
    {
      id: 'url_scanner' as ChamberId,
      title: 'Phishing Scanner',
      desc: 'Visual analysis of malicious websites.',
      icon: Globe,
      color: 'rose',
      badge: 'WEB SEC'
    },
    {
      id: 'moderation' as ChamberId,
      title: 'Content Safety',
      desc: 'Flags harassment, violence, & non-consensual media.',
      icon: ShieldAlert,
      color: 'emerald',
      badge: 'SAFETY'
    },
    {
      id: 'impersonation' as ChamberId,
      title: 'Impersonation Check',
      desc: 'Identifies fake identities & social engineering.',
      icon: UserX,
      color: 'amber',
      badge: 'FRAUD'
    },
    {
      id: 'context_news' as ChamberId,
      title: 'News Verification',
      desc: 'Cross-references claims with global knowledge.',
      icon: FileText,
      color: 'blue',
      badge: 'CONTEXT'
    },
    {
      id: 'emergency' as ChamberId,
      title: 'Emergency Mode',
      desc: 'Immediate personal safety & location support.',
      icon: Siren,
      color: 'red',
      badge: 'SOS',
      special: true
    }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 animate-fade-in">
      {chambers.map((chamber) => (
        <button
          key={chamber.id}
          onClick={() => onSelectChamber(chamber.id)}
          className={`group relative overflow-hidden rounded-2xl border text-left transition-all duration-300 hover:-translate-y-1 hover:shadow-xl
            ${chamber.special 
              ? 'bg-red-50 dark:bg-red-950/20 border-red-200 dark:border-red-900/50 hover:border-red-400 dark:hover:border-red-500' 
              : 'bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 hover:border-indigo-400 dark:hover:border-indigo-500'
            }`}
        >
          {/* Background Glow */}
          <div className={`absolute top-0 right-0 p-12 opacity-0 group-hover:opacity-10 transition-opacity duration-500
            ${chamber.special ? 'bg-red-500' : 'bg-indigo-500'} blur-3xl rounded-full translate-x-10 -translate-y-10`} 
          />

          <div className="p-6 relative z-10 flex flex-col h-full">
            <div className="flex justify-between items-start mb-6">
              <div className={`p-3 rounded-xl ${
                chamber.special 
                  ? 'bg-red-100 dark:bg-red-500/20 text-red-600 dark:text-red-500' 
                  : 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-200 group-hover:bg-indigo-50 dark:group-hover:bg-indigo-500/20 group-hover:text-indigo-600 dark:group-hover:text-indigo-400'
                } transition-colors`}>
                <chamber.icon className="w-6 h-6" />
              </div>
              <span className={`text-[10px] font-mono font-bold px-2 py-1 rounded border uppercase tracking-wider
                ${chamber.special
                  ? 'bg-red-100 dark:bg-red-500/10 text-red-600 dark:text-red-400 border-red-200 dark:border-red-500/20'
                  : 'bg-slate-100 dark:bg-slate-800 text-slate-500 border-slate-200 dark:border-slate-700'
                }`}>
                {chamber.badge}
              </span>
            </div>

            <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-2 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
              {chamber.title}
            </h3>
            <p className="text-slate-500 dark:text-slate-400 text-sm leading-relaxed mb-6 flex-grow">
              {chamber.desc}
            </p>

            <div className="flex items-center text-xs font-bold uppercase tracking-widest gap-2">
              <span className={chamber.special ? 'text-red-600 dark:text-red-400' : 'text-slate-400 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors'}>
                Select Chamber
              </span>
              <ArrowRight className={`w-3 h-3 transition-transform group-hover:translate-x-1 ${chamber.special ? 'text-red-600' : 'text-indigo-500'}`} />
            </div>
          </div>
        </button>
      ))}
    </div>
  );
};

export default ChamberGrid;