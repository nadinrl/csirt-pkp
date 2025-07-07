import React, { useEffect, useRef } from "react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import Container from "@/Components/Container";
import { Head, useForm } from "@inertiajs/react";
import Input from "@/Components/Input";
import Button from "@/Components/Button";
import Card from "@/Components/Card";
import Swal from "sweetalert2";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import { CKEditor } from "@ckeditor/ckeditor5-react";

export default function Create({ auth }) {
    const editorRef = useRef();
    const { data, setData, post, errors, processing, reset } = useForm({
        title: "",
        content: "",
    });

    const handleSubmit = (e) => {
        e.preventDefault();

        post(route("articles.store"), {
            onSuccess: () => {
                Swal.fire({
                    title: "Berhasil!",
                    text: "Artikel berhasil ditambahkan.",
                    icon: "success",
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
            header={<h2 className="text-xl font-semibold text-slate-800">Tambah Artikel Baru</h2>}
        >
            <Head title="Tambah Artikel" />

            <Container>
                <Card title="Form Artikel">
                    <form onSubmit={handleSubmit} className="space-y-6">
                        {/* Judul Artikel */}
                        <Input
                            label="Judul Artikel"
                            type="text"
                            value={data.title}
                            onChange={(e) => setData("title", e.target.value)}
                            errors={errors.title}
                            placeholder="Contoh: Tips Keamanan Siber untuk Pemula"
                        />

                        {/* Konten CKEditor */}
                        <div>
                            <label className="block text-sm font-medium text-slate-700 mb-1">
                                Konten Artikel
                            </label>
                            <div className="prose max-w-none border border-slate-300 rounded-md shadow-sm focus-within:ring-2 focus-within:ring-red-600">
                                <CKEditor
                                    editor={ClassicEditor}
                                    data={data.content}
                                    onChange={(event, editor) => {
                                        const content = editor.getData();
                                        setData("content", content);
                                    }}
                                    config={{
                                        height: '300px',
                                    }}
                                />
                            </div>
                            {errors.content && (
                                <p className="text-sm text-red-500 mt-2">{errors.content}</p>
                            )}
                        </div>

                        {/* Aksi */}
                        <div className="flex items-center gap-2">
                            <Button type="submit" disabled={processing}>
                                Simpan
                            </Button>
                            <Button type="cancel" url={route("articles.index")} />
                        </div>
                    </form>
                </Card>
            </Container>
        </AuthenticatedLayout>
    );
}
