import React, { useState } from "react";
import { useAppContext } from "../context/useAppContext";
import { Plus, MapPin, Search, ShoppingBag, ArrowUpRight } from "lucide-react";
import PostListingModal from "../components/PostListingModal";

const Market = () => {
  const { marketListings, addListing, logAction } = useAppContext();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [filter, setFilter] = useState("All");

  const handleMarketAction = (item) => {
    logAction({
      type: "market",
      description: `Participated in ${item.type} for ${item.title}`,
      value: item.price || 5,
      unit: item.type === "swap" ? "swap" : "ZAR",
      location: item.location,
      notes: `Connected with neighbor in ${item.location}`,
    });
  };

  const filteredListings =
    filter === "All"
      ? marketListings
      : marketListings.filter(
          (item) => item.category?.toLowerCase() === filter.toLowerCase(),
        );

  return (
    <section className="section-fade py-20 px-4 bg-white/50 min-h-screen">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-8 mb-16">
          <div className="max-w-2xl">
            <div className="inline-block bg-[#115e59]/10 text-[#115e59] px-4 py-1.5 rounded-full text-[10px] font-black tracking-widest uppercase mb-4">
              Community Commerce
            </div>
            <h2 className="text-5xl font-black text-[#111827] mb-4 font-heading leading-none">
              Sustainable <span className="text-gradient">Local Market</span>
            </h2>
            <p className="text-[#111827]/60 font-medium">
              A peer-to-peer exchange for home-grown produce, seedlings, and upcycled tools—bypassing traditional retail margins to build local economic resilience.
            </p>
          </div>
          <button
            onClick={() => setIsModalOpen(true)}
            className="btn-premium btn-emerald flex items-center gap-3 shadow-2xl scale-110 md:scale-100"
          >
            <Plus className="w-6 h-6" /> Post New Listing
          </button>
        </div>

        {/* Modal */}
        <PostListingModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          onSubmit={addListing}
        />

        {/* Filters */}
        <div className="flex flex-wrap gap-3 mb-12 items-center">
          <span className="text-[10px] font-black text-[#111827]/30 uppercase tracking-[0.2em] mr-2">Filter by Category:</span>
          {["All", "Vegetables", "Seedlings", "Compost", "Upcycled Tool"].map(
            (f, i) => (
              <button
                key={i}
                onClick={() => setFilter(f)}
                className={`px-6 py-2 rounded-xl text-xs font-black uppercase tracking-widest transition-all ${
                  filter === f
                    ? "bg-[#115e59] text-white shadow-lg shadow-[#115e59]/20"
                    : "bg-white border border-[#115e59]/10 hover:bg-[#115e59]/5 text-[#115e59]/60"
                }`}
              >
                {f}
              </button>
            ),
          )}
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
           {/* Sponsor an Urban Farm Card (Pinned to front or back) */}
           <div className="bg-gradient-to-br from-[#115e59] via-[#0f766e] to-[#2ecc71] rounded-[2.5rem] p-10 flex flex-col justify-between text-white shadow-2xl relative overflow-hidden group border border-white/10 h-full min-h-[400px]">
            <div className="absolute top-0 right-0 w-48 h-48 bg-white/10 rounded-full -mr-20 -mt-20 blur-3xl group-hover:bg-white/20 transition-all duration-700"></div>
            <div className="relative z-10">
              <div className="bg-white/20 backdrop-blur text-white text-[10px] font-black px-3 py-1.5 rounded-full w-fit mb-6 uppercase tracking-widest border border-white/10">
                Economic Resilience
              </div>
              <h3 className="text-3xl font-black mb-4 font-heading leading-tight">
                Sponsor a <br />Community Hub
              </h3>
              <p className="text-white/70 text-sm font-medium leading-relaxed mb-8">
                Provide essential toolkits, irrigation seed-sets, and soil-mixes to Western Cape urban farming cooperatives.
              </p>
            </div>
            <button className="bg-white text-[#115e59] w-full py-4 rounded-2xl font-black text-xs uppercase tracking-[0.2em] hover:bg-[#2ecc71] hover:text-white transition-all transform active:scale-95 flex items-center justify-center gap-2 shadow-xl">
              Learn More <ArrowUpRight className="w-4 h-4" />
            </button>
          </div>

          {filteredListings.length > 0 &&
            filteredListings.map((item) => (
              <div
                key={item._id}
                className="card-premium group overflow-hidden flex flex-col h-full animate-in fade-in slide-in-from-bottom-6 duration-700"
              >
                <div className="h-56 overflow-hidden relative">
                  <img
                    src={
                      item.imageUrl ||
                      `https://images.unsplash.com/photo-1596464716127-f2a82984de30?auto=format&fit=crop&q=80&w=400&text=${item.title}`
                    }
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                    alt={item.title}
                    loading="lazy"
                  />
                  <div className="absolute top-4 left-4">
                     <span className={`px-3 py-1.5 rounded-xl text-[10px] font-black uppercase tracking-widest shadow-xl backdrop-blur-md ${
                        item.type === "swap" ? "bg-blue-600/90 text-white" : "bg-[#2ecc71]/90 text-white"
                      }`}>
                         {item.type === "swap" ? "SWAP" : "SALE"}
                     </span>
                  </div>
                </div>
                <div className="p-8 flex-1 flex flex-col">
                  <div className="flex justify-between items-start mb-4">
                    <h4 className="font-black text-xl font-heading text-[#111827] group-hover:text-[#115e59] transition-colors">{item.title}</h4>
                  </div>
                  <div className="flex items-center gap-2 text-[#111827]/40 text-[10px] font-black uppercase tracking-widest mb-6 border-b border-[#111827]/5 pb-4">
                    <MapPin className="w-3.5 h-3.5 text-[#2ecc71]" /> {item.location}
                  </div>
                  
                  <div className="mt-auto flex items-center justify-between gap-4">
                    <div className="text-2xl font-black text-[#115e59] font-heading">
                        {item.type === "swap" ? "TRADE" : <><span className="text-xs mr-0.5 text-[#111827]/40">R</span>{item.price}</>}
                    </div>
                    <button
                      onClick={() => handleMarketAction(item)}
                      className="w-12 h-12 bg-[#f5f5f4] rounded-2xl flex items-center justify-center text-[#115e59] hover:bg-[#115e59] hover:text-white transition-all shadow-sm active:scale-95 group/btn"
                    >
                      <ShoppingBag className="w-5 h-5 group-hover/btn:scale-110 transition-transform" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
        </div>

        {filteredListings.length === 0 && (
          <div className="py-32 text-center bg-white/30 rounded-[3rem] border-2 border-dashed border-[#111827]/5 mt-12">
            <Search className="w-12 h-12 text-[#111827]/10 mx-auto mb-4" />
            <p className="text-[#111827]/30 font-black uppercase tracking-widest text-sm">
              No inventory matched your search criteria
            </p>
          </div>
        )}
      </div>
    </section>
  );
};

export default Market;
