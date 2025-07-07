import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';
import DeleteUserForm from './Partials/DeleteUserForm';
import UpdatePasswordForm from './Partials/UpdatePasswordForm';
import UpdateProfileInformationForm from './Partials/UpdateProfileInformationForm';

export default function Edit({ mustVerifyEmail, status }) {
    return (
        <AuthenticatedLayout
            header={
                <h2 className="text-xl font-semibold text-slate-800">
                    Profil Pengguna
                </h2>
            }
        >
            <Head title="Profil" />

            <div className="py-10">
                <div className="mx-auto max-w-7xl space-y-6 px-4 sm:px-6 lg:px-8">

                    {/* Update Profile Info */}
                    <div className="bg-white shadow rounded-lg p-6 sm:p-8">
                        <h3 className="text-lg font-semibold text-slate-800 mb-2">Informasi Pengguna</h3>
                        <p className="text-sm text-slate-500 mb-4">
                            Ubah nama, email, dan informasi dasar akun Anda.
                        </p>
                        <UpdateProfileInformationForm
                            mustVerifyEmail={mustVerifyEmail}
                            status={status}
                            className="max-w-xl"
                        />
                    </div>

                    {/* Update Password */}
                    <div className="bg-white shadow rounded-lg p-6 sm:p-8">
                        <h3 className="text-lg font-semibold text-slate-800 mb-2">Ganti Password</h3>
                        <p className="text-sm text-slate-500 mb-4">
                            Pastikan akun Anda menggunakan password yang panjang dan acak agar tetap aman.
                        </p>
                        <UpdatePasswordForm className="max-w-xl" />
                    </div>

                    {/* Delete Account */}
                    <div className="bg-white shadow rounded-lg p-6 sm:p-8">
                        <h3 className="text-lg font-semibold text-red-600 mb-2">Hapus Akun</h3>
                        <p className="text-sm text-slate-500 mb-4">
                            Setelah akun dihapus, semua data Anda akan hilang secara permanen. Tindakan ini tidak dapat dibatalkan.
                        </p>
                        <DeleteUserForm className="max-w-xl" />
                    </div>

                </div>
            </div>
        </AuthenticatedLayout>
    );
}
