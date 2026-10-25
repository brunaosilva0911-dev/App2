import type { LiveEvent } from "../types";

export const EVENT_HOST =
  "https://96e74bd0200a4c9c0dffe2d570f51ca8.embedtv.cc";

const comp = (id: number) =>
  `https://imagecache.365scores.com/image/upload/f_png,w_48,h_48,c_limit,q_auto:eco,dpr_2,d_Countries:Round:54.png/v19/Competitions/${id}`;
const team = (id: number) =>
  `https://imagecache.365scores.com/image/upload/f_png,w_68,h_68,c_limit,q_auto:eco,dpr_2,d_Competitors:default1.png/v2/Competitors/${id}`;

/** [id, titulo, liga, ligaId, casa, casaId, fora, foraId, hora, canais] */
type Row = [
  number,
  string,
  string,
  number,
  string,
  number,
  string,
  number,
  string,
  string[],
];

const rows: Row[] = [
  [4745510, "FC Rostov x Lokomotiv Moscow", "Campeonato Russo", 89, "FC Rostov", 1092, "Lokomotiv Moscow", 1081, "07:45", ["bandsports"]],
  [4732666, "Inter de Milão x Fiorentina", "Campeonato Italiano", 17, "Inter de Milão", 224, "Fiorentina", 228, "08:30", ["espn"]],
  [4798865, "Crystal Palace (F) x Chelsea (F)", "Campeonato Inglês (F)", 6216, "Crystal Palace (F)", 24326, "Chelsea (F)", 27814, "09:00", ["xsports"]],
  [4745507, "CSKA Moscow x Spartak Moscou", "Campeonato Russo", 89, "CSKA Moscow", 1077, "Spartak Moscou", 1076, "10:00", ["bandsports"]],
  [4750820, "Athletic Bilbao x Getafe", "La Liga", 11, "Athletic Bilbao", 144, "Getafe", 140, "10:00", ["caze1"]],
  [4714179, "New Orleans Saints x Pittsburgh Steelers", "NFL", 352, "New Orleans Saints", 6763, "Pittsburgh Steelers", 6761, "10:30", ["sportv2"]],
  [4734548, "PSV Eindhoven x Feyenoord", "Campeonato Holandês", 57, "PSV Eindhoven", 725, "Feyenoord", 691, "10:30", ["espn2"]],
  [4732670, "Atalanta x Frosinone", "Campeonato Italiano", 17, "Atalanta", 232, "Frosinone", 254, "11:00", ["espn3"]],
  [4735230, "Monaco x Lille", "Ligue 1", 35, "Monaco", 471, "Lille", 478, "11:00", ["caze1", "xsports"]],
  [4742022, "Manchester United x Bournemouth", "Premier League", 7, "Manchester United", 105, "Bournemouth", 50, "11:00", ["caze1"]],
  [4742023, "Liverpool x Brighton", "Premier League", 7, "Liverpool", 108, "Brighton", 38, "11:00", ["espn"]],
  [4742025, "Hull City x Brentford", "Premier League", 7, "Hull City", 11, "Brentford", 63, "11:00", ["espn4"]],
  [4742026, "Crystal Palace x Newcastle United", "Premier League", 7, "Crystal Palace", 10, "Newcastle United", 116, "11:00", ["espn"]],
  [4755368, "Hoffenheim x Bayer Leverkusen", "Bundesliga", 25, "Hoffenheim", 351, "Bayer Leverkusen", 333, "11:30", ["sportv"]],
  [4750817, "Celta Vigo x Real Betis", "La Liga", 11, "Celta Vigo", 158, "Real Betis", 146, "12:15", ["caze1"]],
  [4745504, "Zenit x Dynamo Makhachkala", "Campeonato Russo", 89, "Zenit", 1075, "Dynamo Makhachkala", 30967, "12:30", ["bandsports"]],
  [4735228, "Toulouse x Troyes", "Ligue 1", 35, "Toulouse", 482, "Troyes", 488, "13:15", ["caze1"]],
  [4735229, "Rennes x Strasbourg", "Ligue 1", 35, "Rennes", 477, "Strasbourg", 479, "13:15", ["caze1"]],
  [4735231, "Olympique de Marseille x Le Havre", "Ligue 1", 35, "Olympique de Marseille", 469, "Le Havre", 485, "13:15", ["caze1"]],
  [4735234, "Auxerre x Le Mans", "Ligue 1", 35, "Auxerre", 476, "Le Mans", 468, "13:15", ["caze1"]],
  [4735235, "Angers x Lorient", "Ligue 1", 35, "Angers", 493, "Lorient", 472, "13:15", ["caze1"]],
  [4742021, "Sunderland x Leeds United", "Premier League", 7, "Sunderland", 117, "Leeds United", 36, "13:30", ["espn"]],
  [4755367, "Freiburg x Bayern de Munique", "Bundesliga", 25, "Freiburg", 354, "Bayern de Munique", 331, "13:30", ["xsports"]],
  [4715004, "Baltimore Ravens x Cincinnati Bengals", "NFL", 352, "Baltimore Ravens", 6655, "Cincinnati Bengals", 6762, "14:00", ["espn2"]],
  [4715007, "Atlanta Falcons x San Francisco 49ers", "NFL", 352, "Atlanta Falcons", 6759, "San Francisco 49ers", 6670, "14:00", ["sportv2"]],
  [4750815, "Real Madrid x Barcelona", "La Liga", 11, "Real Madrid", 131, "Barcelona", 83, "16:15", ["espn", "caze1"]],
];

const slugify = (s: string) =>
  s
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");

/** Monta a data de hoje com o horário informado (fuso local). */
function todayAt(hhmm: string, addMinutes = 0) {
  const [h, m] = hhmm.split(":").map(Number);
  const d = new Date();
  d.setHours(h, m + addMinutes, 0, 0);
  return d.toISOString();
}

export const localEvents: LiveEvent[] = rows.map(
  ([id, title, league, leagueId, home, homeId, away, awayId, hour, players]) => ({
    id,
    slug: slugify(title),
    title,
    league: { name: league, image: comp(leagueId) },
    teams: {
      home: { name: home, image: team(homeId) },
      away: { name: away, image: team(awayId) },
    },
    time_start: todayAt(hour),
    time_end: todayAt(hour, 132),
    players: players.map((p) => `${EVENT_HOST}/${p}`),
  }),
);

export function eventStatus(ev: LiveEvent): "live" | "soon" | "ended" {
  const now = Date.now();
  const start = new Date(ev.time_start).getTime();
  const end = new Date(ev.time_end).getTime();
  if (now >= start && now <= end) return "live";
  return now < start ? "soon" : "ended";
}

export function formatHour(iso: string) {
  return new Date(iso).toLocaleTimeString("pt-BR", {
    hour: "2-digit",
    minute: "2-digit",
  });
}
