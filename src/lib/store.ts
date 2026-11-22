import { create } from "zustand";
import { persist } from "zustand/middleware";
import { RunState, GameEvent, Language } from "./engine/types";
import { INITIAL_STATS, applyChoice } from "./engine/mechanics";
import { EVENTS } from "./engine/events";

interface GameStore {
  language: Language;
  run: RunState;
  currentEvent: GameEvent;
  history: { day: number; eventId: string; choice: "A" | "B" }[];
  isListening: boolean;
  setLanguage: (lang: Language) => void;
  makeDecision: (choiceId: "A" | "B") => void;
  restartGame: () => void;
  setIsListening: (val: boolean) => void;
}

function getRandomEvent(excludeId?: string): GameEvent {
  const pool = EVENTS.filter((e) => e.id !== excludeId);
  return pool[Math.floor(Math.random() * pool.length)] ?? EVENTS[0];
}

const initialRunState: RunState = {
  day: 1,
  stats: INITIAL_STATS,
  flags: {},
  isGameOver: false,
  endCondition: null,
};

export const useGameStore = create<GameStore>()(
  persist(
    (set, get) => ({
      language: "ru",
      run: initialRunState,
      currentEvent: EVENTS[0],
      history: [],
      isListening: false,
      setLanguage: (lang) => set({ language: lang }),
      makeDecision: (choiceId) => {
        const { run, currentEvent, history } = get();
        if (run.isGameOver) return;

        const choice = currentEvent.choices.find((c) => c.id === choiceId);
        if (!choice) return;

        const nextRun = applyChoice(run, choice);
        const nextEvent = getRandomEvent(currentEvent.id);

        set({
          run: nextRun,
          currentEvent: nextEvent,
          history: [{ day: run.day, eventId: currentEvent.id, choice: choiceId }, ...history],
        });
      },
      restartGame: () => {
        set({
          run: initialRunState,
          currentEvent: getRandomEvent(),
          history: [],
        });
      },
      setIsListening: (val) => set({ isListening: val }),
    }),
    {
      name: "milord-game-storage",
    }
  )
);
