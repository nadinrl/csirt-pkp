import React, { useState, useEffect } from "react";
import { Head, Link, usePage, useForm } from "@inertiajs/react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import InputError from "@/Components/InputError";
import PrimaryButton from "@/Components/PrimaryButton";
import { IconArrowLeft, IconX, IconFileDownload } from '@tabler/icons-react';

export default function Show({ auth }) {
    const { incident, statuses } = usePage().props;

    const { data, setData, post, processing, errors, reset } = useForm({
        response: "",
        status: incident.status,
    });

    const [lightboxOpen, setLightboxOpen] = useState(false);
    const [lightboxContent, setLightboxContent] = useState(null);

    // Definisikan pesan default untuk setiap status
    const defaultMessages = {
        received: "Aduan diterima dan akan diproses oleh petugas.",
        in_progress: "Laporan insiden Anda telah kami terima dan saat ini sedang dalam tahap investigasi oleh tim teknis kami. Kami akan terus memberikan informasi terbaru terkait perkembangan penanganan insiden ini.",
        completed: "Laporan insiden telah berhasil diselesaikan. Detail penanganan dapat dilihat pada riwayat respons.",
        closed: "Laporan insiden telah ditutup. Terima kasih atas laporan Anda."
    };

    useEffect(() => {
        const currentStatus = data.status;
        const currentResponse = data.response;
        const defaultMessageForStatus = defaultMessages[currentStatus];
        
        // Cek jika status saat ini memiliki pesan default
        if (defaultMessageForStatus) {
            // Jika kolom respons kosong, isi dengan pesan default yang sesuai
            if (currentResponse === "" || Object.values(defaultMessages).includes(currentResponse)) {
                setData('response', defaultMessageForStatus);
            }
        } else {
            // Jika status tidak memiliki pesan default, kosongkan kolom respons
            if (Object.values(defaultMessages).includes(currentResponse)) {
                setData('response', '');
            }
        }
    }, [data.status]);

    const submit = (e) => {
        e.preventDefault();

        const isResponseRequired = !['completed', 'closed'].includes(data.status);

        if (isResponseRequired && data.response.trim() === "") {
            setData('errors', { ...errors, response: 'Isi Tanggapan wajib diisi untuk status ini.' });
            return;
        }

        if (!isResponseRequired && errors.response) {
            setData('errors', { ...errors, response: null });
        }

        post(route("incidents.responses.store", incident.id), {
            onSuccess: () => {
                reset("response");
            },
            preserveScroll: true,
            preserveState: true,
        });
    };

    const formatStatusLabel = (statusKey) => {
        switch (statusKey) {
            case 'received': return 'Aduan Diterima';
            case 'in_progress': return 'Proses Aduan';
            case 'completed': return 'Selesai';
            case 'closed': return 'Ditutup';
            default: return statusKey;
        }
    };

    const formatResponseStatusLabel = (statusKey) => {
        switch (statusKey) {
            case 'received': return 'Received';
            case 'in_progress': return 'In Progress';
            case 'completed': return 'Completed';
            case 'closed': return 'Closed';
            default: return statusKey;
        }
    };

    // Logika untuk menangani file lampiran
    const attachmentUrl = incident.attachment ? `/storage/${incident.attachment}` : null;
    const fileExtension = attachmentUrl ? attachmentUrl.split(".").pop().toLowerCase() : null;
    const isImage = ["jpg", "jpeg", "png"].includes(fileExtension);
    const isPdf = fileExtension === "pdf";

    // Fungsi untuk membuka dan menutup lightbox
    const openLightbox = (contentSrc, contentType) => {
        setLightboxContent({ src: contentSrc, type: contentType });
        setLightboxOpen(true);
    };
    const closeLightbox = () => {
        setLightboxOpen(false);
        setLightboxContent(null);
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
                        <Link
                            href={route('incidents.index')}
                            className="inline-flex items-center text-sm text-red-600 hover:underline transition mb-2"
                        >
                            <IconArrowLeft size={16} stroke={1.5} className="mr-1" />
                            Kembali ke Daftar Insiden
                        </Link>

                        <h1 className="text-2xl font-bold text-gray-900 mt-0 mb-4">
                            {incident.title}
                        </h1>
                        <p className="text-gray-700 whitespace-pre-line mb-6">
                            {incident.description}
                        </p>

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
                                        <div className="mt-2 space-y-2">
                                            <p className="font-semibold text-gray-700">Lampiran Bukti:</p>
                                            {isImage && (
                                                <div className="border border-gray-300 rounded-md p-2 max-w-sm">
                                                    <img
                                                        src={attachmentUrl}
                                                        alt="Preview Lampiran"
                                                        className="max-h-48 w-auto rounded-md cursor-pointer mx-auto"
                                                        onClick={() => openLightbox(attachmentUrl, 'image')}
                                                    />
                                                    <p className="text-center text-xs mt-2 text-gray-500">Klik untuk melihat lebih besar</p>
                                                </div>
                                            )}
                                            {isPdf && (
                                                <div className="flex items-center gap-2">
                                                    <button
                                                        type="button"
                                                        onClick={() => openLightbox(attachmentUrl, 'pdf')}
                                                        className="text-blue-700 hover:underline flex items-center gap-1"
                                                    >
                                                        <svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-file-text" width="24" height="24" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M14 3v4a1 1 0 0 0 1 1h4" /><path d="M17 21h-10a2 2 0 0 1 -2 -2v-14a2 2 0 0 1 2 -2h7l5 5v11a2 2 0 0 1 -2 2z" /><path d="M9 9l1 0" /><path d="M9 13l6 0" /><path d="M9 17l6 0" /></svg>
                                                        Lihat Dokumen
                                                    </button>
                                                </div>
                                            )}
                                            {(isImage || isPdf) && (
                                                <div className="mt-2">
                                                    <a
                                                        href={attachmentUrl}
                                                        download
                                                        className="text-gray-700 hover:text-gray-900 flex items-center gap-1"
                                                    >
                                                        <IconFileDownload size={20} />
                                                        Unduh Lampiran Bukti
                                                    </a>
                                                </div>
                                            )}
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>

                        <h3 className="text-xl font-semibold text-gray-800 mb-4">Riwayat Tanggapan</h3>
                        {incident.responses.length === 0 ? (
                            <p className="text-gray-500 text-sm">Belum ada tanggapan.</p>
                        ) : (
                            <div className="relative border-l-2 border-gray-300 ml-2 pl-6">
                                {incident.responses.map((res) => (
                                    <div key={res.id} className="relative pb-8">
                                        <span className={`absolute -left-3 top-1 w-5 h-5 rounded-full ring-4 ring-white
                                            ${res.status_at_response === 'received' ? 'bg-blue-500' : ''}
                                            ${res.status_at_response === 'in_progress' ? 'bg-orange-500' : ''}
                                            ${res.status_at_response === 'completed' ? 'bg-green-500' : ''}
                                            ${res.status_at_response === 'closed' ? 'bg-red-500' : ''}
                                            ${!res.status_at_response ? 'bg-gray-500' : ''}
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

                        <h3 className="text-xl font-semibold text-gray-800 mt-8 mb-4">Tanggapi Insiden</h3>
                        {incident.status === 'closed' ? (
                            <div className="p-4 bg-red-100 border border-red-400 text-red-700 rounded-md">
                                <p className="font-bold">Laporan aduan sudah ditutup.</p>
                            </div>
                        ) : (
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
                                        required={!['completed', 'closed'].includes(data.status)}
                                    ></textarea>
                                    {errors.response && !['completed', 'closed'].includes(data.status) && (
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
                        )}
                    </div>
                </div>
            </div>
            
            {/* Lightbox Modal */}
            {lightboxOpen && (
                <div
                    className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-75"
                    onClick={closeLightbox}
                >
                    <div className="relative p-4 bg-white rounded-lg shadow-xl max-w-3xl max-h-[90vh] overflow-auto" onClick={(e) => e.stopPropagation()}>
                        <button
                            onClick={closeLightbox}
                            className="absolute top-2 right-2 text-gray-800 hover:text-gray-600 p-1 rounded-full bg-white bg-opacity-75 hover:bg-opacity-100 transition-all duration-200"
                            title="Tutup"
                        >
                            <IconX size={24} stroke={2} />
                        </button>
                        {lightboxContent.type === 'image' && (
                            <img
                                src={lightboxContent.src}
                                alt="Gambar Diperbesar"
                                className="max-w-full max-h-full object-contain"
                            />
                        )}
                        {lightboxContent.type === 'pdf' && (
                            <iframe
                                src={lightboxContent.src}
                                className="w-[80vw] h-[80vh]"
                                title="PDF Viewer"
                            ></iframe>
                        )}
                    </div>
                </div>
            )}
        </AuthenticatedLayout>
    );
}