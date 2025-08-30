import React from 'react';
import type { MealPlan, DayOfWeek, SavedRecipe } from '../types';
import TrashIcon from './icons/TrashIcon';

interface MealPlannerProps {
    mealPlan: MealPlan;
    onViewRecipe: (recipe: SavedRecipe) => void;
    onRemoveFromPlan: (day: DayOfWeek) => void;
    onClearPlan: () => void;
}

const MealPlanner: React.FC<MealPlannerProps> = ({ mealPlan, onViewRecipe, onRemoveFromPlan, onClearPlan }) => {
    const days: DayOfWeek[] = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
    const isPlanEmpty = Object.values(mealPlan).every(r => r === null);

    return (
        <div className="bg-white p-6 sm:p-8 rounded-2xl shadow-lg border border-slate-200 animate-fade-in">
            <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-4 mb-6">
                <h2 className="text-3xl font-bold text-slate-900">Weekly Meal Plan</h2>
                {!isPlanEmpty && (
                    <button
                        onClick={onClearPlan}
                        className="px-4 py-2 bg-red-500 text-white font-semibold rounded-lg hover:bg-red-600 transition-colors self-start sm:self-center"
                    >
                        Clear Meal Plan
                    </button>
                )}
            </div>
            <div className="space-y-4">
                {days.map(day => {
                    const recipe = mealPlan[day];
                    return (
                        <div key={day} className="p-4 border border-slate-200 rounded-lg flex flex-col sm:flex-row justify-between sm:items-center gap-4">
                            <h3 className="text-xl font-semibold text-emerald-700 w-full sm:w-32 flex-shrink-0">{day}</h3>
                            {recipe ? (
                                <div className="w-full flex justify-between items-center gap-4 bg-slate-50 p-3 rounded-lg">
                                    <div className="min-w-0">
                                        <p className="font-semibold text-slate-800 truncate">{recipe.recipeName}</p>
                                        <p className="text-sm text-slate-500 italic truncate">"{recipe.description}"</p>
                                    </div>
                                    <div className="flex gap-2 flex-shrink-0">
                                        <button 
                                            onClick={() => onViewRecipe(recipe)}
                                            className="px-4 py-2 bg-emerald-100 text-emerald-800 font-semibold rounded-lg hover:bg-emerald-200 transition-colors text-sm"
                                        >
                                            View
                                        </button>
                                        <button 
                                            onClick={() => onRemoveFromPlan(day)}
                                            className="p-2 text-slate-500 hover:bg-red-100 hover:text-red-600 rounded-full transition-colors"
                                            aria-label={`Remove ${recipe.recipeName} from ${day}`}
                                        >
                                            <TrashIcon className="w-5 h-5" />
                                        </button>
                                    </div>
                                </div>
                            ) : (
                                <div className="w-full text-center sm:text-left text-slate-400 p-3">
                                    No meal planned.
                                </div>
                            )}
                        </div>
                    );
                })}
            </div>
             <style>{`
                @keyframes fade-in {
                from { opacity: 0; transform: translateY(10px); }
                to { opacity: 1; transform: translateY(0); }
                }
                .animate-fade-in {
                animation: fade-in 0.5s ease-out forwards;
                }
            `}</style>
        </div>
    );
};

export default MealPlanner;