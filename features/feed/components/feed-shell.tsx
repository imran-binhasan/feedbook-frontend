import { cn } from "@/libs/utils";

type FeedShellProps = {
  header: React.ReactNode;
  sidebar: React.ReactNode;
  stream: React.ReactNode;
  aside: React.ReactNode;
  mobileNav: React.ReactNode;
  className?: string;
};

export function FeedShell({
  header,
  sidebar,
  stream,
  aside,
  mobileNav,
  className,
}: FeedShellProps) {
  return (
    <div className={cn("min-h-dvh bg-background", className)}>
      {header}

      <div className="mx-auto w-full max-w-[1296px] px-4 pt-[90px] xl:px-0">
        <div className="grid grid-cols-1 gap-4 lg:grid-cols-12 lg:gap-6">
          <aside className="hidden lg:col-span-3 lg:block">
            <div className="sticky top-[90px] max-h-[calc(100vh-100px)] overflow-y-auto scrollbar-none">
              {sidebar}
            </div>
          </aside>

          <main className="lg:col-span-6">{stream}</main>

          <aside className="hidden lg:col-span-3 lg:block">
            <div className="sticky top-[90px] max-h-[calc(100vh-100px)] overflow-y-auto scrollbar-none">
              {aside}
            </div>
          </aside>
        </div>
      </div>

      <div className="lg:hidden">{mobileNav}</div>
    </div>
  );
}
