import React from "react";
import { cn } from "@/lib/utils";
import { VariantProps, cva } from "class-variance-authority";
import { Loader2 } from "lucide-react";

const spinnerVariants = cva("flex-col items-center justify-center", {
  variants: {
    show: {
      true: "flex",
      false: "hidden",
    },
  },
  defaultVariants: {
    show: true,
  },
});

const loaderVariants = cva("animate-spin text-primary", {
  variants: {
    size: {
      small: "size-6",
      medium: "size-8",
      large: "size-12",
    },
  },
  defaultVariants: {
    size: "medium",
  },
});

interface SpinnerContentProps
  extends VariantProps<typeof spinnerVariants>,
    VariantProps<typeof loaderVariants> {
  className?: string;
  children?: React.ReactNode;
}

export default function Loading({
  size,
  show,
  children,
  className,
}: SpinnerContentProps) {
  return (
    <div>
      <span className={cn(spinnerVariants({ show }),"flex items-center justify-center w-full h-full")}>
        <Loader2
          className={cn(
            loaderVariants({ size: "small" }),
            "text-white h-10 w-10 sm:h-10 sm:w-10 md:h-10 md:w-10 lg:h-10 lg:w-10"
          )}
        />
        {children}
      </span>
    </div>
  );
}
