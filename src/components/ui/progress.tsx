"use client";

import * as React from "react";
import * as ProgressPrimitive from "@radix-ui/react-progress";

import { cn } from "@/lib/utils";

const Progress = React.forwardRef<
  React.ElementRef<typeof ProgressPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof ProgressPrimitive.Root>
>(({ className, value, ...props }, ref) => (
  <ProgressPrimitive.Root
    ref={ref}
    className={cn(
      "relative h-4 w-full overflow-hidden rounded-full bg-secondary",
      className,
    )}
    {...props}
  >
    <ProgressPrimitive.Indicator
      className="h-full w-full flex-1 bg-green-500 transition-all rounded-full"
      style={{ transform: `translateX(-${100 - (value || 0)}%)` }}
    />
    <div
      className="absolute top-[25%] rounded-full bg-white opacity-20 pointer-events-none transition-[width] duration-400"
      style={
        {
          height: "25%",
          left: "calc(var(--h) / 4)",
          width: `calc(${value || 0}% - var(--h) / 2)`,
          "--h": "1rem",
        } as React.CSSProperties
      }
    />
  </ProgressPrimitive.Root>
));
Progress.displayName = ProgressPrimitive.Root.displayName;

export { Progress };
