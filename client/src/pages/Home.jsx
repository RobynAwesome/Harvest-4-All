import React from "react";
import { ArrowRight, TrendingUp, ChevronRight, Quote, Leaf, Zap, Droplet, Recycle, Sprout, ShoppingBag, BarChart3 } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useAppContext } from "../context/useAppContext";
import AnimatedCounter from "../components/AnimatedCounter";
import SMSTips from "../components/SMSTips";

const Home = () => {
  const navigate = useNavigate();
  const { waterSaved, energySaved, wasteReduced } = useAppContext();

  const totalMeals = 12450 + wasteReduced * 2;

  return (
    <section className="section-fade">
      {/* Hero Section */}
      <div className="relative overflow-hidden pt-20 pb-28 md:pt-32 md:pb-40 bg-white">
        <div className="absolute top-0 right-0 -z-10 w-1/2 h-full bg-[#115e59]/5 skew-x-12 transform origin-right"></div>
        <div className="max-w-7xl mx-auto px-4 flex flex-col lg:flex-row items-center gap-16">
          <div className="flex-1 text-center lg:text-left">
            <div className="inline-flex items-center gap-2 bg-[#2ecc71]/10 text-[#115e59] px-4 py-2 rounded-full text-xs font-black mb-8 tracking-[0.2em] uppercase border border-[#2ecc71]/20">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#2ecc71] opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-[#2ecc71]"></span>
              </span>
              Western Cape Community Action
            </div>

            <h1 className="text-6xl md:text-8xl font-black text-[#111827] leading-[0.9] mb-8 font-heading">
              Grow Your Own <br />
              <span className="text-gradient">Future.</span>
            </h1>
            <p className="text-xl text-[#111827]/60 mb-12 max-w-xl mx-auto lg:mx-0 font-medium leading-relaxed">
              Empowering South African communities to bypass food insecurity and rising costs through smart urban farming and sustainable action.
            </p>
            <div className="flex flex-col sm:flex-row gap-5 justify-center lg:justify-start">
              <button
                onClick={() => navigate("/grow")}
                className="btn-premium btn-emerald flex items-center justify-center gap-3 text-lg"
              >
                Start Growing <ArrowRight className="w-6 h-6" />
              </button>
              <button
                onClick={() => navigate("/impact")}
                className="btn-premium bg-[#111827] text-white hover:bg-[#115e59] flex items-center justify-center gap-3 text-lg shadow-xl"
              >
                View Live Impact <TrendingUp className="w-5 h-5" />
              </button>
            </div>
          </div>
          <div className="flex-1 relative animate-float">
            <div className="absolute -z-10 bg-[#2ecc71]/20 w-80 h-80 rounded-full blur-[100px] top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"></div>
            <div className="relative p-4 md:p-8 bg-white/40 backdrop-blur-sm rounded-[3rem] border border-[#115e59]/10 shadow-2xl">
              <img
                src="/General images/Gemini_Generated_Image_emx36yemx36yemx3.png"
                alt="Urban container garden with fresh vegetables"
                loading="lazy"
                className="rounded-[2rem] shadow-lg w-full h-[400px] object-cover"
              />
              <div className="absolute -bottom-6 -left-6 bg-white p-6 rounded-3xl shadow-2xl border border-[#115e59]/5 animate-bounce">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-[#2ecc71] rounded-2xl flex items-center justify-center text-white shadow-lg">
                    <Leaf className="w-7 h-7" />
                  </div>
                  <div>
                    <div className="text-[10px] font-black uppercase text-[#111827]/40 tracking-widest">Global Status</div>
                    <div className="font-black text-[#111827]">Growing +12%</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Problem Statement — presentation alignment */}
      <div className="bg-gradient-to-br from-[#111827] via-[#0f2b29] to-[#111827] py-16 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-red-900/10 via-transparent to-amber-900/10" />
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-red-500/5 rounded-full blur-[120px]" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-amber-500/5 rounded-full blur-[120px]" />
        <div className="max-w-7xl mx-auto px-4 relative z-10">
          <div className="text-center mb-10">
            <div className="inline-flex items-center gap-2 bg-red-500/10 text-red-400 px-4 py-1.5 rounded-full text-[10px] font-black tracking-widest uppercase border border-red-500/20 mb-4">
              <span className="relative flex h-2 w-2"><span className="animate-ping absolute h-full w-full rounded-full bg-red-400 opacity-75"></span><span className="relative rounded-full h-2 w-2 bg-red-400"></span></span>
              The Crisis We're Solving
            </div>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {[
              { stat: "15-18%", desc: "WC households face severe food insecurity", icon: "🚨", gradient: "from-red-500/20 to-red-900/10" },
              { stat: "68,000+", desc: "Subsistence farming households in Western Cape", icon: "🏘️", gradient: "from-amber-500/20 to-amber-900/10" },
              { stat: "23%", desc: "Water lost through Cape Town's infrastructure leaks", icon: "���", gradient: "from-blue-500/20 to-blue-900/10" },
              { stat: "12.74%", desc: "Eskom tariff hike approved for 2025/26", icon: "⚡", gradient: "from-yellow-500/20 to-yellow-900/10" },
            ].map((s, i) => (
              <div key={i} className={`bg-gradient-to-br ${s.gradient} backdrop-blur-sm rounded-2xl p-6 border border-white/5 text-center hover:scale-105 transition-all cursor-default group`}>
                <div className="text-3xl mb-3 group-hover:scale-110 transition-transform">{s.icon}</div>
                <div className="text-3xl md:text-4xl font-black text-white mb-2 font-heading">{s.stat}</div>
                <div className="text-[10px] font-bold uppercase tracking-widest text-white/50 leading-tight">{s.desc}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Stats Board — Community Impact */}
      <div className="bg-gradient-to-b from-[#f5f5f4] to-white py-20">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-12">
            <div className="inline-block text-[10px] font-black uppercase tracking-[0.4em] text-[#2ecc71] mb-3">Live Community Impact</div>
            <h2 className="text-4xl font-black text-[#111827] font-heading leading-none">What We've Built <span className="text-[#2ecc71]">Together</span></h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { label: "Meals Grown", val: totalMeals, suf: "", icon: Leaf, color: "text-[#2ecc71]", bg: "bg-emerald-50", border: "border-emerald-200", glow: "shadow-emerald-100", route: "/grow" },
              { label: "Water Saved", val: waterSaved, suf: "L", icon: Droplet, color: "text-blue-500", bg: "bg-blue-50", border: "border-blue-200", glow: "shadow-blue-100", route: "/save" },
              { label: "Energy Saved", val: energySaved, suf: "pts", icon: Zap, color: "text-amber-500", bg: "bg-amber-50", border: "border-amber-200", glow: "shadow-amber-100", route: "/save" },
              { label: "Waste Diverted", val: wasteReduced, suf: "kg", icon: Recycle, color: "text-emerald-600", bg: "bg-green-50", border: "border-green-200", glow: "shadow-green-100", route: "/reduce" },
            ].map((stat, i) => (
              <div
                key={i}
                onClick={() => navigate(stat.route)}
                className={`${stat.bg} p-8 rounded-3xl border-2 ${stat.border} shadow-xl ${stat.glow} transition-all hover:scale-105 hover:shadow-2xl cursor-pointer group relative overflow-hidden`}
              >
                <div className={`absolute top-0 right-0 w-32 h-32 ${stat.bg} rounded-full -translate-y-1/2 translate-x-1/2 opacity-50`} />
                <div className={`${stat.color} mb-4 relative z-10`}>
                  <div className={`w-14 h-14 ${stat.bg} rounded-2xl flex items-center justify-center border ${stat.border} group-hover:scale-110 transition-transform`}>
                    <stat.icon className="w-7 h-7" />
                  </div>
                </div>
                <div className="text-4xl font-black text-[#111827] font-heading leading-none mb-2 relative z-10">
                  <AnimatedCounter end={stat.val} suffix={stat.suf} />
                </div>
                <div className="text-xs font-black text-[#111827]/40 uppercase tracking-widest leading-none relative z-10">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Latest Activity Feed */}
      <div className="max-w-7xl mx-auto px-4 py-20 border-b border-[#115e59]/5 animate-in slide-in-from-bottom-10 fade-in duration-700">
        <div className="flex items-center gap-6 mb-16">
           <div className="h-px flex-1 bg-gradient-to-r from-transparent via-[#115e59]/10 to-[#115e59]/20"></div>
           <h3 className="text-[10px] font-black uppercase tracking-[0.5em] text-[#115e59]/60 font-heading">Provincial Activity Dispatch</h3>
           <div className="h-px flex-1 bg-gradient-to-l from-transparent via-[#115e59]/10 to-[#115e59]/20"></div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            { user: "Mama Sisulu", loc: "Khayelitsha", act: "Logged 5.2kg Carrots", time: "2m ago", icon: <Leaf className="w-5 h-5" /> },
            { user: "JP Jordaan", loc: "Mitchells Plain", act: "Filtered 45L Greywater", time: "14m ago", icon: <Droplet className="w-5 h-5" /> },
            { user: "Noli M.", loc: "Gugulethu", act: "Swap: 10 Tomato Seedlings", time: "1h ago", icon: <ArrowRight className="w-5 h-5" /> },
          ].map((item, j) => (
            <div key={j} className="flex items-center gap-6 p-8 rounded-3xl bg-white/40 backdrop-blur-sm border border-[#115e59]/10 hover:shadow-2xl hover:bg-white transition-all group relative overflow-hidden">
               <div className="absolute top-0 right-0 p-4 opacity-5 pointer-events-none group-hover:scale-150 transition-transform">
                  {item.icon}
               </div>
              <div className="w-14 h-14 rounded-2xl bg-[#115e59]/5 flex items-center justify-center text-[#115e59] group-hover:bg-[#115e59] group-hover:text-white transition-all shadow-inner">
                {item.icon}
              </div>
              <div className="flex-1">
                <div className="flex items-center justify-between gap-2 mb-1.5">
                  <span className="font-black text-[#111827] text-base leading-none font-heading">{item.user}</span>
                  <span className="px-2 py-0.5 rounded-lg bg-[#2ecc71]/10 text-[#2ecc71] text-[7px] font-black uppercase tracking-widest border border-[#2ecc71]/20">Verified Gardener</span>
                </div>
                <div className="text-sm font-bold text-[#115e59]/80 group-hover:text-[#115e59] transition-colors">{item.act}</div>
                <div className="text-[9px] font-black text-[#111827]/40 uppercase tracking-widest mt-2">{item.loc} • {item.time}</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Our 5 Pillars — presentation solution slide */}
      <div className="relative py-24 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-white via-[#115e59]/[0.03] to-white" />
        <div className="max-w-7xl mx-auto px-4 relative z-10">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 bg-[#115e59]/10 text-[#115e59] px-4 py-1.5 rounded-full text-[10px] font-black tracking-widest uppercase border border-[#115e59]/20 mb-4">
              Our Solution
            </div>
            <h2 className="text-5xl md:text-6xl font-black text-[#111827] font-heading leading-none mb-5">
              Five <span className="text-gradient">Pillars</span> of Change
            </h2>
            <p className="text-[#111827]/50 max-w-xl mx-auto font-medium text-lg">
              One platform. Five actions. Township-first design that creates measurable, gamified community impact.
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-5">
            {[
              { icon: Sprout, label: "Grow", sub: "Urban & container farming guide for WC crops", route: "/grow", color: "from-emerald-500 to-green-600", lightBg: "bg-emerald-50", border: "border-emerald-200", num: "01" },
              { icon: Recycle, label: "Reduce", sub: "Zero waste challenge & local recycling hubs", route: "/reduce", color: "from-green-500 to-teal-600", lightBg: "bg-green-50", border: "border-green-200", num: "02" },
              { icon: Droplet, label: "Save", sub: "Water & energy conservation tracker", route: "/save", color: "from-blue-500 to-cyan-600", lightBg: "bg-blue-50", border: "border-blue-200", num: "03" },
              { icon: ShoppingBag, label: "Market", sub: "Community buy, sell & swap platform", route: "/market", color: "from-amber-500 to-orange-600", lightBg: "bg-amber-50", border: "border-amber-200", num: "04" },
              { icon: BarChart3, label: "Impact", sub: "Live dashboard — points, badges & stats", route: "/impact", color: "from-purple-500 to-indigo-600", lightBg: "bg-purple-50", border: "border-purple-200", num: "05" },
            ].map((p, i) => (
              <button
                key={i}
                onClick={() => navigate(p.route)}
                className={`${p.lightBg} border-2 ${p.border} rounded-3xl p-7 text-left hover:scale-[1.08] hover:shadow-2xl transition-all group relative overflow-hidden`}
              >
                <div className="absolute top-0 right-0 text-[80px] font-black opacity-[0.04] leading-none -mt-2 -mr-2 select-none">{p.num}</div>
                <div className={`w-12 h-12 bg-gradient-to-br ${p.color} rounded-2xl flex items-center justify-center text-white mb-5 group-hover:scale-110 group-hover:rotate-3 transition-all shadow-lg`}>
                  <p.icon className="w-6 h-6" />
                </div>
                <div className="font-black text-xl mb-2 text-[#111827]">{p.label}</div>
                <div className="text-xs font-medium text-[#111827]/50 leading-snug">{p.sub}</div>
                <div className={`mt-4 inline-flex items-center gap-1 text-[10px] font-black uppercase tracking-widest opacity-0 group-hover:opacity-100 transition-opacity bg-gradient-to-r ${p.color} bg-clip-text text-transparent`}>
                  Explore <ArrowRight className="w-3 h-3 text-[#115e59]" />
                </div>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Live Feed */}
      <div className="max-w-7xl mx-auto px-4 py-32">
        <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
          <div className="max-w-xl">
            <h2 className="text-5xl font-black text-[#111827] mb-4 font-heading leading-[0.9]">
              Community <span className="text-[#2ecc71]">Resilience</span>
            </h2>
            <p className="text-[#111827]/60 font-medium">
              Real-time evidence of change from neighbors taking control of their food supply and environmental footprint.
            </p>
          </div>
          <button 
            onClick={() => navigate("/impact")}
            className="group flex items-center gap-3 font-black text-xs uppercase tracking-[0.2em] text-[#115e59] hover:text-[#2ecc71] transition-all"
          >
            Explore Global Feed <ChevronRight className="w-5 h-5 group-hover:translate-x-2 transition-transform" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {[
            { tag: "GROW", city: "Khayelitsha", title: "Thandi harvested 5kg", desc: "First harvest from my vertical tyre garden. Fed the whole family tonight!", img: "/community resilience/growth.png", icon: "T", route: "/grow", color: "text-[#2ecc71]" },
            { tag: "SAVE", city: "Mitchells Plain", title: "Leon saved R120", desc: "Reduced municipal water and energy cost using a greywater filtration system.", img: "/community resilience/reduce waste.png", icon: "L", route: "/save", color: "text-blue-500" },
            { tag: "MARKET", city: "Gugulethu", title: "New Seedlings Available", desc: "I have 10 tomato seedlings to swap for kale or compost. Let's grow together!", img: "/community resilience/market.png", icon: "S", route: "/market", color: "text-amber-500" },
          ].map((post, i) => (
            <div 
              key={i}
              onClick={() => navigate(post.route)}
              className="card-premium group cursor-pointer overflow-hidden"
            >
              <div className="h-64 overflow-hidden relative">
                <img
                  src={post.img}
                  alt={post.title}
                  loading="lazy"
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                />
                <div className="absolute top-4 left-4 bg-white/90 backdrop-blur px-3 py-1 rounded-full text-[10px] font-black tracking-widest uppercase">
                  {post.city}
                </div>
              </div>
              <div className="p-8">
                <div className={`flex items-center gap-2 mb-6 text-[10px] font-black tracking-widest uppercase ${post.color}`}>
                  {post.tag}
                </div>
                <h3 className="text-2xl font-black mb-4 leading-tight font-heading group-hover:text-[#115e59] transition-colors">
                  {post.title}
                </h3>
                <p className="text-[#111827]/60 text-sm italic font-medium mb-8 leading-relaxed">
                  "{post.desc}"
                </p>
                <div className="flex items-center gap-3 border-t border-[#111827]/5 pt-6">
                  <div className="w-10 h-10 rounded-full bg-[#111827] flex items-center justify-center text-white text-xs font-black">
                    {post.icon}
                  </div>
                  <span className="text-xs font-black uppercase tracking-widest text-[#111827]/40">Verified Member</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Community Testimonials */}
      <div className="max-w-7xl mx-auto px-4 pb-40">
        <div className="bg-[#115e59] rounded-[4rem] p-16 md:p-24 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-[#2ecc71]/10 rounded-full -translate-y-1/2 translate-x-1/2 blur-3xl"></div>
          <div className="relative text-center mb-20">
            <h2 className="text-white text-5xl font-black font-heading mb-6 leading-none">
              Voices of Change
            </h2>
            <div className="w-24 h-2 bg-[#2ecc71] mx-auto rounded-full"></div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            {[
              { text: "My kids now know where food comes from. We trade seedlings with neighbours every weekend. It's brought the street together.", name: "Mama Zuki", loc: "Gugulethu" },
              { text: "The greywater system tips cut our water bill by 60%. Every rand counts when you're feeding a large family in the Cape.", name: "Ahmad D.", loc: "Mitchells Plain" },
              { text: "Since starting my tyre garden, we save R400/month on veg. The kids love watching the spinach grow from seeds.", name: "Noluthando M.", loc: "Khayelitsha" },
            ].map((t, i) => (
              <div key={i} className="bg-white/5 backdrop-blur-sm p-10 rounded-3xl border border-white/10 relative">
                <Quote className="w-10 h-10 text-[#2ecc71]/20 absolute -top-5 left-10" />
                <p className="text-white/80 italic text-lg leading-relaxed mb-8">
                  "{t.text}"
                </p>
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-[#2ecc71] rounded-2xl flex items-center justify-center text-[#115e59] font-black text-xl">
                    {t.name[0]}
                  </div>
                  <div>
                    <div className="text-white font-black text-sm uppercase tracking-widest">{t.name}</div>
                    <div className="text-[#2ecc71] text-[10px] font-black uppercase tracking-widest">{t.loc}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Accessibility Section (SMS Tips) */}
      <div className="max-w-4xl mx-auto px-4 pb-40">
        <SMSTips />
      </div>
    </section>
  );
};

export default Home;
