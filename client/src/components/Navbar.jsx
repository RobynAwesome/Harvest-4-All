import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Sprout, Menu, X } from 'lucide-react';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();

  return (
    <nav className="sticky top-0 z-50 glass border-b border-[#166534]/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          <div className="flex items-center gap-2 cursor-pointer" onClick={() => navigate('/')}>
            <div className="bg-[#166534] p-1.5 rounded-lg text-white">
              <Sprout className="w-6 h-6" />
            </div>
            <span className="text-xl font-bold text-[#166534] tracking-tight">
              Harvest<span className="text-[#4ade80]">4</span>All
            </span>
          </div>
          
          {/* Desktop Nav */}
          <div className="hidden md:flex space-x-8 items-center">
            <Link to="/grow" className="text-sm font-medium hover:text-[#166534] transition-colors">Grow</Link>
            <Link to="/reduce" className="text-sm font-medium hover:text-[#166534] transition-colors">Reduce</Link>
            <Link to="/save" className="text-sm font-medium hover:text-[#166534] transition-colors">Save</Link>
            <Link to="/market" className="text-sm font-medium hover:text-[#166534] transition-colors">Market</Link>
            <Link to="/impact" className="bg-[#166534] text-white px-4 py-2 rounded-full hover:bg-[#166534]/90 transition-all shadow-md active:scale-95">
              My Impact
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center">
            <button onClick={() => setIsOpen(!isOpen)} className="text-[#166534]">
              {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>
      
      {/* Mobile Nav */}
      {isOpen && (
        <div className="md:hidden glass border-t border-[#166534]/10 p-4 space-y-4">
          <Link to="/grow" onClick={() => setIsOpen(false)} className="block w-full text-left font-medium">Grow Projects</Link>
          <Link to="/reduce" onClick={() => setIsOpen(false)} className="block w-full text-left font-medium">Reduce Waste</Link>
          <Link to="/save" onClick={() => setIsOpen(false)} className="block w-full text-left font-medium">Save Energy/Water</Link>
          <Link to="/market" onClick={() => setIsOpen(false)} className="block w-full text-left font-medium">Local Market</Link>
          <Link to="/impact" onClick={() => setIsOpen(false)} className="block w-full text-center bg-[#166534] text-white py-2 rounded-lg">
            My Impact
          </Link>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
