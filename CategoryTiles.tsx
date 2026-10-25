import type { Category } from "../types";

const styles: Record<number, { from: string; to: string; emoji: string }> = {
  8: { from: "from-emerald-500/80", to: "to-emerald-900", emoji: "🌾" },
  1: { from: "from-sky-500/80", to: "to-blue-900", emoji: "⚽" },
  2: { from: "from-fuchsia-500/80", to: "to-purple-900", emoji: "🧸" },
  3: { from: "from-amber-500/80", to: "to-orange-900", emoji: "🌍" },
  4: { from: "from-indigo-500/80", to: "to-indigo-950", emoji: "🎬" },
  5: { from: "from-rose-500/80", to: "to-red-900", emoji: "📰" },
  6: { from: "from-cyan-500/80", to: "to-teal-900", emoji: "📺" },
  7: { from: "from-violet-500/80", to: "to-slate-900", emoji: "🎭" },
  9: { from: "from-lime-500/80", to: "to-green-900", emoji: "🇵🇹" },
};

export function CategoryTiles({
  categories,
  onPick,
  counts,
}: {
  categories: Category[];
  onPick: (id: number) => void;
  counts: Record<number, number>;
}) {
  return (
    <div className="no-scrollbar mb-10 flex gap-3 overflow-x-auto px-4 pb-2 sm:gap-4 sm:px-10">
      {categories
        .filter((c) => c.id !== 0)
        .map((c) => {
          const s = styles[c.id] ?? {
            from: "from-slate-600",
            to: "to-slate-900",
            emoji: "📡",
          };
          return (
            <button
              key={c.id}
              onClick={() => onPick(c.id)}
              className={`group relative flex h-[90px] w-[170px] shrink-0 flex-col justify-end overflow-hidden rounded-lg border-2 border-white/15 bg-gradient-to-br ${s.from} ${s.to} p-3 text-left transition-all duration-300 hover:scale-[1.05] hover:border-white/80 sm:h-[104px] sm:w-[200px]`}
            >
              <span className="absolute -right-2 -top-3 text-5xl opacity-30 transition group-hover:scale-110 group-hover:opacity-50">
                {s.emoji}
              </span>
              <span className="text-sm font-black uppercase tracking-wide text-white drop-shadow">
                {c.name}
              </span>
              <span className="text-[11px] font-medium text-white/70">
                {counts[c.id] ?? 0} canais
              </span>
            </button>
          );
        })}
    </div>
  );
}
