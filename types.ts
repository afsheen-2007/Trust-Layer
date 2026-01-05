export type ChamberId = 
  | 'image_auth'       // Chamber 1
  | 'video_deepfake'   // Chamber 2
  | 'audio_auth'       // Chamber 3 (New)
  | 'text_ai'          // Chamber 4 (New)
  | 'url_scanner'      // Chamber 5 (New)
  | 'moderation'       // Chamber 6
  | 'impersonation'    // Chamber 7
  | 'context_news'     // Chamber 8
  | 'emergency';       // Chamber 9

export interface ChamberConfig {
  id: ChamberId;
  title: string;
  description: string;
  icon: any;
  color: string;
  supportedTypes: ('image' | 'video' | 'text' | 'audio')[];
}

export interface AnalysisResult {
  ai_generated_probability: number;
  content_type: 'image' | 'video' | 'audio' | 'text';
  deepfake_risk: 'low' | 'medium' | 'high';
  artifacts_detected: string[];
  model_likelihood: string[];
  confidence_level: 'high' | 'medium' | 'low';
  analysis_summary: string;
  limitations: string;
}

export interface EmergencyContact {
  label: string;
  number: string;
  description: string;
}

export enum AppState {
  IDLE,
  ANALYZING,
  COMPLETE,
  ERROR
}

export type View = 'dashboard' | 'moderation' | 'deepfake' | 'ai-check' | 'analytics' | 'developer';
