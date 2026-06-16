const { useState } = React;

export default function Sidebar({ isOpen, toggleSidebar, info }) {
    return (
        <aside 
            className={`bg-slate-900 border-r border-slate-800 flex flex-col justify-between transition-all duration-300 ease-in-out shrink-0
                ${isOpen ? 'w-64' : 'w-20'} 
                ${isOpen ? 'translate-x-0' : 'translate-x-0'} 
                md:relative fixed z-40 h-screen`}
        >
            {/* ATAS: Logo & Tombol Toggle */}
            <div>
                <div className="p-4 flex items-center justify-between border-b border-slate-800 h-18">
                    {isOpen ? (
                        <div className="flex items-center space-x-3 animate-fade-in">
                            <div className="w-8 h-8 bg-indigo-600 rounded-lg flex items-center justify-center font-bold text-white shadow-lg shadow-indigo-500/20">
                                LKS
                            </div>
                            <div>
                                <h2 className="text-sm font-bold text-white tracking-wide">GDT Portal</h2>
                                <span className="text-[10px] text-emerald-400 font-semibold bg-emerald-500/10 px-1.5 py-0.5 rounded">
                                    LIVE MONITOR
                                </span>
                            </div>
                        </div>
                    ) : (
                        <div className="w-8 h-8 bg-indigo-600 rounded-lg flex items-center justify-center font-bold text-white mx-auto shadow-lg shadow-indigo-500/20">
                            L
                        </div>
                    )}

                    {/* Tombol Toggle Collapse (Hanya muncul di Desktop) */}
                    <button 
                        onClick={toggleSidebar}
                        className="hidden md:block p-1.5 rounded-lg bg-slate-800 text-slate-400 hover:text-white hover:bg-slate-700 transition"
                        title={isOpen ? "Sembunyikan Sidebar" : "Tampilkan Sidebar"}
                    >
                        <svg className={`w-5 h-5 transition-transform duration-300 ${!isOpen ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 19l-7-7 7-7m8 14l-7-7 7-7" />
                        </svg>
                    </button>
                </div>

                {/* TENGAH: Menu Navigasi Indikator Status */}
                <nav className="p-3 space-y-1">
                    <div className={`flex items-center space-x-3 p-3 rounded-xl bg-slate-800/60 text-indigo-400 border border-indigo-500/20 ${!isOpen ? 'justify-center' : ''}`}>
                        <svg className="w-5 h-5 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6a2 2 0 012-2h2a2 2 0 012 2v4a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v4a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v4a2 2 0 01-2 2H6a2 2 0 01-2-2v-4zM14 16a2 2 0 012-2h2a2 2 0 012 2v4a2 2 0 01-2 2h-2a2 2 0 01-2-2v-4z" />
                        </svg>
                        {isOpen && <span className="text-sm font-medium">Dashboard</span>}
                    </div>
                </nav>
            </div>

            {/* BAWAH: Metadata Singkat / Info Jurusan */}
            <div className="p-4 border-t border-slate-800 bg-slate-950/40">
                {isOpen ? (
                    <div className="text-xs text-slate-500 space-y-1">
                        <p className="font-semibold text-slate-400 truncate">{info.nama}</p>
                        <p>© 2026 • GDTLab Client</p>
                    </div>
                ) : (
                    <div className="text-center text-xs text-slate-600 font-bold">
                        V26
                    </div>
                )}
            </div>

            {/* Tombol Toggle Khusus Layar Mobile (Pojok Kanan Bawah Layar) */}
            <button 
                onClick={toggleSidebar}
                className="md:hidden fixed bottom-6 right-6 z-50 p-4 rounded-full bg-indigo-600 text-white shadow-xl hover:bg-indigo-500 active:scale-95 transition"
            >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
                </svg>
            </button>
        </aside>
    );
}
