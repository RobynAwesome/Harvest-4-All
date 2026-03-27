import React, { useState } from "react";
import { Check } from "lucide-react";
import LogActionButton from "../components/LogActionButton";

const Grow = () => {
  const [step, setStep] = useState(1);
  const [answers, setAnswers] = useState({});

  const selectOption = (val) => {
    setAnswers({ ...answers, space: val });
    setStep(2);
  };

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
          {step === 1 ? (
            <div>
              <div className="flex items-center gap-4 mb-8">
                <span className="w-10 h-10 rounded-full bg-[#166534] text-white flex items-center justify-center font-bold">
                  1
                </span>
                <div>
                  <h3 className="font-bold text-xl">Grow Quiz</h3>
                  <p className="text-sm text-[#111827]/40">
                    Find the perfect crops for your space.
                  </p>
                </div>
              </div>
              <h4 className="text-lg font-bold mb-6">
                How much space do you have?
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <button
                  onClick={() => selectOption("small")}
                  className="p-6 border-2 border-[#166534]/10 rounded-2xl hover:border-[#166534] hover:bg-[#166534]/5 transition-all text-left"
                >
                  <div className="font-bold mb-1 italic text-[#166534]">
                    Small
                  </div>
                  <div className="text-sm text-[#111827]/60">
                    Windowsill or balcony (1-2m²)
                  </div>
                </button>
                <button
                  onClick={() => selectOption("medium")}
                  className="p-6 border-2 border-[#166534]/10 rounded-2xl hover:border-[#166534] hover:bg-[#166534]/5 transition-all text-left"
                >
                  <div className="font-bold mb-1 italic text-[#166534]">
                    Medium
                  </div>
                  <div className="text-sm text-[#111827]/60">
                    Small backyard (2-5m²)
                  </div>
                </button>
                <button
                  onClick={() => selectOption("large")}
                  className="p-6 border-2 border-[#166534]/10 rounded-2xl hover:border-[#166534] hover:bg-[#166534]/5 transition-all text-left"
                >
                  <div className="font-bold mb-1 italic text-[#166534]">
                    Large
                  </div>
                  <div className="text-sm text-[#111827]/60">
                    Community plot (5m²+)
                  </div>
                </button>
              </div>
            </div>
          ) : (
            <div className="text-center py-8">
              <h3 className="font-bold text-2xl mb-2 text-[#166534]">
                Great! We recommend:
              </h3>
              <p className="text-[#111827]/60 mb-6">
                Based on your {answers.space} space, focus on these crops below.
              </p>
              <button
                onClick={() => setStep(1)}
                className="text-xs font-bold uppercase tracking-widest text-[#111827]/40 hover:text-[#111827]"
              >
                Reset Quiz
              </button>
            </div>
          )}
        </div>

        {/* Crops Grid */}
        <h3 className="text-2xl font-bold mb-8">
          Recommended for <span className="text-[#166534]">Western Cape</span>
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {[
            {
              name: "Swiss Chard",
              time: 6,
              unit: "WEEKS",
              difficulty: "EASY",
              img: "https://images.unsplash.com/photo-1592419044706-39796d40f98c?auto=format&fit=crop&q=80&w=200",
            },
            {
              name: "Kale",
              time: 8,
              unit: "WEEKS",
              difficulty: "EASY",
              img: "https://images.unsplash.com/photo-1524179524541-1bb169720078?auto=format&fit=crop&q=80&w=200",
            },
            {
              name: "Tomatoes",
              time: 12,
              unit: "WEEKS",
              difficulty: "MEDIUM",
              img: "https://images.unsplash.com/photo-1592419044706-39796d40f98c?auto=format&fit=crop&q=80&w=200",
            },
            {
              name: "Spring Onions",
              time: 4,
              unit: "WEEKS",
              difficulty: "EASY",
              img: "https://images.unsplash.com/photo-1596464716127-f2a82984de30?auto=format&fit=crop&q=80&w=200",
            },
          ].map((crop, i) => (
            <div
              key={i}
              className="bg-white p-6 rounded-3xl border border-[#166534]/10 hover:shadow-xl transition-all group"
            >
              <div className="relative mb-4">
                <img
                  src={crop.img}
                  className="w-full h-32 rounded-2xl object-cover group-hover:scale-105 transition-transform"
                />
                <div className="absolute top-2 right-2 bg-white/90 backdrop-blur px-2 py-1 rounded-lg text-[10px] font-black text-[#166534] uppercase tracking-tighter">
                  {crop.difficulty}
                </div>
              </div>
              <h4 className="font-bold text-lg mb-1">{crop.name}</h4>
              <div className="mb-4">
                  <div className="flex justify-between text-[10px] font-bold text-[#111827]/40 uppercase mb-1">
                      <span>Timeline</span>
                      <span>{crop.time} {crop.unit}</span>
                  </div>
                  <div className="w-full bg-[#f5f5f4] h-1.5 rounded-full overflow-hidden">
                      <div className="bg-[#166534] h-full w-1/3 animate-pulse"></div>
                  </div>
              </div>
              <LogActionButton
                actionType="harvest"
                description={`Harvested ${crop.name}`}
                value={1}
                unit="kg"
                location="Backyard Garden"
                onActionLogged={() => console.log(`Harvested ${crop.name}`)}
              />
            </div>
          ))}
        </div>

        {/* Action Checklist */}
        <div className="bg-[#166534] text-white p-12 rounded-3xl shadow-xl flex flex-col md:flex-row gap-12 items-center">
          <div className="flex-1">
            <h3 className="text-3xl font-bold mb-6">Today's Growing Task</h3>
            <div className="space-y-4">
              {[
                "Check soil moisture level",
                "Check for pests (aphids/snails)",
                "Empty greywater collection bucket",
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
            <h4 className="font-bold mb-2">Did you know?</h4>
            <p className="text-sm text-white/80 italic">
              "Using tire gardens can save up to 90% of water compared to
              traditional ground planting in sandy WC soil."
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Grow;
