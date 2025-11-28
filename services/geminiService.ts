import { GoogleGenAI, Type } from "@google/genai";
import { Hospital, BedType } from "../types";

const getAIClient = () => {
  const apiKey = process.env.API_KEY;
  if (!apiKey) return null;
  return new GoogleGenAI({ apiKey });
};

export const chatWithMedicalAssistant = async (
  history: { role: string; parts: { text: string }[] }[],
  message: string
): Promise<string> => {
  const ai = getAIClient();
  if (!ai) return "I'm sorry, I cannot connect to the AI service at the moment. Please check your API key.";

  try {
    const chat = ai.chats.create({
      model: 'gemini-2.5-flash',
      config: {
        systemInstruction: `You are MedBot, a helpful medical assistant for the MediConnect platform. 
        Your goal is to assist patients in finding hospital beds, vaccination centers, and providing basic health guidance.
        - You are polite, empathetic, and efficient.
        - If a user asks for emergency help, emphasize they should call emergency services (like 911) immediately if critical.
        - You can explain medical terms related to COVID-19 and hospital wards (ICU, Oxygen).
        - Keep responses concise and easy to read.
        - Do not provide definitive medical diagnoses.`,
      },
      history: history.map(h => ({
          role: h.role,
          parts: h.parts
      }))
    });

    const result = await chat.sendMessage({ message });
    return result.text || "I didn't understand that.";
  } catch (error) {
    console.error("Gemini Chat Error:", error);
    return "I'm having trouble processing your request right now.";
  }
};

export const generateLocalHospitals = async (locationName: string): Promise<Hospital[]> => {
  const ai = getAIClient();
  if (!ai) return [];

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: `Generate a list of 5 fictional but realistic hospitals located in or near ${locationName}. 
      Include a mix of bed availabilities.`,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.ARRAY,
          items: {
            type: Type.OBJECT,
            properties: {
              id: { type: Type.STRING },
              name: { type: Type.STRING },
              address: { type: Type.STRING },
              phone: { type: Type.STRING },
              distance: { type: Type.STRING },
              isCovidCenter: { type: Type.BOOLEAN },
              rating: { type: Type.NUMBER },
              beds: {
                type: Type.ARRAY,
                items: {
                  type: Type.OBJECT,
                  properties: {
                    type: { type: Type.STRING, enum: ['ICU', 'General', 'Oxygen', 'Ventilator'] },
                    available: { type: Type.NUMBER },
                    total: { type: Type.NUMBER },
                    pricePerDay: { type: Type.NUMBER }
                  }
                }
              },
              location: {
                  type: Type.OBJECT,
                  properties: {
                      lat: { type: Type.NUMBER },
                      lng: { type: Type.NUMBER }
                  }
              }
            }
          }
        }
      }
    });
    
    const text = response.text;
    if (!text) return [];
    
    // Parse and transform to match our TS types exactly if needed (enums)
    const rawData = JSON.parse(text);
    return rawData.map((h: any) => ({
      ...h,
      beds: h.beds.map((b: any) => ({
        ...b,
        type: b.type as BedType
      }))
    }));

  } catch (error) {
    console.error("Gemini Data Generation Error:", error);
    return [];
  }
};