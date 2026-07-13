import Image from "next/image";
import { cn } from "@/libs/utils";

const STORIES = [
  { src: "/images/avatars/card_ppl2.png", mini: "/images/avatars/mini_pic.png", name: "Ryan Roslansky" },
  { src: "/images/avatars/card_ppl3.png", mini: "/images/avatars/mini_pic.png", name: "Ryan Roslansky" },
  { src: "/images/avatars/card_ppl4.png", mini: "/images/avatars/mini_pic.png", name: "Ryan Roslansky" },
];

export function FeedStories() {
  return (
    <>
      {/* Desktop */}
      <div className="relative mb-4 hidden lg:block">
        <div className="absolute right-2 top-1/2 z-10 -translate-y-1/2">
          <button
            type="button"
            className="flex size-[29px] items-center justify-center rounded-full bg-primary shadow-md"
          >
            <svg width="9" height="8" fill="none" viewBox="0 0 9 8">
              <path fill="#fff" d="M8 4l.366-.341.318.341-.318.341L8 4zm-7 .5a.5.5 0 010-1v1zM5.566.659l2.8 3-.732.682-2.8-3L5.566.66zm2.8 3.682l-2.8 3-.732-.682 2.8-3 .732.682zM8 4.5H1v-1h7v1z" />
            </svg>
          </button>
        </div>
        <div className="grid grid-cols-4 gap-3">
          {/* Your Story */}
          <div className="relative overflow-hidden rounded-md">
          <Image
              src="/images/avatars/card_ppl1.png"
              alt=""
              width={180}
              height={240}
              priority
              className="h-48 w-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
            <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
              <button
                type="button"
                className="flex size-10 items-center justify-center rounded-full border-2 border-white bg-primary"
              >
                <svg width="12" height="12" fill="none" viewBox="0 0 12 12">
                  <path stroke="#fff" strokeLinecap="round" d="M6 2.5v7M2.5 6h7" />
                </svg>
              </button>
            </div>
            <p className="absolute bottom-3 left-1/2 -translate-x-1/2 text-xs font-medium text-white">
              Your Story
            </p>
          </div>

          {/* Other stories */}
          {STORIES.map((story, i) => (
            <div key={i} className="relative overflow-hidden rounded-md">
              <Image
                  src={story.src}
                  alt=""
                  width={180}
                  height={240}
                  priority
                  className="h-48 w-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
              <div className="absolute left-2 top-2 size-8 overflow-hidden rounded-full border-2 border-primary ring-2 ring-white">
                <Image
                  src={story.mini}
                  alt=""
                  width={32}
                  height={32}
                  className="size-full object-cover"
                />
              </div>
              <p className="absolute bottom-3 left-3 text-xs font-medium text-white">
                {story.name}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Mobile - horizontal scroll */}
      <div className="mb-4 overflow-x-auto scrollbar-none lg:hidden">
        <ul className="flex gap-3">
          <li className="shrink-0">
            <a href="#" className="block">
              <div className="relative mb-1 size-16 overflow-hidden rounded-full bg-surface-muted">
                  <Image
                    src="/images/avatars/card_ppl1.png"
                  alt=""
                  width={64}
                  height={64}
                  className="size-full object-cover"
                />
              </div>
              <p className="text-center text-xs text-muted-foreground">Your Story</p>
            </a>
          </li>
          {[1, 2, 3, 4, 5, 6, 7].map((i) => (
            <li key={i} className="shrink-0">
              <a href="#" className="block">
                <div
                  className={cn(
                    "relative mb-1 size-16 overflow-hidden rounded-full ring-2",
                    i % 3 === 0 ? "ring-primary" : "ring-border",
                  )}
                >
                  <Image
                    src={i % 2 === 0 ? "/images/avatars/card_ppl2.png" : "/images/avatars/card_ppl3.png"}
                    alt=""
                    width={64}
                    height={64}
                    className="size-full object-cover"
                  />
                </div>
                <p className="text-center text-xs text-muted-foreground">Ryan...</p>
              </a>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
}
