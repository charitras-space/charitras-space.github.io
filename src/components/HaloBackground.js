import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import HALO from 'vanta/dist/vanta.halo.min.js';

// Create a context to manage the Vanta effect state globally
export const VantaContext = React.createContext({
  isEnabled: false,
  enable: () => { }
});

// This component will be mounted once at the app level
export function GlobalBackground({ children }) {
  const vantaRef = useRef(null);
  const [vantaEffect, setVantaEffect] = useState(null);
  const [isEnabled, setIsEnabled] = useState(false);

  // Initialize Vanta effect when enabled
  useEffect(() => {
    let effect = null;

    if (isEnabled && vantaRef.current && !vantaEffect) {
      // Initialize the Vanta effect when isEnabled becomes true
      effect = HALO({
        el: vantaRef.current,
        THREE,
        mouseControls: true,
        touchControls: true,
        gyroControls: false,
        forceAnimate: true,
        backgroundColor: 0x0b0d13,
        size: 1.5,
        amplitude: 1.0,
        amplitudeFactor: 1.3
      });

      setVantaEffect(effect);

      // Add transition effect for smooth appearance
      if (vantaRef.current) {
        vantaRef.current.style.opacity = '1';
      }
    }

    return () => {
      if (effect) effect.destroy();
    };
  }, [isEnabled, vantaEffect]);

  // Provide a function to enable the Vanta effect
  const enable = () => {
    setIsEnabled(true);
  };

  return (
    <VantaContext.Provider value={{ isEnabled, enable }}>
      <div
        ref={vantaRef}
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100vw',
          height: '100vh',
          zIndex: -1,
          pointerEvents: 'none',
          opacity: 0,
          transition: 'opacity 1s ease'
        }}
      />
      {children}
    </VantaContext.Provider>
  );
}

export default GlobalBackground;
