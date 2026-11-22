"use client";

import React, { useEffect, useState, useCallback, useTransition, useRef } from "react";
import { useGameStore } from "@/lib/store";
import {
  Coins,
  Crown,
  Users,
  Shield,
  Mic,
  MicOff,
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
    if (!currentUser) {
      setIsAuthOpen(true);
      return;
    }
    soundFx.init();
    soundFx.playSfx("hooves");
    setHasStarted(true);
    setTimeout(() => {
      narrateEvent(currentEvent);
    }, 600);
  };

  const handleLogout = async () => {
    await authClient.signOut();
    setCurrentUser(null);
    setHasStarted(false);
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

  return (
    <main className="min-h-screen bg-[#0d0906] text-[#f5e6b8] flex flex-col justify-between max-w-md mx-auto p-4 border-x-2 border-[#3b2716] select-none shadow-2xl relative font-serif">
      {/* Top Header: Realm & Subtle Status Dots (No Raw Numbers!) */}
      <header className="space-y-3 bg-[#170f09] border border-[#543d2b] p-3 rounded-2xl shadow-lg">
        <div className="flex justify-between items-center text-xs">
          <KingdomSelector
            currentKingdom={currentKingdom}
            kingdoms={kingdoms}
            language={language}
            onSelect={selectKingdom}
            onCreate={createKingdom}
          />
          <div className="flex items-center gap-1.5">
            <span className="font-bold text-[#d4af37] tracking-wider uppercase text-xs">
              {language === "ru" ? `Лето ${run.day}` : `Year ${run.day}`}
            </span>
            <button
              onClick={toggleMute}
              className="p-1.5 bg-[#25170d] border border-[#543d2b] rounded-lg hover:bg-[#352213] text-[#c49a45]"
              title="Звук"
            >
              {isMuted ? <VolumeX className="w-3.5 h-3.5" /> : <Volume2 className="w-3.5 h-3.5 text-[#d4af37]" />}
            </button>
            <button
              onClick={() => startTransition(() => setLanguage(language === "ru" ? "en" : "ru"))}
              className="px-2 py-1.5 bg-[#25170d] border border-[#543d2b] rounded-lg flex items-center gap-1 hover:bg-[#352213] text-[#f5e6b8]"
            >
              <Languages className="w-3.5 h-3.5 text-[#c49a45]" />
              <span className="uppercase text-[10px] font-bold">{language}</span>
            </button>
            <button
              onClick={handleLogout}
              className="p-1.5 bg-[#25170d] border border-[#543d2b] rounded-lg hover:bg-[#352213] text-[#c49a45]"
              title="Выход из профиля"
            >
              <User className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* Medieval Aesthetic Indicators (No Raw Scores/Percentages!) */}
        <div className="grid grid-cols-4 gap-2 pt-1 border-t border-[#3b2716]">
          <div className="flex flex-col items-center">
            <Coins className="w-4 h-4 text-[#e5c158] mb-1" />
            <span className="text-[10px] text-[#c49a45] uppercase tracking-wider">Казна</span>
            <div className="w-1.5 h-1.5 rounded-full bg-[#d4af37] mt-1 shadow-[0_0_8px_#ffd700]" />
          </div>
          <div className="flex flex-col items-center">
            <Crown className="w-4 h-4 text-[#ba79dd] mb-1" />
            <span className="text-[10px] text-[#c49a45] uppercase tracking-wider">Власть</span>
            <div className="w-1.5 h-1.5 rounded-full bg-[#ba79dd] mt-1 shadow-[0_0_8px_#ba79dd]" />
          </div>
          <div className="flex flex-col items-center">
            <Users className="w-4 h-4 text-[#68bb76] mb-1" />
            <span className="text-[10px] text-[#c49a45] uppercase tracking-wider">Народ</span>
            <div className="w-1.5 h-1.5 rounded-full bg-[#68bb76] mt-1 shadow-[0_0_8px_#68bb76]" />
          </div>
          <div className="flex flex-col items-center">
            <Shield className="w-4 h-4 text-[#dd5a5a] mb-1" />
            <span className="text-[10px] text-[#c49a45] uppercase tracking-wider">Армия</span>
            <div className="w-1.5 h-1.5 rounded-full bg-[#dd5a5a] mt-1 shadow-[0_0_8px_#dd5a5a]" />
          </div>
        </div>
      </header>

      {/* Main Throne Hall & Card */}
      <section className="my-auto py-3 space-y-3">
        {activeAftermath && (
          <div className="p-3 bg-[#24170c] border border-[#a87d32] rounded-2xl text-xs text-[#f5e6b8] flex items-start gap-2 shadow-xl animate-fade-in">
            <Sparkles className="w-4 h-4 text-[#d4af37] shrink-0 mt-0.5" />
            <p className="leading-relaxed font-serif italic">{activeAftermath}</p>
          </div>
        )}

        {run.isGameOver ? (
          <div className="bg-[#1c110a] border-2 border-[#801b1b] rounded-3xl p-6 text-center space-y-4 shadow-2xl">
            <div className="text-5xl">👑💀</div>
            <h2 className="text-xl font-bold text-[#e06666] tracking-wide">
              {language === "ru" ? "Правление прервано" : "Reign Terminated"}
            </h2>
            <p className="text-xs sm:text-sm text-[#d4c5a9] leading-relaxed">
              {run.endCondition?.message[language]}
            </p>
            <div className="text-xs text-[#a38e72]">
              {language === "ru" ? `Ваш род удерживал трон ${run.day} лун.` : `You lasted ${run.day} moons.`}
            </div>
            <button
              onClick={restartGame}
              className="w-full py-3 bg-[#a87d32] hover:bg-[#c49a45] text-[#140d07] font-bold rounded-xl text-xs uppercase tracking-wider transition"
            >
              {language === "ru" ? "Взойти на трон заново" : "Ascend Throne Again"}
            </button>
          </div>
        ) : (
          <div className="space-y-3">
            <EventCard event={currentEvent} language={language} onDecision={makeDecision} />
            {isSpeaking && (
              <div className="flex items-center justify-center gap-2 text-xs text-[#d4af37] animate-pulse">
                <Volume1 className="w-4 h-4" />
                <span>{language === "ru" ? "Гонец вещает в тронном зале..." : "Courier speaks in throne room..."}</span>
              </div>
            )}
          </div>
        )}
      </section>

      {/* Voice Control Bar */}
      {!run.isGameOver && (
        <footer className="pt-2 pb-3 text-center">
          <button
            onClick={handleSpeech}
            className={`px-6 py-3 rounded-2xl border-2 text-xs font-bold flex items-center justify-center gap-2 mx-auto transition shadow-2xl ${
              isListening
                ? "bg-[#661b1b]/80 border-[#e06666] text-[#ffd6d6] animate-pulse scale-105"
                : "bg-[#1f140c] border-[#543d2b] text-[#f5e6b8] hover:border-[#a87d32]"
            }`}
          >
            {isListening ? <Mic className="w-4 h-4 text-[#ff8080] animate-bounce" /> : <MicOff className="w-4 h-4 text-[#8f7453]" />}
            <span className="tracking-wide">
              {isListening
                ? language === "ru"
                  ? "Слушаю волю милорда («Да» / «Нет»)..."
                  : "Listening for decree ('Yes' / 'No')..."
                : language === "ru"
                ? "Голосовой указ (Микрофон)"
                : "Voice Decree (Microphone)"}
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
