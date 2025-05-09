import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { IoArrowBack, IoMenu, IoClose } from "react-icons/io5";
import { motion, AnimatePresence } from "framer-motion";
import MenuButton from "./MenuButton";
import "./MenuBar.css";

export default function MenuBar() {
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const isHome = pathname === "/";
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const menuVariants = {
    hidden: { opacity: 0, y: -20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { staggerChildren: 0.1, delayChildren: 0.2 },
    },
    exit: { opacity: 0, y: -20 },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: -10 },
    visible: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -10 },
  };

  return (
    <>
      {/* Mobile Menu Button */}
      {isMobile && (
        <button
          className="mobile-menu-toggle"
          onClick={toggleMobileMenu}
          aria-label="Toggle menu"
        >
          {isMobileMenuOpen ? <IoClose size={28} /> : <IoMenu size={28} />}
        </button>
      )}

      {/* Desktop Navigation */}
      {!isMobile && (
        <nav className={`topnav ${isHome ? "expanded" : "collapsed"}`}>
          {isHome && (
            <>
              <MenuButton className="menu-item cool" to="/cool">
                COOL STUFF
              </MenuButton>
              <MenuButton className="menu-item work" to="/work">
                WORK STUFF
              </MenuButton>
              <MenuButton className="menu-item resume" to="/resume">
                GET RESUME
              </MenuButton>
            </>
          )}

          <button
            className="glow-button menu-item back-btn"
            aria-label="Back to home"
            onClick={() => navigate("/")}
          >
            <IoArrowBack size={24} />
            <div className="glow-button__glow" />
            <div className="glow-button__border" />
          </button>
        </nav>
      )}

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobile && isMobileMenuOpen && (
          <motion.div
            className="mobile-menu"
            variants={menuVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
          >
            <motion.div variants={itemVariants}>
              <MenuButton
                className="menu-item"
                to="/"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                HOME
              </MenuButton>
            </motion.div>
            <motion.div variants={itemVariants}>
              <MenuButton
                className="menu-item cool"
                to="/cool"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                COOL STUFF
              </MenuButton>
            </motion.div>
            <motion.div variants={itemVariants}>
              <MenuButton
                className="menu-item work"
                to="/work"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                WORK STUFF
              </MenuButton>
            </motion.div>
            <motion.div variants={itemVariants}>
              <MenuButton
                className="menu-item resume"
                to="/resume"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                GET RESUME
              </MenuButton>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
