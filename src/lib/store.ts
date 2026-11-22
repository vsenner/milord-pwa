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
  isSpeaking: boolean;
  isMuted: boolean;
  activeAftermath: string | null;
  kingdoms: KingdomProfile[];
  activeKingdomId: string;
  setLanguage: (lang: Language) => void;
  makeDecision: (choiceId: "A" | "B") => void;
  restartGame: () => void;
  setIsListening: (val: boolean) => void;
  setIsSpeaking: (val: boolean) => void;
  toggleMute: () => void;
  createKingdom: (name: string, motto: string) => void;
  selectKingdom: (kingdom: KingdomProfile) => void;
  narrateEvent: (event: GameEvent, onEnd?: () => void) => void;
}

const defaultKingdoms: KingdomProfile[] = [
  { id: "k-1", name: "Винтерхолд", motto: "Честь и железо", language: "ru" },
];

function getRandomEvent(excludeIds: string[] = []): GameEvent {
  const pool = EVENTS.filter((e) => !excludeIds.includes(e.id));
  const chosenPool = pool.length > 0 ? pool : EVENTS;
  return chosenPool[Math.floor(Math.random() * chosenPool.length)] ?? EVENTS[0];
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
      isSpeaking: false,
      isMuted: false,
      activeAftermath: null,
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
          activeAftermath: null,
        });
        soundFx.playSfx("bell");
      },
      selectKingdom: (k) => {
        set({
          activeKingdomId: k.id,
          language: k.language,
          run: initialRunState,
          currentEvent: getRandomEvent(),
          history: [],
          activeAftermath: null,
        });
        soundFx.playSfx("bell");
      },
      narrateEvent: (event, onEnd) => {
        set({ isSpeaking: true, activeAftermath: null });
        const audioUrl = `/audio/narrations/${event.id}_prompt.mp3`;
        soundFx.playFile(audioUrl, () => {
          set({ isSpeaking: false });
          onEnd?.();
        });
      },
      makeDecision: (choiceId) => {
        const { run, currentEvent, history, language } = get();
        if (run.isGameOver) return;

        const choice = currentEvent.choices.find((c) => c.id === choiceId);
        if (!choice) return;

        const nextRun = applyChoice(run, choice);
        const recentIds = history.slice(0, 10).map((h) => h.eventId);
        const nextEvent = getRandomEvent([...recentIds, currentEvent.id]);
        const aftermathText = choice.aftermath ? choice.aftermath[language] : null;

        set({
          run: nextRun,
          currentEvent: nextEvent,
          activeAftermath: aftermathText,
          isSpeaking: true,
          history: [{ day: run.day, eventId: currentEvent.id, choice: choiceId }, ...history],
        });

        // 1. Play immediate visceral SFX (coins clink, sword clash, crowd roar)
        if (choice.delta.treasury && choice.delta.treasury > 0) {
          soundFx.playSfx("coins");
        } else if (choice.delta.people && choice.delta.people > 0) {
          soundFx.playSfx("crowd");
        } else if (choice.delta.army && choice.delta.army > 0) {
          soundFx.playSfx("sword");
        } else {
          soundFx.playSfx("bell");
        }

        // 2. Play consequence voice narration (post-factum reaction)
        const aftermathUrl = `/audio/narrations/${currentEvent.id}_aftermath_${choiceId.toLowerCase()}.mp3`;

        setTimeout(() => {
          soundFx.playFile(aftermathUrl, () => {
            if (nextRun.isGameOver) {
              soundFx.playSfx("death");
              set({ isSpeaking: false });
            } else {
              // 3. New courier approaches: hooves gallop
              setTimeout(() => {
                soundFx.playSfx("hooves", () => {
                  // 4. Narrate next incoming event
                  get().narrateEvent(nextEvent);
                });
              }, 400);
            }
          });
        }, 500);
      },
      restartGame: () => {
        soundFx.playSfx("hooves");
        const ev = getRandomEvent();
        set({
          run: initialRunState,
          currentEvent: ev,
          history: [],
          activeAftermath: null,
        });
        setTimeout(() => {
          get().narrateEvent(ev);
        }, 600);
      },
      setIsListening: (val) => set({ isListening: val }),
      setIsSpeaking: (val) => set({ isSpeaking: val }),
    }),
    {
      name: "milord-game-storage",
    }
  )
);
