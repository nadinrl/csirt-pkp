import React from 'react';

export default function Select({
    label,
    value = '',
    onChange,
    options = [],
    name,
    errors,
    required = false,
    disabled = false,
    placeholder = 'Pilih opsi...',
    className = '',
}) {
    return (
        <div className="flex flex-col gap-1.5">
            {label && (
                <label className="text-sm text-gray-700 font-medium">
                    {label}
                </label>
            )}
            <select
                name={name}
                value={value}
                onChange={onChange}
                required={required}
                disabled={disabled}
                className={`w-full px-3 py-2 border rounded-md text-sm shadow-sm bg-white text-gray-700 focus:outline-none focus:border-blue-400 ${
                    errors ? 'border-red-500' : 'border-gray-300'
                } ${className}`}
            >
                <option value="" disabled>
                    {placeholder}
                </option>
                {options.map((option, idx) => (
                    <option key={idx} value={option.value}>
                        {option.label}
                    </option>
                ))}
            </select>
            {errors && <small className="text-xs text-red-500">{errors}</small>}
        </div>
    );
}
