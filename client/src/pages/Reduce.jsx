import React from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import { MapPin, Trash2 } from "lucide-react";
import { useAppContext } from "../context/AppContext";
import LogActionButton from "../components/LogActionButton";

// Fix Leaflet icon issue
import markerIcon from "leaflet/dist/images/marker-icon.png";
import markerShadow from "leaflet/dist/images/marker-shadow.png";
let DefaultIcon = L.icon({
  iconUrl: markerIcon,
  shadowUrl: markerShadow,
  iconSize: [25, 41],
  iconAnchor: [12, 41],
});
L.Marker.prototype.options.icon = DefaultIcon;

const Reduce = () => {
  const points = [
    {
      id: 1,
      pos: [-34.0084, 18.6449],
      name: "Khayelitsha Drop-off",
      items: "Plastic, Paper, Glass",
    },
    {
      id: 2,
      pos: [-34.0484, 18.6049],
      name: "Mitchells Plain Depot",
      items: "Electronics, Cardboard",
    },
    {
      id: 3,
      pos: [-33.9312, 18.4232],
      name: "City Center Hub",
      items: "Garden Waste, Metal",
    },
  ];

  const { wasteReduced, addWasteReduction, addImpact } = useAppContext();

  const handleLogWaste = (amount) => {
    addWasteReduction(amount);
    addImpact({
      type: "waste_reduced",
      value: amount,
      unit: "kg",
      location: "Local User",
      notes: "Logged recycling action",
    });
  };

  return (
    <section className="section-fade py-16 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="mb-12">
          <h2 className="text-4xl font-black text-[#111827] mb-4">
            Reduce <span className="text-[#166534]">Waste</span>
          </h2>
          <p className="text-[#111827]/60">
            Find local recycling points and learn upcycling techniques.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
          {/* Map Column */}
          <div className="lg:col-span-2 bg-white p-4 rounded-3xl shadow-lg border border-[#166534]/10 h-[500px] overflow-hidden">
            <MapContainer
              center={[-34.0, 18.6]}
              zoom={11}
              style={{ height: "100%", width: "100%", borderRadius: "1.5rem" }}
            >
              <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
              {points.map((p) => (
                <Marker key={p.id} position={p.pos}>
                  <Popup>
                    <div className="font-bold text-[#166534]">{p.name}</div>
                    <div className="text-xs text-[#111827]/60">{p.items}</div>
                  </Popup>
                </Marker>
              ))}
            </MapContainer>
          </div>

          {/* Tips Column */}
          <div className="space-y-6">
            <div className="bg-[#166534] text-white p-8 rounded-3xl shadow-xl">
              <div className="flex items-center gap-3 mb-6">
                <Trash2 className="w-6 h-6 text-[#4ade80]" />
                <h3 className="font-bold text-xl uppercase tracking-tighter">
                  DIY Upcycling
                </h3>
              </div>
              <ul className="space-y-4">
                <li className="p-4 bg-white/10 rounded-2xl">
                  <h4 className="font-bold text-sm mb-1">
                    Plastic Bottle Planters
                  </h4>
                  <p className="text-xs text-white/70">
                    Cut 2L bottles into colorful hanging pots for spring onions.
                  </p>
                </li>
                <li className="p-4 bg-white/10 rounded-2xl">
                  <h4 className="font-bold text-sm mb-1">
                    Egg Carton Seedlings
                  </h4>
                  <p className="text-xs text-white/70">
                    Perfect biodegradable starter pots for your spinach seeds.
                  </p>
                </li>
              </ul>
            </div>

            <div className="bg-white p-6 rounded-3xl border border-[#166534]/10">
              <h3 className="font-bold mb-4">Log Waste Reduction</h3>
              <div className="bg-[#f5f5f4] p-4 rounded-2xl mb-4 text-center">
                <div className="text-xs font-bold text-[#111827]/40 uppercase mb-1">Total Reduced</div>
                <div className="text-2xl font-black text-[#166534]">{wasteReduced} kg</div>
              </div>
              <p className="text-sm text-[#111827]/60 mb-4">
                Track your recycling and upcycling efforts
              </p>
              <LogActionButton
                actionType="reduce"
                description="Recycled household waste"
                value={5}
                unit="kg"
                location="Home recycling"
                onActionLogged={() => handleLogWaste(5)}
              />
            </div>

            <div className="bg-white p-8 rounded-3xl border border-[#166534]/10">
              <h3 className="font-bold mb-4">Nearby Points</h3>
              <div className="space-y-4">
                {points.map((p) => (
                  <div
                    key={p.id}
                    className="flex items-start gap-4 p-3 hover:bg-[#f5f5f4] rounded-xl transition-colors cursor-pointer"
                  >
                    <MapPin className="w-5 h-5 text-[#166534] mt-1" />
                    <div>
                      <div className="font-bold text-sm">{p.name}</div>
                      <div className="text-xs text-[#111827]/40">
                        2.4km • Open until 17:00
                      </div>
                    </div>
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

export default Reduce;
