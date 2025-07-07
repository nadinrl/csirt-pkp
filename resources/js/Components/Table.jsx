import React from 'react';

const Card = ({ title, className = '', children }) => {
    return (
        <div className={`bg-white border rounded-lg shadow-sm overflow-hidden ${className}`}>
            <div className="p-4 border-b bg-slate-50">
                <h3 className="text-sm font-semibold text-slate-700 uppercase flex items-center gap-2">
                    {title}
                </h3>
            </div>
            <div className="bg-white">{children}</div>
        </div>
    );
};

const Table = ({ children }) => {
    return (
        <div className="w-full overflow-x-auto">
            <table className="min-w-full text-sm text-slate-700">{children}</table>
        </div>
    );
};

const Thead = ({ className = '', children }) => {
    return (
        <thead className={`bg-slate-100 text-slate-600 border-b text-sm font-medium ${className}`}>
            {children}
        </thead>
    );
};

const Tbody = ({ className = '', children }) => {
    return (
        <tbody className={`bg-white divide-y divide-slate-100 ${className}`}>{children}</tbody>
    );
};

const Th = ({ className = '', children }) => {
    return (
        <th
            scope="col"
            className={`px-4 py-3 text-left align-middle font-semibold whitespace-nowrap ${className}`}
        >
            {children}
        </th>
    );
};

const Td = ({ className = '', children }) => {
    return (
        <td
            className={`px-4 py-3 text-left align-middle whitespace-nowrap text-slate-700 ${className}`}
        >
            {children}
        </td>
    );
};

const Empty = ({ colSpan, message, children }) => {
    return (
        <tr>
            <td colSpan={colSpan}>
                <div className="h-64 flex flex-col justify-center items-center text-slate-400">
                    <div className="text-4xl">{children}</div>
                    <p className="mt-4 text-sm">{message}</p>
                </div>
            </td>
        </tr>
    );
};

Table.Card = Card;
Table.Thead = Thead;
Table.Tbody = Tbody;
Table.Th = Th;
Table.Td = Td;
Table.Empty = Empty;

export default Table;
