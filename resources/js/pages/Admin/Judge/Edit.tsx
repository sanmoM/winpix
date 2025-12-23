import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head, useForm } from '@inertiajs/react';
import { route } from 'ziggy-js';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Judge',
        href: 'admin/all-Judge',
    },
    {
        title: 'Edit',
        href: '',
    },
];

interface EditProps {
    judge: {
        id: number;
        name: string;
        email: string;
        status: string;
        role: string;
        level: number;
    };
}

export default function Edit({ judge }: EditProps) {
    const { data, setData, put, errors, processing } = useForm({
        name: judge.name,
        email: judge.email,
        status: judge.status,
        role: judge.role,
        level: judge.level,
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        put(route('admin.updateJudge', judge.id));
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Edit Judge" />

            <form
                onSubmit={handleSubmit}
                className="flex max-w-6xl flex-col space-y-4 p-6"
            >
                {/* Name */}
                <div className="grid w-full items-center gap-3">
                    <Label htmlFor="name">Name</Label>
                    <Input
                        id="name"
                        type="text"
                        value={data.name}
                        onChange={(e) => setData('name', e.target.value)}
                        placeholder="Enter name"
                        disabled
                    />
                </div>

                {/* Email */}
                <div className="grid w-full items-center gap-3">
                    <Label htmlFor="email">Email</Label>
                    <Input
                        id="email"
                        type="email"
                        value={data.email}
                        onChange={(e) => setData('email', e.target.value)}
                        placeholder="Enter email"
                        disabled
                    />
                </div>
                {/* Email */}
                <div className="grid w-full items-center gap-3">
                    <Label htmlFor="role">Role</Label>
                    <Input
                        id="role"
                        type="role"
                        value={data.role}
                        onChange={(e) => setData('role', e.target.value)}
                        placeholder="Enter role"
                        readOnly
                        disabled
                    />
                </div>

                <div className="grid w-full items-center gap-3">
                    <Label htmlFor="level">Level</Label>
                    <Input
                        id="level"
                        type="level"
                        value={data.level}
                        onChange={(e) => setData('level', e.target.value)}
                        placeholder="Enter level"
                        disabled
                    />
                </div>

                {/* Status */}
                <div className="grid w-full items-center gap-2">
                    <Label htmlFor="status" className="font-semibold">
                        Status <span className="text-red-600">*</span>
                    </Label>
                    <select
                        id="status"
                        value={data.status}
                        onChange={(e) => setData('status', e.target.value)}
                        className="rounded-lg border border-gray-300 p-2 focus:ring-2 focus:ring-amber-600 focus:outline-none"
                    >
                        <option value="active">Active</option>
                        <option value="inactive">InActive</option>
                        {/* <option value="ban">Ban</option> */}
                    </select>
                    {errors.status && (
                        <p className="text-sm text-red-600">{errors.status}</p>
                    )}
                </div>

                <div className="flex justify-end">
                    <button
                        type="submit"
                        disabled={processing}
                        className={`cursor-pointer rounded-lg bg-gradient-to-r bg-[linear-gradient(45deg,var(--color-primary-color),var(--color-secondary-color))] px-6 py-2 font-semibold text-white shadow transition ease-in-out ${
                            processing && 'cursor-not-allowed opacity-60'
                        }`}
                    >
                        {processing ? 'Updating...' : 'Update'}
                    </button>
                </div>
            </form>
        </AppLayout>
    );
}
