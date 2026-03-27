import React, { useState } from "react";
import { useAppContext } from "../context/useAppContext";
import { useNavigate } from "react-router-dom";
import {
  ShieldCheck,
  Trash2,
  LogOut,
  RefreshCw,
  ShoppingBag,
  Zap,
  Sprout,
  Lock,
  ArrowLeft,
  RotateCcw,
} from "lucide-react";

const ADMIN_PIN = "harvest2026";

const Admin = () => {
  const navigate = useNavigate();
  const [pinInput, setPinInput] = useState("");
  const [authed, setAuthed] = useState(false);
  const [pinError, setPinError] = useState(false);
  const [activeTab, setActiveTab] = useState("market");
  const [confirmReset, setConfirmReset] = useState(false);

  const {
    marketListings,
    deleteListing,
    actions,
    deleteAction,
    growProjects,
    deleteGrowProject,
    resetToDemo,
    totalPoints,
    trash,
    restoreItem,
    emptyTrash,
  } = useAppContext();

  const handlePinSubmit = (e) => {
    e.preventDefault();
    if (pinInput === ADMIN_PIN) {
      setAuthed(true);
      setPinError(false);
    } else {
      setPinError(true);
      setPinInput("");
    }
  };

  const handleReset = () => {
    if (confirmReset) {
      resetToDemo();
      setConfirmReset(false);
    } else {
      setConfirmReset(true);
      setTimeout(() => setConfirmReset(false), 4000);
    }
  };

  const tabs = [
    { id: "market", label: "Market Listings", icon: ShoppingBag, count: marketListings.length },
    { id: "actions", label: "Action Log", icon: Zap, count: actions.length },
    { id: "grow", label: "Grow Projects", icon: Sprout, count: growProjects.length },
    { id: "trash", label: "Trash", icon: Trash2, count: trash.length },
  ];

  if (!authed) {
    return (
      <div className="min-h-screen bg-[#0a0f0e] flex items-center justify-center px-4">
        <div className="w-full max-w-sm">
          <button
            onClick={() => navigate("/")}
            className="flex items-center gap-2 text-white/30 hover:text-white/70 text-xs font-black uppercase tracking-widest mb-8 transition-colors group"
          >
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
            Back to App
          </button>
          <div className="text-center mb-10">
            <div className="w-16 h-16 bg-[#115e59] rounded-[1.5rem] flex items-center justify-center mx-auto mb-6 shadow-2xl">
              <Lock className="w-8 h-8 text-white" />
            </div>
            <h1 className="text-3xl font-black text-white font-heading tracking-tight mb-2">
              ADMIN PANEL
            </h1>
            <p className="text-white/40 text-sm font-medium">
              Harvest 4 All — Restricted Access
            </p>
          </div>

          <form onSubmit={handlePinSubmit} className="space-y-4">
            <div>
              <input
                type="password"
                value={pinInput}
                onChange={(e) => { setPinInput(e.target.value); setPinError(false); }}
                placeholder="Enter admin PIN"
                autoFocus
                className={`w-full bg-white/5 border ${pinError ? "border-red-500" : "border-white/10"} text-white placeholder-white/20 rounded-2xl px-6 py-4 text-center text-xl font-black tracking-[0.5em] focus:outline-none focus:border-[#2ecc71] transition-colors`}
              />
              {pinError && (
                <p className="text-red-400 text-xs text-center mt-2 font-bold uppercase tracking-widest">
                  Incorrect PIN
                </p>
              )}
            </div>
            <button
              type="submit"
              className="w-full bg-[#115e59] hover:bg-[#2ecc71] text-white py-4 rounded-2xl font-black text-sm uppercase tracking-widest transition-all shadow-xl active:scale-95"
            >
              Unlock Panel
            </button>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0a0f0e] text-white">
      {/* Header */}
      <div className="bg-[#115e59] px-6 py-5 flex items-center justify-between shadow-2xl">
        <div className="flex items-center gap-4">
          <div className="w-10 h-10 bg-white/10 rounded-xl flex items-center justify-center">
            <ShieldCheck className="w-5 h-5 text-[#2ecc71]" />
          </div>
          <div>
            <h1 className="text-lg font-black tracking-tight font-heading">HARVEST 4 ALL</h1>
            <p className="text-white/50 text-[10px] font-black uppercase tracking-widest">
              Admin Control Panel
            </p>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <div className="hidden sm:block bg-white/10 px-4 py-2 rounded-xl text-xs font-black uppercase tracking-widest">
            {totalPoints.toLocaleString()} pts on platform
          </div>
          <button
            onClick={handleReset}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-black uppercase tracking-widest transition-all ${
              confirmReset
                ? "bg-amber-500 text-white animate-pulse"
                : "bg-white/10 hover:bg-amber-500/20 text-white/70 hover:text-amber-400"
            }`}
          >
            <RefreshCw className="w-3.5 h-3.5" />
            {confirmReset ? "Confirm Reset?" : "Reset Demo"}
          </button>
          <button
            onClick={() => setAuthed(false)}
            className="flex items-center gap-2 px-4 py-2 bg-white/5 hover:bg-red-500/20 hover:text-red-400 rounded-xl text-xs font-black uppercase tracking-widest transition-all text-white/50"
          >
            <LogOut className="w-3.5 h-3.5" /> Logout
          </button>
        </div>
      </div>

      {/* Tabs */}
      <div className="border-b border-white/5 px-6">
        <div className="flex gap-1 max-w-5xl mx-auto">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-2 px-6 py-4 text-xs font-black uppercase tracking-widest border-b-2 transition-all ${
                  activeTab === tab.id
                    ? "border-[#2ecc71] text-[#2ecc71]"
                    : "border-transparent text-white/30 hover:text-white/60"
                }`}
              >
                <Icon className="w-4 h-4" />
                {tab.label}
                <span className={`ml-1 px-2 py-0.5 rounded-full text-[10px] ${
                  activeTab === tab.id ? "bg-[#2ecc71]/20 text-[#2ecc71]" : "bg-white/5 text-white/30"
                }`}>
                  {tab.count}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Content */}
      <div className="max-w-5xl mx-auto px-6 py-8">

        {/* Market Listings Tab */}
        {activeTab === "market" && (
          <div>
            <h2 className="text-xs font-black uppercase tracking-[0.3em] text-white/30 mb-6">
              {marketListings.length} listing{marketListings.length !== 1 ? "s" : ""} in marketplace
            </h2>
            {marketListings.length === 0 ? (
              <EmptyState message="No market listings" />
            ) : (
              <div className="space-y-3">
                {marketListings.map((item) => (
                  <div
                    key={item._id}
                    className="bg-white/5 border border-white/5 rounded-2xl px-6 py-4 flex items-center justify-between gap-4 hover:bg-white/8 transition-colors group"
                  >
                    <div className="flex items-center gap-4 flex-1 min-w-0">
                      <span className={`px-3 py-1 rounded-lg text-[10px] font-black uppercase tracking-widest flex-shrink-0 ${
                        item.type === "swap" ? "bg-blue-500/20 text-blue-400" : "bg-[#2ecc71]/20 text-[#2ecc71]"
                      }`}>
                        {item.type === "swap" ? "SWAP" : "SALE"}
                      </span>
                      <div className="min-w-0">
                        <div className="font-black text-white truncate">{item.title}</div>
                        <div className="text-white/30 text-xs font-medium mt-0.5 uppercase tracking-widest">
                          {item.category} · {item.location}
                        </div>
                      </div>
                    </div>
                    <div className="font-black text-[#2ecc71] text-lg flex-shrink-0">
                      {item.type === "swap" ? "TRADE" : `R${item.price}`}
                    </div>
                    <button
                      onClick={() => deleteListing(item._id)}
                      className="p-2.5 bg-white/5 hover:bg-red-500 rounded-xl text-white/30 hover:text-white transition-all active:scale-95 flex-shrink-0"
                      aria-label={`Delete ${item.title}`}
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* Actions Tab */}
        {activeTab === "actions" && (
          <div>
            <h2 className="text-xs font-black uppercase tracking-[0.3em] text-white/30 mb-6">
              {actions.length} action{actions.length !== 1 ? "s" : ""} logged
            </h2>
            {actions.length === 0 ? (
              <EmptyState message="No actions logged" />
            ) : (
              <div className="space-y-3">
                {actions.map((action, i) => (
                  <div
                    key={action._id || i}
                    className="bg-white/5 border border-white/5 rounded-2xl px-6 py-4 flex items-center justify-between gap-4 hover:bg-white/8 transition-colors group"
                  >
                    <div className="flex items-center gap-4 flex-1 min-w-0">
                      <span className="px-3 py-1 bg-[#115e59]/40 text-[#2ecc71] rounded-lg text-[10px] font-black uppercase tracking-widest flex-shrink-0">
                        {action.type}
                      </span>
                      <div className="min-w-0">
                        <div className="font-black text-white truncate">{action.description}</div>
                        <div className="text-white/30 text-xs font-medium mt-0.5 uppercase tracking-widest">
                          {action.location} · {new Date(action.date).toLocaleDateString()}
                        </div>
                      </div>
                    </div>
                    <div className="text-right flex-shrink-0">
                      <div className="font-black text-white">
                        {action.value}<span className="text-white/30 text-xs ml-1">{action.unit}</span>
                      </div>
                      <div className="text-[#2ecc71] text-xs font-black">+{action.points} pts</div>
                    </div>
                    <button
                      onClick={() => deleteAction(action._id || i)}
                      className="p-2.5 bg-white/5 hover:bg-red-500 rounded-xl text-white/30 hover:text-white transition-all active:scale-95 flex-shrink-0"
                      aria-label={`Delete action: ${action.description}`}
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* Grow Projects Tab */}
        {activeTab === "grow" && (
          <div>
            <h2 className="text-xs font-black uppercase tracking-[0.3em] text-white/30 mb-6">
              {growProjects.length} grow project{growProjects.length !== 1 ? "s" : ""}
            </h2>
            {growProjects.length === 0 ? (
              <EmptyState message="No grow projects yet" />
            ) : (
              <div className="space-y-3">
                {growProjects.map((project, i) => (
                  <div
                    key={project._id || i}
                    className="bg-white/5 border border-white/5 rounded-2xl px-6 py-4 flex items-center justify-between gap-4 hover:bg-white/8 transition-colors group"
                  >
                    <div className="flex items-center gap-4 flex-1 min-w-0">
                      <span className="px-3 py-1 bg-[#115e59]/40 text-[#2ecc71] rounded-lg text-[10px] font-black uppercase tracking-widest flex-shrink-0">
                        {project.status || "active"}
                      </span>
                      <div className="min-w-0">
                        <div className="font-black text-white truncate">{project.crop}</div>
                        <div className="text-white/30 text-xs font-medium mt-0.5 uppercase tracking-widest">
                          {project.season} · {project.location}
                        </div>
                      </div>
                    </div>
                    <div className="text-white/40 text-xs font-black flex-shrink-0 uppercase tracking-widest">
                      {project.startDate ? new Date(project.startDate).toLocaleDateString() : "—"}
                    </div>
                    <button
                      onClick={() => deleteGrowProject(project._id || i)}
                      className="p-2.5 bg-white/5 hover:bg-red-500 rounded-xl text-white/30 hover:text-white transition-all active:scale-95 flex-shrink-0"
                      aria-label={`Delete ${project.crop} project`}
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* Trash Tab */}
        {activeTab === "trash" && (
          <div>
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xs font-black uppercase tracking-[0.3em] text-white/30">
                {trash.length} deleted item{trash.length !== 1 ? "s" : ""} — restore anytime
              </h2>
              {trash.length > 0 && (
                <button
                  onClick={emptyTrash}
                  className="flex items-center gap-2 px-4 py-2 bg-red-500/10 hover:bg-red-500/20 text-red-400 rounded-xl text-xs font-black uppercase tracking-widest transition-all"
                >
                  <Trash2 className="w-3.5 h-3.5" /> Empty Trash
                </button>
              )}
            </div>
            {trash.length === 0 ? (
              <EmptyState message="Trash is empty" />
            ) : (
              <div className="space-y-3">
                {trash.map((item) => {
                  const typeLabel = item._deletedType === "listing" ? "Listing"
                    : item._deletedType === "action" ? "Action"
                    : "Grow";
                  const title = item.title || item.description || item.crop || "Untitled";
                  const sub = item._deletedAt
                    ? `Deleted ${new Date(item._deletedAt).toLocaleString()}`
                    : "";
                  return (
                    <div
                      key={item._id}
                      className="bg-white/5 border border-white/5 rounded-2xl px-6 py-4 flex items-center justify-between gap-4 group"
                    >
                      <div className="flex items-center gap-4 flex-1 min-w-0">
                        <span className="px-3 py-1 bg-red-500/10 text-red-400 rounded-lg text-[10px] font-black uppercase tracking-widest flex-shrink-0">
                          {typeLabel}
                        </span>
                        <div className="min-w-0">
                          <div className="font-black text-white/70 truncate">{title}</div>
                          <div className="text-white/25 text-xs font-medium mt-0.5 uppercase tracking-widest">
                            {sub}
                          </div>
                        </div>
                      </div>
                      <button
                        onClick={() => restoreItem(item._id)}
                        className="flex items-center gap-2 px-4 py-2 bg-[#2ecc71]/10 hover:bg-[#2ecc71]/20 text-[#2ecc71] rounded-xl text-xs font-black uppercase tracking-widest transition-all active:scale-95 flex-shrink-0"
                        aria-label={`Restore ${title}`}
                      >
                        <RotateCcw className="w-3.5 h-3.5" /> Restore
                      </button>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        )}
      </div>

      {/* Footer */}
      <div className="text-center pb-8 text-white/15 text-[10px] font-black uppercase tracking-widest">
        MICT SETA National Skills Challenge 2026 · Harvest 4 All Admin Panel
      </div>
    </div>
  );
};

const EmptyState = ({ message }) => (
  <div className="py-20 text-center bg-white/3 rounded-2xl border border-dashed border-white/5">
    <p className="text-white/20 font-black uppercase tracking-widest text-sm">{message}</p>
  </div>
);

export default Admin;
