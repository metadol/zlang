import { useKey, useMedia } from "react-use";
import { CheckCircle, XCircle } from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import Image from "next/image";

type Props = {
  disabled: boolean;
  lessonId?: number;
  status: "correct" | "incorrect" | "unanswered" | "completed";
  checking: boolean;
  onCheck: () => void;
};

export const Footer = ({ status, disabled, checking, onCheck }: Props) => {
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
        "bg-white lg:h-[140px] h-[100px] border-t-2",
        status === "correct" && "border-transparent bg-green-100",
        status === "incorrect" && "border-transparent bg-rose-100",
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
            Correct solution: A tea.
          </div>
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
