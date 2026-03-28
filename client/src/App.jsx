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
const About   = lazy(() => import("./pages/About"));
const Terms   = lazy(() => import("./pages/Terms"));
const Contact = lazy(() => import("./pages/Contact"));
const CreatorHub = lazy(() => import("./pages/CreatorHub"));
const CreatorMarket = lazy(() => import("./pages/CreatorMarket"));
const CreatorSubmissions = lazy(() => import("./pages/CreatorSubmissions"));
const CreatorsChoice = lazy(() => import("./pages/CreatorsChoice"));
import TipBot from "./components/TipBot";

const PageLoader = () => (
  <div className="min-h-screen flex items-center justify-center bg-[#f5f5f4]">
    <div className="w-10 h-10 rounded-full border-4 border-[#115e59] border-t-transparent animate-spin" />
  </div>
);

const AssetPreloader = () => {
  React.useEffect(() => {
    const images = [
      "/logo.png",
      '/logo512.png',
      '/community profile pictures/growth.png',
      '/community resilience/growth.png',
      '/community resilience/reduce waste.png',
      "/community resilience/market.png"
    ];
    images.forEach(src => {
      const img = new Image();
      img.src = src;
    });
  }, []);
  return null;
};

function AppContent() {
  const { badgePopup, setBadgePopup } = useAppContext();

  return (
    <>
      <AssetPreloader />
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
                    <Route path="/about"  element={<About />}  />
                    <Route path="/terms"  element={<Terms />}  />
                    <Route path="/contact" element={<Contact />} />
                    <Route path="/creator" element={<CreatorHub />} />
                    <Route path="/creator/market" element={<CreatorMarket />} />
                    <Route path="/creator/submissions" element={<CreatorSubmissions />} />
                    <Route path="/creators-choice" element={<CreatorsChoice />} />
                  </Routes>
                </main>
                <TipBot />
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
