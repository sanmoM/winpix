import RichTextEditor from '@/components/RichTextEditor';
import SaveAndBackButtons from '@/components/save-and-back-buttons';
import SelectInput from '@/components/shared/inputs/select-input';
import TextInput from '@/components/shared/inputs/text-input';
import { Label } from '@/components/ui/label';
import useLocales from '@/hooks/useLocales';
import AppLayout from '@/layouts/app-layout';
import type { BreadcrumbItem } from '@/types';
import { Head, useForm } from '@inertiajs/react';
import { useEffect } from 'react';
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
    const breadcrumbs: BreadcrumbItem[] = t('dashboard.help.create.breadcrumbs', { returnObjects: true });

    const { data, setData, post, processing, reset, errors } = useForm({
        section: 'Getting_Start',
        question: '',
        answer: '',
    });

    useEffect(() => {
        if (flash?.success) toast.success(flash.success);
        if (flash?.error) toast.error(flash.error);
    }, [flash]);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        const formData = new FormData();
        formData.append('section', data.section);
        formData.append('question', data.question);
        formData.append('answer', data.answer);

        post(route('admin.help.store'), {
            data: formData,
            forceFormData: true,
            onSuccess: () => reset(),
        });
    };
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <ToastContainer />
            <Head title="Create Help Item" />

            <form onSubmit={handleSubmit} className="max-w-6xl space-y-6 p-4">
                <SelectInput
                    id="section"
                    name="section"
                    label={t('dashboard.help.inputs.questionType.label')}
                    options={t('dashboard.help.inputs.questionType.options', { returnObjects: true }) as any}
                    value={data.section}
                    onChange={(value) => setData('section', value)}
                    className="max-w-auto w-full"
                />
                <TextInput
                    id="question"
                    value={data.question}
                    setValue={(value) => setData('question', value)}
                    label={t('dashboard.help.inputs.question.label')}
                    placeholder={t('dashboard.help.inputs.question.placeholder')}
                    error={errors.question}
                    required={true}
                />

                {/* Answer */}
                <div className="grid w-full items-center gap-3">
                    <Label htmlFor="answer">Answer</Label>
                    <RichTextEditor
                        modelValue={data.answer}
                        onChange={(val) => setData('answer', val)}
                    />
                    {errors.answer && (
                        <p className="text-sm text-red-600">{errors.answer}</p>
                    )}
                </div>

                {/* Save & Back Buttons */}
                <SaveAndBackButtons
                    processing={processing}
                    href={route('admin.help.index')}
                />
            </form>
        </AppLayout>
    );
}
