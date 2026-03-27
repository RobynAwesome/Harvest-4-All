import React from "react";
import { useAppContext } from "../context/AppContext";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler,
} from "chart.js";
import { Line } from "react-chartjs-2";
import {
  Award,
  ShieldCheck,
  Droplet,
  Trash2,
  Lock,
  Loader2,
} from "lucide-react";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler,
);

const Impact = () => {
  const { waterSaved, impactData } = useAppContext();

  const data = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Current'],
    datasets: [
      {
        fill: true,
        label: 'Savings (ZAR)',
        data: [120, 250, 380, 500, 700, 700 + (waterSaved * 0.5)], // Estimating R0.50 saved per Liter
        borderColor: '#166534',
        backgroundColor: 'rgba(22, 101, 52, 0.1)',
        tension: 0.4,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: { display: false },
    },
    scales: {
      y: { beginAtZero: true },
    },
  };

  return (
    <section className="section-fade py-16 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="mb-12">
          <h2 className="text-4xl font-black text-[#111827] mb-4">
            Your <span className="text-[#166534]">Impact Dashboard</span>
          </h2>
          <p className="text-[#111827]/60">
            Real data from your actions, contributing to the Western Cape's
            future.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
          {/* Sidebar */}
          <div className="space-y-6">
            <div className="bg-white p-6 rounded-3xl border border-[#166534]/10 shadow-sm text-center">
              <div className="w-16 h-16 bg-[#166534]/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <Award className="w-8 h-8 text-[#166534]" />
              </div>
              <h3 className="text-xs font-bold text-[#111827]/40 uppercase tracking-widest mb-1">
                Level 4
              </h3>
              <div className="text-2xl font-black text-[#111827] mb-4 uppercase italic">
                Urban Guardian
              </div>
              <div className="w-full bg-[#f5f5f4] h-3 rounded-full overflow-hidden mb-2">
                <div className="bg-[#166534] h-full w-2/3"></div>
              </div>
              <p className="text-[10px] font-bold text-[#111827]/40 uppercase">
                450 XP TO LEVEL 5
              </p>
            </div>

            <div className="bg-[#166534] p-6 rounded-3xl text-white shadow-xl">
              <h4 className="font-bold text-sm uppercase text-white/60 mb-4 tracking-widest">
                Lifetime Savings
              </h4>
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-sm font-medium text-white/80">
                    Food Value
                  </span>
                  <span className="font-black text-lg">R2,450</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm font-medium text-white/80">
                    Water Saved
                  </span>
                  <span className="font-black text-lg">
                    {waterSaved.toLocaleString()}L
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm font-medium text-white/80">
                    Waste Diverted
                  </span>
                  <span className="font-black text-lg">85kg</span>
                </div>
              </div>
            </div>
          </div>

          {/* Main Chart */}
          <div className="lg:col-span-2 space-y-8">
            <div className="bg-white p-8 rounded-3xl shadow-lg border border-[#166534]/10">
              <h3 className="font-bold text-xl mb-6">
                Savings History (ZAR)
              </h3>
              <div className="h-64">
                <Line data={data} options={options} />
              </div>
            </div>

            {/* Recent Activity */}
            <div className="bg-white p-8 rounded-3xl border border-[#166534]/10">
              <h3 className="font-bold text-xl mb-6">Recent Activity</h3>
              <div className="space-y-4">
                {impactData.length > 0 ? (
                  impactData.map((h, i) => (
                    <div
                      key={h._id || i}
                      className="flex justify-between items-center border-b border-[#f5f5f4] pb-4 animate-in fade-in"
                    >
                      <div>
                        <div className="font-bold capitalize">
                          {h.type?.replace("_", " ")}
                        </div>
                        <div className="text-xs text-[#111827]/40">
                          {new Date(h.date).toLocaleDateString()} • {h.location}
                        </div>
                      </div>
                      <div className="font-black text-[#166534]">
                        +{h.value}
                        {h.unit}
                      </div>
                    </div>
                  ))
                ) : (
                  <p className="text-[#111827]/40 text-sm italic">No recent activity logged.</p>
                )}
              </div>
            </div>

            {/* Badges */}
            <div>
              <h3 className="font-bold text-xl mb-6">Badges Earned</h3>
              <div className="grid grid-cols-4 sm:grid-cols-6 gap-4">
                <div className="aspect-square bg-[#166534] rounded-2xl flex items-center justify-center text-white shadow-md">
                  <ShieldCheck className="w-8 h-8" />
                </div>
                <div className="aspect-square bg-[#4ade80] rounded-2xl flex items-center justify-center text-[#166534] shadow-md">
                  <Droplet className="w-8 h-8" />
                </div>
                <div className="aspect-square bg-amber-400 rounded-2xl flex items-center justify-center text-[#111827] shadow-md">
                  <Trash2 className="w-8 h-8" />
                </div>
                {[1, 2, 3].map((i) => (
                  <div
                    key={i}
                    className="aspect-square bg-[#f5f5f4] border-2 border-dashed border-[#111827]/10 rounded-2xl flex items-center justify-center text-[#111827]/20"
                  >
                    <Lock className="w-6 h-6" />
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

export default Impact;
