import React, { Suspense, lazy, useState, useEffect, useContext } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

import IntroText from '../components/IntroText';
import MenuBar from '../components/MenuBar';

// Lazy load the CardShowcase component with error handling
const CardShowcase = lazy(() =>
  import('../components/BusinessCardScene')
    .catch(err => {
      console.error('Error loading BusinessCardScene:', err);
      return { default: () => <div>Card loading failed</div> };
    })
);

function HomePage() {
  // Animation sequence states
  const [introVisible, setIntroVisible] = useState(false);
  const [cardVisible, setCardVisible] = useState(false);
  const [cardLoaded, setCardLoaded] = useState(false);


  // Start the animation sequence when component mounts
  useEffect(() => {
    // Step 1: Show intro text after a small delay
    const introTimer = setTimeout(() => {
      setIntroVisible(true);
    }, 300);

    // Step 2: Show card after intro text is visible
    const cardTimer = setTimeout(() => {
      setCardVisible(true);
    }, 1300); // 300ms + 1000ms

    // Clear timers on unmount
    return () => {
      clearTimeout(introTimer);
      clearTimeout(cardTimer);
    };
  }, []);

  // Handle card load completion
  const handleCardLoaded = () => {
    console.log('Card loaded completely');
    setCardLoaded(true);
  };

  // Determine animation variants based on viewport orientation
  const isLandscape = window.matchMedia('(orientation: landscape)').matches;
  const cardAnimationVariant = isLandscape
    ? { hidden: { x: 100, opacity: 0 }, visible: { x: 0, opacity: 1 } }
    : { hidden: { y: 100, opacity: 0 }, visible: { y: 0, opacity: 1 } };

  return (
    <div className="wrapper">
      <div className="container">
        <MenuBar />

        {/* Intro Text with Fade Up Animation */}
        <AnimatePresence>
          {introVisible && (
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
            >
              <IntroText />
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Business Card Scene with direction-aware animation */}
      <AnimatePresence>
        {cardVisible && (
          <motion.div
            initial="hidden"
            animate="visible"
            variants={cardAnimationVariant}
            transition={{ duration: 1, ease: "easeOut" }}
            className="card-container"
            style={{ width: "100%", position: "relative" }}
          >
            <Suspense fallback={
              <div style={{
                height: "100vh",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                color: "#fff"
              }}>
              </div>
            }>
              <CardShowcase onLoaded={handleCardLoaded} />
            </Suspense>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default HomePage;
