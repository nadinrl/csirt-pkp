import { Link } from '@inertiajs/react';

export default function NavLink({
    active = false,
    className = '',
    children,
    ...props
}) {
    const baseClasses =
        'inline-flex items-center px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200';
    const activeClasses =
        'bg-indigo-700 text-white shadow';
    const inactiveClasses =
        'text-white/80 hover:text-white hover:bg-indigo-600';

    return (
        <Link
            {...props}
            className={`${baseClasses} ${active ? activeClasses : inactiveClasses} ${className}`}
        >
            {children}
        </Link>
    );
}
