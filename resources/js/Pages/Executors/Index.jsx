import React from 'react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import Container from '@/Components/Container';
import Card from '@/Components/Card';
import Table from '@/Components/Table';
import Button from '@/Components/Button';
import Pagination from '@/Components/Pagination';
import Search from '@/Components/Search';
import { Head, Link, usePage } from '@inertiajs/react';
import hasAnyPermission from '@/Utils/Permissions';

export default function Index({ auth }) {
    const { executors, filters } = usePage().props;

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={<h2 className="text-xl font-semibold text-gray-800">Daftar Badan Usaha Pelaksana</h2>}
        >
            <Head title="Executors" />

            <Container>
                <div className="mb-4 flex items-center justify-between gap-4">
                    {hasAnyPermission(['executors create']) && (
                        <Button type="add" url={route('executors.create')} />
                    )}
                    <div className="w-full md:w-4/6">
                        <Search
                            url={route('executors.index')}
                            placeholder="Cari badan usaha berdasarkan nama..."
                            filter={filters}
                        />
                    </div>
                </div>

                <Card title="Data Badan Usaha Pelaksana">
                    <Table>
                        <Table.Thead>
                            <tr>
                                <Table.Th>#</Table.Th>
                                <Table.Th>Nama Badan Usaha</Table.Th>
                                <Table.Th>Induk</Table.Th>
                                <Table.Th>Email</Table.Th>
                                <Table.Th>Telepon</Table.Th>
                                <Table.Th>Aksi</Table.Th>
                            </tr>
                        </Table.Thead>
                        <Table.Tbody>
                            {executors.data.map((item, index) => (
                                <tr key={item.id}>
                                    <Table.Td>
                                        {index + 1 + (executors.current_page - 1) * executors.per_page}
                                    </Table.Td>
                                    <Table.Td>{item.name}</Table.Td>
                                    <Table.Td>{item.institution || '-'}</Table.Td>
                                    <Table.Td>{item.email || '-'}</Table.Td>
                                    <Table.Td>{item.phone || '-'}</Table.Td>
                                    <Table.Td>
                                        <div className="flex gap-2">
                                            {hasAnyPermission(['executors edit']) && (
                                                <Button type="edit" url={route('executors.edit', item.id)} />
                                            )}
                                            {hasAnyPermission(['executors delete']) && (
                                                <Button type="delete" url={route('executors.destroy', item.id)} />
                                            )}
                                        </div>
                                    </Table.Td>
                                </tr>
                            ))}
                        </Table.Tbody>
                    </Table>

                    <div className="mt-4 flex justify-center">
                        {executors.last_page !== 1 && <Pagination links={executors.links} />}
                    </div>
                </Card>
            </Container>
        </AuthenticatedLayout>
    );
}
