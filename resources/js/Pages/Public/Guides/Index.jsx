import React, { useState, useEffect } from "react";
import { Head, Link, usePage } from "@inertiajs/react";
import PublicHeader from "@/Components/PublicHeader";
import PublicFooter from "@/Components/PublicFooter";
import Pagination from "@/Components/Pagination";
import { router } from '@inertiajs/react';

export default function GuideIndex() {
    const { guides } = usePage().props;
    const [search, setSearch] = useState("");
    const [isSearching, setIsSearching] = useState(false);
    const [isMounted, setIsMounted] = useState(false);

 useEffect(() => {
    if (!isMounted) {
        setIsMounted(true);
        return;
    }
    setIsSearching(true);
    const timeout = setTimeout(() => {
      router.get(route('public.guides.index'), { search }, {
        preserveScroll: true,
        preserveState: true,
        replace: true,
        onFinish: () => setIsSearching(false),
      });
    },100);

    return () => clearTimeout(timeout);
  }, [search]);


// Filter berdasarkan judul
    const filteredGuides = guides?.data?.filter((guide) =>
        guide.title.toLowerCase().includes(search.toLowerCase())
    );

    useEffect(() => {
        const hash = window.location.hash;
        if (!isSearching && hash) {
            // Tunggu render selesai
            setTimeout(() => {
                const el = document.querySelector(hash);
                if (el) {
                    const yOffset = -100; // Sesuaikan dengan tinggi sticky header
                    const y = el.getBoundingClientRect().top + window.pageYOffset + yOffset;
                    window.scrollTo({ top: y, behavior: 'smooth' });
                }
            }, 100);
        }
    }, [isSearching, filteredGuides, guides]);

    useEffect(() => {
        const urlParams = new URLSearchParams(window.location.search);
        const page = urlParams.get('page');

        if (!isSearching && page) {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        }
    }, [guides]); // guides akan berubah saat pagination berubah

    return (
        <>
            <Head title="Panduan - CSIRT Kementerian PKP" />
            <PublicHeader />

            <main className="max-w-4xl mx-auto px-4 py-10 space-y-8">
                <h1 className="text-3xl font-bold text-slate-800">Panduan CSIRT</h1>

                 {/* Search Box */}
                <input
                    type="text"
                    placeholder="Cari panduan..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    className="w-full border px-3 py-2 rounded-md text-sm"
                />

                 
                {/* Daftar Panduan */}
                {isSearching ? (
                    <p className="text-slate-500">Mencari Dokumen Panduan...</p>
                ) : filteredGuides?.length > 0 ? (
                    <ul className="space-y-4">
                        {filteredGuides.map((guide) => (
                            <Link
                                href={route("public.guides.detail", {
                                     guide: guide.id,
                                     page: guides?.current_page || 1, 
                                })}

                                key={guide.id}
                                className="block p-4 border border-slate-200 rounded-lg shadow-sm transition-all duration-200 ease-in-out hover:bg-slate-50 hover:shadow-md hover:border-blue-400 group"
                                title="Klik untuk melihat panduan ini"
                                id={`guide-${guide.id}`}  
                            >
                                <div className="flex flex-col">
                                    <h2 className="text-lg text-red-600 font-semibold flex items-center gap-2 group-hover:underline">
                                        📄 {guide.title}
                                    </h2>
                                    {guide.description && (
                                        <p className="text-slate-600 text-sm mt-1">
                                            {guide.description}
                                        </p>
                                    )}
                                </div>
                            </Link>
                        ))}
                    </ul>
                ) : (
                    <p className="text-slate-600">Belum ada panduan yang tersedia.</p>
                )}


                {guides?.last_page > 1 && (
                    <div className="mt-6 flex justify-center">
                        <Pagination links={guides.links} />
                    </div>
                )}
            </main>

            <PublicFooter />
        </>
    );
}
