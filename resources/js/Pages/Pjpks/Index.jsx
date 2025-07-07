import React from 'react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import Container from '@/Components/Container';
import Table from '@/Components/Table';
import Button from '@/Components/Button';
import Pagination from '@/Components/Pagination';
import Search from '@/Components/Search';
import { Head, usePage } from '@inertiajs/react';
import hasAnyPermission from '@/Utils/Permissions';

export default function Index({ auth }) {
    const { pjpks, filters } = usePage().props;

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={<h2 className="text-xl font-semibold leading-tight text-gray-800">Daftar PJPK</h2>}
        >
            <Head title="PJPK" />
            <Container>
                <div className="mb-4 flex items-center justify-between gap-4">
                    {hasAnyPermission(['pjpks create']) && (
                        <Button type="add" url={route('pjpks.create')} />
                    )}
                    <div className="w-full md:w-4/6">
                        <Search
                            url={route('pjpks.index')}
                            placeholder="Cari data PJPK berdasarkan nama..."
                            filter={filters}
                        />
                    </div>
                </div>

                <Table.Card title="Data Penanggung Jawab Proyek Kerja Sama (PJPK)">
                    <Table>
                        <Table.Thead>
                            <tr>
                                <Table.Th>#</Table.Th>
                                <Table.Th>Nama PJPK</Table.Th>
                                <Table.Th>Instansi</Table.Th>
                                <Table.Th>Jenis</Table.Th>
                                <Table.Th>Kontak</Table.Th>
                                <Table.Th>Aksi</Table.Th>
                            </tr>
                        </Table.Thead>
                        <Table.Tbody>
                            {pjpks.data.map((item, index) => (
                                <tr key={item.id}>
                                    <Table.Td>
                                        {index + 1 + (pjpks.current_page - 1) * pjpks.per_page}
                                    </Table.Td>
                                    <Table.Td>{item.name}</Table.Td>
                                    <Table.Td>{item.instansi || '-'}</Table.Td>
                                    <Table.Td className="capitalize">{item.type}</Table.Td>
                                    <Table.Td>{item.kontak || '-'}</Table.Td>
                                    <Table.Td>
                                        <div className="flex gap-2">
                                            {hasAnyPermission(['pjpks edit']) && (
                                                <Button type="edit" url={route('pjpks.edit', item.id)} />
                                            )}
                                            {hasAnyPermission(['pjpks delete']) && (
                                                <Button type="delete" url={route('pjpks.destroy', item.id)} />
                                            )}
                                        </div>
                                    </Table.Td>
                                </tr>
                            ))}
                        </Table.Tbody>
                    </Table>
                </Table.Card>

                <div className="flex justify-center mt-4">
                    {pjpks.last_page !== 1 && <Pagination links={pjpks.links} />}
                </div>
            </Container>
        </AuthenticatedLayout>
    );
}
