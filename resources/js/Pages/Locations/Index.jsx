import React from 'react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, usePage } from '@inertiajs/react';
import Table from '@/Components/Table';
import Button from '@/Components/Button';
import Pagination from '@/Components/Pagination';
import Search from '@/Components/Search';
import Container from '@/Components/Container';

export default function Index({ auth }) {
    const { locations, filters } = usePage().props;

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={<h2 className="text-xl font-semibold leading-tight text-gray-800">Referensi Lokasi</h2>}
        >
            <Head title="Data Lokasi" />
            <Container>
                <div className="mb-4 flex items-center justify-between gap-4">
                    <Button type="add" url={route('locations.create')} />
                    <div className="w-full md:w-4/6">
                        <Search
                            url={route('locations.index')}
                            placeholder="Cari berdasarkan provinsi..."
                            filter={filters}
                        />
                    </div>
                </div>

                <Table.Card title="Daftar Lokasi">
                    <Table>
                        <Table.Thead>
                            <tr>
                                <Table.Th>#</Table.Th>
                                <Table.Th>Provinsi</Table.Th>
                                <Table.Th>Kota</Table.Th>
                                <Table.Th>Kecamatan</Table.Th>
                                <Table.Th>Latitude</Table.Th>
                                <Table.Th>Longitude</Table.Th>
                                <Table.Th>Aksi</Table.Th>
                            </tr>
                        </Table.Thead>
                        <Table.Tbody>
                            {locations.data.map((loc, index) => (
                                <tr key={loc.id}>
                                    <Table.Td>{index + 1 + (locations.current_page - 1) * locations.per_page}</Table.Td>
                                    <Table.Td>{loc.province}</Table.Td>
                                    <Table.Td>{loc.city}</Table.Td>
                                    <Table.Td>{loc.district || '-'}</Table.Td>
                                    <Table.Td>{loc.latitude || '-'}</Table.Td>
                                    <Table.Td>{loc.longitude || '-'}</Table.Td>
                                    <Table.Td>
                                        <div className="flex gap-2">
                                            <Button type="edit" url={route('locations.edit', loc.id)} />
                                            <Button type="delete" url={route('locations.destroy', loc.id)} />
                                        </div>
                                    </Table.Td>
                                </tr>
                            ))}
                        </Table.Tbody>
                    </Table>
                </Table.Card>

                <div className="mt-4 flex justify-center">
                    <Pagination links={locations.links} />
                </div>
            </Container>
        </AuthenticatedLayout>
    );
}
