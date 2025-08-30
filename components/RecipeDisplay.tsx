import React, { useState } from 'react';
import type { Recipe, DayOfWeek, SavedRecipe } from '../types';
import UtensilsIcon from './icons/UtensilsIcon';
import ListIcon from './icons/ListIcon';
import BookmarkIcon from './icons/BookmarkIcon';
import ShareIcon from './icons/ShareIcon';
import ClockIcon from './icons/ClockIcon';
import BarChartIcon from './icons/BarChartIcon';
import HeartIcon from './icons/HeartIcon';
import PlusCircleIcon from './icons/PlusCircleIcon';
import { generateRecipeImage } from '../services/geminiService';
import DownloadIcon from './icons/DownloadIcon';
import ImageIcon from './icons/ImageIcon';
import LinkIcon from './icons/LinkIcon';


interface RecipeDisplayProps {
  recipe: Recipe;
  onSave?: (recipe: Recipe) => SavedRecipe | undefined;
  isSaved?: boolean;
  onAddToMealPlan: (recipe: Recipe, day: DayOfWeek) => void;
}

const RecipeDisplay: React.FC<RecipeDisplayProps> = ({ recipe, onSave, isSaved, onAddToMealPlan }) => {
  const [copied, setCopied] = useState<string | null>(null);
  const [showDayPicker, setShowDayPicker] = useState(false);
  const [showSavedFeedback, setShowSavedFeedback] = useState(false);
  const [showShareMenu, setShowShareMenu] = useState(false);
  
  const [isGeneratingImage, setIsGeneratingImage] = useState(false);
  const [generatedImage, setGeneratedImage] = useState<string | null>(null);
  const [imageError, setImageError] = useState<string | null>(null);

  const [currentRecipe, setCurrentRecipe] = useState<Recipe | SavedRecipe>(recipe);


  const days: DayOfWeek[] = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];

  const handleCopy = (text: string, type: 'text' | 'link') => {
    setShowShareMenu(false);
    navigator.clipboard.writeText(text).then(() => {
      setCopied(type);
      setTimeout(() => setCopied(null), 2500);
    }).catch(err => console.error("Failed to copy: ", err));
  };
  
  const getShareableLink = () => {
    if ('id' in currentRecipe) {
        return `${window.location.origin}${window.location.pathname}#recipe=${currentRecipe.id}`;
    }
    return null;
  }

  const handleGenerateImage = async () => {
    setIsGeneratingImage(true);
    setImageError(null);
    try {
      const base64Image = await generateRecipeImage(recipe.recipeName);
      setGeneratedImage(`data:image/jpeg;base64,${base64Image}`);
    } catch (err: any) {
      setImageError(err.message || "Could not generate image.");
    } finally {
      setIsGeneratingImage(false);
    }
  };

  const handlePrint = () => {
    setShowShareMenu(false);
    window.print();
  };

  const handleSave = () => {
    if (onSave) {
      const saved = onSave(recipe);
      if (saved) {
        setCurrentRecipe(saved);
      }
      setShowSavedFeedback(true);
      setTimeout(() => setShowSavedFeedback(false), 2500);
    }
  };

  const difficultyColor = {
    'Easy': 'text-green-600 bg-green-100',
    'Medium': 'text-yellow-600 bg-yellow-100',
    'Hard': 'text-red-600 bg-red-100',
  };

  return (
    <div className="bg-white p-6 sm:p-8 rounded-2xl shadow-lg border border-slate-200/80 animate-fade-in printable-area transition-all duration-300 hover:shadow-xl hover:-translate-y-1">
      
      {generatedImage && (
        <div className="mb-6 rounded-lg overflow-hidden relative group">
          <img src={generatedImage} alt={`AI generated image of ${recipe.recipeName}`} className="w-full h-64 object-cover" />
          <a
            href={generatedImage}
            download={`${recipe.recipeName.replace(/\s+/g, '-')}-image.jpg`}
            className="absolute top-3 right-3 bg-black/50 text-white p-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
            title="Download Image"
          >
            <DownloadIcon className="w-6 h-6" />
          </a>
        </div>
      )}

      {!generatedImage && (
          <div className="mb-6 p-4 border-2 border-dashed border-slate-200 rounded-lg text-center">
              <button onClick={handleGenerateImage} disabled={isGeneratingImage} className="flex items-center gap-2 mx-auto px-4 py-2 bg-slate-100 text-slate-700 font-semibold rounded-lg hover:bg-slate-200 transition-colors disabled:bg-slate-100 disabled:text-slate-400">
                  <ImageIcon className="w-5 h-5"/>
                  {isGeneratingImage ? 'Generating Image...' : 'Generate Feature Image'}
              </button>
              {isGeneratingImage && <p className="text-sm mt-2 text-slate-500">The AI is warming up its camera...</p>}
              {imageError && <p className="text-sm mt-2 text-red-500">{imageError}</p>}
          </div>
      )}


      <div className="flex justify-between items-start mb-4">
        <div>
            <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 mb-2">{recipe.recipeName}</h2>
            <p className="text-slate-600 italic">"{recipe.description}"</p>
        </div>
        <div className="flex gap-2 flex-shrink-0 ml-4 items-center no-print">
          {showSavedFeedback && <p className="text-sm text-emerald-600 animate-fade-in">Saved!</p>}
          {onSave && !isSaved && !showSavedFeedback && (
            <button onClick={handleSave} className="p-2 rounded-full text-slate-500 hover:bg-emerald-100 hover:text-emerald-600 transition-colors" title="Save Recipe" aria-label="Save Recipe">
                <BookmarkIcon className="w-6 h-6" />
            </button>
          )}
          <div className="relative">
            <button onClick={() => setShowShareMenu(prev => !prev)} className="p-2 rounded-full text-slate-500 hover:bg-slate-100" title="Share Options" aria-label="Share Options">
                <ShareIcon className="w-6 h-6" />
            </button>
            {showShareMenu && (
               <div className="absolute top-full right-0 mt-2 bg-white border border-slate-200 rounded-lg shadow-xl py-1 z-10 animate-fade-in-short w-48">
                  <button onClick={() => handleCopy(getShareableLink() || '', 'link')} disabled={!getShareableLink()} className="flex items-center gap-2 w-full text-left px-4 py-2 text-slate-700 hover:bg-slate-100 disabled:text-slate-400 disabled:bg-transparent">
                      <LinkIcon className="w-4 h-4" /> Copy Link
                  </button>
                  <button onClick={() => handleCopy(Object.values(recipe).join('\n\n'), 'text')} className="flex items-center gap-2 w-full text-left px-4 py-2 text-slate-700 hover:bg-slate-100">
                    Copy Text
                  </button>
                  <button onClick={handlePrint} className="flex items-center gap-2 w-full text-left px-4 py-2 text-slate-700 hover:bg-slate-100">
                    <DownloadIcon className="w-4 h-4" /> Download PDF
                  </button>
              </div>
            )}
          </div>
        </div>
      </div>
      {copied && <p className="text-sm text-emerald-600 text-right -mt-2 mb-4 animate-fade-in no-print">{copied === 'link' ? 'Share link copied!' : 'Recipe text copied!'}</p>}
      
      <div className="bg-slate-100 rounded-lg p-5 flex flex-wrap justify-around items-center gap-4 mb-8 border border-slate-200/80">
        <div className="flex items-center gap-2 text-slate-700" title="Cooking Time">
            <ClockIcon className="w-5 h-5 text-emerald-500"/>
            <span className="font-medium">{recipe.cookingTime}</span>
        </div>
        <div className="flex items-center gap-2 text-slate-700" title="Difficulty">
            <BarChartIcon className="w-5 h-5 text-emerald-500"/>
            <span className={`font-medium px-2 py-0.5 rounded-md text-sm ${difficultyColor[recipe.difficulty] || ''}`}>{recipe.difficulty}</span>
        </div>
        <div className="flex items-center gap-2 text-slate-700" title={`Calories: ${recipe.nutrition.calories} | Protein: ${recipe.nutrition.protein} | Carbs: ${recipe.nutrition.carbs} | Fat: ${recipe.nutrition.fat}`}>
            <HeartIcon className="w-5 h-5 text-emerald-500"/>
            <span className="font-medium">{recipe.nutrition.calories}</span>
        </div>
        <div className="relative no-print">
            <button onClick={() => setShowDayPicker(prev => !prev)} className="flex items-center gap-2 px-3 py-1.5 bg-emerald-500 text-white rounded-lg hover:bg-emerald-600 transition-colors text-sm font-semibold">
                <PlusCircleIcon className="w-5 h-5" />
                Add to Meal Plan
            </button>
            {showDayPicker && (
                <div className="absolute top-full right-0 mt-2 bg-white border border-slate-200 rounded-lg shadow-xl py-1 z-10 animate-fade-in-short">
                    {days.map(day => (
                        <button key={day} onClick={() => { onAddToMealPlan(recipe, day); setShowDayPicker(false); }} className="block w-full text-left px-4 py-2 text-slate-700 hover:bg-slate-100">
                            {day}
                        </button>
                    ))}
                </div>
            )}
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-8">
        <div>
          <h3 className="text-xl font-semibold text-emerald-700 mb-4 flex items-center gap-2">
            <ListIcon className="w-6 h-6" />
            Ingredients
          </h3>
          <ul className="space-y-2 list-disc list-inside text-slate-700">
            {recipe.ingredients.map((ingredient, index) => (
              <li key={index} className="pl-2">{ingredient}</li>
            ))}
          </ul>
        </div>
        
        <div>
          <h3 className="text-xl font-semibold text-emerald-700 mb-4 flex items-center gap-2">
            <UtensilsIcon className="w-6 h-6" />
            Instructions
          </h3>
          <ol className="space-y-4 text-slate-800">
            {recipe.instructions.map((step, index) => (
              <li key={index} className="flex items-start gap-3">
                <span className="flex-shrink-0 bg-emerald-500 text-white font-bold text-sm w-6 h-6 rounded-full flex items-center justify-center mt-1">
                  {index + 1}
                </span>
                <p>{step}</p>
              </li>
            ))}
          </ol>
        </div>
      </div>
      <style>{`
        @keyframes fade-in {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fade-in {
          animation: fade-in 0.5s ease-out forwards;
        }
        @keyframes fade-in-short {
          from { opacity: 0; transform: scale(0.95) translateY(-5px); }
          to { opacity: 1; transform: scale(1) translateY(0); }
        }
        .animate-fade-in-short {
          animation: fade-in-short 0.2s ease-out forwards;
        }
      `}</style>
    </div>
  );
};

export default RecipeDisplay;