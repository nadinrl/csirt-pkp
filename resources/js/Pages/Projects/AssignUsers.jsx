import React, { useMemo, useState } from 'react';
import { useForm } from '@inertiajs/react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import Container from '@/Components/Container';
import Button from '@/Components/Button';
import { IconUsers, IconArrowLeft, IconSearch } from '@tabler/icons-react';
import Swal from 'sweetalert2';

export default function AssignUsers({ project, users, auth }) {
    const [searchTerm, setSearchTerm] = useState('');

    const { post, delete: destroy, data, setData, processing, reset } = useForm({
        project_id: project.id,
        user_id: '',
        role: '',
    });

    // Filter pegawai yang belum ditugaskan
    const assignedIds = useMemo(() => project.assigned_users.map(u => u.id), [project]);
    const filteredUsers = useMemo(() =>
        users
            .filter(u => !assignedIds.includes(u.id))
            .filter(u =>
                u.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                u.email.toLowerCase().includes(searchTerm.toLowerCase())
            ), [searchTerm, users, assignedIds]);

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!data.user_id) return;

        post(route('assignments.store', project.id), {
            onSuccess: () => {
                Swal.fire({
                    toast: true,
                    position: 'top-end',
                    icon: 'success',
                    title: 'Pegawai berhasil ditugaskan!',
                    showConfirmButton: false,
                    timer: 2000,
                });
                reset('user_id', 'role');
            },
        });
    };

    const handleDelete = (userId) => {
		Swal.fire({
			title: 'Yakin ingin menghapus penugasan ini?',
			icon: 'warning',
			showCancelButton: true,
			confirmButtonText: 'Ya, hapus',
			cancelButtonText: 'Batal',
			confirmButtonColor: '#e11d48',
		}).then(result => {
			if (result.isConfirmed) {
				const deleteRoute = route('assignments.destroy', [project.id, userId]);
				console.log('DELETE URL:', deleteRoute);
				destroy(deleteRoute, {
					onSuccess: () => {
						Swal.fire({
							toast: true,
							position: 'top-end',
							icon: 'success',
							title: 'Penugasan dihapus',
							showConfirmButton: false,
							timer: 2000,
						});
					},
				});
			}
		});
	};


    return (
        <AuthenticatedLayout
            user={auth.user}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Penugasan Pegawai</h2>}
        >
            <Container>

                {/* Tombol kembali */}
                <div className="mb-4">
                    <Button
                        type="cancel"
                        url={route('proyek.index')}
                        label="Kembali ke Daftar Proyek"
                        icon={<IconArrowLeft size={16} strokeWidth={1.5} />}
                    />
                </div>

                {/* Detail Proyek */}
                <div className="bg-white border rounded-lg p-6 shadow-sm mb-6">
                    <h3 className="text-lg font-bold mb-2">{project.name}</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-slate-700">
                        <div><strong>Lokasi:</strong> {project.lokasi?.province} - {project.lokasi?.city}</div>
                        <div><strong>PJPK:</strong> {project.pjpk?.name}</div>
                        <div><strong>Status:</strong> {project.status ?? '-'}</div>
                        <div><strong>Skema:</strong> {project.skema_pengembalian ?? '-'}</div>
                    </div>
                </div>

                {/* Form Penugasan */}
                <form onSubmit={handleSubmit} className="bg-white border rounded-lg p-6 shadow-sm space-y-4 mb-8">
                    <h4 className="text-md font-semibold mb-2">Form Penugasan Pegawai</h4>

                    <div className="flex items-center gap-2 mb-2">
                        <IconSearch size={16} />
                        <input
                            type="text"
                            placeholder="Cari nama/email pegawai..."
                            value={searchTerm}
                            onChange={e => setSearchTerm(e.target.value)}
                            className="w-full border rounded px-3 py-2 text-sm"
                        />
                    </div>

                    <div>
                        <label className="block mb-1 font-semibold text-sm">Pilih Pegawai</label>
                        <select
                            value={data.user_id}
                            onChange={e => setData('user_id', e.target.value)}
                            className="w-full border rounded px-3 py-2 text-sm"
                        >
                            <option value="">-- Pilih Pegawai --</option>
                            {filteredUsers.length > 0 ? (
                                filteredUsers.map(user => (
                                    <option key={user.id} value={user.id}>
                                        {user.name} ({user.email})
                                    </option>
                                ))
                            ) : (
                                <option disabled>Tidak ditemukan / sudah ditugaskan</option>
                            )}
                        </select>
                    </div>

                    <div>
                        <label className="block mb-1 font-semibold text-sm">Role Penugasan</label>
                        <input
                            type="text"
                            className="w-full border rounded px-3 py-2 text-sm"
                            placeholder="Contoh: Penanggung Jawab"
                            value={data.role}
                            onChange={e => setData('role', e.target.value)}
                        />
                    </div>

                    <Button type="submit" disabled={processing}>Assign</Button>
                </form>

                {/* Daftar Pegawai Ditugaskan */}
                <div className="bg-white border rounded-lg p-6 shadow-sm">
                    <h4 className="text-md font-semibold mb-4 flex items-center gap-2">
                        <IconUsers size={18} /> Pegawai Ditugaskan
                    </h4>

                    {project.assigned_users.length > 0 ? (
                        <div className="grid gap-4 md:grid-cols-2">
                            {project.assigned_users.map(user => (
                                <div key={user.id} className="flex items-center justify-between bg-slate-100 px-4 py-2 rounded-md shadow-sm">
                                    <div className="flex flex-col">
                                        <span className="font-medium">{user.name}</span>
                                        <span className="text-xs text-slate-600">{user.email}</span>
                                        <span className="text-xs text-slate-500 italic">{user.pivot.role}</span>
                                    </div>
                                    <Button
                                        type="delete"
                                        onClick={() => handleDelete(user.id)}
                                        aria-label={`Hapus penugasan ${user.name}`}
                                    />
                                </div>
                            ))}
                        </div>
                    ) : (
                        <div className="text-sm text-slate-500 italic">Belum ada pegawai yang ditugaskan ke proyek ini.</div>
                    )}
                </div>
            </Container>
        </AuthenticatedLayout>
    );
}
