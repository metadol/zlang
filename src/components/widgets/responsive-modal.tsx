"use client";

import Image from "next/image";
import { useMedia } from "react-use";

import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

import {
  Drawer,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
} from "@/components/ui/drawer";

type ResponsiveModalProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  title: React.ReactNode;
  iconPath: string;
  children: React.ReactNode;
};

export const ResponsiveModal = ({
  open,
  onOpenChange,
  title,
  iconPath,
  children,
}: ResponsiveModalProps) => {
  const isMobile = useMedia("(max-width: 640px)", false);

  if (isMobile) {
    return (
      <Drawer open={open} onOpenChange={onOpenChange}>
        <DrawerContent className="max-w-sm">
          <DrawerHeader>
            <div className="mb-5 flex w-full items-center justify-center">
              <Image src={iconPath} alt="" width={120} height={120} />
            </div>
            <DrawerTitle className="text-center text-2xl font-bold">
              {title}
            </DrawerTitle>
          </DrawerHeader>

          <DrawerFooter>
            <div className="flex flex-col w-full gap-y-3">{children}</div>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    );
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-sm">
        <DialogHeader>
          <div className="mb-5 flex w-full items-center justify-center">
            <Image src={iconPath} alt="" width={120} height={120} />
          </div>
          <DialogTitle className="text-center text-2xl font-bold">
            {title}
          </DialogTitle>
        </DialogHeader>

        <DialogFooter>
          <div className="flex flex-col w-full gap-y-3">{children}</div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
