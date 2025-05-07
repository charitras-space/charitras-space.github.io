import React, { useEffect, useMemo, useRef, useState } from "react";
import { useNavigate } from 'react-router-dom';
import './MenuButton.css';

const MenuButton = ({ children, to, onClick, defaultActive = false }) => {
  const [offsetWidth, setOffsetWidth] = useState(0);
  const [offsetHeight, setOffsetHeight] = useState(0);

  const [translateX, setTranslateX] = useState("-40%");
  const [translateY, setTranslateY] = useState("-30%");

  // Add a state to track if we should show the active state
  const [showActive, setShowActive] = useState(defaultActive);

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

  // Apply special active background only when defaultActive is true and not hovering
  const buttonStyle = useMemo(() => {
    return showActive ? {
      background: "radial-gradient(circle farthest-corner at 10% 20%, rgba(255, 94, 247, 1) 17.8%, rgba(2, 245, 255, 1) 100.2%)"
    } : {};
  }, [showActive]);

  const navigate = useNavigate();

  const handleClick = () => {
    navigate(to);
  };

  const hasOnClick = typeof onClick === 'function';

  return (
    <button
      className="glow-button"
      onClick={hasOnClick ? onClick : handleClick}
      onPointerMove={onMove}
      ref={buttonRef}
      style={buttonStyle}
      onMouseEnter={() => setShowActive(false)}
      onMouseLeave={() => setShowActive(defaultActive)}
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

export default MenuButton;
