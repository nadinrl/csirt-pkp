import React, { useState } from "react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import Container from "@/Components/Container";
import Card from "@/Components/Card";
import Input from "@/Components/Input";
import Button from "@/Components/Button";
import { Head, useForm } from "@inertiajs/react";
import Swal from "sweetalert2";

export default function Edit({ auth, guide }) {
    const { data, setData, post, errors, processing } = useForm({
        title: guide.title || "",
        description: guide.description || "",
        file: null,
        is_active: guide.is_active,
        _method: "put",
    });

    // Gunakan file URL dari server jika belum memilih file baru
    const [localPreview, setLocalPreview] = useState(null);

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        setData("file", file);

        if (file && file.type === "application/pdf") {
            const previewURL = URL.createObjectURL(file);
            setLocalPreview(previewURL);
        } else {
            setLocalPreview(null);
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        post(route("guides.update", guide.id), {
            forceFormData: true,
            onSuccess: () => {
                Swal.fire({
                    icon: "success",
                    title: "Berhasil!",
                    text: "Panduan berhasil diperbarui.",
                    timer: 1500,
                    showConfirmButton: false,
                });
            },
        });
    };

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={<h2 className="text-xl font-semibold text-slate-800">Edit Panduan</h2>}
        >
            <Head title="Edit Panduan" />

            <Container>
                <Card title="Form Edit Panduan">
                    <form onSubmit={handleSubmit} className="space-y-6" encType="multipart/form-data">
                        {/* Judul */}
                        <Input
                            label="Judul Panduan"
                            value={data.title}
                            onChange={(e) => setData("title", e.target.value)}
                            errors={errors.title}
                            placeholder="Contoh: SOP Keamanan Data"
                        />

                        {/* Deskripsi */}
                        <div>
                            <label className="block text-sm font-medium text-slate-700 mb-1">Deskripsi</label>
                            <textarea
                                value={data.description}
                                onChange={(e) => setData("description", e.target.value)}
                                rows={4}
                                placeholder="Tuliskan ringkasan atau penjelasan isi panduan..."
                                className="w-full border rounded-md p-3 text-sm focus:outline-none focus:ring-2 focus:ring-red-500"
                            />
                            {errors.description && (
                                <p className="text-sm text-red-500 mt-1">{errors.description}</p>
                            )}
                        </div>

                        {/* Upload File Baru */}
                        <div>
                            <label className="block text-sm font-medium text-slate-700 mb-1">
                                Ganti File PDF (Opsional)
                            </label>
                            <input
                                type="file"
                                accept="application/pdf"
                                onChange={handleFileChange}
                                className="block w-full text-sm file:mr-4 file:py-2 file:px-4
                                    file:rounded file:border-0
                                    file:text-sm file:font-semibold
                                    file:bg-red-600 file:text-white
                                    hover:file:bg-red-700
                                    transition-all duration-200"
                            />
                            {errors.file && <p className="text-sm text-red-500 mt-2">{errors.file}</p>}
                        </div>

                        {/* Preview File */}
                        {(localPreview || guide.file_url) && (
                            <div className="mt-4">
                                <p className="text-sm text-slate-600 mb-1">Pratinjau File:</p>
                                <iframe
                                    src={localPreview || guide.file_url}
                                    title="Preview PDF"
                                    className="w-full h-96 border rounded shadow"
                                />
                            </div>
                        )}

                        {/* Status Aktif */}
                        <div className="flex items-center gap-2 mt-4">
                            <input
                                id="is_active"
                                type="checkbox"
                                checked={data.is_active}
                                onChange={(e) => setData("is_active", e.target.checked)}
                                className="rounded border-gray-300 text-red-600 shadow-sm focus:ring-red-500"
                            />
                            <label htmlFor="is_active" className="text-sm text-slate-700">
                                Tampilkan panduan ini
                            </label>
                        </div>
                        {errors.is_active && <p className="text-sm text-red-500">{errors.is_active}</p>}

                        {/* Tombol Aksi */}
                        <div className="flex items-center gap-2">
                            <Button type="submit" disabled={processing}>
                                Perbarui
                            </Button>
                            <Button type="cancel" url={route("guides.index")} />
                        </div>
                    </form>
                </Card>
            </Container>
        </AuthenticatedLayout>
    );
}
