import React, { useState } from "react";
import { Head, Link, usePage } from "@inertiajs/react";
import PublicHeader from "@/Components/PublicHeader";
import PublicFooter from "@/Components/PublicFooter";
import { IconX, IconFileDownload } from '@tabler/icons-react'; // Import IconX and IconFileDownload

export default function TrackResult() {
    const { incident } = usePage().props;
    const [copied, setCopied] = useState(false);
    // State untuk lightbox tidak diperlukan lagi untuk PDF
    const [lightboxOpen, setLightboxOpen] = useState(false);
    const [lightboxContent, setLightboxContent] = useState(null);

    // Fungsi untuk membuka lightbox (hanya untuk gambar)
    const openLightbox = (contentSrc, contentType) => {
        setLightboxContent({ src: contentSrc, type: contentType });
        setLightboxOpen(true);
    };

    // Fungsi untuk menutup lightbox
    const closeLightbox = () => {
        setLightboxOpen(false);
        setLightboxContent(null);
    };

    // Logika untuk menentukan jenis file dan URL-nya
    const attachmentUrl = incident.attachment ? `/storage/${incident.attachment}` : null;
    const fileExtension = attachmentUrl ? attachmentUrl.split(".").pop().toLowerCase() : null;
    const isImage = ["jpg", "jpeg", "png"].includes(fileExtension);
    const isPdf = fileExtension === "pdf";
    const isDoc = ["doc", "docx"].includes(fileExtension);

    const STATUS_STEPS = [
        {
            label: "Aduan Diterima",
            statusKey: "received",
            icon: (
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 0 0-3.375-3.375h-1.5A1.125 1.125 0 0 1 13.5 7.125v-1.5a3.375 3.375 0 0 0-3.375-3.375H8.25m5.231 13.481L15 17.25m-4.5-15H5.625c-.621 0-1.125.504-1.125 1.125v16.5c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25m-4.5 4.5v2.25m-2.25 0v-2.25m-2.25 0v2.25M19.5 18H1.5" />
                </svg>
            ),
        },
        {
            label: "Proses Aduan",
            statusKey: "in_progress",
            icon: (
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 6h9.75M10.5 6a1.5 1.5 0 1 1-3 0m3 0a1.5 1.5 0 1 0-3 0M3.75 6H7.5m3 12h9.75m-9.75 0a1.5 1.5 0 1 1-3 0m3 0a1.5 1.5 0 1 0-3 0M3.75 18H7.5m3-6h9.75m-9.75 0a1.5 1.5 0 1 1-3 0m3 0a1.5 1.5 0 1 0-3 0M3.75 12H7.5" />
                </svg>
            ),
        },
        {
            label: "Selesai",
            statusKey: "completed",
            icon: (
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75 11.25 15 15 9.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                </svg>
            ),
        },
        {
            label: "Ditutup",
            statusKey: "closed",
            icon: (
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 10.5V6.75a4.5 4.5 0 1 0-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 0 0 2.25-2.25v-6.75a2.25 2.25 0 0 0-2.25-2.25H6.75a2.25 2.25 0 0 0-2.25 2.25v6.75a2.25 2.25 0 0 0 2.25 2.25Z" />
                </svg>
            ),
        },
    ];

    const currentStatusIndex = STATUS_STEPS.findIndex(
        (step) => step.statusKey === incident.status
    );

    const handleCopy = () => {
        const tempInput = document.createElement('textarea');
        tempInput.value = incident.ticket_number;
        document.body.appendChild(tempInput);
        tempInput.select();
        try {
            document.execCommand('copy');
            setCopied(true);
        } catch (err) {
            console.error('Failed to copy text: ', err);
        }
        document.body.removeChild(tempInput);
        setTimeout(() => setCopied(false), 2000);
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

    return (
        <>
            <Head title={`Status Tiket: ${incident.ticket_number}`} />
            <PublicHeader />

            <main className="max-w-4xl mx-auto px-4 py-12 space-y-10 font-inter">
                {/* Nomor Tiket */}
                <section className="bg-white border-l-4 border-red-600 p-6 shadow-md rounded-md">
                    <p className="text-sm text-slate-600 mb-1">Nomor Tiket Anda:</p>
                    <div className="flex items-center justify-between flex-wrap gap-2">
                        <h1 className="text-2xl font-bold text-red-600 tracking-widest">
                            {incident.ticket_number}
                        </h1>
                        <button
                            onClick={handleCopy}
                            className="text-sm bg-gray-100 hover:bg-gray-200 border border-gray-300 px-3 py-1 rounded-md text-slate-700 transition duration-200 ease-in-out shadow-sm"
                        >
                            {copied ? "📋 Tersalin!" : "Salin Nomor Tiket"}
                        </button>
                    </div>
                    <p className="text-sm text-slate-700 mt-3">
                        💡 <strong>Catat dan simpan</strong> nomor tiket ini untuk melakukan pelacakan insiden di kemudian hari.
                    </p>
                </section>

                {/* Tracking Status (Progress Bar) */}
                <section className="bg-white p-6 shadow-md rounded-md">
                    <h2 className="text-lg font-semibold text-slate-800 mb-6">Progress Laporan Anda</h2>
                    <div className="flex items-center justify-between relative">
                        {STATUS_STEPS.map((step, index) => {
                            const isActive = index <= currentStatusIndex;
                            const isLastStep = index === STATUS_STEPS.length - 1;

                            return (
                                <React.Fragment key={step.statusKey}>
                                    <div className="flex flex-col items-center z-10">
                                        <div
                                            className={`w-12 h-12 rounded-full flex items-center justify-center transition-all duration-300 ease-in-out
                                                ${isActive ? "bg-green-500 text-white shadow-lg" : "bg-gray-200 text-gray-600 border-2 border-gray-300"}`}
                                        >
                                            {step.icon}
                                        </div>
                                        <p className={`text-center text-xs mt-2 font-medium ${isActive ? "text-green-700" : "text-gray-600"} w-24`}>
                                            {step.label}
                                        </p>
                                    </div>
                                    {!isLastStep && (
                                        <div
                                            className={`flex-1 h-0.5 transition-all duration-300 ease-in-out mx-2
                                                ${isActive ? "bg-green-500" : "bg-gray-300"}`}
                                        ></div>
                                    )}
                                </React.Fragment>
                            );
                        })}
                    </div>
                </section>

                {/* Informasi Insiden */}
                <section className="bg-white border border-slate-200 shadow-sm rounded-md p-6 space-y-4">
                    <h2 className="text-lg font-semibold text-slate-800 mb-2">📄 Rincian Laporan Insiden</h2>

                    <div className="space-y-2">
                        <p className="text-xl font-semibold text-[#0f172a]">{incident.title}</p>
                        <p className="text-slate-700 whitespace-pre-line">{incident.description}</p>
                    </div>

                    <div className="grid md:grid-cols-2 gap-4 text-sm text-slate-600 mt-4">
                        <div>
                            <p><strong>Pelapor:</strong> {incident.reporter_name || 'Anonim'}</p>
                            <p><strong>Email:</strong> {incident.reporter_email || '-'}</p>
                            <p><strong>Telepon:</strong> {incident.reporter_phone || '-'}</p>
                        </div>
                        <div>
                            <p><strong>Tanggal Lapor:</strong> {new Date(incident.created_at).toLocaleString()}</p>
                            {incident.attachment && (
                                <div className="mt-2 space-y-2">
                                    <p className="font-semibold text-slate-700">Lampiran Bukti:</p>
                                    {/* Preview Gambar */}
                                    {isImage && (
                                        <div className="border border-slate-300 rounded-md p-2 max-w-sm">
                                            <img
                                                src={attachmentUrl}
                                                alt="Preview Lampiran"
                                                className="max-h-48 w-auto rounded-md cursor-pointer mx-auto"
                                                onClick={() => openLightbox(attachmentUrl, 'image')}
                                            />
                                            <p className="text-center text-xs mt-2 text-slate-500">Klik untuk melihat lebih besar</p>
                                        </div>
                                    )}

                                    {/* Preview Dokumen (PDF) */}
                                    {isPdf && (
                                        <div className="flex items-center gap-2">
                                            <a
                                                href={attachmentUrl}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="text-blue-700 hover:underline flex items-center gap-1"
                                            >
                                                <svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-file-text" width="24" height="24" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M14 3v4a1 1 0 0 0 1 1h4" /><path d="M17 21h-10a2 2 0 0 1 -2 -2v-14a2 2 0 0 1 2 -2h7l5 5v11a2 2 0 0 1 -2 2z" /><path d="M9 9l1 0" /><path d="M9 13l6 0" /><path d="M9 17l6 0" /></svg>
                                                Lihat Dokumen
                                            </a>
                                        </div>
                                    )}

                                    {/* Tombol Unduh untuk semua tipe file */}
                                    {attachmentUrl && (
                                        <div className="mt-2">
                                            <a
                                                href={attachmentUrl}
                                                download
                                                className="text-slate-700 hover:text-slate-900 flex items-center gap-1"
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
                </section>

                {/* Riwayat Respons */}
                <section className="space-y-6">
                    <h2 className="text-lg font-semibold text-slate-800">🛡️ Riwayat Respons CSIRT</h2>

                    {incident.responses.length === 0 ? (
                        <p className="text-slate-500 text-sm">Belum ada respons dari tim CSIRT.</p>
                    ) : (
                        <div className="relative border-l-2 border-red-600 pl-6">
                            {incident.responses.map((res) => (
                                <div key={res.id} className="relative pb-8">
                                    <span className={`absolute -left-3 top-1 w-5 h-5 rounded-full ring-4 ring-white
                                        ${res.status_at_response === 'received' ? 'bg-blue-500' : ''}
                                        ${res.status_at_response === 'in_progress' ? 'bg-orange-500' : ''}
                                        ${res.status_at_response === 'completed' ? 'bg-green-500' : ''}
                                        ${res.status_at_response === 'closed' ? 'bg-red-500' : ''}
                                        ${!res.status_at_response ? 'bg-gray-500' : ''}
                                    `}></span>
                                    <div className="bg-white border border-slate-200 p-4 rounded-md shadow-sm">
                                        <p className="text-slate-700 whitespace-pre-line">{res.response}</p>
                                        <div className="text-xs text-slate-500 mt-2">
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
                </section>

                {/* Navigasi */}
                <div className="pt-4">
                    <Link
                        href={route("incidents.track", { ticket: "" })}
                        className="text-sm text-red-600 hover:underline"
                    >
                        ← Lacak tiket lainnya
                    </Link>
                </div>
            </main>

            <PublicFooter />
            
            {/* Lightbox Modal (Sekarang hanya untuk gambar) */}
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
                    </div>
                </div>
            )}
        </>
    );
}