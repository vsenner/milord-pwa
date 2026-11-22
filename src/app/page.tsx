"use client";

import React, { useEffect, useState, useCallback, useTransition, useRef } from "react";
import { useGameStore } from "@/lib/store";
import { StatKey } from "@/lib/engine/types";
import {
  Coins,
  Crown,
  Users,
  Shield,
  Mic,
  MicOff,
  RotateCcw,
  Languages,
  Volume2,
  VolumeX,
  Volume1,
  Sparkles,
  User,
} from "lucide-react";
import { EventCard } from "@/components/EventCard";
import { KingdomSelector } from "@/components/KingdomSelector";
import { StartScreen } from "@/components/StartScreen";
import { AuthModal } from "@/components/AuthModal";
import { soundFx } from "@/lib/audio";
import { authClient } from "@/lib/auth-client";

interface SpeechResultEvent {
  results: {
    length: number;
    [index: number]: {
      [index: number]: {
        transcript: string;
      };
    };
  };
}

interface SpeechInstance {
  lang: string;
  interimResults: boolean;
  continuous: boolean;
  onstart: () => void;
  onend: () => void;
  onerror: () => void;
  onresult: (event: SpeechResultEvent) => void;
  start: () => void;
  stop: () => void;
}

export default function GameBoard() {
  const [mounted, setMounted] = useState(false);
  const [hasStarted, setHasStarted] = useState(false);
  const [isAuthOpen, setIsAuthOpen] = useState(false);
  const [currentUser, setCurrentUser] = useState<{ name?: string | null; email?: string | null } | null>(null);
  const recognitionRef = useRef<SpeechInstance | null>(null);
  const [, startTransition] = useTransition();

  const {
    language,
    run,
    currentEvent,
    isListening,
    isSpeaking,
    isMuted,
    activeAftermath,
    kingdoms,
    activeKingdomId,
    setLanguage,
    makeDecision,
    restartGame,
    setIsListening,
    toggleMute,
    createKingdom,
    selectKingdom,
    narrateEvent,
  } = useGameStore();

  useEffect(() => {
    setMounted(true);
    authClient.getSession().then((session) => {
      if (session?.data?.user) {
        setCurrentUser(session.data.user);
      }
    });
  }, []);

  const handleStartGame = () => {
    soundFx.init();
    soundFx.playSfx("hooves");
    setHasStarted(true);
    setTimeout(() => {
      narrateEvent(currentEvent);
    }, 600);
  };

  const handleSpeech = useCallback(() => {
    if (typeof window === "undefined") return;

    const windowWithSpeech = window as unknown as {
      SpeechRecognition?: new () => SpeechInstance;
      webkitSpeechRecognition?: new () => SpeechInstance;
    };
    const SpeechConstructor =
      windowWithSpeech.SpeechRecognition || windowWithSpeech.webkitSpeechRecognition;

    if (!SpeechConstructor) {
      alert(
        language === "ru"
          ? "Голосовой ввод не поддерживается вашим браузером. Используйте Chrome или Safari."
          : "Speech recognition not supported in this browser. Use Chrome or Safari."
      );
      return;
    }

    if (isListening && recognitionRef.current) {
      recognitionRef.current.stop();
      setIsListening(false);
      return;
    }

    try {
      const recognition = new SpeechConstructor();
      recognition.lang = language === "ru" ? "ru-RU" : "en-US";
      recognition.interimResults = false;
      recognition.continuous = true;

      recognition.onstart = () => setIsListening(true);
      recognition.onend = () => setIsListening(false);
      recognition.onerror = () => setIsListening(false);

      recognition.onresult = (e: SpeechResultEvent) => {
        const lastIndex = e.results.length - 1;
        const text = e.results[lastIndex][0].transcript.toLowerCase();

        // Option 1 / Yes / Approve
        if (
          text.includes("да") ||
          text.includes("согласен") ||
          text.includes("первый") ||
          text.includes("один") ||
          text.includes("казни") ||
          text.includes("изволю") ||
          text.includes("yes") ||
          text.includes("agree") ||
          text.includes("first") ||
          text.includes("one")
        ) {
          makeDecision("A");
        }
        // Option 2 / No / Refuse
        else if (
          text.includes("нет") ||
          text.includes("отказать") ||
          text.includes("второй") ||
          text.includes("два") ||
          text.includes("помилуй") ||
          text.includes("хватит") ||
          text.includes("no") ||
          text.includes("refuse") ||
          text.includes("second") ||
          text.includes("two")
        ) {
          makeDecision("B");
        }
      };

      recognition.start();
      recognitionRef.current = recognition;
    } catch {
      setIsListening(false);
    }
  }, [isListening, language, makeDecision, setIsListening]);

  if (!mounted) return null;

  if (!hasStarted) {
    return (
      <>
        <StartScreen
          language={language}
          user={currentUser}
          onStart={handleStartGame}
          onOpenAuth={() => setIsAuthOpen(true)}
          onToggleLang={() => startTransition(() => setLanguage(language === "ru" ? "en" : "ru"))}
        />
        <AuthModal
          isOpen={isAuthOpen}
          onClose={() => setIsAuthOpen(false)}
          onSuccess={() => {
            authClient.getSession().then((session) => {
              if (session?.data?.user) setCurrentUser(session.data.user);
            });
          }}
        />
      </>
    );
  }

  const currentKingdom = kingdoms.find((k) => k.id === activeKingdomId) || kingdoms[0];

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
          <KingdomSelector
            currentKingdom={currentKingdom}
            kingdoms={kingdoms}
            language={language}
            onSelect={selectKingdom}
            onCreate={createKingdom}
          />
          <div className="flex items-center gap-1.5">
            <button
              onClick={() => setIsAuthOpen(true)}
              className="p-1.5 bg-slate-900 border border-slate-800 rounded-lg hover:bg-slate-800 text-slate-400"
              title="Профиль"
            >
              <User className="w-3.5 h-3.5 text-amber-400" />
            </button>
            <span className="font-bold uppercase tracking-wider text-amber-500 mr-1">
              {language === "ru" ? `День ${run.day}` : `Day ${run.day}`}
            </span>
            <button
              onClick={toggleMute}
              className="p-1.5 bg-slate-900 border border-slate-800 rounded-lg hover:bg-slate-800 text-slate-400"
              title="Звук"
            >
              {isMuted ? <VolumeX className="w-3.5 h-3.5" /> : <Volume2 className="w-3.5 h-3.5 text-amber-400" />}
            </button>
            <button
              onClick={() => startTransition(() => setLanguage(language === "ru" ? "en" : "ru"))}
              className="px-2 py-1.5 bg-slate-900 border border-slate-800 rounded-lg flex items-center gap-1 hover:bg-slate-800 text-slate-300"
            >
              <Languages className="w-3.5 h-3.5 text-slate-400" />
              <span className="uppercase text-[10px] font-bold">{language}</span>
            </button>
            <button
              onClick={restartGame}
              className="p-1.5 bg-slate-900 border border-slate-800 rounded-lg hover:bg-slate-800 text-slate-400"
              title="Перезапуск"
            >
              <RotateCcw className="w-3.5 h-3.5" />
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

      <section className="my-auto py-4 space-y-3">
        {activeAftermath && (
          <div className="p-3 bg-amber-500/10 border border-amber-500/30 rounded-xl text-xs text-amber-300 flex items-start gap-2 shadow-lg animate-fade-in">
            <Sparkles className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
            <p className="leading-relaxed font-medium">{activeAftermath}</p>
          </div>
        )}

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
          <div className="space-y-3">
            <EventCard event={currentEvent} language={language} onDecision={makeDecision} />
            {isSpeaking && (
              <div className="flex items-center justify-center gap-1.5 text-xs text-amber-400 animate-pulse">
                <Volume1 className="w-4 h-4" />
                <span>{language === "ru" ? "Голос из тронного зала..." : "Voice in the throne room..."}</span>
              </div>
            )}
          </div>
        )}
      </section>

      {!run.isGameOver && (
        <footer className="pt-2 pb-4 text-center space-y-2">
          <button
            onClick={handleSpeech}
            className={`px-5 py-2.5 rounded-full border text-xs font-semibold flex items-center justify-center gap-2 mx-auto transition shadow-lg ${
              isListening
                ? "bg-red-500/25 border-red-500 text-red-300 animate-pulse scale-105"
                : "bg-slate-900 border-slate-800 text-slate-300 hover:text-white"
            }`}
          >
            {isListening ? <Mic className="w-4 h-4 text-red-400 animate-bounce" /> : <MicOff className="w-4 h-4 text-slate-400" />}
            <span>
              {isListening
                ? language === "ru"
                  ? "Слушаю («Да / Первый» или «Нет / Второй»)..."
                  : "Listening ('Yes / One' or 'No / Two')..."
                : language === "ru"
                ? "Включить микрофон (Голосовое управление)"
                : "Enable Microphone (Voice Control)"}
            </span>
          </button>
        </footer>
      )}

      <AuthModal
        isOpen={isAuthOpen}
        onClose={() => setIsAuthOpen(false)}
        onSuccess={() => {
          authClient.getSession().then((session) => {
            if (session?.data?.user) setCurrentUser(session.data.user);
          });
        }}
      />
    </main>
  );
}
