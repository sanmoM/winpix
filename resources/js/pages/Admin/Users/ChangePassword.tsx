import InputError from '@/components/input-error';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import AppLayout from '@/layouts/app-layout';
import { Head, useForm } from '@inertiajs/react';
import { route } from 'ziggy-js';

export default function ChangePasswordUsers({
    user,
}: {
    user: { id: number };
}) {
    const { data, setData, put, processing, errors } = useForm({
        password: '',
        password_confirmation: '',
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        put(route('admin.PasswordUpdateUsers', user.id));
    };

    return (
        <AppLayout>
            <Head title="Edit User Password" />

            <form
                onSubmit={handleSubmit}
                className="flex max-w-6xl flex-col space-y-4 p-6"
            >
                <div className="grid gap-2">
                    <Label htmlFor="password">Password</Label>
                    <Input
                        id="password"
                        type="password"
                        value={data.password}
                        onChange={(e) => setData('password', e.target.value)}
                        autoComplete="new-password"
                        placeholder="New Password"
                        required
                    />
                    <InputError message={errors.password} />
                </div>

                <div className="grid gap-2">
                    <Label htmlFor="password_confirmation">
                        Confirm password
                    </Label>
                    <Input
                        id="password_confirmation"
                        type="password"
                        value={data.password_confirmation}
                        onChange={(e) =>
                            setData('password_confirmation', e.target.value)
                        }
                        autoComplete="new-password"
                        placeholder="Confirm Password"
                        required
                    />
                    <InputError message={errors.password_confirmation} />
                </div>

                <div className="flex justify-end">
                    <button
                        type="submit"
                        disabled={processing}
                        className={`rounded-lg px-6 py-2 font-semibold text-white ${
                            processing
                                ? 'cursor-not-allowed opacity-60'
                                : 'bg-primary'
                        }`}
                    >
                        {processing ? 'Updating...' : 'Update'}
                    </button>
                </div>
            </form>
        </AppLayout>
    );
}
