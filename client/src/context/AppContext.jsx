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
  const [actions, setActions] = useState([]);
  const [badges, setBadges] = useState([]);
  const [earnedBadges, setEarnedBadges] = useState(() => {
    const saved = localStorage.getItem("earnedBadges");
    return saved ? JSON.parse(saved) : [];
  });
  const [totalPoints, setTotalPoints] = useState(() => {
    const saved = localStorage.getItem("totalPoints");
    return saved ? parseInt(saved) : 0;
  });

  useEffect(() => {
    localStorage.setItem("waterSaved", waterSaved);
  }, [waterSaved]);

  useEffect(() => {
    localStorage.setItem("earnedBadges", JSON.stringify(earnedBadges));
  }, [earnedBadges]);

  useEffect(() => {
    localStorage.setItem("totalPoints", totalPoints);
  }, [totalPoints]);

  // Fetch data from APIs
  useEffect(() => {
    const fetchData = async () => {
      try {
        const [impactRes, marketRes, growRes, actionsRes, badgesRes] = await Promise.all([
          axios.get("http://localhost:5000/api/impact"),
          axios.get("http://localhost:5000/api/market"),
          axios.get("http://localhost:5000/api/grow"),
          axios.get("http://localhost:5000/api/actions"),
          axios.get("http://localhost:5000/api/actions/badges"),
        ]);
        setImpactData(impactRes.data);
        setMarketListings(marketRes.data);
        setGrowProjects(growRes.data);
        setActions(actionsRes.data);
        setBadges(badgesRes.data);
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

  const logAction = async (action) => {
    try {
      const res = await axios.post("http://localhost:5000/api/actions", action);
      setActions((prev) => [res.data, ...prev]);
      setTotalPoints((prev) => prev + res.data.points);

      // Check for new badges earned
      if (res.data.badgesEarned && res.data.badgesEarned.length > 0) {
        const newBadges = res.data.badgesEarned.filter(badgeId =>
          !earnedBadges.includes(badgeId)
        );
        if (newBadges.length > 0) {
          setEarnedBadges((prev) => [...prev, ...newBadges]);
          // Could add notification here
          console.log("New badges earned:", newBadges);
        }
      }

      return res.data;
    } catch (error) {
      console.error("Error logging action:", error);
      return null;
    }
  };

  const getEarnedBadgeDetails = () => {
    return badges.filter(badge => earnedBadges.includes(badge._id));
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
        actions,
        badges,
        earnedBadges,
        totalPoints,
        logAction,
        getEarnedBadgeDetails,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => useContext(AppContext);
