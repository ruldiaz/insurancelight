import { Link, Outlet, useLocation, useNavigate } from 'react-router-dom';
import { useAuthStore } from '../../store/useAuthStore';
import { useState } from 'react';

const DashboardLayout = () => {
    const { user, logout } = useAuthStore();
    const navigate = useNavigate();
    const location = useLocation();
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);

    const handleLogout = () => {
        logout();
        navigate('/auth/login');
    };

    const navLinks = [
        { name: 'Dashboard', path: '/dashboard' },
        { name: 'Policies', path: '/dashboard/policies' },
        { name: 'Clients', path: '/dashboard/clients' },
        { name: 'Settings', path: '/dashboard/settings' },
    ];

    return (
        <div className="min-h-screen bg-slate-50 flex">
            {/* Mobile Sidebar Overlay */}
            {isSidebarOpen && (
                <div
                    className="fixed inset-0 bg-slate-900/50 z-20 md:hidden backdrop-blur-sm"
                    onClick={() => setIsSidebarOpen(false)}
                />
            )}

            {/* Sidebar */}
            <aside className={`
        fixed md:sticky top-0 left-0 z-30 h-screen w-64 bg-white border-r border-slate-200 shadow-sm flex flex-col transition-transform duration-300 ease-in-out
        ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'}
      `}>
                <div className="h-16 flex items-center px-6 border-b border-slate-100">
                    <Link to="/dashboard" className="flex items-center gap-3">
                        <span className="text-xl font-extrabold text-slate-900 tracking-tight">InsuranceLight</span>
                    </Link>
                </div>

                <div className="flex-1 overflow-y-auto py-6 px-4 flex flex-col gap-2">
                    {navLinks.map((link) => {
                        const isActive = location.pathname === link.path;
                        return (
                            <Link
                                key={link.path}
                                to={link.path}
                                onClick={() => setIsSidebarOpen(false)}
                                className={`
                  flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-semibold transition-all
                  ${isActive
                                        ? 'bg-blue-900 text-white shadow-md shadow-blue-200'
                                        : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'}
                `}
                            >
                                {link.name}
                            </Link>
                        );
                    })}
                </div>

                <div className="p-4 border-t border-slate-100">
                    <div className="flex items-center justify-between px-4 py-3 bg-slate-50 rounded-xl mb-2">
                        <div>
                            <p className="text-sm font-bold text-slate-900">{user?.name}</p>
                            <p className="text-xs font-medium text-slate-500 capitalize">{user?.role.replace('_', ' ').toLowerCase()}</p>
                        </div>
                    </div>
                    <button
                        onClick={handleLogout}
                        className="w-full flex items-center justify-center gap-2 px-4 py-2.5 text-sm font-semibold text-rose-600 hover:bg-rose-50 rounded-xl transition-colors"
                    >
                        Sign out
                    </button>
                </div>
            </aside>

            {/* Main Content Area */}
            <main className="flex-1 flex flex-col min-w-0 overflow-hidden">
                {/* Top Header */}
                <header className="h-16 bg-white/80 backdrop-blur-md border-b border-slate-200 flex items-center justify-between px-4 md:px-8 z-10 sticky top-0">
                    <div className="flex items-center gap-4">
                        <button
                            className="md:hidden p-2 text-slate-500 hover:bg-slate-100 rounded-lg text-sm font-bold"
                            onClick={() => setIsSidebarOpen(true)}
                        >
                            Menu
                        </button>
                        <h1 className="text-xl font-bold text-slate-800 hidden sm:block">
                            {navLinks.find(l => l.path === location.pathname)?.name || 'Dashboard'}
                        </h1>
                    </div>

                    <div className="flex items-center gap-4">
                        <div className="relative hidden md:block">
                            <input
                                type="text"
                                placeholder="Search policies..."
                                className="px-4 py-2 bg-slate-100 border-transparent focus:bg-white focus:border-blue-900 focus:ring-2 focus:ring-blue-100 rounded-full text-sm w-64 transition-all"
                            />
                        </div>
                        <button className="relative p-2 text-sm font-bold text-slate-500 hover:bg-slate-100 rounded-full transition-colors">
                            Alerts
                            <span className="absolute top-0 right-0 w-2 h-2 bg-rose-500 rounded-full border-2 border-white"></span>
                        </button>
                        {/* User Avatar */}
                        <div className="w-9 h-9 rounded-full bg-gradient-to-tr from-blue-900 to-indigo-900 flex items-center justify-center text-white font-bold text-sm shadow-sm ring-2 ring-white">
                            {user?.name.charAt(0)}
                        </div>
                    </div>
                </header>

                {/* Page Content */}
                <div className="flex-1 overflow-y-auto p-4 md:p-8 bg-slate-50">
                    <Outlet />
                </div>
            </main>
        </div>
    );
};

export default DashboardLayout;
