import { store } from './store/store.js';
import Sidebar from './components/Sidebar.js';
import BentoGrid from './components/BentoGrid.js';
import AdminModal from './components/AdminModal.js';

const { useState, useEffect } = React;

function App() {
    const [db, setDb] = useState(null);
    const [sidebarOpen, setSidebarOpen] = useState(true);
    const [isAdminOpen, setIsAdminOpen] = useState(false);
    const [inputBuffer, setInputBuffer] = useState('');

    // 1. Fetch Data Pertama Kali & Setup Deteksi Keyword Admin
    useEffect(() => {
        // Ambil data dari LocalStorage Store
        store.fetchData().then(data => {
            setDb(data);
            if (data.settings) setSidebarOpen(data.settings.sidebarOpen);
        });

        // Deteksi Ketikan Rahasia 'admin123'
        const handleKeyDown = (e) => {
            // Hanya rekam karakter alfanumerik biasa
            if (e.key.length === 1) {
                setInputBuffer(prev => {
                    const currentStr = (prev + e.key).slice(-8); // Ambil 8 karakter terakhir
                    if (currentStr.includes('admin123')) {
                        setIsAdminOpen(true);
                        return ''; // Reset buffer setelah trigger sukses
                    }
                    return currentStr;
                });
            }
        };

        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [inputBuffer]);

    // 2. Handler untuk Simpan Perubahan dari Admin Panel
    const handleUpdateDb = async (updatedData) => {
        setDb(updatedData);
        await store.saveData(updatedData);
    };

    // 3. Toggle Sidebar Efisien
    const toggleSidebar = () => {
        const nextState = !sidebarOpen;
        setSidebarOpen(nextState);
        if (db) {
            const updated = { ...db, settings: { ...db.settings, sidebarOpen: nextState } };
            setDb(updated);
            store.saveData(updated);
        }
    };

    // Tampilkan Loading State jika data store belum siap (Mencegah White Screen)
    if (!db) {
        return (
            <div class="flex items-center justify-center min-h-screen bg-slate-950">
                <div class="text-center">
                    <div class="w-12 h-12 border-4 border-indigo-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
                    <p class="text-slate-400 font-medium animate-pulse">Memuat Database Portal LKS...</p>
                </div>
            </div>
        );
    }

    return (
        <div class="flex min-h-screen bg-slate-950 text-slate-100 font-sans">
            {/* COMPONENT 1: SIDEBAR (Modular) */}
            <Sidebar 
                isOpen={sidebarOpen} 
                toggleSidebar={toggleSidebar} 
                info={db.kompetisi} 
            />

            {/* MAIN CONTENT AREA */}
            <main class="flex-1 min-w-0 transition-all duration-300 ease-in-out p-6 lg:p-8">
                <header class="flex items-center justify-between mb-8 pb-4 border-b border-slate-800">
                    <div>
                        <span class="text-xs font-semibold tracking-widest text-indigo-400 uppercase">Dashboard Utama</span>
                        <h1 class="text-2xl lg:text-3xl font-bold text-white tracking-tight mt-1">{db.kompetisi.bidang}</h1>
                    </div>
                    <div class="text-right hidden sm:block">
                        <p class="text-sm text-slate-400">{db.kompetisi.nama}</p>
                        <p class="text-xs font-semibold text-slate-500 mt-0.5">Tahun {db.kompetisi.tahun}</p>
                    </div>
                </header>

                {/* COMPONENT 2: BENTO GRID DASHBOARD (Modular) */}
                <BentoGrid jadwal={db.jadwal} peserta={db.peserta} />
            </main>

            {/* COMPONENT 3: CMS MODAL TERSEMBUNYI (Modular) */}
            {isAdminOpen && (
                <AdminModal 
                    data={db} 
                    onClose={() => setIsAdminOpen(false)} 
                    onSave={handleUpdateDb} 
                />
            )}
        </div>
    );
}

// Render Aplikasi ke DOM
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);
