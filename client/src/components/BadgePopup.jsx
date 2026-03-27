import React, { useEffect } from "react";
import { Trophy, X } from "lucide-react";
import confetti from "canvas-confetti";

const BadgePopup = ({ badge, onClose }) => {
  useEffect(() => {
    if (badge) {
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.9, x: 0.9 },
        colors: ["#166534", "#4ade80", "#fbbf24"],
      });
    }
  }, [badge]);

  if (!badge) return null;

  return (
    <div className="fixed bottom-8 right-8 z-[200] animate-in slide-in-from-right-full duration-500">
      <div className="bg-white rounded-2xl shadow-2xl p-6 border-2 border-[#166534] flex items-center gap-4 max-w-sm relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-1 bg-[#166534] animate-progress"></div>
        <div className="bg-[#166534] w-16 h-16 rounded-2xl flex items-center justify-center text-3xl shrink-0">
          {badge.icon}
        </div>
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-1">
            <Trophy className="w-4 h-4 text-amber-500" />
            <span className="text-[10px] font-black text-[#166534] uppercase tracking-widest">
              New Badge Earned!
            </span>
          </div>
          <h4 className="font-bold text-lg leading-tight">{badge.name}</h4>
          <p className="text-xs text-[#111827]/60">{badge.description}</p>
        </div>
        <button 
          onClick={onClose}
          className="p-1 hover:bg-[#f5f5f4] rounded-full transition-colors self-start"
        >
          <X className="w-4 h-4 text-[#111827]/40" />
        </button>
      </div>
    </div>
  )
};

export default BadgePopup;
