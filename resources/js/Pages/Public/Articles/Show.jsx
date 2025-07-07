import React from "react";
import { Head, Link, usePage } from "@inertiajs/react";
import PublicHeader from "@/Components/PublicHeader";
import PublicFooter from "@/Components/PublicFooter";

export default function ArticleShow() {
    const { article } = usePage().props;

    return (
        <>
            <Head title={article.title} />
            <PublicHeader />

            <main className="max-w-3xl mx-auto px-4 py-10">
                <h1 className="text-3xl font-bold text-slate-800 mb-4">{article.title}</h1>
                <p className="text-sm text-slate-500 mb-6">Ditulis oleh {article.author?.name || "Administrator"}</p>

                <article
                    className="prose prose-slate max-w-full"
                    dangerouslySetInnerHTML={{ __html: article.content }}
                />

                <div className="mt-8">
                    <Link href={route("public.articles")} className="text-red-600 hover:underline text-sm">
                        ← Kembali ke Daftar Artikel
                    </Link>
                </div>
            </main>

            <PublicFooter />
        </>
    );
}
