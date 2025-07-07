import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, usePage } from '@inertiajs/react';

export default function Dashboard() {
    const { auth } = usePage().props;

    return (
        <AuthenticatedLayout
            header={
                <h2 className="text-xl font-semibold leading-tight text-gray-800">
                    Dashboard
                </h2>
            }
        >
            <Head title="Dashboard" />

            <div className="py-10">
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    {/* Welcome */}
                    <div className="mb-8">
                        <h3 className="text-2xl font-bold text-gray-900">
                            Selamat datang, {auth?.user?.name || 'Pengguna'}!
                        </h3>
                        <p className="text-sm text-gray-500 mt-1">
                            Berikut ringkasan sistem Satu Data PPIP.
                        </p>
                    </div>

                    {/* Grid Menu */}
                   
                </div>
            </div>
        </AuthenticatedLayout>
    );
}

function DashboardCard({ title, icon, description, link }) {
    return (
        <a
            href={link}
            className="rounded-xl bg-white p-6 shadow hover:shadow-lg transition border border-gray-200 flex flex-col gap-2 hover:bg-gray-50"
        >
            <div className="text-4xl">{icon}</div>
            <h4 className="text-lg font-semibold text-gray-800">{title}</h4>
            <p className="text-sm text-gray-500">{description}</p>
        </a>
    );
}
