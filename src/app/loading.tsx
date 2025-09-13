import { Loader2Icon } from "lucide-react";

export default function Loading() {
  return (
    <div className="h-screen-header flex items-center justify-center">
      <Loader2Icon className="size-24 animate-spin" />
    </div>
  );
}
