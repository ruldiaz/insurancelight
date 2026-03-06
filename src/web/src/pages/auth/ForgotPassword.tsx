import { useState } from 'react';
import { Link } from 'react-router-dom';
import { } from '../../components/ui/icons';

const ForgotPassword = () => {
    const [email, setEmail] = useState('');
    const [isSubmitted, setIsSubmitted] = useState(false);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        console.log('Password reset requested for', email);
        setIsSubmitted(true);
    };

    if (isSubmitted) {
        return (
            <div className="opacity-0 animate-[fadeIn_0.5s_ease-out_forwards] text-center">
                <div className="w-16 h-16 bg-blue-50 text-blue-900 border border-blue-100 rounded-full flex items-center justify-center mx-auto mb-6 font-bold text-2xl">
                    !
                </div>
                <h2 className="text-3xl font-extrabold text-slate-900 tracking-tight">Check your email</h2>
                <p className="text-slate-500 mt-3 mb-8 font-medium leading-relaxed">
                    We sent a password reset link to <br />
                    <span className="text-slate-900 font-bold">{email}</span>
                </p>
                <Link
                    to="/auth/login"
                    className="w-full flex justify-center items-center py-3 px-4 border border-slate-200 rounded-xl shadow-sm text-sm font-bold text-slate-700 bg-white hover:bg-slate-50 transition-all"
                >
                    Return to sign in
                </Link>
            </div>
        );
    }

    return (
        <div className="opacity-0 animate-[fadeIn_0.5s_ease-out_forwards]">
            <div className="mb-8">
                <Link to="/auth/login" className="inline-flex items-center text-sm font-bold text-slate-500 hover:text-slate-900 transition-colors mb-6">
                    Back to login
                </Link>
                <h2 className="text-3xl font-extrabold text-slate-900 tracking-tight">Reset password</h2>
                <p className="text-slate-500 mt-2 font-medium">Enter your email and we'll send you a reset link.</p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
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

                <button
                    type="submit"
                    className="w-full flex justify-center items-center py-3 px-4 border border-transparent rounded-xl shadow-md text-sm font-bold text-white bg-blue-900 hover:bg-black focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-900 transition-all active:scale-[0.98]"
                >
                    Send reset link
                </button>
            </form>
        </div>
    );
};

export default ForgotPassword;
