import { Button } from "@/components/ui/button";
import { SignOutButton } from "@clerk/nextjs";

const LearnPage = () => {
  return (
    <div className="flex flex-col items-center gap-6">
      <h1>Learn Page</h1>

      <SignOutButton redirectUrl="/">
        <Button variant="dangerOutline">Sign out</Button>
      </SignOutButton>
    </div>
  );
};

export default LearnPage;