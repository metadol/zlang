import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-xl text-sm font-bold ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none [&_svg]:pointer-events-none [&_svg]:shrink-0 uppercase tracking-wider",
  {
    variants: {
      variant: {
        default:
          "bg-card text-foreground border-slate-200 dark:border-border border-2 border-b-4 active:border-b-2 hover:bg-slate-100 dark:hover:bg-secondary text-slate-500 dark:text-muted-foreground disabled:opacity-50 disabled:bg-neutral-200 dark:disabled:bg-secondary",
        defaultOutline:
          "bg-card text-foreground border-slate-200 dark:border-border border-2 border-b-4 active:border-b-2 hover:bg-slate-100 dark:hover:bg-secondary text-slate-500 dark:text-muted-foreground disabled:opacity-50 disabled:border-b-2",
        primary:
          "bg-sky-400 text-primary-foreground hover:bg-sky-400/90 border-sky-500 border-b-4 active:border-b-0",
        primaryOutline:
          "bg-card text-sky-500 hover:bg-slate-100 dark:hover:bg-secondary",
        secondary:
          "bg-green-500 text-primary-foreground hover:bg-green-500/90 border-[#00000033] border-b-4 active:border-b-0",
        secondaryOutline:
          "bg-card text-green-500 hover:bg-slate-100 dark:hover:bg-secondary",
        danger:
          "bg-rose-500 text-primary-foreground hover:bg-rose-500/90 border-rose-600 border-b-4 active:border-b-0",
        dangerOutline: "bg-card text-rose-500",
        super:
          "bg-indigo-500 text-primary-foreground hover:bg-indigo-500/90 border-indigo-600 border-b-4 active:border-b-0",
        superOutline:
          "bg-card text-indigo-500 hover:bg-slate-100 dark:hover:bg-secondary",
        sidebar:
          "bg-transparent text-slate-500 dark:text-muted-foreground border-2 border-transparent hover:bg-slate-100 dark:hover:bg-secondary transition-none",
        sidebarOutline:
          "bg-sky-100 dark:bg-sky-950/50 text-sky-500 border-sky-300 dark:border-sky-800 border-2 hover:bg-sky-500/20",
        family:
          "bg-white border-0 border-b-4 border-b-[#9b91b9] text-black active:border-b-0",
        ghost:
          "bg-transparent text-slate-500 dark:text-muted-foreground border-transparent border-0 hover:bg-slate-100 dark:hover:bg-secondary",
        locked:
          "bg-neutral-200 dark:bg-secondary text-primary-foreground hover:bg-neutral-200/90 dark:hover:bg-secondary/90 border-neutral-400 dark:border-border border-b-4 active:border-b-0",
      },
      size: {
        default: "h-11 px-4 py-2",
        sm: "h-9 px-3",
        lg: "h-12 px-8",
        icon: "h-10 w-10",
        rounded: "rounded-[50%]",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  },
);

export interface ButtonProps
  extends
    React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    );
  },
);
Button.displayName = "Button";

export { Button, buttonVariants };
