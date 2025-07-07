import { useEffect, useState } from 'react';
import { Inertia } from '@inertiajs/inertia';
import { Link, usePage } from '@inertiajs/react';
import {
    UserCircleIcon,
    PowerIcon,
    ChevronDownIcon,
    Bars3Icon,
    XMarkIcon,
    ShieldCheckIcon,
    ChartBarIcon,
    DocumentTextIcon,
    PhotoIcon,
    Cog6ToothIcon,
    ClipboardDocumentCheckIcon,
} from '@heroicons/react/24/outline';
import ApplicationLogo from '@/Components/ApplicationLogo';
import Dropdown from '@/Components/Dropdown';
import NavLink from '@/Components/NavLink';
import PageLoader from '@/Components/PageLoader';
import PageOverlay from '@/Components/PageOverlay';
import hasAnyPermission from '@/Utils/Permissions';

export default function AuthenticatedLayout({ header, children }) {
    const { auth } = usePage().props;
    const user = auth.user;
    const [isLoading, setIsLoading] = useState(false);
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

    useEffect(() => {
        const startHandler = () => setIsLoading(true);
        const endHandler = () => setIsLoading(false);

        Inertia.on('start', startHandler);
        Inertia.on('finish', endHandler);
        Inertia.on('error', endHandler);

        return () => {
            
        };
    }, []);

    const isActiveRouteGroup = (prefixes) =>
        prefixes.some((prefix) => route().current(prefix));

    const navLinks = [
        {
            href: route('dashboard'),
            label: 'Dashboard',
            icon: null,
            current: route().current('dashboard'),
        },
        {
            href: route('sliders.index'),
            label: 'Slider',
            icon: <PhotoIcon className="w-4 h-4 inline mr-1" />,
            current: route().current('sliders.index'),
        },
        {
            href: route('articles.index'),
            label: 'Artikel',
            icon: <DocumentTextIcon className="w-4 h-4 inline mr-1" />,
            current: route().current('articles.index'),
        },
        {
            href: route('incidents.index'),
            label: 'Insiden',
            icon: <ClipboardDocumentCheckIcon className="w-4 h-4 inline mr-1" />,
            current: route().current('incidents.index'),
        },
        {
            href: route('guides.index'),
            label: 'Panduan',
            icon: <span className="mr-1">📘</span>,
            current: route().current('guides.index'),
        },
        {
            href: route('users.index'),
            label: 'Pengaturan',
            icon: <Cog6ToothIcon className="w-4 h-4 inline mr-1" />,
            current: route().current('users.index'),
        },
    ];

    return (
        <div className="min-h-screen bg-white text-slate-800 relative">
            <PageLoader isVisible={isLoading} />
            <PageOverlay isVisible={isLoading} />

            <nav className="bg-red-700 shadow-md text-white">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between items-center h-16">
                        <Link href="/" className="flex items-center gap-2 hover:opacity-90 transition-all duration-200">
                            <ApplicationLogo className="h-8 w-auto text-white" />
                            <span className="text-lg font-bold tracking-wide uppercase">CSIRT PKP</span>
                        </Link>

                        <div className="md:hidden">
                            <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)} className="focus:outline-none">
                                {mobileMenuOpen ? (
                                    <XMarkIcon className="h-6 w-6" />
                                ) : (
                                    <Bars3Icon className="h-6 w-6" />
                                )}
                            </button>
                        </div>

                        <div className="hidden md:flex items-center gap-3">
                            {navLinks.map(({ href, label, icon, current }) => (
                                <NavLink
                                    key={label}
                                    href={href}
                                    active={current}
                                    className="px-3 py-2 rounded-md hover:bg-red-600 transition-all duration-200"
                                >
                                    {icon} {label}
                                </NavLink>
                            ))}

                            {hasAnyPermission(['users index', 'roles index', 'permissions index']) && (
                                <Dropdown>
                                    <Dropdown.Trigger>
                                        <button
                                            className={`px-3 py-2 rounded-md inline-flex items-center gap-1 transition-all duration-200 ${
                                                isActiveRouteGroup(['users*', 'roles*', 'permissions*'])
                                                    ? 'bg-red-600'
                                                    : 'hover:bg-red-600'
                                            }`}
                                        >
                                            <ShieldCheckIcon className="w-4 h-4" /> Akses
                                            <ChevronDownIcon className="w-4 h-4" />
                                        </button>
                                    </Dropdown.Trigger>
                                    <Dropdown.Content align="left" contentClasses="bg-white py-2 text-sm text-gray-800 shadow-md">
                                        <Dropdown.Link href={route('users.index')}>Users</Dropdown.Link>
                                        <Dropdown.Link href={route('roles.index')}>Roles</Dropdown.Link>
                                        <Dropdown.Link href={route('permissions.index')}>Permissions</Dropdown.Link>
                                    </Dropdown.Content>
                                </Dropdown>
                            )}

                            <Dropdown>
                                <Dropdown.Trigger>
                                    <button className="inline-flex items-center gap-2 px-3 py-2 text-sm font-medium hover:text-gray-100 transition-all duration-200">
                                        <UserCircleIcon className="w-5 h-5" />
                                        {user.name}
                                        <ChevronDownIcon className="w-4 h-4" />
                                    </button>
                                </Dropdown.Trigger>
                                <Dropdown.Content>
                                    <Dropdown.Link href={route('profile.edit')}>
                                        <UserCircleIcon className="w-4 h-4 inline mr-1" /> Profil
                                    </Dropdown.Link>
                                    <Dropdown.Link href={route('logout')} method="post" as="button">
                                        <PowerIcon className="w-4 h-4 inline mr-1" /> Keluar
                                    </Dropdown.Link>
                                </Dropdown.Content>
                            </Dropdown>
                        </div>
                    </div>
                </div>

                {mobileMenuOpen && (
                    <div className="md:hidden px-4 py-2 bg-red-600 space-y-1">
                        {navLinks.map(({ href, label }) => (
                            <NavLink key={label} href={href} className="block px-3 py-2 hover:bg-red-500 rounded">
                                {label}
                            </NavLink>
                        ))}
                        <div className="border-t border-red-400 pt-2 mt-2">
                            <NavLink href={route('profile.edit')} className="block px-3 py-2 hover:bg-red-500 rounded">
                                Profil
                            </NavLink>
                            <NavLink
                                href={route('logout')}
                                method="post"
                                as="button"
                                className="block w-full text-left px-3 py-2 hover:bg-red-500 rounded"
                            >
                                Keluar
                            </NavLink>
                        </div>
                    </div>
                )}
            </nav>

            {header && (
                <header className="bg-red-50 border-b border-red-200 shadow-sm">
                    <div className="max-w-7xl mx-auto px-4 py-4 sm:px-6 lg:px-8">
                        {header}
                    </div>
                </header>
            )}

            <main className="py-6 px-4 sm:px-6 lg:px-8 bg-white">{children}</main>
        </div>
    );
}
