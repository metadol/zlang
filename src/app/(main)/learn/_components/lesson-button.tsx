"use client";

import Link from "next/link";
import { Check, Crown, Star } from "lucide-react";

import { ProgressRing } from "@/components/widgets/progress-ring";
import { UnitColor } from "@/lib/unit-colors";
import { TooltipArrowBottom } from "@/components/widgets/tooltip-arrow";
import { LessonIconButton } from "./lesson-icon-button";

type Props = {
  id: number;
  index: number;
  totalCount: number;
  locked?: boolean;
  current?: boolean;
  percentage: number;
  reverse: boolean;
  color: UnitColor;
};

const pattern = [0, 1, 2, 1, 0, -1, -2, -1];

export const LessonButton = ({
  id,
  index,
  reverse,
  totalCount,
  locked,
  current,
  percentage,
  color,
}: Props) => {
  const multiplier = reverse ? -1 : 1;
  const rightPosition = pattern[index % pattern.length] * 40 * multiplier;

  const isFirst = index === 0;
  const isLast = index === totalCount;
  const isCompleted = !current && !locked;

  const Icon = isCompleted ? Check : isLast ? Crown : Star;
  const href = isCompleted ? `/lesson/${id}` : "/lesson";

  return (
    <Link href={href}>
      <div
        className="relative"
        style={{
          right: rightPosition,
          marginTop: isFirst ? 60 : 24,
        }}
      >
        {current ? (
          <div className="relative h-[93px] w-[98px]">
            <div className="absolute -top-6 left-[11px] z-10 animate-[bounce_2s_infinite]">
              <div
                className="rounded-xl border-2 border-border bg-card px-3 py-2.5 font-bold uppercase tracking-wider"
                style={{ color: color.accent }}
              >
                Start
              </div>
              <TooltipArrowBottom />
            </div>

            <ProgressRing value={percentage} color={color.accent}>
              <LessonIconButton
                Icon={Icon}
                locked={locked}
                completed={isCompleted}
                accentColor={color.accent}
              />
            </ProgressRing>
          </div>
        ) : (
          <LessonIconButton
            Icon={Icon}
            locked={locked}
            completed={isCompleted}
            accentColor={color.accent}
          />
        )}
      </div>
    </Link>
  );
};
