"use client";

import React from "react";
import { motion, useMotionValue, useTransform } from "framer-motion";
import { GameEvent, Language } from "@/lib/engine/types";
import { CHARACTERS } from "@/lib/engine/characters";

interface EventCardProps {
  event: GameEvent;
  language: Language;
  onDecision: (choiceId: "A" | "B") => void;
}

export const EventCard: React.FC<EventCardProps> = ({ event, language, onDecision }) => {
  const x = useMotionValue(0);
  const rotate = useTransform(x, [-150, 150], [-12, 12]);
  const opacityA = useTransform(x, [20, 100], [0, 1]);
  const opacityB = useTransform(x, [-20, -100], [0, 1]);

  const char = CHARACTERS[event.characterId] || {
    name: { ru: "Незнакомец", en: "Stranger" },
    role: { ru: "Странник", en: "Traveler" },
    avatar: "👤",
  };

  const handleDragEnd = (_: unknown, info: { offset: { x: number } }) => {
    if (info.offset.x > 90) {
      onDecision("A");
    } else if (info.offset.x < -90) {
      onDecision("B");
    }
  };

  return (
    <div className="relative w-full max-w-sm mx-auto touch-none select-none">
      {/* Swipe Badges Overlay */}
      <motion.div
        style={{ opacity: opacityA }}
        className="absolute top-4 left-4 z-20 px-3 py-1 bg-amber-500/90 text-slate-950 font-bold text-xs rounded-lg shadow-lg pointer-events-none uppercase"
      >
        {language === "ru" ? "Согласен (Да)" : "Approve (Yes)"}
      </motion.div>
      <motion.div
        style={{ opacity: opacityB }}
        className="absolute top-4 right-4 z-20 px-3 py-1 bg-red-600/90 text-white font-bold text-xs rounded-lg shadow-lg pointer-events-none uppercase"
      >
        {language === "ru" ? "Отказать (Нет)" : "Refuse (No)"}
      </motion.div>

      {/* Draggable Card */}
      <motion.div
        drag="x"
        dragConstraints={{ left: 0, right: 0 }}
        dragElastic={0.7}
        onDragEnd={handleDragEnd}
        style={{ x, rotate }}
        whileTap={{ cursor: "grabbing" }}
        className="bg-slate-900 border border-slate-800 rounded-2xl p-5 shadow-2xl relative cursor-grab"
      >
        <div className="flex items-center gap-3 mb-4">
          <div className="text-3xl p-2 bg-slate-800/80 rounded-xl border border-slate-700">
            {char.avatar}
          </div>
          <div>
            <h3 className="font-bold text-sm text-slate-100">{char.name[language]}</h3>
            <span className="text-[11px] text-amber-400 font-medium">{char.role[language]}</span>
          </div>
        </div>

        <p className="text-sm text-slate-200 leading-relaxed min-h-[72px]">
          {event.text[language]}
        </p>

        {/* Buttons for tap access */}
        <div className="mt-6 flex flex-col gap-2">
          <button
            onClick={() => onDecision("A")}
            className="w-full py-2.5 px-3 bg-slate-800/90 hover:bg-slate-700 border border-slate-700 rounded-xl text-left text-xs font-medium text-slate-200 transition"
          >
            <span className="text-amber-400 font-bold mr-2">1.</span>
            {event.choices[0].text[language]}
          </button>
          <button
            onClick={() => onDecision("B")}
            className="w-full py-2.5 px-3 bg-slate-800/90 hover:bg-slate-700 border border-slate-700 rounded-xl text-left text-xs font-medium text-slate-200 transition"
          >
            <span className="text-red-400 font-bold mr-2">2.</span>
            {event.choices[1].text[language]}
          </button>
        </div>
      </motion.div>
    </div>
  );
};
