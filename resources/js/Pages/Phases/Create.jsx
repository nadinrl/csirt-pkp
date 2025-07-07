import React from 'react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import Container from '@/Components/Container';
import Card from '@/Components/Card';
import Input from '@/Components/Input';
import Select from '@/Components/Select';
import Button from '@/Components/Button';
import { Head, useForm } from '@inertiajs/react';
import Swal from 'sweetalert2';

export default function Create({ auth }) {
    const { data, setData, post, errors } = useForm({
        name: '',
        initiator_type: 'solicited',
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        post(route('phases.store'), {
            onSuccess: () => {
                Swal.fire({ icon: 'success', title: 'Berhasil!', text: 'Tahapan berhasil ditambahkan', timer: 1500, showConfirmButton: false });
            },
        });
    };

    return (
        <AuthenticatedLayout user={auth.user} header={<h2 className="text-xl font-semibold">Tambah Tahapan</h2>}>
            <Head title="Tambah Tahapan" />
            <Container>
                <Card title="Form Tambah Tahapan">
                    <form onSubmit={handleSubmit}>
                        <div className="mb-4">
                            <Input
                                label="Nama Tahapan"
                                value={data.name}
                                onChange={(e) => setData('name', e.target.value)}
                                errors={errors.name}
                                required
                            />
                        </div>
                        <div className="mb-4">
                            <Select
                                label="Tipe Inisiator"
                                value={data.initiator_type}
                                onChange={(e) => setData('initiator_type', e.target.value)}
                                errors={errors.initiator_type}
                                options={[
                                    { label: 'Solicited', value: 'solicited' },
                                    { label: 'Unsolicited', value: 'unsolicited' },
                                ]}
                            />
                        </div>
                        <div className="flex gap-2 mt-4">
                            <Button type="submit" />
                            <Button type="cancel" url={route('phases.index')} />
                        </div>
                    </form>
                </Card>
            </Container>
        </AuthenticatedLayout>
    );
}
