// DATA SEEDING (Data Awal jika LocalStorage masih kosong)
const INITIAL_LKS_DATA = {
    kompetisi: {
        nama: "Lomba Kompetensi Siswa (LKS)",
        bidang: "Graphic Design Technology",
        tahun: "2026"
    },
    settings: {
        sidebarOpen: true
    },
    jadwal: [
        {
            id: "modul-1",
            modul: "Modul 1: Branding & Logo Design",
            hari: "Hari 1",
            waktuMulai: "09:00",
            waktuSelesai: "12:00",
            status: "Selesai" // Pilihan: "Belum", "Berjalan", "Selesai"
        },
        {
            id: "modul-2",
            modul: "Modul 2: Client Brief & UI/UX Design",
            hari: "Hari 1",
            waktuMulai: "13:00",
            waktuSelesai: "16:00",
            status: "Berjalan"
        },
        {
            id: "modul-3",
            modul: "Modul 3: Editorial & Magazine Layout",
            hari: "Hari 2",
            waktuMulai: "09:00",
            waktuSelesai: "12:00",
            status: "Belum"
        },
        {
            id: "modul-4",
            modul: "Modul 4: Packaging & Production",
            hari: "Hari 2",
            waktuMulai: "13:00",
            waktuSelesai: "16:00",
            status: "Belum"
        }
    ],
    peserta: [
        { id: "001", nama: "Ahmad Fauzi", asalSekolah: "SMKN 1 Sidoarjo", status: "Hadir" },
        { id: "002", nama: "Budi Santoso", asalSekolah: "SMKN 2 Pasuruan", status: "Hadir" },
        { id: "003", nama: "Citra Lestari", asalSekolah: "SMKN 1 Jogja", status: "Hadir" },
        { id: "004", nama: "Dewa Made", asalSekolah: "SMK Jawa Tengah", status: "Izin" }
    ]
};

// Inisialisasi LocalStorage jika pertama kali dibuka
if (!localStorage.getItem("lks_portal_db")) {
    localStorage.setItem("lks_portal_db", JSON.stringify(INITIAL_LKS_DATA));
}

/**
 * CORE STORE FUNCTIONS (Firebase-Ready Architecture)
 * Menggunakan async/await agar transisi ke cloud database di masa depan seamless.
 */
export const store = {
    // 1. Mengambil seluruh data portal
    fetchData: async () => {
        return new Promise((resolve) => {
            setTimeout(() => {
                const data = localStorage.getItem("lks_portal_db");
                resolve(JSON.parse(data));
            }, 100); // Simulasi delay network tipis agar feel async-nya dapet
        });
    },

    // 2. Menyimpan/Mengupdate seluruh data portal
    saveData: async (updatedData) => {
        return new Promise((resolve) => {
            localStorage.setItem("lks_portal_db", JSON.stringify(updatedData));
            resolve(true);
        });
    },

    // 3. Helper spesifik untuk update status jadwal (cepat & efisien)
    updateJadwalStatus: async (id, statusBaru) => {
        const data = JSON.parse(localStorage.getItem("lks_portal_db"));
        data.jadwal = data.jadwal.map(item => 
            item.id === id ? { ...item, status: statusBaru } : item
        );
        localStorage.setItem("lks_portal_db", JSON.stringify(data));
        return data;
    }
};
