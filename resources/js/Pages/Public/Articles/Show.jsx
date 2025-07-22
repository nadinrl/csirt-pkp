import React from "react";
import { Head, Link, usePage } from "@inertiajs/react";
import PublicHeader from "@/Components/PublicHeader";
import PublicFooter from "@/Components/PublicFooter";

export default function ArticleShow() {
    const { article, suggestions } = usePage().props;

    const imageUrl = article.image
        ? `/storage/${article.image}`
        : "/storage/articles/default.jpg";

    return (
        <>
            <Head title={article.title} />
            <PublicHeader />

            <main className="max-w-7xl mx-auto px-4 py-10">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
                    {/* Artikel utama (kiri) */}
                    <div className="md:col-span-2">
                        <h1 className="text-3xl font-bold text-slate-800 mb-4">{article.title}</h1>
                        <p className="text-sm text-slate-500 mb-6">
                            Ditulis oleh {article.author?.name || "Administrator"}
                        </p>

                        <img
                            src={imageUrl}
                            alt={article.title}
                            className="w-full h-auto max-h-[400px] object-cover rounded-lg mb-8"
                        />

                        <article
                            className="prose prose-slate max-w-full"
                            dangerouslySetInnerHTML={{ __html: article.content }}
                        />

                        <div className="mt-8">
                            <Link
                                href={route("public.articles")}
                                className="text-red-600 hover:underline text-sm"
                            >
                                ← Kembali ke Daftar Artikel
                            </Link>
                        </div>
                    </div>

                    {/* Artikel sugesti (kanan) */}
                    <div className="space-y-6">
                        <h2 className="text-lg font-semibold text-slate-700 mb-4">Artikel Lainnya</h2>
                        {suggestions.map((s) => {
                            const suggestionImage = s.image
                                ? `/storage/${s.image}`
                                : "/storage/articles/default.jpg";

                            return (
                                <div
                                    key={s.id}
                                    className="border rounded-lg overflow-hidden shadow hover:shadow-md transition bg-white"
                                >
                                    <Link href={route("articles.show", s.slug)} className="block">
                                        <img
                                            src={suggestionImage}
                                            alt={s.title}
                                            className="w-full h-32 object-cover"
                                        />
                                        <div className="p-3">
                                            <h3 className="text-sm font-medium text-slate-800 group-hover:text-red-600 line-clamp-2">
                                                {s.title}
                                            </h3>
                                        </div>
                                    </Link>

                                    {/* Baca Selengkapnya */}
                                    <div className="px-3 pb-3">
                                        <Link
                                            href={route("articles.show", s.slug)}
                                            className="text-red-600 text-sm hover:underline"
                                        >
                                            Baca selengkapnya →
                                        </Link>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </main>

            <PublicFooter />
        </>
    );
}
