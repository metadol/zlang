import { cn } from "@/lib/utils";
import { Check } from "lucide-react";
import Image from "next/image";

type Props = {
  id: number;
  disabled?: boolean;
  title: string;
  imgSrc: string;
  onClick: (id: number) => void;
  active: boolean;
  loading: boolean;
};

export const Card = ({
  id,
  disabled,
  title,
  imgSrc,
  onClick,
  active,
  loading,
}: Props) => {
  return (
    <div
      onClick={() => onClick(id)}
      className={cn(
        "h-full border-2 rounded-xl border-b-4 hover:bg-black/5 cursor-pointer active:border-b-2 flex flex-col items-center justify-between p-3 pb-6 min-h-[217px] min-w-[200px]",
        disabled && "pointer-events-none",
      )}
    >
      <div className="min-h-[24px] w-full flex items-center justify-end">
        {active && (
          <div className="rounded-md bg-green-600 flex items-center justify-center p-1.5">
            <Check size={16} strokeWidth={4} className="text-white" />
          </div>
        )}
      </div>

      {loading ? (
        <Image
          src={"/dots_loader.svg"}
          alt={`${title} loading`}
          height={50}
          width={50}
          priority
        />
      ) : (
        <Image
          src={imgSrc}
          alt={title}
          height={68}
          width={88}
          className="rounded-xl border"
        />
      )}

      <p className="text-neutral-700 text-center font-bold text-lg">{title}</p>
    </div>
  );
};
