
import { GoogleGenAI } from "@google/genai";

export async function testPrompt(prompt: string): Promise<string> {
  if (!process.env.API_KEY) {
    console.warn("API_KEY environment variable not set. Returning mock response.");
    // Simulate a potential failure for the mock service for demonstration
    if (prompt.toLowerCase().includes("error")) {
        return new Promise((_, reject) => {
            setTimeout(() => {
                reject(new Error("This is a simulated error from the mock service."));
            }, 1000);
        });
    }
    return new Promise(resolve => {
        setTimeout(() => {
            resolve("This is a mock response because the API key is not configured. The actual response from Gemini would appear here, based on your customized prompt.");
        }, 1500);
    });
  }

  try {
    const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: prompt,
    });
    return response.text;
  } catch (error) {
    console.error("Error calling Gemini API:", error);
    if (error instanceof Error) {
      // Re-throwing the error to be handled by the calling component
      throw new Error(`API Error: ${error.message}`);
    }
    throw new Error("An unknown error occurred while contacting the Gemini API.");
  }
}

export async function getCoPilotResponse(message: string): Promise<string> {
  if (!process.env.API_KEY) {
    console.warn("API_KEY environment variable not set. Returning mock co-pilot response.");
    return new Promise(resolve => {
        setTimeout(() => {
            resolve("This is a mock response from your AI Co-Pilot. I can help you find the best prompts. For example, you could ask me: 'What's a good prompt for creating a logo for a coffee shop?'");
        }, 1500);
    });
  }

  try {
    const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: message,
      config: {
        systemInstruction: "You are a friendly and helpful AI co-pilot for 'PromptSpace', an online marketplace for AI prompts. Your goal is to help users find the perfect prompt for their needs. You can suggest categories, models, or specific prompt ideas based on their requests. Be concise and helpful.",
      }
    });
    return response.text;
  } catch (error) {
    console.error("Error calling Gemini API for Co-Pilot:", error);
    if (error instanceof Error) {
      throw new Error(`API Error: ${error.message}`);
    }
    throw new Error("An unknown error occurred while contacting the Gemini API.");
  }
}
