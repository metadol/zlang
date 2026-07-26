import { cn } from "@/lib/utils";
import Image from "next/image";

type Props = {
  value: number | String;
  variant: "points" | "hearts" | "goals";
};

const IMAGE_MAP: Record<Props["variant"], { src: string; size: number }> = {
  points: { src: "/points.svg", size: 20 },
  hearts: { src: "/heart.svg", size: 30 },
  goals: { src: "/goal.svg", size: 25 },
};

export const ResultCard = ({ value, variant }: Props) => {
  const { src: imageSrc, size: imageSize } = IMAGE_MAP[variant];

  return (
    <div
      className={cn(
        "bg-blue-500 rounded-2xl border-2 w-[100px] lg:w-[163px]",
        variant === "points" && "bg-yellow-500 border-yellow-500",
        variant === "hearts" && "bg-rose-500 border-rose-500",
        variant === "goals" && "bg-green-500 border-green-500",
      )}
    >
      <div
        className={cn(
          "bg-violet-500 rounded-t-xl text-white font-bold uppercase text-xs p-2",
          variant === "points" && "bg-yellow-500",
          variant === "hearts" && "bg-rose-500",
          variant === "goals" && "bg-green-500",
        )}
      >
        {variant === "hearts" ? "hearts left" : "total xp"}
      </div>

      <div
        className={cn(
          "flex justify-center rounded-t-2xl rounded-b-[14px] bg-white  font-bold text-lg",
          variant === "points" && "text-yellow-500 p-[18px] lg:p-[25px]",
          variant === "hearts" && "text-rose-500 p-4 lg:p-6",
          variant === "goals" && "text-green-500 p-4 lg:p-6",
        )}
      >
        <Image
          alt={variant}
          src={imageSrc}
          width={imageSize}
          height={imageSize}
          className="mr-1.5"
        />
        {value}
      </div>
    </div>
  );
};
