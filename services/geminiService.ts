import { GoogleGenAI } from "@google/genai";
import { RoomData } from "../types";

const apiKey = process.env.API_KEY || '';
let ai: GoogleGenAI | null = null;

if (apiKey) {
  ai = new GoogleGenAI({ apiKey });
}

export const getGeminiHint = async (room: RoomData): Promise<string> => {
  if (!ai) {
    // Fallback if no API key is present
    return "The spirits are silent (API Key missing). Look closely at the visual clues provided.";
  }

  try {
    const model = ai.models;
    const prompt = `
      You are the Dungeon Master for an Escape Room game. 
      The player is currently in: ${room.title}.
      Description: ${room.description}
      The puzzle prompt is: ${room.puzzlePrompt}
      The visual clue is: ${room.visualClue}
      The answer is: ${room.answer[0]}.
      
      The player is stuck. Provide a subtle, short, cryptic hint to help them solve it. 
      Do NOT reveal the answer directly.
      Keep the tone consistent with the room (Mystical for Library, Ancient for Temple, Robotic for Cyber).
      Maximum 25 words.
    `;

    const response = await model.generateContent({
      model: 'gemini-2.5-flash',
      contents: prompt,
    });

    return response.text.trim();
  } catch (error) {
    console.error("Gemini API Error:", error);
    return "The connection to the oracle is fuzzy. Try checking the capital letters or numbers again.";
  }
};