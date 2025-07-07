import React from "react";
import { Head, Link, usePage } from "@inertiajs/react";
import Slider from "react-slick";
import PublicHeader from "@/Components/PublicHeader";
import PublicFooter from "@/Components/PublicFooter";

export default function Home() {
    const { sliders, articles, guides } = usePage().props;

    const sliderSettings = {
        dots: true,
        infinite: true,
        speed: 600,
        autoplay: true,
        autoplaySpeed: 5000,
        slidesToShow: 1,
        slidesToScroll: 1,
        arrows: true,
        pauseOnHover: true,
    };

    return (
        <>
            <Head title="Beranda - CSIRT Kementerian PKP" />
            <PublicHeader />

            <main className="container mx-auto px-4 lg:px-6 py-10 space-y-20">
                {/* SLIDER */}
                {sliders?.length > 0 && (
                    <section className="rounded-lg overflow-hidden shadow-xl">
                        <Slider {...sliderSettings}>
                            {sliders.map((slider) => (
                                <div key={slider.id}>
                                    <img
                                        src={`/storage/${slider.image}`}
                                        alt={slider.title}
                                        className="w-full h-[400px] object-cover"
                                    />
                                </div>
                            ))}
                        </Slider>
                    </section>
                )}

                {/* ARTIKEL */}
                <section>
                    <div className="flex justify-between items-center mb-6">
                        <h2 className="text-2xl font-bold text-[#0f172a]">Artikel Keamanan Siber</h2>
                        <Link href={route("public.articles")} className="text-sm text-[#dc2626] hover:underline">
                            Lihat Semua →
                        </Link>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {articles.slice(0, 3).map((article) => (
                            <Link
                                key={article.id}
                                href={route("articles.show", article.slug)}
                                className="bg-white border rounded-xl p-5 hover:shadow-lg transition-all duration-300"
                            >
                                <h3 className="text-lg font-semibold text-[#0f172a] mb-2">{article.title}</h3>
                                <p className="text-sm text-slate-600 line-clamp-3">{article.excerpt}</p>
                                <span className="mt-4 inline-block text-xs text-[#dc2626] font-medium">
                                    Baca Selengkapnya →
                                </span>
                            </Link>
                        ))}
                    </div>
                </section>

                {/* PANDUAN */}
				<section>
					<div className="flex justify-between items-center mb-6">
						<h2 className="text-2xl font-bold text-[#0f172a]">Panduan CSIRT</h2>
						<Link href={route("public.guides")} className="text-sm text-[#dc2626] hover:underline">
							Lihat Semua →
						</Link>
					</div>
					<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
						{guides.slice(0, 5).map((guide) => (
							<Link
								key={guide.id}
								href={route("public.guides.detail", guide.id)}
								className="block bg-white border rounded-lg p-4 shadow-sm hover:shadow-md transition duration-200"
							>
								<h3 className="text-lg font-semibold text-[#0f172a] mb-1">{guide.title}</h3>
								<p className="text-sm text-slate-600 line-clamp-2">
									{guide.description || "Tidak ada deskripsi tersedia."}
								</p>
								<span className="inline-block mt-2 text-xs text-[#dc2626] font-medium">
									Lihat Detail →
								</span>
							</Link>
						))}
					</div>
				</section>

                {/* DOKUMEN KHUSUS */}
                <section className="space-y-4">
                    <h2 className="text-2xl font-bold text-[#0f172a]">Dokumen Keamanan Khusus</h2>
                    <a href="/storage/rfc2350.pdf" target="_blank" className="text-blue-700 hover:underline block">
                        📘 RFC 2350 - Informasi Tim CSIRT
                    </a>
                    <a href="/storage/public-key.asc" target="_blank" className="text-blue-700 hover:underline block">
                        🔐 Unduh Public Key PGP
                    </a>
                </section>
            </main>

            <PublicFooter />
        </>
    );
}
