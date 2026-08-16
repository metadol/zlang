import { FeedWrapper } from "@/components/layout/feed-wrapper";
import { StickyWrapper } from "@/components/layout/sticky-wrapper";
import { UserProgress } from "@/components/widgets/user-progress";
import { getUserProgress } from "@/db/queries";
import { redirect } from "next/navigation";
import { FamilyPlan } from "./_components/family-plan";
import { Items } from "./_components/items";

const ShopPage = async () => {
  const userProgressPromise = getUserProgress();

  const [userProgress] = await Promise.all([userProgressPromise]);

  if (!userProgress || !userProgress.activeCourse) {
    redirect("/courses");
  }

  return (
    <div className="flex gap-4 p-4 bg-background">
      <FeedWrapper>
        <div className="bg-background w-full flex flex-col items-center">
          <FamilyPlan />
          <Items
            hearts={userProgress.hearts}
            points={userProgress.points}
            hasActiveSubscription={false}
          />
        </div>
      </FeedWrapper>

      <StickyWrapper>
        <UserProgress
          hearts={userProgress.hearts}
          points={userProgress.points}
          hasActiveSubscription={false}
          activeCourse={userProgress.activeCourse}
        />
      </StickyWrapper>
    </div>
  );
};

export default ShopPage;
