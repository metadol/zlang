"use client";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { LucideIcon } from "lucide-react";
import Image from "next/image";
import { CSSProperties } from "react";

type Props = {
  locked?: boolean;
  completed?: boolean;
  Icon: LucideIcon;
  accentColor?: string;
};

export const LessonIconButton = ({
  locked,
  completed,
  Icon,
  accentColor = "#58cc02",
}: Props) => {
  const accentStyle = { "--unit-accent": accentColor } as CSSProperties;

  const buttonClasses = cn(
    "h-[57px] w-[70px] border-b-0 mb-2 transition-all",
    locked
      ? "shadow-[0_8px_0_rgba(0,0,0,0.2),0_8px_0_hsl(var(--muted))] "
      : "shadow-[0_8px_0_0_rgba(0,0,0,0.2),0_8px_0_0_var(--unit-accent)] hover:translate-y-[2px] hover:shadow-[0_6px_0_0_rgba(0,0,0,0.2),0_6px_0_0_var(--unit-accent)] bg-[var(--unit-accent)] hover:bg-[var(--unit-accent)]",
  );

  const iconClasses = cn(
    "h-[34px] w-[42px] z-10",
    locked
      ? "fill-muted-locked text-muted-locked stroke-muted-locked"
      : "fill-white text-primary-foreground text-white",
    completed && "fill-none stroke-[4]",
  );

  return (
    <Button
      size="rounded"
      variant={locked ? "locked" : "secondary"}
      className={buttonClasses}
      style={locked ? undefined : accentStyle}
    >
      <Icon className={iconClasses} />
      {completed && (
        <Image
          src={"/tick_shiny.svg"}
          alt={"completed"}
          width={56}
          height={46}
          className={"absolute z-0"}
          draggable={false}
        />
      )}
    </Button>
  );
};
