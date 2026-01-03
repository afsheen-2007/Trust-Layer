import React from 'react';
import { AnalysisResult } from '../types';
import { 
  PieChart, Pie, Cell, ResponsiveContainer, Tooltip 
} from 'recharts';
import { 
  CheckCircle, 
  Cpu, 
  Eye, 
  Activity,
  ShieldAlert,
  HelpCircle
} from 'lucide-react';

interface Props {
  result: AnalysisResult;
}

const AnalysisDashboard: React.FC<Props> = ({ result }) => {
  const isHighRisk = result.deepfake_risk === 'high';
  const riskColor = {
    low: '#10b981',
    medium: '#f59e0b',
    high: '#ef4444'
  }[result.deepfake_risk];

  const chartData = [
    { name: 'Synthetic', value: result.ai_generated_probability },
    { name: 'Authentic', value: 100 - result.ai_generated_probability }
  ];

  const CHART_COLORS = [riskColor, '#334155'];

  return (
    <div className="w-full max-w-5xl mx-auto space-y-6">
      {/* Header Badge */}
      <div className={`border-l-4 ${isHighRisk ? 'border-red-500 bg-red-50 dark:bg-red-950/20' : 'border-emerald-500 bg-emerald-50 dark:bg-emerald-950/20'} p-6 rounded-r-lg shadow-sm dark:shadow-lg flex items-center justify-between animate-fade-in-up transition-all hover:translate-x-1`}>
        <div>
          <h2 className="text-2xl font-bold font-mono tracking-tight text-slate-900 dark:text-white flex items-center gap-3">
            {isHighRisk ? <ShieldAlert className="w-8 h-8 text-red-500 animate-pulse-slow" /> : <CheckCircle className="w-8 h-8 text-emerald-500" />}
            ANALYSIS COMPLETE
          </h2>
          <p className="text-slate-600 dark:text-slate-400 mt-1 font-mono text-sm">
            CONFIDENCE: <span className="text-slate-900 dark:text-white uppercase font-bold">{result.confidence_level}</span>
          </p>
        </div>
        <div className="text-right">
          <span className={`inline-block px-4 py-2 rounded-full text-sm font-bold uppercase tracking-wider shadow-sm transition-transform hover:scale-105 ${
            isHighRisk ? 'bg-red-100 dark:bg-red-500/20 text-red-600 dark:text-red-400 border border-red-200 dark:border-red-500/50' : 'bg-emerald-100 dark:bg-emerald-500/20 text-emerald-600 dark:text-emerald-400 border border-emerald-200 dark:border-emerald-500/50'
          }`}>
            RISK LEVEL: {result.deepfake_risk}
          </span>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Probability Chart */}
        <div className="md:col-span-1 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-lg p-6 flex flex-col items-center justify-center relative overflow-hidden shadow-sm hover:shadow-md transition-shadow animate-fade-in-up" style={{ animationDelay: '0.1s' }}>
          <h3 className="text-slate-500 dark:text-slate-400 text-xs font-mono uppercase tracking-widest absolute top-4 left-4">Probability Engine</h3>
          <div className="w-full h-64 relative z-10">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={chartData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={80}
                  fill="#8884d8"
                  paddingAngle={5}
                  dataKey="value"
                  startAngle={90}
                  endAngle={-270}
                  isAnimationActive={true}
                  animationDuration={1500}
                >
                  {chartData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={CHART_COLORS[index % CHART_COLORS.length]} stroke="rgba(0,0,0,0)" />
                  ))}
                </Pie>
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: 'rgba(15, 23, 42, 0.9)', 
                    borderColor: '#334155', 
                    color: '#f8fafc',
                    borderRadius: '8px',
                    backdropFilter: 'blur(4px)',
                    fontSize: '12px',
                    fontFamily: 'monospace'
                  }}
                  itemStyle={{ color: '#cbd5e1' }}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <div className="text-center animate-scale-in" style={{ animationDelay: '0.5s', animationFillMode: 'both' }}>
              <span className="text-4xl font-bold text-slate-900 dark:text-white font-mono">{result.ai_generated_probability}%</span>
              <p className="text-xs text-slate-500 font-mono">LIKELIHOOD</p>
            </div>
          </div>
        </div>

        {/* Technical Analysis */}
        <div className="md:col-span-2 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-lg p-6 shadow-sm hover:shadow-md transition-shadow animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
           <h3 className="text-slate-500 dark:text-slate-400 text-xs font-mono uppercase tracking-widest mb-4 flex items-center gap-2">
            <Cpu className="w-4 h-4" /> System Summary
           </h3>
           <p className="text-slate-700 dark:text-slate-200 leading-relaxed font-light">
             {result.analysis_summary}
           </p>
           
           <div className="mt-6 pt-6 border-t border-slate-200 dark:border-slate-800">
             <h4 className="text-slate-500 text-xs font-mono uppercase mb-3 flex items-center gap-2">
               <Eye className="w-4 h-4" /> Detected Artifacts
             </h4>
             <div className="flex flex-wrap gap-2">
               {result.artifacts_detected.map((artifact, i) => (
                 <span 
                    key={i} 
                    className="px-3 py-1 bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 text-sm rounded flex items-center gap-2 animate-scale-in hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors cursor-default"
                    style={{ animationDelay: `${0.3 + (i * 0.1)}s`, animationFillMode: 'both' }}
                 >
                   <Activity className="w-3 h-3 text-blue-500" />
                   {artifact}
                 </span>
               ))}
               {result.artifacts_detected.length === 0 && (
                 <span className="text-slate-500 italic text-sm">No significant artifacts detected.</span>
               )}
             </div>
           </div>

           <div className="mt-4">
              <h4 className="text-slate-500 text-xs font-mono uppercase mb-3">Potential Architectures</h4>
              <div className="flex flex-wrap gap-2">
                 {result.model_likelihood.map((model, i) => (
                   <span 
                      key={i} 
                      className="px-2 py-0.5 bg-slate-50 dark:bg-slate-950 text-slate-600 dark:text-slate-400 text-xs border border-slate-200 dark:border-slate-800 rounded animate-scale-in"
                      style={{ animationDelay: `${0.5 + (i * 0.1)}s`, animationFillMode: 'both' }}
                   >
                     {model}
                   </span>
                 ))}
              </div>
           </div>
        </div>
      </div>

      {/* Limitations Disclaimer */}
      <div className="bg-slate-50 dark:bg-slate-950/50 border border-slate-200 dark:border-slate-800/50 rounded-lg p-4 flex gap-3 items-start animate-fade-in-up hover:bg-slate-100 dark:hover:bg-slate-900/80 transition-colors" style={{ animationDelay: '0.3s' }}>
        <HelpCircle className="w-5 h-5 text-slate-500 mt-0.5" />
        <div>
          <h4 className="text-slate-700 dark:text-slate-400 text-sm font-bold">Analysis Limitations</h4>
          <p className="text-slate-600 dark:text-slate-500 text-sm mt-1">{result.limitations}</p>
        </div>
      </div>
    </div>
  );
};

export default AnalysisDashboard;