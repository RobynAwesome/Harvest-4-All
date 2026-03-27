import React from "react";
import { ArrowRight, TrendingUp, ChevronRight, Trash2, Quote, Leaf, Zap, Droplet, Recycle } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useAppContext } from "../context/useAppContext";
import AnimatedCounter from "../components/AnimatedCounter";

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
                View Live Impact <TrendingUp className="w-5 s-5" />
              </button>
            </div>
          </div>
          <div className="flex-1 relative animate-float">
            <div className="absolute -z-10 bg-[#2ecc71]/20 w-80 h-80 rounded-full blur-[100px] top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"></div>
            <div className="relative p-4 md:p-8 bg-white/40 backdrop-blur-sm rounded-[3rem] border border-[#115e59]/10 shadow-2xl">
              <img
                src="https://images.unsplash.com/photo-1592419044706-39796d40f98c?auto=format&fit=crop&q=80&w=1000"
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

      {/* Stats Board */}
      <div className="max-w-7xl mx-auto px-4 -mt-20 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            { label: "Meals Grown", val: totalMeals, suf: "", icon: Leaf, color: "text-[#2ecc71]", border: "border-[#2ecc71]" },
            { label: "Water Saved", val: waterSaved, suf: "L", icon: Droplet, color: "text-blue-500", border: "border-blue-500" },
            { label: "Energy Saved", val: energySaved, suf: "pts", icon: Zap, color: "text-amber-500", border: "border-amber-500" },
            { label: "Waste Diverted", val: wasteReduced, suf: "kg", icon: Recycle, color: "text-emerald-500", border: "border-emerald-500" },
          ].map((stat, i) => (
            <div key={i} className={`bg-white p-10 rounded-3xl shadow-xl border-t-8 ${stat.border} transition-all hover:scale-105`}>
              <div className={`${stat.color} mb-4`}>
                <stat.icon className="w-10 h-10" />
              </div>
              <div className="text-4xl font-black text-[#111827] font-heading leading-none mb-2">
                <AnimatedCounter end={stat.val} suffix={stat.suf} />
              </div>
              <div className="text-xs font-black text-[#111827]/40 uppercase tracking-widest leading-none">
                {stat.label}
              </div>
            </div>
          ))}
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
            { tag: "GROW", city: "Khayelitsha", title: "Thandi harvested 5kg", desc: "First harvest from my vertical tire garden. Fed the whole family tonight!", img: "https://images.unsplash.com/photo-1589923188900-85dae523342b", icon: "T", route: "/grow", color: "text-[#2ecc71]" },
            { tag: "SAVE", city: "Mitchells Plain", title: "Leon saved R120", desc: "Reduced municipal water and energy cost using a greywater filtration system.", img: "https://images.unsplash.com/photo-1621451537084-482c73073a0f", icon: "L", route: "/save", color: "text-blue-500" },
            { tag: "MARKET", city: "Gugulethu", title: "New Seedlings", desc: "I have 10 tomato seedlings to swap for some kale or compost. Let's grow!", img: "https://images.unsplash.com/photo-1542838132-92c53300491e", icon: "S", route: "/market", color: "text-amber-500" },
          ].map((post, i) => (
            <div 
              key={i}
              onClick={() => navigate(post.route)}
              className="card-premium group cursor-pointer overflow-hidden"
            >
              <div className="h-64 overflow-hidden relative">
                <img
                  src={`${post.img}?auto=format&fit=crop&q=80&w=800`}
                  alt={post.title}
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
    </section>
  );
};

export default Home;
