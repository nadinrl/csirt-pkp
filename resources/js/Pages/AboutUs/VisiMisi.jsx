// resources/js/Pages/AboutUs/VisiMisi.jsx
import React from "react";
import { Head } from "@inertiajs/react";
import PublicHeader from "@/Components/PublicHeader";
import PublicFooter from "@/Components/PublicFooter";

export default function VisiMisi() {
    return (
        <>
            <Head title="Visi & Misi - CSIRT Kementerian PKP" />

            <PublicHeader />

            <main className="max-w-4xl mx-auto px-6 py-12">
                <h1 className="text-3xl font-bold mb-8 text-[#0f172a] text-center">Visi & Misi Kemen PKP</h1>

                {/* Bagian Visi */}
                <div className="mb-12">
                    <h2 className="text-xl font-semibold mb-4 text-[#0f172a] text-center">Visi</h2>
                    <p className="mb-6 text-slate-700 text-justify px-6">
                        Visi PKP-CSIRT adalah pengelolaan sistem keamanan informasi dengan baik dan aman di lingkungan Kementerian Perumahan dan Kawasan Permukiman untuk melindungi aset informasi yang dimiliki oleh Kementerian Perumahan dan Kawasan Permukiman.
                    </p>
                </div>

                {/* Bagian Misi */}
                <div className="mb-12">
                    <h2 className="text-xl font-semibold mb-4 text-[#0f172a] text-center">Misi</h2>
                    <p className="mb-6 text-slate-700 text-justify px-6">
                        Menyediakan layanan keamanan siber teknologi informasi pada Kementerian Perumahan dan Kawasan Permukiman; 
                    </p>
                    <p className="mb-6 text-slate-700 text-justify px-6">
                        Meningkatkan kesadaran keamanan siber di lingkungan Kementerian Kementerian Perumahan dan Kawasan Permukiman. 
                    </p>
                </div>
            </main>

            <PublicFooter />
        </>
    );
}