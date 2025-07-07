import { useForm } from '@inertiajs/react';
import { IconSearch } from '@tabler/icons-react';
import React from 'react';

export default function Search({ url, placeholder }) {
    const { data, setData, get } = useForm({
        search: '',
    });

    const handleSearchData = (e) => {
        e.preventDefault();
        get(`${url}?search=${encodeURIComponent(data.search)}`);
    };

    return (
        <form onSubmit={handleSearchData} className="w-full">
            <div className="relative">
                <input
                    type="text"
                    value={data.search}
                    onChange={(e) => setData('search', e.target.value)}
                    className="w-full rounded-lg border border-slate-300 bg-white py-2.5 px-4 pr-10 text-sm text-slate-700 shadow-sm placeholder-slate-400 focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500"
                    placeholder={placeholder}
                    aria-label="Search input"
                />
                <button
                    type="submit"
                    className="absolute inset-y-0 right-0 flex items-center pr-3 text-slate-500 hover:text-indigo-600"
                    aria-label="Search"
                >
                    <IconSearch size={18} strokeWidth={1.5} />
                </button>
            </div>
        </form>
    );
}
