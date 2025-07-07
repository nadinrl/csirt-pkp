import React from 'react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import Container from '@/Components/Container';
import Card from '@/Components/Card';
import Table from '@/Components/Table';
import Pagination from '@/Components/Pagination';
import Search from '@/Components/Search';
import Button from '@/Components/Button';
import { Head, Link, usePage } from '@inertiajs/react';
import hasAnyPermission from '@/Utils/Permissions';

export default function Index({ auth }) {
    const { phases, filters } = usePage().props;

    return (
        <AuthenticatedLayout user={auth.user} header={<h2 className="text-xl font-semibold">Daftar Tahapan</h2>}>
            <Head title="Tahapan Proyek" />
            <Container>
                <div className="mb-4 flex items-center justify-between gap-4">
                    {hasAnyPermission(['phases create']) && (
                        <Button type="add" url={route('phases.create')} />
                    )}
                    <div className="w-full md:w-4/6">
                        <Search
                            url={route('phases.index')}
                            placeholder="Cari tahapan berdasarkan nama..."
                            filter={filters}
                        />
                    </div>
                </div>

                <Card title="Data Tahapan Proyek">
                    <Table>
                        <Table.Thead>
                            <tr>
                                <Table.Th>#</Table.Th>
                                <Table.Th>Nama Tahapan</Table.Th>
                                <Table.Th>Tipe Inisiator</Table.Th>
                                <Table.Th>Aksi</Table.Th>
                            </tr>
                        </Table.Thead>
                        <Table.Tbody>
                            {phases.data.map((phase, index) => (
                                <tr key={phase.id}>
                                    <Table.Td>{index + 1 + (phases.current_page - 1) * phases.per_page}</Table.Td>
                                    <Table.Td>{phase.name}</Table.Td>
                                    <Table.Td className="capitalize">{phase.initiator_type}</Table.Td>
                                    <Table.Td>
                                        <div className="flex gap-2">
                                            {hasAnyPermission(['phases edit']) && (
                                                <Button type="edit" url={route('phases.edit', phase.id)} />
                                            )}
                                            {hasAnyPermission(['phases delete']) && (
                                                <Button type="delete" url={route('phases.destroy', phase.id)} />
                                            )}
                                        </div>
                                    </Table.Td>
                                </tr>
                            ))}
                        </Table.Tbody>
                    </Table>
                    <div className="mt-4 flex justify-center">
                        {phases.last_page !== 1 && <Pagination links={phases.links} />}
                    </div>
                </Card>
            </Container>
        </AuthenticatedLayout>
    );
}
