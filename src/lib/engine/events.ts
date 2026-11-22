import { GameEvent } from "./types";
import { EXPANDED_EVENTS } from "./events_pack2";
import { EXPANDED_EVENTS_PACK3 } from "./events_pack3";
import { EXPANDED_EVENTS_PACK4 } from "./events_pack4";

export const EVENTS: GameEvent[] = [
  ...EXPANDED_EVENTS,
  ...EXPANDED_EVENTS_PACK3,
  ...EXPANDED_EVENTS_PACK4,
  {
    id: "herald_tribute",
    characterId: "herald",
    text: {
      ru: "Милорд! Король требует выслать внеочередную дань на войну на юге!",
      en: "My Lord! The King demands extra tribute for his southern campaign!",
    },
    choices: [
      {
        id: "A",
        text: { ru: "Отправить золото (-15 Казна, +10 Влияние)", en: "Pay gold (-15 Gold, +10 Influence)" },
        delta: { treasury: -15, influence: 10 },
      },
      {
        id: "B",
        text: { ru: "Отказать (+5 Казна, -15 Влияние)", en: "Refuse (+5 Gold, -15 Influence)" },
        delta: { treasury: 5, influence: -15 },
      },
    ],
  },
  {
    id: "general_brigands",
    characterId: "general",
    text: {
      ru: "Разбойники в Черном лесу грабят обозы! Пора направить туда тяжелую кавалерию.",
      en: "Brigands in the Black Forest attack caravans! Send heavy cavalry at once.",
    },
    choices: [
      {
        id: "A",
        text: { ru: "Направить отряд (-10 Казна, +10 Народ, -5 Армия)", en: "Send cavalry (-10 Gold, +10 People, -5 Army)" },
        delta: { treasury: -10, people: 10, army: -5 },
      },
      {
        id: "B",
        text: { ru: "Пусть купцы платят за наемников (-10 Народ, +5 Казна)", en: "Let merchants hire guards (-10 People, +5 Gold)" },
        delta: { people: -10, treasury: 5 },
      },
    ],
  },
  {
    id: "peasant_harvest",
    characterId: "peasant",
    text: {
      ru: "Милорд, урожай в этом году скуден. Ослабьте подать зерном, иначе деревни вымрут!",
      en: "My Lord, the grain harvest failed. Reduce grain taxes or villages will starve!",
    },
    choices: [
      {
        id: "A",
        text: { ru: "Открыть амбары (+15 Народ, -10 Казна)", en: "Open granaries (+15 People, -10 Gold)" },
        delta: { people: 15, treasury: -10 },
      },
      {
        id: "B",
        text: { ru: "Взыскать налог полностью (-15 Народ, +15 Казна)", en: "Collect full quota (-15 People, +15 Gold)" },
        delta: { people: -15, treasury: 15 },
      },
    ],
  },
  {
    id: "bishop_tithe",
    characterId: "bishop",
    text: {
      ru: "Святая церковь молит о средствах на новый витражный собор во славу Всевышнего.",
      en: "The Holy Church seeks donations for a new grand cathedral to bless your reign.",
    },
    choices: [
      {
        id: "A",
        text: { ru: "Пожертвовать щедро (-15 Казна, +15 Влияние)", en: "Donate generously (-15 Gold, +15 Influence)" },
        delta: { treasury: -15, influence: 15 },
      },
      {
        id: "B",
        text: { ru: "Церковь и так богата (-10 Влияние, +5 Казна)", en: "The church has enough (-10 Influence, +5 Gold)" },
        delta: { influence: -10, treasury: 5 },
      },
    ],
  },
  {
    id: "merchant_toll",
    characterId: "merchant",
    text: {
      ru: "Мы просим снизить пошлины на мосту через реку! Это привлечет заморских торговцев.",
      en: "Lower the bridge tolls! It will attract foreign caravans and enrich trade.",
    },
    choices: [
      {
        id: "A",
        text: { ru: "Снизить пошлины (-5 Казна, +10 Народ, +5 Влияние)", en: "Lower tolls (-5 Gold, +10 People, +5 Influence)" },
        delta: { treasury: -5, people: 10, influence: 5 },
      },
      {
        id: "B",
        text: { ru: "Удвоить плату (+15 Казна, -10 Народ)", en: "Double the toll (+15 Gold, -10 People)" },
        delta: { treasury: 15, people: -10 },
      },
    ],
  },
  {
    id: "jester_parody",
    characterId: "jester",
    text: {
      ru: "Звенят бубенцы, милорд! Разрешите я на ярмарке спародирую толстого епископа?",
      en: "Bells jingle, My Lord! May I mock the fat bishop at the feast today?",
    },
    choices: [
      {
        id: "A",
        text: { ru: "Повесели народ (+10 Народ, -10 Влияние)", en: "Entertain the folk (+10 People, -10 Influence)" },
        delta: { people: 10, influence: -10 },
      },
      {
        id: "B",
        text: { ru: "В колодки за дерзость (-5 Народ, +5 Влияние)", en: "To the pillory (-5 People, +5 Influence)" },
        delta: { people: -5, influence: 5 },
      },
    ],
  },
  {
    id: "general_drills",
    characterId: "general",
    text: {
      ru: "Солдаты обленились без войны. Требуются внеплановые учения и закупка нового оружия.",
      en: "The soldiers grow lax without war. We need mandatory drills and new iron pikes.",
    },
    choices: [
      {
        id: "A",
        text: { ru: "Провести учения (-10 Казна, +15 Армия)", en: "Fund drills (-10 Gold, +15 Army)" },
        delta: { treasury: -10, army: 15 },
      },
      {
        id: "B",
        text: { ru: "Отставить траты (-10 Армия, +5 Казна)", en: "Save the gold (-10 Army, +5 Gold)" },
        delta: { army: -10, treasury: 5 },
      },
    ],
  },
];
