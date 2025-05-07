import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';
import HALO from 'vanta/dist/vanta.halo.min.js';

// This component will be mounted once at the app level
// outside of the animation context
export default function GlobalBackground() {
  const vantaRef = useRef(null);

  useEffect(() => {
    let effect = null;

    // Small timeout to ensure DOM is ready
    const timer = setTimeout(() => {
      if (vantaRef.current) {
        effect = HALO({
          el: vantaRef.current,
          THREE,
          mouseControls: true,
          touchControls: true,
          gyroControls: false,
          forceAnimate: true,
          backgroundColor: 0x0b0d13
        });
      }
    }, 100);

    return () => {
      clearTimeout(timer);
      if (effect) effect.destroy();
    };
  }, []);

  return (
    <div
      ref={vantaRef}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100vw',
        height: '100vh',
        zIndex: -1,
        pointerEvents: 'none'
      }}
    />
  );
}
