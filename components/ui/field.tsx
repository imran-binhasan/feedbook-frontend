import { type FieldPath, type UseFormRegister } from "react-hook-form";
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
}: FieldInputProps<T>) {
  return (
    <div className="space-y-2">
      <Label htmlFor={id}>{label}</Label>
      <Input
        id={id}
        type={type}
        autoComplete={autoComplete}
        placeholder={placeholder}
        aria-invalid={!!error}
        aria-describedby={error ? `${id}-error` : undefined}
        {...register(name)}
      />
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
