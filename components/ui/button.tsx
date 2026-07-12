import * as React from "react";
import { cn } from "@/libs/utils";

type ButtonVariant = "primary" | "outline" | "ghost" | "destructive";
type ButtonSize = "md" | "icon";

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  loading?: boolean;
}

const variantClasses: Record<ButtonVariant, string> = {
  primary:
    "bg-primary text-primary-foreground border border-transparent hover:bg-primary-hover hover:shadow-[0_8px_24px_rgba(149,157,165,0.2)]",
  outline:
    "bg-card text-title border border-border-soft hover:bg-surface-muted hover:border-border",
  ghost: "bg-transparent text-foreground hover:bg-surface-muted",
  destructive:
    "bg-destructive text-destructive-foreground border border-transparent hover:bg-destructive/90",
};

const sizeClasses: Record<ButtonSize, string> = {
  md: "h-12 px-4 text-base",
  icon: "h-10 w-10 p-0",
};

const baseClasses =
  "inline-flex items-center justify-center gap-2 rounded-md font-medium leading-none transition-all duration-200 outline-offset-2 focus-visible:outline focus-visible:outline-2 focus-visible:outline-ring/70 disabled:pointer-events-none disabled:opacity-60 disabled:cursor-not-allowed";

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className,
      variant = "primary",
      size = "md",
      loading = false,
      type = "button",
      disabled,
      children,
      ...props
    },
    ref,
  ) => {
    return (
      <button
        ref={ref}
        type={type}
        disabled={disabled || loading}
        aria-busy={loading || undefined}
        className={cn(baseClasses, variantClasses[variant], sizeClasses[size], className)}
        {...props}
      >
        {loading ? (
          <span
            aria-hidden="true"
            className="size-4 shrink-0 animate-spin rounded-full border-2 border-current border-t-transparent"
          />
        ) : null}
        {children}
      </button>
    );
  },
);
Button.displayName = "Button";