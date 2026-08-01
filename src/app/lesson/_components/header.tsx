import { Progress } from "@/components/ui/progress";
import { useExitModal } from "@/store/use-exit-modal";
import { InfinityIcon, X } from "lucide-react";
import Image from "next/image";

type Props = {
  hearts: number;
  percentage: number;
  hasActiveSubscription: boolean;
};

export const Header = ({
  hearts,
  percentage,
  hasActiveSubscription,
}: Props) => {
  const { open } = useExitModal();

  return (
    <header className="bg-white lg:pt-[50px] pt-[30px] lg:px-10 px-6 flex gap-x-7 items-center justify-between max-w-[1140px] mx-auto w-full">
      <X
        onClick={open}
        className="text-slate-500 hover:opacity-75 transition cursor-pointer"
      />
      <Progress value={percentage} className="flex-1" />
      <div className="text-rose-500 font-bold flex items-center gap-2">
        <Image src="/heart.svg" alt="heart" width={30} height={30} />
        {hasActiveSubscription ? <InfinityIcon className="h-4 w-4" /> : hearts}
      </div>
    </header>
  );
};
