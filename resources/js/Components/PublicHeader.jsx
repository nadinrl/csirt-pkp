import Dropdown from '@/Components/Dropdown';
import React from "react";
import { Link } from "@inertiajs/react";

export default function PublicHeader() {
    return (
        <header className="bg-[#dc2626] text-white py-4 shadow-md sticky top-0 z-50">
            <div className="container mx-auto px-4 lg:px-6 flex flex-wrap items-center justify-between">
                {/* Logo dan Judul */}
                <div className="flex items-center gap-3">
                    <img
                        src="/logo-pkp.png"
                        alt="Logo PKP"
                        className="h-10 w-auto object-contain"
                    />
                    <span className="text-xl font-bold tracking-wide leading-tight">
                        CSIRT Kementerian PKP
                    </span>
                </div>

                {/* Navigasi */}
                <nav className="flex flex-wrap gap-1 sm:gap-2 md:gap-3 lg:gap-4 mt-4 sm:mt-0 text-sm font-medium">
                    {[
                        { label: "Beranda", route: "home" },
                        { label: "Artikel", route: "public.articles" },
                        { label: "Panduan", route: "public.guides" },
                        { label: "Lapor Insiden", route: "incidents.create" },
                        { label: "Tracking Tiket", route: "incidents.track", params: { ticket: "" } },
                        { label: "Kontak", href: "#kontak" },
                    ].map((item, index) => {
                        const isHashLink = !!item.href;

                        const baseClass =
                            "relative px-3 py-2 rounded-md transition-all duration-200 hover:bg-white/10 focus:outline-none";

                        const animatedUnderline = (
                            <span className="absolute left-0 bottom-0 w-0 h-0.5 bg-white transition-all duration-300 group-hover:w-full" />
                        );

                        return isHashLink ? (
                            <a key={index} href={item.href} className={`group ${baseClass}`}>
                                {item.label}
                                {animatedUnderline}
                            </a>
                        ) : (
                            <Link key={index} href={route(item.route, item.params)} className={`group ${baseClass}`}>
                                {item.label}
                                {animatedUnderline}
                            </Link>
                        );
                    })}
                    {/* Dropdown untuk "About Us" */}
                    <div className="relative inline-flex items-center">
                        <Dropdown>
                            <Dropdown.Trigger>
                                <span className="inline-flex rounded-md">
                                    <button
                                        type="button"
                                        className="relative px-3 py-2 rounded-md transition-all duration-200 hover:bg-white/10 focus:outline-none inline-flex items-center text-sm font-medium text-white group" // Tambah group class di sini
                                    >
                                        About Us
                                        <svg
                                            className="ml-2 -mr-0.5 h-4 w-4"
                                            xmlns="http://www.w3.org/2000/svg"
                                            viewBox="0 0 20 20"
                                            fill="currentColor"
                                        >
                                            <path
                                                fillRule="evenodd"
                                                d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                                                clipRule="evenodd"
                                            />
                                        </svg>
                                        <span className="absolute left-0 bottom-0 w-0 h-0.5 bg-white transition-all duration-300 group-hover:w-full" />
                                    </button>
                                </span>
                            </Dropdown.Trigger>

                            <Dropdown.Content>
                                {/* Panggil Dropdown.Link karena sudah diimpor dari Dropdown.jsx */}
                                <Dropdown.Link href={route('about-us.profil')}>Profil</Dropdown.Link>
                                <Dropdown.Link href={route('about-us.visi-misi')}>Visi Misi</Dropdown.Link>
                                <Dropdown.Link href={route('about-us.struktur-organisasi')}>Struktur Organisasi</Dropdown.Link>
                                <Dropdown.Link href={route('about-us.faq')}>FAQ</Dropdown.Link>
                            </Dropdown.Content>
                        </Dropdown>
                    </div>
                </nav>
            </div>
        </header>
    );
}