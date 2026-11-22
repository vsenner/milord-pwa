import { Character } from "./types";

export const CHARACTERS: Record<string, Character> = {
  herald: {
    id: "herald",
    name: { ru: "Королевский глашатай", en: "Crown Herald" },
    role: { ru: "Вестник столицы", en: "Royal Courier" },
    avatar: "/images/characters/herald.svg",
  },
  treasurer: {
    id: "treasurer",
    name: { ru: "Казначей Бернар", en: "Treasurer Bernard" },
    role: { ru: "Хранитель казны", en: "Master of Coin" },
    avatar: "/images/characters/treasurer.svg",
  },
  general: {
    id: "general",
    name: { ru: "Воевода Родриг", en: "Marshal Roderick" },
    role: { ru: "Командующий стражей", en: "Commander of Guards" },
    avatar: "/images/characters/general.svg",
  },
  bishop: {
    id: "bishop",
    name: { ru: "Епископ Ансельм", en: "Bishop Anselm" },
    role: { ru: "Глава святого ордена", en: "Head of Holy Order" },
    avatar: "/images/characters/bishop.svg",
  },
  peasant: {
    id: "peasant",
    name: { ru: "Староста Фома", en: "Elder Thomas" },
    role: { ru: "Представитель общины", en: "Village Elder" },
    avatar: "/images/characters/peasant.svg",
  },
  jester: {
    id: "jester",
    name: { ru: "Шут Пиппин", en: "Jester Pippin" },
    role: { ru: "Придворный остряк", en: "Court Trickster" },
    avatar: "/images/characters/jester.svg",
  },
  merchant: {
    id: "merchant",
    name: { ru: "Купец Вальтер", en: "Merchant Walter" },
    role: { ru: "Глава гильдии купцов", en: "Guildmaster" },
    avatar: "/images/characters/merchant.svg",
  },
};
