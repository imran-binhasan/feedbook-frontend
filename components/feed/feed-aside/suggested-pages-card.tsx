import Image from "next/image";
import Link from "next/link";
import { Card, CardHeader, CardDivider, SeeAllLink } from "@/components/ui/card";
import { cn } from "@/libs/utils";

type SuggestedPage = {
  avatarSrc: string;
  name: string;
  role: string;
};

const SUGGESTED_PAGES: SuggestedPage[] = [
  {
    avatarSrc: "/images/avatars/Avatar.png",
    name: "Radovan SkillArena",
    role: "Founder & CEO at Trophy",
  },
];

export function SuggestedPagesCard() {
  return (
    <Card className="pb-6">
      <CardHeader className="mb-3" action={<SeeAllLink href="#" />}>You Might Like</CardHeader>
      <CardDivider />
      <div className="mt-3 space-y-4">
        {SUGGESTED_PAGES.map((page) => (
          <div key={page.name}>
            <div className="mb-4 flex items-center">
              <Link href="#" className="mr-3 block size-[46px] shrink-0 overflow-hidden rounded-full">
                <Image
                  src={page.avatarSrc}
                  alt={page.name}
                  width={46}
                  height={46}
                  unoptimized
                  className="size-full object-cover"
                />
              </Link>
              <div>
                <Link href="#" className="text-base font-medium text-title transition-colors hover:text-primary">
                  {page.name}
                </Link>
                <p className="text-xs font-normal text-muted-foreground">{page.role}</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <button
                type="button"
                className={cn(
                  "flex-1 rounded-[6px] border border-border-strong bg-transparent py-[10px] text-[15px] font-medium text-muted-foreground transition-colors",
                  "hover:bg-surface-muted",
                )}
              >
                Ignore
              </button>
              <button
                type="button"
                className={cn(
                  "flex-1 rounded-[6px] bg-primary py-[10px] text-[15px] font-medium text-primary-foreground transition-colors",
                  "hover:bg-primary-hover",
                )}
              >
                Follow
              </button>
            </div>
          </div>
        ))}
      </div>
    </Card>
  );
}