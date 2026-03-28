import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import axios from "axios";
import { Mail, Lock, User, MapPin, LogIn, UserPlus, Eye, EyeOff, ArrowLeft, Sprout, ShieldCheck, ShoppingBag } from "lucide-react";
import { useAuth } from "../context/AuthContext";

/* ── Particle Background ── */
const ParticleField = () => {
  const particles = Array.from({ length: 14 }, (_, i) => ({
    id: i,
    size: 4 + Math.random() * 8,
    x: Math.random() * 100,
    y: Math.random() * 100,
    duration: 8 + Math.random() * 12,
    delay: Math.random() * 6,
    shape: i % 3, // 0=circle, 1=square, 2=rotated square
    color: i % 2 === 0 ? "bg-emerald-500/20" : "bg-teal-400/15",
  }));

  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none">
      {/* Radial gradient overlays */}
      <div className="absolute inset-0" style={{
        background: `
          radial-gradient(ellipse 60% 50% at 70% 20%, rgba(16,185,129,0.08) 0%, transparent 70%),
          radial-gradient(ellipse 50% 60% at 20% 80%, rgba(13,148,136,0.06) 0%, transparent 70%),
          radial-gradient(ellipse 40% 40% at 50% 50%, rgba(5,150,105,0.05) 0%, transparent 60%)
        `,
      }} />

      {/* Floating particles */}
      {particles.map((p) => (
        <div
          key={p.id}
          className={`absolute ${p.color} ${p.shape === 0 ? "rounded-full" : p.shape === 1 ? "rounded-sm" : "rounded-sm rotate-45"}`}
          style={{
            width: p.size,
            height: p.size,
            left: `${p.x}%`,
            top: `${p.y}%`,
            animation: `particleFloat ${p.duration}s ease-in-out ${p.delay}s infinite alternate`,
          }}
        />
      ))}

      {/* Pulsing concentric rings */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
        <div className="w-[600px] h-[600px] rounded-full border border-emerald-500/5 animate-pulse" />
        <div className="absolute inset-8 rounded-full border border-teal-500/5 animate-pulse" style={{ animationDelay: "1s" }} />
      </div>

      {/* Background watermark text */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 select-none pointer-events-none">
        <span
          className="text-[12vw] font-black tracking-[0.15em] opacity-[0.03]"
          style={{
            WebkitTextStroke: "2px rgba(16,185,129,0.15)",
            WebkitTextFillColor: "transparent",
            fontFamily: "Impact, Arial Black, sans-serif",
          }}
        >
          HARVEST
        </span>
      </div>
    </div>
  );
};

/* ── Login Page ── */
const Login = () => {
  const navigate = useNavigate();
  const { login, register } = useAuth();
  const [activeTab, setActiveTab] = useState("login");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  // Form state
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [location, setLocation] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      await login(email, password);
      navigate("/");
    } catch (err) {
      setError(err.response?.data?.message || "Login failed. Server may be offline.");
    } finally {
      setLoading(false);
    }
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    setError("");
    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }
    setLoading(true);
    try {
      await register(username, email, password, location);
      navigate("/");
    } catch (err) {
      setError(err.response?.data?.message || "Registration failed. Server may be offline.");
    } finally {
      setLoading(false);
    }
  };

  const getPasswordStrength = () => {
    if (!password) return { width: "0%", color: "bg-gray-600", label: "" };
    if (password.length < 6) return { width: "25%", color: "bg-red-500", label: "Weak" };
    if (password.length < 8) return { width: "50%", color: "bg-yellow-500", label: "Fair" };
    if (/(?=.*[A-Z])(?=.*[0-9])/.test(password)) return { width: "100%", color: "bg-emerald-500", label: "Strong" };
    return { width: "75%", color: "bg-teal-500", label: "Good" };
  };

  const strength = getPasswordStrength();

  const inputClass = "w-full bg-gray-800/40 border border-gray-700/40 rounded-xl py-3 pl-11 pr-4 text-white placeholder-gray-500 focus:border-emerald-600/50 focus:bg-gray-800/60 focus:ring-2 focus:ring-emerald-500/20 focus:outline-none transition-all";

  return (
    <div className="min-h-screen bg-[#0a0f0e] flex items-center justify-center p-4 relative">
      <ParticleField />

      {/* Back button */}
      <button
        onClick={() => navigate("/")}
        className="absolute top-6 left-6 z-20 flex items-center gap-2 text-gray-400 hover:text-emerald-400 transition-colors"
      >
        <ArrowLeft className="w-5 h-5" />
        <span className="text-sm font-medium">Back to App</span>
      </button>

      {/* Glass card */}
      <motion.div
        initial={{ opacity: 0, y: 20, scale: 0.98 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="relative z-10 w-full max-w-md"
      >
        <div
          className="bg-gray-900/70 backdrop-blur-2xl rounded-3xl border border-gray-700/40 shadow-2xl overflow-hidden"
          style={{
            backgroundImage: "radial-gradient(ellipse 80% 50% at 80% 0%, rgba(16,185,129,0.08) 0%, transparent 60%)",
          }}
        >
          {/* Logo & Header */}
          <div className="pt-8 pb-4 text-center">
            <div className="flex justify-center mb-4">
              <div className="w-16 h-12 rounded-2xl overflow-hidden bg-white/10 backdrop-blur-sm border border-emerald-500/20 flex items-center justify-center">
                <img
                  src="/logo512.png"
                  alt="Harvest 4 All"
                  className="w-14 object-cover object-top"
                  style={{ marginTop: "-4px" }}
                />
              </div>
            </div>
            <h1 className="text-2xl font-black text-white tracking-wide">HARVEST 4 ALL</h1>
            <p className="text-gray-500 text-sm mt-1">Sustainable Communities</p>
          </div>

          {/* Tabs */}
          <div className="flex mx-8 mb-2 bg-gray-800/30 rounded-xl p-1">
            {[
              { id: "login", label: "Sign In", icon: LogIn },
              { id: "register", label: "Register", icon: UserPlus },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => { setActiveTab(tab.id); setError(""); }}
                className={`relative flex-1 flex items-center justify-center gap-2 py-2.5 rounded-lg text-sm font-semibold transition-colors ${
                  activeTab === tab.id ? "text-white" : "text-gray-500 hover:text-gray-300"
                }`}
              >
                {activeTab === tab.id && (
                  <motion.div
                    layoutId="authTab"
                    className="absolute inset-0 bg-gradient-to-r from-emerald-600/30 to-teal-600/30 rounded-lg border border-emerald-500/20"
                    transition={{ type: "spring", stiffness: 400, damping: 30 }}
                  />
                )}
                <tab.icon className="w-4 h-4 relative z-10" />
                <span className="relative z-10">{tab.label}</span>
              </button>
            ))}
          </div>

          {/* Error */}
          <AnimatePresence mode="wait">
            {error && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                className="mx-8 mb-2 bg-red-500/10 border border-red-500/20 rounded-xl px-4 py-2.5 text-red-400 text-sm"
              >
                {error}
              </motion.div>
            )}
          </AnimatePresence>

          {/* Forms */}
          <div className="px-8 pb-8">
            <AnimatePresence mode="wait">
              {activeTab === "login" ? (
                <motion.form
                  key="login"
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 10 }}
                  transition={{ duration: 0.2 }}
                  onSubmit={handleLogin}
                  className="space-y-4"
                >
                  <div className="relative">
                    <Mail className="absolute left-3.5 top-3.5 w-4 h-4 text-gray-500" />
                    <input
                      type="email"
                      required
                      placeholder="Email address"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className={inputClass}
                    />
                  </div>

                  <div className="relative">
                    <Lock className="absolute left-3.5 top-3.5 w-4 h-4 text-gray-500" />
                    <input
                      type={showPassword ? "text" : "password"}
                      required
                      placeholder="Password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className={inputClass + " pr-11"}
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3.5 top-3.5 text-gray-500 hover:text-gray-300 transition-colors"
                    >
                      {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                  </div>

                  <motion.button
                    type="submit"
                    disabled={loading}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.97 }}
                    className="w-full py-3.5 bg-gradient-to-r from-emerald-600 to-teal-600 text-white font-bold rounded-xl shadow-[0_0_20px_rgba(16,185,129,0.3)] hover:shadow-[0_0_30px_rgba(16,185,129,0.45)] transition-shadow disabled:opacity-50 flex items-center justify-center gap-2"
                  >
                    {loading ? (
                      <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    ) : (
                      <>
                        <LogIn className="w-4 h-4" /> Sign In
                      </>
                    )}
                  </motion.button>

                  <p className="text-center text-gray-500 text-sm">
                    Don't have an account?{" "}
                    <button type="button" onClick={() => setActiveTab("register")} className="text-emerald-400 hover:text-emerald-300 font-semibold">
                      Register
                    </button>
                  </p>
                </motion.form>
              ) : (
                <motion.form
                  key="register"
                  initial={{ opacity: 0, x: 10 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -10 }}
                  transition={{ duration: 0.2 }}
                  onSubmit={handleRegister}
                  className="space-y-3"
                >
                  <div className="relative">
                    <User className="absolute left-3.5 top-3.5 w-4 h-4 text-gray-500" />
                    <input
                      type="text"
                      required
                      minLength={2}
                      placeholder="Username"
                      value={username}
                      onChange={(e) => setUsername(e.target.value)}
                      className={inputClass}
                    />
                  </div>

                  <div className="relative">
                    <Mail className="absolute left-3.5 top-3.5 w-4 h-4 text-gray-500" />
                    <input
                      type="email"
                      required
                      placeholder="Email address"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className={inputClass}
                    />
                  </div>

                  <div>
                    <div className="relative">
                      <Lock className="absolute left-3.5 top-3.5 w-4 h-4 text-gray-500" />
                      <input
                        type={showPassword ? "text" : "password"}
                        required
                        minLength={6}
                        placeholder="Password (6+ characters)"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className={inputClass + " pr-11"}
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-3.5 top-3.5 text-gray-500 hover:text-gray-300 transition-colors"
                      >
                        {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                      </button>
                    </div>
                    {/* Password strength bar */}
                    {password && (
                      <div className="mt-2 flex items-center gap-2">
                        <div className="flex-1 h-1.5 bg-gray-700/50 rounded-full overflow-hidden">
                          <motion.div
                            className={`h-full ${strength.color} rounded-full`}
                            initial={{ width: 0 }}
                            animate={{ width: strength.width }}
                            transition={{ duration: 0.3 }}
                          />
                        </div>
                        <span className="text-xs text-gray-500">{strength.label}</span>
                      </div>
                    )}
                  </div>

                  <div className="relative">
                    <Lock className="absolute left-3.5 top-3.5 w-4 h-4 text-gray-500" />
                    <input
                      type="password"
                      required
                      placeholder="Confirm password"
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      className={inputClass}
                    />
                  </div>

                  <div className="relative">
                    <MapPin className="absolute left-3.5 top-3.5 w-4 h-4 text-gray-500" />
                    <input
                      type="text"
                      placeholder="Location (optional)"
                      value={location}
                      onChange={(e) => setLocation(e.target.value)}
                      className={inputClass}
                    />
                  </div>

                  <motion.button
                    type="submit"
                    disabled={loading}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.97 }}
                    className="w-full py-3.5 bg-gradient-to-r from-emerald-600 to-teal-600 text-white font-bold rounded-xl shadow-[0_0_20px_rgba(16,185,129,0.3)] hover:shadow-[0_0_30px_rgba(16,185,129,0.45)] transition-shadow disabled:opacity-50 flex items-center justify-center gap-2"
                  >
                    {loading ? (
                      <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    ) : (
                      <>
                        <Sprout className="w-4 h-4" /> Create Account
                      </>
                    )}
                  </motion.button>

                  <p className="text-center text-gray-500 text-sm">
                    Already have an account?{" "}
                    <button type="button" onClick={() => setActiveTab("login")} className="text-emerald-400 hover:text-emerald-300 font-semibold">
                      Sign In
                    </button>
                  </p>
                </motion.form>
              )}
            </AnimatePresence>
          </div>
        </div>

        {/* Demo / Insta-Login Dashboard */}
        <motion.div
           initial={{ opacity: 0, y: 10 }}
           animate={{ opacity: 1, y: 0 }}
           transition={{ delay: 0.4 }}
           className="mt-12 bg-gray-900/40 backdrop-blur-xl rounded-[2.5rem] border border-emerald-500/10 p-8 shadow-2xl relative overflow-hidden"
        >
           <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-500/5 rounded-full -translate-y-1/2 translate-x-1/2 blur-2xl" />
           
           <div className="flex items-center justify-between mb-8">
              <div>
                 <h3 className="text-sm font-black text-emerald-400 uppercase tracking-widest leading-none mb-1">PITCH DEMO MODE</h3>
                 <p className="text-[10px] text-gray-500 font-bold uppercase tracking-widest italic">Insta-Login Simulation</p>
              </div>
              <div className="bg-emerald-500/20 text-emerald-400 text-[8px] font-black px-3 py-1 rounded-full border border-emerald-500/20">
                 OFFLINE READY
              </div>
           </div>

           <div className="grid grid-cols-1 gap-3">
              {[
                { id: "admin-kholofelo", name: "Kholofelo (Founder/Admin)", role: "Access All Interfaces", icon: ShieldCheck, color: "from-emerald-600/20 to-teal-600/20", border: "border-emerald-500/30" },
                { id: "u-1", name: "Kea (Resident)", role: "View Basic Impact", icon: User, color: "from-blue-600/10 to-indigo-600/10", border: "border-blue-500/20" },
                { id: "u-2", name: "Karabo (Resident)", role: "View Marketplace", icon: ShoppingBag, color: "from-amber-600/10 to-orange-600/10", border: "border-amber-500/20" }
              ].map((u) => (
                <button
                  key={u.id}
                  onClick={async () => {
                    setLoading(true);
                    try {
                      const res = await axios.post("/api/auth/demo-login", { userId: u.id });
                      // Mock login logic manually since we are bypassing the form
                      localStorage.setItem("harvest_token", res.data.token);
                      localStorage.setItem("harvest_user", JSON.stringify(res.data.user));
                      window.location.href = "/"; // Force refresh to update context
                    } catch (err) {
                      setError("Demo mode connection failed.");
                    } finally {
                      setLoading(false);
                    }
                  }}
                  className={`group relative flex items-center justify-between p-4 bg-gradient-to-r ${u.color} ${u.border} border rounded-[1.5rem] hover:scale-[1.02] transition-all text-left overflow-hidden`}
                >
                  <div className="flex items-center gap-4 relative z-10">
                     <div className="w-10 h-10 bg-white/5 rounded-xl flex items-center justify-center">
                        <u.icon className="w-5 h-5 text-white/70" />
                     </div>
                     <div>
                        <div className="text-xs font-black text-white group-hover:text-emerald-400 transition-colors uppercase tracking-tight">{u.name}</div>
                        <div className="text-[10px] text-gray-500 font-bold uppercase tracking-widest">{u.role}</div>
                     </div>
                  </div>
                  <div className="bg-white/5 p-2 rounded-lg group-hover:bg-emerald-500 group-hover:text-white transition-all">
                     <LogIn className="w-3.5 h-3.5" />
                  </div>
                </button>
              ))}
           </div>
        </motion.div>

        {/* Bottom text */}
        <p className="text-center text-gray-600 text-xs mt-6">
          Creating Sustainable Crops for All
        </p>
      </motion.div>

      {/* Particle animation keyframes */}
      <style>{`
        @keyframes particleFloat {
          0% { transform: translateY(0) rotate(0deg); opacity: 0.3; }
          50% { opacity: 0.7; }
          100% { transform: translateY(-30px) rotate(180deg); opacity: 0.3; }
        }
      `}</style>
    </div>
  );
};

export default Login;
