import React, { Suspense, lazy, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

import IntroText from '../components/IntroText'
import MenuBar from '../components/MenuBar'

const CardShowcase = lazy(() => import('../components/BusinessCardScene'));

function HomePage() {
  return (
    <div className="wrapper">
      <div className="container">
        <MenuBar />
        <IntroText />
      </div>
      <CardShowcase />
    </div>
  );
}

export default HomePage;
