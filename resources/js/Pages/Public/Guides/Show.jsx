import React from "react";
import { Head } from "@inertiajs/react";
import PublicHeader from "@/Components/PublicHeader";
import PublicFooter from "@/Components/PublicFooter";

export default function Show({ guide }) {
    return (
        <>
            <Head title={`Panduan - ${guide.title}`} />
            <PublicHeader />

            <main className="container mx-auto px-4 lg:px-6 py-10 max-w-3xl space-y-6">
                <h1 className="text-3xl font-bold text-[#0f172a]">{guide.title}</h1>

                <p className="text-base text-slate-700 whitespace-pre-line">{guide.description}</p>

                <a
                    href={guide.download_url}
                    className="inline-block mt-6 px-5 py-3 bg-[#dc2626] text-white font-medium rounded hover:bg-red-700 transition"
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    📥 Unduh Panduan
                </a>
            </main>

            <PublicFooter />
        </>
    );
}
