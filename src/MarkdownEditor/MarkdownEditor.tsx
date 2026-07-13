"use client";

import MDEditor from "@uiw/react-md-editor";

interface Props {
    value: string;
    onChange: (value: string) => void;
}

export default function MarkdownEditor({
    value,
    onChange,
}: Props) {
    return (
        <div data-color-mode="light">
            <MDEditor
                value={value}
                onChange={(v) => onChange(v ?? "")}
                preview="edit"
                height={400}
            />
        </div>
    );
}