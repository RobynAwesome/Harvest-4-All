import React, { useState } from "react";
import { Check, Leaf, AlertTriangle, Sprout, ArrowRight, RotateCcw } from "lucide-react";
import confetti from "canvas-confetti";
import LogActionButton from "../components/LogActionButton";
import { CROPS_DATA, PEST_CONTROL_DATA, COMPANION_PLANTING } from "../data/mockData";
import { useAppContext } from "../context/useAppContext";

const Grow = () => {
  const { actions } = useAppContext();
  const [step, setStep] = useState(1);
  const [answers, setAnswers] = useState({});
  const [showAllCrops, setShowAllCrops] = useState(false);
  const [selectedPlant, setSelectedPlant] = useState(null);

  const handleSelect = (key, val) => {
    setAnswers({ ...answers, [key]: val });
    setStep(step + 1);
  };

  const filteredCrops = CROPS_DATA.filter((crop) => {
    if (!answers.space && !answers.season) return true;
    const spaceMap = { small: ["small"], medium: ["small", "medium"], large: ["small", "medium", "large"] };
    const spaceMatch = !answers.space || spaceMap[answers.space]?.includes(crop.minSpace);
    const seasonMatch = !answers.season || crop.seasons.includes(answers.season) || crop.seasons.includes("year-round");
    return spaceMatch && seasonMatch;
  });

  const displayCrops = showAllCrops || step < 4 ? CROPS_DATA : filteredCrops;

  const hasHarvested = actions.some((a) => a.type === "harvest");

  const handleHarvest = (crop) => {
    if (!hasHarvested) {
      confetti({ particleCount: 150, spread: 80, origin: { y: 0.6 } });
    }
  };

  const stepIndicator = (
    <div className="flex items-center gap-3 mb-10">
      {[1, 2, 3].map((s) => (
        <div
          key={s}
          className={`h-2 rounded-full transition-all duration-500 ${
            step === s 
              ? "w-12 bg-[#2ecc71] shadow-[0_0_15px_rgba(46,204,113,0.5)]" 
              : step > s 
                ? "w-8 bg-[#115e59]" 
                : "w-4 bg-[#115e59]/10"
          }`}
        />
      ))}
      <span className="text-[10px] font-black text-[#111827]/40 uppercase tracking-widest ml-4">
        Stage {Math.min(step, 3)} of 3
      </span>
    </div>
  );

  return (
    <section className="section-fade py-20 px-4 bg-white/50">
      <div className="max-w-7xl mx-auto">
        <div className="mb-16 text-center md:text-left">
           <div className="inline-block bg-[#115e59]/10 text-[#115e59] px-4 py-1.5 rounded-full text-[10px] font-black tracking-widest uppercase mb-4">
            Curated Growing Systems
          </div>
          <h2 className="text-5xl font-black text-[#111827] mb-4 font-heading leading-none">
            Modern <span className="text-gradient">Grow Projects</span>
          </h2>
          <p className="text-[#111827]/60 font-medium max-w-2xl">
            Optimized agricultural guides specifically engineered for Western Cape townships, sandy soils, and container-based resilience.
          </p>
        </div>

        {/* Quiz Container */}
        <div className="card-premium p-10 md:p-16 mb-20 relative overflow-hidden">
           <div className="absolute top-0 left-0 w-full h-1.5 bg-gradient-to-r from-[#115e59] to-[#2ecc71]"></div>
          
          {step === 1 && (
            <div className="animate-in fade-in slide-in-from-right-10 duration-500">
               <div className="flex items-center gap-6 mb-12">
                  <div className="w-16 h-16 bg-[#115e59] rounded-2xl flex items-center justify-center text-white text-2xl font-black shadow-xl">01</div>
                  <div>
                    <h3 className="text-2xl font-black font-heading text-[#111827]">Spatial Audit</h3>
                    <p className="text-sm font-medium text-[#111827]/40 uppercase tracking-widest">Dimension Analysis</p>
                  </div>
               </div>
              {stepIndicator}
              <h4 className="text-3xl font-black mb-10 font-heading">How much workable space is available?</h4>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {[
                  { val: "small", label: "Compact", desc: "Balcony / Windowsill", icon: "🏢" },
                  { val: "medium", label: "Backyard", desc: "Tire / Container Bed", icon: "🏡" },
                  { val: "large", label: "Estate", desc: "Community Plot / Large Garden", icon: "🚜" },
                ].map((opt) => (
                  <button
                    key={opt.val}
                    onClick={() => handleSelect("space", opt.val)}
                    className="p-10 border-2 border-[#115e59]/5 rounded-3xl hover:border-[#2ecc71] hover:bg-[#2ecc71]/5 transition-all text-left shadow-sm group"
                  >
                    <div className="text-4xl mb-4 group-hover:scale-125 transition-transform">{opt.icon}</div>
                    <div className="font-black text-xl mb-1 text-[#115e59] font-heading">{opt.label}</div>
                    <div className="text-xs font-bold text-[#111827]/40 uppercase tracking-tight">{opt.desc}</div>
                  </button>
                ))}
              </div>
            </div>
          )}

          {step === 2 && (
            <div className="animate-in fade-in slide-in-from-right-10 duration-500">
              <div className="flex items-center gap-6 mb-12">
                  <div className="w-16 h-16 bg-[#115e59] rounded-2xl flex items-center justify-center text-white text-2xl font-black shadow-xl">02</div>
                  <div>
                    <h3 className="text-2xl font-black font-heading text-[#111827]">Financial Filter</h3>
                    <p className="text-sm font-medium text-[#111827]/40 uppercase tracking-widest">Resource Allocation</p>
                  </div>
               </div>
              {stepIndicator}
              <h4 className="text-3xl font-black mb-10 font-heading">What is your project startup budget?</h4>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {[
                  { val: "low", label: "Lean (R0-R100)", desc: "Recycled bottle systems", icon: "♻️" },
                  { val: "medium", label: "Starter (R100-R200)", desc: "Seedlings & local soil", icon: "🪴" },
                  { val: "high", label: "Pro (R200+)", desc: "Full kit & premium compost", icon: "💎" },
                ].map((opt) => (
                  <button
                    key={opt.val}
                    onClick={() => handleSelect("budget", opt.val)}
                    className="p-10 border-2 border-[#115e59]/5 rounded-3xl hover:border-[#2ecc71] hover:bg-[#2ecc71]/5 transition-all text-left shadow-sm group"
                  >
                    <div className="text-4xl mb-4 group-hover:scale-125 transition-transform">{opt.icon}</div>
                    <div className="font-black text-xl mb-1 text-[#115e59] font-heading">{opt.label}</div>
                    <div className="text-xs font-bold text-[#111827]/40 uppercase tracking-tight">{opt.desc}</div>
                  </button>
                ))}
              </div>
            </div>
          )}

          {step === 3 && (
            <div className="animate-in fade-in slide-in-from-right-10 duration-500">
              <div className="flex items-center gap-6 mb-12">
                  <div className="w-16 h-16 bg-[#115e59] rounded-2xl flex items-center justify-center text-white text-2xl font-black shadow-xl">03</div>
                  <div>
                    <h3 className="text-2xl font-black font-heading text-[#111827]">Seasonal Sync</h3>
                    <p className="text-sm font-medium text-[#111827]/40 uppercase tracking-widest">Climate Calibration</p>
                  </div>
               </div>
              {stepIndicator}
              <h4 className="text-3xl font-black mb-10 font-heading">Which planting cycle are you targeting?</h4>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {[
                  { val: "winter", label: "Winter", desc: "Cool / Damp crops (May-Aug)", icon: "🌧️" },
                  { val: "summer", label: "Summer", desc: "Warm / Dry crops (Sep-Apr)", icon: "☀️" },
                  { val: "year-round", label: "Constant", desc: "All-season resilient crops", icon: "🔄" },
                ].map((opt) => (
                  <button
                    key={opt.val}
                    onClick={() => handleSelect("season", opt.val)}
                    className="p-10 border-2 border-[#115e59]/5 rounded-3xl hover:border-[#2ecc71] hover:bg-[#2ecc71]/5 transition-all text-left shadow-sm group"
                  >
                    <div className="text-4xl mb-4 group-hover:scale-125 transition-transform">{opt.icon}</div>
                    <div className="font-black text-xl mb-1 text-[#115e59] font-heading">{opt.label}</div>
                    <div className="text-xs font-bold text-[#111827]/40 uppercase tracking-tight">{opt.desc}</div>
                  </button>
                ))}
              </div>
            </div>
          )}

          {step >= 4 && (
            <div className="text-center py-10 animate-in zoom-in duration-500">
              <div className="w-24 h-24 bg-[#2ecc71]/10 rounded-full flex items-center justify-center mx-auto mb-8 border-4 border-[#2ecc71]/20">
                 <Check className="w-12 h-12 text-[#2ecc71]" />
              </div>
              <h3 className="font-black text-4xl mb-4 font-heading text-[#111827]">
                Intelligence Brief Generated.
              </h3>
              <p className="text-[#111827]/60 font-medium max-w-xl mx-auto mb-12 text-lg">
                We've identified <span className="text-[#115e59] font-black">{filteredCrops.length} high-yield crops</span> optimized for your <strong>{answers.space}</strong> environment and <strong>{answers.budget}</strong> budget.
              </p>
              <div className="flex gap-4 justify-center">
                <button
                  onClick={() => {
                    setStep(1);
                    setAnswers({});
                    setShowAllCrops(false);
                  }}
                  className="btn-premium border-2 border-[#115e59]/10 text-[#115e59] hover:bg-[#115e59]/5 flex items-center gap-2"
                >
                  <RotateCcw className="w-4 h-4" /> Reset Audit
                </button>
                <button
                  onClick={() => setShowAllCrops(!showAllCrops)}
                  className="btn-premium btn-emerald shadow-xl"
                >
                  {showAllCrops ? "Show Filtered Recommendations" : "Show All WC Crops"}
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Crops Grid */}
        <h3 className="text-3xl font-black mb-12 font-heading">
          {step >= 4 ? "Projected " : ""}Agricultural <span className="text-[#115e59]">Selection</span>
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 mb-24">
          {displayCrops.map((crop, i) => {
            const details = {
              timeline: `${crop.time} ${crop.unit.toLowerCase()}`,
              soil: crop.soilType || (crop.difficulty === "EASY" ? "Well-drained sandy loam with mulch layer" : "Rich organic compost mix, deep tilling"),
              nutrition: crop.nutrition
                ? `Iron ${crop.nutrition.iron}mg · Calcium ${crop.nutrition.calcium}mg · Vitamin C ${crop.nutrition.vitC}mg per 100g`
                : crop.category.includes("Nutrient") ? "High Vitamin K, Iron, and Dietary Fiber" : "Rich in antioxidants and Vitamin C",
              waterNeeds: crop.waterNeeds,
              containerInfo: crop.containerDepth ? `Depth: ${crop.containerDepth} · ${crop.containerSize}` : null,
            };

            return (
              <div
                key={i}
                className="card-premium group overflow-hidden flex flex-col h-full cursor-pointer transition-all hover:translate-y-[-8px]"
                onClick={() => setSelectedPlant({ ...crop, details })}
              >
                <div className="relative h-48 overflow-hidden">
                  <img
                    src={crop.img}
                    alt={crop.name}
                    loading="lazy"
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                  />
                  <div className="absolute top-4 right-4 bg-white/90 backdrop-blur px-3 py-1 rounded-lg text-[10px] font-black text-[#115e59] uppercase tracking-widest border border-[#115e59]/10">
                    {crop.difficulty}
                  </div>
                  {crop.category === "Indigenous" ? (
                    <div className="absolute top-4 left-4 bg-emerald-700 px-3 py-1 rounded-lg text-[10px] font-black text-white uppercase tracking-widest shadow-lg">
                      Indigenous
                    </div>
                  ) : crop.container && (
                    <div className="absolute top-4 left-4 bg-[#2ecc71] px-3 py-1 rounded-lg text-[10px] font-black text-white uppercase tracking-widest shadow-lg">
                      Container OK
                    </div>
                  )}
                </div>
                <div className="p-8 flex-1 flex flex-col">
                  <div className="text-[10px] font-black text-[#2ecc71] uppercase tracking-[0.2em] mb-2">
                     {crop.category}
                  </div>
                  <h4 className="font-black text-2xl mb-2 font-heading">{crop.name}</h4>
                  <p className="text-sm text-[#111827]/50 font-medium mb-6 line-clamp-2 italic">
                    "{crop.description}"
                  </p>
                  
                  <div className="mt-auto">
                    <div className="flex justify-between text-[10px] font-black text-[#111827]/40 uppercase tracking-widest mb-2">
                      <span>Maturity Timeline</span>
                      <span className="text-[#115e59]">
                        {crop.time} {crop.unit}
                      </span>
                    </div>
                    <div className="w-full bg-[#f5f5f4] h-2 rounded-full overflow-hidden mb-8">
                      <div
                        className="bg-gradient-to-r from-[#115e59] to-[#2ecc71] h-full rounded-full transition-all duration-1000"
                        style={{ width: `${Math.min(100, (crop.time / 12) * 100)}%` }}
                      />
                    </div>
                    <div onClick={(e) => e.stopPropagation()}>
                      <LogActionButton
                        actionType="harvest"
                        description={`Recorded harvest for ${crop.name}`}
                        value={1}
                        unit="kg"
                        location="Local Garden"
                        onActionLogged={() => handleHarvest(crop)}
                      />
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Guides Grid */}
        <div className="mb-24">
          <div className="flex items-center gap-4 mb-12">
             <div className="w-12 h-12 bg-[#115e59] rounded-2xl flex items-center justify-center text-white">
                <Leaf className="w-6 h-6" />
             </div>
             <h3 className="text-4xl font-black font-heading leading-tight">Urban Agricultural <span className="text-[#2ecc71]">Blueprint</span></h3>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            {[
              { title: "2L Circular Planters", icon: "♻️", content: ["Precision cut 2L HDPE bottles", "Quartet-pattern drainage holes", "60:40 Compost to Sand ratio", "Target: Herbs & Spinach"], cost: "R0" },
              { title: "Vertical Tire Stack", icon: "🛞", content: ["Triple-stacked rubber casing", "Cardboard root barrier", "High nutrient retention core", "Saves 90% soil moisture"], cost: "R20" },
              { title: "WC Soil Engineering", icon: "🧪", content: ["Counter-sandy soil leaching", "Micro-layer composting", "Surface mulch preservation", "Direct seedling integration"], cost: "FREE" },
            ].map((guide, i) => (
              <div key={i} className="card-premium p-10 bg-white group hover:bg-[#115e59] transition-all">
                <div className="text-5xl mb-8 group-hover:scale-110 transition-transform">{guide.icon}</div>
                <h4 className="font-black text-2xl mb-6 font-heading text-[#111827] group-hover:text-white transition-colors">{guide.title}</h4>
                <ul className="space-y-4 mb-10">
                  {guide.content.map((item, j) => (
                    <li key={j} className="flex gap-3 text-sm font-medium text-[#111827]/60 group-hover:text-white/70 transition-colors">
                      <div className="w-1.5 h-1.5 bg-[#2ecc71] rounded-full mt-1.5 shrink-0"></div>
                      {item}
                    </li>
                  ))}
                </ul>
                <div className="text-xs font-black uppercase text-[#2ecc71] tracking-[0.3em]">Capital Req: {guide.cost}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Alert Board */}
        <div className="bg-gradient-to-br from-amber-50 to-amber-100 p-12 md:p-16 rounded-[3rem] border border-amber-200 mb-24 relative overflow-hidden shadow-xl">
          <div className="absolute top-0 right-0 p-10 opacity-5">
            <AlertTriangle className="w-40 h-40 text-amber-600" />
          </div>
          <div className="flex items-center gap-4 mb-12">
            <div className="w-10 h-10 bg-amber-600 rounded-xl flex items-center justify-center text-white">
               <AlertTriangle className="w-6 h-6" />
            </div>
            <h3 className="font-black text-3xl font-heading text-amber-900 tracking-tight">Risk Mitigation Strategies</h3>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
            {[
              { t: "Nutrient Leaching", d: "Sandy soil drains nutrients. Integrated compost rotations are mandatory per harvest." },
              { t: "Surface Erosion", d: "WC winds strip topsoil. Implement windbreaks and thick organic mulching." },
              { t: "Pathogen Control", d: "Familial rotation prevents pest persistence. Never plant tomatoes twice in one spot." },
              { t: "Hydration Balance", d: "Soggy soil kills roots. Water at early dawn only for maximum absorption." },
            ].map((risk, i) => (
              <div key={i} className="relative">
                <div className="text-5xl font-black text-amber-200 absolute -top-4 -left-2 opacity-50 z-0 select-none">0{i+1}</div>
                <div className="relative z-10">
                  <h4 className="font-black text-amber-900 mb-2 font-heading text-lg">{risk.t}</h4>
                  <p className="text-sm font-medium text-amber-900/60 leading-relaxed">{risk.d}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Organic Pest & Disease Guide */}
        <div className="mb-24">
          <div className="mb-12">
            <div className="inline-block bg-amber-100 text-amber-800 px-4 py-1.5 rounded-full text-[10px] font-black tracking-widest uppercase mb-4">
              From Our Research Docs
            </div>
            <h3 className="text-4xl font-black font-heading">
              Organic Pest <span className="text-amber-600">Control</span> Guide
            </h3>
            <p className="text-[#111827]/50 font-medium mt-2">
              100% chemical-free solutions. Safe for your family, your soil, and your neighbours' groundwater.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
            {PEST_CONTROL_DATA.map((pest) => (
              <div key={pest.id} className="card-premium p-8 border-t-4 border-amber-500 flex flex-col">
                {pest.img && (
                  <div className="h-36 overflow-hidden rounded-2xl mb-6">
                    <img src={pest.img} alt={pest.name} loading="lazy" className="w-full h-full object-cover" />
                  </div>
                )}
                <h4 className="font-black text-lg mb-2 font-heading text-amber-900">{pest.name}</h4>
                <div className="flex flex-wrap gap-1 mb-4">
                  {pest.affectedCrops.map((c) => (
                    <span key={c} className="bg-amber-50 text-amber-700 text-[10px] font-bold px-2 py-0.5 rounded-full border border-amber-200">{c}</span>
                  ))}
                </div>
                <div className="flex-1 space-y-3">
                  <div className="bg-green-50 p-4 rounded-2xl border border-green-200">
                    <div className="text-[10px] font-black text-green-700 uppercase tracking-widest mb-1">Solution</div>
                    <p className="text-xs text-green-900 font-bold">{pest.solution}</p>
                  </div>
                  <div className="bg-[#f5f5f4] p-4 rounded-2xl">
                    <div className="text-[10px] font-black text-[#115e59] uppercase tracking-widest mb-1">Recipe</div>
                    <p className="text-xs text-[#111827]/70 font-medium leading-relaxed">{pest.recipe}</p>
                  </div>
                  <div className="text-[10px] font-bold text-amber-600 flex items-start gap-1.5">
                    <span className="mt-0.5">🛡️</span> {pest.prevention}
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Companion Planting */}
          <div className="bg-[#115e59]/5 rounded-3xl p-8 border border-[#115e59]/10">
            <h4 className="font-black text-xl mb-6 font-heading flex items-center gap-3">
              <span className="text-2xl">🌺</span> Companion Planting Pairs
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {COMPANION_PLANTING.map((pair, i) => (
                <div key={i} className="bg-white rounded-2xl p-4 border border-[#115e59]/10 flex items-start gap-3">
                  <div className="text-center min-w-fit">
                    <div className="font-black text-sm text-[#115e59]">{pair.plant}</div>
                    <div className="text-[10px] text-[#115e59]/40 font-bold">+</div>
                    <div className="font-black text-sm text-[#2ecc71]">{pair.companion}</div>
                  </div>
                  <p className="text-xs text-[#111827]/60 font-medium leading-relaxed">{pair.benefit}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Sustainability Blogs Section */}
        <div className="mb-24">
          <div className="flex justify-between items-end mb-12">
            <div>
              <h3 className="text-4xl font-black font-heading">
                 Resource <span className="text-[#115e59]">Dispatch</span>
              </h3>
              <p className="text-[#111827]/40 font-bold uppercase text-xs tracking-[0.2em] mt-2">External Agricultural Intelligence</p>
            </div>
            <ArrowRight className="w-10 h-10 text-[#115e59]/20" />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              { 
                title: "AgriSA: Sustainable Farming Guide 2026", 
                category: "POLICY", 
                link: "https://agrisa.co.za",
                desc: "Expert guidelines on managing high-yield crops under South African climate pressure."
              },
              { 
                title: "Urban Farming: The Cape Town Model", 
                category: "CASE STUDY", 
                link: "https://www.capetown.gov.za",
                desc: "How local township initiatives are reducing food prices by 40% through community gardens."
              },
              { 
                title: "Renewable Soil: The Compost Manifesto", 
                category: "TUTORIAL", 
                link: "https://organic-seeds.co.za/blogs/news",
                desc: "Turn your household waste into R1000 worth of nutrient-rich soil per month."
              }
            ].map((blog, i) => (
              <a 
                key={i} 
                href={blog.link} 
                target="_blank" 
                rel="noopener noreferrer" 
                className="card-premium p-8 group hover:bg-[#115e59] transition-all duration-300"
              >
                <div className="text-[10px] font-black text-[#2ecc71] mb-2 tracking-widest">{blog.category}</div>
                <h4 className="font-black text-xl mb-4 text-[#111827] group-hover:text-white transition-colors">{blog.title}</h4>
                <p className="text-sm text-[#111827]/50 group-hover:text-white/60 mb-6 font-medium leading-relaxed">
                  {blog.desc}
                </p>
                <div className="flex items-center gap-2 text-xs font-black text-[#115e59] group-hover:text-[#2ecc71] transition-colors">
                  READ ARTICLE <ArrowRight className="w-4 h-4" />
                </div>
              </a>
            ))}
          </div>
        </div>

        {/* Daily Operations Panel */}
        <div className="bg-[#115e59] text-white p-16 md:p-24 rounded-[4rem] shadow-2xl flex flex-col lg:flex-row gap-16 items-center border border-white/5 relative overflow-hidden">
           <div className="absolute bottom-0 right-0 w-96 h-96 bg-[#2ecc71]/10 rounded-full translate-y-1/2 translate-x-1/2 blur-[100px]"></div>
          <div className="flex-1 relative">
            <h3 className="text-5xl font-black mb-10 font-heading leading-tight">Daily <span className="text-[#2ecc71]">Ops</span> List</h3>
            <div className="space-y-6">
              {[
                "Soil moisture tension check",
                "Aphid & Snail cluster sweep",
                "Greywater collection cycle",
                "Predawn deep hydration",
              ].map((task, i) => (
                <label
                  key={i}
                  className="flex items-center gap-6 cursor-pointer group p-4 border border-white/5 rounded-2xl hover:bg-white/5 transition-all"
                >
                  <div className="w-8 h-8 border-2 border-[#2ecc71] rounded-xl flex items-center justify-center group-hover:bg-[#2ecc71] transition-all">
                    <Check className="w-5 h-5 text-white opacity-0 group-hover:opacity-100 transition-opacity" />
                  </div>
                  <span className="text-xl font-black font-heading tracking-tight">{task}</span>
                </label>
              ))}
            </div>
            <div className="mt-16">
              <LogActionButton
                actionType="grow"
                description="Verified daily grow maintenance"
                value={1}
                unit="cyc"
                location="Project Site"
                onActionLogged={() => {}}
              />
            </div>
          </div>
          <div className="w-full lg:w-1/3 bg-white/10 p-12 rounded-[3rem] backdrop-blur-xl border border-white/10 shadow-inner">
            <div className="flex items-center gap-4 mb-8">
              <Sprout className="w-7 h-7 text-[#2ecc71]" />
              <h4 className="font-black text-2xl font-heading">Protocol</h4>
            </div>
            <ul className="space-y-6">
              {[
                "Initial batch scaling max 4 units",
                "Prioritize seedlings over raw seed",
                "Early morning deep hydration only",
                "Maintain moist (not anaerobic) soil",
              ].map((tip, i) => (
                <li key={i} className="flex gap-4 text-white/70 font-medium leading-relaxed">
                  <div className="font-black text-[#2ecc71]">0{i+1}</div>
                  {tip}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* Plant Modal: Intelligence Overlay */}
      {selectedPlant && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-8">
          <div 
            className="absolute inset-0 bg-[#061e1b]/80 backdrop-blur-md animate-fade-in"
            onClick={() => setSelectedPlant(null)}
          ></div>
          <div className="bg-white rounded-[3rem] w-full max-w-4xl overflow-hidden shadow-2xl relative z-10 animate-scale-in flex flex-col md:flex-row max-h-[90vh]">
            <div className="w-full md:w-1/2 h-64 md:h-auto relative">
              <img 
                src={selectedPlant.img} 
                alt={selectedPlant.name} 
                className="w-full h-full object-cover"
              />
              <button 
                onClick={() => setSelectedPlant(null)}
                className="absolute top-6 left-6 w-12 h-12 bg-white rounded-2xl flex items-center justify-center shadow-xl hover:scale-110 transition-transform md:hidden"
              >
                ✕
              </button>
            </div>
            <div className="flex-1 p-8 md:p-12 overflow-y-auto">
               <div className="flex justify-between items-start mb-8">
                  <div>
                    <div className="text-[10px] font-black text-[#2ecc71] uppercase tracking-[0.2em] mb-2">{selectedPlant.category}</div>
                    <h3 className="text-4xl font-black font-heading text-[#111827]">{selectedPlant.name}</h3>
                  </div>
                  <button 
                    onClick={() => setSelectedPlant(null)}
                    className="hidden md:flex w-10 h-10 bg-[#f5f5f4] rounded-xl items-center justify-center hover:bg-[#115e59] hover:text-white transition-all font-bold"
                  >
                    ✕
                  </button>
               </div>
               
               <div className="grid grid-cols-1 gap-8 mb-10">
                  <div className="flex items-start gap-4 p-6 bg-[#f5f5f4] rounded-3xl group hover:bg-[#115e59]/5 transition-colors">
                     <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center shadow-sm text-2xl">⏳</div>
                     <div>
                        <h4 className="font-black text-sm uppercase tracking-widest text-[#115e59] mb-1">Maturity Timeline</h4>
                        <p className="text-[#111827] font-bold">{selectedPlant.details.timeline}</p>
                     </div>
                  </div>
                  <div className="flex items-start gap-4 p-6 bg-[#f5f5f4] rounded-3xl group hover:bg-[#115e59]/5 transition-colors">
                     <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center shadow-sm text-2xl">🧪</div>
                     <div>
                        <h4 className="font-black text-sm uppercase tracking-widest text-[#115e59] mb-1">Soil Requirements</h4>
                        <p className="text-[#111827] font-bold">{selectedPlant.details.soil}</p>
                     </div>
                  </div>
                  <div className="flex items-start gap-4 p-6 bg-[#f5f5f4] rounded-3xl group hover:bg-[#115e59]/5 transition-colors">
                     <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center shadow-sm text-2xl">🥗</div>
                     <div>
                        <h4 className="font-black text-sm uppercase tracking-widest text-[#115e59] mb-1">Nutritional Benefits</h4>
                        <p className="text-[#111827] font-bold">{selectedPlant.details.nutrition}</p>
                     </div>
                  </div>
                  {selectedPlant.details.waterNeeds && (
                    <div className="flex items-start gap-4 p-6 bg-blue-50 rounded-3xl border border-blue-100">
                       <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center shadow-sm text-2xl">💧</div>
                       <div>
                          <h4 className="font-black text-sm uppercase tracking-widest text-blue-700 mb-1">Water Needs</h4>
                          <p className="text-blue-900 font-bold capitalize">{selectedPlant.details.waterNeeds}</p>
                       </div>
                    </div>
                  )}
                  {selectedPlant.details.containerInfo && (
                    <div className="flex items-start gap-4 p-6 bg-[#f5f5f4] rounded-3xl group hover:bg-[#115e59]/5 transition-colors">
                       <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center shadow-sm text-2xl">🪴</div>
                       <div>
                          <h4 className="font-black text-sm uppercase tracking-widest text-[#115e59] mb-1">Container Specs</h4>
                          <p className="text-[#111827] font-bold">{selectedPlant.details.containerInfo}</p>
                       </div>
                    </div>
                  )}
               </div>

               <div className="p-8 bg-[#115e59] rounded-3xl text-white">
                  <h4 className="font-black text-lg font-heading mb-2 flex items-center gap-2">
                    <Sprout className="w-5 h-5 text-[#2ecc71]" />
                    Expert Grower Tip
                  </h4>
                  <p className="text-sm font-medium text-white/70 leading-relaxed italic">
                    "{selectedPlant.description}"
                  </p>
               </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default Grow;
