import React from "react";
import { Head, Link, usePage } from "@inertiajs/react";
import Slider from "react-slick";
import { motion } from "framer-motion";

import PublicHeader from "@/Components/PublicHeader";
import PublicFooter from "@/Components/PublicFooter";


export default function Home() {
    const { sliders, articles, guides } = usePage().props;

     const heroSlides = [
        {
            id: 1,
            image: '/images/1.jpg', 
            title: 'Cyber Security Incident Response Team', 
            subtitle: 'Kementerian Perumahan dan Kawasan Permukiman Republik Indonesia', 
            subSubtitle: 'PKP-CSIRT'
        },
        {
            id: 2,
            image: '/images/2.jpg',
            title: 'Amankan Siber Anda, Lindungi Bangsa Kita',
            subtitle: 'Wujudkan Ekosistem Digital yang Tangguh',
            subSubtitle: 'Bersama PKP-CSIRT'
        },
        {
            id: 3,
            image: '/images/3.png',
            title: 'Siaga Penuh, Hadapi Ancaman Siber',
            subtitle: 'CSIRT Kementerian PKP Selalu di Depan',
            subSubtitle: 'Tangguh dan Terpercaya'
        },
    ];

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

    const generalSliderSettings = {
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

    
    const textVariants = {
        hidden: { opacity: 0, y: 50 },
        visible: {
            opacity: 1,
            y: 0,
            transition: {
                duration: 0.8,
                ease: "easeOut"
            }
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
            {}
            <PublicHeader />

            {/* HERO SECTION */}
           
            <section className="relative w-screen min-h-screen overflow-hidden">
                <Slider {...heroSliderSettings} className="h-full">
                    {heroSlides.map((slide) => (
                        
                        <div key={slide.id} className="relative w-full h-screen">
                            <img
                                src={slide.image}
                                alt={slide.title}
                                className="w-full h-full object-cover absolute inset-0"
                            />
                            {/* Overlay untuk teks */}
                            <motion.div
                                className="absolute inset-0 bg-black bg-opacity-50 flex flex-col justify-center items-center text-white p-6 text-center"
                                variants={containerVariants}
                                initial="hidden"
                                animate="visible"
                            >
                                <motion.h1
                                    className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4 px-4 max-w-4xl" 
                                    variants={textVariants}
                                >
                                    {slide.title}
                                </motion.h1>
                                <motion.p
                                    className="text-lg md:text-xl lg:text-2xl mb-6 px-4 max-w-3xl" 
                                    variants={textVariants}
                                >
                                    {slide.subtitle}
                                </motion.p>
                                {/* */}
                                {slide.subSubtitle && (
                                    <motion.p
                                        className="text-md md:text-lg lg:text-xl font-semibold px-4" 
                                        variants={textVariants}
                                    >
                                        {slide.subSubtitle}
                                    </motion.p>
                                )}
                            </motion.div>
                        </div>
                    ))}
                </Slider>
            </section>

            {/* Konten lain dari halaman yang ingin tetap dalam container */}
            {/* Pindahkan class container ke div baru di sini */}
            <main className="container mx-auto px-4 lg:px-6 py-10 space-y-20">

                {/* SLIDER (Slider yang sudah ada dari props). Uncomment jika ingin digunakan kembali */}
                {/* {sliders?.length > 0 && (
                    <section className="rounded-lg overflow-hidden shadow-xl">
                        <Slider {...generalSliderSettings}>
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
                )} */}

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