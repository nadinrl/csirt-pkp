import React, { useEffect, useState } from "react";
import { Head, useForm } from "@inertiajs/react";
import axios from "axios";
import PublicHeader from "@/Components/PublicHeader";
import PublicFooter from "@/Components/PublicFooter";
import { IconRefresh, IconShieldCheck, IconX } from '@tabler/icons-react'; // Import IconX for close button

export default function IncidentCreate({ captcha }) {
    const [anonymous, setAnonymous] = useState(false);
    const [captchaChallenge, setCaptchaChallenge] = useState(captcha || { a: 0, b: 0 });

    const [imagePreview, setImagePreview] = useState(null);
    const [docPreviewUrl, setDocPreviewUrl] = useState(null);
    const [fileWarning, setFileWarning] = useState("");
    const [lightboxOpen, setLightboxOpen] = useState(false); // State untuk mengontrol lightbox
    const [lightboxImage, setLightboxImage] = useState(null); // State untuk menyimpan gambar di lightbox

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

    const handleFileChange = (e) => {
        const file = e.target.files[0];

        // Reset semua preview dan state
        setFileWarning("");
        setImagePreview(null);
        setDocPreviewUrl(null);
        setData("attachment", null);

        if (!file) return;

        // Daftar ekstensi/tipe file yang diizinkan
        const allowedExtensions = ["pdf", "jpg", "jpeg", "png", "doc", "docx"];
        const fileExtension = file.name.split(".").pop().toLowerCase();

        if (!allowedExtensions.includes(fileExtension)) {
            setFileWarning("Format file tidak diizinkan. Hanya PDF, JPG, JPEG, PNG, DOC, dan DOCX yang diperbolehkan.");
            e.target.value = null; // Reset input file
            return;
        }

        // Batas ukuran file
        if (file.size > 4 * 1024 * 1024) {
            setFileWarning("Ukuran file melebihi 4MB. Silakan unggah file yang lebih kecil.");
            e.target.value = null; // Reset input file
            return;
        }

        // File valid — simpan ke state
        setData("attachment", file);

        const fileType = file.type;

        // Preview untuk gambar
        if (fileType.startsWith("image/")) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setImagePreview(reader.result);
            };
            reader.readAsDataURL(file);
        }
        // Preview untuk PDF/DOC/DOCX
        else if (
            fileType === "application/pdf" ||
            fileExtension === "doc" ||
            fileExtension === "docx"
        ) {
            const url = URL.createObjectURL(file);
            setDocPreviewUrl(url);
        }
    };


    // Fungsi untuk membuka lightbox
    const openLightbox = (imageSrc) => {
        setLightboxImage(imageSrc);
        setLightboxOpen(true);
    };

    // Fungsi untuk menutup lightbox
    const closeLightbox = () => {
        setLightboxOpen(false);
        setLightboxImage(null);
    };


    return (
        <>
            <Head title="Lapor Insiden Siber" />
            <PublicHeader />

            <main className="max-w-3xl mx-auto px-4 py-12">
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
                                    className="w-full border-2 border-gray-400 rounded-md shadow-md"
                                />
                                {errors.reporter_name && <p className="text-sm text-red-600">{errors.reporter_name}</p>}
                            </div>

                            <div>
                                <label className="text-sm font-medium text-slate-700">Email</label>
                                <input
                                    type="email"
                                    value={data.reporter_email}
                                    onChange={(e) => setData("reporter_email", e.target.value)}
                                    className="w-full border-2 border-gray-400 rounded-md shadow-md"
                                />
                                {errors.reporter_email && <p className="text-sm text-red-600">{errors.reporter_email}</p>}
                            </div>

                            <div className="md:col-span-2">
                                <label className="text-sm font-medium text-slate-700">Nomor Telepon</label>
                                <input
                                    type="text"
                                    value={data.reporter_phone}
                                    onChange={(e) => setData("reporter_phone", e.target.value)}
                                    className="w-full border-2 border-gray-400 rounded-md shadow-md"
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
                            className="w-full border-2 border-gray-400 rounded-md shadow-md"
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
                            className="w-full border-2 border-gray-400 rounded-md shadow-md"
                        />
                        {errors.description && <p className="text-sm text-red-600">{errors.description}</p>}
                    </div>

                    {/* Lampiran */}
                    <div>
                        <label className="text-sm font-medium text-slate-700">Lampiran Bukti (opsional)</label>
                        <input
                            type="file"
                            onChange={handleFileChange}
                           className="block w-full text-sm file:mr-4 file:py-2 file:px-4
                                 file:rounded file:border-0
                                 file:text-sm file:font-semibold
                                 file:bg-blue-600 file:text-white
                                 hover:file:bg-blue-700
                                 transition-all duration-200"
                        />
                        {errors.attachment && <p className="text-sm text-red-600">{errors.attachment}</p>}
                        {fileWarning && <p className="text-sm text-red-600 mt-1">{fileWarning}</p>}
                        <p className="text-xs text-slate-500 mt-1">Maks. 4MB. Format: PDF, JPG, PNG, DOC, DOCX.</p>

                        {/* Preview Gambar */}
                        {imagePreview && (
                            <div className="mt-4">
                                <p className="text-sm text-slate-700 mb-2">Preview Gambar:</p>
                                <img
                                    src={imagePreview}
                                    alt="Preview Lampiran"
                                    className="max-h-64 rounded-md border border-slate-300 cursor-pointer" // Tambahkan cursor-pointer
                                    onClick={() => openLightbox(imagePreview)} // Tambahkan onClick
                                />
                            </div>
                        )}

                        {/* Tombol Preview Dokumen */}
                        {docPreviewUrl && (
                            <div className="mt-4">
                                <button
                                    type="button"
                                    onClick={() => window.open(docPreviewUrl, "_blank")}
                                    className="text-blue-600 underline text-sm hover:text-blue-800"
                                >
                                    Klik untuk preview dokumen
                                </button>
                            </div>
                        )}
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
                                className="w-full border-2 border-gray-400 rounded-md shadow-md"
                                placeholder="Masukkan hasil"
                                required
                            />
                            <button
                                type="button"
                                onClick={refreshCaptcha}
                                className="px-3 py-1 bg-gray-200 hover:bg-gray-300 text-sm rounded-md flex items-center justify-center"
                                title="Refresh Captcha"
                            >
                                <IconRefresh size={20} stroke={1.5} />
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

            {/* Lightbox Modal */}
            {lightboxOpen && (
                <div
                    className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-75"
                    onClick={closeLightbox} // Tutup lightbox saat mengklik overlay
                >
                    <div className="relative p-4 bg-white rounded-lg shadow-xl max-w-3xl max-h-[90vh] overflow-auto" onClick={(e) => e.stopPropagation()}>
                        <button
                            onClick={closeLightbox}
                            className="absolute top-2 right-2 text-gray-800 hover:text-gray-600 p-1 rounded-full bg-white bg-opacity-75 hover:bg-opacity-100 transition-all duration-200"
                            title="Tutup"
                        >
                            <IconX size={24} stroke={2} />
                        </button>
                        <img
                            src={lightboxImage}
                            alt="Gambar Diperbesar"
                            className="max-w-full max-h-full object-contain"
                        />
                    </div>
                </div>
            )}
        </>
    );
}
