import Image from "next/image";
import { cn } from "@/libs/utils";

type GoogleAuthButtonProps = {
  label: string;
  className?: string;
  onClick?: () => void;
};

export function GoogleAuthButton({
  label,
  className,
  onClick,
}: GoogleAuthButtonProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        "flex h-auto w-full items-center justify-center gap-2 rounded-md border border-border-soft bg-card px-4 py-3 text-base font-medium text-title transition-colors duration-200 outline-offset-2 hover:bg-surface-muted focus-visible:outline focus-visible:outline-2 focus-visible:outline-ring/70 sm:px-15",
        className,
      )}
    >
      <Image
        src="/images/others/google.svg"
        alt=""
        width={20}
        height={20}
        unoptimized
        aria-hidden="true"
        className="shrink-0"
      />
      <span className="whitespace-nowrap">{label}</span>
    </button>
  );
}