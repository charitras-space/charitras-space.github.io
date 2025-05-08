import React, { Suspense, lazy, useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

import IntroText from '../components/IntroText';
import MenuBar from '../components/MenuBar';
import GlobalBackground from '../components/HaloBackground';

const CardShowcase = lazy(() =>
  import('../components/BusinessCardScene')
    .catch(err => {
      console.error('Error loading BusinessCardScene:', err);
      return { default: () => <div>Card loading failed</div> };
    })
);

function HomePage() {
  const [introVisible, setIntroVisible] = useState(false);
  const [cardVisible, setCardVisible] = useState(false);
  const [cardLoaded, setCardLoaded] = useState(false);
  const [activateVanta, setActivateVanta] = useState(false);

  useEffect(() => {
    const introTimer = setTimeout(() => {
      setIntroVisible(true);
    }, 300);

    const cardTimer = setTimeout(() => {
      setCardVisible(true);
    }, 1300);

    return () => {
      clearTimeout(introTimer);
      clearTimeout(cardTimer);
    };
  }, []);

  const handleCardLoaded = () => {
    console.log('Card loaded completely');
    setCardLoaded(true);
  };

  useEffect(() => {
    if (cardLoaded) {
      const vantaActivationTimer = setTimeout(() => {
        setActivateVanta(true);
      }, 200);
      return () => clearTimeout(vantaActivationTimer);
    }
  }, [cardLoaded]);

  const isLandscape = typeof window !== 'undefined' && window.matchMedia('(orientation: landscape)').matches;
  const cardAnimationVariant = isLandscape
    ? { hidden: { x: 100, opacity: 0 }, visible: { x: 0, opacity: 1 } }
    : { hidden: { y: 100, opacity: 0 }, visible: { y: 0, opacity: 1 } };

  return (
    <>
      <GlobalBackground activate={activateVanta} />

      <div className="wrapper">
        <div className="container">
          <MenuBar />

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
                  Loading Card...
                </div>
              }>
                <CardShowcase onLoaded={handleCardLoaded} />
              </Suspense>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </>
  );
}

export default HomePage;
