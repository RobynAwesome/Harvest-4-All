import React, { createContext, useState, useEffect } from "react";
import axios from "axios";
import {
  MOCK_BADGES,
  MOCK_MARKET_LISTINGS,
  MOCK_ACTIONS,
} from "../data/mockData";
import confetti from "canvas-confetti";

export const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const [isOffline, setIsOffline] = useState(false); // Kept for logic internal usage but not UI banner

  const [waterSaved, setWaterSaved] = useState(() => {
    const saved = localStorage.getItem("waterSaved");
    return saved ? parseInt(saved) : 487000;
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

  const [marketListings, setMarketListings] = useState(() => {
    const saved = localStorage.getItem("marketListings");
    return saved ? JSON.parse(saved) : [];
  });

  const [growProjects, setGrowProjects] = useState([]);

  const [actions, setActions] = useState(() => {
    const saved = localStorage.getItem("actions");
    return saved ? JSON.parse(saved) : [];
  });

  const [badges, setBadges] = useState([]);
  const [dispatchLogs, setDispatchLogs] = useState([]);

  const [earnedBadges, setEarnedBadges] = useState(() => {
    const saved = localStorage.getItem("earnedBadges");
    return saved ? JSON.parse(saved) : [];
  });

  const [totalPoints, setTotalPoints] = useState(() => {
    const saved = localStorage.getItem("totalPoints");
    return saved ? parseInt(saved) : 0;
  });

  // Persist to localStorage
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

  useEffect(() => {
    localStorage.setItem("actions", JSON.stringify(actions.slice(0, 50)));
  }, [actions]);

  useEffect(() => {
    localStorage.setItem("marketListings", JSON.stringify(marketListings));
  }, [marketListings]);

  const addEnergySaving = (amount) => {
    setEnergySaved((prev) => prev + amount);
  };

  const addWasteReduction = (amount) => {
    setWasteReduced((prev) => prev + amount);
  };

  const API_BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:5000/api";

  // Fetch data from APIs
  useEffect(() => {
    const fetchData = async () => {
      try {
        const [impactRes, marketRes, growRes, actionsRes, badgesRes] =
          await Promise.all([
            axios.get(`${API_BASE_URL}/impact`),
            axios.get(`${API_BASE_URL}/market`),
            axios.get(`${API_BASE_URL}/grow`),
            axios.get(`${API_BASE_URL}/actions`),
            axios.get(`${API_BASE_URL}/actions/badges`),
          ]);

        setImpactData(impactRes.data);

        // Fetch dispatch logs separately so failure doesn't break main data
        try {
          const dispatchRes = await axios.get(`${API_BASE_URL}/impact/dispatch`);
          setDispatchLogs(dispatchRes.data);
        } catch (_) {}
        
        // Use server data if available, otherwise check local storage (which might have mock defaults)
        if (marketRes.data.length > 0) {
          setMarketListings(marketRes.data);
        } else if (marketListings.length === 0) {
          setMarketListings(MOCK_MARKET_LISTINGS);
        }

        setGrowProjects(growRes.data);
        
        if (actionsRes.data.length > 0) {
          setActions(actionsRes.data);
        } else if (actions.length === 0) {
          setActions(MOCK_ACTIONS);
        }

        if (badgesRes.data.length > 0) {
          setBadges(badgesRes.data);
        } else {
          setBadges(MOCK_BADGES);
        }
      } catch (error) {
        console.error("Backend offline:", error.message);
        // Fallback to mock data if nothing in state/storage
        if (badges.length === 0) setBadges(MOCK_BADGES);
        if (marketListings.length === 0) setMarketListings(MOCK_MARKET_LISTINGS);
        if (actions.length === 0) setActions(MOCK_ACTIONS);
      }
    };
    fetchData();
  }, []);

  const addWaterSaving = (amount) => {
    setWaterSaved((prev) => prev + amount);
  };

  const addImpact = async (impact) => {
    try {
      const res = await axios.post(`${API_BASE_URL}/impact`, impact);
      setImpactData((prev) => [res.data, ...prev]);
    } catch (error) {
      const localImpact = {
        _id: Date.now().toString(),
        ...impact,
        date: new Date().toISOString(),
      };
      setImpactData((prev) => [localImpact, ...prev]);
    }
  };

  const addListing = async (listing) => {
    try {
      const res = await axios.post(`${API_BASE_URL}/market`, listing);
      setMarketListings((prev) => [res.data, ...prev]);
    } catch (error) {
      const localListing = {
        _id: Date.now().toString(),
        ...listing,
        imageUrl:
          listing.imageUrl ||
          "https://images.unsplash.com/photo-1596464716127-f2a82984de30?auto=format&fit=crop&q=80&w=400",
      };
      setMarketListings((prev) => [localListing, ...prev]);
    }
  };

  const addGrowProject = async (project) => {
    try {
      const res = await axios.post(`${API_BASE_URL}/grow`, project);
      setGrowProjects((prev) => [res.data, ...prev]);
    } catch (error) {
      const localProject = {
        _id: Date.now().toString(),
        ...project,
        date: new Date().toISOString(),
      };
      setGrowProjects((prev) => [localProject, ...prev]);
    }
  };

  const [trash, setTrash] = useState(() => {
    const saved = localStorage.getItem("trash");
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    localStorage.setItem("trash", JSON.stringify(trash.slice(0, 100)));
  }, [trash]);

  const deleteListing = async (id) => {
    try { await axios.delete(`${API_BASE_URL}/market/${id}`); } catch (_) {}
    setMarketListings((prev) => {
      const item = prev.find((l) => l._id === id);
      if (item) setTrash((t) => [{ ...item, _deletedType: "listing", _deletedAt: new Date().toISOString() }, ...t]);
      return prev.filter((l) => l._id !== id);
    });
  };

  const deleteAction = async (id) => {
    try { await axios.delete(`${API_BASE_URL}/actions/${id}`); } catch (_) {}
    setActions((prev) => {
      const item = prev.find((a) => a._id === id);
      if (item) setTrash((t) => [{ ...item, _deletedType: "action", _deletedAt: new Date().toISOString() }, ...t]);
      return prev.filter((a) => a._id !== id);
    });
  };

  const deleteGrowProject = async (id) => {
    try { await axios.delete(`${API_BASE_URL}/grow/${id}`); } catch (_) {}
    setGrowProjects((prev) => {
      const item = prev.find((g) => g._id === id);
      if (item) setTrash((t) => [{ ...item, _deletedType: "grow", _deletedAt: new Date().toISOString() }, ...t]);
      return prev.filter((g) => g._id !== id);
    });
  };

  const restoreItem = (id) => {
    setTrash((prev) => {
      const item = prev.find((i) => i._id === id);
      if (!item) return prev;
      const { _deletedType, _deletedAt, ...restored } = item;
      if (_deletedType === "listing") setMarketListings((l) => [restored, ...l]);
      else if (_deletedType === "action") setActions((a) => [restored, ...a]);
      else if (_deletedType === "grow") setGrowProjects((g) => [restored, ...g]);
      return prev.filter((i) => i._id !== id);
    });
  };

  const emptyTrash = () => setTrash([]);

  const resetToDemo = () => {
    setMarketListings(MOCK_MARKET_LISTINGS);
    setActions(MOCK_ACTIONS);
    setGrowProjects([]);
    setTotalPoints(0);
    setEarnedBadges([]);
    setWaterSaved(487000);
    setEnergySaved(184000);
    setWasteReduced(85);
  };

  const [badgePopup, setBadgePopup] = useState(null);

  const getPointsForAction = (type) => {
    switch (type) {
      case "harvest":
        return 25;
      case "save_energy":
        return 15;
      case "save":
        return 10;
      case "reduce":
        return 15;
      case "market":
        return 20;
      case "grow":
        return 10;
      default:
        return 10;
    }
  };

  const checkBadgesLocally = (action, currentActions, currentPoints) => {
    const newBadges = [];
    const allActions = [...currentActions, action];
    const actionsByType = {};
    allActions.forEach((a) => {
      actionsByType[a.type] = (actionsByType[a.type] || 0) + 1;
    });
    const totalActionCount = allActions.length;
    
    // Calculate potential water total for this check
    const currentWater = waterSaved + (action.type === "save" || action.type === "water_saved" ? action.value : 0);

    for (const badge of badges) {
      if (earnedBadges.includes(badge._id)) continue;
      const req = badge.requirement;
      if (!req) continue;

      let earned = false;
      if (req.type === "any" && totalActionCount >= req.count) earned = true;
      else if (req.type === "points" && currentPoints >= req.count) earned = true;
      else if (req.type === "water_saved" && currentWater >= req.count) earned = true;
      else if (actionsByType[req.type] >= req.count) earned = true;

      if (earned) newBadges.push(badge._id);
    }
    return newBadges;
  };

  const logAction = async (action) => {
    try {
      const res = await axios.post(`${API_BASE_URL}/actions`, action);
      const actionData = res.data;

      setActions((prev) => [actionData, ...prev]);
      setTotalPoints((prev) => prev + actionData.points);

      if (actionData.type === "save" || actionData.type === "water_saved") {
        addWaterSaving(actionData.value);
      } else if (actionData.type === "save_energy") {
        addEnergySaving(actionData.value);
      } else if (actionData.type === "reduce") {
        addWasteReduction(actionData.value);
      }

      if (actionData.badgesEarned && actionData.badgesEarned.length > 0) {
        const newBadges = actionData.badgesEarned.filter(
          (badgeId) => !earnedBadges.includes(badgeId),
        );

        if (newBadges.length > 0) {
          setEarnedBadges((prev) => [...prev, ...newBadges]);
          const badgeDetails = badges.find((b) => b._id === newBadges[0]);
          if (badgeDetails) {
            confetti({
              particleCount: 150,
              spread: 70,
              origin: { y: 0.6 },
              colors: ["#115e59", "#2ecc71", "#4ade80"],
            });
            setBadgePopup(badgeDetails);
            setTimeout(() => setBadgePopup(null), 5000);
          }
        }
      }

      return actionData;
    } catch (error) {
      // Offline fallback
      const points = getPointsForAction(action.type);
      const newTotalPoints = totalPoints + points;
      const newBadgesEarned = checkBadgesLocally(
        action,
        actions,
        newTotalPoints,
      );

      const localAction = {
        _id: Date.now().toString(),
        ...action,
        points,
        date: new Date().toISOString(),
        badgesEarned: newBadgesEarned,
      };

      setActions((prev) => [localAction, ...prev]);
      setTotalPoints((prev) => prev + points);

      if (action.type === "save" || action.type === "water_saved") {
        addWaterSaving(action.value);
      } else if (action.type === "save_energy") {
        addEnergySaving(action.value);
      } else if (action.type === "reduce") {
        addWasteReduction(action.value);
      }

      if (newBadgesEarned.length > 0) {
        setEarnedBadges((prev) => [...prev, ...newBadgesEarned]);
        const badgeDetails = badges.find(
          (b) => b._id === newBadgesEarned[0],
        );
        if (badgeDetails) {
          confetti({
            particleCount: 150,
            spread: 70,
            origin: { y: 0.6 },
            colors: ["#115e59", "#2ecc71", "#4ade80"],
          });
          setBadgePopup(badgeDetails);
          setTimeout(() => setBadgePopup(null), 5000);
        }
      }

      return localAction;
    }
  };

  const getEarnedBadgeDetails = () => {
    return badges.filter((badge) => earnedBadges.includes(badge._id));
  };

  return (
    <AppContext.Provider
      value={{
        isOffline,
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
        deleteListing,
        growProjects,
        addGrowProject,
        deleteGrowProject,
        actions,
        deleteAction,
        resetToDemo,
        trash,
        restoreItem,
        emptyTrash,
        badges,
        earnedBadges,
        totalPoints,
        logAction,
        getEarnedBadgeDetails,
        badgePopup,
        setBadgePopup,
        dispatchLogs,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};
