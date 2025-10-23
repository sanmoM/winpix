import RichTextEditor from '@/components/RichTextEditor';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head, useForm } from '@inertiajs/react';
import { route } from 'ziggy-js';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'About',
        href: 'admin/about',
    },
    {
        title: 'Edit',
        href: '',
    },
];

interface EditProps {
    item: {
        id: number;
        title: string;
        content: string;
        picture: string | null;
    };
}

export default function Edit({ item }: EditProps) {
    const { data, setData, put, processing } = useForm({
        title: item.title,
        content: item.content,
        picture: null as File | null,
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        put(route('admin.about.update', item.id));
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Edit About" />
            <form
                onSubmit={handleSubmit}
                className="flex flex-col space-y-4 p-6"
                encType="multipart/form-data"
            >
                {/* Current Image Preview */}
                {item.picture && (
                    <div className="mb-2">
                        <img
                            src={`public/storage/uploads/about/${item.picture}`}
                            alt={item.title}
                            className="h-20 w-20 rounded object-cover"
                        />
                    </div>
                )}

                {/* Image Upload */}
                <div className="grid w-full items-center gap-3">
                    <Label htmlFor="picture">Change Image</Label>
                    <Input
                        id="picture"
                        type="file"
                        onChange={(e) =>
                            setData(
                                'picture',
                                e.target.files ? e.target.files[0] : null,
                            )
                        }
                    />
                </div>

                {/* Title */}
                <Label htmlFor="title">Title</Label>
                <Input
                    id="title"
                    type="text"
                    value={data.title}
                    onChange={(e) => setData('title', e.target.value)}
                    placeholder="Enter title"
                />

                {/* Content */}
                <Label htmlFor="content">Content</Label>
                <RichTextEditor
                    modelValue={data.content}
                    onChange={(val) => setData('content', val)}
                />

                {/* Submit */}
                <button
                    type="submit"
                    className="w-28 rounded-lg bg-amber-600 px-6 py-2 font-semibold text-white shadow hover:bg-amber-700"
                    disabled={processing}
                >
                    {processing ? 'Updating...' : 'Update'}
                </button>
            </form>
        </AppLayout>
    );
}
