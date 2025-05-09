import React, { Suspense, lazy, useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import "./HomePage.css";

import IntroText from "../components/IntroText";
import MenuBar from "../components/MenuBar";
import GlobalBackground from "../components/HaloBackground";

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
  const [activateVanta, setActivateVanta] = useState(false);

  useEffect(() => { // Added useEffect wrapper here
    const mainContentTimer = setTimeout(() => {
      setIntroVisible(true);
      setCardVisible(true);
    }, 1300); // Both become visible at the same time, or adjust introSlightly later if needed

    // const cardTimer = setTimeout(() => { // Original cardTimer, now combined
    //   setCardVisible(true);
    // }, 1300);

    return () => {
      clearTimeout(mainContentTimer);
      // clearTimeout(cardTimer);
    };
  }, []);

  const handleCardLoaded = () => {
    console.log("Card loaded completely");
    setCardLoaded(true);
  };

  useEffect(() => {
    if (cardLoaded) {
      const vantaActivationTimer = setTimeout(() => {
        setActivateVanta(true);
      }, 1200); // Further increased delay
      return () => clearTimeout(vantaActivationTimer);
    }
  }, [cardLoaded]);

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
      {/* Vanta Background container - positioned at the very back */}
      <div
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100vw',
          height: '100vh',
          zIndex: -1, // Ensure it's behind everything
        }}
      >
        <GlobalBackground activate={activateVanta} />
      </div>

      {/* Black cover that fades out to reveal Vanta */}
      <motion.div
        className="black-cover"
        initial={{ opacity: 1 }} // Start fully opaque (black)
        animate={{ opacity: activateVanta ? 0 : 1 }} // Fade to transparent
        transition={{ duration: 0.7, ease: "easeInOut" }} // Smooth fade-out
        style={{
          position: 'fixed', // Cover the whole screen
          top: 0,
          left: 0,
          width: '100vw',
          height: '100vh',
          backgroundColor: 'black',
          zIndex: 0 // On top of Vanta (-1), but below other UI (default or higher)
        }}
      />

      <MenuBar /> {/* Moved MenuBar to be a direct child of home-page */}

      <div className="wrapper" style={{ position: 'relative', zIndex: 1 }}> {/* This will now be the main content area below MenuBar */}
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
