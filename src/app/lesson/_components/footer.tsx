import { useKey, useMedia } from "react-use";
import { CheckCircle, XCircle } from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { challengeOptions } from "@/db/schema";

type Props = {
  status: "correct" | "incorrect" | "unanswered" | "completed";
  disabled?: boolean;
  checking: boolean;
  onCheck: () => void;
  lessonId?: number;
  correctOption?: typeof challengeOptions.$inferSelect;
};

export const Footer = ({
  status,
  disabled,
  checking,
  onCheck,
  lessonId,
  correctOption,
}: Props) => {
  useKey("Enter", onCheck, {}, [onCheck]);

  let buttonText = status === "unanswered" ? "Check" : "Continue";

  let buttonVariant: "secondary" | "danger" | "default" = "secondary";
  if (disabled) {
    buttonVariant = "default";
  } else if (status === "incorrect") {
    buttonVariant = "danger";
  }

  return (
    <footer
      className={cn(
        "bg-background lg:h-[140px] h-[100px] border-t-2 border-border",
        status === "correct" && "border-transparent bg-green-100 dark:bg-card/50",
        status === "incorrect" && "border-transparent bg-rose-100 dark:bg-card/50",
      )}
    >
      <div className="max-w-[1040px] h-full mx-auto flex flex-col lg:flex-row items-center justify-center px-6 lg:px-10">
        {status === "correct" && (
          <div className="text-green-600 font-bold text-base lg:text-2xl  items-center hidden lg:flex">
            <CheckCircle
              size={28}
              strokeWidth={2}
              className="text-green-600 mr-4"
            />
            Great!
          </div>
        )}
        {status === "incorrect" && (
          <div className="text-rose-600 font-bold text-base lg:text-2xl  items-center hidden lg:flex">
            <XCircle size={28} strokeWidth={2} className="text-rose-600 mr-4" />
            Correct solution: {correctOption?.text}
          </div>
        )}
        {status === "completed" && (
          <Button
            size={"lg"}
            className="hidden lg:flex"
            onClick={() => (window.location.href = `/lesson/${lessonId}`)}
          >
            Practice again
          </Button>
        )}
        <Button
          size={"lg"}
          disabled={disabled || checking}
          onClick={onCheck}
          className="w-full lg:w-auto lg:ml-auto min-w-[150px]"
          variant={buttonVariant}
        >
          {checking ? (
            <Image
              src={"/dots_loader_white.svg"}
              alt={"loading"}
              height={35}
              width={35}
              priority
            />
          ) : (
            buttonText
          )}
        </Button>
      </div>
    </footer>
  );
};
