import { FeedWrapper } from "@/components/layout/feed-wrapper";
import { StickyWrapper } from "@/components/layout/sticky-wrapper";
import { Button } from "@/components/ui/button";
import { SignOutButton } from "@clerk/nextjs";
import { Header } from "./_components/header";
import { UserProgress } from "@/components/widgets/user-progress";
import { getUserProgress } from "@/db/queries";
import { redirect } from "next/navigation";

const LearnPage = async () => {
  const userProgressPromise = getUserProgress();

  const [userProgress] = await Promise.all([userProgressPromise]);

  // Early return guarantees the required data exists, so optional chaining isn't needed below.
  if (!userProgress || !userProgress.activeCourse) {
    redirect("/courses");
  }
  return (
    <div className="flex gap-4 p-4 bg-yellow-300">
      <FeedWrapper>
        <Header title={userProgress.activeCourse.title} />
        Learn Page
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
