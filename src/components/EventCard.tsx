import type { LiveEvent } from "../types";
import { eventStatus, formatHour } from "../data/events";
import { IconPlay } from "./Icons";

const label = { live: "AO VIVO", soon: "EM BREVE", ended: "ENCERRADO" } as const;

export function EventCard({
  event,
  onPlay,
}: {
  event: LiveEvent;
  onPlay: (ev: LiveEvent) => void;
}) {
  const status = eventStatus(event);

  return (
    <button
      onClick={() => onPlay(event)}
      className="group w-[280px] shrink-0 overflow-hidden rounded-xl border-2 border-white/10 bg-gradient-to-b from-[#1b2130] to-[#0e1118] p-4 text-left transition-all duration-300 hover:scale-[1.04] hover:border-white/70 sm:w-[320px]"
    >
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <img
            src={event.league.image}
            alt=""
            className="h-5 w-5 object-contain"
            onError={(e) => (e.currentTarget.style.visibility = "hidden")}
          />
          <span className="truncate text-xs font-semibold uppercase tracking-wide text-white/60">
            {event.league.name}
          </span>
        </div>
        <span
          className={`rounded px-1.5 py-0.5 text-[10px] font-bold tracking-wide ${
            status === "live"
              ? "bg-red-600 text-white"
              : status === "soon"
                ? "bg-white/15 text-white/80"
                : "bg-white/5 text-white/40"
          }`}
        >
          {label[status]}
        </span>
      </div>

      <div className="mt-4 flex items-center justify-between gap-2">
        <Team team={event.teams.home} />
        <div className="text-center">
          <p className="text-lg font-black text-white">
            {formatHour(event.time_start)}
          </p>
          <p className="text-[10px] uppercase tracking-widest text-white/40">
            vs
          </p>
        </div>
        <Team team={event.teams.away} />
      </div>

      <div className="mt-4 flex items-center justify-between border-t border-white/10 pt-3">
        <span className="text-xs text-white/50">
          {event.players.length} canal{event.players.length > 1 ? "is" : ""}
        </span>
        <span className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-wide text-white transition group-hover:text-sky-300">
          <IconPlay className="h-3 w-3" /> Assistir
        </span>
      </div>
    </button>
  );
}

function Team({ team }: { team: { name: string; image: string } }) {
  return (
    <div className="flex w-[90px] flex-col items-center gap-2">
      <img
        src={team.image}
        alt={team.name}
        className="h-10 w-10 object-contain"
        onError={(e) => (e.currentTarget.style.visibility = "hidden")}
      />
      <span className="line-clamp-2 text-center text-xs font-semibold text-white/85">
        {team.name}
      </span>
    </div>
  );
}
