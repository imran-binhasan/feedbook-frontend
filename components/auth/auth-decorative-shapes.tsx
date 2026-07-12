import Image from "next/image";

export function AuthDecorativeShapes() {
  return (
    <div
      className="pointer-events-none absolute inset-0 z-0 hidden lg:block"
      aria-hidden="true"
    >
      {/* Shape 1 — top-left */}
      <Image
        src="/images/others/shape1.svg"
        alt=""
        width={176}
        height={540}
        unoptimized
        aria-hidden="true"
        className="absolute left-0 top-0 w-44 max-xl:w-37.5 dark:hidden"
      />
      <Image
        src="/images/others/dark_shape.svg"
        alt=""
        width={176}
        height={540}
        unoptimized
        aria-hidden="true"
        className="absolute left-0 top-0 hidden w-44 max-xl:w-37.5 dark:block"
      />

      {/* Shape 2 — top-right */}
      <Image
        src="/images/others/shape2.svg"
        alt=""
        width={568}
        height={400}
        unoptimized
        aria-hidden="true"
        className="absolute right-5 top-0 w-142 max-xl:w-112.5 dark:hidden"
      />
      <Image
        src="/images/others/dark_shape1.svg"
        alt=""
        width={568}
        height={400}
        unoptimized
        aria-hidden="true"
        className="absolute right-5 top-0 hidden w-142 max-xl:w-112.5 opacity-5 dark:block"
      />

      {/* Shape 3 — bottom-right */}
      <Image
        src="/images/others/shape3.svg"
        alt=""
        width={568}
        height={548}
        unoptimized
        aria-hidden="true"
        className="absolute bottom-0 right-81.75 w-142 max-xl:right-0 max-xl:w-123.5 dark:hidden"
      />
      <Image
        src="/images/others/dark_shape2.svg"
        alt=""
        width={568}
        height={548}
        unoptimized
        aria-hidden="true"
        className="absolute bottom-0 right-81.75 hidden w-142 max-xl:right-0 max-xl:w-123.5 opacity-5 dark:block"
      />
    </div>
  );
}