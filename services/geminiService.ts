import { GoogleGenAI } from "@google/genai";
import { CampaignInput } from "../types";

// Always use const ai = new GoogleGenAI({apiKey: process.env.API_KEY});
const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export const generateMarketingCopy = async (input: CampaignInput): Promise<string> => {
  const prompt = `
    Du bist ein Experte für digitale Immobilienvermarktung in der Schweiz.
    Erstelle basierend auf den folgenden Daten kurze, performance-orientierte Marketing-Texte.
    
    Projektdaten:
    - Typ: ${input.projectType}
    - Ort: ${input.location}
    - USP: ${input.usp}
    - Zielgruppe: ${input.targetAudience}

    Bitte generiere folgenden Output im Markdown-Format:
    1. **Google Search Headline** (Max 30 Zeichen)
    2. **Google Search Description** (Max 90 Zeichen)
    3. **LinkedIn Ad Text** (Professionell, B2B-Fokus, Max 100 Wörter)
    4. **Meta/Instagram Ad Text** (Emotional, Visualisierend, Max 100 Wörter)

    Sprache: Deutsch (Schweiz). Tonalität: Hochwertig, Exklusiv, Dringlich.
  `;

  try {
    // Basic Text Tasks should use 'gemini-3-flash-preview'
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: prompt,
    });
    // Use .text property to access generated content
    return response.text || "Konnte keine Texte generieren.";
  } catch (error) {
    console.error("Gemini API Error:", error);
    return "Fehler bei der Generierung der Marketing-Texte. Bitte prüfen Sie den API Key.";
  }
};