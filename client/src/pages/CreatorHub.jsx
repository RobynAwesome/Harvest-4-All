import React from "react";
import { useNavigate } from "react-router-dom";
import { ShoppingBag, Zap, ArrowRight, ShieldCheck, Sparkles } from "lucide-react";

const CreatorHub = () => {
  const navigate = useNavigate();

  const options = [
    {
      id: "market",
      title: "Creator Market",
      desc: "Add crops, set your prices, and earn from your urban harvest.",
      icon: ShoppingBag,
      color: "from-[#115e59] to-[#0f766e]",
      path: "/creator/market",
      fee: "Min R49 listing fee per crop"
    },
    {
      id: "submissions",
      title: "Creator Submissions",
      desc: "Submit sustainable ideas and visionary tech to be pitched to sponsors.",
      icon: Zap,
      color: "from-amber-600 to-orange-500",
      path: "/creator/submissions",
      fee: "R299 / month subscription (Billed Annually)"
    }
  ];

  return (
    <div className="section-fade py-20 px-4 min-h-screen bg-[#f5f5f4]">
      <div className="max-w-5xl mx-auto">
        {/* Welcome Section */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 bg-[#115e59]/10 text-[#115e59] px-6 py-2 rounded-full text-[10px] font-black tracking-widest uppercase mb-8 border border-[#115e59]/20">
             <Sparkles className="w-3.5 h-3.5" /> Platinum Creator Hub
          </div>
          <h1 className="text-5xl md:text-6xl font-black text-[#111827] mb-6 font-heading leading-tight">
            Welcome Back, <span className="text-gradient">Visionary</span>.
          </h1>
          <p className="text-lg text-[#111827]/60 font-medium max-w-2xl mx-auto leading-relaxed">
            Your creations bridge the gap between technology and township resilience. 
            Select your workspace below to manage your impact.
          </p>
        </div>

        {/* Dashboard Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {options.map((opt) => {
            const Icon = opt.icon;
            return (
              <div 
                key={opt.id}
                onClick={() => navigate(opt.path)}
                className="group relative bg-white rounded-[3rem] p-10 shadow-2xl border border-[#111827]/5 hover:border-[#115e59]/20 transition-all cursor-pointer overflow-hidden transform hover:-translate-y-2 hover:shadow-[0_40px_80px_-20px_rgba(17,94,89,0.15)]"
              >
                <div className={`absolute top-0 right-0 w-32 h-32 bg-gradient-to-br ${opt.color} opacity-5 rounded-bl-[4rem] group-hover:scale-110 transition-transform`} />
                
                <div className={`w-16 h-16 bg-gradient-to-br ${opt.color} rounded-2xl flex items-center justify-center text-white mb-8 shadow-lg group-hover:rotate-12 transition-transform`}>
                  <Icon className="w-8 h-8" />
                </div>

                <h3 className="text-3xl font-black text-[#111827] mb-4 font-heading">{opt.title}</h3>
                <p className="text-sm text-[#111827]/60 font-medium mb-12 leading-relaxed">
                  {opt.desc}
                </p>

                <div className="flex items-center justify-between border-t border-[#111827]/5 pt-8">
                  <div className="text-[10px] font-black uppercase tracking-widest text-[#111827]/30"> {opt.fee} </div>
                  <div className="text-[#115e59] font-black text-xs uppercase tracking-widest flex items-center gap-2 group-hover:gap-3 transition-all">
                    Enter Workspace <ArrowRight className="w-4 h-4" />
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Security / Verification Badge */}
        <div className="mt-20 p-8 bg-white border border-[#115e59]/10 rounded-[2.5rem] flex flex-col md:flex-row items-center gap-10 shadow-xl max-w-3xl mx-auto">
           <div className="bg-[#115e59]/5 p-6 rounded-3xl">
              <ShieldCheck className="w-12 h-12 text-[#115e59]" />
           </div>
           <div>
              <h4 className="font-black text-xl mb-2">Authenticated Creator Access</h4>
              <p className="text-sm text-[#111827]/50 font-medium leading-relaxed">
                 Your account is verified for the **MICT SETA 2026 Skills Challenge**. 
                 All sustainable energy submissions are protected by local encryption.
              </p>
           </div>
        </div>
      </div>
    </div>
  );
};

export default CreatorHub;
