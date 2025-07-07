import Checkbox from '@/Components/Checkbox';
import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';
import GuestLayout from '@/Layouts/GuestLayout';
import { Head, Link, useForm } from '@inertiajs/react';
import { useEffect, useState } from 'react';
import Swal from 'sweetalert2';

export default function Login({ status, canResetPassword, errors: serverErrors }) {
    const { data, setData, post, processing, errors, reset } = useForm({
        email: '',
        password: '',
        remember: false,
    });

    const [showPassword, setShowPassword] = useState(false);

    useEffect(() => {
        if (serverErrors?.email) {
            Swal.fire({
                icon: 'error',
                title: 'Login Gagal',
                text: serverErrors.email,
                confirmButtonColor: '#dc2626',
            });
        }
    }, [serverErrors]);

    const submit = (e) => {
        e.preventDefault();
        post(route('login'), {
            onFinish: () => reset('password'),
        });
    };

    return (
        <GuestLayout>
            <Head title="Masuk ke Aplikasi" />

            {/* Background Merah Putih */}
            <div className="fixed inset-0 z-0 bg-gradient-to-br from-red-700 via-white to-red-700 opacity-90"></div>

            <div className="relative z-10 w-full max-w-md bg-white/95 backdrop-blur-md shadow-2xl rounded-xl px-8 py-10 border border-gray-200">

                {/* Header */}
                <div className="text-center mb-6">
                    <img src="/logo-pkp.png" alt="Kementerian PKP" className="h-16 mx-auto mb-2" />
                    <h1 className="text-2xl font-bold text-red-700 tracking-wide">CSIRT Kementerian PKP</h1>
                    <p className="text-sm text-gray-600">Computer Security Incident Response Team</p>
                </div>

                {/* Status */}
                {status && (
                    <div className="mb-4 text-center text-green-600 text-sm">
                        {status}
                    </div>
                )}

                {/* Form */}
                <form onSubmit={submit} className="space-y-5">
                    <div>
                        <InputLabel htmlFor="email" value="Email" />
                        <TextInput
                            id="email"
                            type="email"
                            name="email"
                            value={data.email}
                            className="mt-1 block w-full"
                            autoComplete="username"
                            isFocused
                            onChange={(e) => setData('email', e.target.value)}
                        />
                        <InputError message={errors.email} className="mt-1" />
                    </div>

                    <div>
                        <InputLabel htmlFor="password" value="Password" />
                        <div className="relative">
                            <TextInput
                                id="password"
                                type={showPassword ? 'text' : 'password'}
                                name="password"
                                value={data.password}
                                className="mt-1 block w-full pr-10"
                                autoComplete="current-password"
                                onChange={(e) => setData('password', e.target.value)}
                            />
                            <button
                                type="button"
                                onClick={() => setShowPassword(!showPassword)}
                                className="absolute inset-y-0 right-0 flex items-center px-3 text-gray-500 focus:outline-none"
                                tabIndex={-1}
                            >
                                {showPassword ? '🙈' : '👁️'}
                            </button>
                        </div>
                        <InputError message={errors.password} className="mt-1" />
                    </div>
					{/*
                    <div className="flex items-center justify-between text-sm">
                        <label className="flex items-center">
                            <Checkbox
                                name="remember"
                                checked={data.remember}
                                onChange={(e) =>
                                    setData('remember', e.target.checked)
                                }
                            />
                            <span className="ml-2 text-gray-700">Ingat saya</span>
                        </label>

                        {canResetPassword && (
                            <Link
                                href={route('password.request')}
                                className="text-red-600 hover:text-red-800 underline"
                            >
                                Lupa password?
                            </Link>
                        )}
                    </div>
					*/}
                    <PrimaryButton
                        className="w-full justify-center bg-red-600 hover:bg-red-700 transition"
                        disabled={processing}
                    >
                        {processing ? (
                            <span className="flex items-center justify-center gap-2">
                                <svg className="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24">
                                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="white" strokeWidth="4" />
                                    <path className="opacity-75" fill="white" d="M4 12a8 8 0 018-8v4l3-3-3-3v4a8 8 0 00-8 8z" />
                                </svg>
                                Memproses...
                            </span>
                        ) : 'Masuk'}
                    </PrimaryButton>
                </form>

                <div className="mt-6 text-center text-xs text-gray-500">
                    &copy; 2025 Kementerian PKP – CSIRT
                </div>
            </div>
        </GuestLayout>
    );
}
