import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import remarkMath from "remark-math";
import rehypeKatex from "rehype-katex";
import rehypeSlug from "rehype-slug";
import rehypeAutolinkHeadings from "rehype-autolink-headings";
import "katex/dist/katex.min.css";

type Props = {
  content: string;
};

export function MarkdownContent({ content }: Props) {
  return (
    <div className="markdown-blog text-foreground">
      <ReactMarkdown
        remarkPlugins={[remarkGfm, [remarkMath, { singleDollarTextMath: true }]]}
        rehypePlugins={[
          [rehypeKatex, { strict: false, throwOnError: false }],
          rehypeSlug,
          [
            rehypeAutolinkHeadings,
            {
              behavior: "wrap",
              properties: { className: ["heading-anchor"] },
            },
          ],
        ]}
        components={{
          h2: ({ children, id }) => (
            <h2
              id={id}
              className="mt-12 mb-4 scroll-mt-24 text-2xl font-bold tracking-tight sm:text-3xl"
            >
              {children}
            </h2>
          ),
          h3: ({ children, id }) => (
            <h3
              id={id}
              className="mt-8 mb-3 scroll-mt-24 text-xl font-semibold tracking-tight"
            >
              {children}
            </h3>
          ),
          h4: ({ children }) => (
            <h4 className="mt-6 mb-2 text-base font-semibold">{children}</h4>
          ),
          p: ({ children }) => (
            <p className="my-4 text-base leading-[1.75] text-foreground/90">
              {children}
            </p>
          ),
          ul: ({ children }) => (
            <ul className="my-4 list-disc space-y-2 pl-6 text-foreground/90">
              {children}
            </ul>
          ),
          ol: ({ children }) => (
            <ol className="my-4 list-decimal space-y-2 pl-6 text-foreground/90">
              {children}
            </ol>
          ),
          li: ({ children }) => (
            <li className="leading-[1.75]">{children}</li>
          ),
          strong: ({ children }) => (
            <strong className="font-semibold text-foreground">{children}</strong>
          ),
          em: ({ children }) => <em className="italic">{children}</em>,
          a: ({ children, href }) => (
            <a
              href={href}
              className="font-medium text-primary underline decoration-primary/30 underline-offset-2 transition-colors hover:decoration-primary"
              target={href?.startsWith("http") ? "_blank" : undefined}
              rel={href?.startsWith("http") ? "noopener noreferrer" : undefined}
            >
              {children}
            </a>
          ),
          blockquote: ({ children }) => (
            <blockquote className="my-6 border-l-4 border-primary/40 bg-primary/5 px-5 py-3 text-foreground/80 italic">
              {children}
            </blockquote>
          ),
          hr: () => <hr className="my-10 border-border" />,
          table: ({ children }) => (
            <div className="my-6 overflow-x-auto rounded-xl border border-border">
              <table className="w-full border-collapse text-sm">{children}</table>
            </div>
          ),
          thead: ({ children }) => (
            <thead className="bg-muted/60 text-left text-xs font-semibold uppercase tracking-wider text-muted-foreground">
              {children}
            </thead>
          ),
          th: ({ children }) => (
            <th className="px-4 py-3 font-semibold">{children}</th>
          ),
          td: ({ children }) => (
            <td className="border-t border-border px-4 py-3 align-top text-foreground/90">
              {children}
            </td>
          ),
          code: ({ children, className }) => {
            const inline = !className;
            return inline ? (
              <code className="rounded bg-muted px-1.5 py-0.5 font-mono text-[0.9em] text-primary">
                {children}
              </code>
            ) : (
              <code className={className}>{children}</code>
            );
          },
          pre: ({ children }) => (
            <pre className="my-6 overflow-x-auto rounded-xl border border-border bg-muted/60 p-4 text-sm">
              {children}
            </pre>
          ),
          img: ({ src, alt }) => (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={typeof src === "string" ? src : ""}
              alt={alt ?? ""}
              loading="lazy"
              className="my-6 rounded-xl border border-border"
            />
          ),
        }}
      >
        {content}
      </ReactMarkdown>
    </div>
  );
}
