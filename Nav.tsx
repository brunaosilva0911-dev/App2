import {
  IconHome,
  IconSearch,
  IconStar,
  IconTrophy,
  IconTv,
  IconSettings,
  IconDownload,
} from "./Icons";

export type PageKey = "home" | "search" | "channels" | "events" | "favorites";

const items: { key: PageKey; label: string; Icon: typeof IconHome }[] = [
  { key: "search", label: "Buscar", Icon: IconSearch },
  { key: "home", label: "Início", Icon: IconHome },
  { key: "channels", label: "Canais", Icon: IconTv },
  { key: "events", label: "Esportes", Icon: IconTrophy },
  { key: "favorites", label: "Minha Lista", Icon: IconStar },
];

export function Sidebar({
  page,
  setPage,
  onSettings,
  onInstall,
}: {
  page: PageKey;
  setPage: (p: PageKey) => void;
  onSettings: () => void;
  onInstall: () => void;
}) {
  return (
    <aside className="group/side fixed left-0 top-0 z-40 hidden h-full w-[72px] flex-col items-start gap-2 border-r border-white/5 bg-[#06070c]/95 py-6 transition-all duration-300 hover:w-60 hover:bg-[#06070c] md:flex">
      <div className="mb-8 flex w-full items-center gap-3 px-5">
        <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-gradient-to-br from-sky-400 to-indigo-600 text-sm font-black text-white">
          B+
        </div>
        <span className="whitespace-nowrap text-lg font-black tracking-tight text-white opacity-0 transition-opacity duration-200 group-hover/side:opacity-100">
          BrasilTV<span className="text-sky-400">+</span>
        </span>
      </div>

      {items.map(({ key, label, Icon }) => {
        const active = page === key;
        return (
          <button
            key={key}
            onClick={() => setPage(key)}
            className={`relative flex w-full items-center gap-4 px-5 py-3 text-sm font-semibold transition ${
              active ? "text-white" : "text-white/55 hover:text-white"
            }`}
          >
            {active && (
              <span className="absolute left-0 top-1/2 h-7 w-[3px] -translate-y-1/2 rounded-r bg-sky-400" />
            )}
            <Icon className="h-6 w-6 shrink-0" />
            <span className="whitespace-nowrap opacity-0 transition-opacity duration-200 group-hover/side:opacity-100">
              {label}
            </span>
          </button>
        );
      })}

      <button
        onClick={onInstall}
        className="mt-auto flex w-full items-center gap-4 px-5 py-3 text-sm font-semibold text-sky-300 transition hover:text-white"
      >
        <IconDownload className="h-6 w-6 shrink-0" />
        <span className="whitespace-nowrap opacity-0 transition-opacity duration-200 group-hover/side:opacity-100">
          Instalar app
        </span>
      </button>

      <button
        onClick={onSettings}
        className="flex w-full items-center gap-4 px-5 py-3 text-sm font-semibold text-white/50 transition hover:text-white"
      >
        <IconSettings className="h-6 w-6 shrink-0" />
        <span className="whitespace-nowrap opacity-0 transition-opacity duration-200 group-hover/side:opacity-100">
          Configurar API
        </span>
      </button>
    </aside>
  );
}

export function MobileNav({
  page,
  setPage,
}: {
  page: PageKey;
  setPage: (p: PageKey) => void;
}) {
  return (
    <nav className="fixed bottom-0 left-0 z-40 flex w-full items-center justify-around border-t border-white/10 bg-[#06070c]/95 pb-[env(safe-area-inset-bottom)] backdrop-blur md:hidden">
      {items.map(({ key, label, Icon }) => {
        const active = page === key;
        return (
          <button
            key={key}
            onClick={() => setPage(key)}
            className={`flex flex-1 flex-col items-center gap-1 py-2.5 text-[10px] font-semibold ${
              active ? "text-sky-400" : "text-white/50"
            }`}
          >
            <Icon className="h-5 w-5" />
            {label}
          </button>
        );
      })}
    </nav>
  );
}
