import React from "react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import Container from "@/Components/Container";
import Table from "@/Components/Table";
import Button from "@/Components/Button";
import Pagination from "@/Components/Pagination";
import Search from "@/Components/Search";
import { Head, usePage } from "@inertiajs/react";
import hasAnyPermission from "@/Utils/Permissions";

export default function Index({ auth }) {
    const { articles, filters } = usePage().props;

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={<h2 className="text-xl font-semibold text-slate-800">Manajemen Artikel</h2>}
        >
            <Head title="Artikel" />

            <Container>
                {/* Header */}
                <div className="mb-6">
                    <h1 className="text-2xl font-bold text-slate-900 mb-1">Daftar Artikel</h1>
                    <p className="text-sm text-slate-500">Kelola artikel keamanan siber, tips, dan berita terbaru.</p>
                </div>

                {/* Action & Search */}
                <div className="mb-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                    {hasAnyPermission(["articles create"]) && (
                        <Button type="add" url={route("articles.create")}>
                            Tambah Artikel
                        </Button>
                    )}
                    <div className="w-full sm:w-1/2">
                        <Search
                            url={route("articles.index")}
                            placeholder="Cari artikel berdasarkan judul..."
                            filter={filters}
                        />
                    </div>
                </div>

                {/* Table */}
                <Table.Card title="Tabel Artikel">
                    <Table>
                        <Table.Thead>
                            <tr>
                                <Table.Th>#</Table.Th>
                                <Table.Th>Judul</Table.Th>
                                <Table.Th>Penulis</Table.Th>
                                <Table.Th className="text-center">Aksi</Table.Th>
                            </tr>
                        </Table.Thead>
                        <Table.Tbody>
                            {articles.data.map((article, i) => (
                                <tr key={article.id} className="hover:bg-slate-50">
                                    <Table.Td>
                                        {++i + (articles.current_page - 1) * articles.per_page}
                                    </Table.Td>
                                    <Table.Td>{article.title}</Table.Td>
                                    <Table.Td>{article.author?.name}</Table.Td>
                                    <Table.Td>
                                        <div className="flex justify-center gap-2">
                                            {hasAnyPermission(["articles edit"]) && (
                                                <Button type="edit" url={route("articles.edit", article.id)} />
                                            )}
                                            {hasAnyPermission(["articles delete"]) && (
                                                <Button type="delete" url={route("articles.destroy", article.id)} />
                                            )}
                                        </div>
                                    </Table.Td>
                                </tr>
                            ))}
                        </Table.Tbody>
                    </Table>
                </Table.Card>

                {/* Pagination */}
                {articles.last_page > 1 && (
                    <div className="mt-6 flex justify-center">
                        <Pagination links={articles.links} />
                    </div>
                )}
            </Container>
        </AuthenticatedLayout>
    );
}
