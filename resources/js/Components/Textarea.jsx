import React from 'react';

export default function Textarea({
    label,
    value = '',
    onChange,
    name,
    rows = 4,
    placeholder = '',
    className = '',
    errors,
    required = false,
    disabled = false,
    ...props
}) {
    return (
        <div className="flex flex-col gap-1.5">
            {label && (
                <label className="text-sm text-gray-700 font-medium">
                    {label}
                </label>
            )}
            <textarea
                name={name}
                value={value ?? ''}
                onChange={onChange}
                rows={rows}
                placeholder={placeholder}
                required={required}
                disabled={disabled}
                className={`w-full px-4 py-2 border text-sm rounded-md bg-white text-gray-700 focus:outline-none focus:border-blue-400 border-gray-300 ${
                    errors ? 'border-red-500' : ''
                } ${className}`}
                {...props}
            />
            {errors && <small className="text-xs text-red-500">{errors}</small>}
        </div>
    );
}
