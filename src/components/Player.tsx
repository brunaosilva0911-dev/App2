import { useEffect, useState } from "react";
import { IconClose, IconExternal, IconInfo } from "./Icons";

export type PlayerSource = { label: string; url: string };

export function Player({
  title,
  subtitle,
  sources,
  onClose,
}: {
  title: string;
  subtitle?: string;
  sources: PlayerSource[];
  onClose: () => void;
}) {
  const [idx, setIdx] = useState(0);
  const [key, setKey] = useState(0);
  const current = sources[idx];

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [onClose]);

  return (
    <div className="fixed inset-0 z-50 flex flex-col bg-black/95 backdrop-blur-sm">
      <header className="flex items-center justify-between gap-4 px-4 py-3 sm:px-6">
        <div className="min-w-0">
          <h3 className="truncate text-base font-bold text-white sm:text-lg">
            {title}
          </h3>
          {subtitle && (
            <p className="truncate text-xs text-white/50">{subtitle}</p>
          )}
        </div>
        <div className="flex shrink-0 items-center gap-2">
          <a
            href={current?.url}
            target="_blank"
            rel="noreferrer"
            className="flex items-center gap-2 rounded-full border border-white/25 px-3 py-2 text-xs font-semibold text-white/85 transition hover:bg-white/10"
          >
            <IconExternal className="h-4 w-4" />
            <span className="hidden sm:inline">Abrir em nova aba</span>
          </a>
          <button
            onClick={onClose}
            className="flex h-9 w-9 items-center justify-center rounded-full bg-white/10 text-white transition hover:bg-white/25"
          >
            <IconClose className="h-5 w-5" />
          </button>
        </div>
      </header>

      <div className="flex-1 px-2 pb-2 sm:px-6 sm:pb-4">
        <div className="relative h-full w-full overflow-hidden rounded-xl bg-black ring-1 ring-white/10">
          {current ? (
            <iframe
              key={`${current.url}-${key}`}
              src={current.url}
              title={title}
              allow="autoplay; encrypted-media; picture-in-picture; fullscreen"
              allowFullScreen
              referrerPolicy="no-referrer"
              className="h-full w-full border-0"
            />
          ) : (
            <div className="flex h-full items-center justify-center text-white/60">
              Nenhuma fonte disponível
            </div>
          )}
        </div>
      </div>

      <footer className="flex flex-wrap items-center gap-2 px-4 pb-4 sm:px-6">
        {sources.map((s, i) => (
          <button
            key={s.url}
            onClick={() => setIdx(i)}
            className={`rounded-full px-4 py-1.5 text-xs font-bold uppercase tracking-wide transition ${
              i === idx
                ? "bg-white text-black"
                : "bg-white/10 text-white/70 hover:bg-white/20"
            }`}
          >
            {s.label}
          </button>
        ))}
        <button
          onClick={() => setKey((k) => k + 1)}
          className="rounded-full bg-white/10 px-4 py-1.5 text-xs font-bold uppercase tracking-wide text-white/70 transition hover:bg-white/20"
        >
          Recarregar
        </button>
        <p className="ml-auto flex items-center gap-1.5 text-[11px] text-white/40">
          <IconInfo className="h-3.5 w-3.5" />
          Se o player não carregar, use “Abrir em nova aba”.
        </p>
      </footer>
    </div>
  );
}
