"use client";

import { useEffect, useState } from "react";

import { Button } from "../ui/button";
import { ResponsiveModal } from "../widgets/responsive-modal";
import { usePracticeModal } from "@/store/use-practice-modal";

export const PracticeModal = () => {
  const { isOpen, close } = usePracticeModal();

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
      title="Use practice lessons to regain hearts and points."
      iconPath="/duo_jump.svg"
    >
      <Button size="lg" variant="primary" onClick={close}>
        Got it
      </Button>
    </ResponsiveModal>
  );
};
