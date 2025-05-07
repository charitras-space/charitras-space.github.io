import React from 'react';
import './CoolStuffPage.css';
import GlassmorphicCarousel from '../components/GlassmorphicCarousel';

export default function CoolStuffPage() {
  return (
    <div className="cool-stuff-page" style={{ width: '100vw', height: '100vh' }}>
      <GlassmorphicCarousel />
    </div>
  );
}
