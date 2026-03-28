import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { 
  Shield, 
  Sparkles, 
  Home, 
  Users, 
  Play, 
  ArrowRight,
  LogOut,
  Zap,
  Globe
} from "lucide-react";
import { useAuth } from "../context/AuthContext";
import { motion } from "framer-motion";

const AdminWelcome = () => {
  const navigate = useNavigate();
  const { user, logout, simulateUser } = useAuth();

  const perspectives = [
    {
      title: "Control Panel",
      desc: "Manage users, market listings, and platform health.",
      icon: Shield,
      path: "/admin",
      color: "from-emerald-600 to-teal-700",
      tag: "ADMIN ONLY"
    },
    {
      title: "Creator Hub",
      desc: "Manage crops and sustainable energy submissions.",
      icon: Sparkles,
      path: "/creator",
      color: "from-amber-500 to-orange-600",
      tag: "CREATOR"
    },
    {
      title: "Sponsor Portal",
      desc: "Track membership, sponsor urban farms, and connect with creators.",
      icon: Globe,
      path: "/sponsor/dashboard",
      color: "from-blue-600 to-indigo-700",
      tag: "SPONSOR (UWC/CPUT)"
    }
  ];

  const quickSimulations = [
    { id: "u-1", name: "Kea (Resident)", role: "user" },
    { id: "sponsor-uwc", name: "Sponsor (UWC)", role: "sponsor" }
  ];

  const handleSimulate = (u) => {
    simulateUser(u);
    navigate("/");
  };

  return (
    <div className="min-h-screen bg-[#0a0f0e] text-white flex flex-col items-center justify-center p-6 relative overflow-hidden">
      {/* Background Glow */}
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none">
        <div className="absolute top-[-10%] right-[-10%] w-[500px] h-[500px] bg-emerald-500/10 rounded-full blur-[120px]" />
        <div className="absolute bottom-[-10%] left-[-10%] w-[500px] h-[500px] bg-blue-500/10 rounded-full blur-[120px]" />
      </div>

      <div className="w-full max-w-6xl relative z-10">
        {/* Header */}
        <div className="text-center mb-16">
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="w-20 h-20 bg-emerald-500/20 rounded-3xl flex items-center justify-center mx-auto mb-8 shadow-2xl border border-emerald-500/20"
          >
            <Shield className="w-10 h-10 text-emerald-400" />
          </motion.div>
          <h1 className="text-5xl md:text-7xl font-black font-heading mb-4 tracking-tighter">
            Welcome, <span className="text-emerald-400">Kholofelo</span>.
          </h1>
          <p className="text-white/40 font-black uppercase tracking-[0.4em] text-xs">
            Harvest For All — Founder & Admin Workspace
          </p>
        </div>

        {/* Main Selection Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          {perspectives.map((p, i) => (
            <motion.div
              key={p.title}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              onClick={() => navigate(p.path)}
              className="group cursor-pointer bg-white/5 border border-white/10 p-10 rounded-[3rem] hover:bg-white/10 transition-all shadow-2xl relative overflow-hidden flex flex-col"
            >
              <div className={`absolute top-0 right-0 w-48 h-48 bg-gradient-to-br ${p.color} opacity-0 group-hover:opacity-10 rounded-full -mr-20 -mt-20 transition-opacity blur-3xl`} />
              
              <div className="flex items-center justify-between mb-8">
                 <div className={`w-14 h-14 bg-gradient-to-br ${p.color} rounded-2xl flex items-center justify-center shadow-lg group-hover:rotate-6 transition-transform`}>
                    <p.icon className="w-7 h-7" />
                 </div>
                 <span className="text-[9px] font-black uppercase tracking-widest px-3 py-1 bg-white/5 rounded-full text-white/40 border border-white/10">
                    {p.tag}
                 </span>
              </div>

              <h3 className="text-3xl font-black mb-4 font-heading tracking-tight">{p.title}</h3>
              <p className="text-white/50 text-sm font-medium leading-relaxed mb-10 flex-grow">
                {p.desc}
              </p>

              <div className="flex items-center justify-between text-xs font-black uppercase tracking-widest text-emerald-400 group-hover:gap-2 transition-all">
                 Enter Perspective <ArrowRight className="w-4 h-4" />
              </div>
            </motion.div>
          ))}
        </div>

        {/* Quick Simulation Bar */}
        <div className="bg-white/5 border border-white/10 rounded-[2.5rem] p-8 flex flex-col md:flex-row items-center justify-between gap-8">
           <div className="flex items-center gap-6">
              <div className="w-12 h-12 bg-blue-500/20 rounded-2xl flex items-center justify-center text-blue-400">
                 <Zap className="w-6 h-6" />
              </div>
              <div>
                 <h4 className="font-black text-lg mb-0.5">Quick Simulation</h4>
                 <p className="text-white/30 text-[10px] font-black uppercase tracking-widest">Swap perspectives instantly for the pitch</p>
              </div>
           </div>
           
           <div className="flex gap-4">
              {quickSimulations.map((u) => (
                <button
                  key={u.id}
                  onClick={() => handleSimulate(u)}
                  className="flex items-center gap-3 px-6 py-3 bg-white/5 hover:bg-blue-500/20 border border-white/10 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all active:scale-95"
                >
                   <Users className="w-3.5 h-3.5" /> {u.name}
                </button>
              ))}
              <button
                onClick={logout}
                className="flex items-center gap-3 px-6 py-3 bg-red-500/10 hover:bg-red-500 text-red-500 hover:text-white border border-red-500/20 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all active:scale-95"
              >
                 <LogOut className="w-3.5 h-3.5" /> Logout
              </button>
           </div>
        </div>

        {/* Footer info */}
        <div className="mt-16 text-center text-white/20 text-[10px] font-black uppercase tracking-[0.4em]">
           MICT SETA National Skills Challenge 2026 · Founder Workspace
        </div>
      </div>
    </div>
  );
};

export default AdminWelcome;
