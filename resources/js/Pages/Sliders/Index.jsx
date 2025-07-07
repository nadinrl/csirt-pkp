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
    const { sliders, filters } = usePage().props;

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={<h2 className="text-xl font-semibold text-slate-800">Manajemen Slider</h2>}
        >
            <Head title="Slider" />

            <Container>
                {/* Header */}
                <div className="mb-6">
                    <h1 className="text-2xl font-bold text-slate-900 mb-1">Daftar Gambar Slider</h1>
                    <p className="text-sm text-slate-500">
                        Kelola gambar yang tampil di halaman utama CSIRT.
                    </p>
                </div>

                {/* Actions & Search */}
                <div className="mb-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                    {hasAnyPermission(["sliders create"]) && (
                        <Button type="add" url={route("sliders.create")}>
                            Tambah Slider
                        </Button>
                    )}
                    <div className="w-full sm:w-1/2">
                        <Search
                            url={route("sliders.index")}
                            placeholder="Cari slider berdasarkan judul..."
                            filter={filters}
                        />
                    </div>
                </div>

                {/* Table */}
                <Table.Card title="Tabel Slider">
                    <Table>
                        <Table.Thead>
                            <tr>
                                <Table.Th>#</Table.Th>
                                <Table.Th>Gambar</Table.Th>
                                <Table.Th>Judul</Table.Th>
                                <Table.Th>Deskripsi</Table.Th>
                                <Table.Th className="text-center">Aksi</Table.Th>
                            </tr>
                        </Table.Thead>
                        <Table.Tbody>
                            {sliders.data.map((slider, i) => (
                                <tr key={slider.id} className="hover:bg-slate-50">
                                    <Table.Td>
                                        {++i + (sliders.current_page - 1) * sliders.per_page}
                                    </Table.Td>
                                    <Table.Td>
                                        <img
                                            src={slider.image_url}
                                            alt={slider.title}
                                            className="w-32 h-20 object-cover rounded shadow"
                                        />
                                    </Table.Td>
                                    <Table.Td>{slider.title}</Table.Td>
                                    <Table.Td className="max-w-sm text-slate-600 text-sm">
                                        {slider.caption}
                                    </Table.Td>
                                    <Table.Td>
                                        <div className="flex justify-center gap-2">
                                            {hasAnyPermission(["sliders edit"]) && (
                                                <Button
                                                    type="edit"
                                                    url={route("sliders.edit", slider.id)}
                                                />
                                            )}
                                            {hasAnyPermission(["sliders delete"]) && (
                                                <Button
                                                    type="delete"
                                                    url={route("sliders.destroy", slider.id)}
                                                />
                                            )}
                                        </div>
                                    </Table.Td>
                                </tr>
                            ))}
                        </Table.Tbody>
                    </Table>
                </Table.Card>

                {/* Pagination */}
                {sliders.last_page > 1 && (
                    <div className="mt-6 flex justify-center">
                        <Pagination links={sliders.links} />
                    </div>
                )}
            </Container>
        </AuthenticatedLayout>
    );
}
