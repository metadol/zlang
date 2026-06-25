"use client";

import { Check, Crown, Star } from "lucide-react";

type Props = {
  id: number;
  index: number;
  totalCount: number;
  locked?: boolean;
  current?: boolean;
  percenrage: number;
};

export const LessonButton = ({
  id,
  index,
  totalCount,
  locked,
  current,
  percenrage,
}: Props) => {
  const cycleLength = 8;
  const cycleIndex = index % cycleLength;

  let indentationLevel;
  if (cycleIndex <= 2) {
    indentationLevel = cycleIndex;
  } else if (cycleIndex <= 4) {
    indentationLevel = 4 - cycleIndex;
  } else if (cycleIndex <= 6) {
    indentationLevel = 4 - cycleIndex;
  } else {
    indentationLevel = cycleIndex - 8;
  }

  const rightPosition = indentationLevel * 40;

  const isFirst = index === 0;
  const isLast = index === totalCount;
  const isCompleted = !current && !locked;

  const Icon = isCompleted ? Check : isLast ? Crown : Star
  const href = isCompleted ? `/lesson/${id}` : `/lesson`


  return <div className="flex">Lesson Button{id}<Star/> <Check/><Crown/></div>;
};
