import { challenges } from "@/db/schema";
import { cn } from "@/lib/utils";
import Image from "next/image";

type Props = {
  type: (typeof challenges.$inferSelect)["type"];
  id: number;
  status?: "correct" | "incorrect" | "unanswered";
  text: string;
  disabled?: boolean;
  shortcut?: string;
  imageSrc?: string;
  audioSrc?: string;
  onClick?: () => void;
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
  const isSelected = selected && status !== "correct";
  const isCorrect = selected && status === "correct";

  //if answer is wrong still show the selected state only
  const variantClasses = cn(
    isSelected && "border-sky-300 bg-sky-100 hover:bg-sky-100 text-sky-600",
    isCorrect &&
      "border-green-300 bg-green-100 hover:bg-green-100 text-green-600",
    disabled && "pointer-events-none",
  );
  return (
    <div
      onClick={onClick}
      className={cn(
        "h-full border-2 rounded-xl border-b-4 hover:bg-black/5 cursor-pointer p-4 lg:p-6 active:border-b-2 text-neutral-400",
        variantClasses,
      )}
    >
      {imageSrc && (
        <div className="relative aspect-square mb-4 max-h-20 lg:max-h-40 w-full">
          <Image src={imageSrc} alt={text} fill />
        </div>
      )}
      <div className="flex items-center justify-center lg:justify-between">
        <p className="text-base">{text}</p>
        <div
          className={cn(
            " w-[30px] h-[30px] border-2 items-center justify-center rounded-lg hidden lg:flex font-bold text-sm",
            variantClasses,
          )}
        >
          {shortcut}
        </div>
      </div>
    </div>
  );
};
