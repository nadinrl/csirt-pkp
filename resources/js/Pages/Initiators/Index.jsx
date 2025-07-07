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
    const { initiators, filters } = usePage().props;

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={<h2 className="text-xl font-semibold leading-tight text-gray-800">Daftar Badan Pemprakarsa</h2>}
        >
            <Head title="Badan Pemprakarsa" />
            <Container>
                <div className="mb-4 flex items-center justify-between gap-4">
                    {hasAnyPermission(['initiators create']) && (
                        <Button type="add" url={route('initiators.create')} />
                    )}
                    <div className="w-full md:w-4/6">
                        <Search
                            url={route('initiators.index')}
                            placeholder="Cari badan pemprakarsa..."
                            filter={filters}
                        />
                    </div>
                </div>

                <Table.Card title="Data Badan Pemprakarsa">
                    <Table>
                        <Table.Thead>
                            <tr>
                                <Table.Th>#</Table.Th>
                                <Table.Th>Nama</Table.Th>
                                <Table.Th>Instansi</Table.Th>
                                <Table.Th>Email</Table.Th>
                                <Table.Th>Telepon</Table.Th>
                                <Table.Th>Aksi</Table.Th>
                            </tr>
                        </Table.Thead>
                        <Table.Tbody>
                            {initiators.data.map((item, index) => (
                                <tr key={item.id}>
                                    <Table.Td>{index + 1 + (initiators.current_page - 1) * initiators.per_page}</Table.Td>
                                    <Table.Td>{item.name}</Table.Td>
                                    <Table.Td>{item.institution || '-'}</Table.Td>
                                    <Table.Td>{item.email || '-'}</Table.Td>
                                    <Table.Td>{item.phone || '-'}</Table.Td>
                                    <Table.Td>
                                        <div className="flex gap-2">
                                            {hasAnyPermission(['initiators edit']) && (
                                                <Button type="edit" url={route('initiators.edit', item.id)} />
                                            )}
                                            {hasAnyPermission(['initiators delete']) && (
                                                <Button type="delete" url={route('initiators.destroy', item.id)} />
                                            )}
                                        </div>
                                    </Table.Td>
                                </tr>
                            ))}
                        </Table.Tbody>
                    </Table>
                </Table.Card>

                <div className="flex justify-center mt-4">
                    {initiators.last_page !== 1 && <Pagination links={initiators.links} />}
                </div>
            </Container>
        </AuthenticatedLayout>
    );
}
