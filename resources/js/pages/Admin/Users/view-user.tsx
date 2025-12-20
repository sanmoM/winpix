import ImageInput from '@/components/shared/inputs/image-input';
import TextInput from '@/components/shared/inputs/text-input';
import AppLayout from '@/layouts/app-layout';
import { BreadcrumbItem } from '@/types';
import { Head, usePage } from '@inertiajs/react';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Users Details',
        href: '',
    },
];

export default function ViewUser() {
    const { user } = usePage<any>().props;
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Edit Help" />
            <div className="flex max-w-xl flex-col space-y-4 p-6">
                <ImageInput
                    image={
                        user.image
                            ? '/storage/' + user.image
                            : '/images/user-avatar.png'
                    }
                    alt="User Image"
                    wrapperClassName="aspect-square w-[200px]"
                />
                <TextInput label="Name" value={user.name} readOnly />
                <TextInput label="Email" value={user.email} readOnly />
                <TextInput label="Status" value={user.status} readOnly />
                <TextInput label="Pixel" value={user.pixel} readOnly />
                <TextInput label="V Coin" value={user.coin} readOnly />
            </div>
        </AppLayout>
    );
}
