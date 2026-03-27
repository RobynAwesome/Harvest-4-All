import React from "react";
import { useAppContext } from "../context/AppContext";
import { Plus, MapPin } from "lucide-react";

const Market = () => {
  const { marketListings } = useAppContext();

  return (
    <section className="section-fade py-16 px-4">
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
          <button className="bg-[#166534] text-white px-6 py-3 rounded-xl font-bold flex items-center gap-2 hover:shadow-lg transition-all active:scale-95 shrink-0">
            <Plus className="w-5 h-5" /> Post Listing
          </button>
        </div>

        {/* Filters */}
        <div className="flex flex-wrap gap-2 mb-8">
          {["All", "Vegetables", "Seedlings", "Compost", "Upcycled Tool"].map(
            (f, i) => (
              <button
                key={i}
                className={`px-4 py-1.5 rounded-full text-sm font-bold ${i === 0 ? "bg-[#166534] text-white" : "bg-white border border-[#166534]/10 hover:bg-[#166534]/5"}`}
              >
                {f}
              </button>
            ),
          )}
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {marketListings.map((item) => (
            <div
              key={item._id}
              className="bg-white rounded-2xl border border-[#166534]/10 overflow-hidden group hover:shadow-sm transition-shadow"
            >
              <div className="h-48 overflow-hidden bg-[#f5f5f4]">
                <img
                  src={
                    item.imageUrl ||
                    "https://images.unsplash.com/photo-1596464716127-f2a82984de30?auto=format&fit=crop&q=80&w=400"
                  }
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
              </div>
              <div className="p-6">
                <div className="flex justify-between items-start mb-2">
                  <h4 className="font-bold text-lg">{item.title}</h4>
                  <span
                    className={`font-black ${item.type === "swap" ? "text-blue-600" : "text-[#166534]"}`}
                  >
                    {item.type === "swap" ? "Swap" : `R${item.price}`}
                  </span>
                </div>
                <div className="flex items-center gap-1 text-[#111827]/40 text-xs font-bold mb-4 uppercase tracking-wider">
                  <MapPin className="w-3 h-3" /> {item.location}
                </div>
                <button
                  className={`w-full py-2 font-bold rounded-lg text-sm transition-all ${item.type === "swap" ? "border-2 border-[#166534]/10 text-[#166534] hover:bg-[#166534]/5" : "bg-[#4ade80] text-[#166534] hover:shadow-md"}`}
                >
                  {item.type === "swap" ? "Offer Swap" : "Contact Seller"}
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Market;
