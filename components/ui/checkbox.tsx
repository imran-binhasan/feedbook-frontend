import * as React from "react";
import { cn } from "@/libs/utils";

export interface CheckboxProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "type"> {
  label?: React.ReactNode;
}

export const Checkbox = React.forwardRef<HTMLInputElement, CheckboxProps>(
  ({ className, label, id, ...props }, ref) => {
    const generatedId = React.useId();
    const checkboxId = id ?? generatedId;
    return (
      <span className="inline-flex items-center gap-2">
        <span className="relative inline-flex size-4.5 items-center justify-center">
          <input
            ref={ref}
            id={checkboxId}
            type="checkbox"
            className={cn(
              "peer size-4.5 appearance-none rounded-full border border-placeholder bg-card",
              "transition-colors duration-150",
              "checked:border-primary checked:bg-primary",
              "focus-visible:outline focus-visible:outline-2 focus-visible:outline-ring/70 focus-visible:outline-offset-2",
              "disabled:cursor-not-allowed disabled:opacity-60",
              className,
            )}
            {...props}
          />
          <svg
            aria-hidden="true"
            viewBox="0 0 12 12"
            className="pointer-events-none absolute inset-0 m-auto size-3 text-primary-foreground opacity-0 peer-checked:opacity-100 peer-checked:text-primary-foreground"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M9.5 3.5L5 8 2.5 5.5" />
          </svg>
        </span>
        {label !== undefined && (
          <label
            htmlFor={checkboxId}
            className="cursor-pointer align-middle text-sm font-normal text-card-foreground select-none peer-disabled:cursor-not-allowed peer-disabled:opacity-60"
          >
            {label}
          </label>
        )}
      </span>
    );
  },
);
Checkbox.displayName = "Checkbox";