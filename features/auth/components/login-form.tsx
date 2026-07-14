"use client";

import Link from "next/link";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { loginSchema, type LoginValues } from "@/features/auth/schemas/auth";
import { useLogin } from "@/features/auth/hooks/use-auth";
import { Button } from "@/components/ui/button";
import { FieldInput } from "@/components/ui/field";
import { Checkbox } from "@/components/ui/checkbox";

export function LoginForm() {
  const login = useLogin();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: { email: "", password: "", remember: true },
    mode: "onTouched",
  });

  function onSubmit(values: LoginValues) {
    login.mutate({
      email: values.email,
      password: values.password,
      remember: values.remember,
    });
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      noValidate
      className="space-y-3.5"
    >
      <FieldInput
        id="login-email"
        label="Email"
        name="email"
        type="email"
        autoComplete="email"
        placeholder="you@example.com"
        register={register}
        error={errors.email?.message}
      />

      <FieldInput
        id="login-password"
        label="Password"
        name="password"
        type="password"
        autoComplete="current-password"
        placeholder="••••••••"
        register={register}
        error={errors.password?.message}
        showPasswordToggle
      />

      {/* Remember + Forgot */}
      <div className="flex items-center justify-between pt-1">
        <Checkbox
          id="login-remember"
          label="Remember me"
          defaultChecked
          {...register("remember")}
        />
        <Link
          href="/forgot-password"
          className="text-sm font-normal text-primary transition-colors hover:text-primary-hover hover:underline"
        >
          Forgot password?
        </Link>
      </div>

      {/* Submit */}
      <div className="pb-15 pt-6.5">
        <Button
          type="submit"
          size="md"
          loading={login.isPending}
          className="h-auto w-full py-3"
        >
          Login now
        </Button>
      </div>
    </form>
  );
}
