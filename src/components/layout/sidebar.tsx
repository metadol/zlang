import { cn } from "@/lib/utils";
import { SidebarItem } from "./sidebar-item";

type Props = {
  className?: string;
};

export const Sidebar = ({ className }: Props) => {
  return (
    <div
      className={cn(
        "bg-violet-500 p-2 lg:w-[256px] h-full lg:fixed left-0 top-0 px-4 border-r-2 flex flex-col gap-2",
        className,
      )}
    >
      sidebar
      <SidebarItem label="learn" />
      <SidebarItem label="Test" />
      <SidebarItem label="User" />
    </div>
  );
};
