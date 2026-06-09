import { Button } from "@/components/ui/button";

export default function Home() {
  return (
    <main className="flex  flex-col items-center justify-between p-24 gap-4">
      <h1 className="text-4xl font-bold bg-green-200">Hello, World!</h1>
      <Button  size="lg">
        Click Me
      </Button>
    </main>
  );
}