import Dropdown from '@/Components/Dropdown';
import React, { useState } from "react";
import { Link, usePage } from "@inertiajs/react";

export default function PublicHeader() {
    const { url } = usePage();
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const isActive = (routeToCheck, params = {}) => {
        let fullRouteUrl;
        try {
            if (Object.keys(params).length > 0) {
                fullRouteUrl = route(routeToCheck, params);
            } else {
                fullRouteUrl = route(routeToCheck);
            }
        } catch (e) {
            console.warn(`Route '${routeToCheck}' could not be resolved.`, e);
            return false;
        }

        if (routeToCheck === 'home') {
            return url === '/';
        }

        const currentPath = new URL(url, window.location.origin).pathname;
        const checkPath = new URL(fullRouteUrl, window.location.origin).pathname;

        return currentPath.startsWith(checkPath);
    };

    const handleLinkClick = () => {
        setIsMenuOpen(false);
    };

    return (
        <header className="bg-[#dc2626] text-white py-4 shadow-md sticky top-0 z-50">
            <div className="container mx-auto px-4 lg:px-6 flex flex-wrap items-center justify-between relative">
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

                {/* Hamburger Button (hanya terlihat di layar kecil) */}
                <button
                    onClick={() => setIsMenuOpen(!isMenuOpen)}
                    className="lg:hidden p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-white z-50"
                    aria-label="Toggle navigation"
                >
                    <span className={`block w-6 h-0.5 bg-white transition-all duration-300 ease-in-out ${isMenuOpen ? 'transform rotate-45 translate-y-2' : ''}`}></span>
                    <span className={`block w-6 h-0.5 bg-white transition-all duration-300 ease-in-out mt-1.5 ${isMenuOpen ? 'opacity-0' : ''}`}></span>
                    <span className={`block w-6 h-0.5 bg-white transition-all duration-300 ease-in-out mt-1.5 ${isMenuOpen ? 'transform -rotate-45 -translate-y-2' : ''}`}></span>
                </button>

                {/* Navigasi Utama */}
                <nav className={`
                    text-sm font-medium
                    ${isMenuOpen
                        ? 'flex flex-col absolute top-full left-0 w-full bg-[#dc2626] shadow-lg py-4 transition-all duration-300 ease-in-out space-y-2 **items-center**' // <-- PERUBAHAN DI SINI
                        : 'hidden lg:flex lg:flex-row lg:static lg:w-auto lg:bg-transparent lg:shadow-none lg:py-0 lg:gap-4'
                    }
                `}>
                    {[
                        { label: "Beranda", route: "home" },
                        {
                            type: 'dropdown',
                            label: "About Us",
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
                        let itemIsActive = false;
                        if (item.type === 'dropdown') {
                            itemIsActive = item.links.some(link => isActive(link.route, link.params));
                        } else {
                            itemIsActive = isActive(item.route, item.params);
                        }

                        // Kelas dasar untuk semua item navigasi (Link atau tombol dropdown)
                        const baseClass = `relative px-3 py-2 rounded-md transition-all duration-200 focus:outline-none flex items-center group
                            ${itemIsActive ? 'font-bold text-lg' : 'hover:bg-white/10 text-sm'}
                            ${isMenuOpen ? 'w-full justify-center py-3' : ''}
                        `;

                        // Underline animasi
                        const animatedUnderline = (
                            <span className={`absolute left-0 bottom-0 h-0.5 bg-white transition-all duration-300
                                ${itemIsActive ? 'w-full' : 'w-0 group-hover:w-full'}`} />
                        );

                        if (item.type === 'dropdown') {
                            return (
                                <div key={index} className="relative items-center w-full lg:w-auto">
                                    <Dropdown>
                                        <Dropdown.Trigger>
                                            <button
                                                type="button"
                                                className={`
                                                    ${baseClass}
                                                    ${!isMenuOpen ? 'inline-flex justify-between' : ''}
                                                    lg:justify-start
                                                `}
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
                                        </Dropdown.Trigger>

                                        <Dropdown.Content>
                                            {item.links.map((link, linkIndex) => (
                                                <Dropdown.Link
                                                    key={linkIndex}
                                                    href={route(link.route, link.params)}
                                                    className={`${isActive(link.route, link.params) ? 'bg-gray-100 font-semibold' : ''}`}
                                                    onClick={handleLinkClick}
                                                >
                                                    {link.label}
                                                </Dropdown.Link>
                                            ))}
                                        </Dropdown.Content>
                                    </Dropdown>
                                </div>
                            );
                        }

                        return (
                            <Link
                                key={index}
                                href={route(item.route, item.params)}
                                className={baseClass}
                                onClick={handleLinkClick}
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