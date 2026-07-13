"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  HomeIcon,
  SearchIcon,
  FriendsIcon,
  BellIcon,
  ChatIcon,
} from "@/features/feed/components/feed-icons";
import { ProfileDropdown } from "@/components/ui/profile-dropdown";
import { cn } from "@/libs/utils";

type NavLink = {
  label: string;
  icon: React.ComponentType<{ className?: string }>;
  href: string;
  badge?: number;
};

export function FeedHeader() {
  const pathname = usePathname();

  const NAV_LINKS: NavLink[] = [
    { label: "Home", icon: HomeIcon, href: "/feed" },
    { label: "Friends", icon: FriendsIcon, href: "/friends" },
    { label: "Notifications", icon: BellIcon, href: "#", badge: 6 },
    { label: "Chat", icon: ChatIcon, href: "/chat", badge: 2 },
  ];
  return (
    <header className="fixed top-0 right-0 left-0 z-50 bg-card shadow-none dark:border-b dark:border-border-soft dark:shadow-none">
      <div className="mx-auto flex h-[72px] max-w-[1296px] items-center px-4 xl:px-0">
        <div className="flex shrink-0 items-center">
          <Link href="/feed" aria-label="Buddy Script home">
            <Image
              src="/images/logo/logo.svg"
              alt="Buddy Script logo"
              width={161}
              height={40}
              priority
              className="h-auto w-auto max-w-[137px]"
            />
          </Link>
        </div>

        <div className="ml-auto hidden lg:block">
          <form className="relative">
            <SearchIcon
              aria-hidden="true"
              className="absolute top-1/2 left-4 -translate-y-1/2 text-muted-foreground"
            />
            <input
              type="search"
              placeholder="Search posts..."
              className={cn(
                "h-10 w-[426px] rounded-[40px] border border-transparent bg-surface-muted pr-4 pl-11",
                "text-sm font-medium text-card-foreground placeholder:text-placeholder",
                "transition-colors duration-150 outline-none",
                "focus:border-primary focus:ring-0",
              )}
            />
          </form>
        </div>

        <ul className="ml-auto hidden items-center space-x-6 lg:flex xl:space-x-11">
          {NAV_LINKS.map((item) => {
            const isActive = pathname === item.href;
            return (
            <li key={item.label} className={cn(item.label === "Notifications" && "relative", item.label === "Chat" && "relative")}>
              {item.label === "Home" ? (
                <Link
                  href={item.href}
                  aria-label={item.label}
                  aria-current={isActive ? "page" : undefined}
                  className={cn(
                    "relative flex h-[70px] items-center justify-center px-4 transition-all",
                    isActive
                      ? "border-b-2 border-brand-underline"
                      : "border-b-2 border-transparent hover:border-b-2 hover:border-brand-underline",
                  )}
                >
                  <item.icon className={cn("size-auto", isActive && "text-primary")} />
                </Link>
              ) : item.label === "Friends" ? (
                <Link
                  href={item.href}
                  aria-label={item.label}
                  aria-current={isActive ? "page" : undefined}
                  className={cn(
                    "flex h-[70px] items-center justify-center px-2 transition-all",
                    isActive && "text-primary",
                  )}
                >
                  <item.icon className="size-auto" />
                </Link>
              ) : (
                <span className="relative cursor-pointer">
                  <item.icon className="size-auto" />
                  <span
                    aria-label={`${item.badge} unread`}
                    className="bg-primary border-card absolute -top-2 -right-2 flex h-[17px] min-w-[17px] items-center justify-center rounded-[9px] border text-[11px] font-normal leading-[1.4] text-primary-foreground"
                  >
                    {item.badge}
                  </span>
                </span>
              )}
            </li>
            );
          })}
        </ul>

        {/* Mobile search icon */}
        <button
          type="button"
          aria-label="Search"
          className="ml-auto flex size-10 items-center justify-center rounded-full text-muted-foreground transition-colors hover:bg-surface-muted lg:hidden"
        >
          <SearchIcon className="size-[18px]" />
        </button>

        <div className="hidden lg:ml-8 lg:block">
          <ProfileDropdown />
        </div>
      </div>
    </header>
  );
}
