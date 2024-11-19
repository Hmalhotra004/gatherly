import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { VisuallyHidden } from "@radix-ui/react-visually-hidden";
import Image from "next/image";
import React from "react";

interface ImageModalProps {
  children: React.ReactNode;
  src?: string | null;
}

const ImageModal = ({ children, src }: ImageModalProps) => {
  if (!src) return null;

  return (
    <Dialog>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="bg-transparent border-0 shadow-none">
        <VisuallyHidden>
          <DialogTitle>Image Modal</DialogTitle>
        </VisuallyHidden>
        <div className="w-80 h-80">
          <Image
            src={src}
            alt="image"
            fill
            className="object-contain"
          />
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ImageModal;
