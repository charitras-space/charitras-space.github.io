import React, { useState } from "react";
import { IoArrowBack, IoArrowForward } from "react-icons/io5";
import { motion, AnimatePresence } from "framer-motion";
import "./GlassmorphicCarousel.css";
import MenuButton from "./MenuButton";

const GlassmorphicCarousel = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  // Project slides
  const slides = [
    {
      id: 1,
      title: "!React Dashboard",
      content:
        "A lightweight alternative to React that performs routing, state management and component nesting in just 69 lines of code. Built for performance-critical applications where bundle size matters.",
      image: "/assets/notreact.png",
      link: "https://github.com/charitras-space/NotReact/",
    },
    {
      id: 2,
      title: "Vibe Check",
      content:
        "LLMs have rendered a lot of \"Vibe Coders\" as just human feedback loops, telling the LLMs that the button is not aligned with 10px by eye balling it. This is inherently a replaceable job and should be done by AI itself. This project implements agents to do it",
      image:
        "https://images.unsplash.com/photo-1633356122102-3fe601e05bd2?w=800&q=80",
      link: "https://tempo.new",
    },
    {
      id: 3,
      title: "3D Portfolio Visualizer",
      content:
        "An interactive 3D visualization tool that displays portfolio projects in an immersive environment. Built with Three.js and WebGL for a unique user experience.",
      image:
        "https://images.unsplash.com/photo-1633354089011-383776e36993?w=800&q=80",
      link: "https://3d-portfolio.demo",
    },
  ];

  // Navigate to previous slide
  const prevSlide = () => {
    setCurrentSlide((prev) => (prev === 0 ? slides.length - 1 : prev - 1));
  };

  // Navigate to next slide
  const nextSlide = () => {
    setCurrentSlide((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
  };

  // Navigate to specific slide
  const goToSlide = (index) => {
    setCurrentSlide(index);
  };

  // Open project link
  const openProjectLink = (link) => {
    window.open(link, "_blank");
  };

  return (
    <motion.div
      className="carousel-wrapper"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
    >


      {/* Glassmorphic carousel container */}
      <div className="glassmorphic-carousel-container">
        {/* Glassmorphic carousel */}
        <div className="glassmorphic-carousel">
          {/* Carousel slides */}
          <AnimatePresence mode="wait">
            {slides.map(
              (slide, index) =>
                index === currentSlide && (
                  <motion.div
                    key={slide.id}
                    className="carousel-slide active"
                    initial={{ opacity: 0, x: 100 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -100 }}
                    transition={{ duration: 0.5 }}
                  >
                    <div className="slide-content">
                      <div className="slide-content-text">
                        <h2>{slide.title}</h2>
                        <p>{slide.content}</p>
                        <MenuButton onClick={() => openProjectLink(slide.link)}>
                          VIEW PROJECT
                        </MenuButton>
                      </div>
                      <div className="slide-content-image">
                        <img src={slide.image} alt={slide.title} />
                      </div>
                    </div>
                  </motion.div>
                ),
            )}
          </AnimatePresence>
        </div>

        {/* Navigation and dots */}
        <div className="carousel-navigation">
          {/* Previous button with the glow button style */}
          <MenuButton onClick={prevSlide} defaultActive={true}>
            <IoArrowBack size={24} />
          </MenuButton>

          {/* Dot indicators */}
          <div className="carousel-dots">
            {slides.map((_, index) => (
              <button
                key={index}
                className={`carousel-dot ${index === currentSlide ? "active" : ""}`}
                onClick={() => goToSlide(index)}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>

          {/* Next button with the glow style */}
          <MenuButton onClick={nextSlide} defaultActive={true}>
            <IoArrowForward size={24} />
          </MenuButton>
        </div>
      </div>
    </motion.div>
  );
};

export default GlassmorphicCarousel;
