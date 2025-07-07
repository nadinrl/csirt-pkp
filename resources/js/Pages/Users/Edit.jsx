import React from 'react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import Container from '@/Components/Container';
import { Head, useForm, usePage } from '@inertiajs/react';
import Input from '@/Components/Input';
import Button from '@/Components/Button';
import Card from '@/Components/Card';
import Swal from 'sweetalert2';
import Select2 from '@/Components/Select2';

export default function Edit({ auth }) {
    const { user, roles } = usePage().props;

    const formattedRoles = roles.map(role => ({
        value: role.name,
        label: role.name
    }));

    const { data, setData, post, errors } = useForm({
        name: user.name,
        email: user.email,
        selectedRoles: user.roles.map(role => role.name),
        _method: 'put',
    });

    const handleSelectedRoles = (selected) => {
        const selectedValues = selected.map(option => option.value);
        setData('selectedRoles', selectedValues);
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        post(route('users.update', user.id), {
            onSuccess: () => {
                Swal.fire({
                    title: 'Berhasil!',
                    text: 'Data pengguna berhasil diperbarui.',
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
            header={<h2 className="text-xl font-semibold text-slate-800">Edit Pengguna</h2>}
        >
            <Head title="Edit User" />
            <Container>
                <Card title="Form Edit Pengguna">
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
                                options={formattedRoles}
                                value={formattedRoles.filter(role => data.selectedRoles.includes(role.value))}
                                onChange={handleSelectedRoles}
                                placeholder="Pilih role pengguna"
                            />
                            {errors.selectedRoles && (
                                <p className="text-sm text-red-500 mt-1">{errors.selectedRoles}</p>
                            )}
                        </div>

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
