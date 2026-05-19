import { GoogleGenAI } from "@google/genai";

export function getGeminiClient() {
  const apiKey = process.env.GEMINI_API_KEY;

  if (!apiKey) {
    throw new Error("GEMINI_API_KEY belum diatur di .env.local");
  }

  return new GoogleGenAI({ apiKey });
}

export function getGeminiModel() {
  return process.env.GEMINI_MODEL || "gemini-2.5-flash";
}