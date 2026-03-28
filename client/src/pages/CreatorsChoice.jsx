import React, { useState, useEffect } from "react";
import axios from "axios";
import { 
  Sparkles, 
  Zap, 
  Droplets, 
  ArrowUpRight, 
  Search, 
  Globe, 
  TrendingUp, 
  ShieldCheck,
  Loader2
} from "lucide-react";
import { motion } from "framer-motion";
import { useAuth } from "../context/AuthContext";
import { Link } from "react-router-dom";

const CreatorsChoice = () => {
  const { user, isAuthenticated } = useAuth();
  const [submissions, setSubmissions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState("All");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get("/api/submissions");
        setSubmissions(res.data);
      } catch (err) {
        console.error("Failed to load visions:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const filtered = filter === "All" 
    ? submissions 
    : submissions.filter(s => s.category.toLowerCase() === filter.toLowerCase());

  return (
    <div className="section-fade py-24 px-4 bg-[#f5f5f4] min-h-screen">
      <div className="max-w-7xl mx-auto">
        
        {/* Public Hero Selection */}
        <div className="text-center mb-24">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 bg-[#115e59]/10 text-[#115e59] px-6 py-2 rounded-full text-xs font-black tracking-widest uppercase mb-8 border border-[#115e59]/20"
          >
             <ShieldCheck className="w-3.5 h-3.5" /> Verified Sustainable Vision
          </motion.div>
          <h1 className="text-6xl md:text-8xl font-black font-heading text-[#111827] mb-8 leading-none tracking-tight">
             Creators <br /><span className="text-gradient">Choice Gallery</span>
          </h1>
          <p className="text-xl text-[#111827]/50 max-w-2xl mx-auto font-medium leading-relaxed">
             A public showcase of peer-reviewed sustainable energy and harvest projects, 
             vetted for the **MICT SETA National Skills Challenge 2026**.
          </p>
        </div>

        {/* Sponsor Banner (Static) */}
        <div className="mb-20 p-12 bg-[#111827] rounded-[4rem] text-white flex flex-col md:flex-row items-center justify-between gap-12 relative overflow-hidden shadow-2xl">
           <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-[#2ecc71]/10 rounded-full blur-[100px] -mr-48 -mt-48" />
           <div className="relative z-10 flex-1">
              <div className="flex items-center gap-3 text-[#2ecc71] mb-6">
                 <Globe className="w-8 h-8" />
                 <span className="text-sm font-black uppercase tracking-widest text-[#2ecc71]">MICT SETA 2026 Stakeholder Access</span>
              </div>
              <h2 className="text-4xl font-black font-heading mb-6 tracking-tight">
                 Empowering The <br />Next Generation.
              </h2>
              <p className="text-gray-400 font-medium leading-relaxed mb-8 max-w-lg">
                 These projects represent the absolute peak of Western Cape township resilience. 
                 Sponsors can connect directly with creators to scale these high-impact solutions.
              </p>
              <div className="flex gap-4">
                 <div className="bg-white/10 px-6 py-3 rounded-2xl text-[10px] font-black uppercase tracking-widest border border-white/5">Pitch Status ACTIVE</div>
                 <div className="bg-[#2ecc71]/20 text-[#2ecc71] px-6 py-3 rounded-2xl text-[10px] font-black uppercase tracking-widest border border-[#2ecc71]/20">Grant Ready</div>
              </div>
           </div>
           <div className="relative z-10 w-full md:w-auto">
              <div className="grid grid-cols-2 gap-4">
                 <div className="bg-white/5 p-8 rounded-[2.5rem] border border-white/10 text-center backdrop-blur-md">
                    <div className="text-3xl font-black text-[#2ecc71] mb-1">40%</div>
                    <div className="text-[9px] font-black uppercase tracking-widest opacity-40">Avg. Water Saving</div>
                 </div>
                 <div className="bg-white/5 p-8 rounded-[2.5rem] border border-white/10 text-center backdrop-blur-md">
                    <div className="text-3xl font-black text-[#2ecc71] mb-1">R12k</div>
                    <div className="text-[9px] font-black uppercase tracking-widest opacity-40">Monthly Impact</div>
                 </div>
                 <div className="col-span-2 bg-[#2ecc71] p-6 rounded-[2rem] text-center text-[#111827] font-black uppercase tracking-widest text-xs shadow-xl active:scale-95 cursor-pointer">
                    Contact Innovation Lead
                 </div>
              </div>
           </div>
        </div>

        {/* Vision Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
           {loading ? (
             <div className="col-span-full py-32 flex flex-col items-center gap-6">
                <Loader2 className="w-16 h-16 animate-spin text-[#115e59]" />
                <p className="font-black text-xs uppercase tracking-[0.3em] text-[#115e59]/40">Vetting Sustainable Projects...</p>
             </div>
           ) : filtered.length === 0 ? (
             <div className="col-span-full py-40 text-center bg-white/50 rounded-[4rem] border-2 border-dashed border-[#111827]/5">
                <Zap className="w-16 h-16 text-[#111827]/10 mx-auto mb-6" />
                <h3 className="text-2xl font-black text-[#111827]/20 uppercase tracking-tight">No Visions Published Yet</h3>
             </div>
           ) : (
             filtered.map((s, i) => (
               <motion.div 
                 key={s.id || i}
                 initial={{ opacity: 0, y: 20 }}
                 whileInView={{ opacity: 1, y: 0 }}
                 transition={{ delay: i * 0.1 }}
                 className="bg-white rounded-[3rem] p-10 shadow-2xl border border-[#111827]/5 hover:border-[#115e59]/20 transition-all group group/card relative overflow-hidden"
               >
                  <div className="absolute top-0 right-0 w-32 h-32 bg-[#115e59]/5 rounded-bl-[4rem] group-hover:bg-[#2ecc71]/10 transition-colors" />
                  
                  <div className="flex items-center gap-4 mb-8">
                     <div className="bg-[#115e59]/5 p-4 rounded-2xl group-hover:bg-[#2ecc71]/20 transition-all transform group-hover:rotate-12">
                        <Sparkles className="w-8 h-8 text-[#115e59] group-hover:text-[#115e59]" />
                     </div>
                     <div>
                        <div className="text-[9px] font-black uppercase tracking-widest text-[#115e59]/40 mb-1">Idea #{i+1}</div>
                        <h4 className="text-2xl font-black text-[#111827] leading-none">{s.title}</h4>
                     </div>
                  </div>

                  <p className="text-[#111827]/60 text-sm font-medium leading-relaxed mb-10 line-clamp-4">
                     {s.description}
                  </p>

                  <div className="flex flex-col gap-3 mb-10">
                     <div className="flex items-center gap-3 text-[#115e59]">
                        <TrendingUp className="w-4 h-4 opacity-40" />
                        <span className="text-[10px] font-black uppercase tracking-widest">Impact: {s.impact}</span>
                     </div>
                     <div className="flex items-center gap-3 text-[#2ecc71]">
                        <Search className="w-4 h-4 opacity-40" />
                        <span className="text-[10px] font-black uppercase tracking-widest font-bold">{s.status}</span>
                     </div>
                  </div>

                  {user?.role === "sponsor" || user?.role === "admin" ? (
                    <button className="w-full bg-[#111827] text-white py-5 rounded-2xl font-black text-[11px] uppercase tracking-widest hover:bg-[#115e59] transition-all flex items-center justify-center gap-3 shadow-xl shadow-emerald-900/10">
                       Contact {s.creatorName || "Visionary"} <ArrowUpRight className="w-4 h-4" />
                    </button>
                  ) : (
                    <div className="space-y-4">
                       <div className="w-full bg-[#f5f5f4] text-[#111827]/30 py-4 rounded-2xl font-black text-[9px] uppercase tracking-widest flex items-center justify-center gap-2 border border-[#111827]/5">
                          Creator Contact Protected <ShieldCheck className="w-3.5 h-3.5" />
                       </div>
                       <Link 
                         to="/login"
                         className="block text-center text-[10px] font-black text-[#115e59] hover:underline uppercase tracking-widest"
                       >
                          Sponsor Login Required to Pitch
                       </Link>
                    </div>
                  )}
               </motion.div>
             ))
           )}
        </div>

        {/* Call to action */}
        <div className="mt-32 text-center">
           <p className="text-xs font-black uppercase tracking-widest text-[#111827]/30 mb-10">Are you a registered creator?</p>
           <button className="bg-[#111827] text-white px-12 py-5 rounded-3xl font-black text-xs uppercase tracking-widest hover:bg-[#115e59] transition-all shadow-2xl active:scale-95">
              Submit Your Own Vision
           </button>
        </div>
      </div>
    </div>
  );
};

export default CreatorsChoice;
