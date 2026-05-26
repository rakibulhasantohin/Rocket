/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { ReactNode } from 'react';

interface PhoneFrameProps {
  children: ReactNode;
  onScaleToggle?: () => void;
}

export function PhoneFrame({ children }: PhoneFrameProps) {
  return (
    <div id="phone-container" className="min-h-screen w-full bg-slate-100 flex items-center justify-center p-0 md:p-6 font-sans">
      {/* Absolute background decorations for premium simulation experience */}
      <div id="bg-decor-1" className="absolute top-10 left-10 w-72 h-72 bg-purple-300 rounded-full mix-blend-multiply filter blur-2xl opacity-30 animate-pulse" />
      <div id="bg-decor-2" className="absolute bottom-10 right-10 w-80 h-80 bg-rose-200 rounded-full mix-blend-multiply filter blur-2xl opacity-30 animate-pulse delay-1000" />
      
      {/* Simulated Smartphone Shell */}
      <div id="smartphone-shell" className="relative w-full max-w-[420px] h-[100vh] md:h-[860px] bg-white rounded-none md:rounded-[40px] shadow-2xl overflow-hidden flex flex-col border-[0px] md:border-[12px] border-slate-900 ring-4 ring-slate-800/20">
        
        {/* Notch Speaker representation for high fidelity desktop representation */}
        <div id="notch-speaker-bar" className="absolute top-0 left-1/2 transform -translate-x-1/2 w-32 h-6 bg-slate-950 rounded-b-2xl z-50 flex items-center justify-center gap-1.5 pointer-events-none hidden md:flex">
          <div className="w-10 h-[3px] bg-neutral-700 rounded-full" />
          <div className="w-2.5 h-2.5 bg-neutral-800 rounded-full border border-neutral-700" />
        </div>

        {/* Content Container representing the live screen inside safety guidelines */}
        <div id="phone-screen" className="flex-1 w-full h-full relative overflow-y-auto overflow-x-hidden flex flex-col bg-white">
          {children}
        </div>

        {/* Home key navigation pill representative */}
        <div id="home-indicator-pill" className="w-full py-2 bg-transparent absolute bottom-0 left-0 right-0 flex items-center justify-center pointer-events-none z-50">
          <div className="w-36 h-[4.5px] bg-neutral-800/80 rounded-full" />
        </div>
      </div>
    </div>
  );
}
