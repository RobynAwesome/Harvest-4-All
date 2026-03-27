import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Sprout, Menu, X, Trophy, Leaf } from "lucide-react";
import { useAppContext } from "../context/useAppContext";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();
  const { totalPoints, earnedBadges } = useAppContext();

  return (
    <nav className="sticky top-0 z-50 glass border-b border-[#115e59]/10" aria-label="Main Navigation">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-20 items-center">
          <div
            className="flex items-center gap-3 cursor-pointer group"
            onClick={() => navigate("/")}
            role="link"
            aria-label="Harvest For All Home"
          >
            <div className="bg-[#115e59] p-2 rounded-xl text-white shadow-lg group-hover:rotate-6 transition-transform">
              <Leaf className="w-6 h-6" />
            </div>
            <span className="text-2xl font-black text-[#111827] tracking-tighter font-heading">
              HARVEST <span className="text-[#2ecc71]">4</span> ALL
            </span>
          </div>

          {/* Desktop Nav */}
          <div className="hidden md:flex space-x-8 items-center" role="menubar">
            {["Grow", "Reduce", "Save", "Market"].map((item) => (
              <Link
                key={item}
                to={`/${item.toLowerCase()}`}
                className="text-sm font-black uppercase tracking-widest text-[#111827]/60 hover:text-[#115e59] transition-colors"
                aria-label={item}
              >
                {item}
              </Link>
            ))}

            <div className="h-6 w-px bg-[#115e59]/10"></div>

            <Link to="/impact" className="flex items-center gap-3 group" aria-label="View My Impact Dashboard">
              <div className="bg-[#115e59] text-white px-5 py-2.5 rounded-xl hover:bg-[#2ecc71] transition-all shadow-md active:scale-95 flex items-center gap-2 font-black text-xs uppercase tracking-widest">
                <Trophy className="w-4 h-4 text-amber-400" /> <span>{totalPoints} pts</span>
              </div>
              {earnedBadges.length > 0 && (
                <div 
                  className="bg-[#2ecc71] text-white font-black text-[10px] w-6 h-6 rounded-full flex items-center justify-center animate-bounce shadow-lg border-2 border-white"
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
              className="text-[#115e59] p-2 hover:bg-[#115e59]/5 rounded-lg transition-colors"
              aria-expanded={isOpen}
              aria-label="Toggle Mobile Menu"
            >
              {isOpen ? (
                <X className="w-7 h-7" />
              ) : (
                <Menu className="w-7 h-7" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Nav */}
      {isOpen && (
        <div className="md:hidden bg-white border-t border-[#115e59]/10 p-8 space-y-6 shadow-2xl animate-in slide-in-from-top-4 duration-300">
          {["Grow", "Reduce", "Save", "Market"].map((item) => (
            <Link
              key={item}
              to={`/${item.toLowerCase()}`}
              onClick={() => setIsOpen(false)}
              className="block w-full text-left font-black text-xl uppercase tracking-widest text-[#111827]/70 hover:text-[#115e59]"
            >
              {item}
            </Link>
          ))}
          <Link
            to="/impact"
            onClick={() => setIsOpen(false)}
            className="block w-full text-center bg-[#115e59] text-white py-4 rounded-xl font-black uppercase tracking-widest text-sm shadow-xl active:scale-95"
          >
            My Impact ({totalPoints} pts)
          </Link>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
