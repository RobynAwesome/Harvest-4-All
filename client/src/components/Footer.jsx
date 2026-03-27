import React from "react";
import { Sprout } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-[#111827] text-white/70 py-12 mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
          <div className="col-span-1 md:col-span-1">
            <div className="flex items-center gap-2 mb-4 text-white">
              <Sprout className="w-6 h-6 text-[#4ade80]" />
              <span className="text-xl font-black tracking-tight">Harvest<span className="text-[#4ade80]">4</span>All</span>
            </div>
            <p className="text-sm leading-relaxed max-w-xs">
              Empowering Western Cape communities through sustainable action, 
              digital inclusion, and local economic resilience.
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
          <div className="flex gap-6">
            <a href="https://github.com/RobynAwesome/Harvest-4-All" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">
              GitHub
            </a>
            <a href="#" className="hover:text-white transition-colors">Discord</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
