"use client";

import { challengeOptions, challenges } from "@/db/schema";
import { Header } from "./header";
import { useState } from "react";

//Here we are passing initialvlaues only to the component the rest will be handled in htis comoe itself usinghte state management so marking this as use client too
type Props = {
  initialLessonId: number;
  initialHearts: number;
  initialPercentage: number;
  initialLessonChallenges: (typeof challenges.$inferSelect & {
    completed: boolean;
    challengeOptions: (typeof challengeOptions.$inferSelect)[];
  })[];
  //   userSubscription: typeof userSubscription.$inferSelect & {
  //     isActive: boolean;
  //   } | null;
  userSubscription: null;
};

export const Quiz = ({
  initialLessonId,
  initialHearts,
  initialPercentage,
  initialLessonChallenges,
}: Props) => {
  const [hearts, setHearts] = useState(50);
  const [percentage, setPercentage] = useState(50);

  return (
    <>
      <Header
        hearts={hearts}
        percentage={percentage}
        hasActiveSubscription={false}
      />

      <div className="flex-1 bg-red-500 p-2">
        <div className="h-full flex items-center justify-center bg-green-500">
          <div className="lg:min-h-[350px] lg:w-[600px] w-full bg-violet-500 px-6 lg:px-0 flex flex-col gap-y-12">
            <h1 className="text-2xl lg:text-3xl text-start font-bold text-neutral-700">
              which of this one is an apple
            </h1>

            <div>{/*TODO: add challenge */}</div>
          </div>
        </div>
      </div>
    </>
  );
};
