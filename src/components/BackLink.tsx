import Link from "next/link";
import { ArrowLeftIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "./ui/button";

export function BackLink({
  href,
  children,
  className,
}: Readonly<{
  href: string;
  children: React.ReactNode;
  className?: string;
}>) {
  return (
    <Button size="sm" variant="ghost" asChild className={cn("-ml-3", className)}>
      <Link className="text-muted-foreground flex items-center gap-2 text-sm" href={href}>
        <ArrowLeftIcon />
        {children}
      </Link>
    </Button>
  );
}
