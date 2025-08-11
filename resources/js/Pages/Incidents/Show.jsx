import React, { useState, useEffect } from "react";
import { Head, Link, usePage, useForm } from "@inertiajs/react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import InputError from "@/Components/InputError";
import PrimaryButton from "@/Components/PrimaryButton";
import { IconArrowLeft } from '@tabler/icons-react';

export default function Show({ auth }) {
    const { incident, statuses } = usePage().props;

    const { data, setData, post, processing, errors, reset } = useForm({
        response: "",
        status: incident.status,
    });

    // Definisikan pesan default untuk setiap status
    const defaultMessages = {
        completed: "Laporan insiden telah berhasil diselesaikan. Detail penanganan dapat dilihat pada riwayat respons.",
        closed: "Laporan insiden telah ditutup. Terima kasih atas laporan Anda."
    };

    // Efek samping untuk mengatur pesan default saat status berubah
    useEffect(() => {
        const currentStatus = data.status;
        const currentResponse = data.response;

        // Cek apakah status saat ini adalah 'completed' atau 'closed'
        if (currentStatus === 'completed' || currentStatus === 'closed') {
            const expectedDefaultMessage = defaultMessages[currentStatus];

            // Jika response kosong, ATAU response saat ini adalah pesan default dari status LAIN,
            // maka set pesan default yang sesuai dengan status saat ini.
            if (currentResponse === "" ||
                (currentStatus === 'completed' && currentResponse === defaultMessages.closed) ||
                (currentStatus === 'closed' && currentResponse === defaultMessages.completed)
            ) {
                setData('response', expectedDefaultMessage);
            }
        } else {
            // Jika status BUKAN 'completed' atau 'closed',
            // dan response saat ini adalah salah satu dari pesan default, maka kosongkan response.
            if (currentResponse === defaultMessages.completed || currentResponse === defaultMessages.closed) {
                setData('response', '');
            }
        }
    }, [data.status]); // Bergantung pada perubahan data.status

    const submit = (e) => {
        e.preventDefault();

        // Kustomisasi validasi di frontend sebelum mengirim
        // Jika status adalah 'completed' atau 'closed', response tidak wajib
        const isResponseRequired = !(data.status === 'completed' || data.status === 'closed');

        if (isResponseRequired && data.response.trim() === "") {
            setData('errors', { ...errors, response: 'Isi Tanggapan wajib diisi untuk status ini.' });
            return;
        }

        // Hapus error response jika sebelumnya ada dan sekarang sudah valid
        if (!isResponseRequired && errors.response) {
            setData('errors', { ...errors, response: null });
        }


        post(route("incidents.responses.store", incident.id), {
            onSuccess: () => {
                reset("response");
            },
            preserveScroll: true, // Opsional: menjaga posisi scroll setelah submit
            preserveState: true, // Opsional: menjaga state form setelah submit (kecuali yang direset)
        });
    };

    // Fungsi helper untuk memformat status menjadi label yang mudah dibaca (untuk dropdown dan status saat ini)
    const formatStatusLabel = (statusKey) => {
        switch (statusKey) {
            case 'received': return 'Aduan Diterima';
            case 'in_progress': return 'Proses Aduan';
            case 'completed': return 'Selesai';
            case 'closed': return 'Ditutup';
            default: return statusKey;
        }
    };

    // Fungsi helper untuk memformat status untuk tampilan di riwayat tanggapan (lebih ringkas/bahasa Inggris)
    const formatResponseStatusLabel = (statusKey) => {
        switch (statusKey) {
            case 'received': return 'Received';
            case 'in_progress': return 'In Progress';
            case 'completed': return 'Completed';
            case 'closed': return 'Closed';
            default: return statusKey;
        }
    };

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={
                <h2 className="font-semibold text-xl text-gray-800 leading-tight">
                    Detail Insiden: {incident.ticket_number}
                </h2>
            }
        >
            <Head title={`Detail Insiden: ${incident.ticket_number}`} />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg p-6">
                        {/* Tombol kembali - Mengurangi margin-bottom */}
                        <Link
                            href={route('incidents.index')}
                            className="inline-flex items-center text-sm text-red-600 hover:underline transition mb-2"
                        >
                            <IconArrowLeft size={16} stroke={1.5} className="mr-1" />
                            Kembali ke Daftar Insiden
                        </Link>

                        {/* Detail Insiden - Mengurangi margin-top */}
                        <h1 className="text-2xl font-bold text-gray-900 mt-0 mb-4">
                            {incident.title}
                        </h1>
                        <p className="text-gray-700 whitespace-pre-line mb-6">
                            {incident.description}
                        </p>

                        {/* Menambahkan kotak untuk informasi insiden */}
                        <div className="bg-gray-50 border border-gray-200 rounded-md p-4 mb-6 shadow-sm">
                            <div className="grid md:grid-cols-2 gap-4 text-sm text-gray-600">
                                <div>
                                    <p><strong>Nomor Tiket:</strong> {incident.ticket_number}</p>
                                    <p><strong>Status Saat Ini:</strong> <span className={`font-semibold ${
                                        incident.status === 'received' ? 'text-blue-600' :
                                        incident.status === 'in_progress' ? 'text-orange-600' :
                                        incident.status === 'completed' ? 'text-green-600' :
                                        incident.status === 'closed' ? 'text-red-600' : 'text-gray-600'
                                    }`}>{formatStatusLabel(incident.status)}</span></p>
                                    <p><strong>Pelapor:</strong> {incident.reporter_name || 'Anonim'}</p>
                                    <p><strong>Email Pelapor:</strong> {incident.reporter_email || '-'}</p>
                                    <p><strong>Telepon Pelapor:</strong> {incident.reporter_phone || '-'}</p>
                                </div>
                                <div>
                                    <p><strong>Tanggal Lapor:</strong> {new Date(incident.created_at).toLocaleString()}</p>
                                    {incident.attachment && (
                                        <p className="mt-2">
                                            <a
                                                href={`/storage/${incident.attachment}`}
                                                target="_blank"
                                                className="text-blue-700 hover:underline"
                                            >
                                                📎 Unduh Lampiran Bukti
                                            </a>
                                        </p>
                                    )}
                                </div>
                            </div>
                        </div>

                        {/* Riwayat Tanggapan */}
                        <h3 className="text-xl font-semibold text-gray-800 mb-4">Riwayat Tanggapan</h3>
                        {incident.responses.length === 0 ? (
                            <p className="text-gray-500 text-sm">Belum ada tanggapan.</p>
                        ) : (
                            <div className="relative border-l-2 border-gray-300 ml-2 pl-6">
                                {incident.responses.map((res) => (
                                    <div key={res.id} className="relative pb-8">
                                        {/* Mengubah warna lingkaran berdasarkan status */}
                                        <span className={`absolute -left-3 top-1 w-5 h-5 rounded-full ring-4 ring-white
                                            ${res.status_at_response === 'received' ? 'bg-blue-500' : ''}
                                            ${res.status_at_response === 'in_progress' ? 'bg-orange-500' : ''}
                                            ${res.status_at_response === 'completed' ? 'bg-green-500' : ''}
                                            ${res.status_at_response === 'closed' ? 'bg-red-500' : ''}
                                            ${!res.status_at_response ? 'bg-gray-500' : ''} {/* Fallback for no status */}
                                        `}></span>
                                        <div className="bg-gray-50 border border-gray-200 p-4 rounded-md shadow-sm">
                                            <p className="text-gray-700 whitespace-pre-line">{res.response}</p>
                                            <div className="text-xs text-gray-500 mt-2">
                                                Direspons oleh <strong>{res.responder_name}</strong> pada {new Date(res.created_at).toLocaleString()}
                                                {res.status_at_response && (
                                                    <span className={`ml-2 px-2 py-0.5 rounded-full text-white text-xs font-semibold
                                                        ${res.status_at_response === 'received' ? 'bg-blue-500' : ''}
                                                        ${res.status_at_response === 'in_progress' ? 'bg-orange-500' : ''}
                                                        ${res.status_at_response === 'completed' ? 'bg-green-500' : ''}
                                                        ${res.status_at_response === 'closed' ? 'bg-red-500' : ''}
                                                    `}>
                                                        Status: {formatResponseStatusLabel(res.status_at_response)}
                                                    </span>
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}

                        {/* Tanggapi Insiden & Perbarui Status */}
                        <h3 className="text-xl font-semibold text-gray-800 mt-8 mb-4">Tanggapi Insiden</h3>
                        <form onSubmit={submit} className="space-y-4">
                            <div>
                                <label htmlFor="response" className="block text-sm font-medium text-gray-700">Isi Tanggapan</label>
                                <textarea
                                    id="response"
                                    name="response"
                                    value={data.response}
                                    onChange={(e) => setData("response", e.target.value)}
                                    className="mt-1 block w-full border-2 border-gray-400 rounded-md shadow-md focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                                    rows="4"
                                    placeholder="Tulis tanggapan Anda di sini..."
                                    // Atur required secara kondisional
                                    required={!(data.status === 'completed' || data.status === 'closed')}
                                ></textarea>
                                {/* Tampilkan error hanya jika ada dan response memang wajib */}
                                {errors.response && !(data.status === 'completed' || data.status === 'closed') && (
                                    <InputError message={errors.response} className="mt-2" />
                                )}
                            </div>

                            <div>
                                <label htmlFor="status" className="block text-sm font-medium text-gray-700">Perbarui Status</label>
                                <select
                                    id="status"
                                    name="status"
                                    value={data.status}
                                    onChange={(e) => setData("status", e.target.value)}
                                    className="mt-1 block w-full border-2 border-gray-400 rounded-md shadow-md focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                                >
                                    {statuses && statuses.map((statusOption) => (
                                        <option key={statusOption} value={statusOption}>
                                            {formatStatusLabel(statusOption)}
                                        </option>
                                    ))}
                                </select>
                                <InputError message={errors.status} className="mt-2" />
                            </div>

                            <div className="flex items-center gap-4">
                                <PrimaryButton disabled={processing} className="bg-red-600 hover:bg-red-700 active:bg-red-800 focus:ring-red-500">Kirim</PrimaryButton>
                                <button
                                    type="button"
                                    onClick={() => reset()}
                                    className="text-sm text-gray-600 hover:text-gray-900"
                                >
                                    Batal
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
