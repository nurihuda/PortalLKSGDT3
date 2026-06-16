const { useState } = React;

export default function AdminModal({ data, onClose, onSave }) {
    const [localJadwal, setLocalJadwal] = useState([...data.jadwal]);
    const [localPeserta, setLocalPeserta] = useState([...data.peserta]);

    // Handler merubah status modul (Belum / Berjalan / Selesai)
    const handleStatusChange = (id, statusBaru) => {
        const updated = localJadwal.map(item => {
            // Aturan logis: Jika satu modul diset "Berjalan", modul lain otomatis diset "Selesai" atau "Belum"
            if (statusBaru === "Berjalan" && item.id !== id && item.status === "Berjalan") {
                return { ...item, status: "Selesai" };
            }
            return item.id === id ? { ...item, status: statusBaru } : item;
        });
        setLocalJadwal(updated);
    };

    // Handler merubah status kehadiran peserta (Hadir / Izin)
    const handleAbsensiChange = (id, statusAbsensi) => {
        const updated = localPeserta.map(p => 
            p.id === id ? { ...p, status: statusAbsensi } : p
        );
        setLocalPeserta(updated);
    };

    // Eksekusi penyimpanan ke Core State -> LocalStorage
    const handleSimpanData = () => {
        const updatedDb = {
            ...data,
            jadwal: localJadwal,
            peserta: localPeserta
        };
        onSave(updatedDb);
        onClose(); // Tutup modal setelah sukses
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm animate-fade-in">
            {/* KOTAK MODAL UTAMA */}
            <div className="bg-slate-900 border border-slate-800 rounded-2xl w-full max-w-4xl max-h-[85vh] flex flex-col shadow-2xl">
                
                {/* HEADER PANEL */}
                <div className="p-5 border-b border-slate-800 flex items-center justify-between">
                    <div>
                        <div className="flex items-center space-x-2">
                            <span className="h-2 w-2 rounded-full bg-rose-500 animate-pulse"></span>
                            <h2 className="text-lg font-bold text-white tracking-tight">Admin CMS Panel (LKS Control)</h2>
                        </div>
                        <p className="text-xs text-slate-400 mt-0.5">Semua perubahan akan langsung disimpan secara lokal.</p>
                    </div>
                    <button 
                        onClick={onClose}
                        className="text-slate-400 hover:text-white bg-slate-800 hover:bg-slate-700 px-3 py-1.5 rounded-lg text-xs font-semibold transition"
                    >
                        Keluar (Esc)
                    </button>
                </div>

                {/* AREA KONTEN EDITABLE (Scrollable) */}
                <div className="p-6 overflow-y-auto space-y-6">
                    
                    {/* SEKSI 1: EDIT STATUS JADWAL MODUL */}
                    <div>
                        <h3 className="text-sm font-bold text-indigo-400 uppercase tracking-wider mb-3">Kontrol Modul Kompetisi</h3>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                            {localJadwal.map((j) => (
                                <div key={j.id} className="p-3 bg-slate-950 rounded-xl border border-slate-800/60 flex flex-col justify-between space-y-3">
                                    <div className="min-w-0">
                                        <p className="text-xs font-semibold text-slate-500">{j.hari} • {j.waktuMulai} - {j.waktuSelesai}</p>
                                        <p className="text-sm font-bold text-slate-200 truncate mt-0.5">{j.modul}</p>
                                    </div>
                                    <div className="grid grid-cols-3 gap-1.5">
                                        {['Belum', 'Berjalan', 'Selesai'].map((statusOption) => (
                                            <button
                                                key={statusOption}
                                                onClick={() => handleStatusChange(j.id, statusOption)}
                                                className={`text-[11px] font-bold py-1.5 rounded-lg border transition ${
                                                    j.status === statusOption 
                                                    ? 'bg-indigo-600 border-indigo-500 text-white shadow-md shadow-indigo-600/10' 
                                                    : 'bg-slate-900 border-slate-800 text-slate-400 hover:text-slate-200 hover:bg-slate-800'
                                                }`}
                                            >
                                                {statusOption}
                                            </button>
                                        ))}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* SEKSI 2: EDIT ABSENSI PESERTA */}
                    <div>
                        <h3 className="text-sm font-bold text-emerald-400 uppercase tracking-wider mb-3">Manajemen Presensi Peserta</h3>
                        <div className="bg-slate-950 rounded-xl border border-slate-800/60 overflow-hidden">
                            <div className="divide-y divide-slate-800/40">
                                {localPeserta.map((p) => (
                                    <div key={p.id} className="p-3 sm:px-4 flex items-center justify-between text-xs hover:bg-slate-900/40 transition">
                                        <div className="min-w-0 pr-2">
                                            <p className="font-bold text-slate-200 truncate">{p.nama}</p>
                                            <p className="text-slate-500 text-[10px] truncate">{p.asalSekolah}</p>
                                        </div>
                                        <div className="flex items-center space-x-1 shrink-0">
                                            {['Hadir', 'Izin'].map((statusAbsen) => (
                                                <button
                                                    key={statusAbsen}
                                                    onClick={() => handleAbsensiChange(p.id, statusAbsen)}
                                                    className={`px-3 py-1.5 font-semibold rounded-lg border transition ${
                                                        p.status === statusAbsen
                                                        ? statusAbsen === 'Hadir' 
                                                            ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-400' 
                                                            : 'bg-rose-500/10 border-rose-500/30 text-rose-400'
                                                        : 'bg-slate-900 border-slate-800 text-slate-500 hover:text-slate-300'
                                                    }`}
                                                >
                                                    {statusAbsen}
                                                </button>
                                            ))}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                </div>

                {/* FOOTER ACTION BUTTONS */}
                <div className="p-4 border-t border-slate-800 bg-slate-950/40 flex items-center justify-end space-x-3 rounded-b-2xl">
                    <button 
                        onClick={onClose}
                        className="px-4 py-2 text-sm font-medium text-slate-400 hover:text-white rounded-xl hover:bg-slate-800 transition"
                    >
                        Batal
                    </button>
                    <button 
                        onClick={handleSimpanData}
                        className="px-5 py-2 text-sm font-bold text-white bg-indigo-600 hover:bg-indigo-500 rounded-xl shadow-lg shadow-indigo-600/20 active:scale-95 transition"
                    >
                        Simpan Semua Perubahan
                    </button>
                </div>

            </div>
        </div>
    );
}
