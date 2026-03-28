import React, { useState } from "react";
import { Send, Phone, CheckCircle, AlertTriangle, Hash } from "lucide-react";
import axios from "axios";

const SMSTips = () => {
  const [phone, setPhone] = useState("");
  const [category, setCategory] = useState("general");
  const [status, setStatus] = useState(null); // 'success' | 'error' | null
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  // Africa's Talking Sandbox Shortcode
  const ussdCode = "*384*18640#"; 

  const categories = [
    { id: "general", label: "General", emoji: "📢" },
    { id: "grow", label: "Grow", emoji: "🌱" },
    { id: "reduce", label: "Reduce", emoji: "♻️" },
    { id: "save", label: "Save", emoji: "💧" },
    { id: "market", label: "Market", emoji: "🛒" },
  ];

  const handleSend = async () => {
    if (!phone || phone.length < 10) {
      setStatus("error");
      setMessage("Please enter a valid South African phone number.");
      return;
    }

    setLoading(true);
    setStatus(null);
    setMessage("");

    try {
      const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000/api";
      const res = await axios.post(`${API_URL}/messaging/send-tip`, {
        phone,
        category,
      });

      if (res.data.success) {
        setStatus("success");
        setMessage("✅ Tip sent! Check your phone.");
        setPhone("");
      } else {
        setStatus("error");
        setMessage("❌ Failed to send. Please try again.");
      }
    } catch (err) {
      console.error(err);
      setStatus("error");
      setMessage("❌ Connection error. Is the server running?");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="card-premium p-8 md:p-12 relative overflow-hidden group">
      {/* Background Glow */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-[#2ecc71]/5 rounded-full -translate-y-1/2 translate-x-1/2 blur-[80px] pointer-events-none group-hover:bg-[#2ecc71]/10 transition-all"></div>
      
      <div className="relative z-10">
        <div className="flex items-center gap-4 mb-8">
           <div className="w-12 h-12 bg-[#115e59] rounded-2xl flex items-center justify-center text-white shadow-xl">
              <Phone className="w-6 h-6" />
           </div>
           <div>
              <h3 className="text-2xl font-black font-heading text-[#111827]">Accessibility <span className="text-[#2ecc71]">Hub</span></h3>
              <p className="text-[10px] font-black uppercase tracking-[0.3em] text-[#115e59]/60">SMS & USSD Interactive Services</p>
           </div>
        </div>

        <p className="text-sm font-medium text-[#111827]/60 mb-8 leading-relaxed">
           Stay connected to the community even without a smartphone or data. We deliver agricultural education to every resident in the Western Cape.
        </p>

        <div className="space-y-6">
           <div>
              <label className="text-[10px] font-black uppercase tracking-widest text-[#111827]/40 mb-3 block">1. Choose SMS Tip Stream</label>
              <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
                 {categories.map((cat) => (
                    <button
                       key={cat.id}
                       onClick={() => setCategory(cat.id)}
                       className={`py-3 px-2 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all border ${
                          category === cat.id 
                             ? "bg-[#115e59] text-white border-[#115e59] shadow-lg scale-105" 
                             : "bg-white border-[#115e59]/10 text-[#111827]/40 hover:border-[#115e59]/30"
                       }`}
                    >
                       <span className="block text-lg mb-1">{cat.emoji}</span>
                       {cat.label}
                    </button>
                 ))}
              </div>
           </div>

           <div className="relative">
              <input
                type="tel"
                placeholder="SA Number (e.g., 082 123 4567)"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="w-full pl-12 pr-6 py-5 rounded-2xl bg-[#f5f5f4] border-2 border-transparent focus:border-[#2ecc71] focus:bg-white transition-all text-[#111827] font-black placeholder:text-[#111827]/20"
              />
              <Phone className="w-5 h-5 absolute left-4 top-1/2 -translate-y-1/2 text-[#111827]/20" />
           </div>

           <button
             onClick={handleSend}
             disabled={loading}
             className="w-full btn-premium btn-emerald shadow-xl py-5 flex items-center justify-center gap-3 active:scale-95 disabled:opacity-50"
           >
              {loading ? (
                 <span className="animate-pulse">PROCESSING...</span>
              ) : (
                 <>
                    SEND FREE SMS TIP <Send className="w-5 h-5" />
                 </>
              )}
           </button>

           {status && (
              <div className={`flex items-center gap-3 p-4 rounded-xl text-xs font-black uppercase tracking-widest animate-in fade-in slide-in-from-top-2 duration-300 ${
                 status === "success" 
                    ? "bg-[#2ecc71]/10 text-[#115e59] border border-[#2ecc71]/20" 
                    : "bg-red-50 text-red-600 border border-red-100"
              }`}>
                 {status === "success" ? <CheckCircle className="w-4 h-4" /> : <AlertTriangle className="w-4 h-4" />}
                 {message}
              </div>
           )}

           <div className="mt-12 pt-8 border-t border-[#115e59]/10 text-center animate-in slide-in-from-bottom-2 duration-700">
              <div className="bg-[#115e59]/5 inline-block px-4 py-1 rounded-full text-[10px] font-black uppercase tracking-widest text-[#115e59] mb-4">
                 Alternative Service
              </div>
              <h4 className="text-xl font-black font-heading text-[#111827] mb-2">2. Offline USSD Menu</h4>
              <p className="text-xs text-[#111827]/60 mb-6">Dial this code on any phone for a full interactive garden guide</p>
              
              <div className="inline-flex items-center gap-4 bg-[#111827] text-white p-6 rounded-3xl shadow-2xl relative group/code overflow-hidden active:scale-95 transition-transform">
                 <div className="absolute top-0 left-0 w-full h-full bg-[#2ecc71] -translate-x-full group-hover/code:translate-x-0 transition-transform duration-500 opacity-20"></div>
                 <Hash className="w-8 h-8 text-[#2ecc71]" />
                 <span className="text-4xl font-black tracking-tighter font-heading">{ussdCode}</span>
              </div>
              
              <div className="mt-8 grid grid-cols-2 gap-4 max-w-sm mx-auto">
                 <div className="p-3 bg-white border border-[#115e59]/5 rounded-xl">
                    <div className="text-[8px] font-black uppercase tracking-widest text-[#111827]/30 mb-1">Status</div>
                    <div className="text-[10px] font-black text-[#2ecc71]">LIVE IN SANDBOX</div>
                 </div>
                 <div className="p-3 bg-white border border-[#115e59]/5 rounded-xl">
                    <div className="text-[8px] font-black uppercase tracking-widest text-[#111827]/30 mb-1">Cost</div>
                    <div className="text-[10px] font-black text-[#111827]">ZERO DATA</div>
                 </div>
              </div>
           </div>
        </div>

        <div className="mt-12 pt-8 border-t border-[#115e59]/5 text-[9px] font-black uppercase tracking-[0.2em] text-[#111827]/30 text-center italic">
           Standard network rates do not apply. Secure accessibility initiative.
        </div>
      </div>
    </div>
  );
};

export default SMSTips;
