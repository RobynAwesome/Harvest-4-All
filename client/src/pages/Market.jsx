import React, { useState } from "react";
import { useAppContext } from "../context/useAppContext";
import { Plus, MapPin } from "lucide-react";
import PostListingModal from "../components/PostListingModal";

const Market = () => {
  const { marketListings, addListing, logAction } = useAppContext();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [filter, setFilter] = useState("All");

  const handleMarketAction = (item) => {
    logAction({
      type: "market",
      description: `Participated in ${item.type} for ${item.title}`,
      value: item.price || 5, // Default points/value
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
    <section className="section-fade py-16 px-4 font-sans">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 mb-12">
          <div>
            <h2 className="text-4xl font-black text-[#111827] mb-4">
              Local <span className="text-[#166534]">Sustainable Market</span>
            </h2>
            <p className="text-[#111827]/60">
              Swap, buy, and sell home-grown produce and recycled goods.
            </p>
          </div>
          <button
            onClick={() => setIsModalOpen(true)}
            className="bg-[#166534] text-white px-6 py-3 rounded-xl font-bold flex items-center gap-2 hover:shadow-lg transition-all active:scale-95 shrink-0"
          >
            <Plus className="w-5 h-5" /> Post Listing
          </button>
        </div>

        {/* Modal */}
        <PostListingModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          onSubmit={addListing}
        />

        {/* Filters */}
        <div className="flex flex-wrap gap-2 mb-8">
          {["All", "Vegetables", "Seedlings", "Compost", "Upcycled Tool"].map(
            (f, i) => (
              <button
                key={i}
                onClick={() => setFilter(f)}
                className={`px-4 py-1.5 rounded-full text-sm font-bold transition-all ${
                  filter === f
                    ? "bg-[#166534] text-white"
                    : "bg-white border border-[#166534]/10 hover:bg-[#166534]/5"
                }`}
              >
                {f}
              </button>
            ),
          )}
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredListings.length > 0 &&
            filteredListings.map((item) => (
              <div
                key={item._id}
                className="bg-white rounded-2xl border border-[#166534]/10 overflow-hidden group hover:shadow-sm transition-shadow animate-in fade-in slide-in-from-bottom-4 duration-500"
              >
                <div className="h-48 overflow-hidden bg-[#f5f5f4]">
                  <img
                    src={
                      item.imageUrl ||
                      `https://images.unsplash.com/photo-1596464716127-f2a82984de30?auto=format&fit=crop&q=80&w=400&text=${item.title}`
                    }
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    alt={item.title}
                    loading="lazy"
                  />
                </div>
                <div className="p-6">
                  <div className="flex justify-between items-start mb-2">
                    <h4 className="font-bold text-lg">{item.title}</h4>
                    <span
                      className={`font-black ${
                        item.type === "swap" ? "text-blue-600" : "text-[#166534]"
                      }`}
                    >
                      {item.type === "swap" ? "Swap" : `R${item.price}`}
                    </span>
                  </div>
                  <div className="flex items-center gap-1 text-[#111827]/60 text-xs font-bold mb-4 uppercase tracking-wider">
                    <MapPin className="w-3 h-3" /> {item.location}
                  </div>
                  <button
                    onClick={() => handleMarketAction(item)}
                    className={`w-full py-2 font-bold rounded-lg text-sm transition-all ${
                      item.type === "swap"
                        ? "border-2 border-[#166534]/10 text-[#166534] hover:bg-[#166534]/5"
                        : "bg-[#4ade80] text-[#166534] hover:shadow-md"
                    }`}
                  >
                    {item.type === "swap" ? "Offer Swap" : "Contact Seller"}
                  </button>
                </div>
              </div>
            ))}

          {/* Sponsor an Urban Farm Card */}
          <div className="bg-gradient-to-br from-[#166534] to-[#111827] rounded-3xl p-8 flex flex-col justify-between text-white shadow-xl relative overflow-hidden group border-2 border-[#166534]">
            <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-full -mr-16 -mt-16 blur-2xl group-hover:bg-white/10 transition-colors"></div>
            <div>
              <div className="bg-[#4ade80] text-[#166534] text-[10px] font-black px-2 py-1 rounded w-fit mb-4 uppercase">
                Economic Resilience
              </div>
              <h3 className="text-2xl font-black mb-3 leading-tight">
                Sponsor an Urban Farm Hub
              </h3>
              <p className="text-white/60 text-sm mb-6">
                Support local cooperatives with toolkits, seeds, and training.
                100% of funds go directly to the community.
              </p>
            </div>
            <button className="bg-white text-[#166534] w-full py-3 rounded-xl font-bold hover:bg-[#4ade80] hover:text-white transition-all transform active:scale-95">
              Learn More
            </button>
          </div>
        </div>

        {filteredListings.length === 0 && (
          <div className="py-24 text-center">
            <p className="text-[#111827]/60 font-bold uppercase tracking-widest">
              No listings found in this category
            </p>
          </div>
        )}
      </div>
    </section>
  );
};

export default Market;
