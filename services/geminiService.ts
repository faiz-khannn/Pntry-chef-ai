import { GoogleGenAI, Type } from "@google/genai";
import type { Recipe } from '../types';

if (!process.env.API_KEY) {
    throw new Error("API_KEY environment variable not set");
}

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

const recipeSchema = {
  type: Type.OBJECT,
  properties: {
    recipeName: {
      type: Type.STRING,
      description: "A creative and fitting name for the recipe."
    },
    description: {
        type: Type.STRING,
        description: "A short, appealing one-sentence description of the dish."
    },
    ingredients: {
      type: Type.ARRAY,
      description: "A list of all ingredients required, including amounts. Should incorporate the user's provided items.",
      items: {
        type: Type.STRING
      }
    },
    instructions: {
      type: Type.ARRAY,
      description: "A list of step-by-step instructions for preparing the dish.",
      items: {
        type: Type.STRING
      }
    },
    cookingTime: {
        type: Type.STRING,
        description: "The estimated total cooking time (e.g., '30 minutes')."
    },
    difficulty: {
        type: Type.STRING,
        description: "The difficulty level of the recipe. Must be one of: 'Easy', 'Medium', or 'Hard'."
    },
    nutrition: {
        type: Type.OBJECT,
        description: "Estimated nutritional information per serving.",
        properties: {
            calories: { type: Type.STRING, description: "e.g., '450 kcal'" },
            protein: { type: Type.STRING, description: "e.g., '30g'" },
            carbs: { type: Type.STRING, description: "e.g., '40g'" },
            fat: { type: Type.STRING, description: "e.g., '15g'" },
        },
        required: ['calories', 'protein', 'carbs', 'fat']
    }
  },
  required: ['recipeName', 'description', 'ingredients', 'instructions', 'cookingTime', 'difficulty', 'nutrition']
};

export const generateRecipe = async (ingredients: string[], recipeType: string): Promise<Recipe> => {
  const prompt = `You are a creative chef. Based on the following ingredients, create a delicious and unique ${recipeType ? `"${recipeType}"` : ''} recipe. The ingredients are: ${ingredients.join(', ')}. Please also provide an estimated cooking time, a difficulty level (Easy, Medium, or Hard), and basic nutritional information (calories, protein, carbs, fat). Ensure the response strictly follows the provided JSON schema. If the ingredients are nonsensical, provide a simple, common recipe instead.`;

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: recipeSchema,
        temperature: 0.8,
        topP: 0.95,
      },
    });

    const responseText = response.text.trim();
    const recipeData = JSON.parse(responseText);

    // Basic validation
    if (!recipeData.recipeName || !recipeData.cookingTime || !recipeData.nutrition) {
        throw new Error("Invalid recipe format received from AI.");
    }

    return recipeData as Recipe;

  } catch (error) {
    console.error("Error generating recipe:", error);
    throw new Error("Failed to communicate with the AI chef.");
  }
};

export const generateRecipeImage = async (prompt: string): Promise<string> => {
  try {
    const response = await ai.models.generateImages({
      model: 'imagen-4.0-generate-001',
      prompt: `A vibrant, professional food photography shot of: ${prompt}. Centered, appetizing, with a clean background, hyper-realistic, high-detail, studio lighting.`,
      config: {
        numberOfImages: 1,
        outputMimeType: 'image/jpeg',
        aspectRatio: '1:1',
      },
    });
    
    if (response.generatedImages && response.generatedImages.length > 0) {
      return response.generatedImages[0].image.imageBytes; // base64 string
    } else {
      throw new Error("No image was generated.");
    }

  } catch (error) {
    console.error("Error generating recipe image:", error);
    throw new Error("Failed to create an image for the recipe.");
  }
};