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

  if (!userProgress || !userProgress.activeCourse) {
    redirect("/courses");
  }
  return (
    <div className="flex gap-4 p-4 bg-yellow-300">
      <FeedWrapper>
        <Header title="Hindi" />
        Learn Page
        <div className="h-[1000px]" />
      </FeedWrapper>

      <StickyWrapper>
        <UserProgress
          activeCourse={{ title: "Hindi", imgSrc: "/es.svg" }}
          hearts={20}
          points={40}
          hasActiveSubscription
        />
        My sticky sidebar
      </StickyWrapper>
    </div>
  );
};

export default LearnPage;
