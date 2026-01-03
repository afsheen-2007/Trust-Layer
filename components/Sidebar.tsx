import React from 'react';
import { LayoutDashboard, ShieldCheck, FileCode, Settings, LogOut, Aperture, Activity, ShieldAlert, ScanFace } from 'lucide-react';
import { View } from '../types';

interface SidebarProps {
  activeTab: View;
  setActiveTab: (tab: View) => void;
  onLogout: () => void;
}

export const Sidebar: React.FC<SidebarProps> = ({ activeTab, setActiveTab, onLogout }) => {
  const navItems = [
    { id: 'dashboard', label: 'Dashboard', icon: <LayoutDashboard size={20} /> },
    { id: 'moderation', label: 'Moderation', icon: <ShieldCheck size={20} /> },
    { id: 'deepfake', label: 'Deepfake Check', icon: <ScanFace size={20} /> },
    { id: 'ai-check', label: 'AI Detection', icon: <ShieldAlert size={20} /> },
    { id: 'analytics', label: 'Analytics', icon: <Activity size={20} /> },
    { id: 'developer', label: 'Developers', icon: <FileCode size={20} /> },
  ];

  return (
    <aside className="hidden md:flex flex-col w-64 h-screen bg-white dark:bg-slate-900 border-r border-slate-200 dark:border-slate-800 fixed left-0 top-0 z-30 transition-colors">
      <div className="p-6 flex items-center space-x-3 border-b border-slate-100 dark:border-slate-800">
        <div className="bg-brand-600 p-2 rounded-lg text-white">
          <Aperture size={24} />
        </div>
        <div>
          <h1 className="text-xl font-bold tracking-tight text-slate-900 dark:text-white">TrustLayer</h1>
          <p className="text-xs text-slate-500 font-medium">Enterprise Security</p>
        </div>
      </div>

      <nav className="flex-1 px-4 py-6 space-y-1">
        {navItems.map((item) => (
          <button
            key={item.id}
            onClick={() => setActiveTab(item.id as View)}
            className={`flex items-center w-full space-x-3 px-4 py-3 rounded-lg text-sm font-medium transition-all duration-200 ${
              activeTab === item.id
                ? 'bg-brand-50 text-brand-600 dark:bg-brand-900/20 dark:text-brand-500 shadow-sm'
                : 'text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800 hover:text-slate-900 dark:hover:text-slate-200'
            }`}
          >
            {item.icon}
            <span>{item.label}</span>
          </button>
        ))}
      </nav>

      <div className="p-4 border-t border-slate-100 dark:border-slate-800">
        <button 
          onClick={onLogout}
          className="flex items-center space-x-3 px-4 py-3 w-full text-slate-500 dark:text-slate-400 hover:text-red-500 dark:hover:text-red-400 transition-colors text-sm font-medium"
        >
          <LogOut size={20} />
          <span>Sign Out</span>
        </button>
      </div>
    </aside>
  );
};