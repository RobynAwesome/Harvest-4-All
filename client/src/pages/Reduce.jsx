import React, { useState } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import { MapPin, Trash2, CheckCircle } from "lucide-react";
import { useAppContext } from "../context/useAppContext";
import LogActionButton from "../components/LogActionButton";

import markerIcon from "leaflet/dist/images/marker-icon.png";
import markerShadow from "leaflet/dist/images/marker-shadow.png";
let DefaultIcon = L.icon({
  iconUrl: markerIcon,
  shadowUrl: markerShadow,
  iconSize: [25, 41],
  iconAnchor: [12, 41],
});
L.Marker.prototype.options.icon = DefaultIcon;

const Reduce = () => {
  const points = [
    { id: 1, pos: [-34.0084, 18.6449], name: "Khayelitsha Drop-off", items: "Plastic, Paper, Glass" },
    { id: 2, pos: [-34.0484, 18.6049], name: "Mitchells Plain Depot", items: "Electronics, Cardboard" },
    { id: 3, pos: [-33.9312, 18.4232], name: "City Center Hub", items: "Garden Waste, Metal" },
    { id: 4, pos: [-33.8569, 18.7188], name: "Kraaifontein MRF", items: "Integrated Waste, Garden Refuse" },
    { id: 5, pos: [-33.9500, 18.5000], name: "Athlone Refuse Station", items: "Multi-waste, Hazardous" },
  ];

  const { wasteReduced, addWasteReduction, addImpact } = useAppContext();

  const [challengeDays, setChallengeDays] = useState(() => {
    const saved = localStorage.getItem("zeroWasteDays");
    return saved ? JSON.parse(saved) : Array(7).fill(false);
  });

  const toggleDay = (index) => {
    const updated = [...challengeDays];
    updated[index] = !updated[index];
    setChallengeDays(updated);
    localStorage.setItem("zeroWasteDays", JSON.stringify(updated));
  };

  const completedDays = challengeDays.filter(Boolean).length;

  const handleLogWaste = (amount) => {
    addWasteReduction(amount);
    addImpact({
      type: "waste_reduced",
      value: amount,
      unit: "kg",
      location: "Local User",
      notes: "Logged recycling action",
    });
  };

  return (
    <section className="section-fade py-16 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="mb-12">
          <h2 className="text-4xl font-black text-[#111827] mb-4">
            Reduce <span className="text-[#166534]">Waste</span>
          </h2>
          <p className="text-[#111827]/60">
            Find local recycling points and learn upcycling techniques.
            Cape Town diverts only 31.5% of waste from landfill — help change that.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
          <div className="lg:col-span-2 space-y-8">
            <div className="bg-white p-4 rounded-3xl shadow-lg border border-[#166534]/10 h-[500px] overflow-hidden">
              <MapContainer
                center={[-34.0, 18.55]}
                zoom={11}
                style={{ height: "100%", width: "100%", borderRadius: "1.5rem" }}
              >
                <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
                {points.map((p) => (
                  <Marker key={p.id} position={p.pos}>
                    <Popup>
                      <div className="font-bold text-[#166534]">{p.name}</div>
                      <div className="text-xs text-[#111827]/60">{p.items}</div>
                    </Popup>
                  </Marker>
                ))}
              </MapContainer>
            </div>

            {/* The Circular Resilience Explanation Section - INDOOR (Left Column Only) */}
            <div className="bg-white/60 backdrop-blur-xl rounded-[2.5rem] p-10 border border-[#166534]/10 shadow-xl relative overflow-hidden group mb-12 animate-in fade-in slide-in-from-bottom-5 duration-700">
              <div className="absolute top-0 left-0 w-2 h-full bg-gradient-to-b from-[#166534] to-[#4ade80]"></div>
              <div className="relative z-10">
                <div className="inline-block bg-[#166534]/10 text-[#166534] px-4 py-1 rounded-full text-[10px] font-black tracking-widest uppercase mb-6">
                  The Resilience Hub
                </div>
                <h3 className="text-2xl font-black text-[#111827] mb-8 font-heading">
                  Why <span className="text-[#166534]">Waste Projects</span> Matter
                </h3>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                  <div className="space-y-3">
                    <div className="text-2xl mb-4">🥗</div>
                    <h4 className="text-lg font-black text-[#111827] font-heading">Food Security</h4>
                    <p className="text-xs font-medium text-[#111827]/60 leading-relaxed">
                      Turns trash (bottles, tires) into **Zero-Cost Infrastructure**. By avoiding land costs, we make high-yield agriculture accessible to every family.
                    </p>
                  </div>

                  <div className="space-y-3">
                    <div className="text-2xl mb-4">💼</div>
                    <h4 className="text-lg font-black text-[#111827] font-heading">Unemployment</h4>
                    <p className="text-xs font-medium text-[#111827]/60 leading-relaxed">
                      Collect, separate, and upcycle into agricultural assets. Trash is a **raw material** for creating sustainable township livelihoods and micro-jobs.
                    </p>
                  </div>

                  <div className="space-y-3">
                    <div className="text-2xl mb-4">🌍</div>
                    <h4 className="text-lg font-black text-[#111827] font-heading">Sustainability</h4>
                    <p className="text-xs font-medium text-[#111827]/60 leading-relaxed">
                      Diverts 90% of waste from landfills. Redirecting nutrients back into the soil via composting and reuse creates a **local regenerative loop**.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* NEW: Waste-to-Wealth Guide (Monetization Strategy) */}
            <div className="bg-[#115e59] text-white rounded-[2.5rem] p-10 md:p-14 shadow-2xl relative overflow-hidden group">
              <div className="absolute bottom-0 right-0 w-64 h-64 bg-[#4ade80]/10 rounded-full translate-y-1/2 translate-x-1/2 blur-[80px]"></div>
              <div className="relative z-10">
                <div className="inline-block bg-[#4ade80]/20 text-[#4ade80] px-4 py-1 rounded-full text-[10px] font-black tracking-widest uppercase mb-6">
                  Western Cape Monetization Guide
                </div>
                <h3 className="text-3xl font-black mb-10 font-heading">
                  Waste-to-Wealth <span className="text-[#4ade80]">Roadmap</span>
                </h3>
                
                <div className="grid grid-cols-1 gap-8">
                  {[
                    {
                      step: "01",
                      title: "Source High-Value 'Gold'",
                      desc: "Focus on PET1 Plastics (Clear bottles), Aluminum (Cans), and HDPE (Milk jugs). These fetch the highest rates at Cape Town scrapyards.",
                      icon: "💎"
                    },
                    {
                      step: "02",
                      title: "Precision Cleaning",
                      desc: "Contamination kills value. Rinse and flatten all items. Clean PET plastic can earn up to R4.50/kg vs R1.00/kg for dirty waste.",
                      icon: "🧼"
                    },
                    {
                      step: "03",
                      title: "Map Your Buy-Back Centre",
                      desc: "Locate your nearest authorized Buy-Back Centre in Khayelitsha or Athlone. Avoid middlemen to get direct-to-depot pricing.",
                      icon: "📍"
                    },
                    {
                      step: "04",
                      title: "Bulk Aggregation",
                      desc: "Individual sales are slow. Use our 'Market' tab to find neighbors and aggregate 100kg+ loads for 20% higher bulk premiums.",
                      icon: "📦"
                    },
                    {
                      step: "05",
                      title: "The Upcycling Multiplier",
                      desc: "Maximum Profit: Don't just sell raw. Convert old tires into 'Ready-to-Plant' beds and sell them for R50-R100 each on our marketplace.",
                      icon: "🚀"
                    }
                  ].map((item, i) => (
                    <div key={i} className="flex gap-8 group/item">
                      <div className="text-3xl font-black text-white/10 group-hover/item:text-[#4ade80]/40 transition-colors select-none">
                        {item.step}
                      </div>
                      <div className="flex-1 pb-6 border-b border-white/5 last:border-0 hover:translate-x-1 transition-transform">
                        <div className="flex items-center gap-3 mb-2">
                           <span className="text-xl">{item.icon}</span>
                           <h4 className="text-xl font-black font-heading text-[#4ade80]">{item.title}</h4>
                        </div>
                        <p className="text-xs font-medium text-white/70 leading-relaxed">
                          {item.desc}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          <div className="space-y-6">
            <div className="bg-[#166534] text-white p-8 rounded-3xl shadow-xl">
              <div className="flex items-center gap-3 mb-6">
                <Trash2 className="w-6 h-6 text-[#4ade80]" />
                <h3 className="font-bold text-xl uppercase tracking-tighter">
                  DIY Upcycling
                </h3>
              </div>
              <ul className="space-y-4">
                <li className="p-4 bg-white/10 rounded-2xl">
                  <h4 className="font-bold text-sm mb-1">Plastic Bottle Planters</h4>
                  <p className="text-xs text-white/70">
                    Cut 2L bottles into colorful hanging pots for spring onions.
                  </p>
                </li>
                <li className="p-4 bg-white/10 rounded-2xl">
                  <h4 className="font-bold text-sm mb-1">Egg Carton Seedlings</h4>
                  <p className="text-xs text-white/70">
                    Perfect biodegradable starter pots for your spinach seeds.
                  </p>
                </li>
                <li className="p-4 bg-white/10 rounded-2xl">
                  <h4 className="font-bold text-sm mb-1">Tyre Garden Beds</h4>
                  <p className="text-xs text-white/70">
                    Stack 3-4 old tyres, fill with compost mix. Perfect raised bed for R0.
                  </p>
                </li>
                <li className="p-4 bg-white/10 rounded-2xl">
                  <h4 className="font-bold text-sm mb-1">Pallet Compost Bin</h4>
                  <p className="text-xs text-white/70">
                    Build a 3-bin system from free pallets. Turns kitchen waste into garden gold.
                  </p>
                </li>
              </ul>
            </div>

            <div className="bg-white p-6 rounded-3xl border border-[#166534]/10">
              <h3 className="font-bold mb-4">Log Waste Reduction</h3>
              <div className="bg-[#f5f5f4] p-4 rounded-2xl mb-4 text-center">
                <div className="text-xs font-bold text-[#111827]/60 uppercase mb-1">
                  Total Reduced
                </div>
                <div className="text-2xl font-black text-[#166534]">
                  {wasteReduced} kg
                </div>
              </div>
              <p className="text-sm text-[#111827]/60 mb-4">
                Track your recycling and upcycling efforts
              </p>
              <LogActionButton
                actionType="reduce"
                description="Recycled household waste"
                value={5}
                unit="kg"
                location="Home recycling"
                onActionLogged={() => handleLogWaste(5)}
              />
            </div>

            <div className="bg-white p-8 rounded-3xl border border-[#166534]/10">
              <h3 className="font-bold mb-4">Nearby Points</h3>
              <div className="space-y-4">
                {points.map((p) => (
                  <div
                    key={p.id}
                    className="flex items-start gap-4 p-3 hover:bg-[#f5f5f4] rounded-xl transition-colors cursor-pointer"
                  >
                    <MapPin className="w-5 h-5 text-[#166534] mt-1" />
                    <div>
                      <div className="font-bold text-sm">{p.name}</div>
                      <div className="text-xs text-[#111827]/60">
                        {p.items}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Zero Waste Week Challenge */}
        <div className="bg-gradient-to-r from-[#166534] to-emerald-700 text-white p-10 rounded-3xl shadow-xl">
          <div className="flex flex-col md:flex-row gap-8 items-center">
            <div className="flex-1">
              <h3 className="text-2xl font-bold mb-2">Zero Waste Week Challenge</h3>
              <p className="text-white/70 mb-6">
                Complete all 7 days to earn the Eco Champion badge! Track your daily
                waste reduction habits.
              </p>
              <div className="grid grid-cols-7 gap-3 mb-6">
                {["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"].map(
                  (day, i) => (
                    <button
                      key={i}
                      onClick={() => toggleDay(i)}
                      className={`flex flex-col items-center p-3 rounded-xl transition-all ${
                        challengeDays[i]
                          ? "bg-[#4ade80] text-[#166534]"
                          : "bg-white/10 hover:bg-white/20"
                      }`}
                    >
                      <span className="text-[10px] font-bold uppercase">
                        {day}
                      </span>
                      {challengeDays[i] && (
                        <CheckCircle className="w-4 h-4 mt-1" />
                      )}
                    </button>
                  ),
                )}
              </div>
              <div className="flex items-center gap-4">
                <div className="flex-1 bg-white/20 h-3 rounded-full overflow-hidden">
                  <div
                    className="bg-[#4ade80] h-full rounded-full transition-all"
                    style={{ width: `${(completedDays / 7) * 100}%` }}
                  />
                </div>
                <span className="text-sm font-bold">{completedDays}/7</span>
              </div>
            </div>
            <div className="w-full md:w-auto">
              <div className="bg-white/10 p-6 rounded-2xl space-y-3">
                <h4 className="font-bold text-sm mb-3">Daily Tasks:</h4>
                {[
                  "Refuse single-use plastic",
                  "Compost all food scraps",
                  "Repair instead of replace",
                  "Separate recyclables properly",
                ].map((task, i) => (
                  <div
                    key={i}
                    className="flex items-center gap-2 text-sm text-white/80"
                  >
                    <div className="w-1.5 h-1.5 rounded-full bg-[#4ade80]" />
                    {task}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Reduce;
