import RichTextEditor from '@/components/RichTextEditor';
import SaveAndBackButtons from '@/components/save-and-back-buttons';
import SelectInput from '@/components/shared/inputs/select-input';
import TextInput from '@/components/shared/inputs/text-input';
import useLocales from '@/hooks/useLocales';
import AppLayout from '@/layouts/app-layout';
import type { BreadcrumbItem } from '@/types';
import { Head, useForm } from '@inertiajs/react';
import toast from 'react-hot-toast';
import { route } from 'ziggy-js';

interface EditProps {
    item: {
        id: number;
        section: string;
        question: string;
        answer: string;
        lang: string;
    };
}

export default function Edit({ item }: EditProps) {
    const { t } = useLocales();
    const breadcrumbs: BreadcrumbItem[] = t('dashboard.help.edit.breadcrumbs', { returnObjects: true });

    const { data, setData, put, errors, processing } = useForm({
        section: item.section,
        question: item.question,
        answer: item.answer,
        lang: item.lang,
    });

    // const handleSubmit = (e: React.FormEvent) => {
    //     e.preventDefault();

    //     const formData = new FormData();
    //     formData.append('section', data.section);
    //     formData.append('question', data.question);
    //     formData.append('answer', data.answer);

    //     put(route('admin.help.update', item.id), {
    //         data: formData,
    //         forceFormData: true,
    //     });
    // };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('section', data.section);
        formData.append('question', data.question);
        formData.append('answer', data.answer);

        put(route('admin.help.update', item.id));
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title={t('dashboard.help.edit.title')} />

            <form onSubmit={handleSubmit} className="max-w-6xl space-y-6 p-4">
                {/* Section */}
                <SelectInput
                    id="section"
                    name="section"
                    label={t('dashboard.help.inputs.questionType.label')}
                    options={t('dashboard.help.inputs.questionType.options', { returnObjects: true }) as any}
                    value={data.section}
                    onChange={(value) => setData('section', value)}
                    className="max-w-auto w-full"
                />

                {/* Question */}
                <TextInput
                    id="question"
                    value={data.question}
                    setValue={(value) => setData('question', value)}
                    label={t('dashboard.help.inputs.question.label')}
                    placeholder={t('dashboard.help.inputs.question.placeholder')}
                    error={errors.question}
                />

                {/* Answer */}
                <div className="grid w-full items-center gap-3">
                    <label className="block text-sm font-medium mb-1">{t('dashboard.help.inputs.answer.label')}</label>
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
