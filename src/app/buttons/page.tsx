import { Button } from "@/components/ui/button";

const ButtonPage = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen gap-4">
      <Button>Default Button</Button>

      <Button variant={"primary"}>Primary Button</Button>
      <Button variant={"primaryOutline"}>Primary Outline Button</Button>

      <Button variant={"secondary"}>Secondary Button</Button>
      <Button variant={"secondaryOutline"}>Secondary Button</Button>

      <Button variant={"danger"}>Danger Button</Button>
      <Button variant={"dangerOutline"}>Danger Button</Button>

      <Button variant={"super"}>Super Button</Button>
      <Button variant={"superOutline"}>Super Button</Button>

      <Button variant={"sidebar"}>Sidebar Button</Button>
      <Button variant={"sidebarOutline"}>Sidebar Button</Button>


      <Button variant={"ghost"}>Ghost Button</Button>
    </div>
  );
};

export default ButtonPage;
