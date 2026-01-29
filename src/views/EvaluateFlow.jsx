import React, { useState, useEffect } from 'react';
import { Camera, CheckCircle2, Activity, ShieldCheck, Fingerprint, ShoppingBag, X, Clock, AlertTriangle } from 'lucide-react';

const EvaluateFlow = ({ onScanComplete }) => {
    const [activeStep, setActiveStep] = useState(0);
    const [isAnalyzing, setIsAnalyzing] = useState(false);
    const [finalResult, setFinalResult] = useState(null);
    const [flowState, setFlowState] = useState('idle'); // idle, active, success, expired, failed
    const [timeLeft, setTimeLeft] = useState(300); // 5 minutes in seconds

    // Timer Logic
    useEffect(() => {
        let interval;
        if (flowState === 'active' && timeLeft > 0) {
            interval = setInterval(() => {
                setTimeLeft((prev) => {
                    if (prev <= 1) {
                        setFlowState('expired');
                        return 0;
                    }
                    return prev - 1;
                });
            }, 1000);
        }
        return () => clearInterval(interval);
    }, [flowState, timeLeft]);

    const formatTime = (seconds) => {
        const mins = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `${mins}:${secs.toString().padStart(2, '0')}`;
    };

    // Initial state logic
    const [photos, setPhotos] = useState([
        { label: 'Top View', status: 'empty', img: '' },
        { label: 'Side View', status: 'empty', img: '' },
        { label: 'Close Up', status: 'empty', img: '' },
        { label: 'Inside', status: 'empty', img: '' },
        { label: 'Seal/Package', status: 'empty', img: '' },
    ]);

    const handleStartClaim = () => {
        setFlowState('active');
        setTimeLeft(300); // Reset to 5 mins
    };

    // Create a ref for the file input
    const fileInputRef = React.useRef(null);

    const handlePhotoClick = (index) => {
        if (flowState !== 'active' || finalResult) return;
        setActiveStep(index);
        // Trigger the hidden file input
        if (fileInputRef.current) {
            fileInputRef.current.click();
        }
    };

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            const imageUrl = URL.createObjectURL(file);
            const newPhotos = [...photos];
            // Set to 'analyzing' state temporarily for effect
            newPhotos[activeStep] = {
                ...newPhotos[activeStep],
                status: 'analyzing',
                img: imageUrl
            };
            setPhotos(newPhotos);

            // Simulate brief processing delay
            setTimeout(() => {
                setPhotos(prev => {
                    const updated = [...prev];
                    updated[activeStep] = { ...updated[activeStep], status: 'verified' };
                    return updated;
                });
                if (activeStep < 4) setActiveStep(activeStep + 1);
            }, 800);
        }
    };

    const runAnalysis = () => {
        setIsAnalyzing(true);
        // Simulate AI Decision Tree
        setTimeout(() => {
            setIsAnalyzing(false);

            // Guaranteed success for the "Real Website" experience to help users
            // In a production backend, this would check the image binary
            const isSuccess = true;

            if (isSuccess) {
                const result = {
                    visual: 'Match Confirmed',
                    spoilage: 'Detected',
                    ingredients: 'Verified',
                    score: 98,
                    refundAmount: '₹182.00',
                    id: Date.now()
                };
                setFinalResult(result);
                setFlowState('success');
                if (onScanComplete) onScanComplete({ ...result, status: 'Safe', score: 98 }); // Logic adapter
            } else {
                setFlowState('failed');
            }
        }, 3000);
    };

    const resetScan = () => {
        setFinalResult(null);
        setFlowState('idle');
        setPhotos(photos.map(p => ({ ...p, status: 'empty', img: '' })));
        setActiveStep(0);
        setTimeLeft(300);
    };

    const allPhotosTaken = photos.every(p => p.img);

    // --- Views ---

    if (flowState === 'idle') {
        return (
            <div className="flex flex-col items-center justify-center p-10 border-2 border-dashed border-gray-200 rounded-3xl bg-gray-50/50 min-h-[400px]">
                <div className="w-20 h-20 bg-orange-100 rounded-full flex items-center justify-center mb-6 animate-pulse">
                    <AlertTriangle size={40} className="text-orange-600" />
                </div>
                <h3 className="text-2xl font-black text-gray-900 uppercase italic mb-2">Report a Issue</h3>
                <p className="text-sm text-gray-500 font-bold mb-8 text-center max-w-sm">
                    Found something wrong with your food? <br />
                    You have <span className="text-orange-600 underline">5 minutes</span> from delivery to file a claim.
                </p>
                <button
                    onClick={handleStartClaim}
                    className="px-8 py-4 bg-gray-900 text-white font-black uppercase tracking-widest rounded-xl hover:scale-105 transition-transform shadow-lg"
                >
                    Start Claim Process
                </button>
            </div>
        );
    }

    if (flowState === 'expired') {
        return (
            <div className="flex flex-col items-center justify-center p-10 border-2 border-gray-200 rounded-3xl bg-red-50 min-h-[400px]">
                <Clock size={60} className="text-red-400 mb-6" />
                <h3 className="text-2xl font-black text-red-900 uppercase italic mb-2">Time Expired</h3>
                <p className="text-sm text-red-700 font-bold mb-8 text-center max-w-sm">
                    The 5-minute verification window has closed. <br />
                    We cannot validate the freshness of the food anymore.
                </p>
                <button onClick={resetScan} className="text-xs font-black uppercase tracking-widest text-red-600 underline">Try Demo Again</button>
            </div>
        );
    }

    return (
        <div className="flex flex-col gap-6 pb-24 md:pb-8">
            {/* Timer Bar */}
            <div className="flex items-center justify-between bg-gray-900 text-white p-4 rounded-xl shadow-lg">
                <div className="flex items-center gap-3">
                    <Clock className={`animate-pulse ${timeLeft < 60 ? 'text-red-500' : 'text-orange-500'}`} size={20} />
                    <span className="text-xs font-bold uppercase tracking-widest text-gray-400">Claim Window</span>
                </div>
                <span className={`text-xl font-black font-mono ${timeLeft < 60 ? 'text-red-500' : 'text-white'}`}>
                    {formatTime(timeLeft)}
                </span>
            </div>

            {/* Photo Capture Row */}
            <div className="bg-white border border-gray-200 rounded-2xl md:rounded-3xl p-4 md:p-8 shadow-sm relative">
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 md:mb-10 gap-4">
                    <div>
                        <h3 className="text-xl md:text-2xl font-black text-gray-900 uppercase italic tracking-tighter leading-none">Evidence Upload</h3>
                        <p className="text-[10px] md:text-xs text-gray-500 font-bold uppercase tracking-widest mt-1">
                            Required: 5 Angles for AI Verification
                        </p>
                    </div>
                    {finalResult && (
                        <button onClick={resetScan} className="bg-gray-100 p-2 rounded-full hover:bg-gray-200 transition-colors absolute top-8 right-8">
                            <X size={16} />
                        </button>
                    )}
                </div>

                <div className="grid grid-cols-5 gap-2 md:gap-4">
                    {photos.map((photo, i) => (
                        <div key={i} className="space-y-2 cursor-pointer" onClick={() => handlePhotoClick(i)}>
                            <div className={`aspect-square rounded-xl md:rounded-2xl border-2 flex items-center justify-center relative overflow-hidden transition-all ${i === activeStep ? 'border-orange-600 scale-105 shadow-md' : photo.img ? 'border-emerald-200 bg-emerald-50' : 'border-dashed border-gray-200 bg-gray-50'
                                }`}>
                                {photo.img ? (
                                    <>
                                        <img src={photo.img} className="absolute inset-0 w-full h-full object-cover" />
                                        {photo.status === 'verified' && <CheckCircle2 className="text-emerald-600 relative z-10" size={18} />}
                                        {photo.status === 'analyzing' && <Activity className="text-orange-600 animate-pulse relative z-10" size={18} />}
                                    </>
                                ) : (
                                    <Camera size={20} className="text-gray-300" />
                                )}
                            </div>
                            <p className={`text-[8px] md:text-[10px] font-black uppercase text-center truncate ${i === activeStep ? 'text-gray-900' : 'text-gray-400'}`}>{photo.label}</p>
                        </div>
                    ))}
                </div>

                {flowState === 'active' && allPhotosTaken && !isAnalyzing && (
                    <button
                        onClick={runAnalysis}
                        className="w-full mt-6 py-4 bg-orange-600 hover:bg-orange-700 text-white font-black text-sm uppercase tracking-widest rounded-xl shadow-lg transition-all animate-bounce"
                    >
                        Verify & Claim Refund
                    </button>
                )}
            </div>

            {/* Hidden Inputs */}
            <input
                type="file"
                ref={fileInputRef}
                accept="image/*"
                capture="environment"
                className="hidden"
                onChange={handleFileChange}
            />

            {/* Analysis Results */}
            {(isAnalyzing || flowState === 'success' || flowState === 'failed') && (
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 animate-in slide-in-from-bottom-10 fade-in duration-500">
                    <div className="bg-gray-900 border border-gray-800 rounded-3xl overflow-hidden shadow-xl flex flex-col">
                        <div className="p-6 md:p-10 space-y-6">
                            <div className="flex items-center gap-3">
                                <div className={`w-10 h-10 ${isAnalyzing ? 'bg-gray-600 animate-pulse' : flowState === 'success' ? 'bg-emerald-500' : 'bg-red-500'} text-white rounded-lg flex items-center justify-center font-black italic transition-colors`}>
                                    {isAnalyzing ? '...' : 'AI'}
                                </div>
                                <div>
                                    <h4 className="text-base font-black text-white uppercase italic tracking-tighter">
                                        {isAnalyzing ? 'Analyzing Evidence' : flowState === 'success' ? 'Refund Approved' : 'Claim Rejected'}
                                    </h4>
                                    <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest">
                                        {isAnalyzing ? 'Comparing with delivery metadata...' : flowState === 'success' ? 'Funds processed to wallet' : 'Verification Failed'}
                                    </p>
                                </div>
                            </div>

                            {flowState === 'failed' ? (
                                <div className="bg-red-500/10 border border-red-500/20 p-4 rounded-xl">
                                    <p className="text-xs text-red-200 font-bold">Analysis indicates food samples do not match reported spoilage patterns. Photos may be inconclusive.</p>
                                </div>
                            ) : (
                                <div className="space-y-4">
                                    {[{ label: 'Visual Evidence', key: 'visual' }, { label: 'Spoilage Indicators', key: 'spoilage' }, { label: 'Ingredients', key: 'ingredients' }].map((m, i) => (
                                        <div key={i} className="flex justify-between items-center border-b border-gray-800 pb-3">
                                            <span className="text-[10px] text-gray-500 font-bold uppercase tracking-widest">{m.label}:</span>
                                            <span className="text-xs font-black text-emerald-500 uppercase italic">
                                                {isAnalyzing ? <span className="animate-pulse bg-gray-800 text-transparent rounded px-2">...</span> : finalResult?.[m.key]}
                                            </span>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>
                        {!isAnalyzing && flowState === 'success' && (
                            <div className="bg-emerald-500 p-6 flex items-center justify-between gap-4 border-t border-white/10">
                                <div>
                                    <p className="text-[10px] font-bold text-emerald-900 uppercase tracking-widest mb-1">Refund Amount</p>
                                    <p className="text-3xl font-black text-white italic">{finalResult?.refundAmount}</p>
                                </div>
                                <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center text-emerald-600">
                                    <CheckCircle2 size={24} />
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            )}
        </div>
    );
};

export default EvaluateFlow;
