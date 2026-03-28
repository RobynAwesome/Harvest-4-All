import React, { useState, useEffect } from "react";
import axios from "axios";
import { 
  Globe, 
  CreditCard, 
  Mail, 
  Phone, 
  MessageCircle, 
  ExternalLink, 
  Shield, 
  BarChart3, 
  RefreshCw, 
  Sparkles, 
  Search, 
  ArrowRight
} from "lucide-react";
import { motion } from "framer-motion";

const SponsorDashboard = () => {
  const [submissions, setSubmissions] = useState([]);
  const [loading, setLoading] = useState(true);

  // Sample data with contact details for creators (Mocked for the pitch)
  const creatorContacts = {
    "admin-kholofelo": {
      email: "kholofelo@harvest4all.org",
      phone: "+27 82 123 4567",
      whatsapp: "https://wa.me/27821234567",
      github: "https://github.com/kholofelowork"
    },
    "u-1": {
      email: "kea@harvest-resident.capetown",
      phone: "+27 71 987 6543",
      whatsapp: "https://wa.me/27719876543",
      github: "https://github.com/kea-grower"
    }
  };

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

  return (
    <div className="section-fade py-16 px-4 bg-[#f5f5f4] min-h-screen">
      <div className="max-w-7xl mx-auto">
        
        {/* Sponsor Header */}
        <div className="mb-16">
          <div className="inline-flex items-center gap-2 bg-[#1d4ed8]/10 text-[#1d4ed8] px-5 py-2 rounded-full text-[10px] font-black tracking-widest uppercase mb-6 border border-[#1d4ed8]/20">
             <Globe className="w-4 h-4" /> Official Sponsor Portal
          </div>
          <h1 className="text-5xl font-black text-[#111827] font-heading mb-4">
             Investor <span className="text-gradient from-blue-600 to-indigo-700">Dashboard</span>
          </h1>
          <p className="text-[#111827]/50 font-medium max-w-2xl">
            Welcome, **UWC Innovation Partner**. Track your active sponsorships and connect directly with the creators transforming the Western Cape.
          </p>
        </div>

        {/* Membership Subscription Tracker */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-20">
           <div className="lg:col-span-2 bg-[#111827] rounded-[3rem] p-10 text-white relative overflow-hidden shadow-2xl">
              <div className="absolute top-0 right-0 w-64 h-64 bg-blue-500/10 rounded-full blur-[80px] -mr-32 -mt-32" />
              <div className="relative z-10">
                 <div className="flex justify-between items-start mb-12">
                    <div>
                       <div className="text-[10px] font-black text-blue-400 uppercase tracking-[0.2em] mb-2">Membership Status</div>
                       <h2 className="text-4xl font-black font-heading tracking-tight">PLATINUM SPONSOR</h2>
                    </div>
                    <div className="bg-[#2ecc71]/20 text-[#2ecc71] px-6 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest border border-[#2ecc71]/20 flex items-center gap-2">
                       <Shield className="w-4 h-4" /> Active
                    </div>
                 </div>

                 <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 pt-8 border-t border-white/5">
                    <div>
                       <div className="text-[10px] font-black text-white/30 uppercase tracking-widest mb-1">Billing Interval</div>
                       <div className="text-lg font-black">ANNUALLY</div>
                    </div>
                    <div>
                       <div className="text-[10px] font-black text-white/30 uppercase tracking-widest mb-1">Next Renewal</div>
                       <div className="text-lg font-black uppercase tracking-tight">MARCH 2027</div>
                    </div>
                    <div>
                       <div className="text-[10px] font-black text-white/30 uppercase tracking-widest mb-1">Total Pledged</div>
                       <div className="text-lg font-black text-blue-400">R250,000.00</div>
                    </div>
                 </div>
              </div>
           </div>

           <div className="bg-white rounded-[3rem] p-10 border border-[#111827]/5 shadow-xl flex flex-col justify-between group">
              <div>
                 <div className="w-14 h-14 bg-indigo-50 rounded-2xl flex items-center justify-center text-indigo-600 mb-6 group-hover:scale-110 transition-transform">
                    <CreditCard className="w-7 h-7" />
                 </div>
                 <h3 className="text-2xl font-black text-[#111827] mb-3">Subscription</h3>
                 <p className="text-sm text-[#111827]/50 font-medium leading-relaxed">
                    Manage your investment tiers, update payment methods, and download contribution certificates.
                 </p>
              </div>
              <button className="w-full py-4 bg-[#f5f5f4] text-[#111827]/40 rounded-2xl font-black text-[10px] uppercase tracking-widest hover:bg-[#111827] hover:text-white transition-all mt-8">
                 Update Membership
              </button>
           </div>
        </div>

        {/* Creator Connect Grid (Detailed Gallery) */}
        <div className="mb-12 flex items-center justify-between">
           <div>
              <h2 className="text-3xl font-black text-[#111827] font-heading tracking-tight">Creator Connect</h2>
              <p className="text-sm text-[#111827]/40 font-medium">Detailed access to sustainable visionaries & their contact pipelines.</p>
           </div>
           <div className="hidden sm:flex items-center gap-4 bg-white px-6 py-3 rounded-2xl border border-[#111827]/5 shadow-sm text-xs font-black uppercase tracking-widest">
              <Sparkles className="w-4 h-4 text-amber-500" /> High-Intensity Access Enabled
           </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
           {loading ? (
             <div className="col-span-full py-32 flex justify-center">
                <RefreshCw className="w-10 h-10 animate-spin text-blue-600" />
             </div>
           ) : submissions.map((s, i) => {
             const contacts = creatorContacts[s.creatorId] || creatorContacts["admin-kholofelo"];
             return (
               <motion.div 
                 key={s.id || i}
                 initial={{ opacity: 0, scale: 0.95 }}
                 animate={{ opacity: 1, scale: 1 }}
                 transition={{ delay: i * 0.1 }}
                 className="bg-white rounded-[3rem] p-10 shadow-2xl border border-blue-100 hover:border-blue-400 transition-all flex flex-col h-full relative group overflow-hidden"
               >
                  <div className="absolute top-0 right-0 w-48 h-48 bg-blue-50 rounded-full blur-3xl -mr-24 -mt-24 opacity-0 group-hover:opacity-100 transition-opacity" />
                  
                  <div className="flex items-center justify-between mb-8 relative z-10">
                     <div className="flex items-center gap-4">
                        <div className="w-12 h-12 bg-[#111827] rounded-xl flex items-center justify-center text-white text-xl font-black">
                           {(s.creatorName || "C")[0].toUpperCase()}
                        </div>
                        <div>
                           <div className="text-[10px] font-black text-blue-600 uppercase tracking-widest mb-0.5">Verified Creator</div>
                           <h4 className="text-2xl font-black text-[#111827] leading-none">{s.creatorName || "Kholofelo"}</h4>
                        </div>
                     </div>
                     <span className="text-[9px] font-black uppercase tracking-widest px-4 py-2 bg-blue-50 text-blue-600 rounded-full border border-blue-100">
                        {s.category}
                     </span>
                  </div>

                  <div className="mb-10 flex-grow relative z-10">
                     <h5 className="text-xl font-black mb-3 text-[#111827] group-hover:text-blue-700 transition-colors uppercase tracking-tight">{s.title}</h5>
                     <p className="text-sm text-[#111827]/50 font-medium leading-relaxed line-clamp-3 italic">
                        "{s.description}"
                     </p>
                  </div>

                  {/* High Intensity Contact Grid */}
                  <div className="grid grid-cols-2 gap-4 pt-10 border-t border-[#f5f5f4] relative z-10">
                     <a href={`mailto:${contacts.email}`} className="flex items-center gap-3 p-4 bg-gray-50 rounded-2xl hover:bg-[#111827] hover:text-white transition-all group/link shadow-sm">
                        <Mail className="w-4 h-4 text-blue-500 group-hover/link:text-white" />
                        <span className="text-[10px] font-black uppercase tracking-widest truncate">Email</span>
                     </a>
                     <a href={`tel:${contacts.phone}`} className="flex items-center gap-3 p-4 bg-gray-50 rounded-2xl hover:bg-[#111827] hover:text-white transition-all group/link shadow-sm">
                        <Phone className="w-4 h-4 text-[#2ecc71] group-hover/link:text-white" />
                        <span className="text-[10px] font-black uppercase tracking-widest truncate">Call Now</span>
                     </a>
                     <a href={contacts.whatsapp} target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 p-4 bg-gray-50 rounded-2xl hover:bg-[#111827] hover:text-white transition-all group/link shadow-sm">
                        <MessageCircle className="w-4 h-4 text-[#25D366] group-hover/link:text-white" />
                        <span className="text-[10px] font-black uppercase tracking-widest truncate">WhatsApp</span>
                     </a>
                     <a href={contacts.github} target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 p-4 bg-gray-50 rounded-2xl hover:bg-[#111827] hover:text-white transition-all group/link shadow-sm">
                        <Globe className="w-4 h-4 text-[#111827] group-hover/link:text-white" />
                        <span className="text-[10px] font-black uppercase tracking-widest truncate">GitHub</span>
                     </a>
                  </div>

                  <div className="mt-8 p-6 bg-blue-50/50 rounded-[1.5rem] border border-blue-100 flex items-center justify-between group-hover:bg-blue-100/50 transition-colors relative z-10">
                     <div className="flex items-center gap-3">
                        <BarChart3 className="w-5 h-5 text-blue-600" />
                        <div>
                           <div className="text-[9px] font-black uppercase tracking-widest opacity-40">Pitch Readiness</div>
                           <div className="text-[10px] font-black text-blue-700">GRANT READY (98%)</div>
                        </div>
                     </div>
                     <ArrowRight className="w-5 h-5 text-blue-300" />
                  </div>
               </motion.div>
             );
           })}
        </div>
      </div>
    </div>
  );
};

export default SponsorDashboard;
