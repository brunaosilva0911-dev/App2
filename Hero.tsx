import { useEffect, useState } from "react";
import { IconPlay, IconPlus, IconCheck } from "./Icons";

export type HeroItem = {
  key: string;
  title: string;
  badge?: string;
  meta: string;
  description: string;
  image: string;
  logo?: string;
  onPlay: () => void;
  onFav?: () => void;
  fav?: boolean;
};

export function Hero({ items }: { items: HeroItem[] }) {
  const [i, setI] = useState(0);

  useEffect(() => {
    if (items.length < 2) return;
    const t = setInterval(() => setI((p) => (p + 1) % items.length), 9000);
    return () => clearInterval(t);
  }, [items.length]);

  if (!items.length) return null;
  const item = items[Math.min(i, items.length - 1)];

  return (
    <div className="relative h-[62vh] min-h-[380px] w-full overflow-hidden sm:h-[72vh]">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_30%,#1e3a8a_0%,#0b1020_55%,#06070c_100%)]" />
      {items.map((it, idx) => (
        <img
          key={it.key}
          src={it.image}
          alt=""
          onError={(e) => (e.currentTarget.style.display = "none")}
          className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-1000 ${
            idx === i ? "opacity-100" : "opacity-0"
          }`}
        />
      ))}
      <div className="absolute inset-0 bg-gradient-to-t from-[#0a0c12] via-[#0a0c12]/55 to-transparent" />
      <div className="absolute inset-0 bg-gradient-to-r from-[#0a0c12] via-[#0a0c12]/60 to-transparent" />

      <div className="relative z-10 flex h-full max-w-2xl flex-col justify-end px-4 pb-12 sm:px-10 sm:pb-16">
        {item.badge && (
          <span className="mb-3 inline-flex w-fit items-center gap-2 rounded bg-red-600 px-2 py-1 text-[11px] font-bold uppercase tracking-widest text-white">
            <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-white" />
            {item.badge}
          </span>
        )}
        {item.logo ? (
          <img
            src={item.logo}
            alt={item.title}
            className="mb-4 max-h-24 w-auto max-w-[260px] object-contain drop-shadow-2xl"
            onError={(e) => (e.currentTarget.style.display = "none")}
          />
        ) : null}
        <h1 className="text-3xl font-black leading-tight text-white drop-shadow-lg sm:text-5xl">
          {item.title}
        </h1>
        <p className="mt-3 text-sm font-medium text-white/70">{item.meta}</p>
        <p className="mt-2 line-clamp-3 text-sm text-white/80 sm:text-base">
          {item.description}
        </p>
        <div className="mt-6 flex flex-wrap items-center gap-3">
          <button
            onClick={item.onPlay}
            className="flex items-center gap-2 rounded bg-white px-7 py-3 text-sm font-bold uppercase tracking-wide text-black transition hover:bg-white/85"
          >
            <IconPlay className="h-4 w-4" /> Assistir
          </button>
          {item.onFav && (
            <button
              onClick={item.onFav}
              className="flex h-12 w-12 items-center justify-center rounded-full border-2 border-white/60 bg-black/40 text-white backdrop-blur transition hover:border-white"
            >
              {item.fav ? (
                <IconCheck className="h-5 w-5" />
              ) : (
                <IconPlus className="h-5 w-5" />
              )}
            </button>
          )}
        </div>
        {items.length > 1 && (
          <div className="mt-7 flex gap-2">
            {items.map((it, idx) => (
              <button
                key={it.key}
                onClick={() => setI(idx)}
                className={`h-1 rounded-full transition-all ${
                  idx === i ? "w-8 bg-white" : "w-4 bg-white/35"
                }`}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
