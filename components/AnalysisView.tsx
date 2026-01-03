import React from 'react';
import { AnalysisResult } from '../types';
import { CheckCircle2, AlertTriangle, FileJson, ShieldAlert, Tag } from 'lucide-react';
import { PieChart, Pie, Cell, ResponsiveContainer } from 'recharts';

interface AnalysisViewProps {
  imageSrc: string;
  result: AnalysisResult;
  onReset: () => void;
}

const COLORS = {
  safe: '#10b981',
  warning: '#f59e0b',
  unsafe: '#ef4444',
  slate: '#64748b'
};

export const AnalysisView: React.FC<AnalysisViewProps> = ({ imageSrc, result, onReset }) => {
  // Adaptation logic for the new AnalysisResult type
  const aiScore = result.ai_generated_probability / 100; // Convert 0-100 to 0-1
  const deepfakeScoreMap = { low: 0.1, medium: 0.5, high: 0.95 };
  const deepfakeScore = deepfakeScoreMap[result.deepfake_risk] || 0;
  const manipulationScore = (aiScore + deepfakeScore) / 2;
  
  // Mock moderation data based on risk
  const moderation = [
    { category: 'Deepfake', score: deepfakeScore, label: result.deepfake_risk === 'high' ? 'unsafe' : 'safe' },
    { category: 'Synthetic', score: aiScore, label: aiScore > 0.5 ? 'unsafe' : 'safe' },
    { category: 'Visual Artifacts', score: result.artifacts_detected.length > 0 ? 0.8 : 0.1, label: result.artifacts_detected.length > 0 ? 'warning' : 'safe' }
  ];

  const overallSafety = 100 - (Math.max(aiScore, deepfakeScore) * 100);
  
  const getScoreColor = (score: number) => {
    if (score > 0.8) return 'text-red-500';
    if (score > 0.4) return 'text-yellow-500';
    return 'text-green-500';
  };

  const getScoreBg = (score: number) => {
    if (score > 0.8) return 'bg-red-500';
    if (score > 0.4) return 'bg-yellow-500';
    return 'bg-green-500';
  };

  return (
    <div className="grid grid-cols-1 xl:grid-cols-12 gap-6 animate-fade-in">
      {/* Left Column: Image Preview */}
      <div className="xl:col-span-5 space-y-6">
        <div className="bg-white dark:bg-slate-900 rounded-2xl p-6 shadow-sm border border-slate-200 dark:border-slate-800 h-fit">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-semibold text-slate-900 dark:text-white flex items-center">
              Original Image
            </h3>
            <span className="text-xs font-mono text-slate-500 bg-slate-100 dark:bg-slate-800 px-2 py-1 rounded">
              842ms
            </span>
          </div>
          <div className="relative rounded-xl overflow-hidden bg-slate-100 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 flex items-center justify-center min-h-[300px]">
            <img src={imageSrc} alt="Analyzed" className="max-w-full max-h-[500px] object-contain" />
          </div>
          
          {/* Trust Scores - New Section */}
          <div className="mt-6 grid grid-cols-3 gap-3">
             <div className="bg-slate-50 dark:bg-slate-800/50 p-3 rounded-xl border border-slate-100 dark:border-slate-800 text-center">
                <div className="text-xs text-slate-500 mb-1">AI Gen</div>
                <div className={`text-lg font-bold ${getScoreColor(aiScore)}`}>
                  {Math.round(result.ai_generated_probability)}%
                </div>
             </div>
             <div className="bg-slate-50 dark:bg-slate-800/50 p-3 rounded-xl border border-slate-100 dark:border-slate-800 text-center">
                <div className="text-xs text-slate-500 mb-1">Deepfake</div>
                <div className={`text-lg font-bold ${getScoreColor(deepfakeScore)}`}>
                  {Math.round(deepfakeScore * 100)}%
                </div>
             </div>
             <div className="bg-slate-50 dark:bg-slate-800/50 p-3 rounded-xl border border-slate-100 dark:border-slate-800 text-center">
                <div className="text-xs text-slate-500 mb-1">Manipulation</div>
                <div className={`text-lg font-bold ${getScoreColor(manipulationScore)}`}>
                  {Math.round(manipulationScore * 100)}%
                </div>
             </div>
          </div>
        </div>

        {/* Labels Card */}
        <div className="bg-white dark:bg-slate-900 rounded-2xl p-6 shadow-sm border border-slate-200 dark:border-slate-800">
          <h3 className="font-semibold text-slate-900 dark:text-white mb-4 flex items-center">
            <Tag className="mr-2 text-brand-500" size={20} />
            Classified Labels
          </h3>
          <div className="flex flex-wrap gap-2">
            {result.artifacts_detected.map((label, idx) => (
              <span key={idx} className="px-3 py-1.5 bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 rounded-full text-sm font-medium border border-slate-200 dark:border-slate-700">
                {label}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Right Column: Metrics */}
      <div className="xl:col-span-7 space-y-6">
        
        {/* Verification Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
           <div className="bg-white dark:bg-slate-900 rounded-2xl p-6 shadow-sm border border-slate-200 dark:border-slate-800">
              <h3 className="font-semibold text-slate-900 dark:text-white mb-4 flex items-center">
                <ShieldAlert className="mr-2 text-purple-500" size={20} />
                Authenticity Check
              </h3>
              <div className="space-y-4">
                 <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span className="text-slate-600 dark:text-slate-400">AI Generation Probability</span>
                      <span className="font-medium">{Math.round(result.ai_generated_probability)}%</span>
                    </div>
                    <div className="h-2 w-full bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
                       <div className={`h-full ${getScoreBg(aiScore)} rounded-full`} style={{ width: `${result.ai_generated_probability}%` }}></div>
                    </div>
                 </div>
                 <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span className="text-slate-600 dark:text-slate-400">Deepfake Risk Score</span>
                      <span className="font-medium">{Math.round(deepfakeScore * 100)}%</span>
                    </div>
                    <div className="h-2 w-full bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
                       <div className={`h-full ${getScoreBg(deepfakeScore)} rounded-full`} style={{ width: `${deepfakeScore * 100}%` }}></div>
                    </div>
                 </div>
              </div>
           </div>

           <div className="bg-white dark:bg-slate-900 rounded-2xl p-6 shadow-sm border border-slate-200 dark:border-slate-800">
             <h3 className="font-semibold text-slate-900 dark:text-white mb-2">Content Safety</h3>
             <div className="flex items-center justify-center h-[160px]">
                <div className="relative flex items-center justify-center">
                   <ResponsiveContainer width={160} height={160}>
                     <PieChart>
                       <Pie
                         data={[{ value: overallSafety }, { value: 100 - overallSafety }]}
                         cx="50%"
                         cy="50%"
                         innerRadius={50}
                         outerRadius={70}
                         startAngle={90}
                         endAngle={-270}
                         dataKey="value"
                         stroke="none"
                       >
                         <Cell key="safe" fill={overallSafety > 80 ? COLORS.safe : overallSafety > 50 ? COLORS.warning : COLORS.unsafe} />
                         <Cell key="unsafe" fill={COLORS.slate} opacity={0.1} />
                       </Pie>
                     </PieChart>
                   </ResponsiveContainer>
                   <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
                      <span className={`text-2xl font-bold ${overallSafety > 80 ? 'text-green-500' : overallSafety > 50 ? 'text-yellow-500' : 'text-red-500'}`}>
                        {Math.round(overallSafety)}%
                      </span>
                      <span className="text-[10px] text-slate-400 uppercase font-medium">Safety</span>
                   </div>
                </div>
             </div>
           </div>
        </div>

        {/* Description */}
        <div className="bg-white dark:bg-slate-900 rounded-2xl p-6 shadow-sm border border-slate-200 dark:border-slate-800">
           <h3 className="font-semibold text-slate-900 dark:text-white mb-2">Analysis Summary</h3>
           <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
             {result.analysis_summary}
           </p>
        </div>

        {/* Detailed Moderation Scores */}
        <div className="bg-white dark:bg-slate-900 rounded-2xl p-6 shadow-sm border border-slate-200 dark:border-slate-800">
           <h3 className="font-semibold text-slate-900 dark:text-white mb-4">Moderation Details</h3>
           <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
             {moderation.map((mod, idx) => (
               <div key={idx} className="flex items-center justify-between p-3 bg-slate-50 dark:bg-slate-800/50 rounded-lg">
                 <div className="flex items-center space-x-3">
                    {mod.label === 'safe' ? <CheckCircle2 size={16} className="text-green-500" /> : <AlertTriangle size={16} className="text-red-500" />}
                    <span className="text-sm font-medium text-slate-700 dark:text-slate-300">{mod.category}</span>
                 </div>
                 <span className={`text-xs font-bold px-2 py-1 rounded ${
                    mod.score < 0.2 ? 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400' : 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400'
                 }`}>
                   {Math.round(mod.score * 100)}%
                 </span>
               </div>
             ))}
           </div>
        </div>

        {/* Raw JSON */}
        <div className="bg-slate-900 rounded-2xl p-6 shadow-sm border border-slate-800 overflow-hidden relative group">
           <div className="flex items-center justify-between mb-4">
             <h3 className="font-semibold text-slate-100 flex items-center">
               <FileJson className="mr-2 text-brand-400" size={20} />
               Raw Output
             </h3>
             <button 
                onClick={() => navigator.clipboard.writeText(JSON.stringify(result, null, 2))}
                className="text-xs bg-slate-800 hover:bg-slate-700 text-slate-300 px-3 py-1.5 rounded-lg transition-colors"
             >
                Copy JSON
             </button>
           </div>
           <div className="max-h-[200px] overflow-y-auto custom-scrollbar font-mono text-xs text-blue-300 leading-relaxed bg-slate-950 p-4 rounded-xl">
             <pre>{JSON.stringify(result, null, 2)}</pre>
           </div>
        </div>

      </div>
    </div>
  );
};
