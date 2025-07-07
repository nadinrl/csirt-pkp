import React, { useMemo, useEffect } from 'react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import Container from '@/Components/Container';
import Card from '@/Components/Card';
import Input from '@/Components/Input';
import Select from '@/Components/Select';
import Button from '@/Components/Button';
import { Head, useForm } from '@inertiajs/react';
import Swal from 'sweetalert2';

export default function Edit({ auth, phaseStep, phases }) {
    const currentPhase = phases.find(p => p.id === phaseStep.phase_id);

    const { data, setData, put, errors } = useForm({
        initiator_type: currentPhase?.initiator_type || '',
        phase_id: phaseStep.phase_id || '',
        name: phaseStep.name || '',
        step_order: phaseStep.step_order || 0,
    });

    // Filter phase berdasarkan initiator_type
    const filteredPhases = useMemo(() => {
        return phases.filter(p => p.initiator_type === data.initiator_type);
    }, [data.initiator_type, phases]);

    // Reset phase_id jika type berganti dan tidak cocok
    useEffect(() => {
        const phaseStillValid = filteredPhases.some(p => p.id === data.phase_id);
        if (!phaseStillValid) {
            setData('phase_id', '');
        }
    }, [data.initiator_type]);

    const handleSubmit = (e) => {
        e.preventDefault();

        put(route('phase-steps.update', phaseStep.id), {
            onSuccess: () => {
                Swal.fire('Berhasil', 'Langkah berhasil diperbarui', 'success');
            }
        });
    };

    return (
        <AuthenticatedLayout user={auth.user} header={<h2 className="text-xl font-semibold">Edit Langkah Fase</h2>}>
            <Head title="Edit Langkah" />
            <Container>
                <Card title="Form Edit Langkah">
                    <form onSubmit={handleSubmit}>
                        <Select
                            label="Tipe Inisiator"
                            value={data.initiator_type}
                            onChange={(e) => {
                                setData('initiator_type', e.target.value);
                                setData('phase_id', '');
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
