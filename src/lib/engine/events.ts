import { GameEvent } from "./types";
import raw200 from "./events_200.json";

export const EVENTS: GameEvent[] = raw200 as unknown as GameEvent[];
