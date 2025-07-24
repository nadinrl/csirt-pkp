import Dropdown from '@/Components/Dropdown';
import React from "react";
import { Link, usePage } from "@inertiajs/react"; // Import usePage

export default function PublicHeader() {
    const { url } = usePage(); // Dapatkan URL saat ini dari Inersia.js

    // Fungsi helper untuk menentukan apakah sebuah link aktif
    // Ini menangani kasus rute tunggal dan rute dengan awalan wildcard
    const isActive = (routeToCheck, params = {}) => {
        // Mendapatkan URL penuh dari rute yang akan dicek
        let fullRouteUrl;
        try {
            // Menangani rute yang mungkin memiliki parameter (misal: incidents.track)
            if (Object.keys(params).length > 0) {
                fullRouteUrl = route(routeToCheck, params);
            } else {
                fullRouteUrl = route(routeToCheck);
            }
        } catch (e) {
            // Tangani jika rute tidak ditemukan (misal: karena params kosong untuk rute wajib)
            console.warn(`Route '${routeToCheck}' could not be resolved.`, e);
            return false;
        }

        // Jika rute adalah 'home', hanya cocok jika URL persis '/'
        if (routeToCheck === 'home') {
            return url === '/';
        }

        // Untuk rute lain, periksa apakah URL saat ini dimulai dengan URL rute yang dicek
        // Ini akan menangani '/articles' dan '/articles/123'
        // Menghapus domain dan protokol dari URL saat ini dan URL rute yang dicek
        const currentPath = new URL(url, window.location.origin).pathname;
        const checkPath = new URL(fullRouteUrl, window.location.origin).pathname;

        return currentPath.startsWith(checkPath);
    };


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
                        {
                            type: 'dropdown', // Menandai ini sebagai item dropdown
                            label: "About Us",
                            // Tambahkan rute untuk setiap link dropdown agar bisa dicek keaktifannya
                            links: [
                                { label: "Profil", route: "about-us.profil" },
                                { label: "Visi Misi", route: "about-us.visi-misi" },
                                { label: "Struktur Organisasi", route: "about-us.struktur-organisasi" },
                                { label: "FAQ", route: "about-us.faq" },
                            ]
                        },
                        { label: "Artikel", route: "public.articles" },
                        { label: "Panduan", route: "public.guides" },
                        { label: "Lapor Insiden", route: "incidents.create" },
                        { label: "Tracking Tiket", route: "incidents.track", params: { ticket: "" } },
                        { label: "Kontak", route: "public.contact" },
                    ].map((item, index) => {
                        // Periksa apakah item saat ini aktif atau salah satu link di dropdown aktif
                        let itemIsActive = false;
                        if (item.type === 'dropdown') {
                            itemIsActive = item.links.some(link => isActive(link.route, link.params));
                        } else {
                            itemIsActive = isActive(item.route, item.params);
                        }

                        // Kelas dasar untuk semua item navigasi (Link atau tombol dropdown)
                        const baseClass = `relative px-3 py-2 rounded-md transition-all duration-200 focus:outline-none flex items-center group
                            ${itemIsActive ? 'font-bold text-lg' : 'hover:bg-white/10 text-sm'}`; // Huruf lebih besar & tebal jika aktif

                        // Underline animasi
                        const animatedUnderline = (
                            <span className={`absolute left-0 bottom-0 h-0.5 bg-white transition-all duration-300
                                ${itemIsActive ? 'w-full' : 'w-0 group-hover:w-full'}`} />
                        );

                        // Logika rendering dropdown
                        if (item.type === 'dropdown') {
                            return (
                                <div key={index} className="relative inline-flex items-center">
                                    <Dropdown>
                                        <Dropdown.Trigger>
                                            <span className="inline-flex rounded-md">
                                                <button
                                                    type="button"
                                                    className={baseClass + ` inline-flex`} // Tambahkan inline-flex untuk panah
                                                >
                                                    {item.label}
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
                                                    {animatedUnderline}
                                                </button>
                                            </span>
                                        </Dropdown.Trigger>

                                        <Dropdown.Content>
                                            {item.links.map((link, linkIndex) => (
                                                <Dropdown.Link
                                                    key={linkIndex}
                                                    href={route(link.route, link.params)} // Pastikan params diteruskan
                                                    className={`${isActive(link.route, link.params) ? 'bg-gray-100 font-semibold' : ''}`}
                                                >
                                                    {link.label}
                                                </Dropdown.Link>
                                            ))}
                                        </Dropdown.Content>
                                    </Dropdown>
                                </div>
                            );
                        }

                        // Logika rendering tautan biasa
                        return (
                            <Link
                                key={index}
                                href={route(item.route, item.params)}
                                className={baseClass}
                            >
                                {item.label}
                                {animatedUnderline}
                            </Link>
                        );
                    })}
                </nav>
            </div>
        </header>
    );
}