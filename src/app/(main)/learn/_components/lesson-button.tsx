"use client";

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
  return <div>Lesson Button{id}</div>;
};
