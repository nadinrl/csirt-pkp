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
        //console.log("Artikel:", articles);
    return (
        <>
            <Head title="Beranda - CSIRT Kementerian PKP" />
            <PublicHeader />

            <main className="container mx-auto px-4 lg:px-6 py-10 space-y-20">
                {/* HERO SECTION */}
                <section className="text-center py-20 bg-gradient-to-r from-red-600 to-red-400 text-white rounded-lg shadow-md">
                    <h1 className="text-4xl md:text-5xl font-bold mb-4">Selamat Datang di CSIRT Kementerian PKP</h1>
                    <p className="text-lg md:text-xl mb-6">Merah Putih • Aman • Responsif</p>
                    <Link
                    href={route("public.articles")}
                    className="inline-block bg-white text-red-600 font-semibold px-6 py-3 rounded-full hover:bg-slate-100 transition"
                    >
                    Jelajahi Artikel Keamanan →
                    </Link>
                </section>

                
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
                            className="group bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition duration-300 border hover:border-red-400"
                            >
                                <div className="h-48 bg-gray-100 rounded-t-xl overflow-hidden">
                                    <img
                                    src={article.image ? `/storage/${article.image}` : '/storage/articles/default.jpg'}
                                    alt={article.title}
                                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                                    />

                                    </div>
                                    <div className="p-5 flex flex-col justify-between h-40">
                                        <h3 className="text-lg font-semibold text-[#0f172a] group-hover:text-red-600">
                                            {article.title}
                                            </h3>
                                            <p className="text-sm text-slate-600 mt-2 line-clamp-3">
                                                {article.excerpt}
                                                </p>
                                                <span className="inline-block mt-3 text-xs text-[#dc2626] font-medium">
                                                    Baca Selengkapnya →
                                                    </span>
                                                    </div>
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
