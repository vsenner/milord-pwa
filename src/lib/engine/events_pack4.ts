import { GameEvent } from "./types";

export const EXPANDED_EVENTS_PACK4: GameEvent[] = [
  {
    id: "peasant_poachers",
    characterId: "peasant",
    text: {
      ru: "Голодающие крестьяне застрелили королевского оленя в заповедной пуще. Закон требует повесить всех!",
      en: "Starving peasants slew a royal stag in the crown woods. The law mandates hanging them all!",
    },
    choices: [
      {
        id: "A",
        text: { ru: "Повесить браконьеров (-20 Народ, +15 Влияние)", en: "Hang the poachers (-20 People, +15 Influence)" },
        delta: { people: -20, influence: 15 },
      },
      {
        id: "B",
        text: { ru: "Заменить казнь штрафом (+15 Народ, -10 Влияние, +5 Казна)", en: "Impose a fine (+15 People, -10 Influence, +5 Gold)" },
        delta: { people: 15, influence: -10, treasury: 5 },
      },
    ],
  },
  {
    id: "general_siege_engine",
    characterId: "general",
    text: {
      ru: "Наши инженеры разработали гигантский требушет. Требуются деньги на испытания в поле.",
      en: "Our engineers designed a monstrous trebuchet. We need funding to test it on the field.",
    },
    choices: [
      {
        id: "A",
        text: { ru: "Построить орудие (-15 Казна, +20 Армия)", en: "Build the engine (-15 Gold, +20 Army)" },
        delta: { treasury: -15, army: 20 },
      },
      {
        id: "B",
        text: { ru: "Оружейникам урезать паек (-10 Армия, +10 Казна)", en: "Slash siege budget (-10 Army, +10 Gold)" },
        delta: { army: -10, treasury: 10 },
      },
    ],
  },
  {
    id: "bishop_relic",
    characterId: "bishop",
    text: {
      ru: "Крестоносцы привезли мощи святого мученика. Выкупим ли их для нашего аббатства?",
      en: "Crusaders brought the relic bone of a holy martyr. Shall we purchase it for the abbey?",
    },
    choices: [
      {
        id: "A",
        text: { ru: "Выкупить реликвию (-20 Казна, +20 Влияние)", en: "Buy the relic (-20 Gold, +20 Influence)" },
        delta: { treasury: -20, influence: 20 },
      },
      {
        id: "B",
        text: { ru: "Это кость барана! (-15 Влияние, +10 Казна)", en: "It is a sheep bone! (-15 Influence, +10 Gold)" },
        delta: { influence: -15, treasury: 10 },
      },
    ],
  },
  {
    id: "herald_quarantine",
    characterId: "herald",
    text: {
      ru: "В южных портах свирепствует моровая язва. Запереть городские врата и остановить всю торговлю?",
      en: "Black pestilence strikes southern docks! Shut the gates and halt all incoming trade?",
    },
    choices: [
      {
        id: "A",
        text: { ru: "Жесткий карантин (-20 Казна, +15 Народ)", en: "Total quarantine (-20 Gold, +15 People)" },
        delta: { treasury: -20, people: 15 },
      },
      {
        id: "B",
        text: { ru: "Торговля важнее (+10 Казна, -25 Народ)", en: "Keep gates open (+10 Gold, -25 People)" },
        delta: { treasury: 10, people: -25 },
      },
    ],
  },
  {
    id: "jester_prophecy",
    characterId: "jester",
    text: {
      ru: "В небесах видели хвостатую комету! Шут кричит о конце света, стража в панике.",
      en: "A blazing comet swept the night sky! The jester yells of doom, and soldiers tremble.",
    },
    choices: [
      {
        id: "A",
        text: { ru: "Объявить пост и молебен (+15 Влияние, -10 Армия)", en: "Call for solemn prayer (+15 Influence, -10 Army)" },
        delta: { influence: 15, army: -10 },
      },
      {
        id: "B",
        text: { ru: "Высечь паникеров (-15 Народ, +15 Армия)", en: "Whip the doomsayers (-15 People, +15 Army)" },
        delta: { people: -15, army: 15 },
      },
    ],
  },
];
