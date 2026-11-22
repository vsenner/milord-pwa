"use client";

import React from "react";
import { Language } from "@/lib/engine/types";
import { Crown, Play, Volume2, ShieldCheck, User } from "lucide-react";

interface StartScreenProps {
  language: Language;
  user: { name?: string | null; email?: string | null } | null;
  onStart: () => void;
  onToggleLang: () => void;
  onOpenAuth: () => void;
}

export const StartScreen: React.FC<StartScreenProps> = ({
  language,
  user,
  onStart,
  onToggleLang,
  onOpenAuth,
}) => {
  return (
    <div className="flex flex-col items-center justify-between min-h-screen max-w-md mx-auto p-6 bg-slate-950 text-slate-100 border-x border-slate-800 text-center select-none">
      <header className="w-full flex justify-between items-center">
        <button
          onClick={onOpenAuth}
          className="px-3 py-1.5 bg-slate-900 border border-slate-800 rounded-xl text-xs font-semibold text-slate-300 hover:bg-slate-800 flex items-center gap-1.5"
        >
          <User className="w-3.5 h-3.5 text-amber-400" />
          <span className="truncate max-w-[120px]">{user ? user.name || user.email : "Войти"}</span>
        </button>

        <button
          onClick={onToggleLang}
          className="px-2.5 py-1.5 bg-slate-900 border border-slate-800 rounded-xl text-xs font-bold text-slate-300 hover:bg-slate-800 uppercase"
        >
          {language}
        </button>
      </header>

      <div className="my-auto space-y-6">
        <div className="w-24 h-24 mx-auto rounded-3xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-4xl shadow-2xl shadow-amber-500/10">
          <Crown className="w-12 h-12 text-amber-500" />
        </div>

        <div className="space-y-2">
          <h1 className="text-2xl font-black tracking-tight text-slate-100">
            {language === "ru" ? "ДА, МИЛОРД" : "YES, MY LORD"}
          </h1>
          <p className="text-xs text-slate-400 max-w-[280px] mx-auto leading-relaxed">
            {language === "ru"
              ? "Голосовая средневековая стратегия. Живые голоса персонажей, атмосферные звуки и решения с последствиями."
              : "Voice-driven medieval strategy with living character voices, visceral consequences and realm management."}
          </p>
        </div>

        <div className="p-3.5 bg-slate-900/60 border border-slate-800/80 rounded-2xl text-left text-xs text-slate-400 space-y-2 max-w-[300px] mx-auto">
          <div className="flex items-center gap-2 text-amber-400 font-semibold">
            <Volume2 className="w-4 h-4" />
            <span>{language === "ru" ? "Живая озвучка и звуки" : "Neural Audio & FX"}</span>
          </div>
          <p className="text-[11px] text-slate-400 leading-normal">
            {language === "ru"
              ? "Гонец, воевода, казначей и епископ говорят реальными голосами и зачитывают варианты выбора."
              : "Characters speak with dedicated neural voices and pronounce your options out loud."}
          </p>
        </div>

        <button
          onClick={onStart}
          className="w-full max-w-[300px] py-4 px-6 bg-amber-500 hover:bg-amber-400 text-slate-950 font-black text-sm uppercase tracking-wider rounded-2xl shadow-xl shadow-amber-500/20 flex items-center justify-center gap-2 transition active:scale-95 mx-auto"
        >
          <Play className="w-4 h-4 fill-current" />
          <span>{language === "ru" ? "Начать правление" : "Begin Reign"}</span>
        </button>
      </div>

      <footer className="text-[10px] text-slate-600 flex items-center justify-center gap-1">
        <ShieldCheck className="w-3.5 h-3.5 text-slate-600" />
        <span>BetterAuth · Multi-User · PWA Standalone</span>
      </footer>
    </div>
  );
};
