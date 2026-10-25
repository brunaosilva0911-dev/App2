import { useState } from "react";
import type { Channel } from "../types";
import { IconPlay, IconStar } from "./Icons";

function initials(name: string) {
  return name
    .replace(/[^A-Za-zÀ-ÿ0-9 ]/g, "")
    .split(" ")
    .slice(0, 2)
    .map((w) => w[0])
    .join("")
    .toUpperCase();
}

export function ChannelCard({
  channel,
  onPlay,
  onToggleFav,
  isFav,
  live,
}: {
  channel: Channel;
  onPlay: (c: Channel) => void;
  onToggleFav?: (id: string) => void;
  isFav?: boolean;
  live?: boolean;
}) {
  const [step, setStep] = useState<0 | 1 | 2>(0);
  const src = step === 0 ? channel.preview : channel.image;

  return (
    <div className="group relative w-[200px] shrink-0 sm:w-[232px] lg:w-[260px]">
      <button
        onClick={() => onPlay(channel)}
        className="block w-full overflow-hidden rounded-lg border-2 border-white/10 bg-[#13151c] shadow-[0_8px_30px_rgba(0,0,0,.6)] transition-all duration-300 ease-out group-hover:scale-[1.06] group-hover:border-white/80"
      >
        <div className="relative aspect-video w-full">
          {step < 2 ? (
            <img
              src={src}
              alt={channel.name}
              loading="lazy"
              onError={() => setStep((s) => (s === 0 ? 1 : 2))}
              className="h-full w-full object-cover"
            />
          ) : (
            <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-[#1f2740] to-[#0b0d14]">
              <span className="text-2xl font-black tracking-widest text-white/70">
                {initials(channel.name)}
              </span>
            </div>
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/10 to-transparent" />
          {live && (
            <span className="absolute left-2 top-2 flex items-center gap-1 rounded bg-red-600 px-1.5 py-0.5 text-[10px] font-bold uppercase tracking-wide text-white">
              <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-white" />
              Ao vivo
            </span>
          )}
          <div className="absolute inset-0 flex items-center justify-center opacity-0 transition-opacity duration-300 group-hover:opacity-100">
            <span className="flex h-12 w-12 items-center justify-center rounded-full bg-white/15 backdrop-blur-sm ring-2 ring-white/70">
              <IconPlay className="ml-0.5 h-5 w-5 text-white" />
            </span>
          </div>
          <p className="absolute bottom-2 left-3 right-3 truncate text-left text-sm font-semibold text-white drop-shadow">
            {channel.name}
          </p>
        </div>
      </button>
      {onToggleFav && (
        <button
          onClick={(e) => {
            e.stopPropagation();
            onToggleFav(channel.id);
          }}
          title="Favoritar"
          className="absolute right-2 top-2 z-10 hidden h-8 w-8 items-center justify-center rounded-full bg-black/60 text-white/90 backdrop-blur transition hover:bg-black/90 group-hover:flex"
        >
          <IconStar className="h-4 w-4" filled={isFav} />
        </button>
      )}
    </div>
  );
}
