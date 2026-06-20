"use client";

import { courses, userProgress } from "@/db/schema";
import { Card } from "./card";
import { useRouter } from "next/navigation";
import { useState, useTransition } from "react";
import { upsertUserProgress } from "@/actions/user-progress";
import { toast } from "sonner";

type Props = {
  courses: (typeof courses.$inferSelect)[];
  activeCourseId?: (typeof userProgress.$inferSelect)["activeCourseId"];
};

export const List = ({ courses, activeCourseId }: Props) => {
  const router = useRouter();

  const [isPending, startTransition] = useTransition();
  const [selectedCourseId, setSelectedCourseId] = useState<number | null>(null);

  const handleCourseClick = (id: number) => {
    if (isPending) {
      return;
    }

    if (id === activeCourseId) {
      return;
    }
    setSelectedCourseId(id);

    startTransition(() => {
      upsertUserProgress(id).catch(() => {
        toast.error("Something went wrong");
      });
    });
  };

  return (
    <div className="pt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-[repeat(auto-fill,minmax(210px,1fr))] gap-6">
      {courses.map((course) => (
        <Card
          id={course.id}
          key={course.id}
          disabled={isPending}
          title={course.title}
          imgSrc={course.imageSrc}
          onClick={handleCourseClick}
          active={course.id === activeCourseId}
          loading={isPending && selectedCourseId === course.id}
        />
      ))}
    </div>
  );
};
