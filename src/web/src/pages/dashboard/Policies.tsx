import { useState, useEffect } from 'react';
import { extractTextFromPdf } from '../../utils/pdfExtractor';
import { analyzePolicyText } from '../../services/geminiService';
import { Link } from 'react-router-dom';

interface Policy {
    id: string;
    company: string;
    client: string;
    price: string;
    startDate: string;
    endDate: string;
    status: string;
}

const Policies = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isScanning, setIsScanning] = useState(false);
    const [scanError, setScanError] = useState<string | null>(null);
    const [policies, setPolicies] = useState<Policy[]>(() => {
        const saved = localStorage.getItem('policies');
        return saved ? JSON.parse(saved) : [];
    });

    const hasApiKey = !!localStorage.getItem('gemini_api_key');

    const [formData, setFormData] = useState<Policy>({
        id: '',
        company: '',
        client: '',
        price: '',
        startDate: '',
        endDate: '',
        status: 'Active'
    });

    useEffect(() => {
        localStorage.setItem('policies', JSON.stringify(policies));
    }, [policies]);

    const handleAddPolicy = (e: React.FormEvent) => {
        e.preventDefault();
        setPolicies([...policies, formData]);
        setIsModalOpen(false);
        resetForm();
    };

    const resetForm = () => {
        setFormData({
            id: '',
            company: '',
            client: '',
            price: '',
            startDate: '',
            endDate: '',
            status: 'Active'
        });
        setScanError(null);
    };

    const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;

        if (!hasApiKey) {
            setScanError('No API Key found. Running in Demo Mode (Simulated).');
            setIsScanning(true);
            setTimeout(() => {
                setFormData({
                    id: 'DEMO-' + Math.floor(1000 + Math.random() * 9000),
                    company: 'Demo Insurance Co.',
                    client: 'Demo Client',
                    price: '$1,000.00',
                    startDate: '2024-01-01',
                    endDate: '2025-01-01',
                    status: 'Active'
                });
                setIsScanning(false);
            }, 2000);
            return;
        }

        setIsScanning(true);
        setScanError(null);

        try {
            const text = await extractTextFromPdf(file);
            const extractedData = await analyzePolicyText(text);
            setFormData(extractedData);
        } catch (error: any) {
            setScanError(error.message || 'Error scanning policy. Please try again.');
        } finally {
            setIsScanning(false);
        }
    };

    const filteredPolicies = policies.filter(p =>
        p.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
        p.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
        p.client.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="animate-in fade-in duration-500 relative min-h-full">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
                <div>
                    <h2 className="text-2xl font-bold text-slate-900">Policies</h2>
                    <p className="text-slate-500 mt-1">Manage all insurance policies in one place.</p>
                </div>
                <button
                    onClick={() => setIsModalOpen(true)}
                    className="bg-blue-900 hover:bg-black text-white font-bold py-2.5 px-6 rounded-xl shadow-lg shadow-blue-200 transition-all active:scale-95"
                >
                    Add Policy
                </button>
            </div>

            {/* Filters & Search */}
            <div className="bg-white p-4 rounded-2xl border border-slate-100 shadow-sm mb-6 flex flex-col md:flex-row gap-4">
                <div className="flex-1 relative">
                    <input
                        type="text"
                        placeholder="Search by ID, Company or Client..."
                        className="w-full px-4 py-2.5 bg-slate-50 border-slate-200 focus:bg-white focus:border-blue-900 focus:ring-2 focus:ring-blue-100 rounded-xl text-sm transition-all"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </div>
                <select className="bg-slate-50 border-slate-200 rounded-xl text-sm px-4 py-2.5 outline-none focus:ring-2 focus:ring-blue-100 transition-all">
                    <option>All Status</option>
                    <option>Active</option>
                    <option>Expiring</option>
                    <option>Expired</option>
                </select>
            </div>

            {/* Policies Table */}
            <div className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                        <thead>
                            <tr className="bg-slate-50 border-b border-slate-100">
                                <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Policy ID</th>
                                <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Company</th>
                                <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Client</th>
                                <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Price</th>
                                <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Dates</th>
                                <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Status</th>
                                <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-50">
                            {filteredPolicies.length > 0 ? filteredPolicies.map((policy, index) => (
                                <tr key={index} className="hover:bg-slate-50/50 transition-colors group">
                                    <td className="px-6 py-4">
                                        <span className="text-sm font-bold text-slate-900 group-hover:text-blue-900 transition-colors">{policy.id}</span>
                                    </td>
                                    <td className="px-6 py-4">
                                        <span className="text-sm font-medium text-slate-600">{policy.company}</span>
                                    </td>
                                    <td className="px-6 py-4">
                                        <span className="text-sm font-medium text-slate-900">{policy.client}</span>
                                    </td>
                                    <td className="px-6 py-4">
                                        <span className="text-sm font-bold text-slate-900">{policy.price}</span>
                                    </td>
                                    <td className="px-6 py-4">
                                        <div className="flex flex-col">
                                            <span className="text-xs font-medium text-slate-500">Starts: {policy.startDate}</span>
                                            <span className="text-xs font-bold text-slate-700">Ends: {policy.endDate}</span>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4">
                                        <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-bold bg-blue-50 text-blue-900 border border-blue-100">
                                            {policy.status}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4">
                                        <button className="text-sm font-bold text-blue-900 hover:text-black transition-colors">Details</button>
                                    </td>
                                </tr>
                            )) : (
                                <tr>
                                    <td colSpan={7} className="px-6 py-12 text-center text-slate-400 font-medium font-bold">
                                        No policies found. Start by adding your first policy!
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* Modal Overlay */}
            {isModalOpen && (
                <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm z-50 flex items-center justify-center p-4">
                    <div className="bg-white rounded-3xl shadow-2xl w-full max-w-lg overflow-hidden animate-in zoom-in duration-200">
                        <div className="p-8">
                            <div className="flex items-center justify-between mb-6">
                                <h3 className="text-2xl font-bold text-slate-900">Add New Policy</h3>
                                <button onClick={() => setIsModalOpen(false)} className="text-slate-400 hover:text-slate-600 font-bold text-xl">&times;</button>
                            </div>

                            {/* Scan Zone */}
                            <div className={`mb-8 p-6 bg-slate-50 border-2 border-dashed rounded-2xl text-center group transition-all relative overflow-hidden ${scanError ? 'border-rose-300' : 'border-slate-200 hover:border-blue-900 cursor-pointer'}`}>
                                {isScanning ? (
                                    <div className="py-4">
                                        <div className="w-12 h-12 border-4 border-blue-900/20 border-t-blue-900 rounded-full animate-spin mx-auto mb-3"></div>
                                        <p className="text-blue-900 font-bold">AI Scanner analyzing PDF...</p>
                                        <p className="text-slate-500 text-xs mt-1 italic">Extracting policy details...</p>
                                    </div>
                                ) : (
                                    <label className="cursor-pointer">
                                        <input type="file" className="hidden" accept=".pdf" onChange={handleFileUpload} />
                                        <div className="py-2">
                                            <div className="w-12 h-12 bg-white rounded-xl shadow-sm border border-slate-100 flex items-center justify-center mx-auto mb-3 group-hover:scale-110 transition-transform">
                                                <svg className="w-6 h-6 text-blue-900" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" />
                                                </svg>
                                            </div>
                                            <p className="text-sm font-bold text-slate-900 mb-1">Upload Policy PDF</p>
                                            <p className="text-xs text-slate-500">Drag & drop or <span className="text-blue-900 font-bold">browse</span></p>
                                        </div>
                                    </label>
                                )}

                                {scanError && (
                                    <div className={`mt-4 p-3 rounded-xl border ${!hasApiKey ? 'bg-blue-50 border-blue-100' : 'bg-rose-50 border-rose-100'}`}>
                                        <p className={`text-xs font-bold ${!hasApiKey ? 'text-blue-900' : 'text-rose-600'}`}>{scanError}</p>
                                        {!hasApiKey && (
                                            <div className="flex gap-2 mt-1">
                                                <Link to="/dashboard/settings" className="text-[10px] text-blue-700 underline font-bold">Settings</Link>
                                                <span className="text-[10px] text-slate-400">•</span>
                                                <a href="https://aistudio.google.com/app/apikey" target="_blank" rel="noopener noreferrer" className="text-[10px] text-blue-700 underline font-bold">Get Free Key</a>
                                            </div>
                                        )}
                                    </div>
                                )}
                            </div>

                            <form onSubmit={handleAddPolicy} className="space-y-4">
                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-sm font-bold text-slate-700 mb-1">Policy ID</label>
                                        <input
                                            type="text"
                                            required
                                            className="w-full px-4 py-2 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-900/20 focus:border-blue-900 outline-none transition-all"
                                            value={formData.id}
                                            onChange={(e) => setFormData({ ...formData, id: e.target.value })}
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-bold text-slate-700 mb-1">Company</label>
                                        <input
                                            type="text"
                                            required
                                            className="w-full px-4 py-2 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-900/20 focus:border-blue-900 outline-none transition-all"
                                            value={formData.company}
                                            onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                                        />
                                    </div>
                                </div>
                                <div>
                                    <label className="block text-sm font-bold text-slate-700 mb-1">Client Name</label>
                                    <input
                                        type="text"
                                        required
                                        className="w-full px-4 py-2 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-900/20 focus:border-blue-900 outline-none transition-all"
                                        value={formData.client}
                                        onChange={(e) => setFormData({ ...formData, client: e.target.value })}
                                    />
                                </div>
                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-sm font-bold text-slate-700 mb-1">Price</label>
                                        <input
                                            type="text"
                                            required
                                            className="w-full px-4 py-2 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-900/20 focus:border-blue-900 outline-none transition-all"
                                            value={formData.price}
                                            onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-bold text-slate-700 mb-1">Status</label>
                                        <input
                                            type="text"
                                            required
                                            className="w-full px-4 py-2 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-900/20 focus:border-blue-900 outline-none transition-all"
                                            value={formData.status}
                                            onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                                        />
                                    </div>
                                </div>
                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-sm font-bold text-slate-700 mb-1">Start Date</label>
                                        <input
                                            type="text"
                                            required
                                            placeholder="YYYY-MM-DD"
                                            className="w-full px-4 py-2 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-900/20 focus:border-blue-900 outline-none transition-all"
                                            value={formData.startDate}
                                            onChange={(e) => setFormData({ ...formData, startDate: e.target.value })}
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-bold text-slate-700 mb-1">End Date</label>
                                        <input
                                            type="text"
                                            required
                                            placeholder="YYYY-MM-DD"
                                            className="w-full px-4 py-2 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-900/20 focus:border-blue-900 outline-none transition-all"
                                            value={formData.endDate}
                                            onChange={(e) => setFormData({ ...formData, endDate: e.target.value })}
                                        />
                                    </div>
                                </div>
                                <div className="flex gap-4 mt-8">
                                    <button
                                        type="button"
                                        onClick={() => setIsModalOpen(false)}
                                        className="flex-1 px-6 py-3 border border-slate-200 text-slate-700 font-bold rounded-xl hover:bg-slate-50 transition-colors"
                                    >
                                        Cancel
                                    </button>
                                    <button
                                        type="submit"
                                        className="flex-1 px-6 py-3 bg-blue-900 text-white font-bold rounded-xl hover:bg-black shadow-lg shadow-blue-200 transition-all active:scale-95"
                                    >
                                        Save Policy
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Policies;
