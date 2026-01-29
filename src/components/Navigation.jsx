import React from 'react';
import { Camera, Heart, MessageSquare, ShoppingBag, User, Zap } from 'lucide-react';

const Navigation = ({ activeTab, setActiveTab }) => {
    const tabs = [
        { id: 'scan', icon: Camera, label: 'Scan', longLabel: 'Check My Food' },
        { id: 'intel', icon: Heart, label: 'Health', longLabel: 'Safety & Health' },
        { id: 'reviews', icon: MessageSquare, label: 'Reviews', longLabel: 'Community Reviews' },
        { id: 'market', icon: ShoppingBag, label: 'Deals', longLabel: 'Smart Deals' },
    ];

    return (
        <>
            {/* Mobile Bottom Navigation */}
            <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-100 px-6 py-3 flex justify-between items-center z-50 md:hidden shadow-[0_-4px_20px_rgba(0,0,0,0.05)]">
                {tabs.map(tab => (
                    <button
                        key={tab.id}
                        onClick={() => setActiveTab(tab.id)}
                        className={`flex flex-col items-center gap-1 transition-all ${activeTab === tab.id ? 'text-orange-600 scale-110' : 'text-gray-400'
                            }`}
                    >
                        <tab.icon size={20} />
                        <span className="text-[10px] font-bold uppercase tracking-tighter">{tab.label}</span>
                    </button>
                ))}
                <button
                    onClick={() => setActiveTab('profile')}
                    className={`flex flex-col items-center gap-1 transition-all ${activeTab === 'profile' ? 'text-orange-600 scale-110' : 'text-gray-400'
                        }`}
                >
                    <User size={20} />
                    <span className="text-[10px] font-bold uppercase tracking-tighter">Profile</span>
                </button>
            </nav>

            {/* Desktop Sidebar */}
            <aside className="hidden md:flex w-72 border-r border-gray-100 bg-gray-50/50 p-6 flex-col justify-between sticky top-16 h-[calc(100vh-64px)]">
                <div className="space-y-8">
                    <div>
                        <p className="text-[11px] text-gray-400 font-black uppercase tracking-[0.3em] mb-6 ml-1">Main Tools</p>
                        <div className="space-y-2">
                            {tabs.map(tab => (
                                <button
                                    key={tab.id}
                                    onClick={() => setActiveTab(tab.id)}
                                    className={`w-full group flex flex-col items-start p-4 rounded-xl transition-all border ${activeTab === tab.id
                                        ? 'bg-white border-gray-200 text-blue-900 shadow-sm'
                                        : 'border-transparent text-gray-500 hover:text-gray-900 hover:bg-gray-200/50'
                                        }`}
                                >
                                    <div className="flex items-center gap-3">
                                        <tab.icon size={20} className={activeTab === tab.id ? 'text-orange-600' : ''} />
                                        <span className="text-sm font-bold uppercase tracking-wide italic">{tab.longLabel}</span>
                                    </div>
                                </button>
                            ))}
                        </div>
                    </div>
                    <div className="bg-blue-50 border border-blue-100 p-6 rounded-2xl relative overflow-hidden group">
                        <p className="text-[10px] text-blue-400 font-black uppercase mb-1 tracking-widest">User Level: Pro</p>
                        <p className="text-sm font-black text-blue-900 leading-tight italic">Unlocked: <br /> Advanced Spoilage Scan</p>
                        <Zap size={48} className="absolute -right-3 -bottom-3 text-blue-200 opacity-50" />
                    </div>
                </div>
                <div className="p-4 border-t border-gray-100">
                    <p className="text-[10px] text-gray-400 uppercase font-bold tracking-widest text-center">VeriFood AI System v2.1</p>
                </div>
            </aside>
        </>
    );
};

export default Navigation;
