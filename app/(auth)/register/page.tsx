import type { Metadata } from "next";
import Link from "next/link";
import { AuthPageShell } from "@/features/auth/components/auth-page-shell";
import { RegisterForm } from "@/features/auth/components/register-form";

export const metadata: Metadata = {
  title: "Register",
  description: "Create a new Buddy Script account.",
};

export default function RegisterPage() {
  return (
    <AuthPageShell
      subtitle="Get Started Now"
      title="Registration"
      googleButtonLabel="Register with google"
      illustration={
        <>
          <AuthPageShell.Illustration
            src="/images/auth/registration.png"
            alt="Registration illustration"
            width={856}
            height={631}
            className="dark:hidden"
          />
          <AuthPageShell.Illustration
            src="/images/auth/registration1.png"
            alt="Registration illustration"
            width={856}
            height={631}
            className="hidden dark:block"
          />
        </>
      }
      footer={
        <p className="text-sm font-normal text-card-foreground">
          Already have an account?{" "}
          <Link
            href="/login"
            className="font-medium text-primary hover:text-primary-hover hover:underline"
          >
            Login Now
          </Link>
        </p>
      }
    >
      <RegisterForm />
    </AuthPageShell>
  );
}