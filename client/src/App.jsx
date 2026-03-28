import React, { useState, lazy, Suspense } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { AppProvider } from "./context/AppContext";
import { AuthProvider } from "./context/AuthContext";
import { ThemeProvider } from "./context/ThemeContext";
import { useAppContext } from "./context/useAppContext";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import BadgePopup from "./components/BadgePopup";

// Lazy-load all pages — each becomes its own JS chunk
const Home    = lazy(() => import("./pages/Home"));
const Grow    = lazy(() => import("./pages/Grow"));
const Reduce  = lazy(() => import("./pages/Reduce"));
const Save    = lazy(() => import("./pages/Save"));
const Market  = lazy(() => import("./pages/Market"));
const Impact  = lazy(() => import("./pages/Impact"));
const Admin   = lazy(() => import("./pages/Admin"));
const Login   = lazy(() => import("./pages/Login"));
const Welcome = lazy(() => import("./pages/Welcome"));

const PageLoader = () => (
  <div className="min-h-screen flex items-center justify-center bg-[#f5f5f4]">
    <div className="w-10 h-10 rounded-full border-4 border-[#115e59] border-t-transparent animate-spin" />
  </div>
);

function AppContent() {
  const { badgePopup, setBadgePopup } = useAppContext();

  return (
    <>
      <Suspense fallback={<PageLoader />}>
        <Routes>
          {/* Standalone pages — no Navbar/Footer */}
          <Route path="/admin" element={<Admin />} />
          <Route path="/login" element={<Login />} />

          {/* Main app */}
          <Route
            path="*"
            element={
              <div className="bg-beige text-dark min-h-screen flex flex-col font-sans">
                <Navbar />
                <main className="flex-grow">
                  <Routes>
                    <Route path="/"       element={<Home />}   />
                    <Route path="/grow"   element={<Grow />}   />
                    <Route path="/reduce" element={<Reduce />} />
                    <Route path="/save"   element={<Save />}   />
                    <Route path="/market" element={<Market />} />
                    <Route path="/impact" element={<Impact />} />
                  </Routes>
                </main>
                <Footer />
              </div>
            }
          />
        </Routes>
      </Suspense>
      <BadgePopup badge={badgePopup} onClose={() => setBadgePopup(null)} />
    </>
  );
}

function App() {
  const [showWelcome, setShowWelcome] = useState(
    () => !window.location.pathname.startsWith("/admin") &&
          !window.location.pathname.startsWith("/login") &&
          !sessionStorage.getItem("harvest_welcomed")
  );

  const handleWelcomeDone = () => {
    sessionStorage.setItem("harvest_welcomed", "1");
    setShowWelcome(false);
  };

  return (
    <AuthProvider>
      <ThemeProvider>
        <AppProvider>
          <Router>
            {showWelcome && <Welcome onDone={handleWelcomeDone} />}
            <AppContent />
          </Router>
        </AppProvider>
      </ThemeProvider>
    </AuthProvider>
  );
}

export default App;
