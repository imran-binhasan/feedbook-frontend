import { cn } from "@/libs/utils";

export function OrDivider({ className }: { className?: string }) {
  return (
    <div
      role="separator"
      aria-orientation="horizontal"
      className={cn(
        "relative flex items-center justify-center py-2.75",
        className,
      )}
    >
      <span className="absolute left-0 h-0.5 w-27 bg-divider max-xl:w-21.25" />
      <span className="text-sm font-normal text-placeholder">Or</span>
      <span className="absolute right-0 h-0.5 w-27 bg-divider max-xl:w-21.25" />
    </div>
  );
}