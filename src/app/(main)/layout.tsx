import { MobileHeader } from "@/components/layout/mobile-header";
import { Sidebar } from "@/components/layout/sidebar";

type Props = {
  children: React.ReactNode;
};

const MainLayout = ({ children }: Props) => {
  return (
    <>
      <MobileHeader />
      <Sidebar className="hidden lg:flex" />

      <main className="lg:pl-[256px] bg-red-500 h-full pt-[50px] lg:pt-0">
        <div className="bg-blue-500 pt-6 h-full max-w-[1056px] mx-auto">{children}</div>
      </main>
    </>
  );
};

export default MainLayout;
