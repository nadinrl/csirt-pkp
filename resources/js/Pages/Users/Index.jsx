import React from "react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import Container from "@/Components/Container";
import Table from "@/Components/Table";
import Button from "@/Components/Button";
import Pagination from "@/Components/Pagination";
import { Head, usePage } from "@inertiajs/react";
import Search from "@/Components/Search";
import hasAnyPermission from "@/Utils/Permissions";

export default function Index({ auth }) {
    const { users, filters } = usePage().props;

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={<h2 className="text-xl font-semibold text-slate-800">Manajemen Pengguna</h2>}
        >
            <Head title="Users" />

            <Container>
                {/* Header Section */}
                <div className="mb-6">
                    <h1 className="text-2xl font-bold text-slate-900 mb-1">Daftar Pengguna</h1>
                    <p className="text-sm text-slate-500">Kelola data akun pengguna, peran, dan hak aksesnya.</p>
                </div>

                {/* Actions + Search */}
                <div className="mb-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                    {hasAnyPermission(["users create"]) && (
                        <Button type="add" url={route("users.create")} />
                    )}
                    <div className="w-full sm:w-1/2">
                        <Search
                            url={route("users.index")}
                            placeholder="Cari pengguna berdasarkan nama atau email..."
                            filter={filters}
                        />
                    </div>
                </div>

                {/* Table Section */}
                <Table.Card title="Tabel Pengguna">
                    <Table>
                        <Table.Thead>
                            <tr>
                                <Table.Th>#</Table.Th>
                                <Table.Th>Nama & Email</Table.Th>
                                <Table.Th>Role</Table.Th>
                                <Table.Th className="text-center">Aksi</Table.Th>
                            </tr>
                        </Table.Thead>
                        <Table.Tbody>
                            {users.data.map((user, i) => (
                                <tr key={user.id} className="hover:bg-slate-50">
                                    <Table.Td>
                                        {++i + (users.current_page - 1) * users.per_page}
                                    </Table.Td>
                                    <Table.Td>
                                        <div>{user.name}</div>
                                        <div className="text-sm text-slate-500">{user.email}</div>
                                    </Table.Td>
                                    <Table.Td>
                                        <div className="flex flex-wrap gap-1">
                                            {user.roles.map((role) => (
                                                <span
                                                    key={role.id}
                                                    className="inline-flex items-center px-3 py-1 rounded-full text-xs bg-sky-100 text-sky-700"
                                                >
                                                    {role.name}
                                                </span>
                                            ))}
                                        </div>
                                    </Table.Td>
                                    <Table.Td>
                                        <div className="flex justify-center gap-2">
                                            {hasAnyPermission(["users edit"]) && (
                                                <Button type="edit" url={route("users.edit", user.id)} />
                                            )}
                                            {hasAnyPermission(["users delete"]) && (
                                                <Button type="delete" url={route("users.destroy", user.id)} />
                                            )}
                                        </div>
                                    </Table.Td>
                                </tr>
                            ))}
                        </Table.Tbody>
                    </Table>
                </Table.Card>

                {/* Pagination */}
                {users.last_page > 1 && (
                    <div className="mt-6 flex justify-center">
                        <Pagination links={users.links} />
                    </div>
                )}
            </Container>
        </AuthenticatedLayout>
    );
}
