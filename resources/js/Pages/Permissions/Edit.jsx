import React from 'react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import Container from '@/Components/Container';
import { Head, useForm, usePage } from '@inertiajs/react';
import Input from '@/Components/Input';
import Button from '@/Components/Button';
import Card from '@/Components/Card';
import Swal from 'sweetalert2';

export default function Edit({ auth }) {
    const { permission } = usePage().props;

    const { data, setData, post, errors } = useForm({
        name: permission.name,
        _method: 'put',
    });

    const handleSubmit = (e) => {
        e.preventDefault();

        post(route('permissions.update', permission.id), {
            onSuccess: () => {
                Swal.fire({
                    title: 'Berhasil!',
                    text: 'Permission berhasil diperbarui.',
                    icon: 'success',
                    showConfirmButton: false,
                    timer: 1500,
                });
            },
        });
    };

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={<h2 className="text-xl font-semibold text-slate-800 leading-tight">Edit Permission</h2>}
        >
            <Head title="Edit Permission" />
            <Container>
                <Card title="Form Ubah Permission">
                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div>
                            <Input
                                label="Nama Permission"
                                type="text"
                                value={data.name}
                                onChange={(e) => setData('name', e.target.value)}
                                errors={errors.name}
                                placeholder="Contoh: permissions.update"
                            />
                        </div>

                        <div className="flex items-center gap-2">
                            <Button type="submit" />
                            <Button type="cancel" url={route('permissions.index')} />
                        </div>
                    </form>
                </Card>
            </Container>
        </AuthenticatedLayout>
    );
}
