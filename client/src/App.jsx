import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AppProvider } from './context/AppContext';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import Grow from './pages/Grow';
import Reduce from './pages/Reduce';
import Save from './pages/Save';
import Market from './pages/Market';
import Impact from './pages/Impact';

function App() {
  return (
    <AppProvider>
      <Router>
        <div className="bg-beige text-dark min-h-screen flex flex-col font-sans">
          <Navbar />
          <main className="flex-grow">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/grow" element={<Grow />} />
              <Route path="/reduce" element={<Reduce />} />
              <Route path="/save" element={<Save />} />
              <Route path="/market" element={<Market />} />
              <Route path="/impact" element={<Impact />} />
            </Routes>
          </main>
          <Footer />
        </div>
      </Router>
    </AppProvider>
  );
}

export default App;
