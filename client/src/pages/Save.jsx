import React, { useState } from "react";
import { Zap, Droplet } from "lucide-react";
import { useAppContext } from "../context/useAppContext";
import LogActionButton from "../components/LogActionButton";

const Save = () => {
  const { waterSaved, addWaterSaving, addEnergySaving, addImpact } =
    useAppContext();
  const [appliancePower, setAppliancePower] = useState(2000);
  const [hours, setHours] = useState(2);

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
            Save <span className="text-[#166534]">Water & Energy</span>
          </h2>
          <p className="text-[#111827]/60">
            Reduce your bills with Eskom-aligned tracking and Western Cape water
            tips.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
          {/* Load-Shedding Tips */}
          <div className="bg-amber-50 p-8 rounded-3xl border border-amber-200">
            <div className="flex items-center gap-3 mb-6">
              <Zap className="w-6 h-6 text-amber-600" />
              <h3 className="font-bold text-xl text-amber-900 uppercase tracking-tighter">Load-Shedding Resilience</h3>
            </div>
            <ul className="space-y-4">
              <li className="flex gap-4">
                <div className="w-8 h-8 rounded-full bg-amber-200 flex items-center justify-center text-amber-700 font-bold text-sm shrink-0">1</div>
                <p className="text-sm text-amber-800/80"><strong>Bulk Cooking:</strong> Cook larger meals during "on" times to reduce frequent high-wattage stove use (+R120 savings/mo).</p>
              </li>
              <li className="flex gap-4">
                <div className="w-8 h-8 rounded-full bg-amber-200 flex items-center justify-center text-amber-700 font-bold text-sm shrink-0">2</div>
                <p className="text-sm text-amber-800/80"><strong>Freezer Insulation:</strong> Keep your freezer full (even with water bottles) to maintain cold during 2-4 hour outages.</p>
              </li>
              <li className="flex gap-4">
                <div className="w-8 h-8 rounded-full bg-amber-200 flex items-center justify-center text-amber-700 font-bold text-sm shrink-0">3</div>
                <p className="text-sm text-amber-800/80"><strong>Solar Power:</strong> Small 10W solar chargers (R150) can keep your phones and emergency lights powered for free.</p>
              </li>
            </ul>
          </div>

          {/* Day Zero Context */}
          <div className="bg-blue-50 p-8 rounded-3xl border border-blue-200">
            <div className="flex items-center gap-3 mb-6">
              <Droplet className="w-6 h-6 text-blue-600" />
              <h3 className="font-bold text-xl text-blue-900 uppercase tracking-tighter">Water History Context</h3>
            </div>
            <div className="space-y-4">
              <div className="p-4 bg-white/50 rounded-2xl border border-blue-100">
                <h4 className="font-bold text-blue-900 mb-1 italic">The 2018 Day Zero Drought</h4>
                <p className="text-xs text-blue-800/70 leading-relaxed">
                  Cape Town almost ran out of water in 2018. We learned that every drop counts. Today, target 50L per person daily to keep our dams safe.
                </p>
              </div>
              <p className="text-sm text-blue-800/80">
                <strong>Township Resilience:</strong> Greywater (from laundry or dishes) is perfect for watering your spinach or flushing toilets. Never waste "used" water!
              </p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
          {/* Energy Calc */}
          <div className="bg-white p-8 rounded-3xl shadow-lg border border-[#166534]/10">
            <div className="flex items-center gap-3 mb-6">
              <div className="bg-amber-100 p-2 rounded-lg text-amber-600">
                <Zap className="w-6 h-6" />
              </div>
              <h3 className="font-bold text-2xl uppercase tracking-tight">
                Eskom Tariff Calc
              </h3>
            </div>
            <p className="text-sm text-[#111827]/60 mb-2 italic">
              Based on 2025/26 Projected Rates (Avg R3.20/kWh)
            </p>
            <p className="text-[10px] font-bold text-amber-600 uppercase mb-4">
              ⚠️ 12.74% Tariff Hike Approved for 2025/26
            </p>

            <div className="space-y-6">
              <div>
                <label className="block text-sm font-bold mb-2">
                  Select Appliance
                </label>
                <select
                  className="w-full bg-[#f5f5f4] border-none rounded-xl p-4 font-medium focus:ring-2 ring-[#166534]/20"
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
                <label className="block text-sm font-bold mb-2">
                  Daily Usage (Hours)
                </label>
                <input
                  type="range"
                  min="0"
                  max="24"
                  step="0.5"
                  value={hours}
                  onChange={(e) => setHours(Number(e.target.value))}
                  className="w-full h-2 bg-[#f5f5f4] rounded-lg appearance-none cursor-pointer accent-[#166534]"
                />
                <div className="flex justify-between text-xs font-bold text-[#111827]/40 mt-2">
                  <span>0h</span>
                  <span>{hours} Hours</span>
                  <span>24h</span>
                </div>
              </div>
              <div className="bg-[#f5f5f4]/50 p-6 rounded-2xl text-center">
                <div className="text-xs font-bold text-[#111827]/40 uppercase mb-1">
                  Estimated Monthly Cost
                </div>
                <div className="text-3xl font-black text-[#166534]">
                  R{energyCost}
                </div>
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

          {/* Water Tracker */}
          <div className="bg-white p-8 rounded-3xl shadow-lg border border-[#166534]/10">
            <div className="flex items-center gap-3 mb-6">
              <div className="bg-blue-100 p-2 rounded-lg text-blue-600">
                <Droplet className="w-6 h-6" />
              </div>
              <h3 className="font-bold text-2xl uppercase tracking-tight">
                Water Action Log
              </h3>
            </div>
            <div className="grid grid-cols-2 gap-4 mb-8">
              {[
                { label: "5-min Shower", save: 57 },
                { label: "Laundry Greywater", save: 50 },
                { label: "Cup for Brushing", save: 2 },
                { label: "Rain Tank Fill", save: 100 },
              ].map((act, i) => (
                <button
                  key={i}
                  onClick={() => logWater(act.save)}
                  className="p-4 bg-[#f5f5f4] rounded-2xl hover:bg-blue-50 transition-colors text-center group"
                >
                  <div className="text-blue-600 font-bold mb-1">
                    {act.label}
                  </div>
                  <div className="text-xs text-[#111827]/40 italic">
                    Saves ~{act.save}L
                  </div>
                </button>
              ))}
            </div>
            <div className="bg-blue-600 p-6 rounded-2xl text-white text-center shadow-inner">
              <div className="text-xs font-bold text-white/60 uppercase mb-1">
                Total Savings Logged
              </div>
              <div className="text-3xl font-black">
                {waterSaved.toLocaleString()} Liters
              </div>
            </div>
            <div className="mt-6">
              <LogActionButton
                actionType="save"
                description="Logged water saving actions"
                value={10} // Default for individual action if not specified
                unit="liters"
                location="Home"
                notes="Daily water conservation efforts"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Save;
