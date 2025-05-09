import React from "react";
import { motion } from "framer-motion";
import "./CoolStuffPage.css";
import GlassmorphicCarousel from "../components/GlassmorphicCarousel";

export default function CoolStuffPage() {
  return (
    <motion.div
      className="cool-stuff-page"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
      <GlassmorphicCarousel />
    </motion.div>
  );
}
