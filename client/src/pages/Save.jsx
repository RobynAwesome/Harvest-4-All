import React, { useState } from "react";
import { Zap, Droplet, AlertTriangle } from "lucide-react";
import { useAppContext } from "../context/useAppContext";
import LogActionButton from "../components/LogActionButton";

const Save = () => {
  const { waterSaved, addWaterSaving, addEnergySaving, addImpact } =
    useAppContext();
  const [appliancePower, setAppliancePower] = useState(2000);
  const [hours, setHours] = useState(2);
  const [activeTab, setActiveTab] = useState("selection"); // selection, water, energy
  const [notificationsEnabled, setNotificationsEnabled] = useState(false);
  const [stage, setStage] = useState(0); // Mock Eskom Stage

  // Calculate energy cost directly
  const energyCost = ((appliancePower / 1000) * hours * 30 * 3.2).toFixed(2);

  const logWater = (amount) => {
    addWaterSaving(amount);
    addImpact({
      type: "water_saved",
      value: amount,
      unit: "L",
      location: "Local User",
      notes: "Logged via Save module",
    });
  };

  const logEnergy = () => {
    addEnergySaving(parseFloat(energyCost));
    addImpact({
      type: "energy_saved",
      value: parseFloat(energyCost),
      unit: "ZAR",
      location: "Local User",
      notes: `Saved R${energyCost} by optimizing appliance usage`,
    });
  };

  return (
    <section className="section-fade py-16 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="mb-12">
          <h2 className="text-4xl font-black text-[#111827] mb-4">
            Save <span className="text-[#166534]">Resources</span>
          </h2>
          <p className="text-[#111827]/60">
            {activeTab === "selection" 
              ? "Select a resource to optimize. Reduce your bills with Western Cape specific mitigation strategies."
              : activeTab === "water" 
                ? "Drought resilience through greywater recycling and smart consumption."
                : "Load-shedding mitigation and Eskom tariff optimization."}
          </p>
        </div>

        {activeTab === "selection" && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10 min-h-[400px] animate-in zoom-in duration-500">
            {/* Water Selection Card */}
            <button
              onClick={() => setActiveTab("water")}
              className="group relative overflow-hidden bg-gradient-to-br from-blue-600 to-sky-800 rounded-[3rem] p-12 text-left transition-all hover:scale-[1.02] shadow-2xl"
            >
              <div className="absolute top-0 right-0 p-10 opacity-10 group-hover:scale-125 transition-transform">
                <Droplet className="w-64 h-64 text-white" />
              </div>
              <div className="relative z-10">
                <div className="w-16 h-16 bg-white/20 backdrop-blur rounded-2xl flex items-center justify-center text-white mb-8 border border-white/20">
                  <Droplet className="w-8 h-8" />
                </div>
                <h3 className="text-4xl font-black text-white mb-4 font-heading leading-tight">Water <br />Conserve</h3>
                <p className="text-white/70 font-medium max-w-xs mb-8">
                  Optimize your consumption, track greywater savings, and protect Cape Town's dams.
                </p>
                <span className="inline-flex items-center gap-2 bg-[#2ecc71] text-[#115e59] px-6 py-2 rounded-full text-xs font-black uppercase tracking-widest shadow-lg">
                  Liters Logged: {waterSaved.toLocaleString()}
                </span>
              </div>
            </button>

            {/* Energy Selection Card */}
            <button
              onClick={() => setActiveTab("energy")}
              className="group relative overflow-hidden bg-gradient-to-br from-amber-500 to-orange-700 rounded-[3rem] p-12 text-left transition-all hover:scale-[1.02] shadow-2xl"
            >
              <div className="absolute top-0 right-0 p-10 opacity-10 group-hover:scale-125 transition-transform">
                <Zap className="w-64 h-64 text-white" />
              </div>
              <div className="relative z-10">
                <div className="w-16 h-16 bg-white/20 backdrop-blur rounded-2xl flex items-center justify-center text-white mb-8 border border-white/20">
                  <Zap className="w-8 h-8" />
                </div>
                <h3 className="text-4xl font-black text-white mb-4 font-heading leading-tight">Energy <br />Preserve</h3>
                <p className="text-white/70 font-medium max-w-xs mb-8">
                  Mitigate load-shedding costs, calculate tariffs, and optimize appliance usage.
                </p>
                <span className="inline-flex items-center gap-2 bg-white text-amber-700 px-6 py-2 rounded-full text-xs font-black uppercase tracking-widest shadow-lg">
                  Eskom Tariffs: R3.20/kWh
                </span>
              </div>
            </button>
          </div>
        )}

        {/* --- GLOBAL NOTIFICATION CONTROL --- */}
        {activeTab === "selection" && (
          <div className="mt-12 bg-[#115e59] rounded-[2.5rem] p-10 text-white shadow-2xl relative overflow-hidden animate-in slide-in-from-bottom-10 duration-700">
            <div className="absolute top-0 right-0 p-10 opacity-5 grayscale">
              <Zap className="w-40 h-40" />
            </div>
            <div className="relative z-10 flex flex-col md:flex-row items-center gap-8 justify-between">
              <div>
                <h3 className="text-2xl font-black mb-2 font-heading">Activate Community Alerts</h3>
                <p className="text-white/70 text-sm max-w-lg font-medium">
                  Receive real-time Eskom Loadshedding stages and Western Cape drought alerts directly via our USSD-connected SMS layer.
                </p>
              </div>
              <div className="bg-white/10 p-2 rounded-3xl backdrop-blur-md flex items-center gap-4 px-6 border border-white/10">
                 <span className="text-xs font-black uppercase tracking-widest">{notificationsEnabled ? "System Active ✅" : "System Dormant 🔘"}</span>
                 <button 
                  onClick={() => {
                    setNotificationsEnabled(!notificationsEnabled);
                    addImpact({
                      type: "notification_opt_in",
                      value: !notificationsEnabled ? 1 : 0,
                      unit: "user",
                      notes: "User activated Resource Alert System"
                    });
                  }}
                  className={`w-16 h-8 rounded-full relative transition-all duration-300 ${notificationsEnabled ? "bg-[#2ecc71]" : "bg-white/20"}`}
                 >
                    <div className={`absolute top-1 w-6 h-6 bg-white rounded-full transition-all duration-300 shadow-lg ${notificationsEnabled ? "left-9" : "left-1"}`}></div>
                 </button>
              </div>
            </div>
          </div>
        )}

        {/* --- WATER MODULE --- */}
        {activeTab === "water" && (
          <div className="animate-in fade-in slide-in-from-right-10 duration-500">
            <button 
              onClick={() => setActiveTab("selection")}
              className="mb-8 flex items-center gap-2 text-[#111827]/40 hover:text-[#115e59] font-black uppercase text-[10px] tracking-widest transition-colors"
            >
              ← Back to Selection
            </button>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
              <div className="bg-blue-50 p-10 rounded-[3rem] border border-blue-200">
                <div className="flex items-center gap-3 mb-8">
                  <Droplet className="w-8 h-8 text-blue-600" />
                  <h3 className="font-black text-2xl text-blue-900 uppercase tracking-tight">Drought Resilience</h3>
                </div>
                <div className="space-y-6">
                  <div className="p-6 bg-white/60 backdrop-blur rounded-[2rem] border border-blue-100 shadow-sm">
                    <h4 className="font-black text-blue-900 mb-2 italic">March 2026: Early Drought Caution</h4>
                    <p className="text-sm text-blue-800/70 leading-relaxed font-medium">
                      Dam levels are at **49.2%**, a sharp decline from 65% in 2025. Cape Town consumption is averaging **1,000 MLD**, exceeding the safety target of 975 MLD.
                    </p>
                  </div>
                  <div className="p-6 bg-blue-100/50 rounded-[2rem] border border-blue-200">
                     <h4 className="font-black text-blue-900 text-sm mb-2 uppercase tracking-wide">Infrastructure Alert</h4>
                     <p className="text-xs text-blue-800/60 leading-relaxed">
                        Approximately **23% of Western Cape water** is lost through system leaks. Reporting leaks immediately via the app helps protect our finite supply.
                     </p>
                  </div>
                  <div className="flex gap-4 p-6 bg-blue-600 text-white rounded-[2rem] shadow-xl">
                     <span className="text-3xl">🚰</span>
                     <div>
                       <h4 className="font-black mb-1">Greywater Logic</h4>
                       <p className="text-xs text-white/70 font-medium">Reuse laundry or dish water for watering gardens or flushing toilets. Never waste used water.</p>
                     </div>
                  </div>
                </div>
              </div>

              <div className="bg-white p-10 rounded-[3rem] shadow-xl border border-blue-100">
                <div className="flex items-center gap-3 mb-8">
                  <div className="bg-blue-100 p-3 rounded-2xl text-blue-600">
                    <Droplet className="w-7 h-7" />
                  </div>
                  <h3 className="font-black text-2xl uppercase tracking-tight">Water Action Log</h3>
                </div>
                <div className="grid grid-cols-2 gap-4 mb-10">
                  {[
                    { label: "5-min Shower", save: 57, icon: "🚿" },
                    { label: "Laundry Reuse", save: 50, icon: "🧺" },
                    { label: "Cup brushing", save: 2, icon: "🪥" },
                    { label: "Rain Collection", save: 100, icon: "🌧️" },
                  ].map((act, i) => (
                    <button
                      key={i}
                      onClick={() => logWater(act.save)}
                      className="p-6 bg-[#f5f5f4] rounded-2xl hover:bg-blue-50 hover:border-blue-200 border-2 border-transparent transition-all group"
                    >
                      <div className="text-2xl mb-2">{act.icon}</div>
                      <div className="text-blue-900 font-black text-sm mb-1">{act.label}</div>
                      <div className="text-[10px] text-[#111827]/40 font-bold uppercase tracking-widest">Saves ~{act.save}L</div>
                    </button>
                  ))}
                </div>
                <div className="bg-blue-600 p-8 rounded-[2rem] text-white text-center shadow-2xl relative overflow-hidden">
                   <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -translate-y-1/2 translate-x-1/2 blur-2xl"></div>
                   <div className="text-xs font-black text-white/60 uppercase mb-2 tracking-[0.2em]">Total Savings Logged</div>
                   <div className="text-4xl font-black">{waterSaved.toLocaleString()} Liters</div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* --- ENERGY MODULE --- */}
        {activeTab === "energy" && (
          <div className="animate-in fade-in slide-in-from-left-10 duration-500">
            <button 
              onClick={() => setActiveTab("selection")}
              className="mb-8 flex items-center gap-2 text-[#111827]/40 hover:text-amber-600 font-black uppercase text-[10px] tracking-widest transition-colors"
            >
              ← Back to Selection
            </button>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
              <div className="bg-amber-50 p-10 rounded-[3rem] border border-amber-200">
                 <div className="flex justify-between items-start mb-8">
                  <div className="flex items-center gap-3">
                    <Zap className="w-8 h-8 text-amber-600" />
                    <h3 className="font-black text-2xl text-amber-900 uppercase tracking-tight">Eskom Hub</h3>
                  </div>
                  <div className="bg-white px-4 py-2 rounded-2xl shadow-sm border border-amber-200 animate-pulse">
                     <span className="text-[10px] font-black uppercase text-amber-600 tracking-widest">LIVE STATUS</span>
                     <p className="font-black text-amber-900">STAGE {stage}</p>
                  </div>
                </div>
                <div className="bg-white/60 backdrop-blur p-6 rounded-3xl border border-amber-200/50 mb-8">
                   <p className="text-sm font-medium text-amber-900/70 leading-relaxed">
                      Status: **Grid Stable**. No active load-shedding is projected for the next 24 hours. Ensuring your "Alert Center" is active will notify you immediately if Stage 1 is declared.
                   </p>
                </div>
                <ul className="space-y-6">
                  {[
                    { t: "Bulk Cooking", d: "Cook larger meals during ON times to reduce frequent high-wattage stove use.", s: "+R120/mo", icon: "🍱" },
                    { t: "Freezer Logic", d: "Keep your freezer full to maintain cold during 2-4 hour outages.", s: "Essential", icon: "🧊" },
                    { t: "Micro Solar", d: "10W solar chargers keep phones powered for free during blackout cycles.", s: "FREE Energy", icon: "☀️" },
                  ].map((tip, i) => (
                    <li key={i} className="flex gap-6 p-6 bg-white/40 rounded-3xl border border-amber-200/50">
                      <div className="w-12 h-12 rounded-2xl bg-amber-200 flex items-center justify-center text-xl shrink-0">{tip.icon}</div>
                      <div>
                        <div className="flex justify-between items-center mb-1">
                          <h4 className="font-black text-amber-900">{tip.t}</h4>
                          <span className="text-[10px] font-black text-amber-600 uppercase tracking-widest">{tip.s}</span>
                        </div>
                        <p className="text-xs text-amber-800/70 font-medium leading-relaxed">{tip.d}</p>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="bg-white p-10 rounded-[3rem] shadow-xl border border-amber-100">
                 <div className="flex items-center gap-3 mb-6">
                  <div className="bg-amber-100 p-3 rounded-2xl text-amber-600">
                    <Zap className="w-7 h-7" />
                  </div>
                  <h3 className="font-black text-2xl uppercase tracking-tight">Eskom Tariff Calc</h3>
                </div>
                <p className="text-xs font-bold text-amber-600 uppercase mb-8 flex items-center gap-2">
                   <AlertTriangle className="w-4 h-4" /> 12.74% Tariff Hike Approved for 2025/26
                </p>

                <div className="space-y-8">
                  <div>
                    <label className="block text-[10px] font-black uppercase tracking-widest text-[#111827]/40 mb-3">Select Appliance</label>
                    <select
                      className="w-full bg-[#f5f5f4] border-none rounded-2xl p-5 font-bold focus:ring-4 ring-amber-500/10 appearance-none shadow-sm"
                      onChange={(e) => setAppliancePower(Number(e.target.value))}
                      value={appliancePower}
                    >
                      <option value="1500">♨️ Kettle (1500W)</option>
                      <option value="2000">🚿 Geyser (2000W)</option>
                      <option value="1000">🔥 Heater (1000W)</option>
                      <option value="100">💡 LED Lights (100W Total)</option>
                    </select>
                  </div>
                  <div>
                    <div className="flex justify-between items-end mb-4">
                       <label className="text-[10px] font-black uppercase tracking-widest text-[#111827]/40">Daily Usage</label>
                       <span className="text-xl font-black text-amber-600">{hours} Hours</span>
                    </div>
                    <input
                      type="range"
                      min="0"
                      max="24"
                      step="0.5"
                      value={hours}
                      onChange={(e) => setHours(Number(e.target.value))}
                      className="w-full h-3 bg-[#f5f5f4] rounded-full appearance-none cursor-pointer accent-amber-600"
                    />
                  </div>
                  <div className="bg-amber-600 p-8 rounded-[2rem] text-white text-center shadow-2xl relative overflow-hidden">
                     <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -translate-y-1/2 translate-x-1/2 blur-2xl"></div>
                     <div className="text-xs font-black text-white/60 uppercase mb-2 tracking-[0.2em]">Estimated Monthly Cost</div>
                     <div className="text-4xl font-black">R{energyCost}</div>
                  </div>
                  <div className="pt-2">
                    <LogActionButton
                      actionType="save_energy"
                      description={`Optimized ${appliancePower}W appliance usage`}
                      value={energyCost}
                      unit="ZAR"
                      location="Home"
                      onActionLogged={logEnergy}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default Save;
