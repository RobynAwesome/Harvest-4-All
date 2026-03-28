import React from "react";
import { ShieldCheck } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const Footer = () => {
  const navigate = useNavigate();
  const { isAdmin } = useAuth();
  return (
    <footer className="bg-[#111827] text-white/70 py-12 mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
          <div className="col-span-1 md:col-span-1">
            <div className="flex items-center gap-3 mb-5">
              {/* Crop bottom ~28% to hide the text baked into the image */}
              <div className="overflow-hidden flex-shrink-0 drop-shadow-lg" style={{ width: 52, height: 38 }}>
                <img
                  src="/logo512.png"
                  alt="Harvest For All logo"
                  style={{ width: 52, height: 52, objectFit: "cover", objectPosition: "top" }}
                />
              </div>
              <div>
                <div className="text-white font-black text-lg leading-none tracking-tight font-heading">
                  HARVEST <span className="text-[#2ecc71]">4</span> ALL
                </div>
                <div className="text-[#2ecc71] text-[10px] font-black uppercase tracking-[0.2em] mt-1">
                  Sustainable Communities
                </div>
              </div>
            </div>
            <p className="text-sm leading-relaxed max-w-xs">
              Empowering Western Cape communities through sustainable action,
              digital inclusion, and local economic resilience.
            </p>
            <p className="text-[10px] text-white/20 mt-3">
              Free for communities. Premium features for organizations.
            </p>
          </div>
          <div>
            <h4 className="text-white font-black mb-6 uppercase text-[10px] tracking-[0.2em]">
              Action Pillars
            </h4>
            <ul className="space-y-3 text-sm font-medium">
              <li><a href="/grow" className="hover:text-white transition-colors">Start Growing</a></li>
              <li><a href="/save" className="hover:text-white transition-colors">Save Water & Energy</a></li>
              <li><a href="/reduce" className="hover:text-white transition-colors">Reduce Waste</a></li>
              <li><a href="/market" className="hover:text-white transition-colors">Community Market</a></li>
            </ul>
          </div>
          <div>
            <h4 className="text-white font-black mb-6 uppercase text-[10px] tracking-[0.2em]">
              Resources
            </h4>
            <ul className="space-y-3 text-sm font-medium">
              <li><a href="#" className="hover:text-white transition-colors">MICT SETA 2026</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Township Farming Guides</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Impact Reporting</a></li>
            </ul>
          </div>
          <div>
            <h4 className="text-white font-black mb-6 uppercase text-[10px] tracking-[0.2em]">
              Support
            </h4>
            <ul className="space-y-3 text-sm font-medium">
              <li><a href="mailto:contact@harvest4all.org" className="hover:text-white transition-colors">contact@harvest4all.org</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Feedback Loop</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Privacy & Terms</a></li>
            </ul>
          </div>
        </div>
        <div className="border-t border-white/5 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-[10px] font-bold uppercase tracking-widest text-white/30">
          <p>
            &copy; 2026 Harvest For All | National Skills Challenge Hackathon Prototype
          </p>
          <div className="flex gap-6 items-center">
            <a href="https://github.com/RobynAwesome/Harvest-4-All" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">
              GitHub
            </a>
            <a href="#" className="hover:text-white transition-colors">Discord</a>
            <button
              onClick={() => navigate(isAdmin ? "/admin" : "/login")}
              className="flex items-center gap-1.5 text-white/20 hover:text-white/60 transition-colors"
              aria-label={isAdmin ? "Admin Panel" : "Login"}
            >
              <ShieldCheck className="w-3 h-3" /> {isAdmin ? "Admin" : "Login"}
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
