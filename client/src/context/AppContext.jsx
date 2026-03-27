import React, { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";

const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const [waterSaved, setWaterSaved] = useState(() => {
    const saved = localStorage.getItem("waterSaved");
    return saved ? parseInt(saved) : 1250;
  });

  const [energySaved, setEnergySaved] = useState(() => {
    const saved = localStorage.getItem("energySaved");
    return saved ? parseInt(saved) : 184000;
  });
  const [wasteReduced, setWasteReduced] = useState(() => {
    const saved = localStorage.getItem("wasteReduced");
    return saved ? parseInt(saved) : 85;
  });
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
    localStorage.setItem("wasteReduced", wasteReduced);
  }, [wasteReduced]);

  useEffect(() => {
    localStorage.setItem("energySaved", energySaved);
  }, [energySaved]);

  useEffect(() => {
    localStorage.setItem("totalPoints", totalPoints);
  }, [totalPoints]);

  const addEnergySaving = (amount) => {
    setEnergySaved((prev) => prev + amount);
  };

  const addWasteReduction = (amount) => {
    setWasteReduced((prev) => prev + amount);
  };

  // Fetch data from APIs
  useEffect(() => {
    const fetchData = async () => {
      try {
        const [impactRes, marketRes, growRes, actionsRes, badgesRes] =
          await Promise.all([
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

  const [badgePopup, setBadgePopup] = useState(null);

  const logAction = async (action) => {
    try {
      const res = await axios.post("http://localhost:5000/api/actions", action);
      const actionData = res.data;
      
      setActions((prev) => [actionData, ...prev]);
      setTotalPoints((prev) => prev + actionData.points);

      // Special handling for stats to show instant local updates
      if (actionData.type === 'save' || actionData.type === 'water_saved') {
          addWaterSaving(actionData.value);
      } else if (actionData.type === 'save_energy') {
          addEnergySaving(actionData.value);
      } else if (actionData.type === 'reduce') {
          addWasteReduction(actionData.value);
      }

      // Check for new badges earned
      if (actionData.badgesEarned && actionData.badgesEarned.length > 0) {
        const newBadges = actionData.badgesEarned.filter(
          (badgeId) => !earnedBadges.includes(badgeId),
        );
        
        if (newBadges.length > 0) {
          setEarnedBadges((prev) => [...prev, ...newBadges]);
          // Find the first new badge details to show in popup
          const badgeDetails = badges.find(b => b._id === newBadges[0]);
          if (badgeDetails) {
            setBadgePopup(badgeDetails);
            setTimeout(() => setBadgePopup(null), 5000);
          }
        }
      }

      return actionData;
    } catch (error) {
      console.error("Error logging action:", error);
      return null;
    }
  };

  const getEarnedBadgeDetails = () => {
    return badges.filter((badge) => earnedBadges.includes(badge._id));
  };

  return (
    <AppContext.Provider
      value={{
        waterSaved,
        addWaterSaving,
        energySaved,
        addEnergySaving,
        wasteReduced,
        addWasteReduction,
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
        badgePopup,
        setBadgePopup,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => useContext(AppContext);
