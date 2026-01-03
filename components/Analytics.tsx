import React from 'react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, LineChart, Line, CartesianGrid } from 'recharts';

export const Analytics: React.FC = () => {
  const data = [
    { name: 'Mon', scans: 400, deepfakes: 24 },
    { name: 'Tue', scans: 300, deepfakes: 13 },
    { name: 'Wed', scans: 550, deepfakes: 48 },
    { name: 'Thu', scans: 480, deepfakes: 35 },
    { name: 'Fri', scans: 690, deepfakes: 62 },
    { name: 'Sat', scans: 350, deepfakes: 15 },
    { name: 'Sun', scans: 200, deepfakes: 10 },
  ];

  return (
    <div className="space-y-6 animate-fade-in">
       <h2 className="text-2xl font-bold text-slate-900 dark:text-white">Platform Analytics</h2>
       
       <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm">
             <p className="text-sm text-slate-500">Total Scans (7d)</p>
             <p className="text-3xl font-bold text-slate-900 dark:text-white mt-2">2,970</p>
             <div className="mt-2 text-xs text-green-500 flex items-center">
                <span>↑ 12% vs last week</span>
             </div>
          </div>
          <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm">
             <p className="text-sm text-slate-500">Deepfakes Detected</p>
             <p className="text-3xl font-bold text-slate-900 dark:text-white mt-2">207</p>
             <div className="mt-2 text-xs text-red-500 flex items-center">
                <span>↑ 5% vs last week</span>
             </div>
          </div>
          <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm">
             <p className="text-sm text-slate-500">API Latency (Avg)</p>
             <p className="text-3xl font-bold text-slate-900 dark:text-white mt-2">142ms</p>
             <div className="mt-2 text-xs text-green-500 flex items-center">
                <span>↓ 18ms improvement</span>
             </div>
          </div>
       </div>

       <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm h-[400px]">
          <h3 className="text-lg font-semibold mb-6 text-slate-900 dark:text-white">Detection Volume</h3>
          <ResponsiveContainer width="100%" height="100%">
             <BarChart data={data}>
                <CartesianGrid strokeDasharray="3 3" opacity={0.1} />
                <XAxis dataKey="name" stroke="#64748b" fontSize={12} tickLine={false} axisLine={false} />
                <YAxis stroke="#64748b" fontSize={12} tickLine={false} axisLine={false} />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#1e293b', border: 'none', borderRadius: '8px', color: '#fff' }}
                  cursor={{ fill: 'rgba(255,255,255,0.05)' }}
                />
                <Bar dataKey="scans" fill="#3b82f6" radius={[4, 4, 0, 0]} name="Total Scans" />
                <Bar dataKey="deepfakes" fill="#ef4444" radius={[4, 4, 0, 0]} name="Deepfakes" />
             </BarChart>
          </ResponsiveContainer>
       </div>
    </div>
  );
};