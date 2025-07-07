import React from 'react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import Container from '@/Components/Container';
import Table from '@/Components/Table';
import Button from '@/Components/Button';
import Pagination from '@/Components/Pagination';
import { Head, usePage } from '@inertiajs/react';
import Search from '@/Components/Search';
import hasAnyPermission from '@/Utils/Permissions';

export default function Index({ auth }) {
    const { projects, filters } = usePage().props;

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Daftar Proyek KPBU</h2>}
        >
            <Head title="Proyek KPBU" />
            <Container>
                <div className="mb-4 flex flex-col md:flex-row items-center justify-between gap-4">
                    {hasAnyPermission(['projects create']) && (
                        <Button type="add" url={route('proyek.create')} />
                    )}
                    <div className="w-full md:w-4/6">
                        <Search
                            url={route('proyek.index')}
                            placeholder="Cari berdasarkan nama proyek..."
                            filter={filters}
                        />
                    </div>
                </div>

                <Table.Card title="Daftar Proyek KPBU">
                    <Table>
                        <Table.Thead>
                            <tr>
                                <Table.Th>#</Table.Th>
                                <Table.Th>Proyek</Table.Th>
                                <Table.Th>Lokasi</Table.Th>
                                <Table.Th>PJPK</Table.Th>
                                <Table.Th>Status</Table.Th>
                                <Table.Th>Pegawai</Table.Th>
                                <Table.Th>Aksi</Table.Th>
                            </tr>
                        </Table.Thead>
                        <Table.Tbody>
                            {projects.data.map((project, i) => {
                                const isAssigned =
                                    project.assigned_users &&
                                    project.assigned_users.some(user => user.id === auth.user.id);

                                return (
                                    <tr key={project.id} className="hover:bg-gray-50">
                                        <Table.Td>{++i + (projects.current_page - 1) * projects.per_page}</Table.Td>

                                        <Table.Td>
                                            <div className="font-medium">{project.name}</div>
                                            <div className="text-xs text-gray-500">
                                                {project.initiator_type === 'solicited'
                                                    ? '🟢 Solicited'
                                                    : '🟠 Unsolicited'}
                                            </div>
                                        </Table.Td>

                                        <Table.Td>
                                            {project.lokasi?.province} - {project.lokasi?.city}
                                        </Table.Td>

                                        <Table.Td>
                                            {project.pjpk?.name || '-'}
                                        </Table.Td>

                                        <Table.Td>
                                            {project.latest_status ? (
                                                <div className="text-sm leading-tight">
                                                    <div className="font-semibold text-green-700">{project.latest_status.status}</div>
                                                    {project.latest_status.issue && (
                                                        <div className="text-xs text-red-600 italic">
                                                            Isu: {project.latest_status.issue}
                                                        </div>
                                                    )}
                                                </div>
                                            ) : (
                                                <span className="inline-block text-xs px-3 py-1 rounded bg-gray-100 text-gray-600">
                                                    Belum ada status
                                                </span>
                                            )}
                                        </Table.Td>

                                        <Table.Td>
                                            {project.assigned_users?.length > 0 ? (
                                                <div className="flex flex-wrap gap-1">
                                                    {project.assigned_users.map(user => (
                                                        <span
                                                            key={user.id}
                                                            className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-md"
                                                            title={`Email: ${user.email}`}
                                                        >
                                                            {user.name}
                                                        </span>
                                                    ))}
                                                </div>
                                            ) : (
                                                <span className="inline-block text-xs px-3 py-1 rounded bg-red-100 text-red-700 font-medium">
                                                    Tidak ada pegawai
                                                </span>
                                            )}
                                        </Table.Td>

                                        <Table.Td>
                                            <div className="flex flex-wrap items-center gap-2">
                                                {/* Admin/Pimpinan Actions */}
                                                {hasAnyPermission(['projects edit']) && (
                                                    <Button type="edit" url={route('proyek.edit', project.id)} />
                                                )}
                                                {hasAnyPermission(['projects edit']) && (
                                                    <Button
                                                        type="info"
                                                        url={route('assignments.index', project.id)}
                                                        title="Penugasan"
                                                    />
                                                )}
                                                {hasAnyPermission(['projects delete']) && (
                                                    <Button type="delete" url={route('proyek.destroy', project.id)} />
                                                )}

                                                {/* Pegawai Assigned Actions */}
                                                {isAssigned && (
                                                    <>
                                                        <Button
                                                            type="info"
                                                            title="Update Status"
                                                            url={route('proyek.status.create', project.id)}
                                                        />
                                                        <Button
                                                            type="info"
                                                            title="Update Fase"
                                                            url={route('proyek.phase.create', project.id)}
                                                        />
                                                        <Button
                                                            type="info"
                                                            title="Tambah Laporan Mingguan"
                                                            url={route('laporan.create', project.id)}
                                                        />
                                                        <Button
                                                            type="info"
                                                            title="Tambah Kronologi"
                                                            url={route('kronologi.create', project.id)}
                                                        />
                                                    </>
                                                )}
                                            </div>
                                        </Table.Td>
                                    </tr>
                                );
                            })}
                        </Table.Tbody>
                    </Table>
                </Table.Card>

                <div className="flex justify-center mt-4">
                    {projects.last_page !== 1 && <Pagination links={projects.links} />}
                </div>
            </Container>
        </AuthenticatedLayout>
    );
}
