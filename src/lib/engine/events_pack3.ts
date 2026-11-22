import { GameEvent } from "./types";

export const EXPANDED_EVENTS_PACK3: GameEvent[] = [
  {
    id: "alchemist_elixir",
    characterId: "jester",
    text: {
      ru: "Бродячий алхимик клянется, что сварил эликсир бессмертия. Но требует для опыта всю казну замка!",
      en: "A wandering alchemist claims to have brewed an immortality draught, demanding all castle gold!",
    },
    choices: [
      {
        id: "A",
        text: { ru: "Выпить зелье (-25 Казна, -15 Народ, +15 Влияние)", en: "Drink it (-25 Gold, -15 People, +15 Influence)" },
        delta: { treasury: -25, people: -15, influence: 15 },
      },
      {
        id: "B",
        text: { ru: "Казнить шарлатана (+5 Казна, +10 Народ)", en: "Execute charlatan (+5 Gold, +10 People)" },
        delta: { treasury: 5, people: 10 },
      },
    ],
  },
  {
    id: "treasurer_granary_tax",
    characterId: "treasurer",
    text: {
      ru: "Зерновые склады переполнены. Введем налог на хранение зерна для богатых землевладельцев?",
      en: "Granaries are bursting. Shall we impose a storage tax on wealthy landowners?",
    },
    choices: [
      {
        id: "A",
        text: { ru: "Ввести налог (+20 Казна, -15 Влияние)", en: "Tax landowners (+20 Gold, -15 Influence)" },
        delta: { treasury: 20, influence: -15 },
      },
      {
        id: "B",
        text: { ru: "Не злить дворян (-10 Казна, +10 Влияние)", en: "Do not anger nobility (-10 Gold, +10 Influence)" },
        delta: { treasury: -10, influence: 10 },
      },
    ],
  },
  {
    id: "general_crusade",
    characterId: "general",
    text: {
      ru: "Король призывает нас в священный поход за море! Отправим ли отборные полки рыцарей?",
      en: "The King summons our banners for an overseas crusade! Do we dispatch our elite knights?",
    },
    choices: [
      {
        id: "A",
        text: { ru: "Отправить войско (-25 Армия, +25 Влияние)", en: "Dispatch the army (-25 Army, +25 Influence)" },
        delta: { army: -25, influence: 25 },
      },
      {
        id: "B",
        text: { ru: "Откупиться золотом (-20 Казна, +5 Армия)", en: "Bribe your way out (-20 Gold, +5 Army)" },
        delta: { treasury: -20, army: 5 },
      },
    ],
  },
  {
    id: "bishop_heresy",
    characterId: "bishop",
    text: {
      ru: "В предместьях распространяется учение катаров. Сжечь еретические книги на рыночной площади?",
      en: "Cathar heresy spreads in the suburbs. Burn the unholy books in the market square?",
    },
    choices: [
      {
        id: "A",
        text: { ru: "Сжечь книги (+15 Влияние, -15 Народ)", en: "Burn the books (+15 Influence, -15 People)" },
        delta: { influence: 15, people: -15 },
      },
      {
        id: "B",
        text: { ru: "Сохранить их в архиве (-15 Влияние, +10 Народ)", en: "Preserve in archives (-15 Influence, +10 People)" },
        delta: { influence: -15, people: 10 },
      },
    ],
  },
  {
    id: "peasant_canal",
    characterId: "peasant",
    text: {
      ru: "Засуха губит озимые. Пророем оросительный канал от реки к крестьянским наделам?",
      en: "Drought ruins the crops. Dig an irrigation canal from the river to communal fields?",
    },
    choices: [
      {
        id: "A",
        text: { ru: "Мобилизовать солдат (-10 Армия, +20 Народ)", en: "Order soldiers to dig (-10 Army, +20 People)" },
        delta: { army: -10, people: 20 },
      },
      {
        id: "B",
        text: { ru: "Пусть копают сами (-15 Народ, +5 Казна)", en: "Let peasants dig alone (-15 People, +5 Gold)" },
        delta: { people: -15, treasury: 5 },
      },
    ],
  },
  {
    id: "merchant_bank",
    characterId: "merchant",
    text: {
      ru: "Купцы из Генуи предлагают открыть первый вексельный банк. Они просят особые привилегии.",
      en: "Genoese traders propose founding a promissory bank, requesting grand tax immunities.",
    },
    choices: [
      {
        id: "A",
        text: { ru: "Дать привилегии (+25 Казна, -15 Влияние)", en: "Grant charters (+25 Gold, -15 Influence)" },
        delta: { treasury: 25, influence: -15 },
      },
      {
        id: "B",
        text: { ru: "Прогнать ростовщиков (-10 Казна, +15 Народ)", en: "Expel usurers (-10 Gold, +15 People)" },
        delta: { treasury: -10, people: 15 },
      },
    ],
  },
  {
    id: "herald_tournament",
    characterId: "herald",
    text: {
      ru: "Знать жаждет рыцарского турнира в честь именин государя! Закатим ли невиданный пир?",
      en: "Nobles clamor for a grand tourney for the King's feast! Shall we host an opulent melee?",
    },
    choices: [
      {
        id: "A",
        text: { ru: "Устроить турнир (-20 Казна, +15 Армия, +15 Влияние)", en: "Host the melee (-20 Gold, +15 Army, +15 Influence)" },
        delta: { treasury: -20, army: 15, influence: 15 },
      },
      {
        id: "B",
        text: { ru: "Казна не резиновая (-15 Влияние, +10 Казна)", en: "Refuse tournament (-15 Influence, +10 Gold)" },
        delta: { influence: -15, treasury: 10 },
      },
    ],
  },
];
