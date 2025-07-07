import React from "react";
import { Head, Link, usePage } from "@inertiajs/react";
import PublicHeader from "@/Components/PublicHeader";
import PublicFooter from "@/Components/PublicFooter";
import Pagination from "@/Components/Pagination";

export default function GuideIndex() {
    const { guides } = usePage().props;

    return (
        <>
            <Head title="Panduan - CSIRT Kementerian PKP" />
            <PublicHeader />

            <main className="max-w-4xl mx-auto px-4 py-10 space-y-8">
                <h1 className="text-3xl font-bold text-slate-800">Panduan CSIRT</h1>

                {guides?.data?.length > 0 ? (
                    <ul className="space-y-4">
                        {guides.data.map((guide) => (
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
