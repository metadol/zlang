import { useVideo, useWindowSize } from "react-use";
import { ResultCard } from "./result-card";
import Confetti from "react-confetti";
import dynamic from "next/dynamic";

const Lottie = dynamic(() => import("lottie-react"), { ssr: false });

export const QuizComplete = () => {
  const { width, height } = useWindowSize();

  return (
    <>
      <Confetti
        width={width}
        height={height}
        recycle={false}
        numberOfPieces={500}
        tweenDuration={10000}
      />
      <div className="bg-background flex flex-col gap-y-4 max-w-lg mx-auto text-center items-center justify-center h-full ">
        <Lottie
          // @ts-expect-error
          path={"/lottie/lesson-complete.json"}
          loop={true}
          autoplay
          className="w-[280px] h-[280px]"
        />
        <h1 className="text-2xl font-bold text-[#ffc800]">Lesson Complete!</h1>

        <div className="flex bg-background items-center gap-x-4 w-full">
          <div className="animate-delayed delay-1">
            <ResultCard variant="points" value={10} />
          </div>

          <div className="animate-delayed delay-2">
            <ResultCard variant="hearts" value={10} />
          </div>

          <div className="animate-delayed delay-3">
            <ResultCard variant="goals" value={"10%"} />
          </div>
        </div>
      </div>
    </>
  );
};
