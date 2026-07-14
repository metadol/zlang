import { challenges } from "@/db/schema";
import { cn } from "@/lib/utils";
import Image from "next/image";
import { useCallback } from "react";
import { useAudio, useKey } from "react-use";

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

  // Define the variants for selected and correct states
  const variants = {
    selected: "border-sky-300 bg-sky-100 hover:bg-sky-100 text-sky-600",
    correct: "border-green-300 bg-green-100 hover:bg-green-100 text-green-600",
  };

  const cardClasses = cn(
    selected && (status === "correct" ? variants.correct : variants.selected),
    disabled && "pointer-events-none",
  );

  return (
    <div
      onClick={handleClick}
      className={cn(
        "h-full border-2 rounded-xl border-b-4 hover:bg-black/5 cursor-pointer p-4 lg:p-6 active:border-b-2 text-neutral-400",
        cardClasses,
      )}
    >
      {audio}
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
