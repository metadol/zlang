"use client";

import Link from "next/link";
import { Check, Crown, Star } from "lucide-react";

import { ProgressRing } from "@/components/widgets/progress-ring";
import { TooltipArrow } from "@/components/widgets/tooltip-arrow";
import { LessonIconButton } from "./lesson-icon-button";

type Props = {
  id: number;
  index: number;
  totalCount: number;
  locked?: boolean;
  current?: boolean;
  percentage: number;
};

const pattern = [0, 1, 2, 1, 0, -1, -2, -1];

export const LessonButton = ({
  id,
  index,
  totalCount,
  locked,
  current,
  percentage,
}: Props) => {
  const rightPosition = pattern[index % pattern.length] * 40;

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
            <div className="absolute -top-6 left-3 z-10 hidden animate-[bounce_2s_infinite]">
              <div className="rounded-xl border-2 bg-white px-3 py-2.5 font-bold uppercase tracking-wider text-green-500">
                Start
              </div>
              <TooltipArrow />
            </div>

            <ProgressRing value={percentage}>
              <LessonIconButton
                Icon={Icon}
                locked={locked}
                completed={isCompleted}
              />
            </ProgressRing>
          </div>
        ) : (
          <LessonIconButton
            Icon={Icon}
            locked={locked}
            completed={isCompleted}
          />
        )}
      </div>
    </Link>
  );
};
