import { ReactNode } from "react";
import { cn } from "@/lib/utils";

interface MarkdownMessageProps {
  content: string;
  className?: string;
}

function renderInline(text: string): ReactNode[] {
  const parts = text.split(/(`[^`]+`|\*\*[^*]+\*\*|\$[^$\n]+\$)/g).filter(Boolean);

  return parts.map((part, index) => {
    if (part.startsWith("`") && part.endsWith("`")) {
      return (
        <code key={index} className="rounded bg-muted px-1.5 py-0.5 font-mono text-[0.92em] text-primary">
          {part.slice(1, -1)}
        </code>
      );
    }

    if (part.startsWith("**") && part.endsWith("**")) {
      return (
        <strong key={index} className="font-semibold text-foreground">
          {part.slice(2, -2)}
        </strong>
      );
    }

    if (part.startsWith("$") && part.endsWith("$")) {
      return (
        <span key={index} className="rounded bg-primary/10 px-1.5 py-0.5 font-mono text-[0.92em] text-primary">
          {part.slice(1, -1)}
        </span>
      );
    }

    return part;
  });
}

function renderFormula(formula: string, key: string) {
  return (
    <div key={key} className="my-3 overflow-x-auto rounded-xl border border-primary/20 bg-primary/5 px-4 py-3">
      <code className="whitespace-pre-wrap font-mono text-sm leading-relaxed text-primary">
        {formula.trim()}
      </code>
    </div>
  );
}

export function MarkdownMessage({ content, className }: MarkdownMessageProps) {
  const lines = content.split("\n");
  const nodes: ReactNode[] = [];
  let codeBuffer: string[] | null = null;
  let formulaBuffer: string[] | null = null;
  let listBuffer: string[] = [];
  let orderedListBuffer: string[] = [];

  const flushLists = () => {
    if (listBuffer.length > 0) {
      const items = listBuffer;
      listBuffer = [];
      nodes.push(
        <ul key={`ul-${nodes.length}`} className="my-2 list-disc space-y-1 pl-5">
          {items.map((item, index) => (
            <li key={index}>{renderInline(item)}</li>
          ))}
        </ul>
      );
    }

    if (orderedListBuffer.length > 0) {
      const items = orderedListBuffer;
      orderedListBuffer = [];
      nodes.push(
        <ol key={`ol-${nodes.length}`} className="my-2 list-decimal space-y-1 pl-5">
          {items.map((item, index) => (
            <li key={index}>{renderInline(item)}</li>
          ))}
        </ol>
      );
    }
  };

  lines.forEach((line, index) => {
    const trimmed = line.trim();

    if (trimmed.startsWith("```")) {
      if (codeBuffer) {
        nodes.push(
          <pre key={`code-${index}`} className="my-3 overflow-x-auto rounded-xl border border-border bg-muted/60 p-4">
            <code className="font-mono text-xs leading-relaxed">{codeBuffer.join("\n")}</code>
          </pre>
        );
        codeBuffer = null;
      } else {
        flushLists();
        codeBuffer = [];
      }
      return;
    }

    if (codeBuffer) {
      codeBuffer.push(line);
      return;
    }

    if (trimmed === "$$") {
      if (formulaBuffer) {
        nodes.push(renderFormula(formulaBuffer.join("\n"), `formula-${index}`));
        formulaBuffer = null;
      } else {
        flushLists();
        formulaBuffer = [];
      }
      return;
    }

    if (formulaBuffer) {
      formulaBuffer.push(line);
      return;
    }

    if (!trimmed) {
      flushLists();
      return;
    }

    if (trimmed.startsWith("### ")) {
      flushLists();
      nodes.push(
        <h3 key={index} className="mb-1 mt-4 text-sm font-semibold text-foreground">
          {renderInline(trimmed.slice(4))}
        </h3>
      );
      return;
    }

    if (trimmed.startsWith("## ")) {
      flushLists();
      nodes.push(
        <h2 key={index} className="mb-1 mt-4 text-base font-semibold text-foreground">
          {renderInline(trimmed.slice(3))}
        </h2>
      );
      return;
    }

    if (trimmed.startsWith("# ")) {
      flushLists();
      nodes.push(
        <h1 key={index} className="mb-1 mt-4 text-lg font-bold text-foreground">
          {renderInline(trimmed.slice(2))}
        </h1>
      );
      return;
    }

    if (/^[-*]\s+/.test(trimmed)) {
      orderedListBuffer = [];
      listBuffer.push(trimmed.replace(/^[-*]\s+/, ""));
      return;
    }

    if (/^\d+\.\s+/.test(trimmed)) {
      listBuffer = [];
      orderedListBuffer.push(trimmed.replace(/^\d+\.\s+/, ""));
      return;
    }

    flushLists();
    nodes.push(
      <p key={index} className="my-2 leading-relaxed">
        {renderInline(trimmed)}
      </p>
    );
  });

  flushLists();

  return (
    <div className={cn("text-sm leading-relaxed text-foreground", className)}>
      {nodes}
    </div>
  );
}
