import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import * as React from "react";
import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-lg text-sm font-medium transition-all duration-200 disabled:pointer-events-none disabled:opacity-50 [&_svg]:size-4",
  {
    variants: {
      variant: {
        primary:
          "bg-sage text-paper shadow-soft hover:bg-sage-600 hover:shadow-card",
        secondary:
          "border border-line bg-sand text-sage-deep hover:bg-sand-200",
        outline:
          "border-2 border-sage bg-transparent text-sage hover:bg-sage hover:text-paper",
        ghost: "text-sage-deep hover:bg-sage-100",
        clay: "bg-clay text-paper shadow-soft hover:bg-terracotta-light",
        hero: "rounded-xl bg-sage px-8 py-6 text-base text-paper shadow-elevated hover:bg-sage-600 hover:shadow-card",
        link: "px-0 text-sage underline-offset-4 hover:underline",
      },
      size: {
        sm: "h-9 rounded-md px-3",
        md: "h-10 px-4",
        lg: "h-12 rounded-lg px-8 text-base",
        xl: "h-14 rounded-xl px-10 text-base",
        icon: "size-11",
      },
    },
    defaultVariants: { variant: "primary", size: "md" },
  },
);

export function Button({
  className,
  variant,
  size,
  asChild = false,
  ...props
}: React.ComponentProps<"button"> &
  VariantProps<typeof buttonVariants> & { asChild?: boolean }) {
  const Comp = asChild ? Slot : "button";
  return (
    <Comp
      className={cn(buttonVariants({ variant, size }), className)}
      {...props}
    />
  );
}
