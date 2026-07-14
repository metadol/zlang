import { useKey, useMedia } from "react-use";
import { CheckCircle, XCircle } from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

type Props = {
  disabled: boolean;
  lessonId?: number;
  status: "correct" | "incorrect" | "unanswered" | "completed";
  onCheck: () => void;
};

export const Footer = ({ status, disabled, onCheck }: Props) => {
  
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
      <div className="max-w-[1040px] h-full mx-auto flex items-center justify-center px-6 lg:px-10">
        <Button
          size={"lg"}
          disabled={disabled}
          className="w-full lg:w-auto lg:ml-auto min-w-[150px]"
          variant={buttonVariant}
        >
          {buttonText}
        </Button>
      </div>
    </footer>
  );
};
