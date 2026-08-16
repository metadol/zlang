import { cn } from "@/lib/utils";
import { SidebarItem } from "./sidebar-item";
import { ThemeToggle } from "../widgets/theme-toggle";
import { Button } from "@/components/ui/button";
import { ClerkLoaded, UserButton } from "@clerk/nextjs";
import Link from "next/link";

type Props = {
  className?: string;
};

const sidebarItems = [
  {
    label: "learn",
    href: "/learn",
    iconSrc: "/learn.svg",
  },
  {
    label: "leaderboard",
    href: "/leaderboard",
    iconSrc: "/leaderboard.svg",
  },
  {
    label: "quests",
    href: "/quests",
    iconSrc: "/quests.svg",
  },
  {
    label: "shop",
    href: "/shop",
    iconSrc: "/shop.svg",
  },
];

export const Sidebar = ({ className }: Props) => {
  return (
    <aside
      className={cn(
        "fixed left-0 top-0 h-full w-[256px] border-r-2 border-border bg-background px-4 pt-0 pb-2 flex flex-col justify-between z-50",
        className,
      )}
    >
      <Link href="/learn">
        <div className="flex items-center pt-8 pl-4 pb-7 gap-x-3">
          <h1 className="text-3xl font-extrabold tracking-wide text-green-500 font-feather">
            duolingo
          </h1>
        </div>
      </Link>

      <div className="flex flex-col flex-1 gap-y-2">
        {sidebarItems.map((item) => (
          <SidebarItem key={item.href} {...item} />
        ))}
      </div>

      <div className="flex flex-col gap-y-2">
        <ClerkLoaded>
          <Button
            variant="sidebar"
            className="justify-start items-center h-[52px] gap-7 hover:bg-transparent dark:hover:bg-transparent"
          >
            <UserButton />
            Profile
            <ThemeToggle className="self-end h-8" />
          </Button>
        </ClerkLoaded>
      </div>
    </aside>
  );
};
