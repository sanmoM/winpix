import RichTextEditor from '@/components/RichTextEditor';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head, useForm } from '@inertiajs/react';
import { route } from 'ziggy-js';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Help',
        href: 'admin/Help',
    },
];

export default function Create() {
    const { data, setData, post, processing } = useForm({
        section: '',
        question: '',
        answer: '',
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        post(route('admin.help.store'));
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Help" />
            <form
                onSubmit={handleSubmit}
                className="flex flex-col space-y-4 p-6"
            >
                <div className="grid w-full items-center gap-3">
                    <Label htmlFor="section">Section</Label>
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
                </div>

                {/* Question */}
                <Label htmlFor="question">Question</Label>
                <Input
                    id="question"
                    type="text"
                    value={data.question}
                    onChange={(e) => setData('question', e.target.value)}
                    placeholder="Enter question"
                />

                {/* Answer */}
                <Label htmlFor="answer">Answer</Label>
                <RichTextEditor
                    modelValue={data.answer}
                    onChange={(val) => setData('answer', val)}
                />

                {/* Submit */}
                <button
                    type="submit"
                    className="w-28 rounded-lg bg-amber-600 px-6 py-2 font-semibold text-white shadow hover:bg-amber-700"
                    disabled={processing}
                >
                    {processing ? 'Saving...' : 'Save'}
                </button>
            </form>
        </AppLayout>
    );
}
