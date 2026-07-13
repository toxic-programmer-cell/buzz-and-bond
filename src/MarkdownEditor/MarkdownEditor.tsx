"use client";

import MDEditor from "@uiw/react-md-editor";

interface Props {
    value: string;
    onChange: (value: string) => void;
    preview: "edit" | "preview";
}

export default function MarkdownEditor({
    value,
    onChange,
    preview,
}: Props) {
    return (
        <div data-color-mode="light">
            <MDEditor
                value={value}
                onChange={(v) => onChange(v ?? "")}
                preview={preview}
                height={400}
            />
        </div>
    );
}