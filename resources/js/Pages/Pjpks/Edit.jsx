import React from 'react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import Container from '@/Components/Container';
import Card from '@/Components/Card';
import Input from '@/Components/Input';
import Button from '@/Components/Button';
import Select from '@/Components/Select';
import TextArea from '@/Components/TextArea';
import { Head, useForm, usePage } from '@inertiajs/react';
import Swal from 'sweetalert2';

export default function Edit({ auth }) {
    const { pjpk } = usePage().props;

    const { data, setData, post, errors } = useForm({
        name: pjpk.name,
        instansi: pjpk.instansi || '',
        type: pjpk.type || 'pusat',
        alamat: pjpk.alamat || '',
        kontak: pjpk.kontak || '',
        _method: 'put',
    });

    const handleSubmit = (e) => {
        e.preventDefault();

        post(route('pjpks.update', pjpk.id), {
            onSuccess: () => {
                Swal.fire({
                    icon: 'success',
                    title: 'Berhasil!',
                    text: 'Data PJPK berhasil diperbarui.',
                    timer: 1500,
                    showConfirmButton: false,
                });
            },
        });
    };

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={<h2 className="text-xl font-semibold leading-tight text-gray-800">Edit PJPK</h2>}
        >
            <Head title="Edit PJPK" />
            <Container>
                <Card title="Form Edit PJPK">
                    <form onSubmit={handleSubmit}>
                        <div className="mb-4">
                            <Input
                                label="Nama PJPK"
                                value={data.name}
                                onChange={(e) => setData('name', e.target.value)}
                                errors={errors.name}
                                required
                            />
                        </div>

                        <div className="mb-4">
                            <Input
                                label="Instansi"
                                value={data.instansi}
                                onChange={(e) => setData('instansi', e.target.value)}
                                errors={errors.instansi}
                            />
                        </div>

                        <div className="mb-4">
                            <Select
                                label="Jenis PJPK"
                                value={data.type}
                                onChange={(e) => setData('type', e.target.value)}
                                errors={errors.type}
                                options={[
                                    { label: 'Pusat', value: 'pusat' },
                                    { label: 'Daerah', value: 'daerah' },
                                ]}
                            />
                        </div>

                        <div className="mb-4">
                            <TextArea
                                label="Alamat"
                                value={data.alamat}
                                onChange={(e) => setData('alamat', e.target.value)}
                                errors={errors.alamat}
                            />
                        </div>

                        <div className="mb-4">
                            <Input
                                label="Kontak"
                                value={data.kontak}
                                onChange={(e) => setData('kontak', e.target.value)}
                                errors={errors.kontak}
                            />
                        </div>

                        <div className="flex gap-2 mt-4">
                            <Button type="submit" />
                            <Button type="cancel" url={route('pjpks.index')} />
                        </div>
                    </form>
                </Card>
            </Container>
        </AuthenticatedLayout>
    );
}
