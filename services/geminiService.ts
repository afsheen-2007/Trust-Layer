import { AnalysisResult, ChamberId } from "../types";

// Base ethical guidelines shared across all chambers
const ETHICAL_CORE = `
### 🔒 PRIVACY & ETHICS ENFORCEMENT
- Do NOT make legal accusations.
- Do NOT label individuals as criminals.
- Provide decision support, not judgment.
- If content involves CSAE (Child Sexual Abuse Material), flag immediately as "ILLEGAL_CONTENT" in the summary and stop detailed analysis.
`;

const CHAMBER_PROMPTS: Record<string, string> = {
  image_auth: `
    You are CHAMBER 1: AI IMAGE AUTHENTICITY CHECK.
    Analyze the provided image for synthetic generation (GANs, Diffusion, Flux, Midjourney).
    Focus on:
    - Spatial artifacts (textures, hair, hands, background logic).
    - Noise distribution and frequency anomalies.
    - Lighting physics consistency.
    - Metadata traces (if visualizable) or re-compression artifacts.
  `,
  video_deepfake: `
    You are CHAMBER 2: AI VIDEO & DEEPFAKE CHECK.
    Analyze the provided video frame/clip for manipulation.
    Focus on:
    - Temporal consistency (jittering, morphing).
    - Facial geometry (lip-sync, eye blinking, skin texture).
    - Boundary artifacts around the face/neck.
    - Lighting mismatches between subject and environment.
  `,
  audio_auth: `
    You are CHAMBER 3: AUDIO FORENSICS & VOICE CLONING.
    Analyze the audio spectrogram and cadence.
    Focus on:
    - Unnatural breathing patterns or lack thereof.
    - Electronic quantization artifacts in high frequencies.
    - Monotone prosody typical of TTS (Text-to-Speech) systems (ElevenLabs, etc.).
    - Background noise consistency (does the background cut out when speech stops?).
  `,
  text_ai: `
    You are CHAMBER 4: TEXT PROVENANCE & LLM DETECTION.
    Analyze the provided text for patterns typical of AI (ChatGPT, Claude, Llama).
    Focus on:
    - Perplexity and Burstiness (variance in sentence structure).
    - Overuse of connecting phrases ("Furthermore", "In conclusion").
    - Lack of specific, recent anecdotal detail.
    - Perfect grammar with zero stylistic "human" errors.
  `,
  url_scanner: `
    You are CHAMBER 5: PHISHING & WEB THREAT SCANNER.
    Analyze the provided screenshot of a website or the text content representing a URL structure.
    Focus on:
    - Visual impersonation of major brands (Logos, UI clones).
    - Deceptive URL structures (typosquatting).
    - Malicious DOM elements or fake login fields (visual assessment).
  `,
  moderation: `
    You are CHAMBER 6: CONTENT MODERATION & SAFETY CHECK.
    Analyze the content for harmful, abusive, or policy-violating material.
    Focus on:
    - Harassment, hate speech, or visual threats.
    - Non-consensual deepfake indicators.
    - Exploitative or graphic violence.
    Output 'deepfake_risk' as 'high' if the content is harmful/violating.
  `,
  impersonation: `
    You are CHAMBER 7: IMPERSONATION & SCAM DETECTION.
    Analyze the content for indicators of social engineering or identity theft.
    Focus on:
    - Synthetic profile pictures (perfect symmetry, background blurring).
    - Re-used or stolen identity patterns.
    - Context clues suggesting fraud (if text is visible).
  `
};

// Mock analysis generator - replaces Gemini API calls
const generateMockAnalysis = (
  chamber: ChamberId,
  fileType: 'image' | 'video' | 'audio' | 'text',
  file: File
): AnalysisResult => {
  // Generate semi-realistic mock data based on chamber type
  const chamberMockData: Record<string, Partial<AnalysisResult>> = {
    image_auth: {
      ai_generated_probability: Math.floor(Math.random() * 40) + 10, // 10-50%
      artifacts_detected: ['Slight texture inconsistencies', 'Normal lighting patterns'],
      model_likelihood: ['Real image', 'Possible minor edits'],
      confidence_level: 'high' as const,
      analysis_summary: 'Image shows characteristics consistent with authentic photography. Minor artifacts detected are within normal range for standard image processing.',
      limitations: 'Analysis based on visual inspection only. Cannot verify original source or metadata.'
    },
    video_deepfake: {
      ai_generated_probability: Math.floor(Math.random() * 30) + 5, // 5-35%
      deepfake_risk: 'low' as const,
      artifacts_detected: ['Temporal consistency normal', 'Natural facial movements'],
      model_likelihood: ['Authentic video', 'Standard recording'],
      confidence_level: 'high' as const,
      analysis_summary: 'Video displays natural temporal consistency with no signs of deepfake manipulation. Facial movements and lighting appear authentic.',
      limitations: 'Analysis limited to visual inspection. Cannot verify source or chain of custody.'
    },
    audio_auth: {
      ai_generated_probability: Math.floor(Math.random() * 25) + 5, // 5-30%
      deepfake_risk: 'low' as const,
      artifacts_detected: ['Natural prosody', 'Consistent background noise'],
      model_likelihood: ['Authentic audio', 'Natural speech patterns'],
      confidence_level: 'medium' as const,
      analysis_summary: 'Audio analysis indicates natural speech patterns with consistent breathing and prosody. No signs of TTS or voice cloning detected.',
      limitations: 'Analysis based on spectrogram analysis. Cannot verify speaker identity without additional verification.'
    },
    text_ai: {
      ai_generated_probability: Math.floor(Math.random() * 50) + 15, // 15-65%
      artifacts_detected: ['Varied sentence structure', 'Natural language patterns'],
      model_likelihood: ['Human-written', 'Possible AI assistance'],
      confidence_level: 'medium' as const,
      analysis_summary: 'Text analysis shows natural language patterns with good variance in sentence structure. Some characteristics may indicate AI assistance but overall appears human-authored.',
      limitations: 'Text analysis cannot definitively determine authorship. Results are probabilistic estimates.'
    },
    url_scanner: {
      ai_generated_probability: Math.floor(Math.random() * 20) + 5, // 5-25%
      deepfake_risk: 'low' as const,
      artifacts_detected: ['Standard URL structure', 'No typosquatting detected'],
      model_likelihood: ['Legitimate website', 'Standard domain'],
      confidence_level: 'high' as const,
      analysis_summary: 'URL structure appears legitimate with no obvious signs of phishing or typosquatting. Visual elements match expected brand patterns.',
      limitations: 'Analysis based on URL structure and visual assessment only. Cannot verify SSL certificates or backend security.'
    },
    moderation: {
      ai_generated_probability: Math.floor(Math.random() * 30) + 5, // 5-35%
      deepfake_risk: 'low' as const,
      artifacts_detected: ['No harmful content detected', 'Standard content patterns'],
      model_likelihood: ['Safe content', 'Policy compliant'],
      confidence_level: 'high' as const,
      analysis_summary: 'Content moderation analysis indicates safe, policy-compliant material with no signs of harassment, hate speech, or harmful content.',
      limitations: 'Moderation analysis is based on pattern detection. Context-dependent content may require human review.'
    },
    impersonation: {
      ai_generated_probability: Math.floor(Math.random() * 35) + 10, // 10-45%
      deepfake_risk: 'low' as const,
      artifacts_detected: ['Natural profile characteristics', 'No synthetic indicators'],
      model_likelihood: ['Authentic profile', 'Standard identity'],
      confidence_level: 'medium' as const,
      analysis_summary: 'Profile analysis shows natural characteristics with no obvious signs of synthetic generation or identity theft. Appears to be authentic.',
      limitations: 'Analysis cannot verify true identity without additional verification methods. Results are based on visual and pattern analysis only.'
    }
  };

  const baseMock = chamberMockData[chamber] || chamberMockData.image_auth;
  
  return {
    ai_generated_probability: baseMock.ai_generated_probability || 25,
    content_type: fileType,
    deepfake_risk: baseMock.deepfake_risk || 'low',
    artifacts_detected: baseMock.artifacts_detected || [],
    model_likelihood: baseMock.model_likelihood || [],
    confidence_level: baseMock.confidence_level || 'medium',
    analysis_summary: baseMock.analysis_summary || 'Analysis completed with standard checks.',
    limitations: baseMock.limitations || 'Standard analysis limitations apply.'
  };
};

export const analyzeMedia = async (
  file: File,
  fileType: 'image' | 'video' | 'audio' | 'text',
  chamber: ChamberId
): Promise<AnalysisResult> => {
  try {
    // Mock analysis - simulate API delay and return mock results
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    // Generate mock analysis based on chamber type
    const mockResult: AnalysisResult = generateMockAnalysis(chamber, fileType, file);
    
    return mockResult;

  } catch (error) {
    console.error("Analysis failed:", error);
    throw error;
  }
};
