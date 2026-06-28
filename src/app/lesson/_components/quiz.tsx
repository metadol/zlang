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
    </>
  );
};
