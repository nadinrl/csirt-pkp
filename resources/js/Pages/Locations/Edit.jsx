import React from 'react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, useForm, usePage } from '@inertiajs/react';
import Container from '@/Components/Container';
import Card from '@/Components/Card';
import Input from '@/Components/Input';
import Button from '@/Components/Button';
import Swal from 'sweetalert2';

export default function Edit({ auth }) {
    const { location } = usePage().props;

    const { data, setData, post, processing, errors } = useForm({
        province: location.province,
        city: location.city,
        district: location.district,
        latitude: location.latitude,
        longitude: location.longitude,
        _method: 'put',
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        post(route('locations.update', location.id), {
            onSuccess: () => {
                Swal.fire({
                    title: 'Berhasil!',
                    text: 'Data lokasi berhasil diperbarui.',
                    icon: 'success',
                    showConfirmButton: false,
                    timer: 1500,
                });
            }
        });
    };

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={<h2 className="text-xl font-semibold leading-tight text-gray-800">Edit Lokasi</h2>}
        >
            <Head title="Edit Lokasi" />
            <Container>
                <Card title="Form Edit Lokasi">
                    <form onSubmit={handleSubmit}>
                        <div className="mb-4">
                            <Input
                                label="Provinsi"
                                value={data.province}
                                onChange={(e) => setData('province', e.target.value)}
                                errors={errors.province}
                                placeholder="Contoh: Jawa Barat"
                            />
                        </div>
                        <div className="mb-4">
                            <Input
                                label="Kota / Kabupaten"
                                value={data.city}
                                onChange={(e) => setData('city', e.target.value)}
                                errors={errors.city}
                                placeholder="Contoh: Bandung"
                            />
                        </div>
                        <div className="mb-4">
                            <Input
                                label="Kecamatan"
                                value={data.district}
                                onChange={(e) => setData('district', e.target.value)}
                                errors={errors.district}
                                placeholder="Contoh: Cibeunying Kidul"
                            />
                        </div>
                        <div className="mb-4">
                            <Input
                                label="Latitude"
                                value={data.latitude}
                                onChange={(e) => setData('latitude', e.target.value)}
                                errors={errors.latitude}
                                placeholder="-6.90389"
                            />
                        </div>
                        <div className="mb-4">
                            <Input
                                label="Longitude"
                                value={data.longitude}
                                onChange={(e) => setData('longitude', e.target.value)}
                                errors={errors.longitude}
                                placeholder="107.61861"
                            />
                        </div>
                        <div className="flex items-center gap-2">
                            <Button type="submit" disabled={processing} />
                            <Button type="cancel" url={route('locations.index')} />
                        </div>
                    </form>
                </Card>
            </Container>
        </AuthenticatedLayout>
    );
}
