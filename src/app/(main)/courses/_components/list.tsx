"use client";
import { courses, userProgress } from "@/db/schema";
import { Card } from "./card";

type Props = {
  courses: (typeof courses.$inferSelect)[];
  activeCourseId?: typeof userProgress.$inferSelect["activeCourseId"];
};

export const List = ({ courses, activeCourseId }: Props) => {
  return (
    <div className="pt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-[repeat(auto-fill,minmax(210px,1fr))] gap-6">
      {courses.map((course) => (
        <Card
          id={course.id}
          key={course.id}
          disabled={false}
          title={course.title}
          imgSrc={course.imageSrc}
          onClick={() => console.log("clicked")}
          active={course.id === activeCourseId}
        />
      ))}
    </div>
  );
};
