import { FeedWrapper } from "@/components/layout/feed-wrapper";
import { StickyWrapper } from "@/components/layout/sticky-wrapper";
import { Button } from "@/components/ui/button";
import { SignOutButton } from "@clerk/nextjs";
import { Header } from "./_components/header";
import { UserProgress } from "@/components/widgets/user-progress";
import {
  getCourseProgress,
  getLessonPercentage,
  getUnits,
  getUserProgress,
} from "@/db/queries";
import { redirect } from "next/navigation";
import { Unit } from "./_components/unit";

const LearnPage = async () => {
  const unitsPromise = getUnits();
  const userProgressPromise = getUserProgress();
  const courseProgressPromise = getCourseProgress();
  const lessonPercentagePromise = getLessonPercentage();

  const [units, userProgress, courseProgress, lessonPercentage] =
    await Promise.all([
      unitsPromise,
      userProgressPromise,
      courseProgressPromise,
      lessonPercentagePromise,
    ]);

  if (!userProgress || !userProgress.activeCourse || !courseProgress) {
    redirect("/courses");
  }

  return (
    <div className="flex gap-4 p-4 bg-white">
      <FeedWrapper>
        <Header title={userProgress.activeCourse.title} />
        {units.map((unit) => (
          <div key={unit.id} className="mb-10">
            <Unit
              id={unit.id}
              order={unit.order}
              title={unit.title}
              lessons={unit.lessons}
              description={unit.description}
              activeLesson={courseProgress.activeLesson}
              activeLessonPercentage={lessonPercentage}
            />
          </div> 
        ))}
        <div className="h-[1000px]" />
      </FeedWrapper>

      <StickyWrapper>
        <UserProgress
          hearts={userProgress.hearts}
          points={userProgress.points}
          hasActiveSubscription={false}
          activeCourse={userProgress.activeCourse}
        />
        My sticky sidebar
      </StickyWrapper>
    </div>
  );
};

export default LearnPage;
