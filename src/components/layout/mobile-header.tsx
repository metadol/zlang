import { ThemeToggle } from "../widgets/theme-toggle";

export const MobileHeader = () => {
  return (
    <nav className="h-[50px] bg-green-500 lg:hidden fixed top-0 w-full z-10 flex items-center justify-end px-4">
      <ThemeToggle className="text-white hover:bg-white/10" />
    </nav>
  );
};

//later use this as the mobile footer with app like feature such as home, search, profile, etc.
