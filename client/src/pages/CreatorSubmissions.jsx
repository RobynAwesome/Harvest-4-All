import React, { useState, useEffect } from "react";
import axios from "axios";
import { 
  Zap, 
  Plus, 
  Trash2, 
  Loader2, 
  Globe, 
  TrendingUp, 
  ShieldCheck, 
  ArrowRight,
  Sparkles
} from "lucide-react";
import { useAuth } from "../context/AuthContext";

const CreatorSubmissions = () => {
  const { user } = useAuth();
  const [submissions, setSubmissions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [isFormOpen, setIsFormOpen] = useState(false);

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    impact: "",
    category: "Energy",
    creatorId: user?.id || "admin-kholofelo",
    creatorName: user?.username || "Kholofelo"
  });

  useEffect(() => {
    fetchSubmissions();
  }, []);

  const fetchSubmissions = async () => {
    try {
      const res = await axios.get("/api/submissions");
      // Filter for the current user's ideas
      setSubmissions(res.data.filter(s => s.creatorId === user?.id || s.creatorId === "admin-kholofelo"));
    } catch (err) {
      console.error("Failed to fetch submissions:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      await axios.post("/api/submissions", formData);
      setFormData({ ...formData, title: "", description: "", impact: "" });
      setIsFormOpen(false);
      fetchSubmissions();
    } catch (err) {
      console.error("Failed to submit:", err);
    } finally {
      setSubmitting(false);
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`/api/submissions/${id}`);
      fetchSubmissions();
    } catch (err) {
      console.error("Failed to delete:", err);
    }
  };

  return (
    <div className="section-fade py-16 px-4 bg-[#0a0f0e] min-h-screen text-white">
      <div className="max-w-6xl mx-auto">
        
        {/* Header Section */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-8 mb-16">
           <div className="max-w-2xl">
              <div className="inline-flex items-center gap-2 bg-[#2ecc71]/10 text-[#2ecc71] px-5 py-2 rounded-full text-[10px] font-black tracking-widest uppercase mb-6 border border-[#2ecc71]/20 shadow-lg shadow-[#2ecc71]/5">
                 <Globe className="w-3.5 h-3.5" /> Sustainable Innovation Workspace
              </div>
              <h1 className="text-5xl font-black font-heading leading-tight mb-4">
                 Sustainability <br /><span className="text-[#2ecc71]">Submissions Hub</span>
              </h1>
              <p className="text-white/40 font-medium leading-relaxed">
                 Submit your high-impact sustainable energy or harvest visions. 
                 Approved projects are pitched directly to global sponsors at **UWC, CPUT, and MICT SETA**.
              </p>
           </div>
           <button 
             onClick={() => setIsFormOpen(!isFormOpen)}
             className="flex items-center gap-3 bg-[#2ecc71] hover:bg-[#25a057] text-white px-8 py-5 rounded-3xl font-black text-sm uppercase tracking-widest transition-all shadow-[0_20px_40px_-10px_rgba(46,204,113,0.3)] active:scale-95"
           >
              {isFormOpen ? "Cancel Submission" : <> <Plus className="w-5 h-5" /> Submit New Idea </>}
           </button>
        </div>

        {/* Fee Reminder HUD */}
        <div className="mb-16 p-8 bg-white/5 border border-white/10 rounded-[3rem] backdrop-blur-md flex flex-col md:flex-row items-center justify-between gap-6 overflow-hidden relative group">
           <div className="absolute inset-0 bg-gradient-to-r from-white/5 to-transparent skew-x-12 group-hover:translate-x-full transition-transform duration-1000" />
           <div className="flex items-center gap-6 relative z-10">
              <div className="w-12 h-12 bg-[#2ecc71]/20 rounded-2xl flex items-center justify-center text-[#2ecc71]">
                 <TrendingUp className="w-6 h-6" />
              </div>
              <div>
                 <div className="text-[10px] font-black text-white/40 uppercase tracking-[0.2em] mb-1">Active Subscription Plan</div>
                 <div className="text-lg font-black tracking-tight">R299.00 / Month <span className="text-xs text-white/30 font-medium"> (Creator Tier)</span></div>
              </div>
           </div>
           <div className="flex items-center gap-4 relative z-10">
              <div className="text-right hidden sm:block">
                 <div className="text-[10px] font-black text-[#2ecc71] uppercase tracking-widest mb-1">Status: Paid</div>
                 <div className="text-[9px] font-medium text-white/20 uppercase tracking-widest">Next Billing: April 2026</div>
              </div>
              <ShieldCheck className="w-8 h-8 text-[#2ecc71]/40" />
           </div>
        </div>

        {/* Submission Form */}
        {isFormOpen && (
           <div className="mb-16 bg-white/5 border border-white/10 p-10 rounded-[3rem] animate-in slide-in-from-top-10 duration-500 shadow-2xl relative overflow-hidden">
              <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[#2ecc71]/5 rounded-full blur-[100px] -mr-64 -mt-64" />
              <form onSubmit={handleSubmit} className="relative z-10">
                 <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
                    <div className="space-y-6">
                       <div>
                          <label className="block text-[10px] font-black text-white/30 uppercase tracking-[0.2em] mb-3 ml-2">Idea Title</label>
                          <input 
                            required
                            value={formData.title}
                            onChange={(e) => setFormData({...formData, title: e.target.value})}
                            placeholder="e.g., Solar-Powered Hydroponics"
                            className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 text-white placeholder-white/20 focus:outline-none focus:border-[#2ecc71] transition-colors"
                          />
                       </div>
                       <div>
                          <label className="block text-[10px] font-black text-white/30 uppercase tracking-[0.2em] mb-3 ml-2">Estimated Impact</label>
                          <input 
                            required
                            value={formData.impact}
                            onChange={(e) => setFormData({...formData, impact: e.target.value})}
                            placeholder="e.g., 40% reduction in waste"
                            className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 text-white placeholder-white/20 focus:outline-none focus:border-[#2ecc71] transition-colors"
                          />
                       </div>
                    </div>
                    <div>
                       <label className="block text-[10px] font-black text-white/30 uppercase tracking-[0.2em] mb-3 ml-2">Detailed Vision</label>
                       <textarea 
                         required
                         value={formData.description}
                         onChange={(e) => setFormData({...formData, description: e.target.value})}
                         placeholder="Describe how your idea transforms the township economy..."
                         rows={5}
                         className="w-full bg-white/5 border border-white/10 rounded-3xl px-6 py-4 text-white placeholder-white/20 focus:outline-none focus:border-[#2ecc71] transition-colors resize-none"
                       />
                    </div>
                 </div>
                 <button 
                   type="submit"
                   disabled={submitting}
                   className="w-full bg-[#2ecc71] text-white py-5 rounded-2xl font-black text-sm uppercase tracking-widest hover:bg-[#25a057] transition-all flex items-center justify-center gap-3 shadow-2xl active:scale-95"
                 >
                    {submitting ? <Loader2 className="w-5 h-5 animate-spin" /> : <> <ArrowRight className="w-5 h-5" /> Publish to Creators Choice Gallery </>}
                 </button>
              </form>
           </div>
        )}

        {/* Previous Submissions List */}
        <div className="space-y-6">
           <h3 className="text-xs font-black text-white/20 uppercase tracking-[0.3em] mb-8 ml-2">Previous Visionary Submissions</h3>
           {loading ? (
             <div className="flex items-center justify-center py-20">
                <Loader2 className="w-10 h-10 animate-spin text-[#2ecc71]" />
             </div>
           ) : submissions.length === 0 ? (
             <div className="py-24 text-center bg-white/3 rounded-[3rem] border-2 border-dashed border-white/5">
                <Zap className="w-12 h-12 text-white/5 mx-auto mb-4" />
                <p className="text-white/20 font-black uppercase tracking-widest text-sm">No submissions found in your vault.</p>
             </div>
           ) : (
             submissions.map((s) => (
               <div key={s.id} className="bg-white/3 border border-white/10 rounded-[2.5rem] p-10 flex flex-col md:flex-row items-center justify-between gap-10 hover:bg-white/5 transition-all group">
                  <div className="flex-1 min-w-0">
                     <div className="flex items-center gap-4 mb-4">
                        <div className="bg-[#2ecc71]/10 p-3 rounded-xl">
                           <Sparkles className="w-6 h-6 text-[#2ecc71]" />
                        </div>
                        <h4 className="text-2xl font-black text-white group-hover:text-[#2ecc71] transition-colors truncate">{s.title}</h4>
                     </div>
                     <p className="text-white/40 text-sm font-medium leading-relaxed line-clamp-2 max-w-3xl mb-6">{s.description}</p>
                     
                     <div className="flex flex-wrap gap-4">
                        <div className="px-4 py-1.5 bg-white/5 text-white/40 rounded-full text-[9px] font-black uppercase tracking-widest border border-white/5 uppercase">
                           Impact: {s.impact}
                        </div>
                        <div className="px-4 py-1.5 bg-[#2ecc71]/10 text-[#2ecc71] rounded-full text-[9px] font-black uppercase tracking-widest border border-[#2ecc71]/10 uppercase">
                           {s.status}
                        </div>
                     </div>
                  </div>
                  <button 
                    onClick={() => handleDelete(s.id)}
                    className="p-4 bg-red-500/10 text-red-400 rounded-2xl hover:bg-red-500 hover:text-white transition-all shadow-sm active:scale-95"
                    aria-label="Remove submission"
                  >
                     <Trash2 className="w-5 h-5" />
                  </button>
               </div>
             ))
           )}
        </div>
      </div>
    </div>
  );
};

export default CreatorSubmissions;
