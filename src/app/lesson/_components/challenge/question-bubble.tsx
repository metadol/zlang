import { TooltipArrowLeft } from "@/components/widgets/tooltip-arrow";
import Image from "next/image";
type Props = {
  question: string;
};

export const QuestionBubble = ({ question }: Props) => {
  return (
    <div className="flex items-center gap-x-4 mb-6 bg-background">
      <Image
        src="/avatar1.svg"
        alt="avatar"
        width={80}
        height={80}
      />
      <div className="relative px-3.5 py-2.5 border-2 border-border rounded-xl text-sm lg:text-base text-muted-foreground">
        <TooltipArrowLeft />
        {question}
      </div>
    </div>
  );
};
