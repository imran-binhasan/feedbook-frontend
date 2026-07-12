import Image from "next/image";
import Link from "next/link";
import { Card } from "@/components/ui/card";

type FeedEvent = {
  coverSrc: string;
  day: string;
  month: string;
  title: string;
  attendees: number;
};

const FEED_EVENTS: FeedEvent[] = [
  {
    coverSrc: "/images/feed/feed_event1.png",
    day: "10",
    month: "Jul",
    title: "No more terrorism no more cry",
    attendees: 17,
  },
  {
    coverSrc: "/images/feed/feed_event1.png",
    day: "10",
    month: "Jul",
    title: "No more terrorism no more cry",
    attendees: 17,
  },
];

export function EventsCard() {
  return (
    <Card>
      <div className="mb-6 flex items-center justify-between">
        <h4 className="text-[18px] font-semibold text-title">Events</h4>
        <Link href="/events" className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary">
          See all
        </Link>
      </div>
      {FEED_EVENTS.map((event, index) => (
        <Link key={`${event.title}-${index}`} href="#" className="group mb-4 block transition-colors">
          <div className="overflow-hidden rounded-[6px] border border-transparent transition-colors group-hover:border-primary">
            <div className="relative h-[120px] w-full">
              <Image
                src={event.coverSrc}
                alt=""
                fill
                unoptimized
                className="rounded-t-[6px] object-cover"
              />
            </div>
            <div className="flex p-3 pb-0">
              <div className="mr-3 flex shrink-0 flex-col items-center justify-center rounded-[6px] bg-primary/10 px-[10px] py-[6px]">
                <span className="text-[18px] font-semibold leading-tight text-primary">
                  {event.day}
                </span>
                <span className="text-[11px] font-medium uppercase leading-tight text-primary">
                  {event.month}
                </span>
              </div>
              <div>
                <h4 className="line-clamp-2 text-[15px] font-semibold leading-tight text-content transition-colors group-hover:text-primary">
                  {event.title}
                </h4>
              </div>
            </div>
            <div className="mx-3 mt-3 flex items-center justify-between border-t border-border-soft pt-3 pb-3">
              <span className="text-[13px] font-normal text-muted-foreground">
                {event.attendees} People Going
              </span>
              <span className="text-[13px] font-semibold text-primary">
                Going
              </span>
            </div>
          </div>
        </Link>
      ))}
    </Card>
  );
}