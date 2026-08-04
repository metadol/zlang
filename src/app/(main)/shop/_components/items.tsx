"use client";

import { toast } from "sonner";
import { useTransition } from "react";
import Image from "next/image";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { refillHearts } from "@/actions/user-progress";

import { POINTS_TO_REFILL } from "@/constants";

type Props = {
  hearts: number;
  points: number;
  hasActiveSubscription: boolean;
};
export const Items = ({ hearts, points, hasActiveSubscription }: Props) => {
  const [pending, startTransition] = useTransition();

  const onRefillHearts = () => {
    if (pending || hearts === 6000 || points < 10) return;

    startTransition(() => {
      refillHearts().catch((error) => {
        toast.error("Something went wrong", error);
      });
    });
  };

  return (
    <div className="flex flex-col gap-4 items-start w-full">
      <h1 className="text-2xl font-bold mt-6">Hearts</h1>

      <div className="flex p-4 gap-x-4 w-full border-t-2">
        <Image src="/heart_refill.svg" alt="heart" width={80} height={80} />
        <div className="flex-1">
          <h2 className="text-base lg:text-xl font-bold py-1">Refill hearts</h2>
          <p className="text-sm lg:text-base text-[#777777] hidden lg:block">
            Get full hearts so you can worry less about making mistakes in a
            lesson
          </p>
        </div>
        <Button
          size={"lg"}
          variant={"defaultOutline"}
          className={cn(
            "lg:min-w-[167.95px]",
            pending && "pointer-events-none",
          )}
          onClick={onRefillHearts}
          disabled={hearts === 5 || points < POINTS_TO_REFILL}
        >
          {hearts === 5 ? (
            "Full"
          ) : pending ? (
            <Image
              src={"/dots_loader.svg"}
              alt={"refilling hearts"}
              height={35}
              width={35}
              priority
            />
          ) : (
            <>
              Refill :
              <Image src="/points.svg" alt="heart" width={12} height={12} />
              <span className="text-yellow-400">10</span>
            </>
          )}
        </Button>
      </div>

      <div className="flex p-4 gap-x-4 w-full border-t-2">
        <Image src="/heart_unlimited.svg" alt="heart" width={80} height={80} />
        <div className="flex-1">
          <h2 className="text-base lg:text-xl font-bold py-1">
            Unlimited Hearts
          </h2>
          <p className="text-sm lg:text-base text-[#777777]">
            Never run out of hearts with Super!
          </p>
        </div>
        <Button
          size={"lg"}
          variant={"defaultOutline"}
          className={cn(
            "lg:min-w-[167.95px]",
            pending && "pointer-events-none",
          )}
          onClick={onRefillHearts}
          disabled={hearts === 5 || points < POINTS_TO_REFILL}
        >
          {hearts === 5 ? (
            "Upgrade"
          ) : pending ? (
            <Image
              src={"/dots_loader.svg"}
              alt={"refilling hearts"}
              height={35}
              width={35}
              priority
            />
          ) : (
            <>
              Refill :
              <Image src="/points.svg" alt="heart" width={12} height={12} />
              <span className="text-yellow-400">10</span>
            </>
          )}
        </Button>
      </div>

      <h1 className="text-2xl font-bold mt-6">Power-Ups</h1>

      <div className="flex p-4 gap-x-4 w-full border-t-2">
        <Image src="/streak.svg" alt="heart" width={80} height={80} />
        <div className="flex-1">
          <h2 className="text-base lg:text-xl font-bold py-1">Streak Freeze</h2>
          <p className="text-sm lg:text-base text-[#777777]">
            Streak Freeze allows your streak to remain in place for one full day
            of inactivity.
          </p>
        </div>
        <Button
          size={"lg"}
          variant={"defaultOutline"}
          className={"lg:min-w-[167.95px]"}
          onClick={onRefillHearts}
          disabled={true}
        >
          Frozen
          <Image
            src="/streak.svg"
            alt="heart"
            width={25}
            height={25}
            className="grayscale"
          />
        </Button>
      </div>
    </div>
  );
};
