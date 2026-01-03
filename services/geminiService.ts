import { GoogleGenAI, Type } from "@google/genai";
import { AnalysisResult, ChamberId } from "../types";

const MODEL_NAME = "gemini-3-flash-preview";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

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

export const analyzeMedia = async (
  file: File,
  fileType: 'image' | 'video' | 'audio' | 'text',
  chamber: ChamberId
): Promise<AnalysisResult> => {
  try {
    let parts: any[] = [];
    
    if (fileType === 'text') {
      const textContent = await file.text();
      parts.push({ text: textContent });
    } else {
      const base64Data = await fileToBase64(file);
      const dataPart = base64Data.split(',')[1];
      parts.push({
        inlineData: {
          mimeType: file.type,
          data: dataPart
        }
      });
    }

    // specific instruction based on chamber, falling back to image auth if undefined
    const specificInstruction = CHAMBER_PROMPTS[chamber] || CHAMBER_PROMPTS.image_auth;

    const fullSystemInstruction = `
      ${specificInstruction}
      
      ${ETHICAL_CORE}

      ### 📊 OUTPUT REQUIREMENTS
      Return results in JSON format matching the schema provided.
      - 'ai_generated_probability': 0-100 score of likelihood.
      - 'deepfake_risk': Risk assessment based on chamber purpose.
      - 'analysis_summary': A clear, human-readable explanation of findings tailored to the specific Chamber's perspective.
    `;

    parts.push({
      text: `Perform a ${chamber.toUpperCase().replace('_', ' ')} analysis on this content.`
    });

    const response = await ai.models.generateContent({
      model: MODEL_NAME,
      contents: {
        parts: parts
      },
      config: {
        systemInstruction: fullSystemInstruction,
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            ai_generated_probability: { type: Type.NUMBER, description: "Probability percentage (0-100)" },
            content_type: { type: Type.STRING, enum: ["image", "video", "audio", "text"] },
            deepfake_risk: { type: Type.STRING, enum: ["low", "medium", "high"] },
            artifacts_detected: { 
              type: Type.ARRAY, 
              items: { type: Type.STRING },
              description: "List of specific indicators found relevant to the chamber"
            },
            model_likelihood: { 
              type: Type.ARRAY, 
              items: { type: Type.STRING },
              description: "Potential models (Diffusion, GAN, GPT-4, ElevenLabs) or Threat Patterns"
            },
            confidence_level: { type: Type.STRING, enum: ["high", "medium", "low"] },
            analysis_summary: { type: Type.STRING, description: "Detailed explanation findings" },
            limitations: { type: Type.STRING, description: "What could not be verified" }
          },
          required: [
            "ai_generated_probability", 
            "content_type", 
            "deepfake_risk", 
            "artifacts_detected", 
            "model_likelihood", 
            "confidence_level", 
            "analysis_summary",
            "limitations"
          ]
        }
      }
    });

    const text = response.text;
    if (!text) throw new Error("No response from AI model");
    
    return JSON.parse(text) as AnalysisResult;

  } catch (error) {
    console.error("Analysis failed:", error);
    throw error;
  }
};

const fileToBase64 = (file: File): Promise<string> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = (error) => reject(error);
  });
};
