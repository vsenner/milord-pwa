"use client";

import React, { useEffect, useState, useCallback, useTransition } from "react";
import { useGameStore } from "@/lib/store";
import { CHARACTERS } from "@/lib/engine/characters";
import { StatKey } from "@/lib/engine/types";
import { Coins, Crown, Users, Shield, Mic, MicOff, RotateCcw, Languages } from "lucide-react";

export default function GameBoard() {
  const [mounted, setMounted] = useState(false);
  const [, startTransition] = useTransition();

  const {
    language,
    run,
    currentEvent,
    isListening,
    setLanguage,
    makeDecision,
    restartGame,
    setIsListening,
  } = useGameStore();

  useEffect(() => {
    setMounted(true);
  }, []);

  const handleSpeech = useCallback(() => {
    if (typeof window === "undefined") return;
    interface SpeechRecognitionEvent {
      results: {
        [index: number]: {
          [index: number]: {
            transcript: string;
          };
        };
      };
    }

    interface SpeechRecognitionInstance {
      lang: string;
      interimResults: boolean;
      continuous: boolean;
      onstart: () => void;
      onend: () => void;
      onerror: () => void;
      onresult: (event: SpeechRecognitionEvent) => void;
      start: () => void;
    }

    type SpeechRecognitionConstructor = new () => SpeechRecognitionInstance;

    const windowWithSpeech = window as unknown as {
      SpeechRecognition?: SpeechRecognitionConstructor;
      webkitSpeechRecognition?: SpeechRecognitionConstructor;
    };

    const SpeechRecognition =
      windowWithSpeech.SpeechRecognition ||
      windowWithSpeech.webkitSpeechRecognition;

    if (!SpeechRecognition) {
      alert(language === "ru" ? "Голосовой ввод не поддерживается" : "Speech recognition not supported");
      return;
    }

    if (isListening) {
      setIsListening(false);
      return;
    }

    try {
      const recognition = new SpeechRecognition();
      recognition.lang = language === "ru" ? "ru-RU" : "en-US";
      recognition.interimResults = false;
      recognition.continuous = false;

      recognition.onstart = () => setIsListening(true);
      recognition.onend = () => setIsListening(false);
      recognition.onerror = () => setIsListening(false);

      recognition.onresult = (e: SpeechRecognitionEvent) => {
        const text = e.results[0][0].transcript.toLowerCase();
        if (text.includes("да") || text.includes("согласен") || text.includes("yes") || text.includes("agree")) {
          makeDecision("A");
        } else if (text.includes("нет") || text.includes("отказать") || text.includes("no") || text.includes("refuse")) {
          makeDecision("B");
        }
      };

      recognition.start();
    } catch {
      setIsListening(false);
    }
  }, [isListening, language, makeDecision, setIsListening]);

  if (!mounted) return null;

  const char = CHARACTERS[currentEvent.characterId] || {
    name: { ru: "Незнакомец", en: "Stranger" },
    role: { ru: "Странник", en: "Traveler" },
    avatar: "👤",
  };

  const statIcons: Record<StatKey, { icon: React.ReactNode; label: { ru: string; en: string }; color: string }> = {
    treasury: { icon: <Coins className="w-4 h-4" />, label: { ru: "Казна", en: "Gold" }, color: "text-amber-400" },
    influence: { icon: <Crown className="w-4 h-4" />, label: { ru: "Власть", en: "Influence" }, color: "text-purple-400" },
    people: { icon: <Users className="w-4 h-4" />, label: { ru: "Народ", en: "People" }, color: "text-emerald-400" },
    army: { icon: <Shield className="w-4 h-4" />, label: { ru: "Армия", en: "Army" }, color: "text-red-400" },
  };

  return (
    <main className="min-h-screen bg-slate-950 text-slate-100 flex flex-col justify-between max-w-md mx-auto p-4 border-x border-slate-800 select-none">
      <header className="space-y-3">
        <div className="flex justify-between items-center text-xs text-slate-400">
          <span className="font-semibold uppercase tracking-wider text-amber-500">
            {language === "ru" ? `День ${run.day}` : `Day ${run.day}`}
          </span>
          <div className="flex gap-2">
            <button
              onClick={() => startTransition(() => setLanguage(language === "ru" ? "en" : "ru"))}
              className="px-2 py-1 bg-slate-900 border border-slate-800 rounded flex items-center gap-1 hover:bg-slate-800"
            >
              <Languages className="w-3 h-3 text-slate-400" />
              <span className="uppercase text-[10px] font-bold">{language}</span>
            </button>
            <button
              onClick={restartGame}
              className="p-1 bg-slate-900 border border-slate-800 rounded hover:bg-slate-800"
              title="Перезапуск"
            >
              <RotateCcw className="w-3.5 h-3.5 text-slate-400" />
            </button>
          </div>
        </div>

        <div className="grid grid-cols-4 gap-2">
          {(Object.keys(statIcons) as StatKey[]).map((key) => {
            const val = run.stats[key];
            const meta = statIcons[key];
            return (
              <div key={key} className="bg-slate-900/80 border border-slate-800 rounded-lg p-2 text-center">
                <div className={`flex justify-center mb-1 ${meta.color}`}>{meta.icon}</div>
                <div className="text-[10px] text-slate-400">{meta.label[language]}</div>
                <div className="text-xs font-bold">{val}%</div>
                <div className="w-full bg-slate-800 h-1 rounded-full mt-1 overflow-hidden">
                  <div
                    className="h-full bg-amber-500 transition-all duration-300"
                    style={{ width: `${Math.min(100, Math.max(0, val))}%` }}
                  />
                </div>
              </div>
            );
          })}
        </div>
      </header>

      <section className="my-auto py-6">
        {run.isGameOver ? (
          <div className="bg-slate-900 border border-red-900/50 rounded-xl p-6 text-center space-y-4">
            <div className="text-4xl">💀</div>
            <h2 className="text-lg font-bold text-red-400">
              {language === "ru" ? "Правление окончено" : "Reign Ended"}
            </h2>
            <p className="text-sm text-slate-300 leading-relaxed">
              {run.endCondition?.message[language]}
            </p>
            <div className="text-xs text-slate-500">
              {language === "ru" ? `Вы продержались у власти ${run.day} дней.` : `You lasted ${run.day} days.`}
            </div>
            <button
              onClick={restartGame}
              className="w-full py-2.5 bg-amber-600 hover:bg-amber-500 text-slate-950 font-bold rounded-lg text-sm transition"
            >
              {language === "ru" ? "Начать заново" : "Play Again"}
            </button>
          </div>
        ) : (
          <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-5 shadow-2xl relative">
            <div className="flex items-center gap-3 mb-4">
              <div className="text-3xl p-2 bg-slate-800/80 rounded-xl border border-slate-700">
                {char.avatar}
              </div>
              <div>
                <h3 className="font-bold text-sm text-slate-100">{char.name[language]}</h3>
                <span className="text-[11px] text-amber-400/80 font-medium">{char.role[language]}</span>
              </div>
            </div>

            <p className="text-sm text-slate-200 leading-relaxed min-h-[72px]">
              {currentEvent.text[language]}
            </p>

            <div className="mt-6 flex flex-col gap-2">
              <button
                onClick={() => makeDecision("A")}
                className="w-full py-2.5 px-3 bg-slate-800/90 hover:bg-slate-700/80 border border-slate-700 rounded-xl text-left text-xs font-medium text-slate-200 transition"
              >
                <span className="text-amber-400 font-bold mr-2">1.</span>
                {currentEvent.choices[0].text[language]}
              </button>
              <button
                onClick={() => makeDecision("B")}
                className="w-full py-2.5 px-3 bg-slate-800/90 hover:bg-slate-700/80 border border-slate-700 rounded-xl text-left text-xs font-medium text-slate-200 transition"
              >
                <span className="text-amber-400 font-bold mr-2">2.</span>
                {currentEvent.choices[1].text[language]}
              </button>
            </div>
          </div>
        )}
      </section>

      {!run.isGameOver && (
        <footer className="pt-2 pb-4 text-center space-y-2">
          <button
            onClick={handleSpeech}
            className={`px-4 py-2 rounded-full border text-xs font-semibold flex items-center justify-center gap-2 mx-auto transition ${
              isListening
                ? "bg-red-500/20 border-red-500 text-red-300 animate-pulse"
                : "bg-slate-900 border-slate-800 text-slate-400 hover:text-slate-200"
            }`}
          >
            {isListening ? <Mic className="w-4 h-4 text-red-400" /> : <MicOff className="w-4 h-4" />}
            <span>
              {isListening
                ? language === "ru" ? "Слушаю вас, милорд..." : "Listening, My Lord..."
                : language === "ru" ? "Голосовое управление (Да / Нет)" : "Voice Control (Yes / No)"}
            </span>
          </button>
        </footer>
      )}
    </main>
  );
}
