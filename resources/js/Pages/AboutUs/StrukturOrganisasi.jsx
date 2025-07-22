// resources/js/Pages/AboutUs/StrukturOrganisasi.jsx
import React from "react";
import { Head } from "@inertiajs/react";
import PublicHeader from "@/Components/PublicHeader";
import PublicFooter from "@/Components/PublicFooter";

export default function StrukturOrganisasi() {
    return (
        <>
            <Head title="Struktur Organisasi - CSIRT Kementerian PKP" />

            <PublicHeader />

            <main className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
                {/* Logo Kementerian */}
                <div className="flex justify-end mb-8">
                    <img
                        src="/images/logo-kemenpkp.png" // Ganti dengan path logo Kementerian PKP Anda
                        alt="Kementerian Perumahan dan Kawasan Permukiman"
                        className="h-20 w-auto object-contain"
                    />
                </div>

                <h1 className="text-3xl font-bold text-gray-900 mb-12 text-center">STRUKTUR PKP TTIS</h1>

                <div className="flex flex-col items-center space-y-0">
                    {/* Pengarah */}
                    <div className="bg-[#2a7ba4] text-white p-4 rounded-lg shadow-md w-full max-w-xs text-center">
                        <h3 className="font-bold text-lg">PENGARAH</h3>
                        <p className="text-sm">Sekretaris Jenderal</p>
                    </div>

                    {/* Garis penghubung vertikal */}
                    <div className="w-0.5 h-8 bg-gray-400"></div>

                    {/* Ketua */}
                    <div className="bg-[#2a7ba4] text-white p-4 rounded-lg shadow-md w-full max-w-xs text-center">
                        <h3 className="font-bold text-lg">KETUA</h3>
                        <p className="text-sm">Kepala Pusdatin</p>
                    </div>

                    {/* Garis penghubung vertikal */}
                    <div className="w-0.5 h-8 bg-gray-400"></div>

                    {/* Koordinator Tim */}
                    <div className="bg-[#2a7ba4] text-white p-4 rounded-lg shadow-md w-full max-w-xs text-center">
                        <h3 className="font-bold text-lg">KOORDINATOR TIM</h3>
                        <p className="text-sm">Kabid Pemeliharaan Infrastruktur TI</p>
                    </div>

                    {/* --- Bagian Garis T-Junction dan Penghubung ke 3 Tim di bawah --- */}
                    {/* Kontainer ini mencakup semua garis T-junction dan kotak putus-putus */}
                    {/* relative: untuk penempatan absolute child; mt-8 untuk jarak dari Koordinator Tim */}
                    <div className="relative w-full max-w-4xl flex flex-col items-center mt-8">
                        {/* Garis vertikal dari Koordinator Tim ke titik tengah garis horizontal */}
                        {/* -top-8: Menarik garis ini ke atas agar terhubung dengan Koordinator Tim */}
                        {/* height: Disesuaikan agar pas menyentuh garis horizontal */}
                        <div className="absolute -top-8 w-0.5 h-[4rem] bg-gray-400"></div> {/* Disesuaikan tinggi menjadi 4rem */}

                        {/* Kontainer untuk 3 garis vertikal pendek yang turun ke masing-masing box tim */}
                        {/* top-0: Dimulai dari garis horizontal */}
                        {/* h-[4rem]: Disesuaikan tinggi agar masuk ke dalam padding kotak putus-putus */}
                        <div className="absolute top-0 w-full h-[4rem] flex justify-around">
                            {/* Garis ke Tim 2 (tengah) */}
                            <div className="absolute left-1/2 -translate-x-1/2 w-0.5 h-full bg-gray-400"></div>
                        </div>

                        {/* Tiga Tim Utama dalam kotak putus-putus */}
                        {/* mt-[4rem]: Memberi ruang agar garis vertikal pendek bisa masuk dari atas */}
                        {/* pt-12: Padding atas agar konten tim tidak bertabrakan dengan garis yang masuk */}
                        <div className="border-2 border-dashed border-gray-500 p-8 pt-12 rounded-lg w-full max-w-4xl mt-[4rem]">
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                                {/* Tim Penanggulangan dan Pemulihan Insiden Siber */}
                                <div className="bg-[#2a7ba4] text-white p-4 rounded-lg shadow-md text-center flex flex-col items-center justify-between">
                                    <h3 className="font-bold text-lg mb-2">TIM PENANGGULANGAN DAN PEMULIHAN INSIDEN SIBER</h3>
                                    <p className="text-sm">Bidang Pemeliharaan Infrastruktur TI</p>
                                </div>

                                {/* Tim Penanganan Kerentanan Sistem Informasi */}
                                <div className="bg-[#2a7ba4] text-white p-4 rounded-lg shadow-md text-center flex flex-col items-center justify-between">
                                    <h3 className="font-bold text-lg mb-2">TIM PENANGANAN KERENTANAN SISTEM INFORMASI</h3>
                                    <p className="text-sm">Bidang Manajemen Data & Sistem Informasi</p>
                                </div>

                                {/* Tim Pembinaan & Publikasi */}
                                <div className="bg-[#2a7ba4] text-white p-4 rounded-lg shadow-md text-center flex flex-col items-center justify-between">
                                    <h3 className="font-bold text-lg mb-2">TIM PEMBINAAN & PUBLIKASI</h3>
                                    <p className="text-sm">Bagian Umum & Tata Usaha</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </main>

            <PublicFooter />
        </>
    );
}