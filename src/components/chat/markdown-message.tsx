import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import remarkMath from "remark-math";
import rehypeKatex from "rehype-katex";
import { cn } from "@/lib/utils";
import { ChartRenderer, parseChartSpec } from "@/components/chat/chart-renderer";
import "katex/dist/katex.min.css";

interface MarkdownMessageProps {
  content: string;
  className?: string;
}

/**
 * Normalizes LaTeX delimiters so remarkMath/rehypeKatex can render them.
 * Converts \[...\] to $$...$$ and \(...\) to $...$, and also
 * bare [ ... ] blocks that contain LaTeX commands.
 */
function normalizeMathDelimiters(text: string): string {
  let result = text;
  result = result.replace(/\\\[([\s\S]*?)\\\]/g, (_, math) => `$$${math}$$`);
  result = result.replace(/\\\(([\s\S]*?)\\\)/g, (_, math) => `$${math}$`);
  result = result.replace(/\[\s*((?:[^[\]]*\\(?:text|times|frac|sqrt|cdot|sum|int|left|right|displaystyle|begin|end|mathrm|mathbf)[^[\]]*?))\s*\]/g,
    (_, math) => `$$${math}$$`
  );
  return result;
}

export function MarkdownMessage({ content, className }: MarkdownMessageProps) {
  const normalized = normalizeMathDelimiters(content);

  return (
    <div className={cn("markdown-cfa text-sm leading-relaxed text-foreground", className)}>
      <ReactMarkdown
        remarkPlugins={[remarkGfm, [remarkMath, { singleDollarTextMath: true }]]}
        rehypePlugins={[[rehypeKatex, { strict: false, throwOnError: false }]]}
        components={{
          h1: ({ children }) => <h1 className="mb-2 mt-4 text-lg font-bold">{children}</h1>,
          h2: ({ children }) => <h2 className="mb-2 mt-4 text-base font-semibold">{children}</h2>,
          h3: ({ children }) => <h3 className="mb-1 mt-3 text-sm font-semibold">{children}</h3>,
          p: ({ children }) => <p className="my-2 leading-relaxed">{children}</p>,
          ul: ({ children }) => <ul className="my-2 list-disc space-y-1 pl-5">{children}</ul>,
          ol: ({ children }) => <ol className="my-2 list-decimal space-y-1 pl-5">{children}</ol>,
          li: ({ children }) => <li className="leading-relaxed">{children}</li>,
          strong: ({ children }) => <strong className="font-semibold text-foreground">{children}</strong>,
          code: ({ children, className }) => {
            const inline = !className;
            return inline ? (
              <code className="rounded bg-muted px-1.5 py-0.5 font-mono text-[0.92em] text-primary">
                {children}
              </code>
            ) : (
              <code className={className}>{children}</code>
            );
          },
          pre: ({ children }) => {
            const codeEl = children as React.ReactElement<{ className?: string; children?: string }>;
            const codeText = typeof codeEl?.props?.children === "string" ? codeEl.props.children : "";
            const lang = codeEl?.props?.className || "";

            if (lang.includes("chart") || lang.includes("json")) {
              const spec = parseChartSpec(codeText.trim());
              if (spec) {
                return <ChartRenderer spec={spec} />;
              }
            }

            return (
              <pre className="my-3 overflow-x-auto rounded-xl border border-border bg-muted/60 p-4 text-xs">
                {children}
              </pre>
            );
          },
        }}
      >
        {normalized}
      </ReactMarkdown>
    </div>
  );
}
