import { type ReactNode } from "react";

/** 极简 Markdown 渲染器 — 支持段落、加粗、引用、标题 */
export function MarkdownText({ content }: { content: string }) {
  const blocks = content.split(/\n\n+/);
  return (
    <div className="space-y-3">
      {blocks.map((block, i) => {
        const trimmed = block.trim();
        if (!trimmed) return null;

        // 引用块
        if (trimmed.startsWith("> ")) {
          const text = trimmed.replace(/^> /gm, "");
          return (
            <blockquote
              key={i}
              className="border-l-4 pl-3 italic"
              style={{
                borderColor: "var(--app-border-l3)",
                color: "var(--app-text-l3)",
              }}
            >
              {renderInline(text)}
            </blockquote>
          );
        }

        // 标题
        if (trimmed.startsWith("### ")) {
          return (
            <h3 key={i} className="text-base font-semibold text-app-text-l1">
              {renderInline(trimmed.slice(4))}
            </h3>
          );
        }
        if (trimmed.startsWith("## ")) {
          return (
            <h2 key={i} className="text-lg font-semibold text-app-text-l1">
              {renderInline(trimmed.slice(3))}
            </h2>
          );
        }

        // 普通段落
        return (
          <p key={i} className="leading-relaxed text-app-text-l2">
            {renderInline(trimmed)}
          </p>
        );
      })}
    </div>
  );
}

/** 渲染行内格式（加粗） */
function renderInline(text: string): ReactNode[] {
  const parts = text.split(/(\*\*[^*]+\*\*)/g);
  return parts.map((part, i) => {
    if (part.startsWith("**") && part.endsWith("**")) {
      return (
        <strong key={i} className="font-semibold text-app-text-l1">
          {part.slice(2, -2)}
        </strong>
      );
    }
    // 处理换行
    if (part.includes("\n")) {
      return part.split("\n").map((line, j, arr) => (
        <span key={`${i}-${j}`}>
          {line}
          {j < arr.length - 1 && <br />}
        </span>
      ));
    }
    return <span key={i}>{part}</span>;
  });
}
