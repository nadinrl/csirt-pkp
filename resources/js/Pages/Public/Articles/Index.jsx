import React from "react";
import { Head, Link, usePage } from "@inertiajs/react";
import PublicHeader from "@/Components/PublicHeader";
import PublicFooter from "@/Components/PublicFooter";
import Pagination from "@/Components/Pagination";

export default function ArticleIndex() {
    const { articles } = usePage().props;

    return (
        <>
            <Head title="Artikel - CSIRT Kementerian PKP" />
            <PublicHeader />

            <main className="max-w-5xl mx-auto px-4 py-10 space-y-8">
                <h1 className="text-3xl font-bold text-slate-800">Daftar Artikel</h1>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {articles.data.map((article) => (
                        <Link
                            key={article.id}
                            href={route("articles.show", article.slug)}
                            className="border p-4 rounded-md shadow hover:shadow-md transition bg-white"
                        >
                            <h3 className="text-lg font-semibold text-slate-800 mb-2">{article.title}</h3>
                            <p className="text-sm text-slate-600 line-clamp-3">{article.excerpt}</p>
                            <span className="text-xs text-red-600 mt-3 inline-block">Baca Selengkapnya →</span>
                        </Link>
                    ))}
                </div>

                {articles.last_page > 1 && (
                    <div className="mt-6 flex justify-center">
                        <Pagination links={articles.links} />
                    </div>
                )}
            </main>

            <PublicFooter />
        </>
    );
}
