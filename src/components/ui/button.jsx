import * as React from "react";
import { cva } from "class-variance-authority";
import { Slot } from "radix-ui";

import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-all disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 shrink-0 [&_svg]:shrink-0 outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive",
  {
    variants: {
      variant: {
        default:
          "bg-primary text-secondary font-secondary border border-secondary rounded-full my-transition hover:bg-secondary hover:text-primary hover:boreder-primary cursor-pointer focus:bg-secondary",
        category1:
          "bg-transparent font-primary text-white hover:text-primary my-transition cursor-pointer",
        category2:
          "bg-transparent cursor-pointer font-primary text-primary hover:text-white my-transition hover:[text-shadow:0_0_10px_rgba(77, 12, 62, 1);,0_0_25px_rgba(77, 12, 62, 1);,0_0_45px_rgba(77, 12, 62, 1);]",
        card: "bg-border rounded-full",
        secondary:
          "bg-secondary text-primary font-secondary border border-primary my-transition hover:bg-primary hover:text-secondary hover:border-secondary cursor-pointer",
        ghost: "bg-transparent my-transition cursor-pointer",
        link: "text-primary underline-offset-4 hover:underline",
      },
      size: {
        default: "w-fit px-4 py-1 text-center items-center has-[>svg]:px-3",
        xs: "h-6 gap-1 rounded-md px-2 text-xs has-[>svg]:px-1.5 [&_svg:not([class*='size-'])]:size-3",
        sm: "h-8 rounded-md gap-1.5 px-3 has-[>svg]:px-2.5",
        lg: "h-10 rounded-md px-6 has-[>svg]:px-4",
        ghostsize: "w-full h-full",
        icon: "size-9",
        "icon-xs": "size-6 rounded-md [&_svg:not([class*='size-'])]:size-3",
        "icon-sm": "size-8",
        "icon-lg": "size-10",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  },
);

function Button({
  className,
  variant = "default",
  size = "default",
  asChild = false,
  ...props
}) {
  const Comp = asChild ? Slot.Root : "button";

  return (
    <Comp
      data-slot="button"
      data-variant={variant}
      data-size={size}
      className={cn(buttonVariants({ variant, size, className }))}
      {...props}
    />
  );
}

export { Button, buttonVariants };
