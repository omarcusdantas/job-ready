import { MarkdownRenderer } from "@/components/MarkdownRenderer";
import { ResizableHandle, ResizablePanel, ResizablePanelGroup } from "@/components/ui/resizable";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Textarea } from "@/components/ui/textarea";
import { QuestionStatus } from "../utils";

export function QuestionContainer({
  question,
  answer,
  feedback,
  status,
  setAnswer,
}: Readonly<{
  question?: string;
  answer?: string;
  feedback?: string;
  status: QuestionStatus;
  setAnswer: (value: string) => void;
}>) {
  return (
    <ResizablePanelGroup direction="horizontal" className="flex-grow border-t">
      <ResizablePanel defaultSize={50} minSize={5}>
        <ResizablePanelGroup direction="vertical" className="flex-grow">
          <ResizablePanel defaultSize={25} minSize={5}>
            <ScrollArea className="h-full min-w-48 *:h-full">
              {question === null && status === "init" ? (
                <p className="flex h-full items-center justify-center p-6 text-base md:text-lg">
                  Select a difficulty above
                </p>
              ) : (
                question && <MarkdownRenderer className="p-6">{question}</MarkdownRenderer>
              )}
            </ScrollArea>
          </ResizablePanel>
          {feedback && (
            <>
              <ResizableHandle withHandle />
              <ResizablePanel id="feedback" defaultSize={75} minSize={5}>
                <ScrollArea className="h-full min-w-48 *:h-full">
                  <MarkdownRenderer className="p-6">{feedback}</MarkdownRenderer>
                </ScrollArea>
              </ResizablePanel>
            </>
          )}
        </ResizablePanelGroup>
      </ResizablePanel>
      <ResizableHandle withHandle />
      <ResizablePanel id="answer" defaultSize={50} minSize={5}>
        <ScrollArea className="h-full min-w-48 *:h-full">
          <Textarea
            disabled={status !== "pending-answer"}
            onChange={(e) => setAnswer(e.target.value)}
            value={answer ?? ""}
            placeholder="Type your answer..."
            className="h-full w-full resize-none rounded-none border-none p-6 !text-base focus-visible:ring focus-visible:ring-inset"
          />
        </ScrollArea>
      </ResizablePanel>
    </ResizablePanelGroup>
  );
}
