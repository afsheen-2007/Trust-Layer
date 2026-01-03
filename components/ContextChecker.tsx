import React, { useState, useEffect } from 'react';
import { 
  Search, 
  Globe, 
  AlertTriangle, 
  CheckCircle, 
  BookOpen, 
  Share2, 
  TrendingUp, 
  MessageSquare,
  Shield,
  XCircle,
  BarChart3
} from 'lucide-react';

interface AnalysisResult {
  score: number;
  verdict: 'VERIFIED' | 'LIKELY_AUTHENTIC' | 'CONTROVERSIAL' | 'MISLEADING' | 'FABRICATED';
  consensus: {
    agree: number;
    disagree: number;
    neutral: number;
  };
  sources: {
    name: string;
    credibility: 'High' | 'Medium' | 'Low';
    status: 'Supports' | 'Contradicts' | 'Neutral';
  }[];
  fallacies: string[];
  sentiment: 'Neutral' | 'Alarmist' | 'Balanced';
}

const ContextChecker: React.FC = () => {
  const [input, setInput] = useState('');
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [progress, setProgress] = useState(0);
  const [step, setStep] = useState('');
  const [result, setResult] = useState<AnalysisResult | null>(null);

  const triggerWords = {
    alarmist: ['shocking', 'secret', 'banned', 'miracle', 'cover-up', 'leaked', 'urgent', 'destroy', 'plot'],
    reliable: ['report', 'study', 'official', 'statement', 'announced', 'evidence', 'analysis']
  };

  const handleAnalyze = () => {
    if (input.trim().length < 10) return;
    
    setIsAnalyzing(true);
    setResult(null);
    setProgress(0);

    const steps = [
      "Extracting semantic claims...",
      "Querying Global Knowledge Graph...",
      "Cross-referencing major news indices...",
      "Analyzing rhetorical patterns...",
      "Synthesizing consensus..."
    ];

    let currentStep = 0;

    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          finalizeAnalysis();
          return 100;
        }
        return prev + 2;
      });

      if (progress % 20 === 0 && currentStep < steps.length) {
        setStep(steps[currentStep]);
        currentStep++;
      }
    }, 50);
  };

  const finalizeAnalysis = () => {
    setIsAnalyzing(false);
    
    // Simulation Logic based on input content
    const lowerInput = input.toLowerCase();
    let alarmistCount = 0;
    let reliableCount = 0;

    triggerWords.alarmist.forEach(w => { if (lowerInput.includes(w)) alarmistCount++; });
    triggerWords.reliable.forEach(w => { if (lowerInput.includes(w)) reliableCount++; });

    // Determine Logic
    let baseScore = 50; // Neutral start
    
    // Text length heuristic (very short claims often lack context)
    if (input.length < 50) baseScore -= 10;
    
    // Keyword heuristic
    baseScore -= (alarmistCount * 15);
    baseScore += (reliableCount * 10);
    
    // Clamp score
    const finalScore = Math.max(5, Math.min(98, baseScore + (Math.random() * 10 - 5)));

    let verdict: AnalysisResult['verdict'] = 'CONTROVERSIAL';
    if (finalScore > 80) verdict = 'VERIFIED';
    else if (finalScore > 60) verdict = 'LIKELY_AUTHENTIC';
    else if (finalScore < 30) verdict = 'FABRICATED';
    else if (finalScore < 50) verdict = 'MISLEADING';

    // Simulated Sources
    const mockSources = [
      { name: "Global News Wire", credibility: 'High', status: finalScore > 50 ? 'Supports' : 'Contradicts' },
      { name: "Independent Science Journal", credibility: 'High', status: finalScore > 60 ? 'Supports' : 'Neutral' },
      { name: "Viral Buzz Blog", credibility: 'Low', status: finalScore < 40 ? 'Supports' : 'Contradicts' },
      { name: "State Official Press", credibility: 'Medium', status: finalScore > 50 ? 'Supports' : 'Neutral' },
    ] as any[];

    // Simulated Fallacies
    const detectedFallacies = [];
    if (alarmistCount > 0) detectedFallacies.push("Appeal to Emotion");
    if (input.includes("they")) detectedFallacies.push("Us vs. Them Framing");
    if (input.length < 100 && finalScore < 50) detectedFallacies.push("Hasty Generalization");

    setResult({
      score: Math.round(finalScore),
      verdict,
      consensus: {
        agree: finalScore > 50 ? 65 : 12,
        disagree: finalScore > 50 ? 10 : 78,
        neutral: 25
      },
      sources: mockSources,
      fallacies: detectedFallacies,
      sentiment: alarmistCount > reliableCount ? 'Alarmist' : 'Balanced'
    });
  };

  const getColor = (score: number) => {
    if (score >= 80) return 'text-emerald-500 border-emerald-500 bg-emerald-500';
    if (score >= 60) return 'text-blue-500 border-blue-500 bg-blue-500';
    if (score >= 40) return 'text-amber-500 border-amber-500 bg-amber-500';
    return 'text-red-500 border-red-500 bg-red-500';
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 pb-20 animate-fade-in">
      {/* Hero Section */}
      <div className="bg-slate-900 text-white pt-12 pb-24 px-6 relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 mix-blend-overlay"></div>
        <div className="max-w-4xl mx-auto text-center relative z-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/20 border border-blue-400/30 text-blue-300 text-xs font-mono mb-6">
            <Globe className="w-3 h-3" />
            <span>GLOBAL CONTEXT ENGINE CONNECTED</span>
          </div>
          <h1 className="text-3xl md:text-5xl font-bold mb-6 tracking-tight">Verify Claims & News Context</h1>
          <p className="text-slate-400 text-lg max-w-2xl mx-auto">
            Paste a headline, tweet, or article snippet. Our engine cross-references verified global sources to detect misinformation and missing context.
          </p>
        </div>
      </div>

      {/* Main Interface */}
      <div className="max-w-4xl mx-auto px-6 -mt-16 relative z-20">
        <div className="bg-white dark:bg-slate-900 rounded-2xl shadow-xl border border-slate-200 dark:border-slate-800 p-6 md:p-8">
          
          {/* Input Area */}
          <div className="mb-6">
            <label className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-2 block">
              Content to Verify
            </label>
            <div className="relative">
              <textarea 
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Paste text here (e.g., 'New government law bans all internet access starting tomorrow...')"
                className="w-full h-32 bg-slate-50 dark:bg-slate-950 border border-slate-300 dark:border-slate-700 rounded-lg p-4 text-slate-900 dark:text-white focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all resize-none"
              />
              <div className="absolute bottom-3 right-3 text-xs text-slate-400">
                {input.length} chars
              </div>
            </div>
          </div>

          {/* Action Button */}
          {!isAnalyzing && !result && (
            <button 
              onClick={handleAnalyze}
              disabled={input.length < 10}
              className="w-full py-4 bg-primary-600 hover:bg-primary-500 disabled:bg-slate-300 disabled:cursor-not-allowed text-white font-bold rounded-lg shadow-lg shadow-primary-600/20 transition-all flex items-center justify-center gap-2"
            >
              <Search className="w-5 h-5" />
              Analyze Context
            </button>
          )}

          {/* Processing State */}
          {isAnalyzing && (
            <div className="py-8 text-center">
              <div className="w-full h-2 bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden mb-4">
                <div 
                  className="h-full bg-primary-500 transition-all duration-75 ease-out"
                  style={{ width: `${progress}%` }}
                ></div>
              </div>
              <p className="text-slate-900 dark:text-white font-mono text-sm animate-pulse">{step}</p>
              <p className="text-slate-500 text-xs mt-2">{Math.round(progress)}% Complete</p>
            </div>
          )}

          {/* Results View */}
          {result && (
            <div className="animate-fade-in-up">
              
              {/* Verdict Header */}
              <div className="flex flex-col md:flex-row gap-8 items-center border-b border-slate-200 dark:border-slate-800 pb-8 mb-8">
                <div className="relative">
                  <svg className="w-32 h-32 transform -rotate-90">
                    <circle cx="64" cy="64" r="60" className="stroke-slate-200 dark:stroke-slate-800 fill-none" strokeWidth="8" />
                    <circle 
                      cx="64" cy="64" r="60" 
                      className={`fill-none transition-all duration-1000 ease-out ${getColor(result.score).split(' ')[0]}`} 
                      strokeWidth="8" 
                      strokeDasharray={377}
                      strokeDashoffset={377 - (377 * result.score) / 100}
                      stroke="currentColor"
                    />
                  </svg>
                  <div className="absolute inset-0 flex flex-col items-center justify-center">
                    <span className="text-3xl font-bold text-slate-900 dark:text-white">{result.score}</span>
                    <span className="text-[10px] uppercase text-slate-500 font-bold">Trust Score</span>
                  </div>
                </div>

                <div className="flex-1 text-center md:text-left">
                  <div className={`inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-sm font-bold uppercase mb-3 ${getColor(result.score).replace('text-', 'bg-').replace('500', '100')} text-slate-800 dark:text-slate-900`}>
                    {result.score > 50 ? <CheckCircle className="w-4 h-4" /> : <AlertTriangle className="w-4 h-4" />}
                    {result.verdict.replace('_', ' ')}
                  </div>
                  <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
                    Our analysis indicates this content is 
                    <strong className="text-slate-900 dark:text-white"> {result.verdict === 'VERIFIED' ? 'highly credible' : 'potentially misleading'}</strong>. 
                    {result.score > 50 
                      ? " Multiple reliable sources corroborate the core claims." 
                      : " It exhibits patterns of sensationalism and lacks verification from major indices."}
                  </p>
                </div>
              </div>

              {/* Deep Dive Grid */}
              <div className="grid md:grid-cols-2 gap-8">
                
                {/* Source Consensus */}
                <div>
                  <h3 className="text-sm font-bold text-slate-900 dark:text-white uppercase tracking-wider mb-4 flex items-center gap-2">
                    <BarChart3 className="w-4 h-4 text-primary-500" /> Source Consensus
                  </h3>
                  <div className="bg-slate-50 dark:bg-slate-950/50 rounded-xl p-4 border border-slate-200 dark:border-slate-800">
                    <div className="flex items-center gap-2 mb-4 text-xs font-mono text-slate-500">
                      <div className="flex-1 h-2 bg-emerald-500 rounded-l-full"></div>
                      <div className="w-px h-4 bg-slate-300"></div>
                      <div className="flex-1 h-2 bg-red-500 rounded-r-full"></div>
                    </div>
                    <div className="flex justify-between text-sm mb-6">
                      <span className="font-bold text-emerald-600">{result.consensus.agree}% Corroborate</span>
                      <span className="font-bold text-red-600">{result.consensus.disagree}% Dispute</span>
                    </div>
                    
                    <div className="space-y-3">
                      {result.sources.map((source, idx) => (
                        <div key={idx} className="flex justify-between items-center text-sm">
                          <div className="flex items-center gap-2">
                            {source.status === 'Supports' ? <CheckCircle className="w-3 h-3 text-emerald-500" /> : <XCircle className="w-3 h-3 text-red-500" />}
                            <span className="text-slate-700 dark:text-slate-300">{source.name}</span>
                          </div>
                          <span className={`text-[10px] px-2 py-0.5 rounded ${source.credibility === 'High' ? 'bg-slate-200 dark:bg-slate-800 text-slate-600 dark:text-slate-400' : 'bg-amber-100 dark:bg-amber-900/30 text-amber-700'}`}>
                            {source.credibility} Credibility
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Rhetorical Analysis */}
                <div>
                  <h3 className="text-sm font-bold text-slate-900 dark:text-white uppercase tracking-wider mb-4 flex items-center gap-2">
                    <BookOpen className="w-4 h-4 text-primary-500" /> Rhetorical Pattern
                  </h3>
                  <div className="bg-slate-50 dark:bg-slate-950/50 rounded-xl p-4 border border-slate-200 dark:border-slate-800 h-full">
                    <div className="mb-4">
                      <span className="text-xs text-slate-500 uppercase font-mono block mb-2">Dominant Tone</span>
                      <div className="flex items-center gap-2">
                         <div className={`w-3 h-3 rounded-full ${result.sentiment === 'Alarmist' ? 'bg-red-500' : 'bg-emerald-500'}`}></div>
                         <span className="text-slate-900 dark:text-white font-medium">{result.sentiment}</span>
                      </div>
                    </div>
                    
                    <div>
                      <span className="text-xs text-slate-500 uppercase font-mono block mb-2">Detected Fallacies</span>
                      <div className="flex flex-wrap gap-2">
                        {result.fallacies.length > 0 ? result.fallacies.map((f, i) => (
                          <span key={i} className="px-3 py-1 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded text-xs text-slate-600 dark:text-slate-400 shadow-sm">
                            {f}
                          </span>
                        )) : (
                          <span className="text-sm text-slate-400 italic">No significant logical fallacies detected.</span>
                        )}
                      </div>
                    </div>

                    <div className="mt-6 pt-4 border-t border-slate-200 dark:border-slate-800">
                      <button 
                        onClick={() => {
                          setInput('');
                          setResult(null);
                        }}
                        className="text-primary-600 dark:text-primary-400 text-sm hover:underline font-medium"
                      >
                        Check Another Claim
                      </button>
                    </div>
                  </div>
                </div>

              </div>
            </div>
          )}
        </div>
        
        {/* Footer info */}
        <div className="text-center mt-12 text-slate-500 dark:text-slate-400 text-xs max-w-2xl mx-auto leading-relaxed">
          <p className="flex items-center justify-center gap-2 mb-2">
            <Shield className="w-3 h-3" /> 
            <strong>Methodology Note:</strong>
          </p>
          ContextChecker uses simulated heuristic analysis to demonstrate how AI can cross-reference claims against trusted knowledge bases. 
          In a production environment, this would query live fact-checking APIs (e.g., Snopes, Reuters Fact Check).
        </div>
      </div>
    </div>
  );
};

export default ContextChecker;
