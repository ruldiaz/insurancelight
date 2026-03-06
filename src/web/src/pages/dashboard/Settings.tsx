import { useState, useEffect } from 'react';
import { verifyApiKey } from '../../services/geminiService';

const Settings = () => {
    const [apiKey, setApiKey] = useState('');
    const [isSaved, setIsSaved] = useState(false);
    const [isVerifying, setIsVerifying] = useState(false);
    const [verificationStatus, setVerificationStatus] = useState<'none' | 'success' | 'failed'>('none');

    useEffect(() => {
        const savedKey = localStorage.getItem('gemini_api_key');
        if (savedKey) {
            setApiKey(savedKey);
        }
    }, []);

    const handleSave = (e: React.FormEvent) => {
        e.preventDefault();
        const trimmedKey = apiKey.trim();
        localStorage.setItem('gemini_api_key', trimmedKey);
        setApiKey(trimmedKey);
        setIsSaved(true);
        setTimeout(() => setIsSaved(false), 3000);
    };

    const handleVerify = async () => {
        if (!apiKey.trim()) return;
        setIsVerifying(true);
        setVerificationStatus('none');

        const isValid = await verifyApiKey(apiKey.trim());

        setIsVerifying(false);
        setVerificationStatus(isValid ? 'success' : 'failed');
    };

    return (
        <div className="animate-in fade-in duration-500 max-w-2xl">
            <div className="mb-8">
                <h2 className="text-2xl font-bold text-slate-900">Settings</h2>
                <p className="text-slate-500 mt-1">Configure your AI preferences and platform integration.</p>
            </div>

            <div className="space-y-6">
                <div className="bg-white p-8 rounded-3xl border border-slate-100 shadow-sm relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-32 h-32 bg-blue-50 rounded-full -mt-16 -mr-16 opacity-40"></div>

                    <div className="relative">
                        <h3 className="text-lg font-bold text-slate-900 mb-2 flex items-center gap-2">
                            <span className="w-2 h-2 rounded-full bg-blue-900"></span>
                            AI Scanner Integration
                        </h3>
                        <p className="text-sm text-slate-500 mb-6 leading-relaxed">
                            To use the PDF scanning feature, you need a Gemini API Key.
                            Your key is stored <b>locally</b> in your browser and is never sent to our servers.
                        </p>

                        <div className="space-y-4">
                            <div>
                                <label className="block text-sm font-bold text-slate-700 mb-2">Gemini API Key</label>
                                <div className="flex gap-3 mb-3">
                                    <input
                                        type="password"
                                        placeholder="Enter your key here..."
                                        className={`flex-1 px-4 py-3 bg-slate-50 border rounded-xl focus:ring-2 outline-none transition-all font-mono text-sm ${verificationStatus === 'success' ? 'border-emerald-200 focus:ring-emerald-900/20 focus:border-emerald-500' :
                                                verificationStatus === 'failed' ? 'border-rose-200 focus:ring-rose-900/20 focus:border-rose-500' :
                                                    'border-slate-200 focus:ring-blue-900/20 focus:border-blue-900'
                                            }`}
                                        value={apiKey}
                                        onChange={(e) => {
                                            setApiKey(e.target.value);
                                            setVerificationStatus('none');
                                        }}
                                    />
                                    <button
                                        onClick={handleSave}
                                        className={`px-8 py-3 rounded-xl font-bold text-white transition-all active:scale-95 shadow-lg shadow-blue-200 ${isSaved ? 'bg-emerald-600 shadow-emerald-100' : 'bg-blue-900 hover:bg-black'}`}
                                    >
                                        {isSaved ? 'Saved!' : 'Save Key'}
                                    </button>
                                </div>

                                <div className="flex items-center justify-between">
                                    <button
                                        onClick={handleVerify}
                                        disabled={isVerifying || !apiKey.trim()}
                                        className="text-xs font-bold text-blue-900 hover:underline disabled:opacity-50 flex items-center gap-2"
                                    >
                                        {isVerifying ? (
                                            <>
                                                <div className="w-3 h-3 border-2 border-blue-900/20 border-t-blue-900 rounded-full animate-spin"></div>
                                                Verifying...
                                            </>
                                        ) : 'Verify Connection'}
                                    </button>

                                    {verificationStatus === 'success' && (
                                        <span className="text-xs font-bold text-emerald-600 flex items-center gap-1">
                                            ✓ Connection successful
                                        </span>
                                    )}
                                    {verificationStatus === 'failed' && (
                                        <span className="text-xs font-bold text-rose-600 flex items-center gap-1">
                                            ✕ Invalid API Key
                                        </span>
                                    )}
                                </div>

                                <p className="mt-6 text-xs text-slate-400">
                                    Don't have a key? Get one for free at <a href="https://aistudio.google.com/" target="_blank" rel="noopener noreferrer" className="text-blue-900 font-bold hover:underline">Google AI Studio</a>.
                                    <br />Make sure the key starts with <b>AIza...</b>
                                </p>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="bg-slate-900 rounded-3xl p-8 text-white relative overflow-hidden">
                    <div className="absolute bottom-0 right-0 w-48 h-48 bg-blue-500/10 rounded-full blur-3xl -mb-24 -mr-24"></div>
                    <h3 className="text-lg font-bold mb-2">Privacy Information</h3>
                    <p className="text-sm text-blue-100/70 leading-relaxed max-w-md">
                        This application runs entirely on your device. All policies and configuration
                        data reside in your browser's local storage. No data is collected or transmitted
                        beyond calls to the Gemini API for document analysis.
                    </p>
                </div>
            </div>
        </div>
    );
};

export default Settings;
