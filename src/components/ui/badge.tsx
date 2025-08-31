import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const badgeVariants = cva(
  "px-2 py-0.5 inline-flex items-center justify-center rounded-md border text-xs font-medium whitespace-nowrap shrink-0 [&>svg]:size-3 gap-1 [&>svg]:pointer-events-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] w-fit aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive transition-[color,box-shadow] overflow-hidden",
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground border-transparent [a&]:hover:bg-primary/90",
        secondary: "bg-secondary text-secondary-foreground border-transparent [a&]:hover:bg-secondary/90",
        destructive:
          "bg-destructive text-white border-transparent [a&]:hover:bg-destructive/90 focus-visible:ring-destructive/20 dark:focus-visible:ring-destructive/40 dark:bg-destructive/60",
        warning:
          "bg-warning text-warning-foreground border-transparent [a&]:hover:bg-warning/90 focus-visible:ring-warning/20 dark:focus-visible:ring-warning/40 dark:bg-warning/60",
        outline: "text-foreground border-transparent [a&]:hover:bg-accent [a&]:hover:text-accent-foreground",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
);

export function Badge({
  asChild = false,
  className,
  variant,
  ...props
}: React.ComponentProps<"span"> & { asChild?: boolean } & VariantProps<typeof badgeVariants>) {
  const Component = asChild ? Slot : "span";
  return <Component className={cn(badgeVariants({ variant }), className)} data-slot="badge" {...props} />;
}
