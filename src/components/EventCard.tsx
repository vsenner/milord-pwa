"use client";

import React from "react";
import { motion, useMotionValue, useTransform } from "framer-motion";
import { GameEvent, Language } from "@/lib/engine/types";
import { CHARACTERS } from "@/lib/engine/characters";
import Image from "next/image";

interface EventCardProps {
  event: GameEvent;
  language: Language;
  onDecision: (choiceId: "A" | "B") => void;
}

export const EventCard: React.FC<EventCardProps> = ({ event, language, onDecision }) => {
  const x = useMotionValue(0);
  const rotate = useTransform(x, [-160, 160], [-10, 10]);
  const opacityA = useTransform(x, [30, 120], [0, 1]);
  const opacityB = useTransform(x, [-30, -120], [0, 1]);

  const char = CHARACTERS[event.characterId] || {
    name: { ru: "Незнакомец", en: "Stranger" },
    role: { ru: "Странник", en: "Traveler" },
    avatar: "/images/characters/herald.svg",
  };

  const handleDragEnd = (_: unknown, info: { offset: { x: number } }) => {
    if (info.offset.x > 80) {
      onDecision("A");
    } else if (info.offset.x < -80) {
      onDecision("B");
    }
  };

  return (
    <div className="relative w-full max-w-sm mx-auto touch-none select-none">
      {/* Swipe Badges Overlay */}
      <motion.div
        style={{ opacity: opacityA }}
        className="absolute top-6 left-6 z-30 px-4 py-2 bg-amber-600/90 border-2 border-amber-300 text-amber-100 font-black text-xs rounded-xl shadow-2xl pointer-events-none uppercase tracking-wider"
      >
        {language === "ru" ? "СОГЛАСЕН (ДА)" : "APPROVE (YES)"}
      </motion.div>
      <motion.div
        style={{ opacity: opacityB }}
        className="absolute top-6 right-6 z-30 px-4 py-2 bg-red-800/90 border-2 border-red-400 text-red-100 font-black text-xs rounded-xl shadow-2xl pointer-events-none uppercase tracking-wider"
      >
        {language === "ru" ? "ОТКАЗАТЬ (НЕТ)" : "REFUSE (NO)"}
      </motion.div>

      {/* Medieval Ornate Draggable Card */}
      <motion.div
        drag="x"
        dragConstraints={{ left: 0, right: 0 }}
        dragElastic={0.65}
        onDragEnd={handleDragEnd}
        style={{ x, rotate }}
        whileTap={{ cursor: "grabbing" }}
        className="bg-[#140e08] border-2 border-[#5a4128] rounded-3xl p-5 shadow-[0_25px_60px_rgba(0,0,0,0.95)] relative cursor-grab overflow-hidden"
      >
        <div className="absolute inset-1.5 border border-[#3b2716] rounded-[22px] pointer-events-none" />

        {/* Big Medieval Character Portrait */}
        <div className="relative w-full aspect-[4/3] rounded-2xl overflow-hidden border border-[#5a4128] shadow-inner mb-4 bg-[#0a0705]">
          <Image
            src={char.avatar}
            alt={char.name[language]}
            fill
            sizes="(max-width: 768px) 100vw, 380px"
            className="object-cover object-center"
            priority
          />
        </div>

        {/* Character Title */}
        <div className="text-center mb-3">
          <h3 className="font-serif font-bold text-base text-[#f5e6b8] tracking-wide">
            {char.name[language]}
          </h3>
          <span className="text-[11px] font-medium text-[#c49a45] uppercase tracking-wider">
            {char.role[language]}
          </span>
        </div>

        {/* Narrative Dilemma */}
        <p className="text-xs sm:text-sm text-[#d4c5a9] leading-relaxed text-center font-serif min-h-[64px] px-1">
          «{event.text[language]}»
        </p>

        {/* Buttons for tap access */}
        <div className="mt-5 flex flex-col gap-2">
          <button
            onClick={() => onDecision("A")}
            className="w-full py-3 px-4 bg-[#23170d] hover:bg-[#332213] border border-[#5a4128] rounded-xl text-left text-xs font-serif font-bold text-[#f5e6b8] transition active:scale-[0.98] shadow"
          >
            <span className="text-[#d4af37] mr-2">I.</span>
            {event.choices[0].text[language]}
          </button>
          <button
            onClick={() => onDecision("B")}
            className="w-full py-3 px-4 bg-[#23170d] hover:bg-[#332213] border border-[#5a4128] rounded-xl text-left text-xs font-serif font-bold text-[#f5e6b8] transition active:scale-[0.98] shadow"
          >
            <span className="text-[#a83232] mr-2">II.</span>
            {event.choices[1].text[language]}
          </button>
        </div>
      </motion.div>
    </div>
  );
};
