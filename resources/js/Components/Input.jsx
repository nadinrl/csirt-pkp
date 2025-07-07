import React from 'react';

export default function Input({
    label,
    type = 'text',
    value = '',
    onChange,
    className = '',
    name,
    errors,
    required = false,
    disabled = false,
    placeholder = '',
    ...props
}) {
    return (
        <div className="flex flex-col gap-1.5">
            {label && (
                <label className="text-sm text-gray-700 font-medium">
                    {label}
                </label>
            )}
            <input
                type={type}
                name={name}
                value={value ?? ''}
                onChange={onChange}
                required={required}
                disabled={disabled}
                placeholder={placeholder}
                className={`w-full px-4 py-2 border text-sm rounded-md bg-white text-gray-700 focus:outline-none focus:ring-0 focus:border-blue-400 border-gray-300 ${
                    errors ? 'border-red-500' : ''
                } ${className}`}
                {...props}
            />
            {errors && <small className="text-xs text-red-500">{errors}</small>}
        </div>
    );
}
