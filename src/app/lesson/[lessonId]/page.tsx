import { getLesson, getUserProgress } from "@/db/queries";
import { redirect } from "next/navigation";
import { Quiz } from "../_components/quiz";

// This is a dynamic route 
// props are coming directly from the url ex: lesson/1
type Props = {
  params: {
    lessonId: number;
  };
};

const LessonIdPage = async ({ params }: Props) => {
  const lessonPromise = getLesson(params.lessonId);
  const userProgressPromise = getUserProgress();

  const [lesson, userProgress] = await Promise.all([
    lessonPromise,
    userProgressPromise,
  ]);

  if (!lesson || !userProgress) {
    redirect("/learn");
  }

  const initialPercentage =
    (lesson.challenges.filter((challenge) => challenge.completed).length /
      lesson.challenges.length) *
    100;

  return (
    <Quiz
      initialLessonId={lesson.id}
      initialHearts={userProgress.hearts}
      initialPercentage={initialPercentage}
      initialLessonChallenges={lesson.challenges}
      userSubscription={null}
    />
  );
};

export default LessonIdPage;
