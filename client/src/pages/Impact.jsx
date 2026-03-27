import React from "react";
import { useAppContext } from "../context/useAppContext";
import LogActionButton from "../components/LogActionButton";
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
  const {
    waterSaved,
    actions,
    earnedBadges,
    totalPoints,
    getEarnedBadgeDetails,
    energySaved,
    wasteReduced,
  } = useAppContext();

  const data = {
    labels: ["Jan", "Feb", "Mar", "Apr", "May", "Current"],
    datasets: [
      {
        fill: true,
        label: "Sustainability Index",
        data: [200, 450, 800, 1200, 1800, 1800 + totalPoints],
        borderColor: "#166534",
        backgroundColor: "rgba(22, 101, 52, 0.1)",
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
                Level {Math.floor(totalPoints / 100) + 1}
              </h3>
              <div className="text-2xl font-black text-[#111827] mb-4 uppercase italic">
                {totalPoints >= 500
                  ? "Sustainability Champion"
                  : totalPoints >= 300
                    ? "Eco Warrior"
                    : totalPoints >= 100
                      ? "Green Guardian"
                      : "Seedling"}
              </div>
              <div className="w-full bg-[#f5f5f4] h-3 rounded-full overflow-hidden mb-2">
                <div
                  className="bg-[#166534] h-full"
                  style={{ width: `${totalPoints % 100}%` }}
                ></div>
              </div>
              <p className="text-[10px] font-bold text-[#111827]/40 uppercase">
                {100 - (totalPoints % 100)} XP TO NEXT LEVEL
              </p>
            </div>

            <div className="bg-[#166534] p-6 rounded-3xl text-white shadow-xl">
              <h4 className="font-bold text-sm uppercase text-white/60 mb-4 tracking-widest">
                Lifetime Impact
              </h4>
              <div className="space-y-4">
                <div className="flex justify-between items-center border-b border-white/10 pb-2">
                  <span className="text-sm font-medium text-white/80">
                    Food Value
                  </span>
                  <span className="font-black text-lg">R2,450</span>
                </div>
                <div className="flex justify-between items-center border-b border-white/10 pb-2">
                  <span className="text-sm font-medium text-white/80">
                    Water Saved
                  </span>
                  <span className="font-black text-lg">
                    {waterSaved.toLocaleString()}L
                  </span>
                </div>
                <div className="flex justify-between items-center border-b border-white/10 pb-2">
                  <span className="text-sm font-medium text-white/80">
                    Energy Savings
                  </span>
                  <span className="font-black text-lg">
                    R
                    {typeof energySaved === "number"
                      ? energySaved.toLocaleString()
                      : energySaved}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm font-medium text-white/80">
                    Waste Diverted
                  </span>
                  <span className="font-black text-lg">{wasteReduced}kg</span>
                </div>
              </div>
            </div>
          </div>

          {/* Main Chart */}
          <div className="lg:col-span-2 space-y-8">
            <div className="bg-white p-8 rounded-3xl shadow-lg border border-[#166534]/10">
              <h3 className="font-bold text-xl mb-6">Savings History (ZAR)</h3>
              <div className="h-64">
                <Line data={data} options={options} />
              </div>
            </div>

            {/* Recent Activity */}
            <div className="bg-white p-8 rounded-3xl border border-[#166534]/10">
              <h3 className="font-bold text-xl mb-6">Recent Actions</h3>
              <div className="space-y-4">
                {actions.length > 0 ? (
                  actions.slice(0, 5).map((action, i) => (
                    <div
                      key={action._id || i}
                      className="flex justify-between items-center border-b border-[#f5f5f4] pb-4 animate-in fade-in"
                    >
                      <div>
                        <div className="font-bold capitalize">
                          {action.description}
                        </div>
                        <div className="text-xs text-[#111827]/40">
                          {new Date(action.date).toLocaleDateString()} •{" "}
                          {action.location} • +{action.points} points
                        </div>
                      </div>
                      <div className="font-black text-[#166534]">
                        {action.value} {action.unit}
                      </div>
                    </div>
                  ))
                ) : (
                  <p className="text-[#111827]/40 text-sm italic">
                    No recent actions logged.
                  </p>
                )}
              </div>
            </div>

            {/* Badges */}
            <div>
              <h3 className="font-bold text-xl mb-6">
                Badges Earned ({earnedBadges.length})
              </h3>
              <div className="grid grid-cols-4 sm:grid-cols-6 gap-4">
                {getEarnedBadgeDetails().map((badge) => (
                  <div
                    key={badge._id}
                    className="aspect-square bg-[#166534] rounded-2xl flex flex-col items-center justify-center text-white shadow-md p-2"
                  >
                    <span className="text-2xl mb-1">{badge.icon}</span>
                    <span className="text-xs font-bold text-center leading-tight">
                      {badge.name}
                    </span>
                  </div>
                ))}
                {Array.from(
                  { length: Math.max(0, 6 - earnedBadges.length) },
                  (_, i) => (
                    <div
                      key={`locked-${i}`}
                      className="aspect-square bg-[#f5f5f4] border-2 border-dashed border-[#111827]/10 rounded-2xl flex items-center justify-center text-[#111827]/20"
                    >
                      <Lock className="w-6 h-6" />
                    </div>
                  ),
                )}
              </div>
              <div className="mt-4 text-center">
                <p className="text-sm text-[#111827]/60">
                  Total Points:{" "}
                  <span className="font-bold text-[#166534]">
                    {totalPoints}
                  </span>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Impact;
