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
    const { phaseSteps, filters } = usePage().props;

    return (
        <AuthenticatedLayout user={auth.user} header={<h2 className="text-xl font-semibold">Daftar Langkah Fase</h2>}>
            <Head title="Langkah Fase" />
            <Container>
                <div className="mb-4 flex items-center justify-between gap-4">
                    {hasAnyPermission(['phase-steps create']) && (
                        <Button type="add" url={route('phase-steps.create')} />
                    )}
                    <div className="w-full md:w-4/6">
                        <Search
                            url={route('phase-steps.index')}
                            placeholder="Cari berdasarkan nama langkah..."
                            filter={filters}
                        />
                    </div>
                </div>

                <Card title="Data Langkah Fase">
                    <Table>
                        <Table.Thead>
                            <tr>
                                <Table.Th>#</Table.Th>
                                <Table.Th>Nama Langkah</Table.Th>
                                <Table.Th>Fase</Table.Th>
                                <Table.Th>Tipe Inisiator</Table.Th>
                                <Table.Th>Urutan</Table.Th>
                                <Table.Th>Aksi</Table.Th>
                            </tr>
                        </Table.Thead>
                        <Table.Tbody>
                            {phaseSteps.data.map((step, index) => (
                                <tr key={step.id}>
                                    <Table.Td>{index + 1 + (phaseSteps.current_page - 1) * phaseSteps.per_page}</Table.Td>
                                    <Table.Td>{step.name}</Table.Td>
                                    <Table.Td>{step.phase?.name || '-'}</Table.Td>
                                    <Table.Td className="capitalize">{step.phase?.initiator_type || '-'}</Table.Td>
                                    <Table.Td>{step.step_order}</Table.Td>
                                    <Table.Td>
                                        <div className="flex gap-2">
                                            {hasAnyPermission(['phase-steps edit']) && (
                                                <Button type="edit" url={route('phase-steps.edit', step.id)} />
                                            )}
                                            {hasAnyPermission(['phase-steps delete']) && (
                                                <Button type="delete" url={route('phase-steps.destroy', step.id)} />
                                            )}
                                        </div>
                                    </Table.Td>
                                </tr>
                            ))}
                        </Table.Tbody>
                    </Table>
                    <div className="mt-4 flex justify-center">
                        {phaseSteps.last_page > 1 && <Pagination links={phaseSteps.links} />}
                    </div>
                </Card>
            </Container>
        </AuthenticatedLayout>
    );
}
