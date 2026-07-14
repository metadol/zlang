import { TooltipArrowLeft } from "@/components/widgets/tooltip-arrow";
import Image from "next/image";
type Props = {
  question: string;
};

export const QuestionBubble = ({ question }: Props) => {
  return (
    <div className="flex items-center gap-x-4 mb-6 bg-white">
      <Image
        src="/avatar1.svg"
        alt="avatar"
        width={100}
        height={100}
        className="hidden lg:block"
      />
      <Image
        src="/avatar1.svg"
        alt="avatar"
        width={80}
        height={80}
        className="block lg:hidden"
      />

      <div className="relative px-3.5 py-2.5 border-2 rounded-xl text-sm lg:text-base text-neutral-600">
        <TooltipArrowLeft />
        {question}
      </div>
    </div>
  );
};
