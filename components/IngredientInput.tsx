import React, { useState } from 'react';
import UndoIcon from './icons/UndoIcon';
import RedoIcon from './icons/RedoIcon';
import IngredientSelector from './IngredientSelector';

interface IngredientInputProps {
  ingredients: string[];
  setIngredients: (updater: (prev: string[]) => string[]) => void;
  recipeType: string;
  setRecipeType: (value: string) => void;
  onSubmit: () => void;
  isLoading: boolean;
  onUndo: () => void;
  onRedo: () => void;
  canUndo: boolean;
  canRedo: boolean;
  isEditing: boolean;
}

const IngredientInput: React.FC<IngredientInputProps> = ({ 
  ingredients, setIngredients, recipeType, setRecipeType, onSubmit, isLoading,
  onUndo, onRedo, canUndo, canRedo, isEditing
}) => {
  const [currentIngredient, setCurrentIngredient] = useState('');

  const handleAddIngredient = (ingredientToAdd?: string) => {
    const trimmed = (ingredientToAdd || currentIngredient).trim();
    if (trimmed && !ingredients.find(i => i.toLowerCase() === trimmed.toLowerCase())) {
      setIngredients(prev => [...prev, trimmed]);
      setCurrentIngredient('');
    }
  };

  const handleRemoveIngredient = (ingredientToRemove: string) => {
    setIngredients(prev => prev.filter(i => i !== ingredientToRemove));
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleAddIngredient();
    }
  };

  return (
    <div className="flex flex-col gap-6">
      <div>
        <label htmlFor="ingredients" className="text-lg font-semibold text-slate-700 block mb-2">
          {isEditing ? 'Edit Ingredients' : "What's in your pantry?"}
        </label>
        <div className="flex gap-2 items-center">
          <input
            type="text"
            id="ingredients"
            value={currentIngredient}
            onChange={(e) => setCurrentIngredient(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="e.g., chicken breast"
            className="flex-grow p-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-shadow duration-200"
            disabled={isLoading}
          />
          <button
            onClick={() => handleAddIngredient()}
            disabled={isLoading || !currentIngredient.trim()}
            className="px-6 py-3 bg-slate-200 text-slate-700 font-bold rounded-lg hover:bg-slate-300 focus:outline-none focus:ring-4 focus:ring-slate-300 disabled:bg-slate-100 disabled:text-slate-400 disabled:cursor-not-allowed transition-colors"
          >
            Add
          </button>
          <div className="flex gap-1">
            <button onClick={onUndo} disabled={!canUndo || isLoading} className="p-2 text-slate-500 rounded-full hover:bg-slate-200 disabled:text-slate-300 disabled:bg-transparent disabled:cursor-not-allowed">
              <UndoIcon className="w-6 h-6" />
            </button>
            <button onClick={onRedo} disabled={!canRedo || isLoading} className="p-2 text-slate-500 rounded-full hover:bg-slate-200 disabled:text-slate-300 disabled:bg-transparent disabled:cursor-not-allowed">
              <RedoIcon className="w-6 h-6" />
            </button>
          </div>
        </div>
        <div className="mt-4 flex flex-wrap gap-2 min-h-[32px]">
          {ingredients.map((ingredient, index) => (
            <span key={index} className="flex items-center bg-emerald-100 text-emerald-800 text-sm font-medium pl-3 pr-2 py-1 rounded-full animate-fade-in-short">
              {ingredient}
              <button onClick={() => handleRemoveIngredient(ingredient)} disabled={isLoading} className="ml-2 text-emerald-600 hover:text-emerald-800 disabled:text-slate-400">
                &times;
              </button>
            </span>
          ))}
        </div>
      </div>
      
      <IngredientSelector onSelect={(ingredient) => handleAddIngredient(ingredient)} />

      <div>
        <label htmlFor="recipeType" className="text-lg font-semibold text-slate-700 block mb-2">
          Recipe Type / Preferences (Optional)
        </label>
        <input
            type="text"
            id="recipeType"
            value={recipeType}
            onChange={(e) => setRecipeType(e.target.value)}
            placeholder="e.g., vegetarian, quick dinner, dessert"
            className="w-full p-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-shadow duration-200"
            disabled={isLoading}
          />
      </div>

      <button
        onClick={onSubmit}
        disabled={isLoading || ingredients.length === 0}
        className="w-full sm:w-auto self-end px-8 py-3 bg-emerald-500 text-white font-bold rounded-lg hover:bg-emerald-600 focus:outline-none focus:ring-4 focus:ring-emerald-300 disabled:bg-slate-400 disabled:cursor-not-allowed transition-all duration-300 ease-in-out transform hover:scale-105 disabled:scale-100"
      >
        {isLoading ? (isEditing ? 'Updating...' : 'Thinking...') : (isEditing ? 'Update Recipe' : 'Generate Recipe')}
      </button>
       <style>{`
        @keyframes fade-in-short {
          from { opacity: 0; transform: scale(0.9); }
          to { opacity: 1; transform: scale(1); }
        }
        .animate-fade-in-short {
          animation: fade-in-short 0.2s ease-out forwards;
        }
      `}</style>
    </div>
  );
};

export default IngredientInput;