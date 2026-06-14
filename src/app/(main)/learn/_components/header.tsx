import { Button } from "@/components/ui/button";
import { ArrowLeft, ArrowLeftIcon } from "lucide-react";
import Link from "next/link";

type Props = {
  title: string;
};

export const Header = ({ title }: Props) => {
  return (
    <div className="bg-white sticky top-0 pb-3 lg:pt-7 flex items-center justify-between border-b-2 mb-5 text-neutral-400 lg:z-50">
      <Link href="/courses">
        <Button variant={"ghost"} size={"sm"}>
          <ArrowLeft size={20} strokeWidth={2} className="text-neutral-400" />
        </Button>
      </Link>
      <h1 className="text-lg font-bold">{title}</h1>
      <div />
    </div>
  );
};
