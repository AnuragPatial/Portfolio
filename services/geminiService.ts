import { GoogleGenAI } from "@google/genai";
import { RESUME_CONTEXT } from '../constants';

const apiKey = process.env.API_KEY || ""; 
// Note: In a production Next.js app, this would be a server-side route to hide the key. 
// For this client-side demo, we assume the environment variable is available.

let ai: GoogleGenAI | null = null;

if (apiKey) {
  ai = new GoogleGenAI({ apiKey });
}

export const sendMessageToGemini = async (message: string): Promise<string> => {
  if (!ai) {
    return "AI Chat is unavailable. Please check the API Key configuration.";
  }

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: message,
      config: {
        systemInstruction: RESUME_CONTEXT,
      }
    });
    
    return response.text || "I couldn't generate a response at the moment.";
  } catch (error) {
    console.error("Gemini API Error:", error);
    return "Sorry, I encountered an error while processing your request.";
  }
};