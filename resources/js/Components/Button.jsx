import { Link, useForm } from '@inertiajs/react';
import {
    IconArrowBack,
    IconCheck,
    IconPencilCog,
    IconPlus,
    IconTrash,
    IconTools,
} from '@tabler/icons-react';
import React from 'react';
import Swal from 'sweetalert2';

export default function Button({
    type = 'submit',
    url = '#',
    className = '',
    children,
    icon = null,
    label = '',
    onClick,
    ...props
}) {
    const { delete: destroy } = useForm();

    const handleDeleteData = () => {
        Swal.fire({
            title: 'Yakin ingin menghapus data ini?',
            text: 'Data tidak dapat dikembalikan!',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#e11d48',
            cancelButtonColor: '#94a3b8',
            confirmButtonText: 'Ya, hapus',
            cancelButtonText: 'Batal',
        }).then((result) => {
            if (result.isConfirmed) {
                destroy(url);
                Swal.fire({
                    title: 'Berhasil!',
                    text: 'Data berhasil dihapus.',
                    icon: 'success',
                    showConfirmButton: false,
                    timer: 1500,
                });
            }
        });
    };

    const variants = {
        add: {
            element: Link,
            defaultLabel: 'Tambah Data',
            defaultIcon: <IconPlus size={18} strokeWidth={1.5} />,
            defaultClass:
                'px-4 py-2 text-sm rounded-lg border border-gray-300 bg-white text-gray-700 hover:bg-gray-100 flex items-center gap-2',
        },
        submit: {
            element: 'button',
            defaultLabel: 'Simpan',
            defaultIcon: <IconCheck size={16} strokeWidth={1.5} />,
            defaultClass:
                'px-4 py-2 text-sm rounded-lg border border-teal-100 bg-teal-50 text-teal-600 hover:bg-teal-100 flex items-center gap-2',
        },
        cancel: {
            element: Link,
            defaultLabel: 'Kembali',
            defaultIcon: <IconArrowBack size={16} strokeWidth={1.5} />,
            defaultClass:
                'px-4 py-2 text-sm rounded-lg border border-rose-100 bg-rose-50 text-rose-500 hover:bg-rose-100 flex items-center gap-2',
        },
        edit: {
            element: Link,
            defaultIcon: <IconPencilCog size={16} strokeWidth={1.5} />,
            defaultClass:
                'px-3 py-2 rounded-lg bg-orange-50 text-orange-500 hover:bg-orange-100 transition',
        },
        delete: {
            element: 'button',
            defaultIcon: <IconTrash size={18} strokeWidth={1.5} />,
            defaultClass:
                'px-3 py-2 rounded-lg bg-rose-50 text-rose-500 hover:bg-rose-100 transition',
            defaultAction: () => handleDeleteData(),
        },
        modal: {
            element: 'button',
            defaultClass:
                'px-4 py-2 text-sm rounded-lg border bg-white hover:bg-slate-100 flex items-center gap-2',
        },
        info: {
            element: Link,
            defaultIcon: <IconTools size={16} strokeWidth={1.5} />,
            defaultClass:
                'px-3 py-2 rounded-lg bg-sky-50 text-sky-600 hover:bg-sky-100 transition text-sm',
        },
    };

    const variant = variants[type];
    if (!variant) return null;

    const Element = variant.element;
    const contentIcon = icon ?? variant.defaultIcon;
    const contentLabel = label || variant.defaultLabel;

    const isLink = Element === Link;

    const handleClick =
        type === 'delete'
            ? onClick ?? variant.defaultAction
            : onClick;

    const elementProps = {
        ...props,
        className: `${variant.defaultClass} ${className}`,
        ...(isLink ? { href: url } : {}),
        ...(Element === 'button' ? { onClick: handleClick } : {}),
        ...(type === 'submit' ? { type: 'submit' } : {}),
        children:
            children ??
            (contentIcon || contentLabel ? (
                <span className="flex items-center gap-2">
                    {contentIcon}
                    {contentLabel && <span className="hidden lg:inline">{contentLabel}</span>}
                </span>
            ) : null),
    };

    return <Element {...elementProps} />;
}
