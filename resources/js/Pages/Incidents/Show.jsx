import React, { useState } from "react";
import { Head, useForm } from "@inertiajs/react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import Container from "@/Components/Container";
import Button from "@/Components/Button";

export default function IncidentShow({ auth, incident }) {
    const [showForm, setShowForm] = useState(false);
    const { data, setData, post, processing, reset } = useForm({
        response: "",
        new_status: "", // optional: in_progress or resolved
    });

    const submitResponse = (e) => {
        e.preventDefault();
        post(route("incidents.responses.store", incident.id), {
            preserveScroll: true,
            onSuccess: () => {
                reset();
                setShowForm(false);
            },
        });
    };

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={<h2 className="text-xl font-semibold text-slate-800">Detail Insiden</h2>}
        >
            <Head title={`Insiden - ${incident.title}`} />

            <Container>
                {/* Detail Insiden */}
                <div className="bg-white p-6 rounded shadow-sm mb-8 space-y-4">
                    <h1 className="text-2xl font-bold text-slate-900">{incident.title}</h1>
                    <div className="text-sm text-slate-500 space-y-1">
                        <p><strong>Nomor Tiket:</strong> {incident.ticket_number}</p>
                        <p><strong>Status:</strong> {incident.status}</p>
                        {incident.reporter_name && <p><strong>Pelapor:</strong> {incident.reporter_name}</p>}
                        {incident.reporter_email && <p><strong>Email:</strong> {incident.reporter_email}</p>}
                        {incident.reporter_phone && <p><strong>Telepon:</strong> {incident.reporter_phone}</p>}
                    </div>
                    <p className="text-slate-700 whitespace-pre-line">{incident.description}</p>

                    {incident.attachment && (
                        <a
                            href={`/storage/${incident.attachment}`}
                            target="_blank"
                            className="inline-block text-red-600 text-sm hover:underline mt-2"
                        >
                            📎 Lihat Lampiran
                        </a>
                    )}
                </div>

                {/* Riwayat Respons */}
                <div className="bg-white p-6 rounded shadow-sm mb-8">
                    <h2 className="text-lg font-semibold text-slate-800 mb-4">Riwayat Tanggapan</h2>
                    {incident.responses.length > 0 ? (
                        <ul className="space-y-4">
                            {incident.responses.map((res) => (
                                <li key={res.id} className="border-b pb-2">
                                    <p className="text-sm text-slate-700 whitespace-pre-line">{res.response}</p>
                                    <p className="text-xs text-slate-500 mt-1">
                                        Oleh {res.responder_name} pada {new Date(res.created_at).toLocaleString()}
                                    </p>
                                </li>
                            ))}
                        </ul>
                    ) : (
                        <p className="text-slate-500 text-sm">Belum ada tanggapan.</p>
                    )}
                </div>

                {/* Tambah Respons */}
                <div className="bg-white p-6 rounded shadow-sm">
                    <h2 className="text-lg font-semibold text-slate-800 mb-2">Tanggapi Insiden</h2>
                    {!showForm ? (
                        <Button onClick={() => setShowForm(true)}>+ Tambah Respons</Button>
                    ) : (
                        <form onSubmit={submitResponse} className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-slate-700 mb-1">Isi Tanggapan</label>
                                <textarea
                                    className="w-full border rounded p-3 text-sm"
                                    rows="4"
                                    placeholder="Tulis tanggapan Anda di sini..."
                                    value={data.response}
                                    onChange={(e) => setData("response", e.target.value)}
                                    required
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-slate-700 mb-1">Perbarui Status</label>
                                <select
                                    className="w-full border rounded p-2 text-sm"
                                    value={data.new_status}
                                    onChange={(e) => setData("new_status", e.target.value)}
                                >
                                    <option value="">-- Pilih --</option>
                                    <option value="in_progress">Diproses</option>
                                    <option value="resolved">Selesai</option>
                                </select>
                            </div>

                            <div className="flex items-center gap-2">
                                <Button type="submit" disabled={processing}>Kirim</Button>
                                <button
                                    type="button"
                                    className="text-sm text-red-600 hover:underline"
                                    onClick={() => {
                                        setShowForm(false);
                                        reset();
                                    }}
                                >
                                    Batal
                                </button>
                            </div>
                        </form>
                    )}
                </div>
            </Container>
        </AuthenticatedLayout>
    );
}
