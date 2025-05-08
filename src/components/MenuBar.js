import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { IoArrowBack } from 'react-icons/io5';
import MenuButton from './MenuButton';
import './MenuBar.css';

export default function MenuBar() {
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const isHome = pathname === '/';

  return (
    <nav className={`topnav ${isHome ? 'expanded' : 'collapsed'}`}>
      {isHome && (
        <>
          <MenuButton className="menu-item cool" to="/cool">
            COOL&nbsp;STUFF
          </MenuButton>
          <MenuButton className="menu-item work" to="/work">
            WORK&nbsp;STUFF
          </MenuButton>
          <MenuButton className="menu-item resume" to="/resume">
            GET&nbsp;RESUME
          </MenuButton>
        </>
      )}

      <button
        className="glow-button menu-item back-btn"
        aria-label="Back to home"
        onClick={() => navigate('/')}
      >
        <IoArrowBack size={24} />
        <div className="glow-button__glow" />
        <div className="glow-button__border" />
      </button>
    </nav>
  );
}
