"use client";

import Link from "next/link";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { loginSchema, type LoginValues } from "@/features/auth/schemas/auth";
import { useLogin } from "@/features/auth/hooks/use-auth";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
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
      {/* Email */}
      <div className="space-y-2">
        <Label htmlFor="login-email">Email</Label>
        <Input
          id="login-email"
          type="email"
          autoComplete="email"
          placeholder="you@example.com"
          aria-invalid={!!errors.email}
          aria-describedby={errors.email ? "login-email-error" : undefined}
          {...register("email")}
        />
        {errors.email ? (
          <p
            id="login-email-error"
            role="alert"
            className="text-sm font-normal text-destructive"
          >
            {errors.email.message}
          </p>
        ) : null}
      </div>

      {/* Password */}
      <div className="space-y-2">
        <Label htmlFor="login-password">Password</Label>
        <Input
          id="login-password"
          type="password"
          autoComplete="current-password"
          placeholder="••••••••"
          aria-invalid={!!errors.password}
          aria-describedby={errors.password ? "login-password-error" : undefined}
          {...register("password")}
        />
        {errors.password ? (
          <p
            id="login-password-error"
            role="alert"
            className="text-sm font-normal text-destructive"
          >
            {errors.password.message}
          </p>
        ) : null}
      </div>

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
