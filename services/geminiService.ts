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
        systemInstruction: `You are MedBot, a helpful medical assistant for the MediConnect Zimbabwe platform. 
        Your goal is to assist patients in finding hospital beds, doctors, and vaccination centers in Zimbabwe.
        - Context: You are serving patients in Zimbabwe (Cities: Harare, Bulawayo, Mutare, Gweru, etc.).
        - Currency: USD is commonly used.
        - Emergency: Advise calling 999 or 994 for ambulances in Zimbabwe.
        - You are polite, empathetic, and efficient.
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
      contents: `Generate a list of 5 fictional but realistic hospitals located in or near ${locationName}, Zimbabwe. 
      If the location is not in Zimbabwe, still generate valid hospitals for that location.
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
                    type: { type: Type.STRING, enum: ['ICU', 'General', 'Oxygen', 'Ventilator', 'Maternity', 'Pediatric'] },
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