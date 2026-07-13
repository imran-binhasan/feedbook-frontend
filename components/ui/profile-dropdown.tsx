"use client";

import * as DropdownMenu from "@radix-ui/react-dropdown-menu";
import Image from "next/image";
import Link from "next/link";

const menuItems = [
  {
    label: "Settings",
    href: "/settings",
    icon: (
      <svg width="18" height="19" fill="none" viewBox="0 0 18 19">
        <path
          fill="#377DFF"
          d="M9.584 0c.671 0 1.315.267 1.783.74.468.473.721 1.112.7 1.709l.009.14a.985.985 0 00.136.395c.145.242.382.418.659.488.276.071.57.03.849-.13l.155-.078c1.165-.538 2.563-.11 3.21.991l.58.99a.695.695 0 01.04.081l.055.107c.519 1.089.15 2.385-.838 3.043l-.244.15a1.046 1.046 0 00-.313.339 1.042 1.042 0 00-.11.805c.074.272.255.504.53.66l.158.1c.478.328.823.812.973 1.367.17.626.08 1.292-.257 1.86l-.625 1.022-.094.144c-.735 1.038-2.16 1.355-3.248.738l-.129-.066a1.123 1.123 0 00-.412-.095 1.087 1.087 0 00-.766.31c-.204.2-.317.471-.316.786l-.008.163C11.956 18.022 10.88 19 9.584 19h-1.17c-1.373 0-2.486-1.093-2.484-2.398l-.008-.14a.994.994 0 00-.14-.401 1.066 1.066 0 00-.652-.493 1.12 1.12 0 00-.852.127l-.169.083a2.526 2.526 0 01-1.698.122 2.47 2.47 0 01-1.488-1.154l-.604-1.024-.08-.152a2.404 2.404 0 01.975-3.132l.1-.061c.292-.199.467-.527.467-.877 0-.381-.207-.733-.569-.94l-.147-.092a2.419 2.419 0 01-.724-3.236l.615-.993a2.503 2.503 0 013.366-.912l.126.066c.13.058.269.089.403.09a1.08 1.08 0 001.086-1.068l.008-.185c.049-.57.301-1.106.713-1.513A2.5 2.5 0 018.414 0h1.17z"
        />
      </svg>
    ),
  },
  {
    label: "Help & Support",
    href: "/support",
    icon: (
      <svg width="20" height="20" fill="none" viewBox="0 0 20 20">
        <path
          stroke="#377DFF"
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
      <svg width="19" height="19" fill="none" viewBox="0 0 19 19">
        <path
          stroke="#377DFF"
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
          <div className="size-7 overflow-hidden rounded-full">
            <Image
              src="/images/avatars/profile.png"
              alt="Profile"
              width={32}
              height={32}
              className="size-full object-cover"
            />
          </div>
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
            <div className="size-10 overflow-hidden rounded-full">
              <Image
                src="/images/avatars/profile.png"
                alt="Profile"
                width={40}
                height={40}
                className="size-full object-cover"
              />
            </div>
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
                  className="flex items-center justify-between rounded-md px-3 py-2 text-sm text-muted-foreground outline-none transition-colors hover:bg-surface-muted hover:text-foreground"
                >
                  <span className="flex items-center gap-3">
                    <span className="flex size-5 items-center justify-center">{item.icon}</span>
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
