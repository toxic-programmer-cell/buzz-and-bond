import MDEditor from "@uiw/react-md-editor";

interface Props {
    content: string;
}

export default function MarkdownPreview({ content }: Props) {
    return (
        <div
            data-color-mode="light"
            className="rounded-xl border border-zinc-200 p-4 min-h-[400px]"
        >
            <MDEditor.Markdown
                source={content}
                style={{ background: "transparent" }}
            />
        </div>
    );
}