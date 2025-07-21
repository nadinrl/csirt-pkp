import React from 'react';
import { Link } from '@inertiajs/react';
import { IconChevronRight, IconChevronLeft } from '@tabler/icons-react';

export default function Pagination({ links }) {
    const baseStyle =
        'px-3 py-1.5 text-sm border rounded-md transition text-slate-500 hover:bg-slate-100';

    const activeStyle =
        'bg-white border border-slate-300 text-slate-700 font-semibold';

    const disabledStyle =
        'px-3 py-1.5 text-sm rounded-md text-slate-300 bg-slate-50 cursor-not-allowed';

    return (
        <ul className="mt-4 flex items-center justify-center lg:justify-end gap-1 flex-wrap">
            {links.map((item, i) => {
                const isDisabled = item.url === null;

                if (item.label.includes('Previous')) {
                    return isDisabled ? (
                        <li key={i}>
                            <span className={disabledStyle} aria-label="Previous">
                                <IconChevronLeft size={20} strokeWidth={1.5} />
                            </span>
                        </li>
                    ) : (
                        <li key={i}>
                            <Link href={item.url} className={baseStyle} aria-label="Previous">
                                <IconChevronLeft size={20} strokeWidth={1.5} />
                            </Link>
                        </li>
                    );
                }

                if (item.label.includes('Next')) {
                    return isDisabled ? (
                        <li key={i}>
                            <span className={disabledStyle} aria-label="Next">
                                <IconChevronRight size={20} strokeWidth={1.5} />
                            </span>
                        </li>
                    ) : (
                        <li key={i}>
                            <Link href={item.url} className={baseStyle} aria-label="Next">
                                <IconChevronRight size={20} strokeWidth={1.5} />
                            </Link>
                        </li>
                    );
                }

                return (
                    <li key={i}>
                        <Link
                            href={item.url || '#'}
                            className={`${baseStyle} ${item.active ? activeStyle : ''}`}
                            dangerouslySetInnerHTML={{ __html: item.label }}
                            aria-current={item.active ? 'page' : undefined}
                        />
                    </li>
                );
            })}
        </ul>
    );
}
