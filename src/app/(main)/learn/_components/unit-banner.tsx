import { Button } from "@/components/ui/button";
import { NotebookText } from "lucide-react";
import Link from "next/link";

type Props = {
  title: string;
  description: string;
};

export const UnitBanner = ({ title, description }: Props) => {
    //TODO: move the hardcocde green coros to tialiwnd vaeoirs brand colors
  return (
    <div className="bg-green-500 w-full rounded-xl p-4 text-white flex items-center justify-between">
      <div className="space-y-0">
        <h3 className="text-sm font-extrabold opacity-60 uppercase">{title}</h3>
        <p className="text-[22px] font-bold">{description}</p>
      </div>

      <Link href="/learn">
        <Button
          size={"lg"}
          variant={"secondary"}
          className="border-2 border-b-4 px-3"
        >
          <NotebookText size={20} strokeWidth={2} />
          <span className="hidden lg:flex">Continue</span>
        </Button>
      </Link>
    </div>
  );
};
