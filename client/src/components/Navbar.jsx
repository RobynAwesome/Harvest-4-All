import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Menu, X, Trophy, Download, LogIn, LogOut, User, Play } from "lucide-react";
import { useAppContext } from "../context/useAppContext";
import { useAuth } from "../context/AuthContext";
import { useTheme } from "../context/ThemeContext";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [deferredPrompt, setDeferredPrompt] = useState(null);
  const [showInstallBtn, setShowInstallBtn] = useState(false);
  const navigate = useNavigate();
  const { totalPoints, earnedBadges } = useAppContext();
  const { user, isAuthenticated, logout, isSimulating, stopSimulation } = useAuth();
  const { cycleTheme, current, theme } = useTheme();

  useEffect(() => {
    window.addEventListener("beforeinstallprompt", (e) => {
      e.preventDefault();
      setDeferredPrompt(e);
      setShowInstallBtn(true);
    });

    window.addEventListener("appinstalled", () => {
      setShowInstallBtn(false);
      setDeferredPrompt(null);
    });
  }, []);

  const handleInstallClick = async () => {
    if (!deferredPrompt) return;
    deferredPrompt.prompt();
    const { outcome } = await deferredPrompt.userChoice;
    if (outcome === "accepted") {
      setShowInstallBtn(false);
    }
    setDeferredPrompt(null);
  };

  return (
    <nav className="sticky top-0 z-50 glass border-b border-[#115e59]/10" aria-label="Main Navigation">
      {isSimulating && (
        <div className="bg-amber-500 text-white px-4 py-2 flex items-center justify-between text-xs font-black uppercase tracking-[0.2em] shadow-lg relative z-[60]">
          <div className="flex items-center gap-2">
             <Play className="w-4 h-4 fill-white animate-pulse" />
             <span>Simulation Perspective: <span className="underline decoration-white/40 underline-offset-4">{user?.username}</span></span>
          </div>
          <button 
            onClick={stopSimulation}
            className="flex items-center gap-2 bg-white/20 hover:bg-white/30 px-3 py-1 rounded-lg transition-all border border-white/20"
          >
             <LogOut className="w-3.5 h-3.5" /> Stop Simulation
          </button>
        </div>
      )}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-20 items-center">
          <div
            className="flex items-center gap-3 cursor-pointer group"
            onClick={() => navigate("/")}
            role="link"
            aria-label="Harvest For All Home"
          >
            {/* Crop bottom ~28% to hide the text baked into the image */}
            <div className="overflow-hidden flex-shrink-0 drop-shadow-md" style={{ width: 52, height: 38 }}>
              <img
                src="/logo512.png"
                alt="Harvest For All Logo"
                className="group-hover:scale-110 transition-transform"
                style={{ width: 52, height: 52, objectFit: "cover", objectPosition: "top" }}
              />
            </div>
            <div className="leading-none flex items-center gap-3">
              <div>
                <div className="text-2xl font-black text-[#111827] tracking-tighter font-heading">
                  HARVEST <span className="text-[#2ecc71]">4</span> ALL
                </div>
                <div className="text-[9px] font-black uppercase tracking-[0.2em] text-[#115e59]/60 mt-0.5">
                  Sustainable Communities
                </div>
              </div>
              <div className="hidden lg:flex items-center gap-2 bg-[#2ecc71]/15 text-[#115e59] text-[9px] font-black px-3 py-1.5 rounded-full border border-[#2ecc71]/20 shadow-sm animate-pulse-slow">
                 <span className="relative flex h-2 w-2">
                   <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#2ecc71] opacity-75"></span>
                   <span className="relative inline-flex rounded-full h-2 w-2 bg-[#2ecc71]"></span>
                 </span>
                 🌍 OFFLINE RESILIENT
              </div>
            </div>
          </div>

          {/* Desktop Nav */}
          <div className="hidden md:flex space-x-8 items-center" role="menubar">
            {showInstallBtn && (
              <button
                onClick={handleInstallClick}
                className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-[#2ecc71] hover:text-[#115e59] transition-all bg-[#2ecc71]/10 px-3 py-1.5 rounded-lg border border-[#2ecc71]/20"
              >
                <Download className="w-3.5 h-3.5" /> Install App
              </button>
            )}

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

            <button
              onClick={cycleTheme}
              title={`Switch theme (current: ${current.name})`}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-[10px] font-black uppercase tracking-widest border border-[#115e59]/10 hover:border-[#2ecc71]/30 hover:bg-[#115e59]/5 transition-all"
            >
              <span className="text-base leading-none">{current.emoji}</span>
              <span className="text-[#115e59]/60">{current.name}</span>
            </button>

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

            {isAuthenticated ? (
              <button
                onClick={logout}
                className="flex items-center gap-1.5 text-[10px] font-black uppercase tracking-widest text-[#111827]/50 hover:text-red-500 transition-colors"
                title={`Logged in as ${user?.username}`}
              >
                <User className="w-3.5 h-3.5" />
                <span className="max-w-[60px] truncate">{user?.username}</span>
                <LogOut className="w-3.5 h-3.5" />
              </button>
            ) : (
              <Link
                to="/login"
                className="flex items-center gap-1.5 text-[10px] font-black uppercase tracking-widest text-[#115e59]/60 hover:text-[#2ecc71] transition-colors"
              >
                <LogIn className="w-3.5 h-3.5" /> Login
              </Link>
            )}
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center gap-4">
             {showInstallBtn && (
                <button
                  onClick={handleInstallClick}
                  className="p-2 text-[#2ecc71] bg-[#2ecc71]/10 rounded-lg"
                >
                   <Download className="w-5 h-5" />
                </button>
             )}
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
          <button
            onClick={cycleTheme}
            className="w-full flex items-center justify-center gap-2 border border-[#115e59]/10 py-3 rounded-xl text-xs font-black uppercase tracking-widest text-[#115e59]/60 hover:bg-[#115e59]/5 transition-all"
          >
            <span className="text-lg">{current.emoji}</span> {current.name} Mode
          </button>
          {isAuthenticated ? (
            <button
              onClick={() => { logout(); setIsOpen(false); }}
              className="w-full flex items-center justify-center gap-2 border border-red-200 text-red-500 py-3 rounded-xl text-xs font-black uppercase tracking-widest hover:bg-red-50 transition-all"
            >
              <LogOut className="w-4 h-4" /> Logout ({user?.username})
            </button>
          ) : (
            <Link
              to="/login"
              onClick={() => setIsOpen(false)}
              className="block w-full text-center border border-[#115e59]/10 text-[#115e59] py-3 rounded-xl text-xs font-black uppercase tracking-widest hover:bg-[#115e59]/5 transition-all"
            >
              <LogIn className="w-4 h-4 inline mr-2" /> Login / Register
            </Link>
          )}
        </div>
      )}
    </nav>
  );
};

export default Navbar;
