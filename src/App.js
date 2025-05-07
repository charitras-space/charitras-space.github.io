import React from 'react';
import { BrowserRouter, Routes, Route, Outlet, useLocation } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion'

import './App.css';
import HomePage from './pages/HomePage'
import CoolStuffPage from './pages/CoolStuffPage'
import GlobalBackground from './components/HaloBackground'; // Import the new component

function Layout() {
  const location = useLocation();

  return (
    <div className="App">
      <AnimatePresence mode="wait" initial={false}>
        <motion.div
          key={location.pathname}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.4 }}
        >
          <Outlet />
        </motion.div>
      </AnimatePresence>
    </div>
  );
}

function App() {
  return (
    <>
      {/* The background is rendered outside the animation context */}
      <GlobalBackground />

      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<HomePage />} />
            <Route path="cool" element={<CoolStuffPage />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
