import { useRef, type ReactNode } from "react";
import { IconChevron } from "./Icons";

export function Row({
  title,
  children,
  action,
}: {
  title: string;
  children: ReactNode;
  action?: ReactNode;
}) {
  const ref = useRef<HTMLDivElement>(null);

  const scroll = (dir: 1 | -1) => {
    const el = ref.current;
    if (!el) return;
    el.scrollBy({ left: dir * (el.clientWidth * 0.8), behavior: "smooth" });
  };

  return (
    <section className="group/row relative mb-9">
      <div className="mb-3 flex items-center justify-between px-4 sm:px-10">
        <h2 className="text-base font-bold tracking-wide text-white/90 sm:text-xl">
          {title}
        </h2>
        {action}
      </div>
      <div className="relative">
        <button
          onClick={() => scroll(-1)}
          className="absolute left-0 top-0 z-20 hidden h-full w-10 rotate-180 items-center justify-center bg-gradient-to-l from-black/80 to-transparent text-white opacity-0 transition group-hover/row:opacity-100 lg:flex"
        >
          <IconChevron className="h-7 w-7" />
        </button>
        <div
          ref={ref}
          className="no-scrollbar flex gap-3 overflow-x-auto scroll-smooth px-4 py-5 sm:gap-4 sm:px-10"
        >
          {children}
        </div>
        <button
          onClick={() => scroll(1)}
          className="absolute right-0 top-0 z-20 hidden h-full w-10 items-center justify-center bg-gradient-to-l from-black/80 to-transparent text-white opacity-0 transition group-hover/row:opacity-100 lg:flex"
        >
          <IconChevron className="h-7 w-7" />
        </button>
      </div>
    </section>
  );
}
