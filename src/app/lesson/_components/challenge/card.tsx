import { challenges } from "@/db/schema";
import { cn } from "@/lib/utils";
import dynamic from "next/dynamic";
import Image from "next/image";
import { useCallback, useMemo } from "react";
import { useAudio, useKey } from "react-use";

// lottie-react needs the browser, so no SSR
const Lottie = dynamic(() => import("lottie-react"), { ssr: false });

type Props = {
  type: (typeof challenges.$inferSelect)["type"];
  id: number;
  status?: "correct" | "incorrect" | "unanswered";
  text: string;
  disabled?: boolean;
  shortcut?: string;
  imageSrc?: string | null;
  audioSrc?: string | null;
  onClick: () => void;
  selected: boolean;
};

const SPARKLE_LAYOUTS = [
  [
    {
      path: "/lottie/sparkle-single.json",
      position:
        "top-[1.5rem] left-[1rem] -translate-x-1/2 -translate-y-1/2 w-8 h-8",
    },
    {
      path: "/lottie/sparkle-group.json",
      position:
        "bottom-[0.5rem] right-[1.5rem] translate-x-1/2 translate-y-1/2 w-12 h-12",
    },
  ],
  [
    {
      path: "/lottie/sparkle-group.json",
      position:
        "top-[2rem] left-[2rem] -translate-x-1/2 -translate-y-1/2 w-12 h-12",
    },
    {
      path: "/lottie/sparkle-single.json",
      position:
        "bottom-[1rem] right-[1.5rem] translate-x-1/2 translate-y-1/2 w-8 h-8",
    },
  ],
  [
    {
      path: "/lottie/sparkle-single.json",
      position:
        "top-[1.5rem] right-[1.5rem] translate-x-1/2 -translate-y-1/2 w-8 h-8",
    },
    {
      path: "/lottie/sparkle-group.json",
      position:
        "bottom-[0.5rem] left-[2rem] -translate-x-1/2 translate-y-1/2 w-12 h-12",
    },
  ],
  [
    {
      path: "/lottie/sparkle-group.json",
      position:
        "top-[2rem] right-[2rem] translate-x-1/2 -translate-y-1/2 w-12 h-12",
    },
    {
      path: "/lottie/sparkle-single.json",
      position:
        "bottom-[1rem] left-[1rem] -translate-x-1/2 translate-y-1/2 w-8 h-8",
    },
  ],
] as const;

export const Card = ({
  type,
  id,
  status,
  text,
  disabled,
  shortcut,
  imageSrc,
  audioSrc,
  onClick,
  selected,
}: Props) => {
  const [audio, _, controls] = useAudio({
    src: audioSrc || "",
    autoPlay: false,
  });

  const handleClick = useCallback(() => {
    if (disabled) return;
    controls.play();
    onClick();
  }, [disabled, onClick, controls]);

  useKey(shortcut, handleClick, {}, [handleClick]);

  const isCorrectSelected = selected && status === "correct";

  const sparkles = useMemo(() => {
    if (!isCorrectSelected) return null;
    const randomIndex = Math.floor(Math.random() * SPARKLE_LAYOUTS.length);
    return SPARKLE_LAYOUTS[randomIndex];
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isCorrectSelected]);

  // Define the variants for selected and correct states
  const variants = {
    selected:
      "border-quiz-selected-border bg-quiz-selected-bg hover:bg-quiz-selected-bg text-quiz-selected-text",
    correct:
      "border-quiz-correct-border bg-quiz-correct-bg hover:bg-quiz-correct-bg text-quiz-correct-text",
  };

  const cardClasses = cn(
    selected && (status === "correct" ? variants.correct : variants.selected),
    disabled && "pointer-events-none",
  );

  return (
    <div
      onClick={handleClick}
      className={cn(
        "h-full border-2 border-border rounded-xl border-b-4 hover:bg-black/5 dark:hover:bg-white/5 cursor-pointer p-4 lg:p-6 active:border-b-2 text-muted-foreground relative",
        cardClasses,
      )}
    >
      {audio}

      {sparkles &&
        sparkles.map(({ path, position }) => (
          <div key={path} className={cn("absolute z-10", position)}>
            {/* @ts-ignore */}
            <Lottie path={path} loop={false} autoplay />
          </div>
        ))}

      {imageSrc && (
        <div className="relative aspect-square mb-4 max-h-20 lg:max-h-40 w-full">
          <Image src={imageSrc} alt={text} fill />
        </div>
      )}

      <div className="flex items-center justify-center lg:justify-between">
        <p className="text-base">{text}</p>
        <div
          className={cn(
            "w-[30px] h-[30px] border-2 items-center justify-center rounded-lg hidden lg:flex font-bold text-sm",
            cardClasses,
          )}
        >
          {shortcut}
        </div>
      </div>
    </div>
  );
};
