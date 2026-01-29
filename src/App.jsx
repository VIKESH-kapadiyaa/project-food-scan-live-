import React, { useState, useEffect } from 'react';
import Navigation from './components/Navigation';
import Header from './components/Header';
import ProfileView from './views/ProfileView';
import EvaluateFlow from './views/EvaluateFlow';
import ReviewsView from './views/ReviewsView';
import HealthView from './views/HealthView';
import MarketView from './views/MarketView';

const App = () => {
  const [activeTab, setActiveTab] = useState('scan');
  const [points, setPoints] = useState(1250);
  const [isLoaded, setIsLoaded] = useState(false);

  // User Profile State
  const [userProfile, setUserProfile] = useState({
    name: 'Siddharth',
    handle: 'Research_Node',
    role: 'Verified Food Analyst',
    email: 'sid@example.com'
  });

  // App State to hold data shared across views
  const [scanHistory, setScanHistory] = useState([
    { id: '1', dish: 'Saffron Biryani', date: 'Jan 28, 2026', points: '+10', status: 'Safe', score: 98, details: 'Excellent freshness detected.' },
    { id: '2', dish: 'Chicken Salad', date: 'Jan 25, 2026', points: '+5', status: 'Caution', score: 65, details: 'Minor temperature inconsistencies.' },
  ]);

  // Points Management
  const redeemPoints = (amount) => {
    if (points >= amount) {
      setPoints(curr => curr - amount);
      return true;
    }
    return false;
  };

  const addPoints = (amount) => {
    setPoints(curr => curr + amount);
  };

  const handleScanComplete = (result) => {
    // Add result to history and award points
    const newScan = {
      id: Date.now().toString(),
      dish: 'New Scan',
      date: 'Just Now',
      points: '+15',
      status: result.score > 80 ? 'Safe' : result.score > 50 ? 'Caution' : 'Unsafe', // Logic derived from score
      score: result.score,
      details: `Freshness: ${result.freshness}, Ingredients: ${result.ingredients}`
    };

    setScanHistory([newScan, ...scanHistory]);
    addPoints(15);
    // Optional: Switch to health tab or show success toast
  };

  useEffect(() => setIsLoaded(true), []);
  if (!isLoaded) return null;

  return (
    <div className="min-h-screen bg-[#FDFDFD] text-gray-900 font-sans selection:bg-orange-600/10 flex flex-col antialiased pb-16 md:pb-0">
      <Header points={points} setActiveTab={setActiveTab} activeTab={activeTab} />

      <div className="flex-1 flex flex-col md:flex-row overflow-hidden h-full">
        <Navigation activeTab={activeTab} setActiveTab={setActiveTab} />

        <main className="flex-1 relative overflow-y-auto h-full">
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#f0f0f0_1px,transparent_1px),linear-gradient(to_bottom,#f0f0f0_1px,transparent_1px)] bg-[size:40px_40px] pointer-events-none opacity-40" />

          <div className="relative p-4 md:p-10">
            <div className="mb-8 md:mb-14">
              <div className="flex items-center gap-2 mb-2 md:mb-4">
                <div className="w-2 h-2 bg-orange-600 rounded-full" />
                <span className="text-[10px] font-black text-gray-400 uppercase tracking-[0.4em]">
                  {activeTab === 'scan' ? 'LAB_PROTOCOL_V2' : activeTab === 'profile' ? 'USER_PROFILE' : 'COMMUNITY_NODE'}
                </span>
              </div>
              <h2 className="text-4xl md:text-6xl font-black text-gray-900 uppercase italic tracking-tighter leading-none">
                {activeTab === 'scan' && <>Food <span className="text-orange-600">Scan</span></>}
                {activeTab === 'intel' && <>Health <span className="text-orange-600">Report</span></>}
                {activeTab === 'reviews' && <>Live <span className="text-orange-600">Reviews</span></>}
                {activeTab === 'market' && <>Smart <span className="text-orange-600">Deals</span></>}
                {activeTab === 'profile' && <>User <span className="text-orange-600">Profile</span></>}
              </h2>
            </div>

            {activeTab === 'scan' && <EvaluateFlow onScanComplete={handleScanComplete} />}
            {activeTab === 'intel' && <HealthView scanHistory={scanHistory} />}
            {activeTab === 'reviews' && <ReviewsView points={points} setPoints={setPoints} />}
            {activeTab === 'market' && <MarketView points={points} redeemPoints={redeemPoints} />}
            {activeTab === 'profile' && <ProfileView points={points} scanHistory={scanHistory} userProfile={userProfile} setUserProfile={setUserProfile} />}
          </div>
        </main>
      </div>

      <footer className="hidden md:flex h-12 border-t border-gray-100 bg-white items-center px-10 justify-between">
        <span className="text-[10px] text-gray-400 font-black tracking-widest uppercase italic">VeriFood Community Project 2026</span>
        <div className="flex items-center gap-4">
          <span className="text-[10px] text-orange-600 font-black uppercase tracking-widest italic animate-pulse">Syncing Lab Node...</span>
          <div className="w-1.5 h-1.5 bg-orange-600 rounded-full" />
        </div>
      </footer>
    </div>
  );
};

export default App;
