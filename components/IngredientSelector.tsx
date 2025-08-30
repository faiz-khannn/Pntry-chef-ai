import React, { useState } from 'react';
import { ingredientCategories } from '../data/ingredients';
import { 
    ChickenIcon, BeefIcon, EggIcon, TofuIcon,
    TomatoIcon, OnionIcon, GarlicIcon, BellPepperIcon,
    MilkIcon, CheeseIcon, ButterIcon, YogurtIcon,
    CuminIcon, PaprikaIcon, TurmericIcon, OreganoIcon
} from './icons/ingredients';

const icons: { [key: string]: React.FC<React.SVGProps<SVGSVGElement>> } = {
    ChickenIcon, BeefIcon, EggIcon, TofuIcon,
    TomatoIcon, OnionIcon, GarlicIcon, BellPepperIcon,
    MilkIcon, CheeseIcon, ButterIcon, YogurtIcon,
    CuminIcon, PaprikaIcon, TurmericIcon, OreganoIcon
};

interface IngredientSelectorProps {
    onSelect: (ingredient: string) => void;
}

const IngredientSelector: React.FC<IngredientSelectorProps> = ({ onSelect }) => {
    const [isOpen, setIsOpen] = useState(false);
    const categoryNames = Object.keys(ingredientCategories);
    const [activeTab, setActiveTab] = useState(categoryNames[0]);

    if (!isOpen) {
        return (
            <div className="text-center border-t pt-4">
                <button onClick={() => setIsOpen(true)} className="text-emerald-600 font-semibold hover:underline">
                    Or browse common ingredients...
                </button>
            </div>
        );
    }
    
    return (
        <div className="border rounded-lg p-4 bg-slate-50/50">
            <div className="flex flex-wrap gap-2 border-b mb-4">
                {categoryNames.map(category => (
                    <button 
                        key={category}
                        onClick={() => setActiveTab(category)}
                        className={`px-3 py-1.5 text-sm font-semibold rounded-t-md ${activeTab === category ? 'bg-emerald-500 text-white' : 'text-slate-600 hover:bg-slate-200'}`}
                    >
                        {category}
                    </button>
                ))}
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3">
                {(ingredientCategories as any)[activeTab].map((item: { name: string, icon: string }) => {
                    const IconComponent = icons[item.icon];
                    return (
                        <button 
                            key={item.name} 
                            onClick={() => onSelect(item.name)}
                            className="flex flex-col items-center justify-center gap-2 p-3 bg-white border rounded-lg hover:shadow-md hover:border-emerald-500 transition-all duration-200"
                        >
                            {IconComponent && <IconComponent className="w-8 h-8 text-emerald-600" />}
                            <span className="text-sm font-medium text-slate-700">{item.name}</span>
                        </button>
                    );
                })}
            </div>
             <div className="text-center border-t pt-4 mt-4">
                <button onClick={() => setIsOpen(false)} className="text-slate-500 font-semibold hover:underline text-sm">
                    Hide browser
                </button>
            </div>
        </div>
    );
};

export default IngredientSelector;
