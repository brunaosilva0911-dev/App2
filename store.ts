import { useCallback, useEffect, useState } from "react";
import type { Channel, ChannelsResponse, LiveEvent } from "../types";
import { localChannelsResponse } from "../data/channels";
import { localEvents } from "../data/events";

export function useLocalStorage<T>(key: string, initial: T) {
  const [value, setValue] = useState<T>(() => {
    try {
      const raw = localStorage.getItem(key);
      return raw ? (JSON.parse(raw) as T) : initial;
    } catch {
      return initial;
    }
  });
  useEffect(() => {
    try {
      localStorage.setItem(key, JSON.stringify(value));
    } catch {
      /* ignore */
    }
  }, [key, value]);
  return [value, setValue] as const;
}

export type ApiSettings = { channelsUrl: string; eventsUrl: string };

export const defaultSettings: ApiSettings = {
  channelsUrl: "",
  eventsUrl: "",
};

/** Busca canais/eventos nas APIs configuradas; usa a base local como fallback. */
export function useCatalog(settings: ApiSettings) {
  const [data, setData] = useState<ChannelsResponse>(localChannelsResponse);
  const [events, setEvents] = useState<LiveEvent[]>(localEvents);
  const [status, setStatus] = useState<"local" | "loading" | "remote" | "error">(
    "local",
  );

  const load = useCallback(async () => {
    if (!settings.channelsUrl && !settings.eventsUrl) {
      setData(localChannelsResponse);
      setEvents(localEvents);
      setStatus("local");
      return;
    }
    setStatus("loading");
    let ok = false;
    try {
      if (settings.channelsUrl) {
        const r = await fetch(settings.channelsUrl);
        const j = (await r.json()) as ChannelsResponse;
        if (j?.channels?.length) {
          setData(j);
          ok = true;
        }
      }
      if (settings.eventsUrl) {
        const r = await fetch(settings.eventsUrl);
        const j = (await r.json()) as LiveEvent[];
        if (Array.isArray(j) && j.length) {
          setEvents(j);
          ok = true;
        }
      }
      setStatus(ok ? "remote" : "error");
    } catch {
      setStatus("error");
    }
  }, [settings.channelsUrl, settings.eventsUrl]);

  useEffect(() => {
    void load();
  }, [load]);

  return { data, events, status, reload: load };
}

export function useFavorites() {
  const [ids, setIds] = useLocalStorage<string[]>("dp-favorites", []);
  const toggle = (id: string) =>
    setIds((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [id, ...prev],
    );
  const has = (id: string) => ids.includes(id);
  return { ids, toggle, has };
}

export function useRecent() {
  const [ids, setIds] = useLocalStorage<string[]>("dp-recent", []);
  const push = (id: string) =>
    setIds((prev) => [id, ...prev.filter((x) => x !== id)].slice(0, 12));
  return { ids, push };
}

export const byIds = (channels: Channel[], ids: string[]) =>
  ids.map((id) => channels.find((c) => c.id === id)).filter(Boolean) as Channel[];
