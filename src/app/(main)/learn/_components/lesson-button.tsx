"use client";

import { TooltipArrow } from "@/components/widgets/tooltip-arrow";
import { cn } from "@/lib/utils";
import { Check, Crown, Star } from "lucide-react";
import Link from "next/link";
import { CircularProgressbarWithChildren } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";

type Props = {
  id: number;
  index: number;
  totalCount: number;
  locked?: boolean;
  current?: boolean;
  percenrage: number;
};

const pattern = [0, 1, 2, 1, 0, -1, -2, -1];

export const LessonButton = ({
  id,
  index,
  totalCount,
  locked,
  current,
  percenrage,
}: Props) => {
  const rightPosition = pattern[index % pattern.length] * 40;

  const isFirst = index === 0;
  const isLast = index === totalCount;
  const isCompleted = !current && !locked;

  const Icon = isCompleted ? Check : isLast ? Crown : Star;
  const href = isCompleted ? `/lesson/${id}` : `/lesson`;

  return (
    <Link
      href={href}
      aria-disabled={locked}
      style={{ pointerEvents: locked ? "none" : "auto" }}
    >
      <div
        className="relative"
        style={{ right: `${rightPosition}px`, marginTop: isFirst ? 60 : 24 }}
      >
        {current ? (
          <div className="h-[102px] w-[102px] relative bg-red-500">
            <div className="absolute -top-6 left-2.5 z-10 bg-yellow-500 animate-[bounce_2s_infinite]">
              <div className="relative bg-white px-3 py-2.5 border-2 font-bold uppercase text-green-500 rounded-xl tracking-wider">
                Start
              </div>
              <TooltipArrow />
            </div>
          </div>
        ) : (
          <div className="h-[102px] w-[102px] relative">
            this is not current
          </div>
        )}
        {/* <CircularProgressbarWithChildren value={percenrage} strokeWidth={6} /> */}
      </div>
    </Link>
  );
};
