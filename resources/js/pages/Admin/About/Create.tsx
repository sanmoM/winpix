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
];

export default function Create() {
    const { data, setData, post, processing } = useForm({
        title: '',
        content: '',
        picture: null as File | null,
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        post(route('admin.about.store'));
        // translateVariants(data, import.meta.env.VITE_GEMINI_API_KEY).then((translatedData) => {
        //     fetch(route('admin.about.store'), {
        //         method: 'POST',
        //         headers: {
        //             'Content-Type': 'application/json',
        //         },
        //         body: JSON.stringify(translatedData),
        //     }).then((response) => {
        //         console.log(response)
        //     })
        // })
    };

    async function translateVariants(data, apiKey) {
        if (!apiKey) throw new Error("Gemini API key is required");

        const apiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash-preview-09-2025:generateContent?key=${apiKey}`;

        const jsonInput = JSON.stringify(data);
        const prompt = `
Translate the following JSON object into English and Arabic.
Return an array with exactly two JSON objects:
- One with lang = 'en' (English translations)
- One with lang = 'ar' (Arabic translations)
Maintain the same keys as the original object.
Input: ${jsonInput}
`;

        const payload = {
            contents: [
                {
                    role: "user",
                    parts: [{ text: prompt }]
                }
            ]
        };

        const response = await fetch(apiUrl, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(payload),
        });

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.error?.message || "Unknown API error");
        }

        const result = await response.json();
        let text = result.candidates?.[0]?.content?.parts?.[0]?.text;

        if (!text) throw new Error("No valid translation returned from Gemini");

        // ✅ Strip Markdown code blocks if present
        text = text.replace(/^```json\s*/, "").replace(/\s*```$/, "").trim();

        const translatedArray = JSON.parse(text);

        if (!Array.isArray(translatedArray)) {
            throw new Error(`Invalid translation format: ${text}`);
        }

        return translatedArray;
    }

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="About" />
            <form
                onSubmit={handleSubmit}
                className="flex flex-col space-y-4 p-6"
                encType="multipart/form-data"
            >
                {/* Image Upload */}
                <div className="grid w-full items-center gap-3">
                    <Label htmlFor="picture">Image</Label>
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
                    {processing ? 'Saving...' : 'Save'}
                </button>
            </form>
        </AppLayout>
    );
}
