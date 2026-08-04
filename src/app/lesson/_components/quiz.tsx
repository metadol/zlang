"use client";

import { challengeOptions, challenges } from "@/db/schema";
import { Header } from "./header";
import { useState, useTransition } from "react";
import { QuestionBubble } from "./challenge/question-bubble";
import { Challenge } from "./challenge/challenge";
import { Footer } from "./footer";
import { upsertChallengeProgress } from "@/actions/challenge-progress";
import { toast } from "sonner";
import { reduceHearts } from "@/actions/user-progress";
import { useAudio, useMount } from "react-use";
import { QuizComplete } from "./completed/quiz-complete";
import { useRouter } from "next/navigation";
import { useHeartsModal } from "@/store/use-hearts-modal";

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

const getChallengeTitle = (challenge: typeof challenges.$inferSelect) => {
  if (challenge.type === "ASSIST") {
    return "Select the correct meaning";
  }

  return challenge.question;
};

export const Quiz = ({
  initialLessonId,
  initialHearts,
  initialPercentage,
  initialLessonChallenges,
}: Props) => {
  const router = useRouter();

  const { open: openHeartsModal } = useHeartsModal();

  const [completedAudio] = useAudio({
    src: "/lesson-complete.mp3",
    autoPlay: true,
  });

  const [correctAudio, _c, correctControls] = useAudio({
    src: "/duolingo-correct.mp3",
    autoPlay: false,
  });
  const [incorrectAudio, _ic, incorrectControls] = useAudio({
    src: "/duolingo-incorrect.mp3",
    autoPlay: false,
  });

  const [pending, startTransition] = useTransition();
  const [isChecking, setIsChecking] = useState(false);

  const [hearts, setHearts] = useState(initialHearts);
  const [challenges] = useState(initialLessonChallenges);
  const [lessonId, setLessonId] = useState(initialLessonId);
  const [percentage, setPercentage] = useState(() => {
    return initialPercentage === 100 ? 0 : initialPercentage;
  });

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

  const onSelect = (optionId: number) => {
    if (status != "unanswered") return; // Prevent selection if already answered
    setSelectedOption(optionId);
  };

  const onCheck = () => {
    if (!selectedOption) return;

    setIsChecking(true);

    const correctOption = options.find((option) => option.correct);

    if (correctOption?.id === selectedOption) {
      upsertChallengeProgress(challenge.id)
        .then((response) => {
          if (response?.error === "hearts") {
            openHeartsModal();
            return;
          }

          setStatus("correct");
          correctControls.play();
          setPercentage((prev) => prev + 100 / challenges.length);

          // This is a practice lesson so increase hearts for correct answer
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
            openHeartsModal();
            return;
          }

          setStatus("incorrect");
          incorrectControls.play();
          setPercentage((prev) => prev + 100 / challenges.length);

          if (!response?.error) {
            setHearts((prev) => Math.max(prev - 1, 0));
          }
        })
        .catch(() => toast.error("Something went wrong"))
        .finally(() => setIsChecking(false));
    }
  };

  const onContinue = () => {
    setStatus("unanswered");
    setSelectedOption(null);
    onNext();
  };

  const onNext = () => {
    setActiveChallengeIndex((current) => current + 1);
  };
  
  const onComplete = () => {
    startTransition(async () => {
      await new Promise((resolve) => setTimeout(resolve, 1000));
      router.push("/learn");
    });
  };

  const footerAction = status === "unanswered" ? onCheck : onContinue;

  /* CHALLENGE COMPLETED HANDLING*/
  const challenge = challenges[activeChallengeIndex];
  if (!challenge) {
    return (
      <>
        {completedAudio}
        <QuizComplete />
        <Footer
          checking={pending}
          lessonId={lessonId}
          status={"completed"}
          onCheck={onComplete}
        />
      </>
    );
  }

  const title = getChallengeTitle(challenge);
  const options = challenge.challengeOptions;
  const correctOption = options.find((option) => option.correct);

  return (
    <>
      {correctAudio}
      {incorrectAudio}
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
        correctOption={correctOption}
      />
    </>
  );
};
