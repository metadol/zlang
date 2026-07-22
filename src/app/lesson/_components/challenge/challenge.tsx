import { challengeOptions, challenges } from "@/db/schema";
import { cn } from "@/lib/utils";
import { Card } from "./card";

type Props = {
  options: (typeof challengeOptions.$inferSelect)[];
  onSelect: (option: number) => void;
  status: "correct" | "incorrect" | "unanswered";
  selectedOption: number | null;
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
        "grid gap-2 grid-cols-2 lg:grid-cols-[repeat(auto-fit,minmax(0,1fr))]",
      )}
    >
      {options.map((option, index) => (
        <Card
          type={type}
          id={option.id}
          key={option.id}
          status={status}
          text={option.text}
          disabled={disabled}
          shortcut={`${index + 1}`}
          imageSrc={option.imageSrc}
          audioSrc={option.audioSrc}
          onClick={() => onSelect(option.id)}
          selected={selectedOption === option.id}
        />
      ))}
    </div>
  );
};
