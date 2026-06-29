"use client";

import { useRouter } from "next/navigation";
import { Button } from "../ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogFooter,
  DialogTitle,
  DialogDescription,
} from "../ui/dialog";
import { useEffect, useState } from "react";
import { useExitModal } from "@/store/use-exit-modal";
import Image from "next/image";

export const ExitModal = () => {
  const router = useRouter();
  const [isClient, setIsClient] = useState(false);
  const { isOpen, open, close } = useExitModal();

  /*This is to prevent hydration errors*/
  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient) {
    return null;
  }

  return (
    <Dialog open={isOpen} onOpenChange={close}>
      <DialogContent className="max-w-sm">
        <DialogHeader>
          <div className="flex items-center justify-center w-full mb-5">
            <Image src="/duo_sad.svg" alt="exit" width={120} height={120} />
          </div>
          <DialogTitle className="text-center text-2xl font-bold">
            Wait, don’t go! You’ll lose your progress if you quit now
          </DialogTitle>
        </DialogHeader>

        <DialogFooter>
          <div className="flex flex-col w-full gap-y-3">
            <Button
              size={"lg"}
              variant={"primary"}
              className="w-full"
              onClick={close}
            >
              Keep Learning
            </Button>
            <Button
              size={"lg"}
              variant={"dangerOutline"}
              className="w-full"
              onClick={() => {
                close();
                router.push("/learn");
              }}
            >
              End Session
            </Button>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
