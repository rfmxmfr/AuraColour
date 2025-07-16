import { GoogleGenerativeAI } from '@google/generative-ai';

const genAI = new GoogleGenerativeAI(process.env.GOOGLE_AI_API_KEY!);

export const analyzeColorSeason = async (imageBase64: string) => {
  const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });
  
  const prompt = `Analyze this person's skin tone and determine their seasonal color palette (Spring, Summer, Autumn, Winter). Provide specific color recommendations.`;
  
  const result = await model.generateContent([
    prompt,
    {
      inlineData: {
        data: imageBase64,
        mimeType: 'image/jpeg'
      }
    }
  ]);
  
  return result.response.text();
};