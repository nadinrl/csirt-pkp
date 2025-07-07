import React from 'react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import Container from '@/Components/Container';
import Card from '@/Components/Card';
import Input from '@/Components/Input';
import TextArea from '@/Components/TextArea';
import Button from '@/Components/Button';
import { Head, useForm } from '@inertiajs/react';
import Swal from 'sweetalert2';

export default function Edit({ auth, executor }) {
    const { data, setData, put, errors } = useForm({
        name: executor.name || '',
        institution: executor.institution || '',
        email: executor.email || '',
        phone: executor.phone || '',
        address: executor.address || '',
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        put(route('executors.update', executor.id), {
            onSuccess: () => {
                Swal.fire('Berhasil!', 'Executor berhasil diperbarui.', 'success');
            },
        });
    };

    return (
        <AuthenticatedLayout user={auth.user} header={<h2 className="text-xl font-semibold">Edit Executor</h2>}>
            <Head title="Edit Executor" />
            <Container>
                <Card title="Form Edit Executor">
                    <form onSubmit={handleSubmit}>
                        <Input label="Nama Executor" value={data.name} onChange={e => setData('name', e.target.value)} errors={errors.name} required />
                        <Input label="Institusi" value={data.institution} onChange={e => setData('institution', e.target.value)} errors={errors.institution} />
                        <Input label="Email" type="email" value={data.email} onChange={e => setData('email', e.target.value)} errors={errors.email} />
                        <Input label="Nomor Telepon" value={data.phone} onChange={e => setData('phone', e.target.value)} errors={errors.phone} />
                        <TextArea label="Alamat" value={data.address} onChange={e => setData('address', e.target.value)} errors={errors.address} />
                        <div className="flex gap-2 mt-4">
                            <Button type="submit">Update</Button>
                            <Button type="cancel" url={route('executors.index')} />
                        </div>
                    </form>
                </Card>
            </Container>
        </AuthenticatedLayout>
    );
}
