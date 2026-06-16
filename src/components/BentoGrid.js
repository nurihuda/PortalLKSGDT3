const { useState, useEffect } = React;

export default function BentoGrid({ jadwal, peserta }) {
    const [waktuSekarang, setWaktuSekarang] = useState(new Date());

    // Update jam setiap detik untuk Live Clock
    useEffect(() => {
        const timer = setInterval(() => setWaktuSekarang(new Date()), 1000);
        return () => clearInterval(timer);
    }, []);

    // Mencari modul yang statusnya sedang "Berjalan"
    const modulAktif = jadwal.find(j => j.status === "Berjalan") || null;

    // Helper warna badge status
    const getStatusStyle = (status) => {
        switch(status) {
            case 'Selesai': return 'bg-slate-800 text-slate-400 border-slate-700';
            case 'Berjalan': return 'bg-amber-500/10 text-amber-400 border-amber-500/30 animate-pulse';
            default: return 'bg-indigo-500/10 text-indigo-400 border-indigo-500/20';
        }
    };

    return (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 auto-rows-[minmax(160px,_auto)]">
            
            {/* KOTAK 1: JAM REAL-TIME (Bento Besar - 1 Kolom) */}
            <div className="bg-gradient-to-br from-indigo-950 to-slate-900 border border-indigo-500/10 rounded-2xl p-6 flex flex-col justify-between shadow-xl">
                <div>
                    <span className="text-xs font-bold uppercase tracking-wider text-indigo-400">Waktu Server Lokal</span>
                    <h3 className="text-sm text-slate-400 mt-0.5">WIB (GMT+7)</h3>
                </div>
                <div className="my-4">
                    {/* Menggunakan custom font Boldonse (.font-time) */}
                    <div className="text-4xl lg:text-5xl font-black text-white font-time tracking-tight">
                        {waktuSekarang.toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit', second: '2-digit' })}
                    </div>
                </div>
                <div className="text-xs text-slate-500 font-medium">
                    {waktuSekarang.toLocaleDateString('id-ID', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' })}
                </div>
            </div>

            {/* KOTAK 2: STATUS MODUL AKTIF (Bento Besar - 2 Kolom) */}
            <div className="md:col-span-2 bg-slate-900 border border-slate-800 rounded-2xl p-6 flex flex-col justify-between shadow-xl">
                <div>
                    <span className="text-xs font-bold uppercase tracking-wider text-emerald-400">Modul Berlangsung</span>
                    {modulAktif ? (
                        <div className="mt-3">
                            <h2 className="text-xl lg:text-2xl font-bold text-white tracking-tight">{modulAktif.modul}</h2>
                            <p className="text-sm text-slate-400 mt-1">Durasi: <span className="font-semibold text-slate-200">{modulAktif.waktuMulai} - {modulAktif.waktuSelesai}</span> ({modulAktif.hari})</p>
                        </div>
                    ) : (
                        <div className="mt-4 text-slate-500 italic text-sm">Tidak ada modul yang sedang berjalan saat ini.</div>
                    )}
                </div>
                
                {modulAktif && (
                    <div className="mt-4 pt-3 border-t border-slate-800/60 flex items-center justify-between">
                        <div className="flex items-center space-x-2">
                            <span className="flex h-2.5 w-2.5 relative">
                                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-75"></span>
                                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-amber-500"></span>
                            </span>
                            <span className="text-xs font-semibold text-amber-400 uppercase tracking-wider">Sedang Dikerjakan</span>
                        </div>
                        <span className="text-xs text-slate-500">Pantau progres pengerjaan peserta</span>
                    </div>
                )}
            </div>

            {/* KOTAK 3: TIMELINE JADWAL LENGKAP (Bento Panjang - 2 Kolom) */}
            <div className="md:col-span-2 bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl flex flex-col justify-between">
                <div>
                    <h3 className="text-base font-bold text-white mb-4 flex items-center justify-between">
                        <span>Garis Waktu Kompetisi</span>
                        <span className="text-xs font-normal text-slate-500">Total: {jadwal.length} Modul</span>
                    </h3>
                    <div className="space-y-3">
                        {jadwal.map((j) => (
                            <div key={j.id} className="flex items-center justify-between p-3 rounded-xl bg-slate-950/50 border border-slate-800/40 hover:border-slate-800 transition">
                                <div className="flex items-center space-x-3 min-w-0">
                                    <div className="text-xs font-bold text-slate-500 bg-slate-800 px-2 py-1 rounded shrink-0">
                                        {j.waktuMulai}
                                    </div>
                                    <p className="text-sm font-medium text-slate-200 truncate">{j.modul}</p>
                                </div>
                                <span className={`text-[11px] font-semibold px-2.5 py-0.5 rounded-full border ${getStatusStyle(j.status)}`}>
                                    {j.status}
                                </span>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* KOTAK 4: DAFTAR PRESENSI PESERTA (Bento Tinggi - 1 Kolom) */}
            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl flex flex-col justify-between">
                <div>
                    <h3 className="text-base font-bold text-white mb-3">Kehadiran Peserta</h3>
                    <div className="overflow-y-auto max-h-[220px] pr-1 space-y-2">
                        {peserta.map((p) => (
                            <div key={p.id} className="flex items-center justify-between p-2.5 rounded-xl bg-slate-950/40 border border-slate-800/20 text-xs">
                                <div className="min-w-0">
                                    <p className="font-semibold text-slate-300 truncate">{p.nama}</p>
                                    <p className="text-slate-500 text-[10px] truncate">{p.asalSekolah}</p>
                                </div>
                                <span className={`font-bold px-2 py-0.5 rounded text-[10px] ${p.status === 'Hadir' ? 'bg-emerald-500/10 text-emerald-400' : 'bg-rose-500/10 text-rose-400'}`}>
                                    {p.status}
                                </span>
                            </div>
                        ))}
                    </div>
                </div>
                <div className="mt-4 pt-3 border-t border-slate-800/60 text-center">
                    <span className="text-[11px] text-slate-500 font-medium">
                        Hadir: {peserta.filter(p => p.status === 'Hadir').length} / {peserta.length} Orang
                    </span>
                </div>
            </div>

        </div>
    );
}
