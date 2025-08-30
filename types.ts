export interface Recipe {
  recipeName: string;
  description: string;
  ingredients: string[];
  instructions: string[];
  cookingTime: string;
  difficulty: 'Easy' | 'Medium' | 'Hard';
  nutrition: {
    calories: string;
    protein: string;
    carbs: string;
    fat: string;
  };
  recipeType?: string;
}

export interface SavedRecipe extends Recipe {
  id: string;
}

export type DayOfWeek = 'Monday' | 'Tuesday' | 'Wednesday' | 'Thursday' | 'Friday' | 'Saturday' | 'Sunday';

export interface MealPlan {
  [key: string]: SavedRecipe | null;
}

export interface User {
  name: string;
  email: string;
  picture: string;
}