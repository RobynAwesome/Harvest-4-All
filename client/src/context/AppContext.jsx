import React, { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";

const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const [waterSaved, setWaterSaved] = useState(() => {
    const saved = localStorage.getItem("waterSaved");
    return saved ? parseInt(saved) : 1250;
  });

  const [energySaved, setEnergySaved] = useState(0);
  const [impactData, setImpactData] = useState([]);
  const [marketListings, setMarketListings] = useState([]);
  const [growProjects, setGrowProjects] = useState([]);

  useEffect(() => {
    localStorage.setItem("waterSaved", waterSaved);
  }, [waterSaved]);

  // Fetch data from APIs
  useEffect(() => {
    const fetchData = async () => {
      try {
        const [impactRes, marketRes, growRes] = await Promise.all([
          axios.get("http://localhost:5000/api/impact"),
          axios.get("http://localhost:5000/api/market"),
          axios.get("http://localhost:5000/api/grow"),
        ]);
        setImpactData(impactRes.data);
        setMarketListings(marketRes.data);
        setGrowProjects(growRes.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, []);

  const addWaterSaving = (amount) => {
    setWaterSaved((prev) => prev + amount);
  };

  const addImpact = async (impact) => {
    try {
      const res = await axios.post("http://localhost:5000/api/impact", impact);
      setImpactData((prev) => [res.data, ...prev]);
    } catch (error) {
      console.error("Error adding impact:", error);
    }
  };

  const addListing = async (listing) => {
    try {
      const res = await axios.post("http://localhost:5000/api/market", listing);
      setMarketListings((prev) => [res.data, ...prev]);
    } catch (error) {
      console.error("Error adding listing:", error);
    }
  };

  const addGrowProject = async (project) => {
    try {
      const res = await axios.post("http://localhost:5000/api/grow", project);
      setGrowProjects((prev) => [res.data, ...prev]);
    } catch (error) {
      console.error("Error adding grow project:", error);
    }
  };

  return (
    <AppContext.Provider
      value={{
        waterSaved,
        addWaterSaving,
        energySaved,
        setEnergySaved,
        impactData,
        addImpact,
        marketListings,
        addListing,
        growProjects,
        addGrowProject,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => useContext(AppContext);
