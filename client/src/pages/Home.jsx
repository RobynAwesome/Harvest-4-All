import React from "react";
import { ArrowRight, TrendingUp, ChevronRight, Trash2, Quote } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useAppContext } from "../context/useAppContext";
import AnimatedCounter from "../components/AnimatedCounter";

const Home = () => {
  const navigate = useNavigate();
  const { waterSaved, energySaved, wasteReduced } = useAppContext();

  const totalMeals = 12450 + wasteReduced * 2;

  return (
    <section className="section-fade">
      {/* Hero */}
      <div className="relative overflow-hidden pt-16 pb-24 md:pt-24 md:pb-32 bg-gradient-to-b from-white to-[#f5f5f4]">
        <div className="max-w-7xl mx-auto px-4 flex flex-col md:flex-row items-center gap-12">
          <div className="flex-1 text-center md:text-left">
            <span className="inline-block bg-[#166534]/10 text-[#166534] px-4 py-1.5 rounded-full text-sm font-bold mb-6 tracking-wide uppercase">
              Creating Sustainable Crops for All
            </span>
            <h1 className="text-5xl md:text-7xl font-black text-[#111827] leading-tight mb-6">
              Grow Your Own <span className="text-[#166534]">Future.</span>
            </h1>
            <p className="text-lg text-[#111827]/70 mb-10 max-w-xl mx-auto md:mx-0 font-medium">
              A community-driven sustainability action platform that empowers
              disadvantaged communities to grow food, reduce costs, and track
              environmental impact — using simple, accessible digital tools.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
              <button
                onClick={() => navigate("/grow")}
                className="bg-[#166534] text-white px-8 py-4 rounded-xl font-bold text-lg hover:shadow-xl transition-all active:scale-95 flex items-center justify-center gap-2"
              >
                Start Growing <ArrowRight className="w-5 h-5" />
              </button>
              <button
                onClick={() => navigate("/save")}
                className="bg-white text-[#166534] border-2 border-[#166534]/10 px-8 py-4 rounded-xl font-bold text-lg hover:bg-[#166534]/5 transition-all flex items-center justify-center gap-2"
              >
                Track Savings <TrendingUp className="w-5 h-5" />
              </button>
              <button
                onClick={() => navigate("/reduce")}
                className="bg-white text-amber-600 border-2 border-amber-200 px-8 py-4 rounded-xl font-bold text-lg hover:bg-amber-50 transition-all flex items-center justify-center gap-2"
              >
                Log Waste <Trash2 className="w-5 h-5" />
              </button>
            </div>
          </div>
          <div className="flex-1 relative">
            <div className="absolute -z-10 bg-[#4ade80]/30 w-72 h-72 rounded-full blur-3xl top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"></div>
            <img
              src="https://images.unsplash.com/photo-1592419044706-39796d40f98c?auto=format&fit=crop&q=80&w=800"
              alt="Urban container garden with fresh vegetables growing in recycled containers"
              loading="lazy"
              className="rounded-3xl shadow-2xl animate-float"
            />
          </div>
        </div>
      </div>

      {/* Problem Statement */}
      <div className="max-w-7xl mx-auto px-4 py-16 text-center">
        <div className="bg-[#166534]/5 p-12 rounded-[3.5rem] border border-[#166534]/10 animate-in fade-in duration-1000">
          <h2 className="text-sm font-black text-[#166534] uppercase tracking-[0.3em] mb-4">
            The Challenge
          </h2>
          <h3 className="text-3xl font-black mb-6">
            Food insecurity affects 1 in 4 households in South Africa.
          </h3>
          <p className="text-[#111827]/60 leading-relaxed max-w-3xl mx-auto text-lg italic">
            "In Western Cape townships, 15-18% face severe food insecurity.
            Sandy soil, water restrictions from the 2018 Day Zero drought, and
            Eskom tariff hikes (+12.74% in 2025/26) make self-sufficiency
            critical. Harvest For All provides the digital tools and community
            wisdom to bypass these barriers."
          </p>
        </div>
      </div>

      {/* Stats Counters */}
      <div className="max-w-6xl mx-auto px-4 -mt-12 relative z-10 grid grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white p-8 rounded-2xl shadow-lg text-center border-b-4 border-[#166534]">
          <div className="text-3xl md:text-4xl font-black text-[#166534] mb-2 leading-none">
            <AnimatedCounter end={totalMeals} />
          </div>
          <div className="text-[10px] md:text-xs font-bold text-[#111827]/60 uppercase tracking-widest leading-none">
            Meals Grown
          </div>
        </div>
        <div className="bg-white p-8 rounded-2xl shadow-lg text-center border-b-4 border-[#4ade80]">
          <div className="text-3xl md:text-4xl font-black text-[#166534] mb-2 leading-none">
            <AnimatedCounter end={waterSaved} suffix="L" />
          </div>
          <div className="text-[10px] md:text-xs font-bold text-[#111827]/60 uppercase tracking-widest leading-none">
            Water Saved
          </div>
        </div>
        <div className="bg-white p-8 rounded-2xl shadow-lg text-center border-b-4 border-amber-400">
          <div className="text-3xl md:text-4xl font-black text-[#166534] mb-2 leading-none">
            R
            <AnimatedCounter
              end={typeof energySaved === "number" ? energySaved : 0}
            />
          </div>
          <div className="text-[10px] md:text-xs font-bold text-[#111827]/60 uppercase tracking-widest leading-none">
            Rands Saved
          </div>
        </div>
        <div className="bg-white p-8 rounded-2xl shadow-lg text-center border-b-4 border-emerald-400">
          <div className="text-3xl md:text-4xl font-black text-[#166534] mb-2 leading-none">
            <AnimatedCounter end={wasteReduced} suffix="kg" />
          </div>
          <div className="text-[10px] md:text-xs font-bold text-[#111827]/60 uppercase tracking-widest leading-none">
            Waste Diverted
          </div>
        </div>
      </div>

      {/* Live Community Feed */}
      <div className="max-w-7xl mx-auto px-4 py-24">
        <div className="flex justify-between items-end mb-12">
          <div>
            <h2 className="text-3xl font-black text-[#111827]">
              Live Community Feed
            </h2>
            <p className="text-[#111827]/60">
              Recent updates from neighbors taking action.
            </p>
          </div>
          <button 
            onClick={() => navigate("/impact")}
            className="text-[#166534] font-bold flex items-center gap-1 hover:underline active:scale-95 transition-transform"
          >
            View all posts <ChevronRight className="w-4 h-4" />
          </button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div 
            onClick={() => navigate("/grow")}
            className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-shadow group cursor-pointer active:scale-[0.98]"
          >
            <div className="h-48 overflow-hidden">
              <img
                src="https://images.unsplash.com/photo-1589923188900-85dae523342b?auto=format&fit=crop&q=80&w=600"
                alt="Fresh spinach harvest from a township garden"
                loading="lazy"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
            </div>
            <div className="p-6">
              <div className="flex items-center gap-2 mb-4">
                <span className="bg-[#4ade80]/10 text-[#166534] text-xs font-bold px-2 py-1 rounded">
                  GROW
                </span>
                <span className="text-xs text-[#111827]/60">
                  2 hours ago &bull; Khayelitsha
                </span>
              </div>
              <h3 className="font-bold text-lg mb-2">
                Thandi harvested 5kg of spinach!
              </h3>
              <p className="text-sm text-[#111827]/60 mb-4">
                "First harvest from my vertical tire garden. Fed the whole
                family tonight!"
              </p>
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-full bg-[#166534] flex items-center justify-center text-white text-xs font-bold uppercase">
                  T
                </div>
                <span className="text-sm font-medium">Thandi M.</span>
              </div>
            </div>
          </div>
          <div 
            onClick={() => navigate("/save")}
            className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-shadow group cursor-pointer active:scale-[0.98]"
          >
            <div className="h-48 overflow-hidden">
              <img
                src="https://images.unsplash.com/photo-1621451537084-482c73073a0f?auto=format&fit=crop&q=80&w=600"
                alt="Water conservation system in a township home"
                loading="lazy"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
            </div>
            <div className="p-6">
              <div className="flex items-center gap-2 mb-4">
                <span className="bg-blue-100 text-blue-600 text-xs font-bold px-2 py-1 rounded">
                  SAVE
                </span>
                <span className="text-xs text-[#111827]/60">
                  5 hours ago &bull; Mitchells Plain
                </span>
              </div>
              <h3 className="font-bold text-lg mb-2">
                Leon saved R120 on his bill
              </h3>
              <p className="text-sm text-[#111827]/60 mb-4">
                Reduced municipal water and energy cost using a greywater
                filtration system.
              </p>
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-full bg-blue-600 flex items-center justify-center text-white text-xs font-bold uppercase">
                  L
                </div>
                <span className="text-sm font-medium">Leon D.</span>
              </div>
            </div>
          </div>
          <div 
            onClick={() => navigate("/market")}
            className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-shadow group cursor-pointer active:scale-[0.98]"
          >
            <div className="h-48 overflow-hidden">
              <img
                src="https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&q=80&w=600"
                alt="Fresh produce at a local sustainable market"
                loading="lazy"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
            </div>
            <div className="p-6">
              <div className="flex items-center gap-2 mb-4">
                <span className="bg-amber-100 text-amber-600 text-xs font-bold px-2 py-1 rounded">
                  MARKET
                </span>
                <span className="text-xs text-[#111827]/60">
                  Yesterday &bull; Gugulethu
                </span>
              </div>
              <h3 className="font-bold text-lg mb-2">
                New Seedling Swap available
              </h3>
              <p className="text-sm text-[#111827]/60 mb-4">
                "I have 10 tomato seedlings to swap for some kale or compost.
                Let's grow together!"
              </p>
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-full bg-amber-600 flex items-center justify-center text-white text-xs font-bold uppercase">
                  S
                </div>
                <span className="text-sm font-medium">Sipho K.</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Testimonials */}
      <div className="max-w-7xl mx-auto px-4 pb-24">
        <h2 className="text-3xl font-black text-[#111827] mb-12 text-center">
          Voices from the <span className="text-[#166534]">Community</span>
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            {
              quote:
                "Since starting my tyre garden in Khayelitsha, my family saves R400/month on vegetables. The kids love watching things grow.",
              name: "Noluthando M.",
              location: "Khayelitsha",
              color: "bg-[#166534]",
            },
            {
              quote:
                "The greywater system tips from Harvest4All cut our water bill by 60%. Every rand counts when you're feeding four.",
              name: "Ahmad D.",
              location: "Mitchells Plain",
              color: "bg-blue-600",
            },
            {
              quote:
                "My kids now know where food comes from. We trade seedlings with neighbours every weekend. It's brought the street together.",
              name: "Mama Zuki",
              location: "Gugulethu",
              color: "bg-amber-600",
            },
          ].map((t, i) => (
            <div
              key={i}
              className="bg-white p-8 rounded-3xl border border-[#166534]/10 relative"
            >
              <Quote className="w-8 h-8 text-[#166534]/10 mb-4" />
              <p className="text-[#111827]/70 mb-6 italic leading-relaxed">
                "{t.quote}"
              </p>
              <div className="flex items-center gap-3">
                <div
                  className={`w-10 h-10 rounded-full ${t.color} flex items-center justify-center text-white text-sm font-bold`}
                >
                  {t.name[0]}
                </div>
                <div>
                  <div className="font-bold text-sm">{t.name}</div>
                  <div className="text-xs text-[#111827]/60">{t.location}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Home;
