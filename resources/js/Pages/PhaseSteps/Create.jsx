import React, { useMemo } from 'react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import Container from '@/Components/Container';
import Card from '@/Components/Card';
import Input from '@/Components/Input';
import Select from '@/Components/Select';
import Button from '@/Components/Button';
import { Head, useForm } from '@inertiajs/react';
import Swal from 'sweetalert2';

export default function Create({ auth, phases }) {
    const { data, setData, post, errors } = useForm({
        initiator_type: '',
        phase_id: '',
        name: '',
        step_order: 0,
    });

    const handleSubmit = (e) => {
        e.preventDefault();

        post(route('phase-steps.store'), {
            onSuccess: () => {
                Swal.fire('Berhasil', 'Langkah berhasil ditambahkan', 'success');
            }
        });
    };

    // Filter fase berdasarkan tipe inisiator
    const filteredPhases = useMemo(() => {
        return phases.filter(phase => phase.initiator_type === data.initiator_type);
    }, [data.initiator_type, phases]);

    return (
        <AuthenticatedLayout user={auth.user} header={<h2 className="text-xl font-semibold">Tambah Langkah Fase</h2>}>
            <Head title="Tambah Langkah" />
            <Container>
                <Card title="Form Tambah Langkah">
                    <form onSubmit={handleSubmit}>
                        <Select
                            label="Tipe Inisiator"
                            value={data.initiator_type}
                            onChange={(e) => {
                                setData('initiator_type', e.target.value);
                                setData('phase_id', ''); // Reset fase saat ganti tipe
                            }}
                            options={[
                                { label: 'Solicited', value: 'solicited' },
                                { label: 'Unsolicited', value: 'unsolicited' },
                            ]}
                            errors={errors.initiator_type}
                            required
                        />

                        <Select
                            label="Fase"
                            value={data.phase_id}
                            onChange={(e) => setData('phase_id', e.target.value)}
                            options={filteredPhases.map(p => ({ value: p.id, label: p.name }))}
                            errors={errors.phase_id}
                            disabled={!data.initiator_type}
                            required
                        />

                        <Input
                            label="Nama Langkah"
                            value={data.name}
                            onChange={(e) => setData('name', e.target.value)}
                            errors={errors.name}
                            required
                        />

                        <Input
                            label="Urutan"
                            type="number"
                            value={data.step_order}
                            onChange={(e) => setData('step_order', e.target.value)}
                            errors={errors.step_order}
                            required
                        />

                        <div className="flex gap-2 mt-4">
                            <Button type="submit" />
                            <Button type="cancel" url={route('phase-steps.index')} />
                        </div>
                    </form>
                </Card>
            </Container>
        </AuthenticatedLayout>
    );
}
