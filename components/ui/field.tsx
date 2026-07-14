"use client";

import { useState } from "react";
import type { FieldPath, UseFormRegister } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export type FieldInputProps<T extends Record<string, unknown>> = {
  id: string;
  label: string;
  name: FieldPath<T>;
  type?: "text" | "email" | "password";
  autoComplete?: string;
  placeholder?: string;
  register: UseFormRegister<T>;
  error?: string;
  showPasswordToggle?: boolean;
};

export function FieldInput<T extends Record<string, unknown>>({
  id,
  label,
  name,
  type = "text",
  autoComplete,
  placeholder,
  register,
  error,
  showPasswordToggle,
}: FieldInputProps<T>) {
  const [show, setShow] = useState(false);
  const isPassword = type === "password";
  const inputType = isPassword && show ? "text" : type;

  return (
    <div className="space-y-2">
      <Label htmlFor={id}>{label}</Label>
      <div className="relative">
        <Input
          id={id}
          type={inputType}
          autoComplete={autoComplete}
          placeholder={placeholder}
          aria-invalid={!!error}
          aria-describedby={error ? `${id}-error` : undefined}
          {...register(name)}
        />
        {isPassword && showPasswordToggle ? (
          <button
            type="button"
            onClick={() => setShow((v) => !v)}
            tabIndex={-1}
            aria-label={show ? "Hide password" : "Show password"}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground cursor-pointer"
          >
            {show ? (
              <svg width="18" height="18" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24" />
                <line x1="1" y1="1" x2="23" y2="23" />
              </svg>
            ) : (
              <svg width="18" height="18" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
                <circle cx="12" cy="12" r="3" />
              </svg>
            )}
          </button>
        ) : null}
      </div>
      {error ? (
        <p
          id={`${id}-error`}
          role="alert"
          className="text-sm font-normal text-destructive"
        >
          {error}
        </p>
      ) : null}
    </div>
  );
}
