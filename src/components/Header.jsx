import React from 'react';
import { FlaskConical, Award, User } from 'lucide-react';

const Header = ({ points, setActiveTab, activeTab }) => (
    <header className="h-16 border-b border-gray-200 bg-white/80 backdrop-blur-md flex items-center justify-between px-4 md:px-8 sticky top-0 z-50">
        <div className="flex items-center gap-3 cursor-pointer" onClick={() => setActiveTab('scan')}>
            <div className="w-9 h-9 md:w-10 md:h-10 bg-orange-600 text-white flex items-center justify-center rounded-lg shadow-lg">
                <FlaskConical size={20} strokeWidth={2} />
            </div>
            <div className="leading-none">
                <h1 className="text-base md:text-lg font-black text-gray-900 uppercase tracking-tighter italic">VeriFood <span className="text-orange-600">Lab</span></h1>
                <p className="text-[9px] md:text-[10px] text-gray-500 font-bold uppercase tracking-widest">Trust Your Food</p>
            </div>
        </div>

        <div className="flex items-center gap-3">
            <div className="flex items-center gap-2 px-3 py-1.5 bg-orange-50 border border-orange-200 rounded-full">
                <Award className="text-orange-600" size={14} />
                <span className="text-xs font-black text-orange-600">{points} <span className="hidden xs:inline">pts</span></span>
            </div>
            <button
                onClick={() => setActiveTab('profile')}
                className={`w-9 h-9 md:w-10 md:h-10 rounded-full flex items-center justify-center transition-all ${activeTab === 'profile' ? 'bg-orange-600 text-white shadow-lg' : 'bg-blue-900 text-white hover:bg-black'
                    }`}
            >
                <User size={18} />
            </button>
        </div>
    </header>
);

export default Header;
