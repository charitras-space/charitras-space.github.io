import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';
import HALO from 'vanta/dist/vanta.halo.min.js';
import { motion } from 'framer-motion'; // Import motion

export default function GlobalBackground({ activate = false }) {
  const vantaRef = useRef(null); // For the DOM element
  const vantaEffectRef = useRef(null); // To store the Vanta effect instance

  useEffect(() => {
    if (activate) {
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
  }, [activate, vantaRef]);

  return (
    <motion.div
      ref={vantaRef}
      initial={{ opacity: 0 }} // Start with opacity 0
      animate={{ opacity: activate ? 1 : 0 }} // Animate to 1 if active, else 0
      transition={{ duration: 1.5, ease: "easeInOut" }} // Adjust duration/ease as needed
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
