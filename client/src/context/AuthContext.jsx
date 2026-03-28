import React, { createContext, useState, useEffect, useContext } from "react";
import axios from "axios";

const AuthContext = createContext();

const API_BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:5000/api";

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    const saved = localStorage.getItem("harvest_user");
    return saved ? JSON.parse(saved) : null;
  });
  const [token, setToken] = useState(() => localStorage.getItem("harvest_token"));
  const [loading, setLoading] = useState(true);
  const [isSimulating, setIsSimulating] = useState(() => !!localStorage.getItem("harvest_sim_admin"));

  useEffect(() => {
    const validateToken = async () => {
      if (!token) {
        setLoading(false);
        return;
      }
      try {
        const res = await axios.get(`${API_BASE_URL}/auth/me`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setUser(res.data);
        localStorage.setItem("harvest_user", JSON.stringify(res.data));
      } catch {
        // Token expired or invalid — keep local user data for offline
      } finally {
        setLoading(false);
      }
    };
    validateToken();
  }, []);

  const login = async (email, password) => {
    const res = await axios.post(`${API_BASE_URL}/auth/login`, { email, password });
    setToken(res.data.token);
    setUser(res.data.user);
    localStorage.setItem("harvest_token", res.data.token);
    localStorage.setItem("harvest_user", JSON.stringify(res.data.user));
    return res.data;
  };

  const register = async (username, email, password, location) => {
    const res = await axios.post(`${API_BASE_URL}/auth/register`, {
      username, email, password, location,
    });
    setToken(res.data.token);
    setUser(res.data.user);
    localStorage.setItem("harvest_token", res.data.token);
    localStorage.setItem("harvest_user", JSON.stringify(res.data.user));
    return res.data;
  };

  const logout = () => {
    setUser(null);
    setToken(null);
    setIsSimulating(false);
    localStorage.removeItem("harvest_token");
    localStorage.removeItem("harvest_user");
    localStorage.removeItem("harvest_sim_admin");
  };

  const simulateUser = (userData) => {
    // Save current admin to restore later
    if (!isSimulating) {
      localStorage.setItem("harvest_sim_admin", JSON.stringify(user));
    }
    setUser({ ...userData, isSimulated: true });
    setIsSimulating(true);
  };

  const stopSimulation = () => {
    const adminData = localStorage.getItem("harvest_sim_admin");
    if (adminData) {
      setUser(JSON.parse(adminData));
      localStorage.removeItem("harvest_sim_admin");
    }
    setIsSimulating(false);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        loading,
        isAuthenticated: !!user,
        isAdmin: user?.role === "admin" && !isSimulating,
        isSimulating,
        login,
        register,
        logout,
        simulateUser,
        stopSimulation,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);

export default AuthContext;
