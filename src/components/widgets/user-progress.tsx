import Link from "next/link";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { InfinityIcon } from "lucide-react";

type Props = {
  activeCourse: any;
  hearts: number;
  points: number;
  hasActiveSubscription: boolean;
};

export const UserProgress = ({
  activeCourse,
  hearts,
  points,
  hasActiveSubscription,
}: Props) => {
  return (
    <div className="bg-white flex items-center justify-between gap-x-2 w-full">
      <Link href="/courses">
        <Button variant={"ghost"}>
          <Image
            src={activeCourse.imgSrc}
            alt={activeCourse.title}
            width={32}
            height={32}
            className="rounded-md border"
          />
        </Button>
      </Link>

      <Link href="/shop">
        <Button variant={"ghost"} className="text-yellow-400">
          <Image src="./points.svg" alt="points" width={20} height={20} />
          {points}
        </Button>
      </Link>

      <Link href="/shop">
        <Button variant={"ghost"} className="text-rose-500">
          <Image src="./heart.svg" alt="heart" width={30} height={30} />
          {hasActiveSubscription ? (
            <InfinityIcon className="h-4 w-4" />
          ) : (
            hearts
          )}
        </Button>
      </Link>
    </div>
  );
};
