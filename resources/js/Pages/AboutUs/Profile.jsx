import React from 'react';
import { Head } from '@inertiajs/react';
import PublicHeader from '@/Components/PublicHeader'; // Sesuaikan dengan lokasi header Anda
import PublicFooter from '@/Components/PublicFooter'; // Sesuaikan dengan lokasi footer Anda

const Profil = () => {
    return (
        <>
            <Head title="Profil - CSIRT Kementerian PKP" />

            <PublicHeader />

            <main className="max-w-7xl mx-auto py-12 sm:px-6 lg:px-8">
                <h1 className="text-3xl font-bold mb-6 text-[#0f172a] text-center">Profil Kemen PKP-CSIRT</h1>

                <div className="bg-white overflow-hidden sm:rounded-lg p-6">
                    <div className="flex flex-col md:flex-row items-center md:items-start gap-6">
                        {/* Bagian Gambar di Kiri */}
                        <div className="w-full md:w-1/3 flex justify-center">
                            {/* Path gambar disesuaikan: public/images/logo-csirt.png */}
                            <img
                                src="/images/logo-csirt.png"
                                alt="Logo Kemendagri-CSIRT"
                                className="max-w-full h-auto rounded-md shadow-md"
                            />
                        </div>

                        {/* Bagian Teks di Kanan */}
                        <div className="w-full md:w-2/3">
                            <p className="mb-4 text-slate-700">
                                <span className="font-semibold">Computer Security Incident Response Team (CSIRT)</span>, disingkat KEMEN PKP-CSIRT merupakan CSIRT sektor Pemerintah Indonesia 
                            </p>
                            <p className="mb-4 text-slate-700">
                                KEMEN PKP-CSIRT merupakan wadah koordinasi antar unit dan atau stakeholder di lingkungan Kementerian Perumahan dan Kawasan Permukiman terkait dengan keamanan informasi.
                            </p>
                            <p className="text-slate-700">
                                Anggota Tim dari KEMEN PKP-CSIRT adalah seluruh staf Pusat Data dan Sistem Informasi (Pusdatin)
                            </p>
                            {/* Anda bisa menambahkan konten profil lainnya di sini */}
                        </div>
                    </div>
                </div>
            </main>

            <PublicFooter />
        </>
    );
};

export default Profil;