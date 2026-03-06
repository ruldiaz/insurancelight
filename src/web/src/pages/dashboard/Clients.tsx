interface Client {
    id: string;
    name: string;
    email: string;
    phone: string;
    policiesCount: number;
    lastActive: string;
}

const Clients = () => {
    const clients: Client[] = []; // Mock data removed

    return (
        <div className="animate-in fade-in duration-500">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
                <div>
                    <h2 className="text-2xl font-bold text-slate-900">Clients</h2>
                    <p className="text-slate-500 mt-1">Manage your insurance network and final users.</p>
                </div>
                <button className="bg-blue-900 hover:bg-black text-white font-bold py-2.5 px-6 rounded-xl shadow-lg shadow-blue-200 transition-all active:scale-95">
                    Add Client
                </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {clients.length > 0 ? clients.map((client) => (
                    <div key={client.id} className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm hover:shadow-md transition-shadow relative overflow-hidden group">
                        <div className="absolute top-0 right-0 w-24 h-24 bg-blue-50 rounded-full -mt-10 -mr-10 opacity-40 group-hover:scale-110 transition-transform"></div>
                        <div className="relative">
                            <div className="w-12 h-12 rounded-xl bg-blue-100 flex items-center justify-center text-blue-700 font-bold text-xl mb-4">
                                {client.name.charAt(0)}
                            </div>
                            <h3 className="text-lg font-bold text-slate-900 mb-1">{client.name}</h3>
                            <p className="text-sm text-slate-500 mb-4">{client.email}</p>

                            <div className="space-y-2 mb-6 text-sm">
                                <div className="flex justify-between">
                                    <span className="text-slate-500">Phone:</span>
                                    <span className="font-semibold text-slate-900">{client.phone}</span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="text-slate-500">Active Policies:</span>
                                    <span className="font-semibold text-slate-900">{client.policiesCount}</span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="text-slate-500">Last seen:</span>
                                    <span className="font-semibold text-slate-600 italic text-xs">{client.lastActive}</span>
                                </div>
                            </div>

                            <button className="w-full py-2.5 rounded-xl border border-slate-200 text-sm font-bold text-slate-700 hover:bg-slate-50 transition-colors">
                                View Profile
                            </button>
                        </div>
                    </div>
                )) : (
                    <div className="col-span-full py-20 text-center bg-white rounded-3xl border border-dashed border-slate-200">
                        <p className="text-slate-400 font-bold text-lg">Your client list is empty</p>
                        <p className="text-slate-400 text-sm mt-1">Add clients to start managing their policies.</p>
                    </div>
                )}
            </div>
        </div>
    );
}

export default Clients;
