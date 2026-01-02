
import { GoogleGenAI, Type } from "@google/genai";
import { DesignIdea } from "../types";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

const cleanBase64 = (base64Str: string) => {
    const matches = base64Str.match(/^data:(.+);base64,(.+)$/);
    if (matches && matches.length === 3) {
        return matches[2];
    }
    return base64Str;
};

export const generateDesignIdea = async (userInput: string, imageBase64?: string): Promise<DesignIdea> => {
  try {
    const parts: any[] = [];

    if (imageBase64) {
      parts.push({
        inlineData: {
          mimeType: 'image/jpeg',
          data: cleanBase64(imageBase64)
        }
      });
    }

    // Add the text prompt
    parts.push({
      text: `Generate a creative, trendy, and unique phone case design concept based on this user input: "${userInput}" ${imageBase64 ? 'and the attached reference image' : ''}. 
      The target audience is young, modern Uruguayans.
      Return a title, a vivid visual description (in Spanish), and a suggested color palette (hex codes).`
    });

    // Fix: Use gemini-3-flash-preview for text tasks instead of gemini-2.5-flash
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: {
        parts: parts
      },
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            title: { type: Type.STRING },
            description: { type: Type.STRING },
            colorPalette: { 
              type: Type.ARRAY,
              items: { type: Type.STRING }
            }
          },
          required: ["title", "description", "colorPalette"]
        }
      }
    });

    const text = response.text;
    if (!text) throw new Error("No response from AI");
    
    return JSON.parse(text) as DesignIdea;
  } catch (error) {
    console.error("Error generating design idea:", error);
    return {
      title: "Error de Sistema",
      description: "Nuestra IA está reiniciando sus núcleos creativos. Intenta de nuevo o verifica tu conexión.",
      colorPalette: ["#FF0000", "#000000"]
    };
  }
};

export const generateExpandedImage = async (imageBase64: string, prompt?: string): Promise<string | null> => {
  try {
    // Default prompt if none provided
    const finalPrompt = prompt 
        ? `Modify this image based on this description: "${prompt}". Maintain the style and high quality. Ensure it fills the vertical phone case format.`
        : 'Extiende esta imagen creativamente para llenar un formato vertical de funda de celular (aspect ratio 9:19). Rellena el espacio vacío con contenido coherente al estilo de la imagen original. Hazlo seamless.';

    // Fix: Removed invalid responseModalities for gemini-2.5-flash-image and iterate through parts to find the image
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash-image',
      contents: {
        parts: [
          {
            inlineData: {
              data: cleanBase64(imageBase64),
              mimeType: 'image/jpeg',
            },
          },
          {
            text: finalPrompt,
          },
        ],
      },
    });

    // Fix: Iterate through all parts to find the image part as per @google/genai guidelines
    if (response.candidates?.[0]?.content?.parts) {
      for (const part of response.candidates[0].content.parts) {
        if (part.inlineData) {
          const base64EncodeString: string = part.inlineData.data;
          return `data:image/png;base64,${base64EncodeString}`;
        }
      }
    }
    return null;
  } catch (error) {
    console.error("Error expanding image:", error);
    throw error;
  }
};
