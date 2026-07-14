"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import type { RegisterValues } from "@/features/auth/schemas/auth";
import { registerSchema } from "@/features/auth/schemas/auth";
import { useRegister } from "@/features/auth/hooks/use-auth";
import { Button } from "@/components/ui/button";
import { FieldInput } from "@/components/ui/field";
import { Checkbox } from "@/components/ui/checkbox";

export function RegisterForm() {
  const registerMutation = useRegister();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterValues>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      confirmPassword: "",
      terms: false,
    },
    mode: "onTouched",
  });

  function onSubmit(values: RegisterValues) {
    registerMutation.mutate({
      firstName: values.firstName,
      lastName: values.lastName,
      email: values.email,
      password: values.password,
    });
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      noValidate
      className="space-y-3.5"
    >
      <div className="grid grid-cols-1 gap-3.5 sm:grid-cols-2">
        <FieldInput
          id="register-first-name"
          label="First name"
          name="firstName"
          autoComplete="given-name"
          placeholder="Dylan"
          register={register}
          error={errors.firstName?.message}
        />
        <FieldInput
          id="register-last-name"
          label="Last name"
          name="lastName"
          autoComplete="family-name"
          placeholder="Field"
          register={register}
          error={errors.lastName?.message}
        />
      </div>

      <FieldInput
        id="register-email"
        label="Email"
        name="email"
        type="email"
        autoComplete="email"
        placeholder="you@example.com"
        register={register}
        error={errors.email?.message}
      />

      <FieldInput
        id="register-password"
        label="Password"
        name="password"
        type="password"
        autoComplete="new-password"
        placeholder="••••••••"
        register={register}
        error={errors.password?.message}
        showPasswordToggle
      />

      <FieldInput
        id="register-confirm-password"
        label="Repeat password"
        name="confirmPassword"
        type="password"
        autoComplete="new-password"
        placeholder="••••••••"
        register={register}
        error={errors.confirmPassword?.message}
        showPasswordToggle
      />

      <div className="pt-1">
        <Checkbox
          id="register-terms"
          label={<span>I agree to terms &amp; conditions</span>}
          aria-invalid={!!errors.terms}
          aria-describedby={errors.terms ? "register-terms-error" : undefined}
          {...register("terms")}
        />
        {errors.terms ? (
          <p
            id="register-terms-error"
            role="alert"
            className="mt-2 text-sm font-normal text-destructive"
          >
            {errors.terms.message}
          </p>
        ) : null}
      </div>

      <div className="pb-15 pt-6.5">
        <Button
          type="submit"
          size="md"
          loading={registerMutation.isPending}
          className="h-auto w-full py-3"
        >
          Register now
        </Button>
      </div>
    </form>
  );
}
