import SaveAndBackButtons from '@/components/save-and-back-buttons';
import TextInput from '@/components/shared/inputs/text-input';
import useLocales from '@/hooks/useLocales';
import AppLayout from '@/layouts/app-layout';
import type { BreadcrumbItem } from '@/types';
import { Head, useForm } from '@inertiajs/react';
import { useEffect, useRef } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import { route } from 'ziggy-js';

interface FlashProps {
    success?: string;
    error?: string;
}

interface Props {
    flash?: FlashProps;
}

export default function Create({ flash }: Props) {
    const { t } = useLocales();

    const { data, setData, post, processing, progress, errors, reset } =
        useForm<{
            name: string;
            email: string;
            role: string;
            password: string;
            password_confirmation: string;
            level: number;
        }>({
            name: '',
            email: '',
            level: 90,
            role: 'jury',
            password: '',
            password_confirmation: '',
        });

    const fileInputRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
        if (flash?.success) toast.success(flash.success);
        if (flash?.error) toast.error(flash.error);
    }, [flash]);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        const formData = new FormData();
        formData.append('name', data.name);
        formData.append('email', data.email);
        formData.append('role', data.role);
        formData.append('password', data.password);
        formData.append('level', data.level);

        post(route('admin.judge.store'), {
            data: formData,
            forceFormData: true,
            onSuccess: () => {
                reset();
                if (fileInputRef.current) fileInputRef.current.value = '';
            },
        });
    };

    const breadcrumbs: BreadcrumbItem[] = [
        {
            title: 'Judge',
            href: 'admin/all-Judge',
        },
        {
            title: 'Create',
            href: '',
        },
    ];

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Create Judge" />
            <ToastContainer />

            <form
                onSubmit={handleSubmit}
                className="max-w-6xl space-y-6 p-4"
                encType="multipart/form-data"
            >
                {/* Name */}
                <TextInput
                    id="name"
                    value={data.name}
                    setValue={(value) => setData('name', value)}
                    label="Name"
                    placeholder="Enter a name"
                    error={errors.name}
                    required={true}
                />

                {/* Email */}
                <TextInput
                    id="email"
                    type="email"
                    value={data.email}
                    setValue={(value) => setData('email', value)}
                    label="Email"
                    placeholder="Enter an email"
                    error={errors.email}
                    required={true}
                />

                {/* Password */}
                <TextInput
                    id="password"
                    type="password"
                    value={data.password}
                    setValue={(value) => setData('password', value)}
                    label="Password"
                    placeholder="Enter a password"
                    error={errors.password}
                    required={true}
                />

                {/* Confirm Password */}
                <TextInput
                    id="password_confirmation"
                    type="password"
                    value={data.password_confirmation}
                    setValue={(value) =>
                        setData('password_confirmation', value)
                    }
                    label="Confirm Password"
                    placeholder="Enter a password confirmation"
                    error={errors.password_confirmation}
                    required={true}
                />

                <input id="role" name="role" type="hidden" value={data.role} />
                <input
                    id="level"
                    name="level"
                    type="hidden"
                    value={data.level}
                />

                <SaveAndBackButtons
                    processing={processing}
                    href={route('admin.allJudge')}
                />
            </form>
        </AppLayout>
    );
}
