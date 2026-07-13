"use client";

import * as DropdownMenu from "@radix-ui/react-dropdown-menu";
import Link from "next/link";
import { Avatar } from "@/components/ui/avatar";

const menuItems = [
  {
    label: "Settings",
    href: "/settings",
    icon: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1-1-1.74v-.5a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z" />
        <circle cx="12" cy="12" r="3" />
      </svg>
    ),
  },
  {
    label: "Help & Support",
    href: "/support",
    icon: (
      <svg width="16" height="16" fill="none" viewBox="0 0 20 20">
        <path
          stroke="currentColor"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="1.5"
          d="M10 19a9 9 0 100-18 9 9 0 000 18zM7.38 7.3a2.7 2.7 0 015.248.9c0 1.8-2.7 2.7-2.7 2.7M10 14.5h.009"
        />
      </svg>
    ),
  },
  {
    label: "Log Out",
    href: "/api/auth/logout",
    icon: (
      <svg width="16" height="16" fill="none" viewBox="0 0 19 19">
        <path
          stroke="currentColor"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="1.5"
          d="M6.667 18H2.889A1.889 1.889 0 011 16.111V2.89A1.889 1.889 0 012.889 1h3.778M13.277 14.222L18 9.5l-4.723-4.722M18 9.5H6.667"
        />
      </svg>
    ),
  },
];

export function ProfileDropdown() {
  return (
    <DropdownMenu.Root>
      <DropdownMenu.Trigger asChild>
        <button type="button" className="flex shrink-0 cursor-pointer items-center gap-2">
          <Avatar name="Dylan Field" email="dylan@example.com" size={28} />
          <div className="hidden cursor-pointer items-center gap-1 lg:flex">
            <span className="text-base font-normal text-title">Dylan Field</span>
            <svg width="10" height="6" fill="none" viewBox="0 0 10 6">
              <path
                fill="#112032"
                className="dark:fill-white"
                d="M5 5l.354.354L5 5.707l-.354-.353L5 5zm4.354-3.646l-4 4-.708-.708 4-4 .708.708zm-4.708 4l-4-4 .708-.708 4 4-.708.708z"
              />
            </svg>
          </div>
        </button>
      </DropdownMenu.Trigger>

      <DropdownMenu.Portal>
        <DropdownMenu.Content
          align="end"
          sideOffset={8}
          className="z-[9999] w-[312px] rounded-lg bg-card p-4 shadow-lg ring-1 ring-border-soft"
        >
          <div className="mb-4 flex items-center gap-3">
          <Avatar name="Dylan Field" email="dylan@example.com" size={40} />
            <div>
              <p className="text-sm font-medium text-title">Dylan Field</p>
              <Link href="/profile" className="text-xs font-medium text-primary transition-colors hover:text-primary-hover">
                View Profile
              </Link>
            </div>
          </div>

          <hr className="border-t border-divider" />

          <div className="mt-3 space-y-1">
            {menuItems.map((item) => (
              <DropdownMenu.Item key={item.label} asChild>
                <Link
                  href={item.href}
                  className="group flex items-center justify-between rounded-md px-3 py-2 text-sm text-muted-foreground outline-none transition-colors hover:bg-surface-muted hover:text-foreground"
                >
                  <span className="flex items-center gap-3">
                    <span className="flex size-[34px] shrink-0 items-center justify-center rounded-full bg-background transition-colors group-hover:bg-accent-tint">
                      <span className="flex items-center justify-center">{item.icon}</span>
                    </span>
                    {item.label}
                  </span>
                  <svg width="6" height="10" fill="none" viewBox="0 0 6 10" className="opacity-50">
                    <path
                      fill="#112032"
                      className="dark:fill-white"
                      d="M5 5l.354.354L5.707 5l-.353-.354L5 5zM1.354 9.354l4-4-.708-.708-4 4 .708.708zm4-4.708l-4-4-.708.708 4 4 .708-.708z"
                    />
                  </svg>
                </Link>
              </DropdownMenu.Item>
            ))}
          </div>
        </DropdownMenu.Content>
      </DropdownMenu.Portal>
    </DropdownMenu.Root>
  );
}
