import React from 'react';
import { Sprout, Github, Twitter } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-[#111827] text-white/70 py-12 mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          <div>
            <div className="flex items-center gap-2 mb-4 text-white">
              <Sprout className="w-5 h-5 text-[#4ade80]" />
              <span className="text-lg font-bold">Harvest For All</span>
            </div>
            <p className="text-sm">Empowering Western Cape communities through sustainable action and digital innovation.</p>
          </div>
          <div>
            <h4 className="text-white font-bold mb-4 uppercase text-xs tracking-widest">Resources</h4>
            <ul className="space-y-2 text-sm">
              <li><a href="#" className="hover:text-[#4ade80]">MICT SETA Hackathon</a></li>
              <li><a href="#" className="hover:text-[#4ade80]">CCT Waste Strategy</a></li>
              <li><a href="#" className="hover:text-[#4ade80]">Water Wise Tips</a></li>
            </ul>
          </div>
          <div>
            <h4 className="text-white font-bold mb-4 uppercase text-xs tracking-widest">Legal</h4>
            <ul className="space-y-2 text-sm">
              <li><a href="#" className="hover:text-[#4ade80]">Open Source (MIT)</a></li>
              <li><a href="#" className="hover:text-[#4ade80]">Privacy Policy</a></li>
              <li><a href="#" className="hover:text-[#4ade80]">Demo Mode Disclaimer</a></li>
            </ul>
          </div>
        </div>
        <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-xs">&copy; 2026 Harvest For All. Built for MICT SETA National Skills Challenge.</p>
          <div className="flex gap-4">
            <Github className="w-5 h-5 cursor-pointer hover:text-white transition-colors" />
            <Twitter className="w-5 h-5 cursor-pointer hover:text-white transition-colors" />
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
