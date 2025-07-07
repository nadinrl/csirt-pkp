import React, { useState } from "react";
import { Head, Link, usePage } from "@inertiajs/react";
import PublicHeader from "@/Components/PublicHeader";
import PublicFooter from "@/Components/PublicFooter";

export default function TrackResult() {
    const { incident } = usePage().props;
    const [copied, setCopied] = useState(false);

    const handleCopy = () => {
        navigator.clipboard.writeText(incident.ticket_number);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    return (
        <>
            <Head title={`Status Tiket: ${incident.ticket_number}`} />
            <PublicHeader />

            <main className="max-w-4xl mx-auto px-4 py-12 space-y-10">
                {/* Nomor Tiket */}
                <section className="bg-white border-l-4 border-red-600 p-6 shadow-md rounded-md">
                    <p className="text-sm text-slate-600 mb-1">Nomor Tiket Anda:</p>
                    <div className="flex items-center justify-between flex-wrap gap-2">
                        <h1 className="text-2xl font-bold text-red-600 tracking-widest">
                            {incident.ticket_number}
                        </h1>
                        <button
                            onClick={handleCopy}
                            className="text-sm bg-gray-100 hover:bg-gray-200 border border-gray-300 px-3 py-1 rounded text-slate-700 transition"
                        >
                            {copied ? "📋 Tersalin!" : "Salin Nomor Tiket"}
                        </button>
                    </div>
                    <p className="text-sm text-slate-700 mt-3">
                        💡 <strong>Catat dan simpan</strong> nomor tiket ini untuk melakukan pelacakan insiden di kemudian hari.
                    </p>
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
                </section>

                {/* Timeline Respons */}
                <section className="space-y-6">
                    <h2 className="text-lg font-semibold text-slate-800">🛡️ Riwayat Respons CSIRT</h2>

                    {incident.responses.length === 0 ? (
                        <p className="text-slate-500 text-sm">Belum ada respons dari tim CSIRT.</p>
                    ) : (
                        <div className="relative border-l-2 border-red-600 pl-6">
                            {incident.responses.map((res, index) => (
                                <div key={res.id} className="relative pb-8">
                                    <span className="absolute -left-3 top-1 w-5 h-5 bg-red-600 rounded-full ring-4 ring-white"></span>
                                    <div className="bg-white border border-slate-200 p-4 rounded-md shadow-sm">
                                        <p className="text-slate-700 whitespace-pre-line">{res.response}</p>
                                        <div className="text-xs text-slate-500 mt-2">
                                            Direspons oleh <strong>{res.responder_name}</strong> pada {new Date(res.created_at).toLocaleString()}
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
        </>
    );
}
