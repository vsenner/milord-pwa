import { GameEvent } from "./types";

export const EXPANDED_EVENTS: GameEvent[] = [
  {
    id: "inquisitor_witch",
    characterId: "bishop",
    text: {
      ru: "В северной деревне поймали знахарку. Инквизиция требует костра, но крестьяне бунтуют!",
      en: "A herbalist was caught in the north. The Inquisition demands the stake, but peasants riot!",
    },
    choices: [
      {
        id: "A",
        text: { ru: "Отдать инквизиции (+15 Влияние, -15 Народ)", en: "Give to Inquisition (+15 Influence, -15 People)" },
        delta: { influence: 15, people: -15 },
      },
      {
        id: "B",
        text: { ru: "Помиловать и взять лекарем (-15 Влияние, +15 Народ)", en: "Pardon as court doctor (-15 Influence, +15 People)" },
        delta: { influence: -15, people: 15 },
      },
    ],
  },
  {
    id: "treasurer_mint",
    characterId: "treasurer",
    text: {
      ru: "Милорд, мы можем тайно подмешать медь в золотые монеты. Казна быстро наполнится!",
      en: "My Lord, we can secretly debase gold coins with copper. The treasury will soar!",
    },
    choices: [
      {
        id: "A",
        text: { ru: "Чеканить порченую монету (+20 Казна, -15 Народ)", en: "Debase currency (+20 Gold, -15 People)" },
        delta: { treasury: 20, people: -15 },
      },
      {
        id: "B",
        text: { ru: "Сохранить чистоту золота (-10 Казна, +10 Влияние)", en: "Keep currency pure (-10 Gold, +10 Influence)" },
        delta: { treasury: -10, influence: 10 },
      },
    ],
  },
  {
    id: "general_rebellion",
    characterId: "general",
    text: {
      ru: "Горные кланы отказываются платить ясак. Позвольте мне сравнять их крепости с землей!",
      en: "Highland clans refuse to swear fealty. Permit me to raze their mountain hold!",
    },
    choices: [
      {
        id: "A",
        text: { ru: "Карательный поход (-10 Армия, +15 Влияние, +10 Казна)", en: "Crush them (-10 Army, +15 Influence, +10 Gold)" },
        delta: { army: -10, influence: 15, treasury: 10 },
      },
      {
        id: "B",
        text: { ru: "Предложить автономию (+10 Народ, -10 Влияние)", en: "Offer autonomy (+10 People, -10 Influence)" },
        delta: { people: 10, influence: -10 },
      },
    ],
  },
  {
    id: "merchant_fleet",
    characterId: "merchant",
    text: {
      ru: "Заморская экспедиция за пряностями требует снаряжения трех каравелл. Риск велик!",
      en: "A spice expedition across the sea requires three caravels. High risk, immense profit!",
    },
    choices: [
      {
        id: "A",
        text: { ru: "Профинансировать флот (-20 Казна, +10 Влияние)", en: "Finance fleet (-20 Gold, +10 Influence)" },
        delta: { treasury: -20, influence: 10 },
      },
      {
        id: "B",
        text: { ru: "Отказать в рисковой авантюре (+5 Казна)", en: "Decline risky voyage (+5 Gold)" },
        delta: { treasury: 5 },
      },
    ],
  },
  {
    id: "peasant_festival",
    characterId: "peasant",
    text: {
      ru: "Праздник осеннего солнцестояния! Народ просит бочку эля и жареных быков на площади.",
      en: "Autumn solstice feast! The folk beg for ale barrels and roasted oxen in the square.",
    },
    choices: [
      {
        id: "A",
        text: { ru: "Устроить гуляния (-10 Казна, +20 Народ)", en: "Host the festival (-10 Gold, +20 People)" },
        delta: { treasury: -10, people: 20 },
      },
      {
        id: "B",
        text: { ru: "Пусть молятся в тишине (-10 Народ, +5 Влияние)", en: "Prayer instead of ale (-10 People, +5 Influence)" },
        delta: { people: -10, influence: 5 },
      },
    ],
  },
  {
    id: "herald_princess",
    characterId: "herald",
    text: {
      ru: "Посольство соседнего герцогства предлагает династический брак. Они сильны оружием!",
      en: "Envoys of the neighboring duchy offer a royal marriage. Their iron army is vast!",
    },
    choices: [
      {
        id: "A",
        text: { ru: "Сыграть свадьбу (+15 Армия, +10 Влияние, -10 Казна)", en: "Accept alliance (+15 Army, +10 Influence, -10 Gold)" },
        delta: { army: 15, influence: 10, treasury: -10 },
      },
      {
        id: "B",
        text: { ru: "Гордо отказать (-10 Влияние, +5 Народ)", en: "Proudly reject (-10 Influence, +5 People)" },
        delta: { influence: -10, people: 5 },
      },
    ],
  },
];
