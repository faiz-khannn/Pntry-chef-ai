import React, { useState, useMemo } from 'react';
import type { SavedRecipe, DayOfWeek, Recipe } from '../types';
import TrashIcon from './icons/TrashIcon';
import PlusCircleIcon from './icons/PlusCircleIcon';
import EditIcon from './icons/EditIcon';
import LinkIcon from './icons/LinkIcon';

interface SavedRecipesProps {
  savedRecipes: SavedRecipe[];
  onView: (recipe: SavedRecipe) => void;
  onDelete: (id: string) => void;
  onClearAll: () => void;
  onAddToMealPlan: (recipe: Recipe, day: DayOfWeek) => void;
  onEdit: (recipe: SavedRecipe) => void;
}

const DayPicker: React.FC<{ onSelect: (day: DayOfWeek) => void }> = ({ onSelect }) => {
    const days: DayOfWeek[] = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
    return (
        <div className="absolute top-full right-0 mt-2 bg-white border border-slate-200 rounded-lg shadow-xl py-1 z-20 animate-fade-in-short w-32">
            {days.map(day => (
                <button key={day} onClick={() => onSelect(day)} className="block w-full text-left px-4 py-2 text-slate-700 hover:bg-slate-100">
                    {day}
                </button>
            ))}
        </div>
    );
};

const SavedRecipesList: React.FC<SavedRecipesProps> = ({ savedRecipes, onView, onDelete, onClearAll, onAddToMealPlan, onEdit }) => {
  const [activeDayPicker, setActiveDayPicker] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [copiedLink, setCopiedLink] = useState<string | null>(null);

  const filteredRecipes = useMemo(() => {
    if (!searchQuery) return savedRecipes;
    const query = searchQuery.toLowerCase();
    return savedRecipes.filter(recipe => 
        recipe.recipeName.toLowerCase().includes(query) ||
        recipe.ingredients.some(ing => ing.toLowerCase().includes(query)) ||
        (recipe.recipeType && recipe.recipeType.toLowerCase().includes(query))
    );
  }, [searchQuery, savedRecipes]);
  
  const handleCopyLink = (recipeId: string) => {
    const link = `${window.location.origin}${window.location.pathname}#recipe=${recipeId}`;
    navigator.clipboard.writeText(link).then(() => {
        setCopiedLink(recipeId);
        setTimeout(() => setCopiedLink(null), 2500);
    });
  };

  return (
    <div className="bg-white p-6 sm:p-8 rounded-2xl shadow-xl border border-slate-200/80 animate-fade-in">
      <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-4 mb-6">
        <h2 className="text-3xl font-bold text-slate-900">My Saved Recipes</h2>
        {savedRecipes.length > 0 && (
          <input 
            type="text"
            placeholder="Search by name, ingredient, type..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full sm:w-64 p-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-emerald-500"
          />
        )}
      </div>
      
      {savedRecipes.length === 0 ? (
        <p className="text-slate-500 text-center py-8">You haven't saved any recipes yet.</p>
      ) : filteredRecipes.length === 0 ? (
        <p className="text-slate-500 text-center py-8">No recipes found matching your search.</p>
      ) : (
        <div className="space-y-4">
          {filteredRecipes.map(recipe => (
            <div key={recipe.id} className="p-4 border border-slate-200/80 rounded-lg flex flex-col sm:flex-row justify-between items-center gap-4 transition-all duration-200 hover:shadow-md hover:border-emerald-300 hover:-translate-y-0.5 hover:bg-slate-50">
              <div className="flex-grow min-w-0 w-full">
                <h3 className="text-xl font-semibold text-slate-800 truncate cursor-pointer" onClick={() => onView(recipe)}>{recipe.recipeName}</h3>
                <p className="text-slate-600 text-sm mt-1 italic truncate">"{recipe.description}"</p>
              </div>
              <div className="flex gap-1 sm:gap-2 flex-shrink-0 items-center w-full sm:w-auto justify-end">
                <div className="relative">
                    <button 
                      onClick={() => setActiveDayPicker(activeDayPicker === recipe.id ? null : recipe.id)}
                      className="p-2 text-slate-500 hover:bg-emerald-100 hover:text-emerald-600 rounded-full transition-colors"
                      aria-label="Add to meal plan"
                      title="Add to meal plan"
                    >
                      <PlusCircleIcon className="w-6 h-6" />
                    </button>
                    {activeDayPicker === recipe.id && (
                        <DayPicker onSelect={(day) => { onAddToMealPlan(recipe, day); setActiveDayPicker(null); }} />
                    )}
                </div>
                <button onClick={() => handleCopyLink(recipe.id)} className="p-2 text-slate-500 hover:bg-sky-100 hover:text-sky-600 rounded-full transition-colors" title="Copy share link">
                    {copiedLink === recipe.id ? <span className="text-xs text-sky-600 px-1">Copied!</span> : <LinkIcon className="w-5 h-5" />}
                </button>
                 <button 
                  onClick={() => onEdit(recipe)}
                  className="p-2 text-slate-500 hover:bg-yellow-100 hover:text-yellow-600 rounded-full transition-colors"
                  aria-label="Edit recipe"
                  title="Edit recipe"
                >
                  <EditIcon className="w-5 h-5" />
                </button>
                <button 
                  onClick={() => onView(recipe)}
                  className="px-4 py-2 bg-emerald-500 text-white font-semibold rounded-lg hover:bg-emerald-600 transition-colors text-sm sm:text-base"
                >
                  View
                </button>
                <button 
                  onClick={() => onDelete(recipe.id)}
                  className="p-2 text-slate-500 hover:bg-red-100 hover:text-red-600 rounded-full transition-colors"
                  aria-label="Delete recipe"
                  title="Delete recipe"
                >
                  <TrashIcon className="w-5 h-5" />
                </button>
              </div>
            </div>
          ))}

          {savedRecipes.length > 0 && (
            <div className="pt-6 mt-6 border-t border-slate-200 flex justify-end">
                <button
                    onClick={onClearAll}
                    className="px-4 py-2 bg-red-500 text-white font-semibold rounded-lg hover:bg-red-600 transition-colors"
                >
                    Clear All Recipes
                </button>
            </div>
          )}
        </div>
      )}
       <style>{`
        @keyframes fade-in {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes fade-in-short {
          from { opacity: 0; transform: scale(0.95) translateY(-5px); }
          to { opacity: 1; transform: scale(1) translateY(0); }
        }
        .animate-fade-in {
          animation: fade-in 0.5s ease-out forwards;
        }
        .animate-fade-in-short {
          animation: fade-in-short 0.2s ease-out forwards;
        }
      `}</style>
    </div>
  );
};

export default SavedRecipesList;