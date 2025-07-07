import React from 'react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import Container from '@/Components/Container';
import { Head, useForm, usePage } from '@inertiajs/react';
import Input from '@/Components/Input';
import Button from '@/Components/Button';
import Card from '@/Components/Card';
import Select2 from '@/Components/Select2';
import Swal from 'sweetalert2';

export default function Create({ auth }) {
    const { roles } = usePage().props;

    const { data, setData, post, errors } = useForm({
        name: '',
        email: '',
        selectedRoles: [],
        password: '',
        password_confirmation: ''
    });

    const formattedRoles = roles.map(role => ({
        value: role.name,
        label: role.name
    }));

    const handleSelectedRoles = (selected) => {
        const selectedValues = selected.map(option => option.value);
        setData('selectedRoles', selectedValues);
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        post(route('users.store'), {
            onSuccess: () => {
                Swal.fire({
                    title: 'Berhasil!',
                    text: 'Pengguna berhasil dibuat.',
                    icon: 'success',
                    showConfirmButton: false,
                    timer: 1500
                });
            }
        });
    };

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={<h2 className="text-xl font-semibold text-slate-800">Tambah Pengguna Baru</h2>}
        >
            <Head title="Create User" />
            <Container>
                <Card title="Form Tambah User">
                    <form onSubmit={handleSubmit} className="space-y-6">
                        <Input
                            label="Nama"
                            type="text"
                            value={data.name}
                            onChange={e => setData('name', e.target.value)}
                            errors={errors.name}
                            placeholder="Masukkan nama pengguna"
                        />

                        <Input
                            label="Email"
                            type="email"
                            value={data.email}
                            onChange={e => setData('email', e.target.value)}
                            errors={errors.email}
                            placeholder="Masukkan email pengguna"
                        />

                        <div>
                            <label className="block text-sm font-medium text-slate-700 mb-1">Roles</label>
                            <Select2
                                isMulti
                                onChange={handleSelectedRoles}
                                options={formattedRoles}
                                placeholder="Pilih role pengguna"
                            />
                            {errors.selectedRoles && (
                                <p className="text-sm text-red-500 mt-1">{errors.selectedRoles}</p>
                            )}
                        </div>

                        <Input
                            label="Password"
                            type="password"
                            value={data.password}
                            onChange={e => setData('password', e.target.value)}
                            errors={errors.password}
                            placeholder="Masukkan password"
                        />

                        <Input
                            label="Konfirmasi Password"
                            type="password"
                            value={data.password_confirmation}
                            onChange={e => setData('password_confirmation', e.target.value)}
                            errors={errors.password_confirmation}
                            placeholder="Ulangi password"
                        />

                        <div className="flex items-center gap-2">
                            <Button type="submit" />
                            <Button type="cancel" url={route('users.index')} />
                        </div>
                    </form>
                </Card>
            </Container>
        </AuthenticatedLayout>
    );
}
