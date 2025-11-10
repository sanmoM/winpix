import 'froala-editor/css/froala_editor.pkgd.min.css';
import 'froala-editor/css/froala_style.min.css';
import 'froala-editor/js/plugins.pkgd.min.js';
import { useEffect, useState } from 'react';
import FroalaEditor from 'react-froala-wysiwyg';

interface Props {
    modelValue?: string;
    dir?: string;
    onChange?: (value: string) => void;
}

export default function RichTextEditor({
    modelValue = '',
    dir = 'ltr',
    onChange,
}: Props) {
    const [content, setContent] = useState(modelValue);

    useEffect(() => {
        if (modelValue !== content) {
            setContent(modelValue);
        }
    }, [modelValue]);

    const handleModelChange = (newContent: string) => {
        setContent(newContent);
        if (onChange) onChange(newContent);
    };

    return (
        <div className="w-full rounded-2xl border border-gray-200 bg-bg-primary p-4 shadow-sm">
            <FroalaEditor
                key={dir}
                tag="textarea"
                model={content}
                onModelChange={handleModelChange}
                config={{
                    placeholderText: 'Write your content here...',
                    heightMin: 300,
                    charCounterCount: true,
                    direction: dir,
                    toolbarButtons: [
                        'bold',
                        'italic',
                        'underline',
                        '|',
                        'paragraphFormat',
                        'align',
                        'formatOL',
                        'formatUL',
                        '|',
                        'insertLink',
                        'insertImage',
                        'undo',
                        'redo',
                    ],
                }}
            />
        </div>
    );
}
