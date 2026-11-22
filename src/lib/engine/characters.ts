import { Character } from "./types";

export const CHARACTERS: Record<string, Character> = {
  herald: {
    id: "herald",
    name: { ru: "Королевский гонец", en: "Royal Herald" },
    role: { ru: "Вестник столицы", en: "Crown Courier" },
    avatar: "🎺",
  },
  treasurer: {
    id: "treasurer",
    name: { ru: "Казначей Бернар", en: "Treasurer Bernard" },
    role: { ru: "Хранитель казны", en: "Master of Coin" },
    avatar: "💰",
  },
  general: {
    id: "general",
    name: { ru: "Воевода Родриг", en: "Marshal Roderick" },
    role: { ru: "Командующий стражей", en: "Commander of Guards" },
    avatar: "⚔️",
  },
  bishop: {
    id: "bishop",
    name: { ru: "Епископ Ансельм", en: "Bishop Anselm" },
    role: { ru: "Глава святого ордена", en: "Head of Holy Order" },
    avatar: "⛪",
  },
  peasant: {
    id: "peasant",
    name: { ru: "Староста Фома", en: "Elder Thomas" },
    role: { ru: "Представитель общины", en: "Village Elder" },
    avatar: "🌾",
  },
  jester: {
    id: "jester",
    name: { ru: "Шут Пиппин", en: "Jester Pippin" },
    role: { ru: "Придворный остряк", en: "Court Trickster" },
    avatar: "🎭",
  },
  merchant: {
    id: "merchant",
    name: { ru: "Купец Вальтер", en: "Merchant Walter" },
    role: { ru: "Глава гильдии купцов", en: "Guildmaster" },
    avatar: "🚢",
  },
};
