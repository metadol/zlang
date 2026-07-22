"use client";

import { challengeOptions, challenges } from "@/db/schema";
import { Header } from "./header";
import { useState, useTransition } from "react";
import { QuestionBubble } from "./challenge/question-bubble";
import { Challenge } from "./challenge/challenge";
import { Footer } from "./footer";
import { upsertChallengeProgress } from "@/actions/challenge-progress";
import { toast } from "sonner";
import { start } from "repl";
import { reduceHearts } from "@/actions/user-progress";

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
  const [pending, startTransition] = useTransition();
  const [isChecking, setIsChecking] = useState(false);

  const [hearts, setHearts] = useState(initialHearts);
  const [percentage, setPercentage] = useState(initialPercentage);
  const [challenges] = useState(initialLessonChallenges);

  /*given a lesson we want to directly show the user the first uncompleted challenge in a lesson so that he can continue from where he left off and not have to start from the beginning of the lesson again*/
  const [activeChallengeIndex, setActiveChallengeIndex] = useState(() => {
    const uncompletedChallengeIndex = challenges.findIndex(
      (challenge) => !challenge.completed,
    );
    return uncompletedChallengeIndex !== -1 ? uncompletedChallengeIndex : 0;
  });

  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [status, setStatus] = useState<"correct" | "incorrect" | "unanswered">(
    "unanswered",
  );

  const challenge = challenges[activeChallengeIndex];
  const title =
    challenge.type === "ASSIST"
      ? "Select the correct meaning"
      : challenge.question;
  const options = challenge.challengeOptions ?? [];

  const onNext = () => {
    setActiveChallengeIndex((current) => current + 1);
  };

  const onSelect = (optionId: number) => {
    if (status != "unanswered") return; // Prevent selection if already answered
    setSelectedOption(optionId);
  };

  const onContinue = () => {
    setStatus("unanswered");
    setSelectedOption(null);
    onNext();
  };

  const onCheck = () => {
    if (!selectedOption) return;

    setIsChecking(true);

    const correctOption = options.find((option) => option.correct);

    if (correctOption?.id === selectedOption) {
      upsertChallengeProgress(challenge.id)
        .then((response) => {
          if (response?.error === "hearts") {
            console.error("Missing hearts");
            return;
          }

          setStatus("correct");
          setPercentage((prev) => prev + 100 / challenges.length);

          if (initialPercentage === 100) {
            setHearts((prev) => Math.min(prev + 1, 5));
          }
        })
        .catch(() => toast.error("Something went wrong"))
        .finally(() => setIsChecking(false));
    } else {
      reduceHearts(challenge.id)
        .then((response) => {
          if (response?.error === "hearts") {
            console.error("Missing hearts");
            return;
          }

          setStatus("incorrect");
          setPercentage((prev) => prev + 100 / challenges.length);
          setHearts((prev) => Math.max(prev - 1, 0));
        })
        .catch(() => toast.error("Something went wrong"))
        .finally(() => setIsChecking(false));
    }
  };

  const footerAction = status === "unanswered" ? onCheck : onContinue;

  return (
    <>
      <Header
        hearts={hearts}
        percentage={percentage}
        hasActiveSubscription={false}
      />

      <div className="flex-1 bg-white p-2">
        <div className="h-full flex items-center justify-center bg-white">
          <div className="lg:min-h-[350px] lg:w-[600px] w-full bg-white px-6 lg:px-0 flex flex-col gap-y-12">
            <h1 className="text-2xl lg:text-3xl text-start font-bold text-neutral-700">
              {title}
            </h1>

            <div>
              {challenge.type === "ASSIST" && (
                <QuestionBubble question={challenge.question} />
              )}
              <Challenge
                type={challenge.type}
                options={options}
                status={status}
                disabled={false}
                onSelect={onSelect}
                selectedOption={selectedOption}
              />
            </div>
          </div>
        </div>
      </div>

      <Footer
        status={status}
        checking={isChecking}
        onCheck={footerAction}
        disabled={!selectedOption}
      />
    </>
  );
};
