import React, { useState } from "react";
import { Check, Leaf, AlertTriangle, Sprout } from "lucide-react";
import confetti from "canvas-confetti";
import LogActionButton from "../components/LogActionButton";
import { CROPS_DATA } from "../data/mockData";
import { useAppContext } from "../context/useAppContext";

const Grow = () => {
  const { actions } = useAppContext();
  const [step, setStep] = useState(1);
  const [answers, setAnswers] = useState({});
  const [showAllCrops, setShowAllCrops] = useState(false);

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
    <div className="flex items-center gap-2 mb-6">
      {[1, 2, 3].map((s) => (
        <div
          key={s}
          className={`w-3 h-3 rounded-full transition-all ${
            step >= s ? "bg-[#166534] scale-110" : "bg-[#166534]/20"
          }`}
        />
      ))}
      <span className="text-xs font-bold text-[#111827]/40 ml-2">
        Step {Math.min(step, 3)} of 3
      </span>
    </div>
  );

  return (
    <section className="section-fade py-16 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="mb-12">
          <h2 className="text-4xl font-black text-[#111827] mb-4">
            Start Your <span className="text-[#166534]">Grow Project</span>
          </h2>
          <p className="text-[#111827]/60">
            Follow our guides tailored for Western Cape townships.
          </p>
        </div>

        {/* Quiz Container */}
        <div className="bg-white p-8 rounded-3xl shadow-sm border border-[#166534]/5 mb-12">
          {step === 1 && (
            <div>
              <div className="flex items-center gap-4 mb-4">
                <span className="w-10 h-10 rounded-full bg-[#166534] text-white flex items-center justify-center font-bold">
                  1
                </span>
                <div>
                  <h3 className="font-bold text-xl">Grow Quiz</h3>
                  <p className="text-sm text-[#111827]/60">
                    Find the perfect crops for your space.
                  </p>
                </div>
              </div>
              {stepIndicator}
              <h4 className="text-lg font-bold mb-6">
                How much space do you have?
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                {[
                  { val: "small", label: "Small", desc: "Windowsill or balcony (1-2m\u00B2)" },
                  { val: "medium", label: "Medium", desc: "Small backyard (2-5m\u00B2)" },
                  { val: "large", label: "Large", desc: "Community plot (5m\u00B2+)" },
                ].map((opt) => (
                  <button
                    key={opt.val}
                    onClick={() => handleSelect("space", opt.val)}
                    className="p-6 border-2 border-[#166534]/10 rounded-2xl hover:border-[#166534] hover:bg-[#166534]/5 transition-all text-left"
                  >
                    <div className="font-bold mb-1 italic text-[#166534]">{opt.label}</div>
                    <div className="text-sm text-[#111827]/60">{opt.desc}</div>
                  </button>
                ))}
              </div>
            </div>
          )}

          {step === 2 && (
            <div>
              <div className="flex items-center gap-4 mb-4">
                <span className="w-10 h-10 rounded-full bg-[#166534] text-white flex items-center justify-center font-bold">
                  2
                </span>
                <div>
                  <h3 className="font-bold text-xl">Budget</h3>
                  <p className="text-sm text-[#111827]/60">
                    What can you spend on getting started?
                  </p>
                </div>
              </div>
              {stepIndicator}
              <h4 className="text-lg font-bold mb-6">
                What's your starting budget?
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                {[
                  { val: "low", label: "R0 - R100", desc: "Seeds + recycled containers" },
                  { val: "medium", label: "R100 - R200", desc: "Seedlings + basic soil mix" },
                  { val: "high", label: "R200+", desc: "Full starter kit + compost" },
                ].map((opt) => (
                  <button
                    key={opt.val}
                    onClick={() => handleSelect("budget", opt.val)}
                    className="p-6 border-2 border-[#166534]/10 rounded-2xl hover:border-[#166534] hover:bg-[#166534]/5 transition-all text-left"
                  >
                    <div className="font-bold mb-1 italic text-[#166534]">{opt.label}</div>
                    <div className="text-sm text-[#111827]/60">{opt.desc}</div>
                  </button>
                ))}
              </div>
            </div>
          )}

          {step === 3 && (
            <div>
              <div className="flex items-center gap-4 mb-4">
                <span className="w-10 h-10 rounded-full bg-[#166534] text-white flex items-center justify-center font-bold">
                  3
                </span>
                <div>
                  <h3 className="font-bold text-xl">Season</h3>
                  <p className="text-sm text-[#111827]/60">
                    When are you planning to plant?
                  </p>
                </div>
              </div>
              {stepIndicator}
              <h4 className="text-lg font-bold mb-6">
                What season are you planting in?
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                {[
                  { val: "winter", label: "Winter", desc: "May - August (cool crops)" },
                  { val: "summer", label: "Summer", desc: "September - April (warm crops)" },
                  { val: "year-round", label: "Year-Round", desc: "I want to grow all year" },
                ].map((opt) => (
                  <button
                    key={opt.val}
                    onClick={() => handleSelect("season", opt.val)}
                    className="p-6 border-2 border-[#166534]/10 rounded-2xl hover:border-[#166534] hover:bg-[#166534]/5 transition-all text-left"
                  >
                    <div className="font-bold mb-1 italic text-[#166534]">{opt.label}</div>
                    <div className="text-sm text-[#111827]/60">{opt.desc}</div>
                  </button>
                ))}
              </div>
            </div>
          )}

          {step >= 4 && (
            <div className="text-center py-6">
              <h3 className="font-bold text-2xl mb-2 text-[#166534]">
                We found {filteredCrops.length} crops for you!
              </h3>
              <p className="text-[#111827]/60 mb-4">
                Based on your <strong>{answers.space}</strong> space,{" "}
                <strong>{answers.budget}</strong> budget, in{" "}
                <strong>{answers.season}</strong> season.
              </p>
              <div className="flex gap-4 justify-center">
                <button
                  onClick={() => {
                    setStep(1);
                    setAnswers({});
                    setShowAllCrops(false);
                  }}
                  className="text-xs font-bold uppercase tracking-widest text-[#111827]/60 hover:text-[#111827] border border-[#166534]/10 px-4 py-2 rounded-xl"
                >
                  Reset Quiz
                </button>
                <button
                  onClick={() => setShowAllCrops(!showAllCrops)}
                  className="text-xs font-bold uppercase tracking-widest text-[#166534] border border-[#166534]/20 px-4 py-2 rounded-xl hover:bg-[#166534]/5"
                >
                  {showAllCrops ? "Show Filtered" : "Show All Crops"}
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Crops Grid */}
        <h3 className="text-2xl font-bold mb-8">
          {step >= 4 ? "Your " : ""}Recommended for{" "}
          <span className="text-[#166534]">Western Cape</span>
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {displayCrops.map((crop, i) => (
            <div
              key={i}
              className="bg-white p-6 rounded-3xl border border-[#166534]/10 hover:shadow-xl transition-all group"
            >
              <div className="relative mb-4">
                <img
                  src={crop.img}
                  alt={`${crop.name} growing in a garden`}
                  loading="lazy"
                  className="w-full h-32 rounded-2xl object-cover group-hover:scale-105 transition-transform"
                />
                <div className="absolute top-2 right-2 bg-white/90 backdrop-blur px-2 py-1 rounded-lg text-[10px] font-black text-[#166534] uppercase tracking-tighter">
                  {crop.difficulty}
                </div>
                {crop.container && (
                  <div className="absolute top-2 left-2 bg-[#4ade80]/90 backdrop-blur px-2 py-1 rounded-lg text-[10px] font-black text-white uppercase tracking-tighter">
                    Container OK
                  </div>
                )}
              </div>
              <h4 className="font-bold text-lg mb-1">{crop.name}</h4>
              <p className="text-xs text-[#111827]/60 mb-3 line-clamp-2">
                {crop.description}
              </p>
              <div className="mb-1">
                <span className="text-[10px] font-bold text-[#166534]/60 uppercase">
                  {crop.category}
                </span>
              </div>
              <div className="mb-4">
                <div className="flex justify-between text-[10px] font-bold text-[#111827]/60 uppercase mb-1">
                  <span>Timeline</span>
                  <span>
                    {crop.time} {crop.unit}
                  </span>
                </div>
                <div className="w-full bg-[#f5f5f4] h-1.5 rounded-full overflow-hidden">
                  <div
                    className="bg-[#166534] h-full rounded-full"
                    style={{ width: `${Math.min(100, (crop.time / 12) * 100)}%` }}
                  />
                </div>
              </div>
              <LogActionButton
                actionType="harvest"
                description={`Harvested ${crop.name}`}
                value={1}
                unit="kg"
                location="Backyard Garden"
                onActionLogged={() => handleHarvest(crop)}
              />
            </div>
          ))}
        </div>

        {/* Container Gardening Guide */}
        <div className="mb-12">
          <h3 className="text-2xl font-bold mb-8 flex items-center gap-3">
            <Leaf className="w-6 h-6 text-[#166534]" />
            Container Gardening Guide
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white p-8 rounded-3xl border border-[#166534]/10">
              <div className="w-12 h-12 bg-[#4ade80]/10 rounded-2xl flex items-center justify-center mb-4 text-2xl">
                {"\u{1FAA3}"}
              </div>
              <h4 className="font-bold text-lg mb-3">2L Bottle Planters</h4>
              <ul className="space-y-2 text-sm text-[#111827]/60">
                <li>Cut 2L plastic bottles in half horizontally</li>
                <li>Poke 4-5 drainage holes in the bottom</li>
                <li>Fill with compost mix (60% compost, 40% sand)</li>
                <li>Perfect for spring onions, herbs, and spinach</li>
                <li className="font-bold text-[#166534]">Cost: R0 (free recycled materials!)</li>
              </ul>
            </div>
            <div className="bg-white p-8 rounded-3xl border border-[#166534]/10">
              <div className="w-12 h-12 bg-[#4ade80]/10 rounded-2xl flex items-center justify-center mb-4 text-2xl">
                {"\u{1F6DE}"}
              </div>
              <h4 className="font-bold text-lg mb-3">Tyre Gardens</h4>
              <ul className="space-y-2 text-sm text-[#111827]/60">
                <li>Stack 3-4 old tyres and paint them bright colours</li>
                <li>Line bottom with cardboard to prevent weeds</li>
                <li>Fill with soil-compost mix and plant directly</li>
                <li>Saves up to 90% water vs ground planting in sandy WC soil</li>
                <li className="font-bold text-[#166534]">Cost: R0-R20 (paint optional)</li>
              </ul>
            </div>
            <div className="bg-white p-8 rounded-3xl border border-[#166534]/10">
              <div className="w-12 h-12 bg-[#4ade80]/10 rounded-2xl flex items-center justify-center mb-4 text-2xl">
                {"\u{1FAB4}"}
              </div>
              <h4 className="font-bold text-lg mb-3">Sandy WC Soil Fix</h4>
              <ul className="space-y-2 text-sm text-[#111827]/60">
                <li>Western Cape soil is mostly sandy — poor nutrient retention</li>
                <li>Mix ratio: 60% compost + 40% sandy soil</li>
                <li>Add mulch on top to retain moisture</li>
                <li>Kitchen scraps make free compost (no meat/dairy)</li>
                <li className="font-bold text-[#166534]">Start with seedlings, not seeds — quicker results!</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Things to Watch Out For */}
        <div className="bg-amber-50 p-8 rounded-3xl border border-amber-200 mb-12">
          <div className="flex items-center gap-3 mb-6">
            <AlertTriangle className="w-6 h-6 text-amber-600" />
            <h3 className="font-bold text-xl text-amber-900">Things to Watch Out For</h3>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[
              {
                title: "Nutrient Depletion",
                tip: "Harvesting removes nutrients. Add compost regularly and rotate crops between seasons.",
              },
              {
                title: "Soil Erosion",
                tip: "Sandy WC soil washes away easily. Use mulch, ground cover, and windbreaks to protect your garden.",
              },
              {
                title: "Crop Rotation",
                tip: "Don't plant the same crop in the same spot twice. Rotate plant families to prevent pest buildup.",
              },
              {
                title: "Over-Fertilizing",
                tip: "Too much fertilizer damages soil organisms. Stick to compost and natural methods.",
              },
            ].map((item, i) => (
              <div key={i} className="flex gap-4">
                <div className="w-8 h-8 rounded-full bg-amber-200 flex items-center justify-center text-amber-700 font-bold text-sm shrink-0">
                  {i + 1}
                </div>
                <div>
                  <h4 className="font-bold text-amber-900 mb-1">{item.title}</h4>
                  <p className="text-sm text-amber-800/70">{item.tip}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Daily Task Checklist */}
        <div className="bg-[#166534] text-white p-12 rounded-3xl shadow-xl flex flex-col md:flex-row gap-12 items-center">
          <div className="flex-1">
            <h3 className="text-3xl font-bold mb-6">Today's Growing Task</h3>
            <div className="space-y-4">
              {[
                "Check soil moisture level",
                "Check for pests (aphids/snails)",
                "Empty greywater collection bucket",
                "Water deeply in early morning",
              ].map((task, i) => (
                <label
                  key={i}
                  className="flex items-center gap-4 cursor-pointer group"
                >
                  <div className="w-6 h-6 border-2 border-white/20 rounded flex items-center justify-center group-hover:border-white transition-colors">
                    <Check className="w-4 h-4 text-white opacity-0 group-hover:opacity-100 transition-opacity" />
                  </div>
                  <span className="text-lg">{task}</span>
                </label>
              ))}
            </div>
            <div className="mt-8">
              <LogActionButton
                actionType="grow"
                description="Completed daily growing tasks"
                value={1}
                unit="tasks"
                location="Home garden"
                notes="Daily maintenance and care"
              />
            </div>
          </div>
          <div className="w-full md:w-1/3 bg-white/10 p-8 rounded-2xl backdrop-blur-sm border border-white/10">
            <div className="flex items-center gap-2 mb-2">
              <Sprout className="w-5 h-5 text-[#4ade80]" />
              <h4 className="font-bold">Beginner Tips</h4>
            </div>
            <ul className="text-sm text-white/80 space-y-2">
              <li>Start with only 2-4 plants</li>
              <li>Use seedlings, not seeds, for quicker success</li>
              <li>Water deeply but not too often</li>
              <li>Early morning watering is best</li>
              <li>Soil should be moist, not soggy</li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Grow;
