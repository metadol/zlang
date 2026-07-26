import { useVideo, useWindowSize } from "react-use";
import { ResultCard } from "./result-card";
import Confetti from "react-confetti";

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
      <div className="bg-white flex flex-col gap-y-4 max-w-lg mx-auto text-center items-center justify-center h-full">
        <video
          autoPlay
          loop
          muted
          playsInline
          disablePictureInPicture
          controls={false}
          controlsList="nodownload nofullscreen noremoteplayback"
          className="w-[280px] h-[280px] pointer-events-none select-none"
        >
          <source src="/video/session_end_3.mp4" type="video/mp4" />
        </video>
        <h1 className="text-2xl font-bold text-[#ffc800]">Lesson Complete!</h1>

        <div className="flex bg-white items-center gap-x-4 w-full">
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
