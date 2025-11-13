import RichTextEditor from '@/components/RichTextEditor';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head, Link, useForm } from '@inertiajs/react';
import { route } from 'ziggy-js';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Help',
        href: 'admin/Help',
    },
];

export default function Create() {
    const { data, setData, post, reset, processing, errors } = useForm({
        section: 'Getting_Start',
        question: '',
        answer: '',
    });

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

        // post(route('admin.help.store'), {
        //     onSuccess: () => {
        //         reset();
        //     },
        // });
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Help" />
            <form
                onSubmit={handleSubmit}
                className="flex flex-col space-y-4 p-6"
            >
                <div className="grid w-full items-center gap-3">
                    <Label htmlFor="section">Question Type</Label>
                    <select
                        id="section"
                        value={data.section}
                        onChange={(e) => setData('section', e.target.value)}
                        className="w-full rounded border border-gray-300 px-3 py-2 focus:ring-2 focus:ring-amber-500 focus:outline-none"
                    >
                        <option value="Getting_Start">Getting Start</option>
                        <option value="Quests">Quests</option>
                        <option value="App_Economy">App Economy</option>
                        <option value="Skill_Ranks">Skill Ranks</option>
                        <option value="Account_Management">
                            Account Management
                        </option>
                        <option value="Purchase">Purchase</option>
                        <option value="Troubleshooting">Troubleshooting</option>
                        <option value="Content_Community_Guidelines">
                            Content and Community Guidelines
                        </option>
                        <option value="Contact_Support">Contact Support</option>
                    </select>

                    {errors.section && (
                        <p className="text-sm text-red-600">{errors.section}</p>
                    )}
                </div>

                {/* Question */}
                <div className="grid w-full items-center gap-3">
                    <Label htmlFor="question">Question</Label>
                    <Input
                        id="question"
                        type="text"
                        value={data.question}
                        onChange={(e) => setData('question', e.target.value)}
                        placeholder="Enter question"
                    />
                    {errors.question && (
                        <p className="text-sm text-red-600">
                            {errors.question}
                        </p>
                    )}
                </div>
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
                {/* Action Buttons */}
                <div className="flex items-center justify-end space-x-4 pt-4">
                    <Link
                        href={route('admin.help.index')}
                        className="w-28 rounded-lg border border-gray-300 px-6 py-2 text-center font-semibold text-gray-700 hover:bg-gray-100"
                    >
                        Back
                    </Link>

                    <button
                        type="submit"
                        className="w-28 cursor-pointer rounded-lg bg-amber-600 px-6 py-2 font-semibold text-white shadow hover:bg-amber-700 disabled:opacity-70"
                        disabled={processing}
                    >
                        {processing ? 'Saving...' : 'Save'}
                    </button>
                </div>
            </form>
        </AppLayout>
    );
}
