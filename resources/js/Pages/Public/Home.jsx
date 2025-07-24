import React from "react";
import { Head, Link, usePage } from "@inertiajs/react";
import Slider from "react-slick";
import { motion } from "framer-motion";

import PublicHeader from "@/Components/PublicHeader";
import PublicFooter from "@/Components/PublicFooter";

export default function Home() {
    const { sliders, articles, guides } = usePage().props;

    const heroSliderSettings = {
        dots: true,
        infinite: true,
        speed: 800,
        autoplay: true,
        autoplaySpeed: 3500,
        slidesToShow: 1,
        slidesToScroll: 1,
        arrows: false,
        pauseOnHover: true,
        fade: true,
        cssEase: 'linear',
    };

    const textVariants = {
        hidden: { opacity: 0, y: 50 },
        visible: {
            opacity: 1,
            y: 0,
            transition: { duration: 0.8, ease: "easeOut" }
        },
    };

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.2,
                delayChildren: 0.1
            }
        }
    };

    return (
        <>
            <Head title="Beranda - CSIRT Kementerian PKP" />
            <PublicHeader />

            {/* HERO SECTION - Slider dinamis */}
            <div className="overflow-x-hidden">
                <section className="relative w-full min-h-screen overflow-hidden">
                    <Slider {...heroSliderSettings} className="h-full">
                        {sliders?.map((slide) => (
                            <div key={slide.id} className="relative w-full h-screen">
                                <img
                                    src={`/storage/${slide.image}`}
                                    alt={slide.title || 'Slider'}
                                    className="w-full h-full max-w-full object-cover absolute inset-0"
                                />
                                <motion.div
                                    className="absolute inset-0 bg-black bg-opacity-50 flex flex-col justify-center items-center text-white p-6 text-center"
                                    variants={containerVariants}
                                    initial="hidden"
                                    animate="visible"
                                >
                                    {slide.title && (
                                        <motion.h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4 px-4 max-w-4xl" variants={textVariants}>
                                            {slide.title}
                                        </motion.h1>
                                    )}
                                    {slide.caption && (
                                        <motion.p className="text-lg md:text-xl lg:text-2xl mb-6 px-4 max-w-3xl" variants={textVariants}>
                                            {slide.caption}
                                        </motion.p>
                                    )}
                                    {slide.sub_subtitle && (
                                        <motion.p className="text-md md:text-lg lg:text-xl font-semibold px-4" variants={textVariants}>
                                            {slide.sub_subtitle}
                                        </motion.p>
                                    )}
                                </motion.div>
                            </div>
                        ))}
                    </Slider>
                </section>
            </div>

            <main className="container mx-auto px-4 lg:px-6 py-10 space-y-20">
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
                                        src={article.image ? `/storage/${article.image}` : '/default.jpg'}
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
            </main>

            {/* PETA SERANGAN SIBER */}
            <div className="max-w-7xl mx-auto bg-[#0018451b] rounded-xl mt-8 mb-12 px-6 py-6">
                <div className="text-center">
                    <h1 className="text-2xl font-bold mb-6 font-body text-[#0f172a]">
                        Peta Serangan
                    </h1>
                    <div className="w-full max-w-5xl mx-auto overflow-hidden shadow-lg mb-6">
                        <iframe
                            id="iframe-kaspersky"
                            src="https://cybermap.kaspersky.com/en/widget/dynamic/dark"
                            width="846"
                            height="597"
                            style={{
                                border: "none",
                                width: "100%",
                                maxWidth: "100%",
                                height: "600px"
                            }}
                            title="Peta Serangan Kaspersky"
                            allowFullScreen
                        ></iframe>
                    </div>

                    <p className="text-sm text-left pl-4 text-gray-700">
                        <strong>Source:</strong>{" "}
                        <a
                            target="_blank"
                            rel="noopener noreferrer"
                            href="https://cybermap.kaspersky.com/"
                            className="text-blue-600 underline"
                        >
                            Kaspersky CyberMap
                        </a>
                    </p>
                </div>
            </div>

            <PublicFooter />
        </>
    );
}
