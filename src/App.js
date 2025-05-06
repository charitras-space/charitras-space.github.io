import './App.css';
import IntroText from './components/IntroText'
import BusinessCardScene from './components/BusinessCardScene'
import React, { useEffect, useMemo, useRef, useState } from "react";

function App() {
  return (
    <div className="App">
      <div className="wrapper">
        <div className="container">
          <div className="topnav">
            <GlowButton>COOL STUFF</GlowButton>
            <GlowButton>WORK STUFF</GlowButton>
            <GlowButton>DOWNLOAD</GlowButton>
          </div>
          <IntroText />
        </div>
        <BusinessCardScene />
      </div>
    </div>
  );
}

export default App;

const GlowButton = ({ children, onClick }) => {
  const [offsetWidth, setOffsetWidth] = useState(0);
  const [offsetHeight, setOffsetHeight] = useState(0);

  const [translateX, setTranslateX] = useState("-40%");
  const [translateY, setTranslateY] = useState("-30%");

  const buttonRef = useRef(null);

  const getPosition = () => {
    if (buttonRef.current) {
      setOffsetWidth(buttonRef.current.offsetWidth);
      setOffsetHeight(buttonRef.current.offsetHeight);
    }
  };

  useEffect(() => {
    getPosition();
  }, []);

  const onMove = (e) => {
    if (buttonRef.current) {
      const { pageX, pageY } = e;

      const rect = buttonRef.current.getBoundingClientRect();

      setTranslateX(`${pageX - rect.left - window.scrollX - offsetWidth / 2}px`);
      setTranslateY(`${pageY - rect.top - window.scrollY - offsetHeight / 2}px`);
    }
  };

  const styleValue = useMemo(
    () => ({
      transform: `translate(${translateX}, ${translateY})`,
    }),
    [translateX, translateY]
  );

  return (
    <button
      className="glow-button"
      onClick={onClick}
      onPointerMove={onMove}
      ref={buttonRef}
    >
      {children}
      <div className="glow-button__glow">
        <div className="glow-button__glow-light" style={styleValue} />
      </div>

      <div className="glow-button__border">
        <div className="glow-button__border-light" style={styleValue} />
      </div>
    </button>
  );
};
