import Image from "next/image";
import Link from "next/link";
import { SearchIcon } from "@/features/feed/components/feed-icons";
import { Card, CardHeader, SeeAllLink } from "@/components/ui/card";
import { cn } from "@/libs/utils";

type Friend = {
  avatarSrc: string;
  name: string;
  role: string;
  online: boolean;
};

const FRIENDS: Friend[] = [
  { avatarSrc: "/images/avatars/people1.png", name: "Steve Jobs", role: "CEO of Apple", online: false },
  { avatarSrc: "/images/avatars/people2.png", name: "Ryan Roslansky", role: "CEO of LinkedIn", online: true },
  { avatarSrc: "/images/avatars/people3.png", name: "Dylan Field", role: "CEO of Figma", online: true },
  { avatarSrc: "/images/avatars/people2.png", name: "Mark Zuckerberg", role: "CEO of Meta", online: true },
  { avatarSrc: "/images/avatars/people1.png", name: "Tim Cook", role: "CEO of Apple", online: false },
  { avatarSrc: "/images/avatars/people3.png", name: "Sundar Pichai", role: "CEO of Google", online: true },
  { avatarSrc: "/images/avatars/people1.png", name: "Elon Musk", role: "CEO of Tesla", online: false },
  { avatarSrc: "/images/avatars/people2.png", name: "Satya Nadella", role: "CEO of Microsoft", online: true },
];

export function FriendsListCard() {
  return (
    <Card className="pb-6">
      <CardHeader action={<SeeAllLink href="/friends" />}>
        Your Friends
      </CardHeader>

      <form className="relative mb-6">
        <SearchIcon
          aria-hidden="true"
          className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground"
        />
        <input
          type="search"
          placeholder="Search friends"
          aria-label="Search friends"
          className={cn(
            "h-[42px] w-full rounded-[40px] border border-border-soft bg-surface-muted pl-10 pr-4",
            "text-sm text-card-foreground placeholder:text-placeholder",
            "transition-colors duration-150 outline-none",
            "focus:border-primary focus:ring-0",
          )}
        />
      </form>

      <div className="space-y-8">
        {FRIENDS.map((friend, index) => (
          <div
            key={`${friend.name}-${index}`}
            className={cn(
              "flex cursor-pointer items-center justify-between transition-all",
              !friend.online && "opacity-60 hover:opacity-100",
            )}
          >
            <div className="flex items-center">
              <Link href="#" className="mr-3 block size-10 shrink-0 overflow-hidden rounded-full">
                <Image
                  src={friend.avatarSrc}
                  alt={friend.name}
                  width={40}
                  height={40}
                  unoptimized
                  className="size-full object-cover"
                />
              </Link>
              <div>
                <Link
                  href="#"
                  className="text-[14px] font-semibold text-title transition-colors hover:text-primary"
                >
                  {friend.name}
                </Link>
                <p className="text-[12px] font-normal text-muted-foreground">
                  {friend.role}
                </p>
              </div>
            </div>
            {friend.online ? (
              <svg width="14" height="14" fill="none" viewBox="0 0 14 14" className="shrink-0">
                <rect width="12" height="12" x="1" y="1" fill="var(--success, #0ACF83)" stroke="var(--card, #fff)" strokeWidth="2" rx="6" />
              </svg>
            ) : (
              <span className="text-[12px] text-muted-foreground">5m ago</span>
            )}
          </div>
        ))}
      </div>
    </Card>
  );
}