import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Sprout, Menu, X, Trophy } from "lucide-react";
import { useAppContext } from "../context/useAppContext";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();
  const { totalPoints, earnedBadges } = useAppContext();

  return (
    <nav className="sticky top-0 z-50 glass border-b border-[#166534]/10" aria-label="Main Navigation">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          <div
            className="flex items-center gap-2 cursor-pointer"
            onClick={() => navigate("/")}
            role="link"
            aria-label="Harvest For All Home"
          >
            <div className="bg-[#166534] p-1.5 rounded-lg text-white">
              <Sprout className="w-6 h-6" />
            </div>
            <span className="text-xl font-bold text-[#166534] tracking-tight">
              Harvest<span className="text-[#4ade80]">4</span>All
            </span>
          </div>

          {/* Desktop Nav */}
          <div className="hidden md:flex space-x-6 items-center" role="menubar">
            <Link
              to="/grow"
              className="text-sm font-bold hover:text-[#166534] transition-colors text-[#111827]/60"
              aria-label="Grow Projects"
            >
              Grow
            </Link>
            <Link
              to="/reduce"
              className="text-sm font-bold hover:text-[#166534] transition-colors text-[#111827]/60"
              aria-label="Waste Reduction"
            >
              Reduce
            </Link>
            <Link
              to="/save"
              className="text-sm font-bold hover:text-[#166534] transition-colors text-[#111827]/60"
              aria-label="Save Energy and Water"
            >
              Save
            </Link>
            <Link
              to="/market"
              className="text-sm font-bold hover:text-[#166534] transition-colors text-[#111827]/60"
              aria-label="Community Market"
            >
              Market
            </Link>

            <div className="h-6 w-px bg-[#166534]/10"></div>

            <Link to="/impact" className="flex items-center gap-3 group" aria-label="View My Impact Dashboard">
              <div className="bg-[#166534] text-white px-4 py-2 rounded-xl hover:bg-[#166534]/90 transition-all shadow-md active:scale-95 flex items-center gap-2">
                <Trophy className="w-4 h-4" /> <span>{totalPoints} pts</span>
              </div>
              {earnedBadges.length > 0 && (
                <div 
                  className="bg-amber-400 text-[#166534] font-black text-[10px] w-5 h-5 rounded-full flex items-center justify-center animate-bounce"
                  aria-label={`${earnedBadges.length} badges earned`}
                >
                  {earnedBadges.length}
                </div>
              )}
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-[#166534]"
              aria-expanded={isOpen}
              aria-label="Toggle Mobile Menu"
            >
              {isOpen ? (
                <X className="w-6 h-6" />
              ) : (
                <Menu className="w-6 h-6" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Nav */}
      {isOpen && (
        <div className="md:hidden bg-white border-t border-[#166534]/10 p-6 space-y-4 shadow-xl animate-in slide-in-from-top-4 duration-300">
          <Link
            to="/grow"
            onClick={() => setIsOpen(false)}
            className="block w-full text-left font-bold text-lg text-[#111827]/70 hover:text-[#166534]"
          >
            Grow Projects
          </Link>
          <Link
            to="/reduce"
            onClick={() => setIsOpen(false)}
            className="block w-full text-left font-bold text-lg text-[#111827]/70 hover:text-[#166534]"
          >
            Reduce Waste
          </Link>
          <Link
            to="/save"
            onClick={() => setIsOpen(false)}
            className="block w-full text-left font-bold text-lg text-[#111827]/70 hover:text-[#166534]"
          >
            Save Energy/Water
          </Link>
          <Link
            to="/market"
            onClick={() => setIsOpen(false)}
            className="block w-full text-left font-bold text-lg text-[#111827]/70 hover:text-[#166534]"
          >
            Local Market
          </Link>
          <Link
            to="/impact"
            onClick={() => setIsOpen(false)}
            className="block w-full text-center bg-[#166534] text-white py-3 rounded-xl font-black uppercase tracking-widest text-sm shadow-md"
          >
            My Impact
          </Link>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
