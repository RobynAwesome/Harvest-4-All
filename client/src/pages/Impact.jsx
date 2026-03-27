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
  TrendingUp,
  Share2,
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

  const [viewMode, setViewMode] = React.useState('monthly');

  const monthlyData = {
    labels: ["Jan", "Feb", "Mar", "Apr", "May", "Current"],
    datasets: [
      {
        fill: true,
        label: "Sustainability Index",
        data: [200, 450, 800, 1200, 1800, 1800 + totalPoints],
        borderColor: "#115e59",
        backgroundColor: "rgba(17, 94, 89, 0.1)",
        tension: 0.4,
        pointBackgroundColor: "#2ecc71",
        pointBorderColor: "#fff",
        pointRadius: 6,
      },
    ],
  };

  const weeklyData = {
    labels: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
    datasets: [
      {
        fill: true,
        label: "Weekly Points",
        data: [10, 40, 30, 80, 50, 90, totalPoints % 100],
        borderColor: "#2ecc71",
        backgroundColor: "rgba(46, 204, 113, 0.1)",
        tension: 0.4,
        pointBackgroundColor: "#115e59",
        pointBorderColor: "#fff",
        pointRadius: 6,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { display: false },
      tooltip: {
        backgroundColor: "#111827",
        titleFont: { family: 'Montserrat', size: 14, weight: 'bold' },
        bodyFont: { family: 'Inter', size: 12 },
        padding: 12,
        cornerRadius: 8,
      }
    },
    scales: {
      y: { 
        beginAtZero: true,
        grid: { color: 'rgba(17, 94, 89, 0.05)' }
      },
      x: {
        grid: { display: false }
      }
    },
  };

  const handleShare = () => {
    const text = `I've earned ${totalPoints} points and saved ${waterSaved}L of water on Harvest-4-All! 🌿 Supporting sustainability in ${actions[0]?.location || 'Western Cape townships'}. #Harvest4All #MICTSETA2026`;
    const url = `https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}`;
    window.open(url, '_blank');
  };

  return (
    <section className="section-fade py-20 px-4 bg-white/50">
      <div className="max-w-7xl mx-auto">
        <div className="mb-16 text-center md:text-left">
          <div className="inline-block bg-[#115e59]/10 text-[#115e59] px-4 py-1.5 rounded-full text-[10px] font-black tracking-widest uppercase mb-4">
            Personal Performance
          </div>
          <h2 className="text-5xl font-black text-[#111827] mb-4 font-heading leading-none">
            Your <span className="text-gradient">Impact Dashboard</span>
          </h2>
          <p className="text-[#111827]/60 font-medium max-w-2xl">
            Verified data from your community actions, translating individual effort into collective Western Cape sustainability.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10 items-start mb-16">
          {/* Sidebar Stats */}
          <div className="space-y-8">
            <div className="card-premium p-10 text-center relative overflow-hidden group">
              <div className="absolute top-0 right-0 w-32 h-32 bg-[#2ecc71]/5 rounded-full -translate-y-1/2 translate-x-1/2 blur-2xl group-hover:bg-[#2ecc71]/10 transition-colors"></div>
              <div className="w-20 h-20 bg-[#115e59]/10 rounded-[2rem] flex items-center justify-center mx-auto mb-6 transform group-hover:rotate-12 transition-transform">
                <Award className="w-10 h-10 text-[#115e59]" />
              </div>
              <h3 className="text-[10px] font-black text-[#111827]/40 uppercase tracking-[0.3em] mb-2">
                Member Level {Math.floor(totalPoints / 100) + 1}
              </h3>
              <div className="text-3xl font-black text-[#111827] mb-6 font-heading leading-tight uppercase">
                {totalPoints >= 500
                  ? "Sustainability Champion"
                  : totalPoints >= 300
                    ? "Eco Warrior"
                    : totalPoints >= 100
                      ? "Green Guardian"
                      : "Seedling"}
              </div>
              <div className="w-full bg-[#f5f5f4] h-4 rounded-full overflow-hidden mb-3 p-1">
                <div
                  className="bg-[#2ecc71] h-full rounded-full transition-all duration-1000 shadow-lg"
                  style={{ width: `${totalPoints % 100}%` }}
                ></div>
              </div>
              <p className="text-[10px] font-black text-[#111827]/40 uppercase tracking-widest">
                {100 - (totalPoints % 100)} XP TO NEXT MILESTONE
              </p>
            </div>

            <div className="bg-[#115e59] p-10 rounded-[2.5rem] text-white shadow-2xl relative overflow-hidden">
               <div className="absolute -bottom-10 -right-10 opacity-10">
                 <TrendingUp className="w-40 h-40" />
               </div>
              <h4 className="font-black text-xs uppercase text-white/40 mb-8 tracking-[0.3em]">
                Lifetime Contributions
              </h4>
              <div className="space-y-6">
                {[
                  { label: "Food Value", val: "R2,450", color: "bg-white/10" },
                  { label: "Water Saved", val: `${waterSaved.toLocaleString()}L`, color: "bg-white/10" },
                  { label: "Energy Impact", val: `R${typeof energySaved === "number" ? energySaved.toLocaleString() : energySaved}`, color: "bg-white/10" },
                  { label: "Waste Diverted", val: `${wasteReduced}kg`, color: "bg-white/10" },
                ].map((stat, i) => (
                  <div key={stat.label} className={`flex justify-between items-center ${stat.color} p-4 rounded-2xl`}>
                    <span className="text-xs font-black uppercase tracking-widest text-white/70">
                      {stat.label}
                    </span>
                    <span className="font-black text-xl font-heading">{stat.val}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Main Chart Card */}
          <div className="lg:col-span-2 space-y-10">
            <div className="card-premium p-10">
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-10 gap-4">
                <div>
                  <h3 className="font-black text-2xl font-heading mb-1 text-[#111827]">Sustainability Index</h3>
                  <p className="text-xs text-[#111827]/40 font-bold uppercase tracking-widest">Growth metric for 2026</p>
                </div>
                <div className="flex bg-[#f5f5f4] p-1.5 rounded-xl border border-[#111827]/5">
                  {['weekly', 'monthly'].map((mode) => (
                    <button
                      key={mode}
                      onClick={() => setViewMode(mode)}
                      className={`px-5 py-2 text-[10px] font-black uppercase tracking-widest rounded-lg transition-all ${
                        viewMode === mode ? 'bg-[#115e59] text-white shadow-xl' : 'text-[#111827]/40 hover:text-[#111827]'
                      }`}
                    >
                      {mode}
                    </button>
                  ))}
                </div>
              </div>
              <div className="h-80 w-full">
                <Line data={viewMode === 'weekly' ? weeklyData : monthlyData} options={options} />
              </div>
            </div>

            {/* Post-Action CTA */}
            <div className="bg-gradient-to-br from-[#115e59] via-[#0f766e] to-[#2ecc71] p-12 rounded-[3rem] text-white flex flex-col md:flex-row items-center justify-between gap-10 shadow-2xl relative overflow-hidden group">
               <div className="absolute top-0 left-0 w-full h-full bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10"></div>
              <div className="flex-1 relative">
                <h3 className="text-3xl font-black mb-4 font-heading leading-tight">Join the Elite 1%.</h3>
                <p className="text-white/70 font-medium text-lg leading-relaxed">Share your sustainability journey and unlock the 'Community Catalyst' legacy badge.</p>
              </div>
              <button 
                onClick={handleShare}
                className="btn-premium bg-white text-[#115e59] px-10 py-5 hover:bg-white/90 transition-all flex items-center gap-3 animate-pulse group-hover:animate-none scale-110"
              >
                <Share2 className="w-5 h-5" /> Share Impact
              </button>
            </div>
          </div>
        </div>

        {/* Bottom Sections Card Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
          <div className="card-premium p-10">
            <h3 className="font-black text-2xl mb-8 font-heading">Recent Log Actions</h3>
            <div className="space-y-6">
              {actions.length > 0 ? (
                actions.slice(0, 5).map((action, i) => (
                  <div
                    key={action._id || i}
                    className="flex justify-between items-center group/item hover:bg-[#115e59]/5 p-4 rounded-2xl transition-colors border-b border-[#f5f5f4] last:border-0"
                  >
                    <div>
                      <div className="font-black text-[#111827] mb-1 group-hover/item:text-[#115e59] transition-colors">
                        {action.description}
                      </div>
                      <div className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-[#111827]/30">
                        <span>{new Date(action.date).toLocaleDateString()}</span>
                        <span className="w-1 h-1 bg-[#2ecc71] rounded-full"></span>
                        <span>{action.location}</span>
                        <span className="w-1 h-1 bg-[#2ecc71] rounded-full"></span>
                        <span className="text-[#2ecc71]">+{action.points} POINTS</span>
                      </div>
                    </div>
                    <div className="font-black text-xl text-[#115e59] font-heading">
                      {action.value}<span className="text-xs ml-1 text-[#111827]/40 tracking-tighter uppercase">{action.unit}</span>
                    </div>
                  </div>
                ))
              ) : (
                <div className="py-20 text-center bg-[#f5f5f4]/50 rounded-2xl border-2 border-dashed border-[#111827]/5">
                  <Loader2 className="w-10 h-10 text-[#111827]/10 animate-spin mx-auto mb-4" />
                  <p className="text-[#111827]/40 text-sm font-bold uppercase tracking-widest">Awaiting First Action</p>
                </div>
              )}
            </div>
          </div>

          <div className="card-premium p-10">
            <h3 className="font-black text-2xl mb-8 font-heading">Digital Credentials</h3>
            <div className="grid grid-cols-3 sm:grid-cols-4 gap-6">
              {getEarnedBadgeDetails().map((badge) => (
                <div
                  key={badge._id}
                  className="group relative"
                >
                  <div className="aspect-square bg-gradient-to-br from-[#115e59] to-[#0f766e] rounded-3xl flex flex-col items-center justify-center text-white shadow-xl p-4 transition-all hover:scale-110 hover:-rotate-6 hover:shadow-[#2ecc71]/20">
                    <span className="text-4xl mb-2 filter drop-shadow-md">{badge.icon}</span>
                    <span className="text-[10px] font-black tracking-widest text-center uppercase leading-none opacity-80 group-hover:opacity-100">
                      {badge.name}
                    </span>
                  </div>
                </div>
              ))}
              {Array.from(
                { length: Math.max(0, 8 - earnedBadges.length) },
                (_, i) => (
                  <div
                    key={`locked-${i}`}
                    className="aspect-square bg-[#f5f5f4] border border-[#115e59]/10 rounded-3xl flex items-center justify-center text-[#111827]/10 group transition-all hover:bg-[#115e59]/5"
                  >
                    <Lock className="w-8 h-8 group-hover:scale-110 transition-transform" />
                  </div>
                ),
              )}
            </div>
            <div className="mt-12 bg-white/50 p-6 rounded-2xl text-center border border-[#115e59]/5">
               <p className="text-xs font-black uppercase tracking-[0.3em] text-[#111827]/40 mb-2">Total Accumulated XP</p>
               <div className="text-4xl font-black text-[#115e59] font-heading">{totalPoints.toLocaleString()} <span className="text-sm font-black text-[#2ecc71] uppercase tracking-widest">pts</span></div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Impact;
