import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Sprout, X, Lightbulb, Droplets, Zap, Recycle, ArrowRight } from "lucide-react";

const TIPS = [
  { text: "Water your containers in the early morning to reduce evaporation by 70%.", icon: Droplets, color: "text-blue-500", bg: "bg-blue-50" },
  { text: "Mulch your soil with leaves or straw to keep roots cool and moist.", icon: Sprout, color: "text-emerald-500", bg: "bg-emerald-50" },
  { text: "Swap kitchen scraps for compost with your neighbors in the Market.", icon: Recycle, color: "text-emerald-600", bg: "bg-green-50" },
  { text: "Use LEDs to save up to 80% on your lighting electricity bill.", icon: Zap, color: "text-amber-500", bg: "bg-amber-50" },
  { text: "Greywater from laundry is safe for trees and shrubs—not leafy greens!", icon: Droplets, color: "text-cyan-500", bg: "bg-cyan-50" }
];

const TipBot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [currentTip, setCurrentTip] = useState(0);
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTip((prev) => (prev + 1) % TIPS.length);
    }, 8000);
    return () => clearInterval(interval);
  }, []);

  const Tip = TIPS[currentTip];

  return (
    <div className="fixed bottom-8 right-8 z-[100] flex flex-col items-end">
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8, y: 20, x: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0, x: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 20, x: 20 }}
            className="mb-4 w-72 bg-white/95 backdrop-blur-xl rounded-[2.5rem] shadow-2xl border border-emerald-100 p-6 overflow-hidden relative"
          >
            <div className="absolute top-0 right-0 w-24 h-24 bg-emerald-50 rounded-full -translate-y-1/2 translate-x-1/2" />
            
            <div className="flex justify-between items-start mb-4 relative z-10">
              <div className={`p-3 rounded-2xl ${Tip.bg}`}>
                <Tip.icon className={`w-5 h-5 ${Tip.color}`} />
              </div>
              <button 
                onClick={() => setIsOpen(false)}
                className="p-1 hover:bg-gray-100 rounded-full transition-colors"
              >
                <X className="w-4 h-4 text-gray-400" />
              </button>
            </div>

            <h4 className="text-xs font-black uppercase tracking-widest text-emerald-600 mb-2 relative z-10 flex items-center gap-2">
              <Lightbulb className="w-3 h-3" /> Quick Tip
            </h4>
            <p className="text-sm text-[#111827]/80 font-medium leading-relaxed mb-4 relative z-10">
              "{Tip.text}"
            </p>

            <button className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-[#115e59] hover:gap-3 transition-all">
              Learn More <ArrowRight className="w-3 h-3" />
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.button
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        onClick={() => setIsOpen(!isOpen)}
        className={`relative w-16 h-16 rounded-3xl flex items-center justify-center shadow-xl transition-all duration-500 ${
          isOpen ? 'bg-[#111827] text-white' : 'bg-white text-[#166534] border-2 border-emerald-100'
        }`}
      >
        <Sprout className={`w-8 h-8 ${!isOpen && 'animate-bounce'}`} />
        
        {!isOpen && !isHovered && (
          <div className="absolute -top-1 -right-1 flex h-4 w-4">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-4 w-4 bg-emerald-500 border-2 border-white"></span>
          </div>
        )}

        <AnimatePresence>
          {isHovered && !isOpen && (
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: -10 }}
              exit={{ opacity: 0, x: -20 }}
              className="absolute right-full whitespace-nowrap bg-[#111827] text-white text-[10px] font-black uppercase tracking-widest px-4 py-2 rounded-full mr-2"
            >
              Ask Planty!
            </motion.div>
          )}
        </AnimatePresence>
      </motion.button>
    </div>
  );
};

export default TipBot;
