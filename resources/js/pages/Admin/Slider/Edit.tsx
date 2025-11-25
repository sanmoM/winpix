// import ImageInput from '@/components/shared/inputs/image-input';
// import { Input } from '@/components/ui/input';
// import { Label } from '@/components/ui/label';
// import { Textarea } from '@/components/ui/textarea';
// import AppLayout from '@/layouts/app-layout';
// import { type BreadcrumbItem } from '@/types';
// import { Head, useForm } from '@inertiajs/react';
// import { route } from 'ziggy-js';

// const breadcrumbs: BreadcrumbItem[] = [
//     {
//         title: 'Slider',
//         href: route('admin.slider.index'),
//     },
//     {
//         title: 'Edit',
//         href: '',
//     },
// ];

// interface EditProps {
//     slider: {
//         id: number;
//         title: string;
//         content: string;
//         status: string;
//         bg_image: File | string | null;
//     };
// }

// export default function Edit({ slider }: EditProps) {
//     const { data, setData, post, processing, errors } = useForm({
//         _method: 'PUT',
//         title: slider.title,
//         content: slider.content,
//         status: slider.status,
//         bg_image: null as File | null,
//     });

//     const handleSubmit = (e: React.FormEvent) => {
//         e.preventDefault();
//         post(route('admin.slider.update', slider.id), {
//             forceFormData: true,
//         });
//     };

//     return (
//         <AppLayout breadcrumbs={breadcrumbs}>
//             <Head title="Edit Slider" />

//             <form
//                 onSubmit={handleSubmit}
//                 className="flex max-w-6xl flex-col space-y-6 p-6"
//                 encType="multipart/form-data"
//             >
//                 {/* Image Upload */}
//                 <div className="grid w-full items-center gap-3">
//                     <Label htmlFor="bg_image">Background Image</Label>

//                     <ImageInput
//                         image={
//                             data.bg_image
//                                 ? data.bg_image instanceof File
//                                     ? URL.createObjectURL(data.bg_image)
//                                     : `/storage/${data.bg_image}`
//                                 : slider.bg_image
//                                   ? `/storage/${slider.bg_image}`
//                                   : null
//                         }
//                         setImage={(value) => setData('bg_image', value)}
//                         wrapperClassName="w-full aspect-[2/1]"
//                         iconClassName="w-[20%]"
//                     />

//                     {errors.bg_image && (
//                         <p className="text-sm text-red-600">
//                             {errors.bg_image}
//                         </p>
//                     )}
//                 </div>

//                 {/* Title */}
//                 <div className="grid w-full items-center gap-3">
//                     <Label htmlFor="title" className="font-semibold">
//                         Title <span className="text-red-600">*</span>
//                     </Label>
//                     <Input
//                         id="title"
//                         type="text"
//                         value={data.title}
//                         onChange={(e) => setData('title', e.target.value)}
//                         placeholder="Enter title"
//                     />
//                     {errors.title && (
//                         <p className="text-sm text-red-600">{errors.title}</p>
//                     )}
//                 </div>

//                 {/* Content */}
//                 <div className="grid w-full items-center gap-2">
//                     <Label htmlFor="content" className="font-semibold">
//                         Sub Title <span className="text-red-600">*</span>
//                     </Label>
//                     <Textarea
//                         id="content"
//                         value={data.content}
//                         onChange={(e) => setData('content', e.target.value)}
//                         placeholder="Enter sub title"
//                     />
//                     {errors.content && (
//                         <p className="text-sm text-red-600">{errors.content}</p>
//                     )}
//                 </div>

//                 {/* Status */}
//                 <div className="grid w-full items-center gap-2">
//                     <Label htmlFor="status" className="font-semibold">
//                         Status <span className="text-red-600">*</span>
//                     </Label>
//                     <select
//                         id="status"
//                         value={data.status}
//                         onChange={(e) => setData('status', e.target.value)}
//                         className="rounded-lg border border-gray-300 p-2 focus:ring-2 focus:ring-amber-600 focus:outline-none"
//                     >
//                         <option value="Active">Active</option>
//                         <option value="InActive">InActive</option>
//                     </select>
//                     {errors.status && (
//                         <p className="text-sm text-red-600">{errors.status}</p>
//                     )}
//                 </div>

//                 {/* Submit */}
//                 <div className="flex justify-end">
//                     <button
//                         type="submit"
//                         className="w-28 cursor-pointer rounded-lg bg-gradient-to-r bg-[linear-gradient(45deg,var(--color-primary-color),var(--color-secondary-color))] px-6 py-2 font-semibold text-white disabled:opacity-70"
//                         disabled={processing}
//                     >
//                         {processing ? 'Updating...' : 'Update'}
//                     </button>
//                 </div>
//             </form>
//         </AppLayout>
//     );
// }


import SaveAndBackButtons from '@/components/save-and-back-buttons';
import ImageInput from '@/components/shared/inputs/image-input';
import SelectInput from '@/components/shared/inputs/select-input';
import TextAreaInput from '@/components/shared/inputs/text-area-input';
import TextInput from '@/components/shared/inputs/text-input';
import useLocales from '@/hooks/useLocales';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head, useForm } from '@inertiajs/react';
import { useEffect, useRef } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import { route } from 'ziggy-js';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'All Slider',
        href: route('admin.slider.index'),
    },
    {
        title: 'Edit',
        href: '',
    },
];

interface FlashProps {
    success?: string;
    error?: string;
}

interface EditProps {
    slider: {
        id: number;
        title: string;
        content: string;
        status: string;
        bg_image: string | null;
    };
    flash?: FlashProps;
}

export default function Edit({ slider, flash }: EditProps) {
    const { t } = useLocales();
    const { data, setData, post, processing, errors, reset } = useForm({
        _method: 'PUT',
        title: slider.title,
        content: slider.content,
        status: slider.status,
        bg_image: null as File | null,
    });

    const fileInputRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
        if (flash?.success) toast.success(flash.success);
        if (flash?.error) toast.error(flash.error);
    }, [flash]);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        const formData = new FormData();
        formData.append('_method', 'PUT');
        formData.append('title', data.title);
        formData.append('content', data.content);
        formData.append('status', data.status);

        if (data.bg_image) {
            formData.append('bg_image', data.bg_image);
        }

        post(route('admin.slider.update', slider.id), {
            data: formData,
            forceFormData: true,
            onSuccess: () => {
                if (fileInputRef.current) {
                    fileInputRef.current.value = '';
                }
            },
        });
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Edit Slider" />
            <ToastContainer />

            <form
                onSubmit={handleSubmit}
                className="max-w-6xl space-y-6 p-4"
                encType="multipart/form-data"
            >
                {/* Background Image */}
                <ImageInput
                    image={
                        data.bg_image
                            ? data.bg_image
                            : slider.bg_image
                                ? `/storage/${slider.bg_image}`
                                : null
                    }
                    setImage={(value) => setData('bg_image', value)}
                    wrapperClassName="w-full aspect-[2/1]"
                    iconClassName="w-[20%]"
                    error={errors.bg_image}
                    label={t('dashboard.slider.inputs.bg_image.label')}
                    required={false}
                    ref={fileInputRef}
                />

                {/* Title */}
                <TextInput
                    id="title"
                    value={data.title}
                    setValue={(value) => setData('title', value)}
                    placeholder={t('dashboard.slider.inputs.title.placeholder')}
                    error={errors.title}
                    label={t('dashboard.slider.inputs.title.label')}
                    required={true}
                />

                {/* Content */}
                <TextAreaInput
                    id="content"
                    value={data.content}
                    onChange={(e) => setData('content', e.target.value)}
                    placeholder={t('dashboard.slider.inputs.content.placeholder')}
                    label={t('dashboard.slider.inputs.content.label')}
                    required={true}
                    error={errors.content}
                />

                <SelectInput
                    label={t('dashboard.slider.inputs.status.label')}
                    placeholder={t('dashboard.slider.inputs.status.placeholder')}
                    className='max-w-full'
                    value={data?.status}
                    options={t('dashboard.slider.inputs.status.options', { returnObjects: true }) as any}
                    onChange={(value) => setData('status', value)}
                />


                {/* Save / Back Buttons */}
                <SaveAndBackButtons
                    processing={processing}
                    href={route('admin.slider.index')}
                />
            </form>
        </AppLayout>
    );
}
