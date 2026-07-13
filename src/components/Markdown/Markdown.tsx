import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

interface Props {
    content: string;
}

export default function Markdown({
    content,
}: Props) {
    return (
        <ReactMarkdown
            remarkPlugins={[remarkGfm]}
        >
            {content}
        </ReactMarkdown>
    );
}