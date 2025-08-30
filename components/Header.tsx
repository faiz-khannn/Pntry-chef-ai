import React, { useState } from 'react';
import type { User } from '../types';
import ChefHatIcon from './icons/ChefHatIcon';
import BookOpenIcon from './icons/BookOpenIcon';
import CalendarIcon from './icons/CalendarIcon';
import GoogleIcon from './icons/GoogleIcon';

interface HeaderProps {
  user: User | null;
  onLogin: () => void;
  onLogout: () => void;
  view: 'generator' | 'saved' | 'plan';
  onSwitchView: (view: 'generator' | 'saved' | 'plan') => void;
  savedRecipesCount: number;
}

const Header: React.FC<HeaderProps> = ({ user, onLogin, onLogout, view, onSwitchView, savedRecipesCount }) => {
  const [showUserMenu, setShowUserMenu] = useState(false);

  return (
    <header className="fixed top-0 left-0 right-0 bg-white/80 backdrop-blur-lg border-b border-slate-200/80 z-40 no-print">
      <div className="w-full max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-5">
          <div className="flex justify-center items-center gap-3 cursor-pointer" onClick={() => onSwitchView('generator')}>
            <ChefHatIcon className="w-10 h-10 text-emerald-500" />
            <h1 className="text-3xl font-extrabold tracking-tight bg-gradient-to-r from-emerald-500 to-teal-500 text-transparent bg-clip-text">
              Pantry Chef AI
            </h1>
          </div>
          <div className="relative">
            {user ? (
              <div className="flex items-center gap-4">
                 <span className="text-slate-600 hidden md:inline font-medium">Welcome, {user.name.split(' ')[0]}!</span>
                 <img
                  src={user.picture}
                  alt="User avatar"
                  className="w-10 h-10 rounded-full cursor-pointer border-2 border-slate-300 hover:border-emerald-500 transition-colors"
                  onClick={() => setShowUserMenu(prev => !prev)}
                />
                {showUserMenu && (
                   <div className="absolute top-full right-0 mt-2 bg-white border border-slate-200 rounded-lg shadow-xl py-1 z-20 w-32 animate-fade-in-short">
                      <button onClick={() => { onLogout(); setShowUserMenu(false); }} className="block w-full text-left px-4 py-2 text-slate-700 hover:bg-slate-100">
                        Sign Out
                      </button>
                  </div>
                )}
              </div>
            ) : (
              <button onClick={onLogin} className="flex items-center gap-2 px-4 py-2 bg-white text-slate-700 font-semibold rounded-lg hover:bg-slate-100 transition-colors border border-slate-300 shadow-sm">
                  <GoogleIcon className="w-5 h-5"/>
                  Sign In
              </button>
            )}
          </div>
        </div>
        <nav className="pb-3 flex justify-center gap-3 sm:gap-6">
            <button onClick={() => onSwitchView('generator')} className={`px-4 py-2 rounded-lg font-semibold transition-colors flex items-center gap-2 ${view === 'generator' ? 'bg-emerald-500 text-white shadow-md' : 'bg-white/50 text-slate-700 hover:bg-slate-100'}`}>
                New Recipe
            </button>
            <button onClick={() => onSwitchView('saved')} className={`relative px-4 py-2 rounded-lg font-semibold transition-colors flex items-center gap-2 ${view === 'saved' ? 'bg-emerald-500 text-white shadow-md' : 'bg-white/50 text-slate-700 hover:bg-slate-100'}`}>
                <BookOpenIcon className="w-5 h-5" />
                My Recipes
                {savedRecipesCount > 0 && (
                  <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs w-5 h-5 rounded-full flex items-center justify-center border-2 border-white">{savedRecipesCount}</span>
                )}
            </button>
              <button onClick={() => onSwitchView('plan')} className={`relative px-4 py-2 rounded-lg font-semibold transition-colors flex items-center gap-2 ${view === 'plan' ? 'bg-emerald-500 text-white shadow-md' : 'bg-white/50 text-slate-700 hover:bg-slate-100'}`}>
                <CalendarIcon className="w-5 h-5" />
                Meal Plan
            </button>
        </nav>
      </div>
       <style>{`
        @keyframes fade-in-short {
          from { opacity: 0; transform: scale(0.95) translateY(-5px); }
          to { opacity: 1; transform: scale(1) translateY(0); }
        }
        .animate-fade-in-short {
          animation: fade-in-short 0.2s ease-out forwards;
        }
      `}</style>
    </header>
  );
};

export default Header;