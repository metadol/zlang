import { challengeOptions, challenges } from "@/db/schema";
import { cn } from "@/lib/utils";
import { Card } from "./card";

type Props = {
  options: (typeof challengeOptions.$inferSelect)[];
  onSelect: (option: string) => void;
  status: "correct" | "incorrect" | "unanswered";
  selectedOption: string | null;
  disabled: boolean;
  type: (typeof challenges.$inferSelect)["type"];
};

export const Challenge = ({
  options,
  onSelect,
  status,
  selectedOption,
  disabled,
  type,
}: Props) => {
  return (
    <div
      className={cn(
        "grid gap-2",
        type === "ASSIST" && "grid-col-1",
        type === "SELECT" &&
          "grid-cols-2 lg:grid-cols-[repeat(auto-fit,minmax(0,1fr))]",
      )}
    >
      {options.map((option, index) => (
        <Card
          type={type}
          id={option.id}
          key={option.id}
          status={
            index === 0 ? "correct" : index === 1 ? "unanswered" : "incorrect"
          }
          text={option.text}
          disabled={index==1}
          shortcut={`${index + 1}`}
          imageSrc={option.imageSrc}
          audioSrc={option.audioSrc}
          onClick={() => onSelect(option.id)}
          // selected={selectedOption === option.id}
          selected={index==1||index==0}
        />
      ))}
    </div>
  );
};
