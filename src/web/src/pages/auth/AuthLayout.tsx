
import { Outlet, Link } from 'react-router-dom';


const AuthLayout = () => {
    return (
        <div className="min-h-screen bg-slate-50 flex flex-col md:flex-row relative overflow-hidden">
            {/* Dynamic Background Elements */}
            <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none z-0">
                <div className="absolute -top-[20%] -right-[10%] w-[70%] h-[70%] rounded-full bg-blue-100 blur-[120px] opacity-60"></div>
                <div className="absolute -bottom-[20%] -left-[10%] w-[60%] h-[60%] rounded-full bg-indigo-100 blur-[120px] opacity-60"></div>
            </div>

            {/* Left Side - Branding (Hidden on small screens) */}
            <div className="hidden md:flex md:w-1/2 bg-gradient-to-br from-blue-900 to-indigo-900 p-12 text-white flex-col justify-between relative z-10 shadow-2xl">
                <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1450101499163-c8848c66ca85?q=80&w=2070&auto=format&fit=crop')] bg-cover bg-center opacity-10 mix-blend-overlay"></div>

                <div>
                    <Link to="/" className="flex items-center gap-3 w-max">
                        <div className="bg-white/10 p-2 rounded-xl backdrop-blur-md">
                        </div>
                        <span className="text-2xl font-bold tracking-tight">InsuranceLight</span>
                    </Link>
                </div>

                <div className="max-w-md relative z-10">
                    <h1 className="text-4xl md:text-5xl font-extrabold mb-6 leading-tight">
                        Manage Policies with <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-300 to-indigo-300">Absolute Clarity</span>.
                    </h1>
                    <p className="text-blue-100 text-lg opacity-90 leading-relaxed">
                        The Multi-tenant platform designed for brokers, companies, and clients to stay ahead of expirations and track coverage seamlessly.
                    </p>
                </div>

                <div className="flex items-center gap-4 text-sm font-medium text-blue-200 opacity-80 z-10">
                    <span>&copy; {new Date().getFullYear()} InsuranceLight Inc.</span>
                    <span>•</span>
                    <Link to="/terms" className="hover:text-white transition-colors">Terms of Service</Link>
                </div>
            </div>

            {/* Right Side - Auth Forms */}
            <div className="flex-1 flex flex-col justify-center items-center p-6 md:p-12 relative z-10">
                {/* Mobile Logo */}
                <Link to="/" className="md:hidden flex items-center gap-3 mb-8">
                    <div className="bg-blue-900 p-2 rounded-xl shadow-lg shadow-blue-900/10">
                    </div>
                    <span className="text-2xl font-extrabold text-slate-900 tracking-tight">InsuranceLight</span>
                </Link>

                <div className="w-full max-w-md">
                    <div className="bg-white/80 backdrop-blur-xl p-8 rounded-3xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] ring-1 ring-slate-100 relative">
                        {/* The individual auth pages will inject here via Outlet */}
                        <Outlet />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AuthLayout;
