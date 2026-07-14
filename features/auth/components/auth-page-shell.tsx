import * as React from "react";
import Image from "next/image";
import { cn } from "@/libs/utils";
import { AuthDecorativeShapes } from "@/features/auth/components/auth-decorative-shapes";
import { GoogleAuthButton } from "@/features/auth/components/google-auth-button";
import { OrDivider } from "@/features/auth/components/or-divider";

type AuthPageShellProps = {
  illustration: React.ReactNode;
  subtitle: string;
  title: string;
  googleButtonLabel: string;
  logoAlt?: string;
  footer?: React.ReactNode;
  children: React.ReactNode;
  className?: string;
};

export function AuthPageShell({
  illustration,
  subtitle,
  title,
  googleButtonLabel,
  logoAlt = "Buddy Script logo",
  footer,
  children,
  className,
}: AuthPageShellProps) {
  return (
    <main
      className={cn(
        "relative min-h-screen max-w-screen overflow-x-hidden bg-background py-12.5 md:py-25",
        className,
      )}
    >
      <AuthDecorativeShapes />

      <div className="relative z-10 mx-auto w-full max-w-330">
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-3 lg:gap-0">
          {/* Left — illustration */}
          <div className="my-auto w-full px-2 lg:col-span-2">
            {illustration}
          </div>

          {/* Right — form card */}
          <div className="w-full px-2">
            <div className="rounded-md bg-card p-12 shadow-sm">
              {/* Logo */}
              <div className="mb-7 flex justify-center">
                <Image
                  src="/images/logo/logo.svg"
                  alt={logoAlt}
                  width={161}
                  height={40}
                  priority
                  className="h-auto w-auto max-w-40.25"
                />
              </div>

              {/* Heading */}
              <p className="mb-2 text-center text-base font-normal leading-snug text-card-foreground">
                {subtitle}
              </p>
              <h1 className="mb-12.5 text-center text-[28px] font-medium leading-tight text-title">
                {title}
              </h1>

              {/* Google */}
              <GoogleAuthButton label={googleButtonLabel} className="mb-10" />

              {/* Or divider */}
              <OrDivider className="mb-10" />

              {/* Form */}
              {children}

              {/* Footer */}
              {footer ? <div className="mt-2 text-center">{footer}</div> : null}
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}

type AuthIllustrationProps = {
  src: string;
  alt: string;
  width: number;
  height: number;
  className?: string;
};

function AuthIllustration({
  src,
  alt,
  width,
  height,
  className,
}: AuthIllustrationProps) {
  return (
    <Image
      src={src}
      alt={alt}
      width={width}
      height={height}
      priority
      sizes={`(max-width: 1024px) 100vw, ${width}px`}
      className={cn("w-full", className)}
      style={{ maxWidth: width, height: "auto" }}
    />
  );
}

AuthPageShell.Illustration = AuthIllustration;