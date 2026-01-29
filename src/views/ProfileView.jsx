import React, { useState } from 'react';
import { User, CheckCircle2, Settings, Clock, ClipboardCheck, CreditCard, Zap, ChevronRight, LogOut, Save, X } from 'lucide-react';
import StatusBadge from '../components/StatusBadge';

const ProfileView = ({ points, scanHistory, userProfile, setUserProfile }) => {
    const [isEditing, setIsEditing] = useState(false);

    // Fallback if not provided (though App.jsx should provide it)
    const profile = userProfile || {
        name: 'Siddharth',
        handle: 'Research_Node',
        role: 'Verified Food Analyst'
    };

    const history = scanHistory || [
        { id: 1, dish: 'Saffron Biryani', date: 'Jan 28, 2026', status: 'Verified', points: '+10' },
        { id: 2, dish: 'Chicken Salad', date: 'Jan 25, 2026', status: 'Flagged', points: '+5' },
        { id: 3, dish: 'Paneer Butter Masala', date: 'Jan 22, 2026', status: 'Verified', points: '+10' },
    ];

    const handleSave = () => {
        setIsEditing(false);
    };

    return (
        <div className="flex flex-col gap-8 pb-24 md:pb-8 max-w-5xl mx-auto">
            {/* Profile Info Card */}
            <div className={`bg-white border rounded-3xl p-6 md:p-10 shadow-sm flex flex-col md:flex-row gap-8 items-center md:items-start text-center md:text-left relative overflow-hidden transition-all duration-300 ${isEditing ? 'border-orange-200 ring-4 ring-orange-50' : 'border-gray-200'}`}>
                <div className="relative">
                    <div className="w-32 h-32 md:w-40 md:h-40 rounded-full bg-gradient-to-tr from-orange-500 to-orange-700 p-1.5 shadow-xl">
                        <div className="w-full h-full rounded-full bg-white flex items-center justify-center overflow-hidden">
                            <User size={64} className="text-gray-200" />
                        </div>
                    </div>
                    <div className="absolute bottom-2 right-2 w-8 h-8 bg-emerald-500 border-4 border-white rounded-full flex items-center justify-center shadow-lg">
                        <CheckCircle2 size={16} className="text-white" />
                    </div>
                </div>

                <div className="flex-1 space-y-4 pt-4 w-full">
                    {isEditing ? (
                        <div className="space-y-4 animate-in fade-in slide-in-from-bottom-2">
                            <div className="text-left space-y-1">
                                <label className="text-[10px] font-bold uppercase tracking-widest text-gray-400 ml-1">Display Name</label>
                                <input
                                    className="w-full p-3 text-lg font-black italic bg-gray-50 border border-gray-200 rounded-xl outline-none focus:border-orange-500 transition-colors"
                                    value={profile.name}
                                    onChange={(e) => setUserProfile({ ...profile, name: e.target.value })}
                                />
                            </div>
                            <div className="text-left space-y-1">
                                <label className="text-[10px] font-bold uppercase tracking-widest text-gray-400 ml-1">Handle</label>
                                <input
                                    className="w-full p-3 text-sm font-bold bg-gray-50 border border-gray-200 rounded-xl outline-none focus:border-orange-500 transition-colors"
                                    value={profile.handle}
                                    onChange={(e) => setUserProfile({ ...profile, handle: e.target.value })}
                                />
                            </div>
                            <div className="text-left space-y-1">
                                <label className="text-[10px] font-bold uppercase tracking-widest text-gray-400 ml-1">Role Title</label>
                                <input
                                    className="w-full p-3 text-xs font-bold bg-gray-50 border border-gray-200 rounded-xl outline-none focus:border-orange-500 transition-colors"
                                    value={profile.role}
                                    onChange={(e) => setUserProfile({ ...profile, role: e.target.value })}
                                />
                            </div>
                        </div>
                    ) : (
                        <div>
                            <h3 className="text-3xl font-black text-gray-900 uppercase italic tracking-tighter">{profile.name} <span className="text-orange-600">{profile.handle}</span></h3>
                            <p className="text-xs text-gray-500 font-bold uppercase tracking-[0.2em] mt-1">{profile.role} // Rank #42</p>
                        </div>
                    )}

                    {!isEditing && (
                        <div className="flex flex-wrap justify-center md:justify-start gap-4">
                            <div className="px-4 py-2 bg-gray-50 border border-gray-100 rounded-xl text-center">
                                <p className="text-[9px] text-gray-400 font-black uppercase mb-0.5">Scans Performed</p>
                                <p className="text-lg font-black text-gray-900 italic">128</p>
                            </div>
                            <div className="px-4 py-2 bg-gray-50 border border-gray-100 rounded-xl text-center">
                                <p className="text-[9px] text-gray-400 font-black uppercase mb-0.5">Reward Tier</p>
                                <p className="text-lg font-black text-orange-600 italic">GOLD</p>
                            </div>
                            <div className="px-4 py-2 bg-gray-50 border border-gray-100 rounded-xl text-center">
                                <p className="text-[9px] text-gray-400 font-black uppercase mb-0.5">Accuracy</p>
                                <p className="text-lg font-black text-emerald-600 italic">98.2%</p>
                            </div>
                        </div>
                    )}
                </div>

                <button
                    onClick={() => isEditing ? handleSave() : setIsEditing(true)}
                    className={`absolute top-6 right-6 p-2 transition-all rounded-full ${isEditing ? 'bg-orange-600 text-white shadow-lg hover:scale-110' : 'text-gray-400 hover:text-gray-900 hover:bg-gray-100'}`}
                >
                    {isEditing ? <Save size={20} /> : <Settings size={20} />}
                </button>
            </div>

            {/* Profile Details Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {/* Verification History */}
                <div className="bg-white border border-gray-200 rounded-3xl p-8 shadow-sm">
                    <div className="flex justify-between items-center mb-6">
                        <h4 className="text-lg font-black text-gray-900 uppercase italic tracking-tighter flex items-center gap-2">
                            <Clock size={18} className="text-orange-600" /> Recent History
                        </h4>
                        <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest cursor-pointer hover:text-orange-600">See All</span>
                    </div>
                    <div className="space-y-4">
                        {history.map(item => (
                            <div key={item.id} className="flex items-center justify-between p-4 border border-gray-50 rounded-2xl hover:bg-gray-50 transition-colors">
                                <div className="flex items-center gap-4">
                                    <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${item.status === 'Verified' || item.status === 'Safe' ? 'bg-emerald-50 text-emerald-600' : 'bg-orange-50 text-orange-600'}`}>
                                        <ClipboardCheck size={20} />
                                    </div>
                                    <div>
                                        <p className="text-sm font-bold text-gray-900 uppercase italic leading-none">{item.dish}</p>
                                        <p className="text-[10px] text-gray-400 font-bold uppercase mt-1">{item.date}</p>
                                    </div>
                                </div>
                                <div className="text-right">
                                    <p className="text-xs font-black text-gray-900">{item.points}</p>
                                    <StatusBadge type={item.status === 'Verified' || item.status === 'Safe' ? 'success' : 'warning'}>{item.status}</StatusBadge>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Wallet & Rewards */}
                <div className="space-y-6">
                    <div className="bg-blue-900 p-8 rounded-3xl text-white shadow-xl relative overflow-hidden group">
                        <div className="relative z-10">
                            <CreditCard size={32} className="text-orange-600 mb-6" />
                            <h4 className="text-3xl font-black italic tracking-tighter leading-none mb-2">VeriWallet</h4>
                            <p className="text-xs font-bold text-blue-300 uppercase tracking-widest mb-8">Points can be redeemed for restaurant audits</p>

                            <div className="flex justify-between items-end border-t border-white/10 pt-6">
                                <div>
                                    <p className="text-[10px] font-bold text-blue-400 uppercase tracking-widest mb-1">Available Balance</p>
                                    <p className="text-4xl font-black italic">{points} <span className="text-sm font-bold text-orange-600 uppercase not-italic">pts</span></p>
                                </div>
                                <button className="bg-white text-blue-900 px-6 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest shadow-lg hover:scale-105 transition-transform">Redeem</button>
                            </div>
                        </div>
                        <Zap size={140} className="absolute -right-8 -bottom-8 opacity-10" />
                    </div>

                    <div className="bg-white border border-gray-200 p-8 rounded-3xl shadow-sm">
                        <h4 className="text-sm font-black text-gray-900 uppercase italic mb-6">Account Settings</h4>
                        <div className="space-y-3">
                            <button className="w-full flex items-center justify-between p-3 rounded-xl hover:bg-gray-50 transition-colors group">
                                <span className="text-xs font-bold text-gray-600 uppercase tracking-widest group-hover:text-gray-900 transition-colors">Personal Information</span>
                                <ChevronRight size={16} className="text-gray-300" />
                            </button>
                            <button className="w-full flex items-center justify-between p-3 rounded-xl hover:bg-gray-50 transition-colors group">
                                <span className="text-xs font-bold text-gray-600 uppercase tracking-widest group-hover:text-gray-900 transition-colors">Privacy & Security</span>
                                <ChevronRight size={16} className="text-gray-300" />
                            </button>
                            <button className="w-full flex items-center justify-between p-3 rounded-xl bg-red-50 hover:bg-red-100 transition-colors group border border-red-100">
                                <span className="text-xs font-bold text-red-600 uppercase tracking-widest flex items-center gap-2"><LogOut size={14} /> Log Out</span>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProfileView;
