import React, { useState } from "react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import Container from "@/Components/Container";
import Card from "@/Components/Card";
import Input from "@/Components/Input";
import TextArea from "@/Components/TextArea";
import Button from "@/Components/Button";
import { Head, useForm } from "@inertiajs/react";
import Swal from "sweetalert2";

export default function Edit({ auth, slider }) {
    const { data, setData, post, errors, processing } = useForm({
        title: slider.title || "",
        caption: slider.caption || "",
        image: null,
        is_active: slider.is_active ?? true,
        _method: "put",
    });

    const [previewImage, setPreviewImage] = useState(slider.image_url); // Awal = gambar lama

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        setData("image", file);
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setPreviewImage(reader.result); // Ganti preview dengan file baru
            };
            reader.readAsDataURL(file);
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        post(route("sliders.update", slider.id), {
            forceFormData: true,
            onSuccess: () => {
                Swal.fire({
                    icon: "success",
                    title: "Berhasil!",
                    text: "Slider berhasil diperbarui.",
                    timer: 1500,
                    showConfirmButton: false,
                });
            },
        });
    };

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={<h2 className="text-xl font-semibold text-slate-800">Edit Slider</h2>}
        >
            <Head title="Edit Slider" />

            <Container>
                <Card title="Form Edit Slider">
                    <form onSubmit={handleSubmit} className="space-y-6" encType="multipart/form-data">
                        {/* Judul */}
                        <Input
                            label="Judul"
                            value={data.title}
                            onChange={(e) => setData("title", e.target.value)}
                            errors={errors.title}
                            placeholder="Contoh: Update Sistem Keamanan Jaringan"
                        />

                        {/* Deskripsi */}
                        <TextArea
                            label="Deskripsi"
                            value={data.caption}
                            onChange={(e) => setData("caption", e.target.value)}
                            errors={errors.caption}
                            placeholder="Deskripsi singkat slider ini..."
                            rows={5}
                        />

                        {/* Upload Gambar */}
                        <div>
                            <label className="block text-sm font-medium text-slate-700 mb-1">Gambar (Opsional)</label>
                            <input
                                type="file"
                                accept="image/*"
                                onChange={handleImageChange}
                                className="block w-full text-sm file:mr-4 file:py-2 file:px-4
                                    file:rounded file:border-0
                                    file:text-sm file:font-semibold
                                    file:bg-red-600 file:text-white
                                    hover:file:bg-red-700
                                    transition-all duration-200"
                            />
                            {errors.image && <p className="text-sm text-red-500 mt-2">{errors.image}</p>}
                        </div>

                        {/* Preview Gambar */}
                        {previewImage && (
                            <div className="mt-2">
                                <p className="text-sm text-slate-600 mb-1">Preview Gambar:</p>
                                <img
                                    src={previewImage}
                                    alt="Preview Gambar Slider"
                                    className="w-full max-w-md rounded shadow"
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
                                Tampilkan slider ini di halaman depan
                            </label>
                        </div>
                        {errors.is_active && <p className="text-sm text-red-500">{errors.is_active}</p>}

                        {/* Tombol Aksi */}
                        <div className="flex items-center gap-2 mt-6">
                            <Button type="submit" disabled={processing}>
                                Perbarui
                            </Button>
                            <Button type="cancel" url={route("sliders.index")} />
                        </div>
                    </form>
                </Card>
            </Container>
        </AuthenticatedLayout>
    );
}
