"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

import { Button } from "../ui/button";
import { ResponsiveModal } from "../widgets/responsive-modal";
import { useHeartsModal } from "@/store/use-hearts-modal";

export const HeartsModal = () => {
  const router = useRouter();
  const { isOpen, close } = useHeartsModal();

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
      title="You ran out of hearts!"
      iconPath="/duo_heart.svg"
    >
      <Button size="lg" variant="primary" onClick={close}>
        Get unlimited hearts
      </Button>

      <Button
        size="lg"
        variant="primaryOutline"
        onClick={() => {
          close();
          router.push("/learn");
        }}
      >
        No thanks
      </Button>
    </ResponsiveModal>
  );
};
