"use client";

import React from "react";
import { Language } from "@/lib/engine/types";
import { Crown, Play, Volume2 } from "lucide-react";

interface StartScreenProps {
  language: Language;
  onStart: () => void;
  onToggleLang: () => void;
}

export const StartScreen: React.FC<StartScreenProps> = ({
  language,
  onStart,
  onToggleLang,
}) => {
  return (
    <div className="flex flex-col items-center justify-between min-h-screen max-w-md mx-auto p-6 bg-slate-950 text-slate-100 border-x border-slate-800 text-center select-none">
      <header className="w-full flex justify-end">
        <button
          onClick={onToggleLang}
          className="px-2.5 py-1 bg-slate-900 border border-slate-800 rounded-lg text-xs font-bold text-slate-300 hover:bg-slate-800 uppercase"
        >
          {language}
        </button>
      </header>

      <div className="my-auto space-y-6">
        <div className="w-20 h-20 mx-auto rounded-3xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-4xl shadow-2xl shadow-amber-500/10">
          <Crown className="w-10 h-10 text-amber-500" />
        </div>

        <div className="space-y-2">
          <h1 className="text-2xl font-black tracking-tight text-slate-100">
            {language === "ru" ? "ДА, МИЛОРД" : "YES, MY LORD"}
          </h1>
          <p className="text-xs text-slate-400 max-w-[260px] mx-auto leading-relaxed">
            {language === "ru"
              ? "Голосовая средневековая стратегия. Управляйте балансом казны, армии, церкви и народа."
              : "Voice-driven medieval realm management. Balance gold, military, church and the folk."}
          </p>
        </div>

        <div className="p-3 bg-slate-900/60 border border-slate-800/80 rounded-xl text-left text-xs text-slate-400 space-y-1.5 max-w-[280px] mx-auto">
          <div className="flex items-center gap-2 text-amber-400 font-semibold">
            <Volume2 className="w-4 h-4" />
            <span>{language === "ru" ? "Звуковое сопровождение" : "Audio & Speech"}</span>
          </div>
          <p className="text-[11px] text-slate-400 leading-normal">
            {language === "ru"
              ? "Нажмите кнопку ниже, чтобы включить звук, голоса просителей и музыку."
              : "Tap the button below to enable game sounds, courier voices, and music."}
          </p>
        </div>

        <button
          onClick={onStart}
          className="w-full max-w-[280px] py-3.5 px-6 bg-amber-500 hover:bg-amber-400 text-slate-950 font-black text-sm uppercase tracking-wider rounded-xl shadow-lg shadow-amber-500/20 flex items-center justify-center gap-2 transition active:scale-95 mx-auto"
        >
          <Play className="w-4 h-4 fill-current" />
          <span>{language === "ru" ? "Начать правление" : "Begin Reign"}</span>
        </button>
      </div>

      <footer className="text-[10px] text-slate-600">
        v1.0 · PWA Ready · Audio & Voice
      </footer>
    </div>
  );
};
