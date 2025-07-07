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
    const { roles, filters } = usePage().props;

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={<h2 className="text-xl font-semibold text-slate-800">Manajemen Role</h2>}
        >
            <Head title="Roles" />

            <Container>
                {/* Section Header */}
                <div className="mb-6">
                    <h1 className="text-2xl font-bold text-slate-900 mb-1">Daftar Role</h1>
                    <p className="text-sm text-slate-500">Kelola role dan izin akses pengguna.</p>
                </div>

                {/* Action & Search */}
                <div className="mb-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                    {hasAnyPermission(["roles create"]) && (
                        <Button type="add" url={route("roles.create")} />
                    )}
                    <div className="w-full sm:w-1/2">
                        <Search
                            url={route("roles.index")}
                            placeholder="Cari role berdasarkan nama..."
                            filter={filters}
                        />
                    </div>
                </div>

                {/* Table Section */}
                <Table.Card title="Tabel Role">
                    <Table>
                        <Table.Thead>
                            <tr>
                                <Table.Th>#</Table.Th>
                                <Table.Th>Nama Role</Table.Th>
                                <Table.Th>Permissions</Table.Th>
                                <Table.Th className="text-center">Aksi</Table.Th>
                            </tr>
                        </Table.Thead>
                        <Table.Tbody>
                            {roles.data.map((role, i) => (
                                <tr key={role.id} className="hover:bg-slate-50">
                                    <Table.Td>
                                        {++i + (roles.current_page - 1) * roles.per_page}
                                    </Table.Td>
                                    <Table.Td>{role.name}</Table.Td>
                                    <Table.Td>
                                        <div className="flex flex-wrap gap-1">
                                            {role.name === "super-admin" ? (
                                                <span className="inline-flex items-center px-3 py-1 rounded-full text-sm bg-sky-100 text-sky-700">
                                                    all-permissions
                                                </span>
                                            ) : (
                                                role.permissions.map((permission) => (
                                                    <span
                                                        key={permission.id}
                                                        className="inline-flex items-center px-3 py-1 rounded-full text-xs bg-sky-100 text-sky-700"
                                                    >
                                                        {permission.name}
                                                    </span>
                                                ))
                                            )}
                                        </div>
                                    </Table.Td>
                                    <Table.Td>
                                        <div className="flex justify-center gap-2">
                                            {hasAnyPermission(["roles edit"]) && (
                                                <Button type="edit" url={route("roles.edit", role.id)} />
                                            )}
                                            {hasAnyPermission(["roles delete"]) && (
                                                <Button type="delete" url={route("roles.destroy", role.id)} />
                                            )}
                                        </div>
                                    </Table.Td>
                                </tr>
                            ))}
                        </Table.Tbody>
                    </Table>
                </Table.Card>

                {/* Pagination */}
                {roles.last_page > 1 && (
                    <div className="mt-6 flex justify-center">
                        <Pagination links={roles.links} />
                    </div>
                )}
            </Container>
        </AuthenticatedLayout>
    );
}
