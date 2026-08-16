"use client";

import { Contrast } from "lucide-react";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

type Props = {
  className?: string;
};

export const ThemeToggle = ({ className }: Props) => {
  const { resolvedTheme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <Button
        variant="ghost"
        size="icon"
        className={cn(
          "bg-transparent hover:!bg-transparent active:!bg-transparent focus:!bg-transparent focus-visible:!ring-0 focus-visible:!ring-offset-0",
          className
        )}
        disabled
        tabIndex={-1}
      >
        <Contrast className="h-5 w-5" />
      </Button>
    );
  }

  const isDark = resolvedTheme === "dark";

  return (
    <Button
      variant="ghost"
      size="icon"
      className={cn(
        "bg-transparent hover:!bg-transparent active:!bg-transparent focus:!bg-transparent focus-visible:!ring-0 focus-visible:!ring-offset-0",
        className
      )}
      onClick={() => setTheme(isDark ? "light" : "dark")}
      aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
      tabIndex={-1}
    >
      <Contrast className="h-5 w-5" />
    </Button>
  );
};