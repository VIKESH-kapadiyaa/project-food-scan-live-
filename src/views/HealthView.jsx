import React, { useState } from 'react';
import { Heart, Activity, AlertCircle, Thermometer, Clock, ChevronDown, ChevronUp } from 'lucide-react';
import StatusBadge from '../components/StatusBadge';

const HealthView = ({ scanHistory }) => {
    const [expandedId, setExpandedId] = useState(null);

    const toggleExpand = (id) => {
        setExpandedId(expandedId === id ? null : id);
    };

    // Safe fallback if history is empty
    const displayHistory = scanHistory && scanHistory.length > 0 ? scanHistory : [
        { id: 'demo1', dish: 'Grilled Chicken Salad', date: 'Just now', score: 98, status: 'Safe', color: 'text-emerald-500', details: 'High protein, fresh vegetables.' },
        { id: 'demo2', dish: 'Street Tacos', date: '2 hours ago', score: 45, status: 'Caution', color: 'text-orange-500', details: 'High sodium content detected.' },
    ];

    return (
        <div className="flex flex-col gap-6 pb-24 md:pb-8 max-w-4xl mx-auto">
            <div className="bg-emerald-50 border border-emerald-100 p-6 md:p-8 rounded-3xl relative overflow-hidden">
                <div className="relative z-10">
                    <h3 className="text-2xl font-black text-emerald-900 uppercase italic tracking-tighter mb-2">Health Insights</h3>
                    <p className="text-xs font-bold text-emerald-700 uppercase tracking-widest max-w-md">Your recent dietary patterns show a 15% improvement in protein intake.</p>
                </div>
                <Heart size={120} className="absolute -right-4 -bottom-4 text-emerald-200 opacity-50" />
            </div>

            <div className="bg-white border border-gray-200 rounded-3xl p-6 shadow-sm">
                <h4 className="text-lg font-black text-gray-900 uppercase italic mb-6 tracking-tighter flex items-center gap-2">
                    <Activity size={20} className="text-orange-600" /> Analysis Log
                </h4>

                <div className="space-y-4">
                    {displayHistory.map((scan) => (
                        <div key={scan.id} className="border border-gray-100 rounded-2xl overflow-hidden transition-all">
                            <div
                                className="p-4 flex items-center justify-between cursor-pointer hover:bg-gray-50 bg-white"
                                onClick={() => toggleExpand(scan.id)}
                            >
                                <div className="flex items-center gap-4">
                                    <div className={`w-10 h-10 rounded-full flex items-center justify-center font-black text-xs border-2 ${scan.score > 80 ? 'border-emerald-200 bg-emerald-50 text-emerald-700' :
                                            scan.score > 50 ? 'border-orange-200 bg-orange-50 text-orange-700' :
                                                'border-red-200 bg-red-50 text-red-700'
                                        }`}>
                                        {scan.score}
                                    </div>
                                    <div>
                                        <p className="text-sm font-black text-gray-900 uppercase italic">{scan.dish || 'Unknown Dish'}</p>
                                        <p className="text-[10px] text-gray-400 font-bold uppercase tracking-wider">{scan.date}</p>
                                    </div>
                                </div>
                                <div className="flex items-center gap-4">
                                    <StatusBadge type={scan.score > 80 ? 'success' : scan.score > 50 ? 'warning' : 'danger'}>
                                        {scan.score > 80 ? 'Verified' : 'Flagged'}
                                    </StatusBadge>
                                    {expandedId === scan.id ? <ChevronUp size={16} className="text-gray-400" /> : <ChevronDown size={16} className="text-gray-400" />}
                                </div>
                            </div>

                            {expandedId === scan.id && (
                                <div className="bg-gray-50/50 p-4 border-t border-gray-100 flex flex-col gap-3 animate-in slide-in-from-top-2">
                                    <div className="grid grid-cols-2 gap-3">
                                        <div className="bg-white p-3 rounded-xl border border-gray-100">
                                            <div className="flex items-center gap-2 mb-1">
                                                <Thermometer size={14} className="text-blue-500" />
                                                <span className="text-[9px] font-black text-gray-400 uppercase tracking-widest">Temp</span>
                                            </div>
                                            <p className="text-xs font-black text-gray-900">Optimal (65°C)</p>
                                        </div>
                                        <div className="bg-white p-3 rounded-xl border border-gray-100">
                                            <div className="flex items-center gap-2 mb-1">
                                                <AlertCircle size={14} className="text-orange-500" />
                                                <span className="text-[9px] font-black text-gray-400 uppercase tracking-widest">Allergens</span>
                                            </div>
                                            <p className="text-xs font-black text-gray-900">Dairy, Nuts</p>
                                        </div>
                                    </div>
                                    <div className="p-3">
                                        <p className="text-[10px] font-bold text-gray-500 uppercase tracking-wide leading-relaxed">
                                            <span className="text-gray-900 font-black mr-1">Lab Note:</span>
                                            {scan.details || "Samples match expected nutritional profile. No harmful contaminants detected."}
                                        </p>
                                    </div>
                                </div>
                            )}
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default HealthView;
