import { ComponentProps } from "react";
import Markdown from "react-markdown";
import { cn } from "@/lib/utils";

export function MarkdownRenderer({ className, ...props }: { className?: string } & ComponentProps<typeof Markdown>) {
  return (
    <div className={cn("prose prose-neutral dark:prose-invert max-w-none font-sans", className)}>
      <Markdown {...props} />
    </div>
  );
}
