"use client";

import Image from "next/image";
import * as Dialog from "@radix-ui/react-dialog";
import { X } from "lucide-react";

interface ProjectImageLightboxProps {
  src: string;
  alt: string;
  className?: string;
  imageClassName?: string;
  sizes?: string;
  priority?: boolean;
  children?: React.ReactNode;
}

export function ProjectImageLightbox({
  src,
  alt,
  className,
  imageClassName,
  sizes = "(max-width: 768px) 100vw, 70vw",
  priority,
  children,
}: ProjectImageLightboxProps) {
  return (
    <Dialog.Root>
      <Dialog.Trigger asChild>
        <button
          type="button"
          aria-label={`View full image: ${alt}`}
          className={`group/image relative block cursor-zoom-in text-left focus-visible:outline focus-visible:outline-2 focus-visible:outline-accent focus-visible:outline-offset-2 ${className ?? ""}`}
        >
          <Image
            src={src}
            alt={alt}
            fill
            sizes={sizes}
            priority={priority}
            className={imageClassName}
          />
          {children}
        </button>
      </Dialog.Trigger>

      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 z-[100] bg-[#17130f]/90 backdrop-blur-sm data-[state=open]:animate-in data-[state=open]:fade-in-0 data-[state=closed]:animate-out data-[state=closed]:fade-out-0 duration-150" />
        <Dialog.Content className="fixed inset-0 z-[101] flex items-center justify-center p-4 sm:p-8 focus:outline-none">
          <Dialog.Title className="sr-only">{alt}</Dialog.Title>
          <Dialog.Description className="sr-only">
            Full size project screenshot. Press Escape to close.
          </Dialog.Description>
          <div className="relative flex h-full w-full max-w-[min(96vw,1600px)] items-center justify-center">
            <Image
              src={src}
              alt={alt}
              fill
              sizes="96vw"
              priority
              className="object-contain"
            />
          </div>
          <Dialog.Close
            aria-label="Close image preview"
            className="absolute right-4 top-4 inline-flex h-11 w-11 items-center justify-center border border-white/25 bg-black/40 text-white transition-colors hover:bg-black/70 focus-visible:outline focus-visible:outline-2 focus-visible:outline-white sm:right-7 sm:top-7"
          >
            <X className="h-5 w-5" />
          </Dialog.Close>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
