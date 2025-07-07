import React from 'react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import Container from '@/Components/Container';
import Card from '@/Components/Card';
import Input from '@/Components/Input';
import Button from '@/Components/Button';
import Select from '@/Components/Select';
import TextArea from '@/Components/TextArea';
import { Head, useForm } from '@inertiajs/react';
import Swal from 'sweetalert2';

export default function Create({ auth }) {
    const { data, setData, post, errors } = useForm({
        name: '',
        instansi: '',
        type: 'pusat',
        alamat: '',
        kontak: '',
    });

    const handleSubmit = (e) => {
        e.preventDefault();

        post(route('pjpks.store'), {
            onSuccess: () => {
                Swal.fire({
                    icon: 'success',
                    title: 'Berhasil!',
                    text: 'Data PJPK berhasil ditambahkan.',
                    timer: 1500,
                    showConfirmButton: false,
                });
            },
        });
    };

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={<h2 className="text-xl font-semibold leading-tight text-gray-800">Tambah PJPK</h2>}
        >
            <Head title="Tambah PJPK" />
            <Container>
                <Card title="Form Tambah PJPK">
                    <form onSubmit={handleSubmit}>
                        <div className="mb-4">
                            <Input
                                label="Nama PJPK"
                                value={data.name}
                                onChange={(e) => setData('name', e.target.value)}
                                errors={errors.name}
                                placeholder="Masukkan nama PJPK"
                                required
                            />
                        </div>

                        <div className="mb-4">
                            <Input
                                label="Instansi"
                                value={data.instansi}
                                onChange={(e) => setData('instansi', e.target.value)}
                                errors={errors.instansi}
                                placeholder="Nama instansi (opsional)"
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
                                placeholder="Alamat lengkap (opsional)"
                            />
                        </div>

                        <div className="mb-4">
                            <Input
                                label="Kontak"
                                value={data.kontak}
                                onChange={(e) => setData('kontak', e.target.value)}
                                errors={errors.kontak}
                                placeholder="Nomor kontak (opsional)"
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
