import React from "react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import Container from "@/Components/Container";
import Card from "@/Components/Card";
import Input from "@/Components/Input";
import TextArea from "@/Components/TextArea";
import Button from "@/Components/Button";
import { Head, useForm } from "@inertiajs/react";
import Swal from "sweetalert2";

export default function Create({ auth }) {
    const { data, setData, post, errors, processing, reset } = useForm({
        title: "",
        caption: "",
        image: null,
        is_active: true, // default aktif
    });

    const handleSubmit = (e) => {
        e.preventDefault();

        post(route("sliders.store"), {
            forceFormData: true,
            onSuccess: () => {
                Swal.fire({
                    icon: "success",
                    title: "Berhasil!",
                    text: "Slider berhasil ditambahkan.",
                    timer: 1500,
                    showConfirmButton: false,
                });
                reset();
            },
        });
    };

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={<h2 className="text-xl font-semibold text-slate-800">Tambah Slider Baru</h2>}
        >
            <Head title="Tambah Slider" />

            <Container>
                <Card title="Form Tambah Slider">
                    <form onSubmit={handleSubmit} className="space-y-6" encType="multipart/form-data">
                        {/* Judul */}
                        <Input
                            label="Judul"
                            value={data.title}
                            onChange={(e) => setData("title", e.target.value)}
                            errors={errors.title}
                            placeholder="Contoh: Awas Serangan Phishing!"
                        />

                        {/* Deskripsi */}
                        <TextArea
                            label="Deskripsi"
                            value={data.caption}
                            onChange={(e) => setData("caption", e.target.value)}
                            errors={errors.caption}
                            placeholder="Deskripsi singkat slider"
                            rows={4}
                        />

                        {/* Gambar */}
                        <div>
                            <label className="block text-sm font-medium text-slate-700 mb-1">Gambar</label>
                            <input
                                type="file"
                                accept="image/*"
                                onChange={(e) => setData("image", e.target.files[0])}
                                className="block w-full text-sm file:mr-4 file:py-2 file:px-4
                                    file:rounded file:border-0
                                    file:text-sm file:font-semibold
                                    file:bg-red-600 file:text-white
                                    hover:file:bg-red-700
                                    transition-all duration-200"
                            />
                            {errors.image && <p className="text-sm text-red-500 mt-2">{errors.image}</p>}
                        </div>

                        {/* Status Aktif */}
                        <div className="flex items-center gap-2">
                            <input
                                id="is_active"
                                type="checkbox"
                                checked={data.is_active}
                                onChange={(e) => setData("is_active", e.target.checked)}
                                className="rounded border-gray-300 text-red-600 shadow-sm focus:ring-red-500"
                            />
                            <label htmlFor="is_active" className="text-sm text-slate-700">
                                Tampilkan slider ini
                            </label>
                        </div>
                        {errors.is_active && <p className="text-sm text-red-500">{errors.is_active}</p>}

                        {/* Aksi */}
                        <div className="flex items-center gap-2">
                            <Button type="submit" disabled={processing}>
                                Simpan
                            </Button>
                            <Button type="cancel" url={route("sliders.index")} />
                        </div>
                    </form>
                </Card>
            </Container>
        </AuthenticatedLayout>
    );
}
