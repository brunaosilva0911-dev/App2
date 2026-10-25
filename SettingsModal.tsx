import { useState } from "react";
import type { ApiSettings } from "../lib/store";
import { IconClose } from "./Icons";

export function SettingsModal({
  settings,
  onSave,
  onClose,
  status,
}: {
  settings: ApiSettings;
  onSave: (s: ApiSettings) => void;
  onClose: () => void;
  status: string;
}) {
  const [form, setForm] = useState(settings);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4 backdrop-blur">
      <div className="w-full max-w-lg rounded-2xl border border-white/10 bg-[#11141d] p-6 shadow-2xl">
        <div className="mb-4 flex items-start justify-between">
          <div>
            <h3 className="text-lg font-bold text-white">Fontes de dados</h3>
            <p className="text-xs text-white/50">
              Informe as URLs das suas APIs. Em branco = usa o catálogo embutido.
            </p>
          </div>
          <button
            onClick={onClose}
            className="flex h-8 w-8 items-center justify-center rounded-full bg-white/10 text-white"
          >
            <IconClose className="h-4 w-4" />
          </button>
        </div>

        <label className="mb-1 block text-xs font-semibold uppercase tracking-wide text-white/60">
          API de canais (JSON)
        </label>
        <input
          value={form.channelsUrl}
          onChange={(e) => setForm({ ...form, channelsUrl: e.target.value })}
          placeholder="https://seu-dominio/api/canais.json"
          className="mb-4 w-full rounded-lg border border-white/10 bg-black/50 px-3 py-2.5 text-sm text-white outline-none focus:border-sky-400"
        />

        <label className="mb-1 block text-xs font-semibold uppercase tracking-wide text-white/60">
          API de eventos (JSON)
        </label>
        <input
          value={form.eventsUrl}
          onChange={(e) => setForm({ ...form, eventsUrl: e.target.value })}
          placeholder="https://seu-dominio/api/eventos.json"
          className="mb-4 w-full rounded-lg border border-white/10 bg-black/50 px-3 py-2.5 text-sm text-white outline-none focus:border-sky-400"
        />

        <p className="mb-5 rounded-lg bg-white/5 p-3 text-[11px] leading-relaxed text-white/50">
          Status atual: <b className="text-white/80">{status}</b>. Se a API não
          liberar CORS, o site mantém o catálogo local — nesse caso use um proxy
          (ex.: Cloudflare Worker) ou o app Android.
        </p>

        <div className="flex justify-end gap-2">
          <button
            onClick={onClose}
            className="rounded-full px-5 py-2.5 text-sm font-semibold text-white/70 hover:text-white"
          >
            Cancelar
          </button>
          <button
            onClick={() => {
              onSave(form);
              onClose();
            }}
            className="rounded-full bg-white px-6 py-2.5 text-sm font-bold text-black transition hover:bg-white/85"
          >
            Salvar
          </button>
        </div>
      </div>
    </div>
  );
}
