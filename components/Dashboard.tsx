import React from 'react';
import { View } from '../types';
import { ShieldAlert, ScanFace, Image, Video, Activity, FileCode } from 'lucide-react';

interface DashboardProps {
  onNavigate: (view: View) => void;
}

export const Dashboard: React.FC<DashboardProps> = ({ onNavigate }) => {
  const cards = [
    { 
      id: 'moderation', 
      title: 'Image Moderation', 
      desc: 'Detect NSFW, violence, and gore.', 
      icon: <Image size={24} />, 
      color: 'bg-blue-500', 
      nav: 'moderation' as View 
    },
    { 
      id: 'deepfake', 
      title: 'Deepfake Detector', 
      desc: 'Analyze face swaps and synthetic media.', 
      icon: <ScanFace size={24} />, 
      color: 'bg-purple-500', 
      nav: 'deepfake' as View 
    },
    { 
      id: 'aicheck', 
      title: 'AI Image Check', 
      desc: 'Identify Midjourney & DALL-E outputs.', 
      icon: <ShieldAlert size={24} />, 
      color: 'bg-emerald-500', 
      nav: 'ai-check' as View 
    },
    { 
      id: 'video', 
      title: 'Video Analysis', 
      desc: 'Frame-by-frame video safety check.', 
      icon: <Video size={24} />, 
      color: 'bg-pink-500', 
      nav: 'moderation' as View // Reusing moderation for demo
    },
    { 
      id: 'analytics', 
      title: 'Usage Analytics', 
      desc: 'Track volume and detection stats.', 
      icon: <Activity size={24} />, 
      color: 'bg-orange-500', 
      nav: 'analytics' as View 
    },
    { 
      id: 'api', 
      title: 'Developer API', 
      desc: 'Integration docs and API keys.', 
      icon: <FileCode size={24} />, 
      color: 'bg-slate-600', 
      nav: 'developer' as View 
    },
  ];

  return (
    <div className="space-y-8 animate-fade-in">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
           <h1 className="text-3xl font-bold text-slate-900 dark:text-white">Dashboard Overview</h1>
           <p className="text-slate-500 dark:text-slate-400">Welcome back, User. System Status: <span className="text-green-500 font-semibold">Operational</span></p>
        </div>
        <button className="bg-brand-600 hover:bg-brand-500 text-white px-4 py-2 rounded-lg font-medium shadow-sm transition-colors">
           + New Scan
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {cards.map((card) => (
          <button 
            key={card.id}
            onClick={() => onNavigate(card.nav)}
            className="group relative bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 hover:border-brand-500 dark:hover:border-brand-500 transition-all text-left shadow-sm hover:shadow-md"
          >
             <div className={`w-12 h-12 rounded-xl ${card.color} flex items-center justify-center text-white mb-4 shadow-lg`}>
                {card.icon}
             </div>
             <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-2">{card.title}</h3>
             <p className="text-sm text-slate-500 dark:text-slate-400">{card.desc}</p>
             
             <div className="absolute top-6 right-6 opacity-0 group-hover:opacity-100 transition-opacity text-slate-400">
               &rarr;
             </div>
          </button>
        ))}
      </div>

      <div className="bg-white dark:bg-slate-900 rounded-2xl p-6 border border-slate-200 dark:border-slate-800">
         <h3 className="font-semibold text-slate-900 dark:text-white mb-4">Recent Activity</h3>
         <div className="overflow-x-auto">
            <table className="w-full text-sm text-left">
              <thead className="text-xs text-slate-500 uppercase bg-slate-50 dark:bg-slate-800/50">
                <tr>
                  <th className="px-4 py-3 rounded-l-lg">ID</th>
                  <th className="px-4 py-3">Type</th>
                  <th className="px-4 py-3">Result</th>
                  <th className="px-4 py-3">Score</th>
                  <th className="px-4 py-3 rounded-r-lg">Time</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                {[
                  { id: '#TR-8821', type: 'Image Check', res: 'Safe', score: '0.02', time: '2 mins ago', status: 'text-green-500' },
                  { id: '#TR-8820', type: 'Deepfake Scan', res: 'High Risk', score: '0.94', time: '15 mins ago', status: 'text-red-500' },
                  { id: '#TR-8819', type: 'Video Mod', res: 'Warning', score: '0.45', time: '1 hour ago', status: 'text-yellow-500' },
                  { id: '#TR-8818', type: 'Image Check', res: 'Safe', score: '0.11', time: '2 hours ago', status: 'text-green-500' },
                ].map((row, i) => (
                  <tr key={i} className="hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors">
                    <td className="px-4 py-3 font-mono text-slate-500">{row.id}</td>
                    <td className="px-4 py-3 font-medium text-slate-900 dark:text-white">{row.type}</td>
                    <td className={`px-4 py-3 font-semibold ${row.status}`}>{row.res}</td>
                    <td className="px-4 py-3">{row.score}</td>
                    <td className="px-4 py-3 text-slate-500">{row.time}</td>
                  </tr>
                ))}
              </tbody>
            </table>
         </div>
      </div>
    </div>
  );
};