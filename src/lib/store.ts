import { create } from "zustand";
import { persist } from "zustand/middleware";
import { RunState, GameEvent, Language } from "./engine/types";
import { INITIAL_STATS, applyChoice } from "./engine/mechanics";
import { EVENTS } from "./engine/events";
import { soundFx } from "./audio";

export interface KingdomProfile {
  id: string;
  name: string;
  motto: string;
  language: Language;
}

interface GameStore {
  language: Language;
  run: RunState;
  currentEvent: GameEvent;
  history: { day: number; eventId: string; choice: "A" | "B" }[];
  isListening: boolean;
  isMuted: boolean;
  kingdoms: KingdomProfile[];
  activeKingdomId: string;
  setLanguage: (lang: Language) => void;
  makeDecision: (choiceId: "A" | "B") => void;
  restartGame: () => void;
  setIsListening: (val: boolean) => void;
  toggleMute: () => void;
  createKingdom: (name: string, motto: string) => void;
  selectKingdom: (kingdom: KingdomProfile) => void;
}

const defaultKingdoms: KingdomProfile[] = [
  { id: "k-1", name: "Винтерхолд", motto: "Честь и железо", language: "ru" },
];

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
      isMuted: false,
      kingdoms: defaultKingdoms,
      activeKingdomId: "k-1",
      setLanguage: (lang) => set({ language: lang }),
      toggleMute: () => {
        const muted = soundFx.toggleMute();
        set({ isMuted: muted });
      },
      createKingdom: (name, motto) => {
        const { kingdoms, language } = get();
        const newK: KingdomProfile = {
          id: `k-${Date.now()}`,
          name,
          motto,
          language,
        };
        set({
          kingdoms: [...kingdoms, newK],
          activeKingdomId: newK.id,
          run: initialRunState,
          currentEvent: getRandomEvent(),
          history: [],
        });
        soundFx.play("bell");
      },
      selectKingdom: (k) => {
        set({
          activeKingdomId: k.id,
          language: k.language,
          run: initialRunState,
          currentEvent: getRandomEvent(),
          history: [],
        });
        soundFx.play("bell");
      },
      makeDecision: (choiceId) => {
        const { run, currentEvent, history } = get();
        if (run.isGameOver) return;

        const choice = currentEvent.choices.find((c) => c.id === choiceId);
        if (!choice) return;

        const nextRun = applyChoice(run, choice);
        const nextEvent = getRandomEvent(currentEvent.id);

        if (nextRun.isGameOver) {
          soundFx.play("death");
          soundFx.speak(
            nextRun.endCondition ? nextRun.endCondition.message[get().language] : "Конец",
            get().language
          );
        } else {
          if (choiceId === "A") {
            soundFx.play("coins");
          } else {
            soundFx.play("sword");
          }

          // Sequence: Sound effect -> Messenger speech
          setTimeout(() => {
            soundFx.play("hooves");
            soundFx.speak(nextEvent.text[get().language], get().language);
          }, 300);
        }

        set({
          run: nextRun,
          currentEvent: nextEvent,
          history: [{ day: run.day, eventId: currentEvent.id, choice: choiceId }, ...history],
        });
      },
      restartGame: () => {
        soundFx.play("hooves");
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
