import React from 'react';
import { Link } from '@inertiajs/react';

export default function Pagination({ links }) {
    const baseStyle =
        'min-w-[36px] min-h-[36px] px-3 py-1.5 text-sm border rounded-md transition';

    const activeStyle =
        'bg-red-600 text-white border-red-600 font-semibold';

    const normalStyle =
        'text-slate-600 border-slate-300 hover:bg-red-600 hover:text-white hover:border-red-600';

    const disabledStyle =
        'text-slate-300 bg-slate-100 border-slate-200 cursor-not-allowed';

    return (
        <ul className="mt-6 flex items-center justify-center lg:justify-end gap-2 flex-wrap">
            {links.map((item, i) => {
                const isDisabled = item.url === null;
                const isActive = item.active;
                const label = item.label.includes('Previous')
                    ? 'Prev'
                    : item.label.includes('Next')
                    ? 'Next'
                    : item.label;

                if (isDisabled) {
                    return (
                        <li key={i}>
                            <span className={`${baseStyle} ${disabledStyle}`}>{label}</span>
                        </li>
                    );
                }

                return (
                    <li key={i}>
                        <Link
                            href={item.url}
                            className={`${baseStyle} ${isActive ? activeStyle : normalStyle}`}
                            aria-current={isActive ? 'page' : undefined}
                            preserveScroll
                            preserveState
                        >
                            {label}
                        </Link>
                    </li>
                );
            })}
        </ul>
    );
}
