import React from "react";
import { Head } from "@inertiajs/react";
import PublicHeader from "@/Components/PublicHeader";
import PublicFooter from "@/Components/PublicFooter";

export default function Contact() {
    return (
        <>
            <Head title="Kontak Kami - CSIRT Kementerian PKP" />
            <PublicHeader />

            <main className="max-w-3xl mx-auto p-6 py-12">
                <h1 className="text-3xl font-bold mb-6 text-[#0f172a]">Kontak Kami</h1>

                <p className="mb-4 text-slate-700">
                    Anda dapat menghubungi kami melalui informasi di bawah ini, atau langsung mengunjungi kantor kami.
                </p>

                <div className="bg-white shadow-md rounded-lg p-6 mb-8 border border-slate-200">
                    <ul className="text-slate-800 space-y-2">
                        <li>
                            📍 <strong>Alamat:</strong> Jl. Wijaya I No.57-59, RT.9/RW.5, Petogogan, Kec. Kby. Baru, Kota Jakarta Selatan, Daerah Khusus Ibukota Jakarta 12170
                        </li>
                        <li>
                            📞 <strong>Telepon:</strong> 0812-3456-7890
                        </li>
                        <li>
                            ✉️ <strong>Email:</strong> pkpcsirt@gmail.com
                        </li>
                    </ul>
                </div>

                <div className="mb-12">
                    <h2 className="text-xl font-semibold mb-4 text-[#0f172a]">Peta Lokasi</h2>
                    <div className="w-full aspect-video rounded overflow-hidden shadow-md border border-slate-300">
                        <iframe
                            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d31729.22732813178!2d106.79362116309899!3d-6.243503251665959!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e69f15e445bda09%3A0x5c50c0149ccdb1d4!2sWisma%20Karya!5e0!3m2!1sid!2sid!4v1752754673219!5m2!1sid!2sid"
                            width="100%"
                            height="100%"
                            style={{ border: 0 }}
                            allowFullScreen=""
                            loading="lazy"
                            referrerPolicy="no-referrer-when-downgrade"
                        ></iframe>
                    </div>
                </div>
            </main>

            <PublicFooter />
        </>
    );
}