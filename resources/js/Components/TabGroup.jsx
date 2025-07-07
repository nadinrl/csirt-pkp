import React from 'react';

export default function TabGroup({ tabs, active, onChange }) {
    return (
        <div className="flex gap-2 border-b">
            {Object.entries(tabs).map(([key, label]) => (
                <button
                    key={key}
                    type="button"
                    onClick={() => onChange(key)}
                    className={`px-4 py-2 text-sm font-medium border-b-2 ${active === key ? 'border-blue-600 text-blue-600' : 'border-transparent text-gray-600 hover:text-blue-500'}`}
                >
                    {label}
                </button>
            ))}
        </div>
    );
}
