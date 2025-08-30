import React, { useState, useCallback, useEffect } from 'react';
import { generateRecipe } from './services/geminiService';
import type { Recipe, SavedRecipe, MealPlan, DayOfWeek, User } from './types';
import IngredientInput from './components/IngredientInput';
import RecipeDisplay from './components/RecipeDisplay';
import LoadingSpinner from './components/LoadingSpinner';
import ErrorMessage from './components/ErrorMessage';
import SavedRecipesList from './components/SavedRecipes';
import MealPlanner from './components/MealPlanner';
import Header from './components/Header';
import LoginModal from './components/LoginModal';

const AUTH_KEY = 'pantryChefAuth';

const App: React.FC = () => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);

  const [ingredientHistory, setIngredientHistory] = useState<string[][]>([[]]);
  const [currentIngredientStep, setCurrentIngredientStep] = useState(0);
  const ingredients = ingredientHistory[currentIngredientStep];

  const [recipeType, setRecipeType] = useState<string>('');
  const [recipe, setRecipe] = useState<Recipe | null>(null);
  const [savedRecipes, setSavedRecipes] = useState<SavedRecipe[]>([]);
  const [mealPlan, setMealPlan] = useState<MealPlan>({});
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [view, setView] = useState<'generator' | 'saved' | 'plan'>('generator');
  const [editingRecipe, setEditingRecipe] = useState<SavedRecipe | null>(null);
  
  const RECIPES_KEY = user ? `pantryChefRecipes_${user.email}` : 'pantryChefRecipes_guest';
  const MEALPLAN_KEY = user ? `pantryChefMealPlan_${user.email}` : 'pantryChefMealPlan_guest';

  // Check for persisted login
  useEffect(() => {
    try {
      const storedAuth = localStorage.getItem(AUTH_KEY);
      if (storedAuth) {
        setUser(JSON.parse(storedAuth));
      }
    } catch (err) {
      console.error("Failed to load auth data from localStorage", err);
    }
  }, []);
  
  // Load data on user change
  useEffect(() => {
    try {
      const storedRecipes = localStorage.getItem(RECIPES_KEY);
      const loadedRecipes = storedRecipes ? JSON.parse(storedRecipes) : [];
      setSavedRecipes(loadedRecipes);

      const storedMealPlan = localStorage.getItem(MEALPLAN_KEY);
      setMealPlan(storedMealPlan ? JSON.parse(storedMealPlan) : {});
    } catch (err) {
      console.error("Failed to load data from localStorage", err);
      setSavedRecipes([]);
      setMealPlan({});
    }
  }, [user, RECIPES_KEY, MEALPLAN_KEY]);

  // Handle loading recipe from URL hash
  useEffect(() => {
    const handleHashChange = () => {
        const hash = window.location.hash;
        if (hash.startsWith('#recipe=') && savedRecipes.length > 0) {
            const recipeId = hash.substring(8);
            const recipeFromLink = savedRecipes.find(r => r.id === recipeId);
            if (recipeFromLink) {
                handleViewRecipe(recipeFromLink);
            }
        }
    };
    handleHashChange();
    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, [savedRecipes]); // Rerun when recipes are loaded


  useEffect(() => {
    try {
      localStorage.setItem(RECIPES_KEY, JSON.stringify(savedRecipes));
    } catch (err) {
      console.error("Failed to save recipes to localStorage", err);
    }
  }, [savedRecipes, RECIPES_KEY]);

  useEffect(() => {
    try {
      localStorage.setItem(MEALPLAN_KEY, JSON.stringify(mealPlan));
    } catch (err) {
      console.error("Failed to save meal plan to localStorage", err);
    }
  }, [mealPlan, MEALPLAN_KEY]);

  const handleLogin = () => setIsLoginModalOpen(true);

  const handleUserSelect = (selectedUser: User) => {
    localStorage.setItem(AUTH_KEY, JSON.stringify(selectedUser));
    setUser(selectedUser);
    setView('generator');
    setRecipe(null);
    setIsLoginModalOpen(false);
  };

  const handleLogout = () => {
    localStorage.removeItem(AUTH_KEY);
    setUser(null);
    setView('generator');
    setRecipe(null);
  };

  const handleSetIngredients = useCallback((updater: (prev: string[]) => string[]) => {
    const newIngredients = updater(ingredients);
    const newHistory = [...ingredientHistory.slice(0, currentIngredientStep + 1), newIngredients];
    setIngredientHistory(newHistory);
    setCurrentIngredientStep(newHistory.length - 1);
  }, [ingredients, ingredientHistory, currentIngredientStep]);

  const handleUndo = () => currentIngredientStep > 0 && setCurrentIngredientStep(s => s - 1);
  const handleRedo = () => currentIngredientStep < ingredientHistory.length - 1 && setCurrentIngredientStep(s => s + 1);
  const canUndo = currentIngredientStep > 0;
  const canRedo = currentIngredientStep < ingredientHistory.length - 1;

  const handleRecipeRequestOrUpdate = useCallback(async () => {
    if (ingredients.length === 0) {
      setError('Please add some ingredients.');
      return;
    }
    setIsLoading(true);
    setError(null);
    setRecipe(null);
    try {
      const generatedRecipe = await generateRecipe(ingredients, recipeType);
      const newRecipe: Recipe = { ...generatedRecipe, recipeType };

      if (editingRecipe) {
        const updatedRecipe: SavedRecipe = { ...newRecipe, id: editingRecipe.id };
        setSavedRecipes(prev => prev.map(r => r.id === editingRecipe.id ? updatedRecipe : r));
        setMealPlan(prevPlan => {
            const newPlan = {...prevPlan};
            Object.keys(newPlan).forEach(day => {
                if (newPlan[day as DayOfWeek]?.id === editingRecipe.id) {
                    newPlan[day as DayOfWeek] = updatedRecipe;
                }
            });
            return newPlan;
        });
        setRecipe(updatedRecipe);
        setEditingRecipe(null);
      } else {
        setRecipe(newRecipe);
      }
    } catch (err) {
      console.error(err);
      setError(`Failed to ${editingRecipe ? 'update' : 'generate'} recipe. The AI chef might be busy. Please try again later.`);
    } finally {
      setIsLoading(false);
    }
  }, [ingredients, recipeType, editingRecipe]);

  const handleSaveRecipe = (recipeToSave: Recipe) => {
    if (savedRecipes.some(r => r.recipeName === recipeToSave.recipeName)) return;
    const newSavedRecipe: SavedRecipe = {
      ...recipeToSave,
      id: new Date().toISOString(),
    };
    setSavedRecipes(prev => [...prev, newSavedRecipe]);
    return newSavedRecipe;
  };
  
  const handleDeleteRecipe = (id: string) => {
    setSavedRecipes(prev => prev.filter(r => r.id !== id));
    setMealPlan(prevPlan => {
      const newPlan = {...prevPlan};
      Object.entries(newPlan).forEach(([day, recipe]) => {
        if (recipe?.id === id) {
          newPlan[day as DayOfWeek] = null;
        }
      });
      return newPlan;
    });
  };

  const handleClearAllRecipes = () => setSavedRecipes([]);

  const handleViewRecipe = (recipeToView: Recipe) => {
    setRecipe(recipeToView);
    setView('generator');
    setEditingRecipe(null);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  const handleStartEdit = (recipeToEdit: SavedRecipe) => {
    setEditingRecipe(recipeToEdit);
    const newHistory = [recipeToEdit.ingredients];
    setIngredientHistory(newHistory);
    setCurrentIngredientStep(0);
    setRecipeType(recipeToEdit.recipeType || '');
    setRecipe(null);
    setView('generator');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  const handleAddToMealPlan = (recipeToAdd: Recipe, day: DayOfWeek) => {
      let savedRecipe: SavedRecipe;
      const existing = savedRecipes.find(r => 'id' in recipeToAdd && r.id === (recipeToAdd as SavedRecipe).id);
      
      if(existing) {
        savedRecipe = existing;
      } else {
        savedRecipe = { ...recipeToAdd, id: new Date().toISOString() };
        setSavedRecipes(prev => [...prev.filter(r => r.recipeName !== savedRecipe.recipeName), savedRecipe]);
      }
      setMealPlan(prev => ({...prev, [day]: savedRecipe }));
  };

  const handleRemoveFromMealPlan = (day: DayOfWeek) => {
    setMealPlan(prev => ({ ...prev, [day]: null }));
  };

  const handleClearMealPlan = () => setMealPlan({});

  const isCurrentRecipeSaved = recipe && 'id' in recipe ? savedRecipes.some(r => r.id === (recipe as SavedRecipe).id) : false;
  
  const switchView = (newView: 'generator' | 'saved' | 'plan') => {
    setView(newView);
    setEditingRecipe(null);
    if (newView !== 'generator') {
        setRecipe(null);
    }
  }

  const renderView = () => {
    switch(view) {
        case 'saved':
            return <SavedRecipesList
                        savedRecipes={savedRecipes}
                        onView={handleViewRecipe}
                        onDelete={handleDeleteRecipe}
                        onClearAll={handleClearAllRecipes}
                        onAddToMealPlan={handleAddToMealPlan}
                        onEdit={handleStartEdit}
                    />;
        case 'plan':
            return <MealPlanner 
                        mealPlan={mealPlan} 
                        onViewRecipe={handleViewRecipe}
                        onRemoveFromPlan={handleRemoveFromMealPlan}
                        onClearPlan={handleClearMealPlan}
                    />;
        case 'generator':
        default:
            return <>
                <div className="bg-white p-6 sm:p-8 rounded-2xl shadow-lg border border-slate-200/80">
                  <IngredientInput
                    ingredients={ingredients}
                    setIngredients={handleSetIngredients}
                    recipeType={recipeType}
                    setRecipeType={setRecipeType}
                    onSubmit={handleRecipeRequestOrUpdate}
                    isLoading={isLoading}
                    onUndo={handleUndo}
                    onRedo={handleRedo}
                    canUndo={canUndo}
                    canRedo={canRedo}
                    isEditing={!!editingRecipe}
                  />
                </div>
                
                <div className="mt-8">
                  {isLoading && <LoadingSpinner isEditing={!!editingRecipe} />}
                  {error && <ErrorMessage message={error} />}
                  {recipe && !isLoading && <RecipeDisplay key={(recipe as SavedRecipe)?.id || recipe.recipeName} recipe={recipe} onSave={handleSaveRecipe} isSaved={isCurrentRecipeSaved} onAddToMealPlan={handleAddToMealPlan} />}
                </div>
            </>;
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 font-sans text-slate-800">
        <Header
            user={user}
            onLogin={handleLogin}
            onLogout={handleLogout}
            view={view}
            onSwitchView={switchView}
            savedRecipesCount={savedRecipes.length}
        />
      
      <main className="w-full max-w-4xl mx-auto p-4 sm:p-6 lg:p-8 pt-40">
        {renderView()}
      </main>

      <footer className="w-full max-w-4xl mx-auto text-center my-12 text-slate-500 text-sm no-print">
        <p>Powered by Gemini API. Bon Appétit!</p>
      </footer>
      
      {isLoginModalOpen && (
        <LoginModal 
          onSelectUser={handleUserSelect}
          onClose={() => setIsLoginModalOpen(false)}
        />
      )}
    </div>
  );
};

export default App;