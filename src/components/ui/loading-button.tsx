import { ComponentPropsWithoutRef } from "react";
import { Loader2Icon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export function LoadingButton({
  isLoading,
  loadingText,
  disabled,
  children,
  className,
  ...props
}: Readonly<
  ComponentPropsWithoutRef<typeof Button> & {
    isLoading?: boolean;
    loadingText?: string;
  }
>) {
  return (
    <Button disabled={isLoading || disabled} className={className} {...props}>
      <div className="relative">
        <div className={cn("flex items-center gap-2", isLoading && "invisible")}>{children}</div>
        {isLoading && (
          <div className="absolute inset-0 flex items-center justify-center gap-2">
            <Loader2Icon className="h-4 w-4 animate-spin" />
            {loadingText}
          </div>
        )}
      </div>
    </Button>
  );
}
