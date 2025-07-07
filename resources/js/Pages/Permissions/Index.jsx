import React from 'react'
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import Container from '@/Components/Container';
import Table from '@/Components/Table';
import Button from '@/Components/Button';
import Pagination from '@/Components/Pagination';
import { Head, usePage } from '@inertiajs/react';
import Search from '@/Components/Search';
import hasAnyPermission from '@/Utils/Permissions';

export default function Index({ auth }) {
    const { permissions, filters } = usePage().props;

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={<h2 className="text-xl font-semibold text-slate-800">Manajemen Permissions</h2>}
        >
            <Head title="Permissions" />

            <Container>
                {/* Header Section */}
                <div className="mb-6">
                    <h1 className="text-2xl font-bold text-slate-900 mb-1">Daftar Hak Akses</h1>
                    <p className="text-sm text-slate-500">
                        Kelola daftar permissions yang digunakan untuk kontrol akses pengguna dalam sistem.
                    </p>
                </div>

                {/* Actions + Search */}
                <div className="mb-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                    {hasAnyPermission(['permissions create']) && (
                        <Button type="add" url={route('permissions.create')}>
                            Tambah Permission
                        </Button>
                    )}
                    <div className="w-full sm:w-1/2">
                        <Search
                            url={route('permissions.index')}
                            placeholder="Cari permission berdasarkan nama..."
                            filter={filters}
                        />
                    </div>
                </div>

                {/* Table Section */}
                <Table.Card title="Permissions">
                    <Table>
                        <Table.Thead>
                            <tr className="bg-slate-100">
                                <Table.Th className="w-10">#</Table.Th>
                                <Table.Th>Nama Permission</Table.Th>
                                <Table.Th className="w-40 text-center">Aksi</Table.Th>
                            </tr>
                        </Table.Thead>
                        <Table.Tbody>
                            {permissions.data.map((permission, i) => (
                                <tr key={permission.id} className="hover:bg-slate-50">
                                    <Table.Td>
                                        {++i + (permissions.current_page - 1) * permissions.per_page}
                                    </Table.Td>
                                    <Table.Td>{permission.name}</Table.Td>
                                    <Table.Td>
                                        <div className="flex justify-center gap-2">
                                            {hasAnyPermission(['permissions edit']) && (
                                                <Button type="edit" url={route('permissions.edit', permission.id)} />
                                            )}
                                            {hasAnyPermission(['permissions delete']) && (
                                                <Button type="delete" url={route('permissions.destroy', permission.id)} />
                                            )}
                                        </div>
                                    </Table.Td>
                                </tr>
                            ))}
                        </Table.Tbody>
                    </Table>
                </Table.Card>

                {/* Pagination */}
                {permissions.last_page > 1 && (
                    <div className="mt-6 flex justify-center">
                        <Pagination links={permissions.links} />
                    </div>
                )}
            </Container>
        </AuthenticatedLayout>
    );
}
