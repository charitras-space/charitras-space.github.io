import React from "react";
import {
  BrowserRouter,
  Routes,
  Route,
  Outlet,
  useLocation,
} from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";

import "./App.css";
import HomePage from "./pages/HomePage";
import CoolStuffPage from "./pages/CoolStuffPage";
import WorkStuffPage from "./pages/WorkStuffPage";
import ResumePage from "./pages/ResumePage";
import GlobalBackground from "./components/HaloBackground";

function Layout() {
  const location = useLocation();

  return (
    <div className="App">
      <AnimatePresence mode="wait"> {/* Removed initial={false} */}
        <motion.div
          key={location.pathname}
          className="page-outlet-wrapper" // Optional: for styling if needed
          // Animations are defined on individual page components
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
      <GlobalBackground activate={false} />

      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<HomePage />} />
            <Route path="cool" element={<CoolStuffPage />} />
            <Route path="work" element={<WorkStuffPage />} />
            <Route path="resume" element={<ResumePage />} />
            {/* Add tempo routes conditionally if needed */}
            {process.env.VITE_TEMPO === "true" && <Route path="/tempobook/*" />}
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
