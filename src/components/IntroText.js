import { TypeAnimation } from 'react-type-animation';
import React from 'react';

import './IntroText.css'

const IntroText = () => {
  return (
    <div>
      <svg width="0" height="0">
        <filter id="f" x="-50%" y="-200%" width="200%" height="500%">
          <feGaussianBlur stdDeviation="35"></feGaussianBlur>
          <feColorMatrix type="saturate" values="1.3"></feColorMatrix>
          <feComposite in="SourceGraphic"></feComposite>
        </filter>
      </svg>
      <h1>
        <div style={{ fontSize: '0.8em' }}>
          Making portfolios is <br />
          <span id='coolText'>
            <TypeAnimation
              sequence={[
                'boring',
                3000,
                'tedious',
                3000,
                'kinda fun?',
                3000,
              ]}
              cursor={false}
              wrapper="span"
              speed={50}
              repeat={false}
            />
          </span>
        </div>
      </h1 >
    </div >
  );
};

export default IntroText;
