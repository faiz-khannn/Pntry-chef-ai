import React from 'react';
import type { User } from '../types';
import { mockUsers } from '../data/users';
import GoogleIcon from './icons/GoogleIcon';

interface LoginModalProps {
  onSelectUser: (user: User) => void;
  onClose: () => void;
}

const LoginModal: React.FC<LoginModalProps> = ({ onSelectUser, onClose }) => {
  return (
    <div 
      className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 animate-fade-in no-print"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
    >
      <div 
        className="bg-white rounded-2xl shadow-xl p-8 m-4 max-w-sm w-full"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="text-center">
          <GoogleIcon className="w-12 h-12 mx-auto mb-2" />
          <h2 className="text-2xl font-bold text-slate-800">Choose an account</h2>
          <p className="text-slate-500 mt-1">to continue to Pantry Chef AI</p>
        </div>
        <div className="mt-6 space-y-3">
          {mockUsers.map(user => (
            <button
              key={user.email}
              onClick={() => onSelectUser(user)}
              className="w-full flex items-center gap-4 p-3 border border-slate-200 rounded-lg hover:bg-slate-50 transition-colors text-left"
            >
              <img src={user.picture} alt={user.name} className="w-10 h-10 rounded-full" />
              <div>
                <p className="font-semibold text-slate-700">{user.name}</p>
                <p className="text-sm text-slate-500">{user.email}</p>
              </div>
            </button>
          ))}
        </div>
        <div className="mt-6 text-center">
          <button onClick={onClose} className="text-sm text-slate-500 hover:underline">
            Cancel
          </button>
        </div>
      </div>
      <style>{`
        @keyframes fade-in {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        .animate-fade-in {
          animation: fade-in 0.2s ease-out forwards;
        }
      `}</style>
    </div>
  );
};

export default LoginModal;
