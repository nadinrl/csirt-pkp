import React from "react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import Container from "@/Components/Container";
import { Head, useForm, usePage } from "@inertiajs/react";
import Input from "@/Components/Input";
import Button from "@/Components/Button";
import Card from "@/Components/Card";
import Checkbox from "@/Components/Checkbox";
import Swal from "sweetalert2";

export default function Edit({ auth }) {
    const { permissions, role } = usePage().props;

    const { data, setData, post, errors } = useForm({
        name: role.name,
        selectedPermissions: role.permissions.map((p) => p.name),
        _method: "put",
    });

    const handleSelectedPermissions = (e) => {
        const value = e.target.value;
        const selected = new Set(data.selectedPermissions);

        if (selected.has(value)) {
            selected.delete(value);
        } else {
            selected.add(value);
        }

        setData("selectedPermissions", Array.from(selected));
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        post(route("roles.update", role.id), {
            onSuccess: () => {
                Swal.fire({
                    title: "Berhasil!",
                    text: "Role berhasil diperbarui.",
                    icon: "success",
                    showConfirmButton: false,
                    timer: 1500,
                });
            },
        });
    };

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={
                <h2 className="text-xl font-semibold text-slate-800">
                    Ubah Role: {role.name}
                </h2>
            }
        >
            <Head title="Edit Role" />
            <Container>
                <Card title="Form Edit Role & Permissions">
                    <form onSubmit={handleSubmit} className="space-y-6">
                        {/* Input Role Name */}
                        <div>
                            <Input
                                label="Nama Role"
                                type="text"
                                value={data.name}
                                onChange={(e) => setData("name", e.target.value)}
                                errors={errors.name}
                                placeholder="Contoh: editor, manager"
                            />
                        </div>

                        {/* Permissions */}
                        <div>
                            <h3 className="text-sm font-medium text-slate-700 mb-2">
                                Ubah Permissions
                            </h3>
                            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                                {Object.entries(permissions).map(([group, items], i) => (
                                    <div
                                        key={i}
                                        className="p-4 bg-slate-50 border rounded-md"
                                    >
                                        <h4 className="text-sm font-semibold text-slate-800 mb-2">
                                            {group}
                                        </h4>
                                        <div className="flex flex-wrap gap-2">
                                            {items.map((permission) => (
                                                <Checkbox
                                                    key={permission}
                                                    label={permission}
                                                    value={permission}
                                                    checked={data.selectedPermissions.includes(permission)}
                                                    onChange={handleSelectedPermissions}
                                                />
                                            ))}
                                        </div>
                                    </div>
                                ))}
                            </div>
                            {errors?.selectedPermissions && (
                                <p className="text-sm text-red-500 mt-2">
                                    {errors.selectedPermissions}
                                </p>
                            )}
                        </div>

                        {/* Actions */}
                        <div className="flex items-center gap-2">
                            <Button type="submit" />
                            <Button type="cancel" url={route("roles.index")} />
                        </div>
                    </form>
                </Card>
            </Container>
        </AuthenticatedLayout>
    );
}
