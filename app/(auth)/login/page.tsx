import type { Metadata } from "next";
import Link from "next/link";
import { AuthPageShell } from "@/features/auth/components/auth-page-shell";
import { LoginForm } from "@/features/auth/components/login-form";

export const metadata: Metadata = {
  title: "Login",
  description: "Login to your Buddy Script account.",
};

export default function LoginPage() {
  return (
    <AuthPageShell
      subtitle="Welcome back"
      title="Login to your account"
      googleButtonLabel="Or sign-in with google"
      illustration={
        <AuthPageShell.Illustration
          src="/images/auth/login.png"
          alt="Login illustration"
          width={633}
          height={480}
        />
      }
      footer={
        <p className="text-sm font-normal text-card-foreground">
          Don&apos;t have an account?{" "}
          <Link
            href="/register"
            className="font-medium text-primary hover:text-primary-hover hover:underline"
          >
            Create New Account
          </Link>
        </p>
      }
    >
      <LoginForm />
    </AuthPageShell>
  );
}