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
                    <p className="mb-6 text-slate-700 text-center px-6">
                        Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
                    </p>
                </div>

                {/* Bagian Misi */}
                <div className="mb-12">
                    <h2 className="text-xl font-semibold mb-4 text-[#0f172a] text-center">Misi</h2>
                    <p className="mb-6 text-slate-700 text-center px-6">
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
                    </p>
                    <p className="mb-6 text-slate-700 text-center px-6">
                        Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
                    </p>
                    <p className="mb-6 text-slate-700 text-center px-6">
                        Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.
                    </p>
                    <p className="mb-10 text-slate-700 text-center px-6">
                        Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
                    </p>
                </div>
            </main>

            <PublicFooter />
        </>
    );
}