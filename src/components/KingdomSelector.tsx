"use client";

import React, { useState } from "react";
import { Language } from "@/lib/engine/types";
import { Plus, Castle } from "lucide-react";

export interface KingdomItem {
  id: string;
  name: string;
  motto: string;
  language: Language;
}

interface KingdomSelectorProps {
  currentKingdom: KingdomItem;
  kingdoms: KingdomItem[];
  language: Language;
  onSelect: (k: KingdomItem) => void;
  onCreate: (name: string, motto: string) => void;
}

export const KingdomSelector: React.FC<KingdomSelectorProps> = ({
  currentKingdom,
  kingdoms,
  language,
  onSelect,
  onCreate,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [name, setName] = useState("");
  const [motto, setMotto] = useState("");

  const handleCreate = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return;
    onCreate(name.trim(), motto.trim());
    setName("");
    setMotto("");
    setIsOpen(false);
  };

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-1.5 px-2.5 py-1 bg-slate-900 border border-slate-800 rounded-lg text-xs font-semibold hover:bg-slate-800 text-slate-200"
      >
        <Castle className="w-3.5 h-3.5 text-amber-500" />
        <span className="truncate max-w-[120px]">{currentKingdom.name}</span>
      </button>

      {isOpen && (
        <div className="absolute top-9 left-0 z-50 w-72 bg-slate-900 border border-slate-800 rounded-xl shadow-2xl p-3 space-y-3">
          <div className="text-xs font-bold text-slate-400 uppercase tracking-wider">
            {language === "ru" ? "Ваши королевства" : "Your Kingdoms"}
          </div>

          <div className="max-h-40 overflow-y-auto space-y-1.5">
            {kingdoms.map((k) => (
              <button
                key={k.id}
                onClick={() => {
                  onSelect(k);
                  setIsOpen(false);
                }}
                className={`w-full text-left p-2 rounded-lg border text-xs flex flex-col ${
                  k.id === currentKingdom.id
                    ? "bg-amber-500/10 border-amber-500 text-amber-300"
                    : "bg-slate-800/60 border-slate-700 text-slate-300 hover:bg-slate-800"
                }`}
              >
                <span className="font-bold">{k.name}</span>
                {k.motto && <span className="text-[10px] text-slate-400 italic">«{k.motto}»</span>}
              </button>
            ))}
          </div>

          <form onSubmit={handleCreate} className="pt-2 border-t border-slate-800 space-y-2">
            <input
              type="text"
              placeholder={language === "ru" ? "Имя королевства..." : "Kingdom name..."}
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full text-xs px-2.5 py-1.5 bg-slate-950 border border-slate-800 rounded text-slate-200 focus:outline-none focus:border-amber-500"
            />
            <input
              type="text"
              placeholder={language === "ru" ? "Девиз..." : "Motto..."}
              value={motto}
              onChange={(e) => setMotto(e.target.value)}
              className="w-full text-xs px-2.5 py-1.5 bg-slate-950 border border-slate-800 rounded text-slate-200 focus:outline-none focus:border-amber-500"
            />
            <button
              type="submit"
              className="w-full py-1.5 bg-amber-600 hover:bg-amber-500 text-slate-950 font-bold rounded text-xs flex items-center justify-center gap-1"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>{language === "ru" ? "Основать королевство" : "Found Kingdom"}</span>
            </button>
          </form>
        </div>
      )}
    </div>
  );
};
