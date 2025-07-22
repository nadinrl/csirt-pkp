import React, { useState, useEffect } from "react"; // Tambahkan useState dan useEffect di sini
import { Head, Link, usePage, router } from "@inertiajs/react"; // Tambahkan router di sini
import PublicHeader from "@/Components/PublicHeader";
import PublicFooter from "@/Components/PublicFooter";
import Pagination from "@/Components/Pagination";

export default function GuideIndex() {
    const { guides } = usePage().props;
    // Hapus baris 'feat/halaman-panduan' di sini

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
            setTimeout(() => {
                const el = document.querySelector(hash);
                if (el) {
                    const yOffset = -100;
                    const y = el.getBoundingClientRect().top + window.pageYOffset + yOffset;
                    window.scrollTo({ top: y, behavior: 'smooth' });
                }
            }, 100);
        }
    }, [isSearching, filteredGuides, guides]); // Pertahankan dependensi ini

    useEffect(() => {
        const urlParams = new URLSearchParams(window.location.search);
        const page = urlParams.get('page');

        if (!isSearching && page) {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        }
    }, [guides]); // Dependensi [guides] untuk useEffect ini terasa sedikit aneh jika hanya terkait dengan 'page' dan 'isSearching'. Pertimbangkan apakah ini benar atau seharusnya [page, isSearching] atau lainnya.

    // Hapus baris 'main' di sini

    return (
        <>
            <Head title="Panduan - CSIRT Kementerian PKP" />
            <PublicHeader />

            <main className="max-w-4xl mx-auto px-4 py-10 space-y-8">
                <h1 className="text-3xl font-bold text-slate-800">Panduan CSIRT</h1>

                {/* Tambahkan input search jika ini adalah fitur search */}
                {/* <input
                    type="text"
                    placeholder="Cari panduan..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    className="border p-2 rounded w-full"
                /> */}

                {filteredGuides?.length > 0 ? ( // Gunakan filteredGuides di sini
                    <ul className="space-y-4">
                        {filteredGuides.map((guide) => ( // Gunakan filteredGuides di sini
                            <li key={guide.id} className="border-b pb-3">
                                <Link
                                    href={route("public.guides.show", guide.id)}
                                    className="text-lg text-red-600 hover:underline font-medium"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    📄 {guide.title}
                                </Link>
                                {guide.description && (
                                    <p className="text-slate-600 text-sm mt-1">
                                        {guide.description}
                                    </p>
                                )}
                            </li>
                        ))}
                    </ul>
                ) : (
                    <p className="text-slate-600">Belum ada panduan yang tersedia.</p>
                )}

                {/* Pastikan pagination ini relevan dengan filteredGuides jika ada paginasi di hasil filter */}
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