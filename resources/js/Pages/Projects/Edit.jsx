import React, { useState } from 'react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import Container from '@/Components/Container';
import Input from '@/Components/Input';
import Button from '@/Components/Button';
import Card from '@/Components/Card';
import TabGroup from '@/Components/TabGroup';
import Textarea from '@/Components/Textarea';
import Select from '@/Components/Select';
import { Head, useForm, usePage } from '@inertiajs/react';
import Swal from 'sweetalert2';

export default function Edit({ auth, project, pjpks, locations, initiators, executors }) {
    const [activeTab, setActiveTab] = useState('umum');

    const { data, setData, post, errors } = useForm({
        _method: 'put',
        name: project.name,
        initiator_type: project.initiator_type,
        pjpk_id: project.pjpk_id,
        lokasi_id: project.lokasi_id,
        initiator_entity_id: project.initiator_entity_id || '',
        executor_entity_id: project.executor_entity_id || '',
        description: project.description || '',
        offtakers: project.offtakers || '',

        raw_water_source: project.raw_water_source || '',
        ipa_capacity: project.ipa_capacity || '',
        intake_capacity: project.intake_capacity || '',
        transmission_length: project.transmission_length || '',
        distribution_length: project.distribution_length || '',
        reservoir_capacity: project.reservoir_capacity || '',
        household_connections: project.household_connections || '',
        cooperation_scope: project.cooperation_scope || '',
        cooperation_type: project.cooperation_type || '',

        investasi: project.investasi || '',
        skema_pengembalian: project.skema_pengembalian || '',
        dukungan_pemerintah: project.dukungan_pemerintah || '',
        irr_project: project.irr_project || '',
        irr_equity: project.irr_equity || '',
        npv: project.npv || '',
        tariff: project.tariff || '',

        masa_konstruksi_bulan: project.masa_konstruksi_bulan || '',
        masa_konsesi_tahun: project.masa_konsesi_tahun || '',

        route_map: null,
        brief: project.brief || '',
        structure: project.structure || '',
        financing_scheme: project.financing_scheme || '',
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        post(route('proyek.update', project.id), {
            forceFormData: true,
            onSuccess: () => {
                Swal.fire('Berhasil', 'Proyek berhasil diperbarui', 'success');
            },
        });
    };

    return (
        <AuthenticatedLayout user={auth.user} header={<h2 className="text-xl font-semibold">Edit Proyek</h2>}>
            <Head title="Edit Proyek" />
            <Container>
                <Card title="Form Edit Proyek">
                    <TabGroup
                        tabs={{
                            umum: 'Informasi Umum',
                            teknis: 'Teknis & Finansial',
                            dokumen: 'Dokumen & Upload',
                        }}
                        active={activeTab}
                        onChange={setActiveTab}
                    />
                    <form onSubmit={handleSubmit} encType="multipart/form-data" className="mt-4 space-y-6">

                        {activeTab === 'umum' && (
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <Input label="Nama Proyek" value={data.name} onChange={e => setData('name', e.target.value)} errors={errors.name} required />
                                <Select label="Tipe Inisiator" value={data.initiator_type} onChange={e => setData('initiator_type', e.target.value)} errors={errors.initiator_type} required options={[
                                    { value: 'solicited', label: 'Solicited' },
                                    { value: 'unsolicited', label: 'Unsolicited' },
                                ]} />
                                <Select label="PJPK" value={data.pjpk_id} onChange={e => setData('pjpk_id', e.target.value)} errors={errors.pjpk_id} required options={pjpks.map(p => ({ value: p.id, label: p.name }))} />
                                <Select label="Lokasi" value={data.lokasi_id} onChange={e => setData('lokasi_id', e.target.value)} errors={errors.lokasi_id} required options={locations.map(l => ({ value: l.id, label: `${l.province} - ${l.city}` }))} />
                                <Select label="Badan Pemprakarsa" value={data.initiator_entity_id} onChange={e => setData('initiator_entity_id', e.target.value)} errors={errors.initiator_entity_id} options={initiators.map(i => ({ value: i.id, label: i.name }))} />
                                <Select label="Badan Usaha Pelaksana" value={data.executor_entity_id} onChange={e => setData('executor_entity_id', e.target.value)} errors={errors.executor_entity_id} options={executors.map(e => ({ value: e.id, label: e.name }))} />
                                <Textarea label="Deskripsi" value={data.description} onChange={e => setData('description', e.target.value)} errors={errors.description} rows={4} />
                                <Textarea label="Offtakers" value={data.offtakers} onChange={e => setData('offtakers', e.target.value)} errors={errors.offtakers} rows={2} />
                            </div>
                        )}

                        {activeTab === 'teknis' && (
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <Input label="Sumber Air Baku" value={data.raw_water_source} onChange={e => setData('raw_water_source', e.target.value)} errors={errors.raw_water_source} />
                                <Input label="Kapasitas IPA (lps)" type="number" value={data.ipa_capacity} onChange={e => setData('ipa_capacity', e.target.value)} errors={errors.ipa_capacity} />
                                <Input label="Intake (lps)" type="number" value={data.intake_capacity} onChange={e => setData('intake_capacity', e.target.value)} errors={errors.intake_capacity} />
                                <Input label="Panjang Pipa Transmisi (m)" type="number" value={data.transmission_length} onChange={e => setData('transmission_length', e.target.value)} errors={errors.transmission_length} />
                                <Input label="Panjang Pipa Distribusi (m)" type="number" value={data.distribution_length} onChange={e => setData('distribution_length', e.target.value)} errors={errors.distribution_length} />
                                <Input label="Kapasitas Reservoir" type="number" value={data.reservoir_capacity} onChange={e => setData('reservoir_capacity', e.target.value)} errors={errors.reservoir_capacity} />
                                <Input label="Jumlah SR" type="number" value={data.household_connections} onChange={e => setData('household_connections', e.target.value)} errors={errors.household_connections} />
                                <Input label="Lingkup Kerjasama" value={data.cooperation_scope} onChange={e => setData('cooperation_scope', e.target.value)} errors={errors.cooperation_scope} />
                                <Input label="Bentuk Kerjasama" value={data.cooperation_type} onChange={e => setData('cooperation_type', e.target.value)} errors={errors.cooperation_type} />
                                <Input label="Investasi (Rp)" type="number" value={data.investasi} onChange={e => setData('investasi', e.target.value)} errors={errors.investasi} />
                                <Input label="Skema Pengembalian" value={data.skema_pengembalian} onChange={e => setData('skema_pengembalian', e.target.value)} errors={errors.skema_pengembalian} />
                                <Input label="Dukungan Pemerintah" value={data.dukungan_pemerintah} onChange={e => setData('dukungan_pemerintah', e.target.value)} errors={errors.dukungan_pemerintah} />
                                <Input label="IRR Proyek (%)" type="number" step="0.01" value={data.irr_project} onChange={e => setData('irr_project', e.target.value)} errors={errors.irr_project} />
                                <Input label="IRR Ekuitas (%)" type="number" step="0.01" value={data.irr_equity} onChange={e => setData('irr_equity', e.target.value)} errors={errors.irr_equity} />
                                <Input label="NPV (Rp)" type="number" value={data.npv} onChange={e => setData('npv', e.target.value)} errors={errors.npv} />
                                <Input label="Tarif (Rp/m³)" type="number" step="0.01" value={data.tariff} onChange={e => setData('tariff', e.target.value)} errors={errors.tariff} />
                                <Input label="Masa Konstruksi (bulan)" type="number" value={data.masa_konstruksi_bulan} onChange={e => setData('masa_konstruksi_bulan', e.target.value)} errors={errors.masa_konstruksi_bulan} />
                                <Input label="Masa Konsesi (tahun)" type="number" value={data.masa_konsesi_tahun} onChange={e => setData('masa_konsesi_tahun', e.target.value)} errors={errors.masa_konsesi_tahun} />
                            </div>
                        )}

                        {activeTab === 'dokumen' && (
                            <div className="grid grid-cols-1 gap-4">
                                <Input label="Peta Trase" type="file" onChange={e => setData('route_map', e.target.files[0])} errors={errors.route_map} />
                                <Textarea label="Project Brief" value={data.brief} onChange={e => setData('brief', e.target.value)} errors={errors.brief} />
                                <Textarea label="Struktur Proyek" value={data.structure} onChange={e => setData('structure', e.target.value)} errors={errors.structure} />
                                <Textarea label="Skema Pembiayaan" value={data.financing_scheme} onChange={e => setData('financing_scheme', e.target.value)} errors={errors.financing_scheme} />
                            </div>
                        )}

                        <div className="flex justify-end gap-2 mt-6">
                            <Button type="submit" />
                            <Button type="cancel" url={route('proyek.index')} />
                        </div>
                    </form>
                </Card>
            </Container>
        </AuthenticatedLayout>
    );
}
