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
      isSpeaking: false,
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
      narrateEvent: (event, onEnd) => {
        const { language } = get();
        set({ isSpeaking: true });

        // Build dramatic spoken text: Situation, then Option 1, then Option 2
        const text =
          language === "ru"
            ? `${event.text.ru}. Вариант первый: ${event.choices[0].text.ru}. Вариант второй: ${event.choices[1].text.ru}. Каково ваше решение, милорд?`
            : `${event.text.en}. Option one: ${event.choices[0].text.en}. Option two: ${event.choices[1].text.en}. What is your command, My Lord?`;

        soundFx.speak(text, event.characterId, language, () => {
          set({ isSpeaking: false });
          onEnd?.();
        });
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
          const msg = nextRun.endCondition ? nextRun.endCondition.message[get().language] : "Конец";
          soundFx.speak(msg, "herald", get().language);
        } else {
          // Play decision effect: coins, crowd or sword
          if (choice.delta.treasury && choice.delta.treasury > 0) {
            soundFx.play("coins");
          } else if (choice.delta.people && choice.delta.people > 0) {
            soundFx.play("crowd");
          } else if (choice.delta.army && choice.delta.army > 0) {
            soundFx.play("horns");
          } else {
            soundFx.play("sword");
          }

          // Sequence: Messenger arrives with hooves sound, then narrates options
          setTimeout(() => {
            soundFx.play("hooves");
            setTimeout(() => {
              get().narrateEvent(nextEvent);
            }, 600);
          }, 400);
        }

        set({
          run: nextRun,
          currentEvent: nextEvent,
          history: [{ day: run.day, eventId: currentEvent.id, choice: choiceId }, ...history],
        });
      },
      restartGame: () => {
        soundFx.play("hooves");
        const ev = getRandomEvent();
        set({
          run: initialRunState,
          currentEvent: ev,
          history: [],
        });
        setTimeout(() => {
          get().narrateEvent(ev);
        }, 500);
      },
      setIsListening: (val) => set({ isListening: val }),
      setIsSpeaking: (val) => set({ isSpeaking: val }),
    }),
    {
      name: "milord-game-storage",
    }
  )
);
