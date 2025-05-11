import React from "react";
import { motion } from "framer-motion";
import "./CoolStuffPage.css";
import GlassmorphicCarousel from "../components/GlassmorphicCarousel";
import MenuBar from "../components/MenuBar";

export default function CoolStuffPage() {
  return (
    <div >
      <motion.div
        className="cool-stuff-page"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.5 }}
      >
        <MenuBar title={"Cool Stuff"}/>
        <GlassmorphicCarousel />
      </motion.div>
    </div>
  );
}
