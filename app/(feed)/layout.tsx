import dynamic from "next/dynamic";
import { ThemeToggle } from "@/components/ui/theme-toggle";
import { FeedShell } from "@/features/feed/components/feed-shell";

const DynamicHeader = dynamic(
  () => import("@/features/feed/components/feed-header").then((m) => ({ default: m.FeedHeader })),
  { loading: () => <div className="h-[72px] w-full bg-card" /> },
);

const DynamicSidebar = dynamic(
  () => import("@/features/feed/components/feed-sidebar/feed-sidebar").then((m) => ({ default: m.FeedSidebar })),
  {
    loading: () => (
      <div className="space-y-4">
        <div className="h-80 animate-pulse rounded-lg bg-card" />
        <div className="h-48 animate-pulse rounded-lg bg-card" />
        <div className="h-64 animate-pulse rounded-lg bg-card" />
      </div>
    ),
  },
);

const DynamicAside = dynamic(
  () => import("@/features/feed/components/feed-aside/feed-aside").then((m) => ({ default: m.FeedAside })),
  {
    loading: () => (
      <div className="space-y-4">
        <div className="h-52 animate-pulse rounded-lg bg-card" />
        <div className="h-96 animate-pulse rounded-lg bg-card" />
      </div>
    ),
  },
);

const DynamicMobileNav = dynamic(
  () => import("@/features/feed/components/mobile-nav").then((m) => ({ default: m.MobileNav })),
);

export default function FeedLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <ThemeToggle />
      <FeedShell
      header={<DynamicHeader />}
      sidebar={<DynamicSidebar />}
      stream={children}
      aside={<DynamicAside />}
      mobileNav={<DynamicMobileNav />}
    />
    </>
  );
}
