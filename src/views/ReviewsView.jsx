import React, { useState } from 'react';
import { PlusCircle, Star, Award } from 'lucide-react';

const ReviewsView = ({ points, setPoints, reviews, setReviews }) => {
    const [msg, setMsg] = useState('');

    const submit = () => {
        if (!msg) return;
        setReviews([{ user: 'You', comment: msg, rating: 5 }, ...reviews]);
        setPoints(points + 50);
        setMsg('');
    };

    return (
        <div className="flex flex-col lg:flex-row gap-8 pb-24 md:pb-8">
            <div className="flex-1 space-y-6">
                <div className="bg-white border border-gray-200 rounded-3xl p-6 md:p-10 shadow-sm">
                    <h3 className="text-2xl font-black text-gray-900 uppercase italic mb-6 tracking-tighter">Reviews</h3>

                    <div className="mb-8 p-6 bg-gray-50 border border-gray-100 rounded-2xl">
                        <p className="text-[10px] font-black text-orange-600 uppercase mb-4 flex items-center gap-2">
                            <PlusCircle size={16} /> Write a review to earn points
                        </p>
                        <textarea
                            value={msg}
                            onChange={e => setMsg(e.target.value)}
                            placeholder="How's the quality?"
                            className="w-full p-4 rounded-xl border border-gray-200 text-sm mb-4 outline-none focus:ring-1 focus:ring-orange-600 h-24"
                        />
                        <button onClick={submit} className="w-full py-3 bg-orange-600 text-white font-black text-[10px] uppercase rounded-xl">Post Review</button>
                    </div>

                    <div className="space-y-4">
                        {reviews.map((r, i) => (
                            <div key={i} className="p-5 border border-gray-100 rounded-2xl">
                                <div className="flex justify-between items-center mb-2">
                                    <span className="text-xs font-black uppercase italic">{r.user}</span>
                                    <div className="flex gap-0.5">
                                        {[...Array(r.rating)].map((_, j) => <Star key={j} size={10} fill="#EA580C" className="text-orange-600" />)}
                                    </div>
                                </div>
                                <p className="text-sm text-gray-600 leading-relaxed italic">"{r.comment}"</p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            <div className="lg:w-80 space-y-6">
                <div className="bg-blue-900 p-8 rounded-[2.5rem] text-white shadow-xl relative overflow-hidden">
                    <Award size={48} className="text-orange-600 mb-6" />
                    <h4 className="text-3xl font-black italic tracking-tighter mb-4 leading-none">Your <br /> Rewards</h4>
                    <div className="flex justify-between items-end border-b border-white/10 pb-4 mb-4">
                        <span className="text-[10px] font-bold text-blue-300 uppercase">Points Balance:</span>
                        <span className="text-2xl font-black italic">{points}</span>
                    </div>
                    <p className="text-[10px] font-bold text-blue-200 uppercase tracking-widest leading-relaxed">Reviews earn you 50 pts each.</p>
                </div>
            </div>
        </div>
    );
};

export default ReviewsView;
