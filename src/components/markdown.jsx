import Markdown from "react-markdown";

export default function MarkDown({ children, className }) {
  return (
    <div className={className}>
      <Markdown skipHtml>{children}</Markdown>
    </div>
  );
}