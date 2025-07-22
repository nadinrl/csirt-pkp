import React from "react";
import { Head, Link, usePage } from "@inertiajs/react"; // ✅ tambahkan usePage
import PublicHeader from "@/Components/PublicHeader";
import PublicFooter from "@/Components/PublicFooter";
import { IconArrowLeft } from '@tabler/icons-react';

export default function Show() {
    const { guide, page } = usePage().props; // ✅ ambil props dari Inertia

    return (
        <>
            <Head title={`Panduan - ${guide.title}`} />
            <PublicHeader />

                <main className="container mx-auto px-4 lg:px-6 py-10 max-w-3xl space-y-6">
                    {/* Tombol kembali */}
                    <Link
                        href={route('public.guides.index') + `?page=${page}#guide-${guide.id}`}
                        className="inline-flex items-center text-sm text-red-600 hover:underline transition"
                        preserveScroll
                        preserveState
                    >
                        <IconArrowLeft size={16} stroke={1.5} className="mr-1" />
                        Kembali ke Daftar Panduan
                    </Link>
                <h1 className="text-3xl font-bold text-[#0f172a]">{guide.title}</h1>

                <p className="text-base text-slate-700 whitespace-pre-line">{guide.description}</p>

                <div className="mt-6">
                    <iframe
                        src={guide.file_url}
                        width="100%"
                        height="800px"
                        className="w-full border rounded"
                    />
                </div>

            </main>

            <PublicFooter />
        </>
    );
}
