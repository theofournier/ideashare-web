"use client";

import { Dialog, DialogContent } from "@/components/ui/dialog";
import { useRouter } from "next/navigation";
import { PropsWithChildren } from "react";

export const RegisterModal = ({ children }: PropsWithChildren) => {
  const router = useRouter();

  return (
    <Dialog
      defaultOpen
      open={true}
      onOpenChange={(open) => {
        router.back();
      }}
    >
      <DialogContent className="sm:max-w-[500px]">{children}</DialogContent>
    </Dialog>
  );
};
