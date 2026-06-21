import { FeedWrapper } from "@/components/layout/feed-wrapper";
import { StickyWrapper } from "@/components/layout/sticky-wrapper";
import { Button } from "@/components/ui/button";
import { SignOutButton } from "@clerk/nextjs";
import { Header } from "./_components/header";
import { UserProgress } from "@/components/widgets/user-progress";
import { getUnits, getUserProgress } from "@/db/queries";
import { redirect } from "next/navigation";

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
    <div className="flex gap-4 p-4 bg-yellow-300">
      <FeedWrapper>
        <Header title={userProgress.activeCourse.title} />
        Learn Page
        {units.map((unit) => (
          <div key={unit.id}>
            <h2>{unit.title}</h2>
            {unit.lessons.map((lesson) => (
              <div key={lesson.id}>
                <h3>{lesson.title}</h3>
                {/* <p>{lesson.description}</p> */}
              </div>
            ))}
          </div>
        ))}
        {JSON.stringify(units, null, 2)}
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
