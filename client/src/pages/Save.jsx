import React, { useState, useEffect } from 'react';
import { Zap, Droplet } from 'lucide-react';
import { useAppContext } from '../context/AppContext';

const Save = () => {
  const { waterSaved, addWaterSaving, addImpact } = useAppContext();
  const [appliancePower, setAppliancePower] = useState(2000);
  const [hours, setHours] = useState(2);
  const [energyCost, setEnergyCost] = useState(0);

  useEffect(() => {
    // Current estimated Eskom residential rate R3.20/kWh
    const monthlyCost = (appliancePower / 1000) * hours * 30 * 3.20;
    setEnergyCost(monthlyCost.toFixed(2));
  }, [appliancePower, hours]);

  const logWater = (amount) => {
    addWaterSaving(amount);
    addImpact({
      type: 'water_saved',
      value: amount,
      unit: 'L',
      location: 'Local User',
      notes: 'Logged via Save module'
    });
  };

  return (
    <section className="section-fade py-16 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="mb-12">
          <h2 className="text-4xl font-black text-[#111827] mb-4">
            Save <span className="text-[#166534]">Water & Energy</span>
          </h2>
          <p className="text-[#111827]/60">Reduce your bills with Eskom-aligned tracking and Western Cape water tips.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
          {/* Energy Calc */}
          <div className="bg-white p-8 rounded-3xl shadow-lg border border-[#166534]/10">
            <div className="flex items-center gap-3 mb-6">
              <div className="bg-amber-100 p-2 rounded-lg text-amber-600">
                <Zap className="w-6 h-6" />
              </div>
              <h3 className="font-bold text-2xl uppercase tracking-tight">Eskom Tariff Calc</h3>
            </div>
            <p className="text-sm text-[#111827]/60 mb-6 italic">Based on 2025/26 Projected Rates (Avg R3.20/kWh)</p>
            
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-bold mb-2">Select Appliance</label>
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
                <label className="block text-sm font-bold mb-2">Daily Usage (Hours)</label>
                <input 
                  type="range" 
                  min="0" max="24" step="0.5" 
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
                <div className="text-xs font-bold text-[#111827]/40 uppercase mb-1">Estimated Monthly Cost</div>
                <div className="text-3xl font-black text-[#166534]">R{energyCost}</div>
              </div>
            </div>
          </div>

          {/* Water Tracker */}
          <div className="bg-white p-8 rounded-3xl shadow-lg border border-[#166534]/10">
            <div className="flex items-center gap-3 mb-6">
              <div className="bg-blue-100 p-2 rounded-lg text-blue-600">
                <Droplet className="w-6 h-6" />
              </div>
              <h3 className="font-bold text-2xl uppercase tracking-tight">Water Action Log</h3>
            </div>
            <div className="grid grid-cols-2 gap-4 mb-8">
              {[
                { label: 'Short Shower', save: 40 },
                { label: 'Greywater Use', save: 10 },
                { label: 'Cup for Brushing', save: 2 },
                { label: 'Rain Tank Fill', save: 100 }
              ].map((act, i) => (
                <button 
                  key={i}
                  onClick={() => logWater(act.save)}
                  className="p-4 bg-[#f5f5f4] rounded-2xl hover:bg-blue-50 transition-colors text-center group"
                >
                  <div className="text-blue-600 font-bold mb-1">{act.label}</div>
                  <div className="text-xs text-[#111827]/40 italic">Saves ~{act.save}L</div>
                </button>
              ))}
            </div>
            <div className="bg-blue-600 p-6 rounded-2xl text-white text-center shadow-inner">
              <div className="text-xs font-bold text-white/60 uppercase mb-1">Total Savings Logged</div>
              <div className="text-3xl font-black">{waterSaved.toLocaleString()} Liters</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Save;
