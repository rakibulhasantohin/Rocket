/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useEffect } from 'react';
import { motion } from 'motion/react';
import { StatusNotch } from './StatusNotch';

interface SplashProps {
  onDismiss: () => void;
}

export function Splash({ onDismiss }: SplashProps) {
  useEffect(() => {
    // Automatically dismiss the splash screen in 1.8 seconds
    const timer = setTimeout(() => {
      onDismiss();
    }, 1800);
    return () => clearTimeout(timer);
  }, [onDismiss]);

  return (
    <div 
      id="splash-screen-bg"
      className="w-full h-full flex flex-col justify-between bg-rocket relative overflow-hidden select-none"
    >
      {/* Phone Status bar at the top */}
      <StatusNotch isDarkTheme={true} />

      {/* Main Logo Section in the Middle */}
      <motion.div 
        id="splash-logo-container"
        initial={{ opacity: 0, scale: 0.92 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 1.05 }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
        className="flex-1 flex flex-col items-center justify-center p-6 relative z-10 cursor-pointer"
        onClick={onDismiss} // Enables instant skip on click
      >
        <div id="splash-rocket-logo" className="flex flex-col items-center select-none text-white max-w-xs text-center">
          
          {/* High-Fidelity Combined Rocket Logo in SVG */}
          <div className="relative w-48 h-28 -mb-2">
            
            {/* White Paper Airplane Flying up-right */}
            <svg 
              className="absolute right-0 top-0 w-24 h-24 transform translate-x-3 -translate-y-4 filter drop-shadow-md"
              viewBox="0 0 100 100" 
              fill="currentColor"
            >
              {/* Paper airplane polygons exactly matching the screenshot angles */}
              <polygon points="10,65 92,8 55,83 45,55" fill="#ffffff" />
              <polygon points="45,55 92,8 65,48" fill="#e2e8f0" />
              <polygon points="45,55 55,83 55,65" fill="#cbd5e1" />
            </svg>

            {/* "ROCKET" typography label */}
            <span className="absolute left-1 top-6 font-extrabold text-[22px] tracking-widest font-sans italic">
              ROCKET
            </span>

            {/* Iconic Cursive Bengali "রকেট" Letter Markings */}
            <div className="absolute left-0 bottom-1 flex items-baseline font-bold leading-none select-none text-white font-sans">
              <span className="text-6xl tracking-tight leading-none font-bold">র</span>
              <span className="text-5xl tracking-normal leading-none font-bold -ml-[6px]">কে</span>
              <span className="text-5xl tracking-tight leading-none font-bold -ml-[2px]">ট</span>
            </div>
            
            {/* Tiny accent dot circle underneath standard Rocket "র" */}
            <div className="absolute left-[38px] bottom-[15px] w-[9px] h-[9px] bg-white rounded-full border-2 border-rocket" />
          </div>

          {/* Subtitle tag / Brand Owner */}
          <div id="splash-tagline" className="mt-2 text-[9.5px] font-medium tracking-wide border-t border-white/25 pt-2 select-none">
            ডাচ-বাংলা ব্যাংক মোবাইল ব্যাংকিং
          </div>
        </div>
      </motion.div>

      {/* Decorative Slide sidebar bar just like in the screenshot left side */}
      <div id="splash-side-element" className="absolute left-0 top-1/4 h-2/5 w-[5px] bg-white/20 rounded-r-md" />

      {/* Bottom spacing / Footer branding */}
      <div id="splash-footer" className="w-full text-center py-6 text-white/50 text-[10px] select-none font-mono">
        Rocket v3.1.1 Clone
      </div>
    </div>
  );
}
export default Splash;
