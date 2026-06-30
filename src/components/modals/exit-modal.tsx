"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

import { Button } from "../ui/button";
import { ResponsiveModal } from "../widgets/responsive-modal";
import { useExitModal } from "@/store/use-exit-modal";

export const ExitModal = () => {
  const router = useRouter();
  const { isOpen, close } = useExitModal();

  const [isClient, setIsClient] = useState(false);

  /* To avoid hydration error */
  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient) {
    return null;
  }

  return (
    <ResponsiveModal
      open={isOpen}
      onOpenChange={close}
      title="Wait, don’t go! You’ll lose your progress if you quit now"
      iconPath="/duo_sad.svg"
    >
      <Button size="lg" variant="primary" onClick={close}>
        Keep Learning
      </Button>

      <Button
        size="lg"
        variant="dangerOutline"
        onClick={() => {
          close();
          router.push("/learn");
        }}
      >
        End Session
      </Button>
    </ResponsiveModal>
  );
};
