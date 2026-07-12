import Link from "next/link";
import {
  MobileHomeIcon,
  MobileFriendsIcon,
  MobileBellIcon,
  MobileChatIcon,
  MobileMenuIcon,
} from "@/components/ui/icons";
import { cn } from "@/libs/utils";

type MobileNavItem = {
  label: string;
  icon: React.ComponentType<{ className?: string }>;
  href: string;
  badge?: number;
  active?: boolean;
};

const MOBILE_NAV_ITEMS: MobileNavItem[] = [
  { label: "Home", icon: MobileHomeIcon, href: "/feed", active: true },
  { label: "Friends", icon: MobileFriendsIcon, href: "/friends" },
  { label: "Notifications", icon: MobileBellIcon, href: "#", badge: 6 },
  { label: "Chat", icon: MobileChatIcon, href: "/chat", badge: 2 },
];

export function MobileNav() {
  return (
    <nav
      aria-label="Mobile primary"
      className={cn(
        "fixed inset-x-0 bottom-0 z-50 border-t border-border-soft bg-card",
        "pb-[env(safe-area-inset-bottom)]",
      )}
    >
      <ul className="flex items-center justify-around px-5 py-5">
        {MOBILE_NAV_ITEMS.map((item) => (
          <li key={item.label}>
            <Link
              href={item.href}
              aria-label={item.label}
              aria-current={item.active ? "page" : undefined}
              className={cn(
                "relative inline-flex items-center justify-center transition-colors",
                "text-muted-foreground hover:text-foreground",
                item.active && "text-primary",
              )}
            >
              <item.icon className="size-auto" />
              {item.badge !== undefined ? (
                <span
                  aria-label={`${item.badge} unread`}
                  className="absolute -right-1 -top-1 inline-flex min-w-[17px] h-[17px] items-center justify-center rounded-full bg-primary px-1 text-[11px] font-normal leading-[1.4] text-primary-foreground ring-2 ring-card"
                >
                  {item.badge}
                </span>
              ) : null}
            </Link>
          </li>
        ))}
        <li>
          <Link
            href="/menu"
            aria-label="Open menu"
            className={cn(
              "inline-flex items-center justify-center text-muted-foreground transition-colors",
              "hover:text-foreground",
            )}
          >
            <MobileMenuIcon className="size-auto" />
          </Link>
        </li>
      </ul>
    </nav>
  );
}