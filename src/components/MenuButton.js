import React, { useEffect, useMemo, useRef, useState } from "react";
import { useNavigate } from 'react-router-dom';
import './MenuButton.css';
const MenuButton = ({ children, to }) => {
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

  const navigate = useNavigate();

  const handleClick = () => {
    navigate(to);
  };


  return (
    <button
      className="glow-button"
      onClick={handleClick}
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

export default MenuButton;
