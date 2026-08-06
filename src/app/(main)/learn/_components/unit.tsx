import { lessons, units } from "@/db/schema";
import { LessonButton } from "./lesson-button";

type Props = {
  lessons: (typeof lessons.$inferSelect & { completed: boolean })[];
  activeLesson:
    | (typeof lessons.$inferSelect & { unit: typeof units.$inferSelect })
    | undefined;
  activeLessonPercentage: number;
  description?: string;
  reverse: boolean;
};

export const Unit = ({
  reverse,
  lessons,
  description,
  activeLesson,
  activeLessonPercentage,
}: Props) => {
  return (
    <>
      {description && (
        <div className="flex items-center gap-4">
          <hr className="h-[2px] flex-1 border-0 bg-gray-200" />
          <h2 className="whitespace-nowrap text-lg font-extrabold text-[#afafaf]">
            {description}
          </h2>
          <hr className="h-[2px] flex-1 border-0 bg-gray-200" />
        </div>
      )}

      <div className="flex items-center flex-col realtive">
        {lessons.map((lesson, index) => {
          const isCurrent = lesson.id === activeLesson?.id;
          const isLocked = !lesson.completed && !isCurrent;

          return (
            <LessonButton
              index={index}
              id={lesson.id}
              key={lesson.id}
              reverse={reverse}
              locked={isLocked}
              current={isCurrent}
              totalCount={lessons.length - 1}
              percentage={activeLessonPercentage}
            />
          );
        })}
      </div>
    </>
  );
};
