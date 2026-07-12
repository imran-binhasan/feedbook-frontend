import Image from "next/image";
import Link from "next/link";
import { Card, CardHeader, SeeAllLink } from "@/components/ui/card";

type SuggestedPerson = {
  avatarSrc: string;
  name: string;
  role: string;
};

const SUGGESTED_PEOPLE: SuggestedPerson[] = [
  { avatarSrc: "/images/avatars/people1.png", name: "Steve Jobs", role: "CEO of Apple" },
  { avatarSrc: "/images/avatars/people2.png", name: "Ryan Roslansky", role: "CEO of LinkedIn" },
  { avatarSrc: "/images/avatars/people3.png", name: "Dylan Field", role: "CEO of Figma" },
];

export function SuggestedPeopleCard() {
  return (
    <Card>
      <CardHeader action={<SeeAllLink href="#" />}>Suggested People</CardHeader>
      {SUGGESTED_PEOPLE.map((person) => (
        <div key={person.name} className="mb-4 flex items-center justify-between">
          <div className="flex items-center">
            <Link href="#" className="mr-3 block size-10 shrink-0 overflow-hidden rounded-full">
              <Image
                src={person.avatarSrc}
                alt={person.name}
                width={40}
                height={40}
                unoptimized
                className="size-full object-cover"
              />
            </Link>
            <div>
              <Link href="#" className="text-sm font-medium text-title transition-colors hover:text-primary">
                {person.name}
              </Link>
              <p className="text-xs font-normal text-muted-foreground">
                {person.role}
              </p>
            </div>
          </div>
          <Link href="#" className="text-sm font-semibold text-primary">
            Connect
          </Link>
        </div>
      ))}
    </Card>
  );
}