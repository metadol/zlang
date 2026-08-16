import { Button } from "@/components/ui/button";
import Image from "next/image";

export const FamilyPlan = () => {
  return (
    <div className="bg-cosmic text-white p-5 rounded-xl w-full flex relative overflow-hidden">
      <div className=" flex flex-col mt-6 gap-2 lg:w-[calc(100%-180px)]">
        <h2 className="text-2xl font-extrabold">Start a family plan!</h2>
        <p>
          Save on <strong>Super Duolingo</strong> when you learn with friends
        </p>
        <Button size={"lg"} variant={"family"} className="mt-6 ">
          Learn more
        </Button>
      </div>

      <Image
        src="/avatar_family.svg"
        alt="family plan"
        width={450}
        height={450}
        className="absolute -right-[15rem] -bottom-2"
      />
    </div>
  );
};
