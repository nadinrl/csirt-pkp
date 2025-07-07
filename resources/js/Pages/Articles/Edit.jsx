import React, { useRef } from "react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import Container from "@/Components/Container";
import { Head, useForm } from "@inertiajs/react";
import Input from "@/Components/Input";
import Button from "@/Components/Button";
import Card from "@/Components/Card";
import Swal from "sweetalert2";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import { CKEditor } from "@ckeditor/ckeditor5-react";

export default function Edit({ auth, article }) {
    const editorRef = useRef();
    const { data, setData, put, errors, processing } = useForm({
        title: article.title || "",
        content: article.content || "",
    });

    const handleSubmit = (e) => {
        e.preventDefault();

        put(route("articles.update", article.id), {
            onSuccess: () => {
                Swal.fire({
                    title: "Berhasil!",
                    text: "Artikel berhasil diperbarui.",
                    icon: "success",
                    timer: 1500,
                    showConfirmButton: false,
                });
            },
        });
    };

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={<h2 className="text-xl font-semibold text-slate-800">Edit Artikel</h2>}
        >
            <Head title="Edit Artikel" />

            <Container>
                <Card title="Form Edit Artikel">
                    <form onSubmit={handleSubmit} className="space-y-6">
                        {/* Judul Artikel */}
                        <Input
                            label="Judul Artikel"
                            type="text"
                            value={data.title}
                            onChange={(e) => setData("title", e.target.value)}
                            errors={errors.title}
                            placeholder="Contoh: Update Kebijakan Keamanan Siber"
                        />

                        {/* Konten CKEditor */}
                        <div>
                            <label className="block text-sm font-medium text-slate-700 mb-1">
                                Konten Artikel
                            </label>
                            <div className="border rounded-md shadow-sm overflow-hidden">
                                <CKEditor
                                    editor={ClassicEditor}
                                    data={data.content}
                                    onChange={(event, editor) => {
                                        const content = editor.getData();
                                        setData("content", content);
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
                                Simpan Perubahan
                            </Button>
                            <Button type="cancel" url={route("articles.index")}>
                                Batal
                            </Button>
                        </div>
                    </form>
                </Card>
            </Container>
        </AuthenticatedLayout>
    );
}
