import { FeedWrapper } from "@/components/layout/feed-wrapper";
import { StickyWrapper } from "@/components/layout/sticky-wrapper";
import { Button } from "@/components/ui/button";
import { SignOutButton } from "@clerk/nextjs";
import { Header } from "./_components/header";
import { UserProgress } from "@/components/widgets/user-progress";
import { getUnits, getUserProgress } from "@/db/queries";
import { redirect } from "next/navigation";
import { Unit } from "./_components/unit";

const LearnPage = async () => {
  const unitsPromise = getUnits();
  const userProgressPromise = getUserProgress();

  const [units, userProgress] = await Promise.all([
    unitsPromise,
    userProgressPromise,
  ]);

  if (!userProgress || !userProgress.activeCourse) {
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
              description={unit.description}
              lessons={unit.lessons}
              activeLesson={undefined}
              activeLessonPercentage={50}
            />
          </div>
        ))}
        <div className="h-[1000px]" />
      </FeedWrapper>

      <StickyWrapper>
        <UserProgress
          activeCourse={userProgress.activeCourse}
          hearts={userProgress.hearts}
          points={userProgress.points}
          hasActiveSubscription={false}
        />
        My sticky sidebar
      </StickyWrapper>
    </div>
  );
};

export default LearnPage;
