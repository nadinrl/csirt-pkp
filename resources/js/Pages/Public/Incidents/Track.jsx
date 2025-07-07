import React, { useState } from "react";
import { Head, router } from "@inertiajs/react";
import PublicHeader from "@/Components/PublicHeader";
import PublicFooter from "@/Components/PublicFooter";

export default function TrackIncident() {
    const [ticket, setTicket] = useState("");

    const handleTrack = (e) => {
        e.preventDefault();
        if (ticket.trim()) {
            router.visit(route("incidents.track", { ticket }));
        }
    };

    return (
        <>
            <Head title="Lacak Tiket Insiden" />
            <PublicHeader />

            <main className="max-w-xl mx-auto px-4 py-20 text-center space-y-6">
                <h1 className="text-3xl font-bold text-slate-800">Lacak Status Tiket</h1>
                <p className="text-slate-600">Masukkan nomor tiket yang Anda terima untuk melihat status laporan insiden Anda.</p>

                <form onSubmit={handleTrack} className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                    <input
                        type="text"
                        className="border rounded px-4 py-2 w-full sm:w-2/3"
                        placeholder="Contoh: CSIRT-20250703-XXXX"
                        value={ticket}
                        onChange={(e) => setTicket(e.target.value)}
                    />
                    <button
                        type="submit"
                        className="bg-red-600 text-white px-6 py-2 rounded hover:bg-red-700 transition"
                    >
                        Lacak
                    </button>
                </form>
            </main>

            <PublicFooter />
        </>
    );
}
