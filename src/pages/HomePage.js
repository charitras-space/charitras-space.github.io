import React, { Suspense, lazy, useState, useEffect, useContext } from "react";
import { motion, AnimatePresence } from "framer-motion";
import "./HomePage.css";

import IntroText from "../components/IntroText";
import MenuBar from "../components/MenuBar";
// GlobalBackground is now handled globally via context
import { useVanta } from "../contexts/VantaContext";

const CardShowcase = lazy(() =>
  import("../components/BusinessCardScene").catch((err) => {
    console.error("Error loading BusinessCardScene:", err);
    return { default: () => <div>Card loading failed</div> };
  }),
);

function HomePage() {
  const [introVisible, setIntroVisible] = useState(false);
  const [cardVisible, setCardVisible] = useState(false);
  const [cardLoaded, setCardLoaded] = useState(false);
  // Removed activateVanta state, will use context

  const { setIsHomePageActive, setVantaVisibleForHome } = useVanta();

  useEffect(() => {
    setIsHomePageActive(true); // Signal that HomePage is active
    setVantaVisibleForHome(false); // Ensure Vanta is initially off for HomePage sequence

    const mainContentTimer = setTimeout(() => {
      setIntroVisible(true);
      setCardVisible(true);
    }, 700);

    return () => {
      clearTimeout(mainContentTimer);
      setIsHomePageActive(false); // Reset on unmount
      setVantaVisibleForHome(true); // Ensure Vanta is on for other pages if navigating away
    };
  }, [setIsHomePageActive, setVantaVisibleForHome]);

  const handleCardLoaded = () => {
    console.log("Card loaded completely");
    setCardLoaded(true);
  };

  useEffect(() => {
    if (cardLoaded) {
      const vantaActivationTimer = setTimeout(() => {
        setVantaVisibleForHome(true); // Trigger Vanta visibility via context
      }, 700); // Delay for Vanta to appear after card
      return () => clearTimeout(vantaActivationTimer);
    }
  }, [cardLoaded, setVantaVisibleForHome]);

  const isLandscape =
    typeof window !== "undefined" &&
    window.matchMedia("(orientation: landscape)").matches;
  const cardAnimationVariant = isLandscape
    ? { hidden: { x: 100, opacity: 0 }, visible: { x: 0, opacity: 1 } }
    : { hidden: { y: 100, opacity: 0 }, visible: { y: 0, opacity: 1 } };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      className="home-page"
    >
      {/* GlobalBackground and black cover are no longer rendered here */}
      {/* Their behavior is controlled by the global GlobalBackground via VantaContext */}

      <MenuBar />

      {/* Ensure wrapper still has zIndex if needed for content stacking, though black cover is gone */}
      <div className="wrapper" style={{ position: 'relative', zIndex: 1 }}>
        <motion.div
          /* layout Removed layout prop from intro-container */
          className="container intro-container"
          // CSS will dictate its size (e.g., flex-basis: 50% on desktop).
          // When card-container appears, intro-container will snap to its new size.
          // transition={{ duration: 0.7, ease: "easeInOut" }} // Removed as no explicit animate/layout props
        >
          {/* <AnimatePresence> Removed AnimatePresence here */}
            {introVisible && (
              <motion.div
                /* layout  Removed layout prop from here to simplify animation */
                initial={{ opacity: 0, y: 20 }} /* Added y for slide-up effect */
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1.2, ease: "easeInOut" }}
                className="intro-text-wrapper"
                style={{ minHeight: '70px' }} // Prevent layout shift from typing animation
              >
                <IntroText />
              </motion.div>
            )}
          {/* </AnimatePresence> */}
        </motion.div>

        <AnimatePresence>
          {cardVisible && (
            <motion.div
              layout /* Add layout prop for smooth animation of size/position changes */
              initial="hidden"
              animate="visible"
              variants={cardAnimationVariant}
              transition={{ duration: 1, ease: "easeOut" }}
              className="card-container"
              style={{ width: "100%", position: "relative" }}
            >
              <Suspense
                fallback={
                  <div
                    style={{
                      height: "100vh",
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                      color: "#fff",
                    }}
                  >
                  </div>
                }
              >
                <CardShowcase onLoaded={handleCardLoaded} />
              </Suspense>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
}

export default HomePage;
