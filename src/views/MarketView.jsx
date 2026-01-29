import React, { useState } from 'react';
import { ShoppingBag, Tag, Clock, ArrowRight, Copy, CheckCircle2 } from 'lucide-react';

const MarketView = ({ points, redeemPoints }) => {
    const [activeCategory, setActiveCategory] = useState('all');
    const [claimedDeals, setClaimedDeals] = useState([]);

    const deals = [
        { id: 1, title: '50% Off Zomato', cost: 500, category: 'food', desc: 'Valid on orders above ₹200', code: 'FOODGRAM50' },
        { id: 2, title: 'Free Swiggy Delivery', cost: 300, category: 'food', desc: 'No minimum order value', code: 'FREEDEL' },
        { id: 3, title: 'Health Checkup', cost: 1000, category: 'health', desc: 'Full body checkup partner', code: 'HEALTH100' },
        { id: 4, title: 'Organic Farm Box', cost: 800, category: 'groceries', desc: 'Fresh veggies delivered', code: 'FRESHBOX' },
        { id: 5, title: 'Movie Ticket BOGO', cost: 600, category: 'entertainment', desc: 'BookCurrent partner cinemas', code: 'MOVIENIGHT' },
    ];

    const categories = [
        { id: 'all', label: 'All Deals' },
        { id: 'food', label: 'Food Delivery' },
        { id: 'health', label: 'Health' },
        { id: 'groceries', label: 'Groceries' },
    ];

    const filteredDeals = activeCategory === 'all' ? deals : deals.filter(d => d.category === activeCategory);

    const handleClaim = (deal) => {
        if (points >= deal.cost) {
            redeemPoints(deal.cost);
            setClaimedDeals([...claimedDeals, deal.id]);
        } else {
            alert("Not enough points!");
        }
    };

    return (
        <div className="flex flex-col gap-6 pb-24 md:pb-8 max-w-5xl mx-auto">
            {/* Banner */}
            <div className="bg-gradient-to-r from-orange-600 to-orange-500 rounded-3xl p-8 text-white shadow-lg relative overflow-hidden">
                <div className="relative z-10 max-w-lg">
                    <span className="inline-block px-3 py-1 bg-white/20 rounded-full text-[10px] font-black uppercase tracking-widest mb-4 backdrop-blur-sm border border-white/10">Premium Rewards</span>
                    <h3 className="text-3xl md:text-4xl font-black italic tracking-tighter leading-none mb-4">Spend Points.<br />Save Money.</h3>
                    <p className="text-xs font-bold text-orange-100 uppercase tracking-widest mb-8 leading-relaxed">Exclusive deals from our partners for verified food analysts like you.</p>
                    <div className="flex gap-4">
                        <div className="bg-black/20 px-4 py-2 rounded-xl backdrop-blur-md">
                            <p className="text-[10px] text-orange-200 uppercase font-bold">Your Balance</p>
                            <p className="text-2xl font-black italic">{points} <span className="text-xs not-italic text-orange-200">pts</span></p>
                        </div>
                    </div>
                </div>
                <ShoppingBag size={180} className="absolute -right-8 -bottom-8 text-white opacity-10 rotate-12" />
            </div>

            {/* Filter Tabs */}
            <div className="flex overflow-x-auto gap-2 pb-2 md:pb-0 scrollbar-hide">
                {categories.map(cat => (
                    <button
                        key={cat.id}
                        onClick={() => setActiveCategory(cat.id)}
                        className={`px-4 py-2 rounded-full text-[10px] font-black uppercase tracking-wider whitespace-nowrap transition-all ${activeCategory === cat.id
                                ? 'bg-gray-900 text-white shadow-lg'
                                : 'bg-white border border-gray-200 text-gray-400 hover:border-gray-300 hover:text-gray-600'
                            }`}
                    >
                        {cat.label}
                    </button>
                ))}
            </div>

            {/* Deals Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredDeals.map(deal => {
                    const isClaimed = claimedDeals.includes(deal.id);
                    return (
                        <div key={deal.id} className={`bg-white border rounded-3xl p-6 shadow-sm flex flex-col justify-between transition-all group hover:shadow-md ${isClaimed ? 'border-emerald-200 bg-emerald-50/30' : 'border-gray-200'}`}>
                            <div className="mb-6">
                                <div className="flex justify-between items-start mb-4">
                                    <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${isClaimed ? 'bg-emerald-100 text-emerald-600' : 'bg-orange-50 text-orange-600'}`}>
                                        {isClaimed ? <CheckCircle2 size={20} /> : <Tag size={20} />}
                                    </div>
                                    <span className={`text-xs font-black uppercase px-2 py-1 rounded border ${isClaimed ? 'bg-emerald-100 border-emerald-200 text-emerald-700' : 'bg-gray-50 border-gray-100 text-gray-500'}`}>
                                        {deal.cost} pts
                                    </span>
                                </div>
                                <h4 className="text-lg font-black text-gray-900 italic leading-none mb-2">{deal.title}</h4>
                                <p className="text-xs text-gray-500 leading-relaxed font-bold">{deal.desc}</p>
                            </div>

                            {isClaimed ? (
                                <div className="bg-white border border-emerald-200 border-dashed rounded-xl p-3 flex items-center justify-between">
                                    <div>
                                        <p className="text-[9px] text-gray-400 font-bold uppercase">Code</p>
                                        <p className="text-sm font-black text-emerald-700 tracking-wider font-mono">{deal.code}</p>
                                    </div>
                                    <button className="p-2 text-gray-400 hover:text-gray-900 transition-colors" title="Copy">
                                        <Copy size={16} />
                                    </button>
                                </div>
                            ) : (
                                <button
                                    onClick={() => handleClaim(deal)}
                                    disabled={points < deal.cost}
                                    className={`w-full py-3 rounded-xl text-[10px] font-black uppercase tracking-widest flex items-center justify-center gap-2 transition-all ${points >= deal.cost
                                            ? 'bg-gray-900 text-white hover:bg-black shadow-lg hover:shadow-xl hover:-translate-y-0.5'
                                            : 'bg-gray-100 text-gray-400 cursor-not-allowed'
                                        }`}
                                >
                                    {points >= deal.cost ? 'Claim Reward' : 'Not Enough Points'}
                                    {points >= deal.cost && <ArrowRight size={14} />}
                                </button>
                            )}
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

export default MarketView;
