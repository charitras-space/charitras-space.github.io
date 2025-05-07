// components/GlassmorphicCarousel.jsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { IoArrowBack, IoArrowForward } from 'react-icons/io5';
import './GlassmorphicCarousel.css';
import MenuButton from './MenuButton';

const GlassmorphicCarousel = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const navigate = useNavigate();

  // Example slides
  const slides = [
    {
      id: 1,
      title: "!React - TODO app",
      content: "I was trying to build a TODO app in React. `node_modules` took a thousand mbs on the disk. I wrote a js module that performs routing, state management, nesting in 69 lines of code. ",
      image: "/assets/notreact.png"
    },
    {
      id: 2,
      title: "Responsive Design",
      content: "This carousel adjusts its dimensions based on the device size for optimal viewing experience.",
      image: "/images/slide2.jpg"
    },
    {
      id: 3,
      title: "Interactive Elements",
      content: "Navigate with buttons or dots and experience the stunning glow effect on hover.",
      image: "/images/slide3.jpg"
    }
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

  return (
    <div className="carousel-wrapper">
      {/* Glassmorphic carousel container */}
      <div className="glassmorphic-carousel-container">
        {/* Glassmorphic carousel */}
        <div className="glassmorphic-carousel">
          {/* Carousel slides */}
          {slides.map((slide, index) => (
            <div
              key={slide.id}
              className={`carousel-slide ${index === currentSlide ? 'active' : ''}`}
            >
              <div className="slide-content">
                <h2>{slide.title}</h2>
                <p>{slide.content}</p>
                <MenuButton>Visit Project</MenuButton>
                <img src="http://localhost:3001/assets/notreact.png" />
              </div>
            </div>
          ))}
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
                className={`carousel-dot ${index === currentSlide ? 'active' : ''}`}
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

        {/* Home button */}
        <div className="home-button-container">
          <button
            className="glow-button menu-item back-btn"
            aria-label="Back to home"
            onClick={() => navigate('/')}
          >
            <IoArrowBack size={24} />
            <div className="glow-button__glow"></div>
            <div className="glow-button__border"></div>
          </button>
        </div>
      </div>
    </div>
  );
};

export default GlassmorphicCarousel;
