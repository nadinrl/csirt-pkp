import React from 'react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import Container from '@/Components/Container';
import { Head, useForm } from '@inertiajs/react';
import Input from '@/Components/Input';
import Button from '@/Components/Button';
import Card from '@/Components/Card';
import Swal from 'sweetalert2';

export default function Create({ auth }) {
    const { data, setData, post, errors, reset } = useForm({
        name: ''
    });

    const handleSubmit = (e) => {
        e.preventDefault();

        post(route('permissions.store'), {
            onSuccess: () => {
                Swal.fire({
                    title: 'Berhasil!',
                    text: 'Permission berhasil ditambahkan.',
                    icon: 'success',
                    showConfirmButton: false,
                    timer: 1500
                });
                reset();
            }
        });
    };

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={<h2 className="text-xl font-semibold text-slate-800 leading-tight">Buat Permission Baru</h2>}
        >
            <Head title="Create Permission" />
            <Container>
                <Card title="Form Tambah Permission">
                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div>
                            <Input
                                label="Nama Permission"
                                type="text"
                                value={data.name}
                                onChange={e => setData('name', e.target.value)}
                                errors={errors.name}
                                placeholder="Contoh: permissions.create"
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
