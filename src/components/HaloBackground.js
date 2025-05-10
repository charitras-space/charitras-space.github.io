import React, { useEffect, useRef, useContext } from 'react';
import * as THREE from 'three';
import HALO from 'vanta/dist/vanta.halo.min.js';
import { motion } from 'framer-motion'; // Import motion
import { useVanta } from '../contexts/VantaContext';

export default function GlobalBackground() { // Removed activate prop
  const vantaRef = useRef(null); // For the DOM element
  const vantaEffectRef = useRef(null); // To store the Vanta effect instance
  const { isHomePageActive, vantaVisibleForHome } = useVanta();

  const shouldBeActive = isHomePageActive ? vantaVisibleForHome : true;

  useEffect(() => {
    if (shouldBeActive) {
      if (!vantaEffectRef.current && vantaRef.current) {
        const effect = HALO({
          el: vantaRef.current,
          THREE,
          mouseControls: true,
          touchControls: true,
          gyroControls: false,
          forceAnimate: true,
          backgroundColor: 0x0b0d13,
          // Add any other specific HALO configurations here
        });
        vantaEffectRef.current = effect;
      }
    } else {
      if (vantaEffectRef.current) {
        vantaEffectRef.current.destroy();
        vantaEffectRef.current = null;
      }
    }

    return () => {
      if (vantaEffectRef.current) {
        vantaEffectRef.current.destroy();
        vantaEffectRef.current = null;
      }
    };
  }, [shouldBeActive, vantaRef]);

  return (
    <motion.div
      ref={vantaRef}
      initial={{ opacity: 0 }} // Start with opacity 0
      // Animate opacity based on shouldBeActive.
      // The HomePage black cover will handle the main reveal animation.
      // This motion.div's animation is for general activation/deactivation.
      animate={{ opacity: shouldBeActive ? 1 : 0 }}
      transition={{ duration: 0.3, ease: "easeInOut" }} // Quicker fade for general purposes
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100vw',
        height: '100vh',
        zIndex: -1,
        pointerEvents: 'none',
      }}
    />
  );
}
