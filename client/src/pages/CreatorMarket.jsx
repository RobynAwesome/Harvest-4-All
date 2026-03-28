import React, { useState, useEffect } from "react";
import { useAppContext } from "../context/useAppContext";
import { useAuth } from "../context/AuthContext";
import { 
  CreditCard, 
  Plus, 
  Trash2, 
  AlertTriangle, 
  CheckCircle2, 
  Loader2, 
  ShieldCheck, 
  ShoppingBag,
  Info 
} from "lucide-react";
import PostListingModal from "../components/PostListingModal";

const CreatorMarket = () => {
  const { marketListings, addListing, deleteListing } = useAppContext();
  const { user } = useAuth();
  
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSecurityModalOpen, setIsSecurityModalOpen] = useState(false);
  const [cardLinked, setCardLinked] = useState(() => localStorage.getItem("harvest_card_linked") === "true");
  const [securityLoading, setSecurityLoading] = useState(false);
  const [aiAnalyzing, setAiAnalyzing] = useState(false);
  const [aiAlert, setAiAlert] = useState(null);

  // Filter listings by current user (for demo purposes, we show all if not filtered, 
  // but let's assume 'Kholofelo' owns the sample ones)
  const myListings = marketListings.filter(l => l.author === user?.username || l.author === "Kholofelo");

  const handleLinkCard = () => {
    setSecurityLoading(true);
    // Simulate high-fidelity security validation
    setTimeout(() => {
      setCardLinked(true);
      localStorage.setItem("harvest_card_linked", "true");
      setSecurityLoading(false);
      setIsSecurityModalOpen(false);
    }, 2500);
  };

  const handleAddListing = async (formData) => {
    setAiAnalyzing(true);
    setAiAlert(null);

    // AI-Powered Relevance Check (Mocked validation logic)
    const keywords = ["crop", "seed", "plant", "harvest", "vegetable", "fruit", "grain", "soil", "compost", "water", "spinach", "kale", "solar"];
    const content = (formData.title + " " + formData.description).toLowerCase();
    const isRelevant = keywords.some(k => content.includes(k));

    setTimeout(async () => {
      setAiAnalyzing(false);
      if (!isRelevant) {
        setAiAlert("⚠️ This listing doesn't match our sustainable harvest theme. Please adjust and try again.");
        return;
      }

      await addListing({
        ...formData,
        author: user?.username || "Kholofelo",
        price: parseInt(formData.price) || 0
      });
      setIsModalOpen(false);
    }, 1500);
  };

  return (
    <div className="section-fade py-16 px-4 bg-[#f5f5f4] min-h-screen">
      <div className="max-w-6xl mx-auto">
        
        {/* Header Section */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 mb-12">
            <div>
               <div className="inline-block bg-[#115e59]/10 text-[#115e59] px-4 py-1.5 rounded-full text-[10px] font-black tracking-widest uppercase mb-4">
                  Creator Commerce Dashboard
               </div>
               <h2 className="text-4xl font-black text-[#111827] font-heading leading-tight">
                  Manage My <span className="text-gradient">Market Inventory</span>
               </h2>
               <p className="text-[#111827]/50 text-sm font-medium mt-2">
                  Market Fee: **R49.00** per verified listing.
               </p>
            </div>
            {!cardLinked ? (
              <button 
                onClick={() => setIsSecurityModalOpen(true)}
                className="flex items-center gap-3 bg-red-500 text-white px-8 py-4 rounded-2xl font-black text-xs uppercase tracking-widest shadow-xl hover:bg-red-600 transition-all transform active:scale-95"
              >
                 <CreditCard className="w-5 h-5" /> Link Secure Payment Card
              </button>
            ) : (
              <button 
                onClick={() => setIsModalOpen(true)}
                className="flex items-center gap-3 btn-premium btn-emerald px-8 py-4 shadow-2xl"
              >
                 <Plus className="w-5 h-5" /> Add New Crop
              </button>
            )}
        </div>

        {/* Security Warning if Card Not Linked */}
        {!cardLinked && (
           <div className="mb-12 p-8 bg-white border border-red-100 rounded-[2.5rem] flex items-center gap-6 shadow-sm border-l-8 border-l-red-500">
              <div className="p-4 bg-red-50 rounded-2xl">
                 <AlertTriangle className="w-8 h-8 text-red-500" />
              </div>
              <div>
                 <h4 className="font-black text-lg text-red-600 uppercase tracking-tight">Payment Verification Required</h4>
                 <p className="text-[#111827]/50 text-sm font-medium">To maintain a professional marketplace, creators must link a valid card for listing fees. No charge will be made until a crop is verified.</p>
              </div>
           </div>
        )}

        {/* Inventory List */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
           {myListings.length === 0 ? (
             <div className="col-span-full py-24 text-center bg-white rounded-[3rem] border-2 border-dashed border-[#111827]/5">
                <ShoppingBag className="w-12 h-12 text-[#111827]/10 mx-auto mb-4" />
                <p className="text-[#111827]/30 font-black uppercase tracking-widest text-sm">You haven't posted any crops yet.</p>
             </div>
           ) : (
             myListings.map((item) => (
               <div key={item._id} className="bg-white rounded-[2.5rem] overflow-hidden shadow-2xl border border-[#111827]/5 flex flex-col h-full group">
                  <div className="h-44 overflow-hidden relative">
                    <img src={item.imageUrl || "/community resilience/growth.png"} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" alt={item.title} />
                    <div className="absolute top-4 right-4">
                       <span className="bg-[#115e59] text-white text-[9px] font-black px-3 py-1.5 rounded-full uppercase tracking-widest shadow-xl">Verified</span>
                    </div>
                  </div>
                  <div className="p-8 flex-1 flex flex-col">
                     <div className="flex justify-between items-start mb-4">
                        <h4 className="font-black text-xl text-[#111827]">{item.title}</h4>
                        <div className="text-xl font-black text-[#115e59]">R{item.price}</div>
                     </div>
                     <p className="text-sm text-[#111827]/50 mb-8 line-clamp-2">{item.description}</p>
                     
                     <div className="mt-auto flex items-center justify-between border-t border-[#f5f5f4] pt-6">
                        <div className="text-[10px] font-black text-[#111827]/30 uppercase tracking-[0.2em]">{item.category}</div>
                        <button 
                          onClick={() => deleteListing(item._id)}
                          className="p-3 bg-red-50 text-red-500 rounded-xl hover:bg-red-500 hover:text-white transition-all shadow-sm active:scale-95"
                        >
                           <Trash2 className="w-4 h-4" />
                        </button>
                     </div>
                  </div>
               </div>
             ))
           )}
        </div>

        {/* Security / Card Modal */}
        {isSecurityModalOpen && (
           <div className="fixed inset-0 z-[110] flex items-center justify-center p-4 bg-[#0a0f0e]/90 backdrop-blur-xl animate-in fade-in duration-300">
              <div className="bg-white w-full max-w-md rounded-[3rem] overflow-hidden shadow-[0_0_100px_rgba(34,197,94,0.2)]">
                 <div className="p-10 text-center">
                    <div className="w-20 h-20 bg-[#111827] rounded-3xl flex items-center justify-center mx-auto mb-8 shadow-2xl relative">
                       <CreditCard className="w-10 h-10 text-[#2ecc71]" />
                       <ShieldCheck className="w-6 h-6 text-white absolute -bottom-2 -right-2 bg-[#2ecc71] rounded-full border-2 border-white" />
                    </div>
                    <h3 className="text-3xl font-black text-[#111827] mb-4 font-heading">Secure Link</h3>
                    <p className="text-sm text-[#111827]/50 font-medium mb-10 leading-relaxed px-6">
                       Protect your community account with a verified payment method for MICT SETA National Skills Challenge credits.
                    </p>

                    <div className="space-y-4 mb-10">
                       <input readOnly value="**** **** **** 2026" className="w-full bg-[#f5f5f4] border border-[#111827]/5 rounded-2xl px-6 py-4 text-center font-black tracking-widest text-[#111827]/40" />
                       <div className="grid grid-cols-2 gap-4">
                          <input readOnly value="03 / 28" className="w-full bg-[#f5f5f4] border border-[#111827]/5 rounded-2xl px-6 py-4 text-center font-black tracking-widest text-[#111827]/40" />
                          <input readOnly value="***" className="w-full bg-[#f5f5f4] border border-[#111827]/5 rounded-2xl px-6 py-4 text-center font-black tracking-widest text-[#111827]/40" />
                       </div>
                    </div>

                    <div className="flex flex-col gap-3">
                       <button 
                         onClick={handleLinkCard}
                         disabled={securityLoading}
                         className="w-full bg-[#111827] text-white py-5 rounded-2xl font-black text-sm uppercase tracking-widest hover:bg-[#115e59] transition-all flex items-center justify-center gap-3 shadow-2xl active:scale-95"
                       >
                          {securityLoading ? <Loader2 className="w-5 h-5 animate-spin" /> : "Verify and Link Card"}
                       </button>
                       <button 
                         onClick={() => setIsSecurityModalOpen(false)}
                         className="w-full py-4 rounded-2xl font-black text-[10px] uppercase tracking-widest text-[#111827]/30 hover:text-[#111827]/60"
                       >
                          Cancel Verification
                       </button>
                    </div>
                 </div>
                 <div className="bg-[#f5f5f4] px-10 py-6 text-[9px] font-black text-center text-[#111827]/30 uppercase tracking-[0.2em] border-t border-[#111827]/5">
                    End-to-End P2P Encryption Active
                 </div>
              </div>
           </div>
        )}

        {/* Listing Modal */}
        <PostListingModal 
           isOpen={isModalOpen}
           onClose={() => setIsModalOpen(false)}
           onSubmit={handleAddListing}
        />

        {/* AI Awareness HUD */}
        {(aiAnalyzing || aiAlert) && (
           <div className="fixed bottom-10 left-10 z-[120] max-w-sm animate-in slide-in-from-left-10 duration-500">
              <div className={`p-6 rounded-[2rem] shadow-2xl border backdrop-blur-md flex items-start gap-4 ${
                aiAlert ? "bg-red-500 text-white border-red-400" : "bg-[#115e59] text-white border-[#115e59]/20"
              }`}>
                 <div className="bg-white/20 p-3 rounded-xl flex-shrink-0">
                    {aiAnalyzing ? <Loader2 className="w-5 h-5 animate-spin" /> : <Info className="w-5 h-5" />}
                 </div>
                 <div>
                    <h5 className="font-black text-xs uppercase tracking-widest mb-1">{aiAlert ? "Relevance Flag" : "Analyzing Harvest..."}</h5>
                    <p className="text-[11px] font-medium leading-relaxed opacity-90">
                       {aiAlert || "Our AI is scanning your listing for sustainable relevance to the MICT SETA 2026 challenge protocols."}
                    </p>
                    {aiAlert && (
                       <button 
                         onClick={() => setAiAlert(null)}
                         className="mt-3 text-[10px] bg-white text-red-500 px-3 py-1 rounded-lg font-black uppercase tracking-widest shadow-md"
                       >
                          Try Again
                       </button>
                    )}
                 </div>
              </div>
           </div>
        )}
      </div>
    </div>
  );
};

export default CreatorMarket;
