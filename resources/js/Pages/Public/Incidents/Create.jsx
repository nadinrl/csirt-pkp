import React, { useEffect, useState } from "react";
import { Head, useForm } from "@inertiajs/react";
import axios from "axios";
import PublicHeader from "@/Components/PublicHeader";
import PublicFooter from "@/Components/PublicFooter";
import { IconRefresh, IconShieldCheck } from '@tabler/icons-react'; // Import IconRefresh and IconShieldCheck

export default function IncidentCreate({ captcha }) {
    const [anonymous, setAnonymous] = useState(false);
    const [captchaChallenge, setCaptchaChallenge] = useState(captcha || { a: 0, b: 0 });

    const { data, setData, post, processing, errors } = useForm({
        reporter_name: "",
        reporter_email: "",
        reporter_phone: "",
        title: "",
        description: "",
        attachment: null,
        captcha_answer: "",
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        post(route("incidents.store"));
    };

    const refreshCaptcha = async () => {
        const response = await axios.get("/captcha-refresh");
        setCaptchaChallenge(response.data);
        setData("captcha_answer", "");
    };

    return (
        <>
            <Head title="Lapor Insiden Siber" />
            <PublicHeader />

            <main className="max-w-3xl mx-auto px-4 py-12">
                {/* Changed emoji to IconShieldCheck for a more professional look */}
                <h1 className="text-3xl font-bold text-slate-800 mb-6 flex items-center">
                    <IconShieldCheck size={32} stroke={1.5} className="mr-3 text-blue-600" /> Lapor Insiden Siber
                </h1>
                <p className="text-slate-600 mb-8">
                    Form ini digunakan untuk melaporkan insiden keamanan siber. Anda dapat memilih untuk melaporkan secara anonim.
                </p>

                <form onSubmit={handleSubmit} className="space-y-6 bg-white p-6 rounded-md shadow-md">
                    {/* Toggle Anonim */}
                    <div className="flex items-center gap-2">
                        <input
                            type="checkbox"
                            id="anonymous"
                            checked={anonymous}
                            onChange={(e) => setAnonymous(e.target.checked)}
                            className="h-4 w-4 text-red-600 border-gray-300 rounded focus:ring-red-500"
                        />
                        <label htmlFor="anonymous" className="text-sm text-slate-700 font-medium">
                            Lapor sebagai Anonim
                        </label>
                    </div>

                    {/* Identitas Pelapor */}
                    {!anonymous && (
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <label className="text-sm font-medium text-slate-700">Nama Pelapor</label>
                                <input
                                    type="text"
                                    value={data.reporter_name}
                                    onChange={(e) => setData("reporter_name", e.target.value)}
                                    className="w-full border-slate-300 rounded-md shadow-sm"
                                />
                                {errors.reporter_name && <p className="text-sm text-red-600">{errors.reporter_name}</p>}
                            </div>

                            <div>
                                <label className="text-sm font-medium text-slate-700">Email</label>
                                <input
                                    type="email"
                                    value={data.reporter_email}
                                    onChange={(e) => setData("reporter_email", e.target.value)}
                                    className="w-full border-slate-300 rounded-md shadow-sm"
                                />
                                {errors.reporter_email && <p className="text-sm text-red-600">{errors.reporter_email}</p>}
                            </div>

                            <div className="md:col-span-2">
                                <label className="text-sm font-medium text-slate-700">Nomor Telepon</label>
                                <input
                                    type="text"
                                    value={data.reporter_phone}
                                    onChange={(e) => setData("reporter_phone", e.target.value)}
                                    className="w-full border-slate-300 rounded-md shadow-sm"
                                />
                                {errors.reporter_phone && <p className="text-sm text-red-600">{errors.reporter_phone}</p>}
                            </div>
                        </div>
                    )}

                    {/* Judul Insiden */}
                    <div>
                        <label className="text-sm font-medium text-slate-700">Judul Insiden</label>
                        <input
                            type="text"
                            value={data.title}
                            onChange={(e) => setData("title", e.target.value)}
                            className="w-full border-slate-300 rounded-md shadow-sm"
                        />
                        {errors.title && <p className="text-sm text-red-600">{errors.title}</p>}
                    </div>

                    {/* Deskripsi Insiden */}
                    <div>
                        <label className="text-sm font-medium text-slate-700">Deskripsi Insiden</label>
                        <textarea
                            rows="5"
                            value={data.description}
                            onChange={(e) => setData("description", e.target.value)}
                            className="w-full border-slate-300 rounded-md shadow-sm"
                        />
                        {errors.description && <p className="text-sm text-red-600">{errors.description}</p>}
                    </div>

                    {/* Lampiran */}
                    <div>
                        <label className="text-sm font-medium text-slate-700">Lampiran Bukti (opsional)</label>
                        <input
                            type="file"
                            onChange={(e) => setData("attachment", e.target.files[0])}
                           className="block w-full text-sm file:mr-4 file:py-2 file:px-4
                                 file:rounded file:border-0
                                 file:text-sm file:font-semibold
                                 file:bg-blue-600 file:text-white
                                 hover:file:bg-blue-700
                                 transition-all duration-200"
                        />
                        {errors.attachment && <p className="text-sm text-red-600">{errors.attachment}</p>}
                        <p className="text-xs text-slate-500 mt-1">Maks. 4MB. Format: PDF, JPG, PNG, DOC, DOCX.</p>
                    </div>

                    {/* Captcha */}
                    <div>
                        <label className="block text-sm font-medium text-slate-700 mb-1">
                            Jawaban Captcha: {captchaChallenge.a} + {captchaChallenge.b} = ?
                        </label>
                        <div className="flex gap-2">
                            <input
                                type="text"
                                value={data.captcha_answer}
                                onChange={(e) => setData("captcha_answer", e.target.value)}
                                className="w-full border-slate-300 rounded-md shadow-sm"
                                placeholder="Masukkan hasil"
                                required
                            />
                            <button
                                type="button"
                                onClick={refreshCaptcha}
                                className="px-3 py-1 bg-gray-200 hover:bg-gray-300 text-sm rounded-md flex items-center justify-center" // Added flex classes for icon centering
                                title="Refresh Captcha"
                            >
                                <IconRefresh size={20} stroke={1.5} /> {/* Replaced emoji with IconRefresh */}
                            </button>
                        </div>
                        {errors.captcha_answer && <p className="text-sm text-red-600 mt-1">{errors.captcha_answer}</p>}
                    </div>

                    {/* Tombol Submit */}
                    <div className="pt-4">
                        <button
                            type="submit"
                            disabled={processing}
                            className={`px-6 py-2 rounded-md font-semibold text-white transition-colors duration-200
                                ${processing ? 'bg-gray-400 cursor-not-allowed' : 'bg-red-600 hover:bg-red-700'}`}
                        >
                            {processing ? "Mengirim..." : "Kirim Laporan"}
                        </button>
                    </div>
                </form>
            </main>

            <PublicFooter />
        </>
    );
}
