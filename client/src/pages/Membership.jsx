import React, { useState } from "react";
import { 
  Check, 
  Sparkles, 
  Zap, 
  Shield, 
  Globe, 
  BarChart3, 
  Award,
  ArrowRight
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const Membership = () => {
  const [tier, setTier] = useState("creator"); // creator or sponsor

  const plans = {
    creator: [
      {
        name: "Eco-Basic",
        price: "R49",
        period: "per listing",
        desc: "Ideal for local growers starting their market journey.",
        features: [
          "Single Market Listing",
          "Basic AI Relevance Scan",
          "Public Support Hub Access",
          "Standard Delivery Integration"
        ],
        icon: BarChart3,
        color: "from-emerald-500 to-teal-600",
        btnText: "Start Listing"
      },
      {
        name: "Visionary Hub",
        price: "R299",
        period: "/month",
        popular: true,
        desc: "The ultimate tier for serious innovators & tech creators.",
        features: [
          "Unlimited Market Listings",
          "Sustainability Vision Pitching",
          "Direct Sponsor Pipeline Access",
          "Verified Creator Badge (Platinum)",
          "Advanced Sales Analytics"
        ],
        icon: Zap,
        color: "from-amber-500 to-orange-600",
        btnText: "Join the Visionaries"
      },
      {
        name: "Creator Elite",
        price: "R2499",
        period: "/year",
        desc: "Full annual access with exclusive mentorship perks.",
        features: [
          "Everything in Visionary +",
          "Founder-led Strategy Session",
          "Priority Pitch Placement",
          "Eco-Certificate Sponsorship",
          "Zero Transaction Fees"
        ],
        icon: Award,
        color: "from-indigo-500 to-purple-600",
        btnText: "Go Elite"
      }
    ],
    sponsor: [
      {
        name: "Growth Partner",
        price: "R10k",
        period: "/year",
        desc: "Support local resilience and gain brand visibility.",
        features: [
          "Community Hero Badge",
          "Impact Reporting (Monthly)",
          "Public Impact Page Feature",
          "Dedicated Partner Support"
        ],
        icon: Globe,
        color: "from-blue-500 to-sky-600",
        btnText: "Become a Partner"
      },
      {
        name: "Innovation Donor",
        price: "R50k",
        period: "/year",
        popular: true,
        desc: "Fund high-impact sustainable energy & harvest tech.",
        features: [
          "Detailed Creator Connect Access",
          "Quarterly Strategy Board Input",
          "Prime Sponsor Placement",
          "Annual Gala Invitation",
          "Custom Impact Case Study"
        ],
        icon: Sparkles,
        color: "from-[#2ecc71] to-emerald-700",
        btnText: "Empower Innovation"
      },
      {
        name: "Strategic Patron",
        price: "Custom",
        period: "Enquire",
        desc: "Deep integration for institutional investors & large orgs.",
        features: [
          "Full Platform Integration",
          "Bespoke Dashboard Access",
          "Early Access to Vision IPs",
          "Direct Policy Influence",
          "Lifetime Impact Recognition"
        ],
        icon: Shield,
        color: "from-red-500 to-rose-700",
        btnText: "Contact Founder"
      }
    ]
  };

  return (
    <div className="section-fade py-24 px-4 bg-[#f5f5f4] min-h-screen">
      <div className="max-w-7xl mx-auto">
        
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 bg-[#115e59]/10 text-[#115e59] px-6 py-2 rounded-full text-[10px] font-black tracking-widest uppercase mb-8 border border-[#115e59]/20">
             <Shield className="w-4 h-4" /> Secure Membership Selection
          </div>
          <h1 className="text-5xl md:text-7xl font-black text-[#111827] font-heading mb-6 tracking-tight leading-tight">
            Empower Your <span className="text-gradient from-emerald-600 to-teal-700 font-black">Future.</span>
          </h1>
          <p className="text-xl text-[#111827]/50 font-medium max-w-2xl mx-auto mb-12">
            Choose a tier that matches your ambition. Whether you are growing a garden or an institution, we have a place for you.
          </p>

          {/* Toggle Switches */}
          <div className="flex justify-center mb-20 relative">
             <div className="bg-white p-2 rounded-3xl border border-[#111827]/5 shadow-2xl flex relative overflow-hidden">
                <div 
                  className={`absolute top-2 bottom-2 left-2 w-[calc(50%-8px)] rounded-2xl bg-[#111827] transition-all duration-300 transform ${tier === 'sponsor' ? 'translate-x-[calc(100%+8px)]' : ''}`} 
                />
                <button 
                  onClick={() => setTier("creator")}
                  className={`relative z-10 px-8 py-3 rounded-2xl text-xs font-black uppercase tracking-widest transition-colors ${tier === 'creator' ? 'text-white' : 'text-[#111827]/40'}`}
                >
                   Creators Hub
                </button>
                <button 
                  onClick={() => setTier("sponsor")}
                  className={`relative z-10 px-8 py-3 rounded-2xl text-xs font-black uppercase tracking-widest transition-colors ${tier === 'sponsor' ? 'text-white' : 'text-[#111827]/40'}`}
                >
                   Investors Hub
                </button>
             </div>
          </div>
        </div>

        {/* Pricing Grid */}
        <AnimatePresence mode="wait">
           <motion.div 
             key={tier}
             initial={{ opacity: 0, y: 20 }}
             animate={{ opacity: 1, y: 0 }}
             exit={{ opacity: 0, y: -20 }}
             className="grid grid-cols-1 md:grid-cols-3 gap-8"
           >
              {plans[tier].map((p, i) => {
                const Icon = p.icon;
                return (
                  <div 
                    key={p.name}
                    className={`relative bg-white rounded-[3rem] p-10 border transition-all ${p.popular ? 'border-[#115e59] shadow-[0_40px_80px_-20px_rgba(17,94,89,0.2)] scale-105 z-10' : 'border-[#111827]/5 shadow-xl hover:-translate-y-2'}`}
                  >
                     {p.popular && (
                       <div className="absolute -top-5 left-1/2 -translate-x-1/2 bg-[#115e59] text-white px-6 py-2 rounded-full text-[10px] font-black uppercase tracking-widest shadow-lg">
                          Most Popular
                       </div>
                     )}

                     <div className="mb-8">
                        <div className={`w-14 h-14 bg-gradient-to-br ${p.color} rounded-2xl flex items-center justify-center text-white mb-6 shadow-2xl shadow-${p.color.split(' ')[0]}/20`}>
                           <Icon className="w-7 h-7" />
                        </div>
                        <h3 className="text-2xl font-black text-[#111827] font-heading mb-1">{p.name}</h3>
                        <p className="text-xs text-[#111827]/40 font-bold uppercase tracking-widest">{tier} Membership</p>
                     </div>

                     <div className="flex items-baseline gap-2 mb-8">
                        <span className="text-5xl font-black text-[#111827] tracking-tighter">{p.price}</span>
                        <span className="text-[10px] font-black text-[#111827]/30 uppercase tracking-[0.2em]">{p.period}</span>
                     </div>

                     <p className="text-sm text-[#111827]/50 font-medium leading-relaxed mb-10 pb-8 border-b border-[#111827]/5">
                        {p.desc}
                     </p>

                     <ul className="space-y-4 mb-12">
                        {p.features.map(f => (
                           <li key={f} className="flex items-center gap-3">
                              <div className={`w-5 h-5 rounded-full bg-gradient-to-br ${p.color} flex items-center justify-center bg-opacity-10 text-white shrink-0 shadow-sm`}>
                                 <Check className="w-3 h-3" />
                              </div>
                              <span className="text-sm font-medium text-[#111827]/70 leading-none">{f}</span>
                           </li>
                        ))}
                     </ul>

                     <button className={`w-full py-5 rounded-2xl flex items-center justify-center gap-2 font-black text-xs uppercase tracking-widest transition-all ${p.popular ? 'bg-[#111827] text-white hover:bg-[#115e59] shadow-2xl' : 'bg-[#f5f5f4] text-[#111827] hover:bg-[#111827] hover:text-white border border-[#111827]/5'}`}>
                        {p.btnText} <ArrowRight className="w-4 h-4" />
                     </button>
                  </div>
                );
              })}
           </motion.div>
        </AnimatePresence>

        {/* Confidence Badge */}
        <div className="mt-24 text-center">
           <div className="inline-flex items-center gap-6 px-10 py-6 bg-white rounded-[2.5rem] border border-[#111827]/5 shadow-2xl group overflow-hidden relative">
              <div className="absolute inset-0 bg-emerald-50 opacity-0 group-hover:opacity-100 transition-opacity" />
              <div className="relative z-10 flex items-center gap-6">
                 <Shield className="w-10 h-10 text-emerald-500" />
                 <div className="text-left leading-tight">
                    <p className="text-[10px] font-black text-[#111827]/30 uppercase tracking-widest mb-1">MICT SETA CHALLENGE 2026</p>
                    <p className="font-black text-[#111827]">All memberships contribute directly to township resilience.</p>
                 </div>
              </div>
           </div>
        </div>

      </div>
    </div>
  );
};

export default Membership;
