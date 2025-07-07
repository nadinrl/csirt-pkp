import React from 'react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import Container from '@/Components/Container';
import Card from '@/Components/Card';
import Input from '@/Components/Input';
import Button from '@/Components/Button';
import TextArea from '@/Components/TextArea';
import { Head, useForm } from '@inertiajs/react';
import Swal from 'sweetalert2';

export default function Create({ auth }) {
    const { data, setData, post, errors } = useForm({
        name: '',
        institution: '',
        email: '',
        phone: '',
        address: '',
    });

    const handleSubmit = (e) => {
        e.preventDefault();

        post(route('initiators.store'), {
            onSuccess: () => {
                Swal.fire({
                    icon: 'success',
                    title: 'Berhasil!',
                    text: 'Data berhasil ditambahkan.',
                    timer: 1500,
                    showConfirmButton: false,
                });
            },
        });
    };

    return (
        <AuthenticatedLayout user={auth.user} header={<h2 className="text-xl font-semibold text-gray-800">Tambah Badan Pemprakarsa</h2>}>
            <Head title="Tambah Initiator" />
            <Container>
                <Card title="Form Tambah Badan Pemprakarsa">
                    <form onSubmit={handleSubmit}>
                        <div className="mb-4">
                            <Input label="Nama" value={data.name} onChange={(e) => setData('name', e.target.value)} errors={errors.name} required />
                        </div>
                        <div className="mb-4">
                            <Input label="Instansi" value={data.institution} onChange={(e) => setData('institution', e.target.value)} errors={errors.institution} />
                        </div>
                        <div className="mb-4">
                            <Input label="Email" type="email" value={data.email} onChange={(e) => setData('email', e.target.value)} errors={errors.email} />
                        </div>
                        <div className="mb-4">
                            <Input label="Telepon" value={data.phone} onChange={(e) => setData('phone', e.target.value)} errors={errors.phone} />
                        </div>
                        <div className="mb-4">
                            <TextArea label="Alamat" value={data.address} onChange={(e) => setData('address', e.target.value)} errors={errors.address} />
                        </div>
                        <div className="flex gap-2 mt-4">
                            <Button type="submit" />
                            <Button type="cancel" url={route('initiators.index')} />
                        </div>
                    </form>
                </Card>
            </Container>
        </AuthenticatedLayout>
    );
}
