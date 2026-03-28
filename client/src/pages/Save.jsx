import React, { useState } from "react";
import { Zap, Droplet, AlertTriangle, CloudRain, Sun, Wrench, CheckCircle2, ChevronDown, ChevronUp } from "lucide-react";
import { useAppContext } from "../context/useAppContext";
import LogActionButton from "../components/LogActionButton";
import { WATER_TIPS } from "../data/mockData";

const Save = () => {
  const { waterSaved, addWaterSaving, energySaved, addEnergySaving, addImpact, logAction } =
    useAppContext();
  const [appliancePower, setAppliancePower] = useState(2000);
  const [hours, setHours] = useState(2);
  const [activeTab, setActiveTab] = useState("selection");
  const [notificationsEnabled, setNotificationsEnabled] = useState(false);
  const [stage, setStage] = useState(0);

  // Rainwater calculator
  const [roofArea, setRoofArea] = useState(50);
  const annualRainfall = 515; // mm/year Cape Town avg
  const rainwaterYield = Math.round(roofArea * (annualRainfall / 1000) * 0.8 * 1000);

  // Solar estimator
  const [monthlyBill, setMonthlyBill] = useState(1200);
  const kWhUsed = monthlyBill / 3.2;
  const panelsNeeded = Math.ceil(kWhUsed / 30 / 5 / 0.4);
  const solarCost = panelsNeeded * 4500;
  const paybackYears = (solarCost / (monthlyBill * 12)).toFixed(1);

  // Load-shedding checklist
  const [checklist, setChecklist] = useState(() => {
    const saved = localStorage.getItem("loadshedding_checklist");
    return saved ? JSON.parse(saved) : {
      torch: false,
      powerbank: false,
      gasstove: false,
      coolerbag: false,
      solarcharger: false,
      batteryradio: false,
      candles: false,
      firstaid: false,
    };
  });

  const toggleCheck = (key) => {
    const updated = { ...checklist, [key]: !checklist[key] };
    setChecklist(updated);
    localStorage.setItem("loadshedding_checklist", JSON.stringify(updated));
  };

  const checklistItems = [
    { key: "torch", label: "Torch / Flashlight", icon: "🔦" },
    { key: "powerbank", label: "Power Bank (charged)", icon: "🔋" },
    { key: "gasstove", label: "Gas Stove / Cooker", icon: "🔥" },
    { key: "coolerbag", label: "Cooler Bag for Perishables", icon: "🧊" },
    { key: "solarcharger", label: "Solar Phone Charger", icon: "☀️" },
    { key: "batteryradio", label: "Battery Radio", icon: "📻" },
    { key: "candles", label: "Emergency Candles", icon: "🕯️" },
    { key: "firstaid", label: "First Aid Kit", icon: "🩹" },
  ];

  const checklistProgress = Object.values(checklist).filter(Boolean).length;
  const checklistTotal = Object.keys(checklist).length;

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

  // Expanded sections state
  const [showGreywater, setShowGreywater] = useState(false);

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
                 <span className="text-xs font-black uppercase tracking-widest">{notificationsEnabled ? "System Active" : "System Dormant"}</span>
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
                    <h4 className="font-black text-blue-900 mb-2 italic">Western Cape Dam Status</h4>
                    <div className="mb-3">
                      <div className="flex justify-between text-sm font-bold mb-1">
                        <span className="text-blue-700">Dam Level</span>
                        <span className="text-blue-900">{WATER_TIPS.wcDamLevel}%</span>
                      </div>
                      <div className="w-full bg-blue-200 rounded-full h-3">
                        <div className="bg-blue-600 rounded-full h-3 transition-all" style={{ width: `${WATER_TIPS.wcDamLevel}%` }} />
                      </div>
                    </div>
                    <p className="text-sm text-blue-800/70 leading-relaxed font-medium">
                      Restriction Level {WATER_TIPS.restrictionLevel}. Cape Town consumption exceeds safety target. Every liter saved counts.
                    </p>
                  </div>
                  <div className="p-6 bg-blue-100/50 rounded-[2rem] border border-blue-200">
                     <h4 className="font-black text-blue-900 text-sm mb-2 uppercase tracking-wide">Infrastructure Alert</h4>
                     <p className="text-xs text-blue-800/60 leading-relaxed">
                        {WATER_TIPS.facts[4]}. Reporting leaks immediately helps protect our finite supply.
                     </p>
                  </div>

                  {/* Greywater Guide - expandable */}
                  <div className="rounded-[2rem] border border-blue-200 overflow-hidden">
                    <button
                      onClick={() => setShowGreywater(!showGreywater)}
                      className="w-full flex items-center justify-between p-6 bg-blue-600 text-white"
                    >
                      <div className="flex items-center gap-3">
                        <span className="text-2xl">🚰</span>
                        <h4 className="font-black">Greywater Recycling Guide</h4>
                      </div>
                      {showGreywater ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
                    </button>
                    {showGreywater && (
                      <div className="p-6 bg-white space-y-4">
                        <div>
                          <h5 className="font-black text-green-700 text-sm mb-2">Safe to Reuse</h5>
                          <div className="flex flex-wrap gap-2">
                            {["Laundry (no bleach)", "Bath water", "Hand washing", "Rinse water"].map(s => (
                              <span key={s} className="bg-green-50 text-green-700 px-3 py-1 rounded-full text-xs font-bold border border-green-200">{s}</span>
                            ))}
                          </div>
                        </div>
                        <div>
                          <h5 className="font-black text-red-600 text-sm mb-2">NOT Safe</h5>
                          <div className="flex flex-wrap gap-2">
                            {["Kitchen (grease)", "Toilet", "Chemical cleaning"].map(s => (
                              <span key={s} className="bg-red-50 text-red-600 px-3 py-1 rounded-full text-xs font-bold border border-red-200">{s}</span>
                            ))}
                          </div>
                        </div>
                        <div className="bg-blue-50 p-4 rounded-xl">
                          <h5 className="font-black text-blue-900 text-sm mb-2">DIY 3-Step System</h5>
                          <div className="flex items-center gap-3 text-sm text-blue-800">
                            <span className="bg-blue-200 w-8 h-8 rounded-full flex items-center justify-center font-black text-blue-700">1</span>
                            <span>Collect in bucket</span>
                            <span className="text-blue-400">→</span>
                            <span className="bg-blue-200 w-8 h-8 rounded-full flex items-center justify-center font-black text-blue-700">2</span>
                            <span>Filter debris</span>
                            <span className="text-blue-400">→</span>
                            <span className="bg-blue-200 w-8 h-8 rounded-full flex items-center justify-center font-black text-blue-700">3</span>
                            <span>Irrigate garden</span>
                          </div>
                          <p className="text-xs text-blue-700/70 mt-2 font-medium">Saves 100-150L per day per household</p>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>

              <div className="space-y-8">
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
                      { label: "Bucket Bath", save: 150, icon: "🪣" },
                      { label: "Drip Irrigation", save: 30, icon: "💧" },
                    ].map((act, i) => (
                      <button
                        key={i}
                        onClick={() => logWater(act.save)}
                        className="p-5 bg-[#f5f5f4] rounded-2xl hover:bg-blue-50 hover:border-blue-200 border-2 border-transparent transition-all group"
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

                {/* Rainwater Harvesting Calculator */}
                <div className="bg-sky-50 p-8 rounded-[3rem] border border-sky-200 shadow-lg">
                  <div className="flex items-center gap-3 mb-6">
                    <CloudRain className="w-7 h-7 text-sky-600" />
                    <h3 className="font-black text-xl text-sky-900 uppercase tracking-tight">Rainwater Harvesting Calculator</h3>
                  </div>
                  <div className="space-y-5">
                    <div>
                      <div className="flex justify-between items-end mb-2">
                        <label className="text-[10px] font-black uppercase tracking-widest text-[#111827]/40">Roof Area</label>
                        <span className="text-lg font-black text-sky-600">{roofArea} m²</span>
                      </div>
                      <input
                        type="range"
                        min="10"
                        max="200"
                        value={roofArea}
                        onChange={(e) => setRoofArea(Number(e.target.value))}
                        className="w-full h-3 bg-sky-200 rounded-full appearance-none cursor-pointer accent-sky-600"
                      />
                      <div className="flex justify-between text-[10px] text-sky-600/60 font-bold mt-1">
                        <span>Small shack (10m²)</span>
                        <span>Large house (200m²)</span>
                      </div>
                    </div>
                    <div className="bg-sky-600 p-6 rounded-2xl text-white text-center shadow-xl">
                      <div className="text-xs font-black text-white/60 uppercase mb-1 tracking-[0.15em]">Annual Collection Potential</div>
                      <div className="text-3xl font-black">{rainwaterYield.toLocaleString()} L/year</div>
                      <p className="text-xs text-white/70 mt-2">Based on Cape Town avg rainfall ({annualRainfall}mm/year) × 0.8 runoff coefficient</p>
                    </div>
                    <div className="grid grid-cols-3 gap-3 text-center">
                      {[
                        { size: "1,000L", cost: "R2,500", best: "Shack" },
                        { size: "2,500L", cost: "R4,200", best: "House" },
                        { size: "5,000L", cost: "R6,800", best: "Community" },
                      ].map((tank, i) => (
                        <div key={i} className="bg-white p-3 rounded-xl border border-sky-200">
                          <div className="font-black text-sky-900 text-sm">{tank.size}</div>
                          <div className="text-sky-600 text-xs font-bold">{tank.cost}</div>
                          <div className="text-[10px] text-sky-500">{tank.best}</div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Water Facts */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mt-4">
              {WATER_TIPS.facts.map((fact, i) => (
                <div key={i} className="bg-blue-50 p-4 rounded-2xl border border-blue-100 flex items-start gap-3">
                  <Droplet className="w-4 h-4 text-blue-500 mt-0.5 flex-shrink-0" />
                  <p className="text-xs text-blue-800 font-medium leading-relaxed">{fact}</p>
                </div>
              ))}
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
              <div className="space-y-8">
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
                        Status: Grid {stage === 0 ? "Stable" : "Under Pressure"}. {stage === 0 ? "No active load-shedding projected for next 24 hours." : `Stage ${stage} active. Prepare for 2-4 hour outages.`}
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

                {/* Energy Survival Carousel */}
                <div className="bg-white p-10 rounded-[3rem] border border-emerald-100 shadow-xl overflow-hidden relative">
                <div className="absolute top-0 right-0 w-32 h-32 bg-amber-50 rounded-full -translate-y-1/2 translate-x-1/2" />
                <div className="flex items-center gap-4 mb-8">
                  <div className="bg-amber-100 p-4 rounded-2xl">
                    <Zap className="w-8 h-8 text-amber-600" />
                  </div>
                  <div>
                    <h3 className="text-2xl font-black font-heading leading-tight">Energy <span className="text-amber-600">Survival</span></h3>
                    <p className="text-xs font-bold uppercase tracking-widest text-[#111827]/40">Load-shedding Mastery</p>
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                   {[
                     { t: "Paraffin Safety", d: "Keep stove 1m from walls. Never leave unattended. Impact: Reduces fire risk by 90% in informal housing.", icon: ShieldCheck },
                     { t: "Communal Charging", d: "Charge power banks at community hubs during Stage 1. Share resources with neighbors.", icon: BatteryCharging },
                     { t: "LED Retrofit", d: "Replace one 60W bulb with 9W LED. Save R15/month per bulb in pre-paid credits.", icon: Lightbulb }
                   ].map((item, i) => (
                     <div key={i} className="bg-amber-50/50 p-6 rounded-3xl border border-amber-100/50">
                        <item.icon className="w-6 h-6 text-amber-600 mb-4" />
                        <h4 className="font-black text-[#111827] mb-2">{item.t}</h4>
                        <p className="text-xs text-[#111827]/60 font-medium leading-relaxed">{item.d}</p>
                     </div>
                   ))}
                </div>
              </div>

                {/* Load-Shedding Preparedness Checklist */}
                <div className="bg-amber-50 p-8 rounded-[3rem] border border-amber-200">
                  <div className="flex items-center gap-3 mb-4">
                    <Wrench className="w-6 h-6 text-amber-600" />
                    <h3 className="font-black text-lg text-amber-900 uppercase tracking-tight">Emergency Kit Checklist</h3>
                  </div>
                  {/* Progress bar */}
                  <div className="mb-6">
                    <div className="flex justify-between text-sm mb-1">
                      <span className="font-bold text-amber-700">Preparedness</span>
                      <span className="font-black text-amber-900">{checklistProgress}/{checklistTotal}</span>
                    </div>
                    <div className="w-full bg-amber-200 rounded-full h-3">
                      <div
                        className={`h-3 rounded-full transition-all duration-500 ${checklistProgress === checklistTotal ? "bg-green-500" : "bg-amber-500"}`}
                        style={{ width: `${(checklistProgress / checklistTotal) * 100}%` }}
                      />
                    </div>
                    {checklistProgress === checklistTotal && (
                      <p className="text-xs text-green-600 font-bold mt-2 flex items-center gap-1">
                        <CheckCircle2 className="w-3.5 h-3.5" /> Fully prepared!
                      </p>
                    )}
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {checklistItems.map((item) => (
                      <button
                        key={item.key}
                        onClick={() => toggleCheck(item.key)}
                        className={`flex items-center gap-3 p-3 rounded-xl transition-all text-left ${
                          checklist[item.key]
                            ? "bg-green-100 border-2 border-green-300"
                            : "bg-white border-2 border-amber-100 hover:border-amber-300"
                        }`}
                      >
                        <span className="text-lg">{item.icon}</span>
                        <span className={`text-sm font-bold ${checklist[item.key] ? "text-green-700 line-through" : "text-amber-900"}`}>
                          {item.label}
                        </span>
                        {checklist[item.key] && <CheckCircle2 className="w-4 h-4 text-green-500 ml-auto" />}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              <div className="space-y-8">
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
                        <option value="1500">Kettle (1500W)</option>
                        <option value="2000">Geyser (2000W)</option>
                        <option value="1000">Heater (1000W)</option>
                        <option value="100">LED Lights (100W Total)</option>
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

                {/* Solar Energy Estimator */}
                <div className="bg-gradient-to-br from-yellow-50 to-orange-50 p-8 rounded-[3rem] border border-yellow-200 shadow-lg">
                  <div className="flex items-center gap-3 mb-6">
                    <Sun className="w-7 h-7 text-yellow-600" />
                    <h3 className="font-black text-xl text-yellow-900 uppercase tracking-tight">Solar Energy Estimator</h3>
                  </div>
                  <div className="space-y-5">
                    <div>
                      <div className="flex justify-between items-end mb-2">
                        <label className="text-[10px] font-black uppercase tracking-widest text-[#111827]/40">Monthly Electricity Bill</label>
                        <span className="text-lg font-black text-yellow-700">R{monthlyBill}</span>
                      </div>
                      <input
                        type="range"
                        min="200"
                        max="5000"
                        step="100"
                        value={monthlyBill}
                        onChange={(e) => setMonthlyBill(Number(e.target.value))}
                        className="w-full h-3 bg-yellow-200 rounded-full appearance-none cursor-pointer accent-yellow-600"
                      />
                    </div>
                    <div className="grid grid-cols-3 gap-3">
                      <div className="bg-white p-4 rounded-xl border border-yellow-200 text-center">
                        <div className="text-2xl font-black text-yellow-700">{panelsNeeded}</div>
                        <div className="text-[10px] font-bold text-yellow-600 uppercase">Panels Needed</div>
                      </div>
                      <div className="bg-white p-4 rounded-xl border border-yellow-200 text-center">
                        <div className="text-2xl font-black text-yellow-700">R{(solarCost / 1000).toFixed(0)}k</div>
                        <div className="text-[10px] font-bold text-yellow-600 uppercase">Est. Cost</div>
                      </div>
                      <div className="bg-white p-4 rounded-xl border border-yellow-200 text-center">
                        <div className="text-2xl font-black text-yellow-700">{paybackYears}yr</div>
                        <div className="text-[10px] font-bold text-yellow-600 uppercase">Payback</div>
                      </div>
                    </div>
                    <div className="bg-yellow-600/10 p-4 rounded-xl border border-yellow-200">
                      <p className="text-xs text-yellow-800 font-medium leading-relaxed">
                        <strong>Start small:</strong> A solar geyser (R12,000-R18,000) saves ~40% of your electricity bill.
                        Cape Town averages 5+ peak sun hours daily — ideal for solar.
                      </p>
                    </div>
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
