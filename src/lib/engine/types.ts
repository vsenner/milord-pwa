export type Language = "ru" | "en";

export interface ResourceStats {
  treasury: number;  // 0 - 100
  influence: number; // 0 - 100
  people: number;    // 0 - 100
  army: number;      // 0 - 100
}

export type StatKey = keyof ResourceStats;

export interface LocalizedString {
  ru: string;
  en: string;
}

export type StoryFlags = Record<string, string | number | boolean>;

export interface Choice {
  id: "A" | "B";
  text: LocalizedString;
  spokenOption?: LocalizedString;
  aftermath?: LocalizedString;
  delta: Partial<ResourceStats>;
  setFlags?: StoryFlags;
}

export interface Character {
  id: string;
  name: LocalizedString;
  role: LocalizedString;
  avatar: string;
}

export interface GameEvent {
  id: string;
  characterId: string;
  text: LocalizedString;
  choices: [Choice, Choice];
  weight?: number;
  condition?: (stats: ResourceStats, flags: StoryFlags) => boolean;
}

export type GameOverCause =
  | "treasury_empty"
  | "treasury_overflow"
  | "influence_empty"
  | "influence_overflow"
  | "people_empty"
  | "people_overflow"
  | "army_empty"
  | "army_overflow";

export interface EndCondition {
  cause: GameOverCause;
  message: LocalizedString;
}

export interface RunState {
  day: number;
  stats: ResourceStats;
  flags: StoryFlags;
  isGameOver: boolean;
  endCondition: EndCondition | null;
}
