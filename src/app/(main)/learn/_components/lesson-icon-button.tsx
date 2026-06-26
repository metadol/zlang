"use client";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { LucideIcon } from "lucide-react";

type Props = {
  locked?: boolean;
  completed?: boolean;
  Icon: LucideIcon;
};

export const LessonIconButton = ({ locked, completed, Icon }: Props) => {
  const buttonClasses = cn(
    "h-[57px] w-[70px] border-b-0 mb-2 transition-all",
    locked
      ? "shadow-[0_8px_0_rgba(0,0,0,0.2),0_8px_0_#e5e5e5]"
      : "shadow-[0_8px_0_0_#388500] hover:translate-y-[2px] hover:shadow-[0_7px_0_0_#388500]",
  );

  const iconClasses = cn(
    "h-[34px] w-[42px]",
    locked
      ? "fill-neutral-400 text-neutral-400 stroke-neutral-400"
      : "fill-primary-foreground text-primary-foreground",
    completed && "fill-none stroke-[4]",
  );

  return (
    <Button
      size="rounded"
      variant={locked ? "locked" : "secondary"}
      className={buttonClasses}
    >
      <Icon className={iconClasses} />
    </Button>
  );
};
