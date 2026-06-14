import { FeedWrapper } from "@/components/layout/feed-wrapper";
import { StickyWrapper } from "@/components/layout/sticky-wrapper";
import { Button } from "@/components/ui/button";
import { SignOutButton } from "@clerk/nextjs";
import { Header } from "./_components/header";

const LearnPage = () => {
  return (
    <div className="flex gap-4 p-4 bg-yellow-300">
      <FeedWrapper>
        <Header title="Hindi" />
         Learn Page
         <div className="h-[1000px]"/>
      </FeedWrapper>
      <StickyWrapper>My sticky sidebar</StickyWrapper>
    </div>
  );
};

export default LearnPage;
