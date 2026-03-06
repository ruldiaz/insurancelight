import { useState } from 'react';
import { Link } from 'react-router-dom';
import { } from '../../components/ui/icons';

const Register = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        console.log('Register attempt', { name, email, password });
    };

    return (
        <div className="opacity-0 animate-[fadeIn_0.5s_ease-out_forwards]">
            <div className="text-center mb-8">
                <h2 className="text-3xl font-extrabold text-slate-900 tracking-tight">Create an account</h2>
                <p className="text-slate-500 mt-2 font-medium">Get started with InsuranceLight today</p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-5">
                <div>
                    <label className="block text-sm font-semibold text-slate-700 mb-1.5" htmlFor="name">
                        Full Name
                    </label>
                    <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                        </div>
                        <input
                            id="name"
                            type="text"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            className="block w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 placeholder:text-slate-400 focus:ring-2 focus:ring-blue-900/20 focus:border-blue-900 transition-all font-medium"
                            placeholder="John Doe"
                            required
                        />
                    </div>
                </div>

                <div>
                    <label className="block text-sm font-semibold text-slate-700 mb-1.5" htmlFor="email">
                        Email Address
                    </label>
                    <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                        </div>
                        <input
                            id="email"
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="block w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 placeholder:text-slate-400 focus:ring-2 focus:ring-blue-900/20 focus:border-blue-900 transition-all font-medium"
                            placeholder="name@example.com"
                            required
                        />
                    </div>
                </div>

                <div>
                    <label className="block text-sm font-semibold text-slate-700 mb-1.5" htmlFor="password">
                        Password
                    </label>
                    <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                        </div>
                        <input
                            id="password"
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="block w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 placeholder:text-slate-400 focus:ring-2 focus:ring-blue-900/20 focus:border-blue-900 transition-all font-medium"
                            placeholder="••••••••"
                            required
                            minLength={8}
                        />
                    </div>
                    <p className="mt-2 text-xs text-slate-500 font-medium">Must be at least 8 characters long.</p>
                </div>

                <button
                    type="submit"
                    className="w-full flex justify-center items-center gap-2 py-3 px-4 border border-transparent rounded-xl shadow-md text-sm font-bold text-white bg-blue-900 hover:bg-black focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-900 transition-all active:scale-[0.98]"
                >
                    Create account
                </button>
            </form>

            <p className="mt-8 text-center text-sm text-slate-600 font-medium">
                Already have an account?{' '}
                <Link to="/auth/login" className="font-bold text-blue-900 hover:text-black transition-colors">
                    Sign in
                </Link>
            </p>
        </div>
    );
};

export default Register;
