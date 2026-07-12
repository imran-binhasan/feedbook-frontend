import * as React from "react";
import { cn } from "@/libs/utils";

type CardProps = React.HTMLAttributes<HTMLElement> & {
  as?: keyof React.JSX.IntrinsicElements;
};

export function Card({ as = "section", className, ...props }: CardProps) {
  const Comp = as as React.ElementType;
  return (
    <Comp
      className={cn(
        "rounded-lg bg-card px-6 pt-6 pb-1.5 transition-colors duration-200",
        className,
      )}
      {...props}
    />
  );
}

type CardHeaderProps = React.HTMLAttributes<HTMLDivElement> & {
  action?: React.ReactNode;
};

export function CardHeader({
  className,
  action,
  children,
  ...props
}: CardHeaderProps) {
  return (
    <div
      className={cn(
        "mb-6 flex items-center justify-between gap-3",
        className,
      )}
      {...props}
    >
      <h2 className="text-xl font-medium leading-tight text-title">{children}</h2>
      {action}
    </div>
  );
}

type CardDividerProps = React.HTMLAttributes<HTMLHRElement>;

export function CardDivider({ className, ...props }: CardDividerProps) {
  return (
    <div
      className={cn("h-px bg-divider leading-none text-[0]", className)}
      {...props}
    />
  );
}

type SeeAllLinkProps = React.AnchorHTMLAttributes<HTMLAnchorElement>;

export function SeeAllLink({ className, children, ...props }: SeeAllLinkProps) {
  return (
    <a
      className={cn(
        "text-xs font-medium text-primary transition-colors hover:text-primary-hover",
        className,
      )}
      {...props}
    >
      {children ?? "See All"}
    </a>
  );
}