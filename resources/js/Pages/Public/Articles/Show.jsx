import React, { useState } from "react";
import { Head, Link, usePage } from "@inertiajs/react";
import PublicHeader from "@/Components/PublicHeader";
import PublicFooter from "@/Components/PublicFooter";

export default function ArticleShow() {
    const { article, suggestions } = usePage().props;

    const imageUrl = article.image
        ? `/storage/${article.image}`
        : "/default.jpg";

    const [showImageModal, setShowImageModal] = useState(false);
    const [modalImageUrl, setModalImageUrl] = useState("");

    const openImageModal = (url) => {
        setModalImageUrl(url);
        setShowImageModal(true);
    };

    const closeImageModal = () => {
        setShowImageModal(false);
        setModalImageUrl("");
    };

    const handleModalClick = (e) => {
        // Tutup jika klik di luar elemen gambar
        if (e.target.id === "modal-backdrop") {
            closeImageModal();
        }
    };

    return (
        <>
            <Head title={article.title} />
            <PublicHeader />

            <main className="max-w-7xl mx-auto px-4 py-10">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
                    {/* Artikel utama */}
                    <div className="md:col-span-2">
                        <h1 className="text-3xl font-bold text-slate-800 mb-4">
                            {article.title}
                        </h1>
                        <p className="text-sm text-slate-500 mb-6">
                            Ditulis oleh {article.author?.name || "Administrator"} <br />
                            {new Date(article.created_at).toLocaleDateString("id-ID", {
                                day: "numeric",
                                month: "long",
                                year: "numeric",
                            })}
                        </p>

                        <img
                            src={imageUrl}
                            alt={article.title}
                            onClick={() => openImageModal(imageUrl)}
                            className="w-full h-auto max-h-[400px] object-cover mb-8 cursor-zoom-in rounded-lg shadow-md"
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

                    {/* Artikel sugesti */}
                    <div className="space-y-6">
                        <h2 className="text-lg font-semibold text-slate-700 mb-4">
                            Artikel Lainnya
                        </h2>
                        {suggestions.map((s) => {
                            const suggestionImage = s.image
                                ? `/storage/${s.image}`
                                : "/default.jpg";

                            return (
                                <div
                                    key={s.id}
                                    className="group border rounded-lg overflow-hidden shadow hover:shadow-md transition bg-white"
                                >
                                    <Link href={route("articles.show", s.slug)} className="block">
                                        <img
                                            src={suggestionImage}
                                            alt={s.title}
                                            className="w-full h-32 object-cover group-hover:scale-105 transition-transform duration-300"
                                        />
                                        <div className="p-3">
                                            <h3 className="text-xl font-bold text-slate-800 group-hover:text-red-600 line-clamp-2">
                                                {s.title}
                                            </h3>
                                            <p className="text-sm text-slate-600 line-clamp-3">
                                                {s.excerpt}
                                            </p>
                                        </div>
                                    </Link>
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

            {/* Modal Gambar */}
            {showImageModal && (
                <div
                    id="modal-backdrop"
                    onClick={handleModalClick}
                    className="fixed inset-0 bg-black bg-opacity-80 flex items-center justify-center z-50"
                >
                    <div className="relative max-w-5xl max-h-[90vh] w-full mx-4">
                        <button
                            onClick={closeImageModal}
                            className="absolute top-2 right-2 text-white text-3xl font-bold z-10 hover:text-red-500"
                        >
                            &times;
                        </button>
                        <img
                            src={modalImageUrl}
                            alt="Preview"
                            className="w-full h-auto max-h-[90vh] object-contain rounded-md shadow-lg"
                        />
                    </div>
                </div>
            )}

            <PublicFooter />
        </>
    );
}
