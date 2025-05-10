import React from "react";
import { motion } from "framer-motion";
import "./CoolStuffPage.css";
import GlassmorphicCarousel from "../components/GlassmorphicCarousel";
import MenuBar from "../components/MenuBar";

export default function CoolStuffPage() {
  return (
    <div style={{ paddingLeft: "5vw", paddingTop: "5vh" }}>
      <MenuBar title="Cool Projects" />
      <motion.div
        className="cool-stuff-page"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.5 }}
      >
        <GlassmorphicCarousel />
      </motion.div>
    </div>
  );
}
